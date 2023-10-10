from bitcoin import SelectParams
from bitcoin.base58 import decode
from bitcoin.wallet import CBitcoinAddress, CBitcoinSecret, P2PKHBitcoinAddress


SelectParams('testnet')

# TODO: Fill this in with your private key.
my_private_key = CBitcoinSecret(
    'cPsYFspyi3t5tRT3ZrjNusWjzy7Fi9GRArfNEWkirhYRP9WDtqay')
my_public_key = my_private_key.pub
my_address = P2PKHBitcoinAddress.from_pubkey(my_public_key)

faucet_address = CBitcoinAddress('mv4rnyY3Su5gjcDNzbMLKBQkBicCtHUtFB')

# 7fff3bb47777f90dac0caa91581e96f2abeb395bd9ce4c38efbf80c1e4c327eb 分币hash
# index = 0
# https://live.blockcypher.com/btc-testnet/tx/7fff3bb47777f90dac0caa91581e96f2abeb395bd9ce4c38efbf80c1e4c327eb/

