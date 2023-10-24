from bitcoin import SelectParams
from bitcoin.core import CMutableTransaction, x
from bitcoin.core.script import CScript, SignatureHash, SIGHASH_ALL
from bitcoin.core.scripteval import VerifyScript, SCRIPT_VERIFY_P2SH

from bitcoin.wallet import CBitcoinSecret, P2PKHBitcoinAddress


from utils import create_txin, create_txout, broadcast_transaction


def split_coins(amount_to_send, txid_to_spend, utxo_index, n, network):
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
    response = broadcast_transaction(tx, network)
    print(response.status_code, response.reason)
    print(response.text)

if __name__ == '__main__':
    SelectParams('testnet')

    ######################################################################
    # TODO: set these parameters correctly
    #

    my_private_key = CBitcoinSecret('cUpCNaMwCphDA1NRoeFiSNQhQghDAHCiKnAHjsAYhtC7brHWxSLu')
    # my_private_key = CBitcoinSecret('221d9a49929481c2c2a253dd08f3a1046e66df654bd1e65809b1b75624cee0a4')

    my_public_key = my_private_key.pub
    my_address = P2PKHBitcoinAddress.from_pubkey(my_public_key)

    amount_to_send = 0.055 # amount of BTC in the output you're splitting minus fee
    txid_to_spend = ('afae0a5a61fb0fe109bf1339da482428b97823c64cc76cfeded1005accad197a')
    # txid_to_spend = ('647208d0059a49fe73ea679f8642efcae095cad66269d75c8765503a778afb75')
    utxo_index = 0
    n = 10 # number of outputs to split the input into
    network = 'btc-test3' # either 'btc-test3' or 'bcy-test'
    # network = 'bcy-test' # either 'btc-test3' or 'bcy-test'

    #
    #
    ######################################################################

    split_coins(amount_to_send, txid_to_spend, utxo_index, n, network)
