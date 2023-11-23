// Please paste your contract's solidity code here
// Note that writing a contract here WILL NOT deploy it and allow you to access it from your client
// You should write and develop your contract in Remix and then, before submitting, copy and paste it here
pragma solidity >=0.4.0;

contract BlockchainSplitwise {
    struct Debt
    {
        uint32 amount;
    }
    mapping(address =>mapping(address => Debt)) internal Debts;

    function lookup(address debtor, address creditor) public view returns (uint32 ret) {
        ret = Debts[debtor][creditor].amount;
    }

    function add_IOU(address creditor, uint32 amount,  address[] memory path, uint32 min_Amount) public {
        address debtor = msg.sender;
        require(creditor != debtor, "Debtor and Creditor cannot be the same one!");
        require(amount > 0, "Amount must be greater than 0!");

        Debt storage debt = Debts[debtor][creditor];

        if (min_Amount == 0) {
            debt.amount += amount;
            return;
        }
        require((debt.amount + amount) >= min_Amount, "The amount is smaller than min_Amount!");

        require(creditor == path[0] && debtor == path[path.length - 1], "The path is wrong!");
        for(uint256 i = 0; i < path.length - 1; i++)
        {
            require(Debts[path[i]][path[i + 1]].amount != 0, "The debt is not exist!");
            require(Debts[path[i]][path[i + 1]].amount >= min_Amount, "The debt does not enough to deduct the min_Amount!");
            Debts[path[i]][path[i + 1]].amount -= min_Amount;
        }

        debt.amount += amount - min_Amount;
    }
}