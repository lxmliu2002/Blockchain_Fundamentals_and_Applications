from sys import exit
from bitcoin.core.script import *

from utils import *
from config import my_private_key, my_public_key, my_address, faucet_address
from ex1 import P2PKH_scriptPubKey
from ex2a import (ex2a_txout_scriptPubKey, cust1_private_key, cust2_private_key, cust3_private_key)

# 创建多重签名脚本的解锁脚本
def multisig_scriptSig(txin, txout, txin_scriptPubKey):
    bank_sig = create_OP_CHECKSIG_signature(txin, txout, txin_scriptPubKey, my_private_key)
    cust1_sig = create_OP_CHECKSIG_signature(txin, txout, txin_scriptPubKey, cust1_private_key)
    cust2_sig = create_OP_CHECKSIG_signature(txin, txout, txin_scriptPubKey, cust2_private_key)
    cust3_sig = create_OP_CHECKSIG_signature(txin, txout, txin_scriptPubKey, cust3_private_key)
    ######################################################################
    # TODO: Complete this script to unlock the BTC that was locked in the
    # 返回多重签名脚本的解锁脚本，要求客户提供签名
    return [OP_0, bank_sig, cust1_sig, cust2_sig, cust3_sig]

    ######################################################################

# 创建并发送多重签名交易
def send_from_multisig_transaction(amount_to_send, txid_to_spend, utxo_index, txin_scriptPubKey, txout_scriptPubKey):
    # 创建交易输出
    txout = create_txout(amount_to_send, txout_scriptPubKey)
    # 创建交易输入
    txin = create_txin(txid_to_spend, utxo_index)
    # 创建多重签名解锁脚本
    txin_scriptSig = multisig_scriptSig(txin, txout, txin_scriptPubKey)
    # 创建已签名的交易
    new_tx = create_signed_transaction(txin, txout, txin_scriptPubKey, txin_scriptSig)
    # 广播交易并返回响应
    return broadcast_transaction(new_tx)

if __name__ == '__main__':
    ######################################################################
    # TODO: set these parameters correctly
    amount_to_send = 0.0015
    txid_to_spend = '71cb5fe5d62d6fc887c6aaf90ab0304a101294e2ce3f28396b230d7f982a05f3'
    utxo_index = 0
    ######################################################################
    # 设置输入脚本（多重签名脚本）和输出脚本（P2PKH脚本）
    txin_scriptPubKey = ex2a_txout_scriptPubKey
    txout_scriptPubKey = P2PKH_scriptPubKey(faucet_address)
    # 发送多重签名交易并打印响应
    response = send_from_multisig_transaction(
        amount_to_send, txid_to_spend, utxo_index,
        txin_scriptPubKey, txout_scriptPubKey)
    print(response.status_code, response.reason)
    print(response.text)
