# keygen.py

Alice

```shell
Private key: cUpCNaMwCphDA1NRoeFiSNQhQghDAHCiKnAHjsAYhtC7brHWxSLu
Address: mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2
```

Bob

```shell
Private key: cVe2gjMb76HjG8Wr5bU3CUruccBLxPLxE7uDmt5rneDRRcPaXcTZ
Address: mtYR9tdnmDjDgLtAqeDNL6EfA11TAsheha
```

为Alice在BTC上领取测试币

https://live.blockcypher.com/btc-testnet/tx/afae0a5a61fb0fe109bf1339da482428b97823c64cc76cfeded1005accad197a/

```shell
txid:afae0a5a61fb0fe109bf1339da482428b97823c64cc76cfeded1005accad197a
```

<img src="./pic/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20231024102100.png" style="zoom:50%;" />

# BCY

注册账户获取API token

```shell
Token d6fe7373f62f476a876df5d633e4293d
```

<img src="./pic/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20231024102623.png" style="zoom: 33%;" />

创建密钥

Alice

```shell
C:\Users\lxmli>curl -X POST https://api.blockcypher.com/v1/bcy/test/addrs?token=d6fe7373f62f476a876df5d633e4293d
{
  "private": "3991895a89e87b2b8284eddfa29d25317a694f6a3dd82596581eefc9b101da5b",
  "public": "031cafc11a94e1089f952d82852dab31c18965018da5af451b225baed5ec5741d1",
  "address": "CFCn7K7hS63cv2sXEMupexF5MA64F2qLYj",
  "wif": "BqFwGNamEHpL4Du68pqBKtFCwHNJevvn3Hzfd59ykxiEcviUQS2a"
}
```

Bob

```shell
C:\Users\lxmli>curl -X POST https://api.blockcypher.com/v1/bcy/test/addrs?token=d6fe7373f62f476a876df5d633e4293d
{
  "private": "221d9a49929481c2c2a253dd08f3a1046e66df654bd1e65809b1b75624cee0a4",
  "public": "03d0475a17721d708eecd7277f1b8eb38f2480a85fee478b0fae83cffd84d29c88",
  "address": "C1UhLgQa51AuDhoB8NdjQxYrzeVN8jqNKP",
  "wif": "BpUM5wX4hYRoWRRypiccACvLRnHwBkb2uEqkaMsLd7Use4XR5qyQ"
}
```

为Bob的BCY地址领取测试币

https://live.blockcypher.com/bcy/tx/647208d0059a49fe73ea679f8642efcae095cad66269d75c8765503a778afb75/

```shell
C:\Users\lxmli>curl -d "{\"address\": \"C1UhLgQa51AuDhoB8NdjQxYrzeVN8jqNKP\", \"amount\": 1000000}" https://api.blockcypher.com/v1/bcy/test/faucet?token=d6fe7373f62f476a876df5d633e4293d
{
  "tx_ref": "647208d0059a49fe73ea679f8642efcae095cad66269d75c8765503a778afb75"
}
```

# 划分领取的币

BTC_output

https://live.blockcypher.com/btc-testnet/tx/26ef803d4a07e1b48dc8c1e7bf7bd9a630ac2e979dcc2c6a3638c0ad1877aae3/

```shell
201 Created
{
  "tx": {
    "block_height": -1,
    "block_index": -1,
    "hash": "26ef803d4a07e1b48dc8c1e7bf7bd9a630ac2e979dcc2c6a3638c0ad1877aae3",
    "addresses": [
      "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
    ],
    "total": 5500000,
    "fees": 278782,
    "size": 498,
    "vsize": 498,
    "preference": "high",
    "relayed_by": "103.20.198.139",
    "received": "2023-10-24T02:58:16.975827433Z",
    "ver": 1,
    "double_spend": false,
    "vin_sz": 1,
    "vout_sz": 10,
    "confirmations": 0,
    "inputs": [
      {
        "prev_hash": "afae0a5a61fb0fe109bf1339da482428b97823c64cc76cfeded1005accad197a",
        "output_index": 0,
        "script": "483045022100e5b8a183bedf22676852349b89b14f9dc4b76c1fbbcb414ad3ba3d0de372a75e02200861985a8c13eab3dfe0d341740e53022367299d4c04dcce09d62d0eeed32f29012103887f6bf8f22cac34e6b2c52deca82adbf1558c2a49b066c6024e56c61db8f11f",
        "output_value": 5778782,
        "sequence": 4294967295,
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash",
        "age": 2534917
      }
    ],
    "outputs": [
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      },
      {
        "value": 550000,
        "script": "76a9142cffdd4ee53545362f755a5589ae58b7157fe4b788ac",
        "addresses": [
          "mjctYGeicFgM3q81mjsPW6YSX28ZLVHYQ2"
        ],
        "script_type": "pay-to-pubkey-hash"
      }
    ]
  }
}
```

