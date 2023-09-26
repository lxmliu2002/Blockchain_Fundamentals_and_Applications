from sys import exit
from bitcoin.core.script import *
from bitcoin.wallet import CBitcoinSecret
from utils import *
from config import my_private_key, my_public_key, my_address, faucet_address
from ex1 import send_from_P2PKH_transaction

# 客户私钥
cust1_private_key = CBitcoinSecret(
    'cTzY6AedUp2ki6yhKnCN5M4pLu7E7NZL44BaxxhxwDSZATueV4sF')
cust1_public_key = cust1_private_key.pub
cust2_private_key = CBitcoinSecret(
    'cS8mXETAn6PZqM7cLnH7pMHcfLVHuzBoqnaCMXGE1KFVmoT9FYny')
cust2_public_key = cust2_private_key.pub
cust3_private_key = CBitcoinSecret(
    'cUUKg5w78M22jA5uQyRcoCwMZQKGSpDeQMT4RgBiHEnAvVAGP9Nv')
cust3_public_key = cust3_private_key.pub


######################################################################
# TODO: Complete the scriptPubKey implementation for Exercise 2

# You can assume the role of the bank for the purposes of this problem
# and use my_public_key and my_private_key in lieu of bank_public_key and
# bank_private_key.

# 定义所需的签名数量
required_signatures = 3

# 创建包含cust1、cust2和cust3公钥的列表
pubkeys = [cust1_public_key, cust2_public_key, cust3_public_key]

# 创建多重签名脚本
ex2a_txout_scriptPubKey = CScript([required_signatures] + pubkeys + [len(pubkeys), OP_CHECKMULTISIG])

######################################################################

if __name__ == '__main__':
    ######################################################################
    # TODO: set these parameters correctly
    amount_to_send = 0.0018  # amount of BTC in the output you're splitting minus fee
    txid_to_spend = (
        '8b89b2517a25e6694b17c52b2f37d595578911c928a9434aebea79ecbe7d976d')
    utxo_index = 8
    ######################################################################

    response = send_from_P2PKH_transaction(
        amount_to_send, txid_to_spend, utxo_index,
        ex2a_txout_scriptPubKey)
    print(response.status_code, response.reason)
    print(response.text)
