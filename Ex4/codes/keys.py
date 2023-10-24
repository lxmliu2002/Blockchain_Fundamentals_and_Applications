from bitcoin import SelectParams
from bitcoin.wallet import CBitcoinSecret, P2PKHBitcoinAddress
from bitcoin.core import x

SelectParams('testnet')

######################################################################
#
# TODO: Fill this in with address secret key for BTC testnet3
#
# Create address in Base58 with keygen.py
# Send coins at https://coinfaucet.eu/en/btc-testnet/

# Only to be imported by alice.py
# Alice should have coins!!
alice_secret_key_BTC = CBitcoinSecret('cUpCNaMwCphDA1NRoeFiSNQhQghDAHCiKnAHjsAYhtC7brHWxSLu')

# Only to be imported by bob.py
bob_secret_key_BTC = CBitcoinSecret('cVe2gjMb76HjG8Wr5bU3CUruccBLxPLxE7uDmt5rneDRRcPaXcTZ')

######################################################################
#
# TODO: Fill this in with address secret key for BCY testnet
#
# Create address in hex with
# curl -X POST https://api.blockcypher.com/v1/bcy/test/addrs?token=$YOURTOKEN
# curl -X POST https://api.blockcypher.com/v1/bcy/test/addrs?token=d6fe7373f62f476a876df5d633e4293d
#
# Send coins with
# curl -d '{"address": "C1UhLgQa51AuDhoB8NdjQxYrzeVN8jqNKP", "amount": 1000000}' https://api.blockcypher.com/v1/bcy/test/faucet?token=d6fe7373f62f476a876df5d633e4293d
# Windows系统不支持单引号，需要转义
# curl -d "{\"address\": \"C1UhLgQa51AuDhoB8NdjQxYrzeVN8jqNKP\", \"amount\": 1000000}" https://api.blockcypher.com/v1/bcy/test/faucet?token=d6fe7373f62f476a876df5d633e4293d

# Only to be imported by alice.py
alice_secret_key_BCY = CBitcoinSecret.from_secret_bytes(x('3991895a89e87b2b8284eddfa29d25317a694f6a3dd82596581eefc9b101da5b'))

# Only to be imported by bob.py
# Bob should have coins!!
bob_secret_key_BCY = CBitcoinSecret.from_secret_bytes(x('221d9a49929481c2c2a253dd08f3a1046e66df654bd1e65809b1b75624cee0a4'))
# bob_secret_key_BCY = CBitcoinSecret.from_secret_bytes(x('7bcdb57926e60e6aa751d8057ac06adc1065095ad0085edac0bad3eaae60c7d0'))
# bob_secret_key_BCY = CBitcoinSecret.from_secret_bytes(x('00fa8611dc67a6d6c52d8bdc72b06c8a71c613e737028f8e573effcec86820ac'))
# bob_secret_key_BCY = CBitcoinSecret.from_secret_bytes(x('c4a7aaad7fff8d2b50c12fdc5b077ec83c55a671b0950045da8c143c2f9b9a56'))

# Can be imported by alice.py or bob.py
alice_public_key_BTC = alice_secret_key_BTC.pub
alice_address_BTC = P2PKHBitcoinAddress.from_pubkey(alice_public_key_BTC)

bob_public_key_BTC = bob_secret_key_BTC.pub
bob_address_BTC = P2PKHBitcoinAddress.from_pubkey(bob_public_key_BTC)

alice_public_key_BCY = alice_secret_key_BCY.pub
alice_address_BCY = P2PKHBitcoinAddress.from_pubkey(alice_public_key_BCY)

bob_public_key_BCY = bob_secret_key_BCY.pub
bob_address_BCY = P2PKHBitcoinAddress.from_pubkey(bob_public_key_BCY)
