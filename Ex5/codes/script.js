// =============================================================================
//                                  Config
// =============================================================================

// sets up web3.js
if (typeof web3 !== 'undefined') {
	web3 = new Web3(web3.currentProvider);
} else {
	web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

// Default account is the first one
web3.eth.defaultAccount = web3.eth.accounts[0];
// Constant we use later
let GENESIS = '0x0000000000000000000000000000000000000000000000000000000000000000';

// This is the ABI for your contract (get it from Remix, in the 'Compile' tab)
// ============================================================
// FIXME: fill this in with your contract's ABI
let abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address",
				"name": "creditor",
				"type": "address"
			},
			{
				"internalType": "uint32",
				"name": "amount",
				"type": "uint32"
			},
			{
				"internalType": "address[]",
				"name": "path",
				"type": "address[]"
			},
			{
				"internalType": "uint32",
				"name": "min_Amount",
				"type": "uint32"
			}
		],
		"name": "add_IOU",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "debtor",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "creditor",
				"type": "address"
			}
		],
		"name": "lookup",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "ret",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

// ============================================================
abiDecoder.addABI(abi);
// call abiDecoder.decodeMethod to use this - see 'getAllFunctionCalls' for more

// Reads in the ABI
let BlockchainSplitwiseContractSpec = web3.eth.contract(abi);

// This is the address of the contract you want to connect to; copy this from Remixs
let contractAddress = '0x372440F80a1DF02Fa16BCB517e2F9aA0ba4ee4e9'; // FIXME: fill this in with your contract's address/hash

let BlockchainSplitwise = BlockchainSplitwiseContractSpec.at(contractAddress);


// =============================================================================
//                            Functions To Implement
// =============================================================================

// TODO: Add any helper functions here!
function getData(dataExtractor, stopCondition) {
    const Calls = getAllFunctionCalls(contractAddress, 'add_IOU', stopCondition);
    const Result = Calls.map(Call => dataExtractor(Call)).flat();
    return Array.from(new Set(Result));
}
function getCreditors(user) {
    const Creditors = getData(Call => [Call.args?.[0].toLowerCase()], null);
    return Creditors.filter(creditor => BlockchainSplitwise.lookup(user, creditor).toNumber() > 0);
}

// TODO: Return a list of all users (creditors or debtors) in the system
// You can return either:
//   - a list of everyone who has ever sent or received an IOU
// OR
//   - a list of everyone currently owing or being owed money
// * 返回一个地址列表，这个地址列表包含:"曾经发送或收到欠条的每个人"或"目前欠或被欠钱的每个人"。
function getUsers() {
    return getData(Call => [Call.from.toLowerCase(), Call.args?.[0].toLowerCase()], null);
}

// TODO: Get the total amount owed by the user specified by 'user'
// * 返回指定用户所欠的总金额
function getTotalOwed(user) {
    const Creditors = getData(Call => [Call.args?.[0].toLowerCase()], null);
    return Creditors.reduce((acc, creditor) => acc + BlockchainSplitwise.lookup(user, creditor).toNumber(), 0);
}

// TODO: Get the last time this user has sent or received an IOU, in seconds since Jan. 1, 1970
// Return null if you can't find any activity for the user.
// HINT: Try looking at the way 'getAllFunctionCalls' is written. You can modify it if you'd like.
// * 返回该用户上次记录活动的UNIX时间戳(自1970年1月1日以来的秒数)(发送欠条或被列为欠条上的"债权人")。如果找不到活动，则返回null
function getLastActive(user) {
    const timeStamp = getData(Call => (Call.from.toLowerCase() === user.toLowerCase() || Call.args?.[0].toLowerCase() === user.toLowerCase()) ? [Call.timestamp] : [], Call => Call.from.toLowerCase() === user.toLowerCase() || Call.args?.[0].toLowerCase() === user.toLowerCase());
    return Math.max(...timeStamp);
}

// TODO: add an IOU ('I owe you') to the system
// The person you owe money is passed as 'creditor'
// The amount you owe them is passed as 'amount'
// * 向合约提交一个欠条以及相应的债权人和所欠数量，不返回任何值
function add_IOU(creditor, amount) {
    const Path = doBFS(creditor, web3.eth.defaultAccount, getCreditors);
    if (Path)
	{
        let minDebt = Infinity;
        for (let i = 1; i < Path.length; i++)
		{
            const Debt = BlockchainSplitwise.lookup(Path[i - 1], Path[i]).toNumber();
            minDebt = Math.min(minDebt, Debt);
        }
        const finalDebt = Math.min(minDebt, amount);
        return BlockchainSplitwise.add_IOU(creditor, amount, Path, finalDebt);
    }
    return BlockchainSplitwise.add_IOU(creditor, amount, [], 0);
}

// =============================================================================
//                              Provided Functions
// =============================================================================
// Reading and understanding these should help you implement the above

// This searches the block history for all calls to 'functionName' (string) on the 'addressOfContract' (string) contract
// It returns an array of objects, one for each call, containing the sender ('from') and arguments ('args')
function getAllFunctionCalls(addressOfContract, functionName, earlyStopFn)
{
	let curBlock = web3.eth.blockNumber;
	let function_calls = [];
	while (curBlock !== GENESIS)
	{
		let b = web3.eth.getBlock(curBlock, true);
		let txns = b.transactions;
		for (let j = 0; j < txns.length; j++)
		{
			let txn = txns[j];
			// check that destination of txn is our contract
			if (txn.to === addressOfContract.toLowerCase())
			{
				let func_call = abiDecoder.decodeMethod(txn.input);
				// check that the function getting called in this txn is 'functionName'
				if (func_call && func_call.name === functionName)
				{
					let args = func_call.params.map(function (x) { return x.value });
					function_calls.push({from: txn.from, args: args, timestamp: b.timestamp,})
					if (earlyStopFn && earlyStopFn(function_calls[function_calls.length - 1]))
					{
						return function_calls;
					}
				}
			}
		}
		curBlock = b.parentHash;
	}
	return function_calls;
}

// We've provided a breadth-first search implementation for you, if that's useful
// It will find a path from start to end (or return null if none exists)
// You just need to pass in a function ('getNeighbors') that takes a node (string) and returns its neighbors (as an array)
function doBFS(start, end, getNeighbors)
{
	let queue = [[start]];
	while (queue.length > 0)
	{
		let cur = queue.shift();
		let lastNode = cur[cur.length - 1]
		if (lastNode === end)
		{
			return cur;
		}
		else
		{
			let neighbors = getNeighbors(lastNode);
			for (let i = 0; i < neighbors.length; i++)
			{
				queue.push(cur.concat([neighbors[i]]));
			}
		}
	}
	return null;
}


// =============================================================================
//                                      UI
// =============================================================================

// This code updates the 'My Account' UI with the results of your functions
$("#total_owed").html("$" + getTotalOwed(web3.eth.defaultAccount));
$("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)));
$("#myaccount").change(function () {
	web3.eth.defaultAccount = $(this).val();
	$("#total_owed").html("$" + getTotalOwed(web3.eth.defaultAccount));
	$("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)))
});

// Allows switching between accounts in 'My Account' and the 'fast-copy' in 'Address of person you owe
let opts = web3.eth.accounts.map(function (a) { return '<option value="' + a + '">' + a + '</option>' })
$(".account").html(opts);
$(".wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<li>' + a + '</li>' }))

// This code updates the 'Users' list in the UI with the results of your function
$("#all_users").html(getUsers().map(function (u, i) { return "<li>" + u + "</li>" }));

// This runs the 'add_IOU' function when you click the button
// It passes the values from the two inputs above
$("#addiou").click(function () {
	add_IOU($("#creditor").val(), $("#amount").val());
	window.location.reload(false); // refreshes the page after
});

// This is a log function, provided if you want to display things to the page instead of the JavaScript console
// Pass in a discription of what you're printing, and then the object to print
function log(description, obj) {
	$("#log").html($("#log").html() + description + ": " + JSON.stringify(obj, null, 2) + "\n\n");
}