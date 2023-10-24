from bitcoin.core.script import *

######################################################################
# This function will be used by Alice and Bob to send their respective
# coins to a utxo that is redeemable either of two cases:
# 1) Recipient provides x such that hash(x) = hash of secret
#    and recipient signs the transaction.
# 2) Sender and recipient both sign transaction
#
# TODO: Fill this in to create a script that is redeemable by both
#       of the above conditions.
#
# See this page for opcode: https://en.bitcoin.it/wiki/Script
#
#

# This is the ScriptPubKey for the swap transaction
def coinExchangeScript(public_key_sender, public_key_recipient, hash_of_secret):
    return [
        # fill this in!
    public_key_sender,         # 发送者的公钥
    OP_CHECKSIGVERIFY,         # 验证发送者的签名
    OP_IF,
        public_key_recipient,
        OP_CHECKSIGVERIFY,
        OP_IF, # 如果有秘密x
            OP_HASH160,
            hash_of_secret,
            OP_EQUAL,
        OP_ELSE,
            OP_2,
            public_key_sender,
            public_key_recipient,
            OP_CHECKMULTISIGVERIFY,
        OP_ENDIF,
    OP_ENDIF
    ]

# def coinExchangeScript(public_key_sender, public_key_recipient, hash_of_secret):
#     return [
#         public_key_sender,         # 发送者的公钥
#         OP_CHECKSIG,               # 验证发送者的签名
#         OP_IF,
#             public_key_recipient,
#             OP_CHECKSIG,           # 验证接收者的签名
#             OP_IF,                # 如果有秘密x
#                 OP_HASH160,
#                 hash_of_secret,
#                 OP_EQUAL,
#             OP_ELSE,
#                 # 使用 OP_2 来表示需要两个签名
#                 OP_2,
#                 public_key_sender,
#                 public_key_recipient,
#                 OP_2,
#                 OP_CHECKMULTISIG,   # 验证两个签名
#             OP_ENDIF,
#         OP_ENDIF
#     ]


    # public_key_recipient,
    # OP_CHECKSIGVERIFY,  # 验证接受者的签名
    # OP_IF,
    #     OP_DUP,  # 复制栈顶元素
    #     public_key_sender,
    #     OP_CHECKSIGVERIFY,  # 验证发送者的签名
    # OP_ELSE,
    #     OP_HASH160,  # 计算秘密的哈希
    #     hash_of_secret,
    #     OP_EQUAL,  # 检查栈顶元素是否等于秘密x的哈希
    # OP_ENDIF

    
    # OP_DROP,
    # hash_of_secret,            # Hash(x) 的哈希值
    # OP_EQUAL,                  # 比较哈希值是否相等
    # OP_IF,                     # 如果相等，执行以下条件
    #     OP_DROP,
    #     public_key_recipient,  # 接收者的公钥
    # OP_ELSE,                   # 否则，执行以下条件
    #     OP_2, OP_SWAP,             # 将 2 放在栈顶，然后交换栈顶两个元素
    #     public_key_sender,      # 发送者的公钥
    #     OP_2, OP_CHECKMULTISIG,    # 使用多重签名验证
    # OP_ENDIF                   # 结束 IF 条件
    # ]

# This is the ScriptSig that the receiver will use to redeem coins
def coinExchangeScriptSig1(sig_recipient, secret):
    return [
        # fill this in!
    secret,
    sig_recipient
    ]

# This is the ScriptSig for sending coins back to the sender if unredeemed
def coinExchangeScriptSig2(sig_sender, sig_recipient):
    return [
        # fill this in!
    sig_recipient,
    sig_sender
    ]

#
#
######################################################################

