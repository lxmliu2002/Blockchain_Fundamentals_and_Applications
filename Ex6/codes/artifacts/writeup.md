Name: [刘修铭 张润哲]

## Question 1

In the following code-snippet from `Num2Bits`, it looks like `sum_of_bits` might be a sum of products of signals, making the subsequent constraint not rank-1. Explain why `sum_of_bits` is actually a _linear combination_ of signals.

```
sum_of_bits += (2 ** i) * bits[i];
```

## Answer 1

在这里，`bits[i]` 表示输入二进制数的第 `i` 位，而 `(2 ** i)` 表示 2 的 `i` 次方。这行代码的目的是将每一位上的二进制数值乘以相应位的权重，然后将所有这些乘积相加，最终得到二进制数的十进制表示。

之所以称上述过程为输入位线性组合，是因为 `(2 ** i)` 是一个常数，即使 `bits[i]` 被定义为一个信号。在编译时，`i` 是一个已知的常数，因为它是在循环中迭代的。因此，`(2 ** i)` 是一个常数，而不是信号。对于线性组合来说，它是常数和信号的乘积之和，而这里的 `(2 ** i) * bits[i]` 就是常数 `(2 ** i)` 和信号 `bits[i]` 的乘积。因此，`sum_of_bits` 是输入位的线性组合，而不是信号的乘积。




## Question 2

Explain, in your own words, the meaning of the `<==` operator.

## Answer 2

the `<==` operator, which combines `<--` and `===`. 表示将 `<--`（赋值）和 `===`（约束）这两个操作结合到一个步骤中。

在 example.circom 中，`binaryDecomposition.in <== in;` 表示将输入信号 `in` 的值赋给子电路 `binaryDecomposition` 的输入信号，并同时约束 `binaryDecomposition.in` 等于 `in`。




## Question 3

Suppose you're reading a `circom` program and you see the following:

```
signal input a;
signal input b;
signal input c;
(a & 1) * b === c;
```

Explain why this is invalid.

## Answer 3

因为其试图在一个信号赋值约束语句中直接使用了位运算。而在 circom 中，信号的赋值与约束操作分开进行，不能直接在赋值语句中使用位运算。

源代码中 `(a & 1) * b === c;` 尝试将 `a` 与 `1` 进行位运算，然后将结果乘以 `b`，最后将其约束为等于 `c`。正确的写法为：

```
a <== (a & 1) * b;
c === a;
```
