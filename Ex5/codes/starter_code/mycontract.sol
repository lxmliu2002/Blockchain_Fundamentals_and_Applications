// Please paste your contract's solidity code here
// Note that writing a contract here WILL NOT deploy it and allow you to access it from your client
// You should write and develop your contract in Remix and then, before submitting, copy and paste it here

// * lookup(address debtor, address creditor) public view returns (uint32 ret): 返回债务人欠债权人的金额
// * add_IOU(address creditor, uint32 amount, ...):为调用者添加一个欠条,如果你已经欠钱，金额会增加。金额必须为正数。你可以使此函数接受任意数量的附加参数。 请参阅下面有关解决循环的注释