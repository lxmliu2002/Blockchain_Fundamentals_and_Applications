from os import urandom
import bitcoin
from bitcoin.wallet import CBitcoinSecret, P2PKHBitcoinAddress

bitcoin.SelectParams('testnet')

seckey = CBitcoinSecret.from_secret_bytes(urandom(32))

print("Private key: %s" % seckey)
print("Address: %s" %
      P2PKHBitcoinAddress.from_pubkey(seckey.pub))
