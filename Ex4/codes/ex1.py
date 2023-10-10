#from bitcoin.core.script import *
import bitcoin
from utils import *
from config import (my_private_key, my_public_key, my_address,
                    faucet_address)

def P2PKH_scriptPubKey(address):
    ######################################################################
    # TODO: Complete the standard scriptPubKey implementation for a
    # PayToPublicKeyHash transaction

    # 获取地址的脚本
    script = address.to_scriptPubKey()
    # 获取公钥哈希
    pubkey_hash = script[3:-2]

    # 构建scriptPubKey
    script_pubkey = [
        OP_DUP,                   # 复制栈顶元素
        OP_HASH160,               # 计算栈顶元素的哈希
        pubkey_hash,              # 公钥哈希
        OP_EQUALVERIFY,           # 检查栈顶两个元素是否相等
        OP_CHECKSIG               # 检查栈顶元素是否是有效签名
    ]

    return script_pubkey

    ######################################################################


def P2PKH_scriptSig(txin, txout, txin_scriptPubKey):
    ######################################################################
    # TODO: Complete this script to unlock the BTC that was sent to you
    # in the PayToPublicKeyHash transaction. You may need to use variables
    # that are globally defined.
    # 创建签名
    signature = create_OP_CHECKSIG_signature(txin, txout, txin_scriptPubKey, my_private_key)
    # 获取公钥
    public_key = my_public_key
    # 构建scriptSig
    script_sig = [
        signature,    # 签名
        public_key    # 公钥
    ]
    return script_sig
    ######################################################################


def send_from_P2PKH_transaction(amount_to_send, txid_to_spend, utxo_index,
                                txout_scriptPubKey):
    txout = create_txout(amount_to_send, txout_scriptPubKey)

    txin_scriptPubKey = P2PKH_scriptPubKey(my_address)
    txin = create_txin(txid_to_spend, utxo_index)
    txin_scriptSig = P2PKH_scriptSig(txin, txout, txin_scriptPubKey)

    new_tx = create_signed_transaction(txin, txout, txin_scriptPubKey,
                                       txin_scriptSig)

    return broadcast_transaction(new_tx)


if __name__ == '__main__':
    ######################################################################
    # TODO: set these parameters correctly
    amount_to_send = 0.001 # amount of BTC in the output you're splitting minus fee
    txid_to_spend = (
        'a089277bdfefd68eff3c21c8e01247225263cb401dbe2f6f8da043c30ca8a212') # hash of prev transactio
    utxo_index = 0 # index of the output you are spending
    ######################################################################

    txout_scriptPubKey = P2PKH_scriptPubKey(faucet_address)
    response = send_from_P2PKH_transaction(
        amount_to_send, txid_to_spend, utxo_index, txout_scriptPubKey)
    print(response.status_code, response.reason)
    print(response.text)
