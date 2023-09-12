#from bitcoin.core.script import *
#import bitcoin
from bitcoin import *
from utils import *
from config import (my_private_key, my_public_key, my_address, faucet_address)


def split_coins(amount_to_send, txid_to_spend, utxo_index, n):
    txin_scriptPubKey = my_address.to_scriptPubKey()
    txin = create_txin(txid_to_spend, utxo_index)
    txout_scriptPubKey = my_address.to_scriptPubKey()
    txout = create_txout(amount_to_send / n, txout_scriptPubKey)
    tx = CMutableTransaction([txin], [txout]*n)
    sighash = SignatureHash(txin_scriptPubKey, tx,
                            0, SIGHASH_ALL)
    txin.scriptSig = CScript([my_private_key.sign(sighash) + bytes([SIGHASH_ALL]),
                              my_public_key])
    VerifyScript(txin.scriptSig, txin_scriptPubKey,
                 tx, 0, (SCRIPT_VERIFY_P2SH,))
    response = broadcast_transaction(tx)
    print(response.status_code, response.reason)
    print(response.text)

if __name__ == '__main__':
    ######################################################################
    # TODO: set these parameters correctly
    amount_to_send = 0.015 # amount of BTC in the output you're splitting minus fee
    txid_to_spend = (
        '322c73499ab966deaf51fd2be62a1859f8a714102d5355671a40d8a2f74848fb')
    utxo_index = 0
    n = 8 # number of outputs to split the input into
    ######################################################################

    split_coins(amount_to_send, txid_to_spend, utxo_index, n)
