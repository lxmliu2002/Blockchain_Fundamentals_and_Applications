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
				"name": "minus_amount",
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
let contractAddress = '0xCF41A5Ec0f0D142BEAee29cD00693ED0ccE2a416'; // FIXME: fill this in with your contract's address/hash

let BlockchainSplitwise = BlockchainSplitwiseContractSpec.at(contractAddress)


// =============================================================================
//                            Functions To Implement
// =============================================================================

// TODO: Add any helper functions here!
function getCreditors(user) {
    let creditors = new Set();
    const result = getAllFunctionCalls(contractAddress, "add_IOU");
	for (let i = 0; i < result.length; i++)
	{
		const record = result[i];
		if (record.from.toLowerCase() === user.toLowerCase())
		{
			creditors.add(record.args[0].toLowerCase());
		}
	}
    const tmp = Array.from(creditors);
	let resultList = [];
    for (let i = 0; i < tmp.length; i++)
	{
        let amountOwed = BlockchainSplitwise.lookup(user, tmp[i]);
        if (parseInt(amountOwed) > 0)
		{
            resultList.push(tmp[i]);
        }
    }

    return resultList;
}
// function getCreditors(user) {
// 	const result = getAllFunctionCalls(contractAddress, "add_IOU");

// 	// 使用 Set 来存储债权人
// 	const creditors = new Set();

// 	// 遍历所有函数调用结果，找到与用户有关的债权人
// 	for (let i = 0; i < result.length; i++) {
// 		const { from, args } = result[i];
// 		if (from === user) {
// 			creditors.add(args[0]);
// 		}
// 	}

// 	// 将 Set 转换为数组
// 	const tmp = Array.from(creditors);

// 	// 使用 Promise.all 并行查询每个债权人的欠款情况
// 	const resultList = Promise.all(tmp.map((creditor) => {
// 		let amountOwed = BlockchainSplitwise.lookup(user, creditor);
// 		if (parseInt(amountOwed) > 0) {
// 			return creditor;
// 		}
// 		return null;
// 	}));

// 	return resultList.filter(creditor => creditor !== null);
// }




// TODO: Return a list of all users (creditors or debtors) in the system
// You can return either:
//   - a list of everyone who has ever sent or received an IOU
// OR
//   - a list of everyone currently owing or being owed money
// * 返回一个地址列表，这个地址列表包含:"曾经发送或收到欠条的每个人"或"目前欠或被欠钱的每个人"。

// function getUsers() {
// 	const result = getAllFunctionCalls(contractAddress, "add_IOU");
// 	const users = new Set();

// 	for (let i = 0; i < result.length; i++) {
// 		const { from, args } = result[i];
// 		users.add(from);
// 		users.add(args[0]);
// 	}

// 	return Array.from(users);
// }

function getUsers() {
    const result = getAllFunctionCalls(contractAddress, "add_IOU");
    const users = new Set();

    for (const { from, args } of result) {
        users.add(from.toLowerCase());
        users.add(args[0].toLowerCase());
    }

    return Array.from(users);
}



// TODO: Get the total amount owed by the user specified by 'user'
// * 返回指定用户所欠的总金额

// function getTotalOwed(user) {
//     let totalOwed = 0;
//     const creditors = getCreditors(user);
// 	if (!creditors.includes(user))
// 	{
//         return 0;
//     }
//     for (let i = 0; i < creditors.length; i++)
// 	{
//         totalOwed += BlockchainSplitwise.lookup(user, creditors[i]);
//     }
//     return totalOwed;
// }

function getTotalOwed(user) {
	const creditors = getCreditors(user);

	if (!creditors.includes(user)) {
		return 0;
	}

	const totalOwed = creditors.reduce((accPromise, creditor) => {
		const acc = accPromise;
		const amountOwed = BlockchainSplitwise.lookup(user, creditor);
		return acc + parseInt(amountOwed);
	}, Promise.resolve(0));

	return totalOwed;
}



// TODO: Get the last time this user has sent or received an IOU, in seconds since Jan. 1, 1970
// Return null if you can't find any activity for the user.
// HINT: Try looking at the way 'getAllFunctionCalls' is written. You can modify it if you'd like.
// * 返回该用户上次记录活动的UNIX时间戳(自1970年1月1日以来的秒数)(发送欠条或被列为欠条上的"债权人")。如果找不到活动，则返回null

// function getLastActive(user) {
// 	const result = getAllFunctionCalls(contractAddress, "add_IOU");
// 	let lastActive = [];
// 	for (let i = 0; i < result.length; i++)
// 	{
// 		if (result[i].from === user || result[i].args[0] === user)
// 		{
// 			// lastActive.push(result[i].t);
// 			lastActive.push(web3.eth.getBlock(result[i].blockNumber).timestamp);
// 		}
// 	}
// 	if (lastActive.length === 0)
// 	{
// 		return null;
// 	}
// 	return Math.max(...lastActive);
// }

function getLastActive(user) {
    const result = getAllFunctionCalls(contractAddress, "add_IOU");

    // 使用 filter 函数筛选出与用户相关的记录
    const userRecords = result.filter(record => record.from.toLowerCase() === user.toLowerCase() || record.args[0].toLowerCase() === user.toLowerCase());

    // 使用 map 函数获取每条记录对应块的时间戳
    const timestampsPromise = Promise.all(userRecords.map(record => web3.eth.getBlock(record.blockNumber).then(block => block.timestamp)));

    // 使用 then 处理 Promise.all 的结果
    return timestampsPromise.then(timestamps => {
        // 如果没有找到相关记录，返回 null
        if (timestamps.length === 0) {
            return null;
        }

        // 返回最大时间戳
        return Math.max(...timestamps);
    });
}




// TODO: add an IOU ('I owe you') to the system
// The person you owe money is passed as 'creditor'
// The amount you owe them is passed as 'amount'
// * 向合约提交一个欠条以及相应的债权人和所欠数量，不返回任何值
function add_IOU(creditor, amount) {
	const path = doBFS(web3.eth.defaultAccount, creditor, getCreditors);

	let minus_amount = amount;
	if (path == null)
	{
		BlockchainSplitwise.add_IOU(creditor.toLowerCase(), amount, [], 0);
	}
	else
	{
		for (let i = 0; i < path.length - 1; i++) {
			let tmp = BlockchainSplitwise.lookup(path[i], path[i + 1]);
			if (minus_amount > tmp) {
				minus_amount = tmp;
			}
		}
		BlockchainSplitwise.add_IOU(creditor.toLowerCase(), amount, path, minus_amount);
	}
}



// =============================================================================
//                              Provided Functions
// =============================================================================
// Reading and understanding these should help you implement the above

// This searches the block history for all calls to 'functionName' (string) on the 'addressOfContract' (string) contract
// It returns an array of objects, one for each call, containing the sender ('from') and arguments ('args')
function getAllFunctionCalls(addressOfContract, functionName) {
	let curBlock = web3.eth.blockNumber;
	let function_calls = [];
	while (curBlock !== GENESIS) {
		let b = web3.eth.getBlock(curBlock, true);
		let txns = b.transactions;
		for (let j = 0; j < txns.length; j++) {
			let txn = txns[j];
			if (txn.to == null) {
				continue;
			}
			// check that destination of txn is our contract
			if (txn.to === addressOfContract) {
				let func_call = abiDecoder.decodeMethod(txn.input);
				// check that the function getting called in this txn is 'functionName'
				if (func_call && func_call.name === functionName) {
					let args = func_call.params.map(function (x) { return x.value });
					function_calls.push({ from: txn.from, args: args })
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
async function doBFS(start, end, getNeighbors) {
	let queue = [[start]];
	while (queue.length > 0) {
		let cur = queue.shift();
		let lastNode = cur[cur.length - 1]
		if (lastNode === end) {
			return cur;
		}
		else {
			let neighbors = getNeighbors(lastNode);
			for (let i = 0; i < neighbors.length; i++) {
				queue.push(cur.concat([neighbors[i]]));
			}
		}
	}
	return null;
}
// =============================================================================
//                                      UI
// =============================================================================

// // This code updates the 'My Account' UI with the results of your functions
// $("#total_owed").html("$" + getTotalOwed(web3.eth.defaultAccount));
// $("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)));
// $("#myaccount").change(function () {
// 	web3.eth.defaultAccount = $(this).val();
// 	$("#total_owed").html("$" + getTotalOwed(web3.eth.defaultAccount));
// 	$("#last_active").html(timeConverter(getLastActive(web3.eth.defaultAccount)))
// });

// // Allows switching between accounts in 'My Account' and the 'fast-copy' in 'Address of person you owe
// var opts = web3.eth.accounts.map(function (a) { return '<option value="' + a + '">' + a + '</option>' })
// $(".account").html(opts);
// $(".wallet_addresses").html(web3.eth.accounts.map(function (a) { return '<li>' + a + '</li>' }))

// // This code updates the 'Users' list in the UI with the results of your function
// $("#all_users").html(getUsers().map(function (u, i) { return "<li>" + u + "</li>" }));

// // This runs the 'add_IOU' function when you click the button
// // It passes the values from the two inputs above
// $("#addiou").click(function () {
// 	add_IOU($("#creditor").val(), $("#amount").val());
// 	window.location.reload(true); // refreshes the page after
// });

// // This is a log function, provided if you want to display things to the page instead of the JavaScript console
// // Pass in a discription of what you're printing, and then the object to print
// function log(description, obj) {
// 	$("#log").html($("#log").html() + description + ": " + JSON.stringify(obj, null, 2) + "\n\n");
// }

// This sets the default account on load and displays the total owed to that
// account.
web3.listAccounts().then((response) => {
    defaultAccount = response[0];

    getTotalOwed(defaultAccount).then((response) => {
        $("#total_owed").html("$" + response);
    });

    getLastActive(defaultAccount).then((response) => {
        time = timeConverter(response)
        $("#last_active").html(time)
    });
});

// This code updates the 'My Account' UI with the results of your functions
$("#myaccount").change(function () {
    defaultAccount = $(this).val();

    getTotalOwed(defaultAccount).then((response) => {
        $("#total_owed").html("$" + response);
    })

    getLastActive(defaultAccount).then((response) => {
        time = timeConverter(response)
        $("#last_active").html(time)
    });
});

// Allows switching between accounts in 'My Account' and the 'fast-copy' in 'Address of person you owe
web3.listAccounts().then((response) => {
    var opts = response.map(function (a) {
        return '<option value="' +
            a.toLowerCase() + '">' + a.toLowerCase() + '</option>'
    });
    $(".account").html(opts);
    $(".wallet_addresses").html(response.map(function (a) {
        return '<li>' + a.toLowerCase() + '</li>'
    }));
});

// This code updates the 'Users' list in the UI with the results of your function
getUsers().then((response) => {
    $("#all_users").html(response.map(function (u, i) {
        return "<li>" + u + "</li>"
    }));
});

// This runs the 'add_IOU' function when you click the button
// It passes the values from the two inputs above
$("#addiou").click(function () {
    defaultAccount = $("#myaccount").val(); //sets the default account
    add_IOU($("#creditor").val(), $("#amount").val()).then((response) => {
        window.location.reload(false); // refreshes the page after add_IOU returns and the promise is unwrapped
    })
});

// This is a log function, provided if you want to display things to the page instead of the JavaScript console
// Pass in a discription of what you're printing, and then the object to print
function log(description, obj) {
    $("#log").html($("#log").html() + description + ": " + JSON.stringify(obj, null, 2) + "\n\n");
}
