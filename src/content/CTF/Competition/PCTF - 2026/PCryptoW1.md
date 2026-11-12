---
title: Crypto - Week1
status: published
pubDate: 2026-11-12
type: Crypto
tags:
- rsa
- fermat-factorization
- elliptic-curve
- complex-multiplication
- common-modulus-attack
- modular-inverse
- crt
- discrete-log
- lcg
- caesar
- vigenere
- base64
- hex-encoding
- repeating-key-xor
- socket
- automation
- aes
- gcm
- sha256
- key-derivation
- boolean-function
- algebraic-normal-form
- walsh-hadamard-transform
- gaussian-elimination
- finite-field
- polynomial-recovery
- error-correction
- brute-force
- image-steganography
- lsb
- image-matching
- cifar-100
---
### 01 ezRSA
#### 题目
了解一下RSA吧！


<a href="/Download/WpCTF/Comp/P26/Cr/ezRSA.zip" download>
    文件
</a>

#### 答案
PCTF{30ng4atu1ation_40r_f3rmat_a0d_CM}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/1.png" alt="" style="max-width: 80%; height: auto;">

flag拆成了两部分

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/2.png" alt="" style="max-width: 80%; height: auto;">

第一部分由于挨得很近可以直接费马分解

```python
from math import isqrt

prime1 = []
sqr1 = isqrt(n1)
if sqr1 * sqr1 < n1:
    sqr1 += 1

while True:
    b_2 = sqr1 * sqr1 - n1 
    b = isqrt(b_2)

    if b_2 == b * b:
        prime1.append(sqr1 - b)
        prime1.append(sqr1 + b)

        break

    sqr1 += 1

d1 = pow(e, -1, (prime1[0] - 1) * (prime1[1] - 1))
m1 = pow(c1, d1, n1)

print(m1.to_bytes(19, "big"))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/3.png" alt="" style="max-width: 80%; height: auto;">

解得残片1

PCTF{30ng4atu1ation

注意到第二部分

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/4.png" alt="" style="max-width: 80%; height: auto;">

既已知n2 = p * q

由于我们现在不知道p是多少，根据题目里面的线索，也就是p的生成规律，满足$ 4p=3v^2+1 $，可以利用椭圆曲线来尝试求解

对于复乘曲线$ y^2 \equiv x^3+B \pmod n $，当模素数p的情况下，满足一个方程$ 4p=3v^2+t^2 $时，会使得这个曲线所有点的总数满足$ p+1-t $，包括无穷远点 𝒪 ，这里所有的点就是这个曲线方程的整数解

而对于本题，$ t^2=1 $，也就是说，该曲线所有的点的总数就是p

这里由于不知道B，因此依靠随机来尝试B

由于n时p的q倍，因此假设一个点P满足曲线，nP一定也在曲线上，如果此时选中了点数为p的曲线，那么就有$ nP=(pq)P=q(pP)=\mathcal O $，也就是说，回到了无穷远点

但是，其模q一般不会回到无穷远点，因为这个曲线是模p循环的，每次乘p倍都会回到远点，但是乘q不会

也就是说要找出来一个数是p的倍数但不是q的倍数，这样就能把p找出来了

要实际计算出nP，就需要不断进行点加法，点加法的计算公式是

设 $ (P = (x_1, y_1))，(Q = (x_2, y_2)) $：

当$  (P \neq Q) $时，斜率$  (k = \frac{y_2 - y_1}{x_2 - x_1} \pmod p) $

当$  (P = Q) $时，斜率$  (k = \frac{3x_1^2}{2y_1} \pmod p) $

新点 (R = P + Q = (x_3, y_3)) 的坐标为：

$ x_3 = k^2 - x_1 - x_2 \pmod p  $

$ y_3 = k(x_1 - x_3) - y_1 \pmod p $

其中，当计算$ x_2-x_1 $时，先计算$ g=gcd(x_2-x_1, n) $，若某一步$ x_2-x_1 $能被p整除，那么就有$ 1<g<n $，因此g就是n的一个因子

```python
p2 = 0

rng= Random(114514)

while True:
    P = (rng.randrange(n2), rng.randrange(n2))
    Q = None

    for b in bin(n2)[2:]:

        if Q is not None:
            x, y = Q

            ku, kd = 3 * x * x, 2 * y

            g = gcd(kd, n2)
            if (1 < g < n2):
                p2 = g
                break

            k = ku * pow(kd, -1, n2) % n2
            new_x = (k * k - 2 * x) % n2
            new_y = (k * (x - new_x) - y) % n2 
            Q = (new_x, new_y)
            
            if g == n2:
                Q = None
        
        if b == "1":
            if Q is None:
                Q = P
                continue
            x, y = Q
            s, t = P

            if x == s and (y + t) % n2 == 0:
                Q = None
                continue

            if (P == Q):
                ku, kd = 3 * x * x, 2 * y
            else:
                ku, kd = t - y, s - x
                
            g = gcd(kd, n2)
            if (1 < g < n2):
                p2 = g
                break

            k = ku * pow(kd, -1, n2) % n2
            new_x = (k * k - x - s) % n2
            new_y = (k * (x - new_x) - y) % n2
            Q = (new_x, new_y)
            
    if p2 != 0:
        break

q2 = n2 // p2
d2 = pow(65537, -1, (p2 - 1) * (q2 - 1))
m2 = pow(c2, d2, n2)

print(m2.to_bytes((m2.bit_length() + 7) // 8, "big"))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/5.png" alt="" style="max-width: 80%; height: auto;">

### 02 singin
#### 题目（动态）
欢迎来到密码学，这里有几道前置知识题。但是每次连接后，顺序与题目参数都是随机的，建议写脚本作答。

nc连接哦

#### 答案
PCTF{W3lc0me_t0_3rypt0_w0r14!_b53cdcd1337a}

#### 过程
什么加密大杂烩啊我的天（）

首先记得改utf+8编码

```bash
chcp 65001
```

随机做了几题

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/6.png" alt="" style="max-width: 80%; height: auto;">

```python
p = 4765883
g = 3644830
y = 2217384

value = 1
for x in range(p - 1):
    if value == y:
        print(x)
        break
    value = value * g % p
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/7.png" alt="" style="max-width: 80%; height: auto;">

```python
key = (0xc208cd).to_bytes(3, "big")
cipher = bytes.fromhex(
    "b46bbaa47fbca357a4ab7facb47092b766a9ac7cb7a96c92ba72aea96abaac6792a96ea2a366a49d7dbab06cbe"
)

plain = bytes(c ^ key[i % 3] for i, c in enumerate(cipher))
print(plain.decode("ascii"))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/8.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/9.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/10.png" alt="" style="max-width: 80%; height: auto;">

然后就超时了（）

那这里采用的方法就是，做一题就往解密函数里面塞一题的解法

以下为发现的题

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/11.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/12.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/13.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/14.png" alt="" style="max-width: 80%; height: auto;">

```python
from re import sub, search, escape, findall, MULTILINE
import base64
import socket
import sys

text = ""

def rec(description, names):

    normalize = lambda s: sub(r"\s+", "", s)
    if normalize(description) not in normalize(text):
        return None

    params = {}

    for name in names:
        match = search(rf"^\s*{escape(name)}\s*=\s*(.*?)\s*$", text, flags=MULTILINE)

        if match is None:
            raise ValueError(f"cant find {name}")

        params[name] = match.group(1)

    return params

def caesar():
    des = """
古典密码 / Caesar
参数说明：shift 表示加密时每个字母在 a-z 中向后移动的位数，cipher 是加密后的文本。
作答规则：请将 cipher 按相同 shift 反向移动来解密；下划线保持不变，只提交解密后的明文。
"""
    par = rec(des, ["shift", "cipher"])
    if par is None:
        return None

    result = []
    for c in par["cipher"]:
        if 'A' <= c <= 'Z':
            start, size = ord('A'), 26

        elif 'a' <= c <= 'z':
            start, size = ord('a'), 26

        elif '0' <= c <= '9':
            start, size = ord('0'), 10

        else:
            result.append(c)
            continue

        shift = int(par["shift"])
        result.append(chr(start + (ord(c) - start - shift) % size))

    return ''.join(result)

def dbase64():
    des = """
编码 / Base64
参数说明：base64 是原文经过 Base64 编码后的字符串。
作答规则：请把下面这串 Base64 解码成 ASCII 原文，只提交原文字符串，不要加引号或空格。
"""
    par = rec(des, ["base64"])
    if par is None:
        return None

    return base64.b64decode(par["base64"]).decode("ascii")

def rtkeyxor():
    des = """
异或 / Repeating-key XOR
参数说明：key 是 24bit 左右整数，按 3 字节大端表示后循环使用；cipher_hex 是异或后的密文十六进制。
作答规则：先把 key 转成 3 字节大端字节串，再循环异或 cipher_hex 的每个字节；只提交还原出的 ASCII 原文。
"""
    par = rec(des, ["key", "cipher_hex"])
    if par is None:
        return None

    key = int(par["key"], 0).to_bytes(3, "big")
    cipher = bytes.fromhex(par["cipher_hex"])

    return bytes(c ^ key[i % 3] for i, c in enumerate(cipher)).decode("ascii")

def discrete():
    des = """
数论 / Discrete Log
参数说明：p 是素数模数，g 是生成元，y 是 g 的某个幂模 p 后得到的结果。
作答规则：请提交范围 0 <= x < p-1 内满足 g^x ≡ y (mod p) 的整数 x；参数不大，可以直接暴力枚举。
"""
    par = rec(des, ["p", "g", "y"])
    if par is None:
        return None

    value = 1
    for x in range(int(par["p"]) - 1):
        if value == int(par["y"]):
            return str(x)
        
        value = value * int(par["g"]) % int(par["p"])

    return None

def crt():
    des = """
数论 / CRT
参数说明：每一行给出 x 除以对应模数后的余数；两个模数互素，所以最小非负解唯一。
作答规则：请提交同时满足两行同余式的最小非负整数 x。十进制或 0x 前缀十六进制都可以。
"""
    normalize = lambda s: sub(r"\s+", "", s)
    if normalize(des) not in normalize(text):
        return None

    pairs = findall(r"x\s*≡\s*(\d+)\s*\(mod\s+(\d+)\)", text)

    (r1, m1), (r2, m2) = [(int(r), int(m)) for r, m in pairs]

    k = (r2 - r1) * pow(m1, -1, m2) % m2
    return str((r1 + k * m1) % (m1 * m2))

def modularinverse():
    des = """
数论 / Modular Inverse
参数说明：a 是待求逆的整数，m 是模数，答案 x 需要满足 a*x 与 1 在模 m 下同余。
作答规则：请提交最小非负整数 x，使 a*x ≡ 1 (mod m)。十进制或 0x 前缀十六进制都可以。
"""
    par = rec(des, ["a", "m"])
    if par is None:
        return None

    a = int(par["a"])
    m = int(par["m"])

    return str(pow(a, -1, m))

def lcgpr():
    des = """
伪随机 / LCG Parameter Recovery
参数说明：m 是模数；x0、x1、x2 是同一个 LCG 的连续 3 次输出；LCG 满足 x_next = (a*x + c) mod m，其中 a 和 c 未知。
作答规则：请用差分恢复参数 a 和 c。可令 d0 = x1 - x0，d1 = x2 - x1，则 a ≡ d1 * d0^(-1) (mod m)，再由 c ≡ x1 - a*x0 (mod m) 求 c。请按 a,c 的格式提交两个最小非负整数，逗号或空格分隔都可以。
"""
    par = rec(des, ["m", "x0", "x1", "x2"])
    if par is None:
        return None
    
    m = int(par["m"])
    x0 = int(par["x0"])
    x1 = int(par["x1"])
    x2 = int(par["x2"])

    a = ((x2 - x1) * pow(x1 - x0, -1, m)) % m
    c = (x1 - a * x0) % m

    return f"{a},{c}"

def rehex():
    des = """
编码 / Hex
参数说明：hex 是原文每个字节按十六进制写出的结果，每 2 个十六进制字符表示 1 个字节。
作答规则：请把下面这串 hex 还原成 ASCII 原文，只提交原文字符串，不要加引号或空格。
"""
    par = rec(des, ["hex"])
    if par is None:
        return None

    return bytes.fromhex(par["hex"]).decode("ascii")

def vigenere():
    des = """
典密码 / Vigenere
参数说明：key 是重复使用的移位密钥，cipher 是 Vigenere 加密后的文本。
作答规则：key 只作用在小写字母 a-z 上并循环使用；下划线不消耗 key，也保持不变。请只提交解密后的明文。
"""
    par = rec(des, ["key", "cipher"])
    if par is None:
        return None

    key = par["key"]
    cipher = par["cipher"]

    result = []
    i = 0
    for c in (cipher):
        if "a" <= c <= "z":
            shift = ord(key[i % len(key)]) - ord("a")
            result.append(chr((ord(c) - ord('a') - shift) % 26 + ord('a')))
            i += 1
        else:
            result.append(c)

    return "".join(result)



with socket.create_connection(("challenge1.pctf.top", 31963)) as conn:
    buffer = b""

    while True:
        data = conn.recv(65536)

        if not data:  # 对方关闭连接
            print(buffer.decode("utf-8", errors="replace"))
            break

        buffer += data

        prompt = search("答案[^\\r\\n>]*>".encode("utf-8"), buffer)
        if prompt is None:
            continue

        text = buffer[:prompt.end()].decode("utf-8")
        buffer = buffer[prompt.end():]   

        print(text)
        print() 

        for func in [caesar, dbase64, rtkeyxor, discrete, crt, modularinverse, lcgpr, rehex, vigenere]:
            answer = func()

            if answer is not None:
                conn.sendall((answer + "\n").encode("utf-8"))
                break
        else:
            print("找不到")
            sys.exit(1)
            
        print()
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/15.png" alt="" style="max-width: 80%; height: auto;">

### 03 她没解出来
#### 题目
这道题，我们先让一个 agent 做了。 它跑了 3 小时 47 分，交了三个 flag，全错。 它最后说：“I'm confident.” 这是它的工作区：日志、草稿、工具、它没看完的图，都在。 它甚至写了一篇解题报告。 现在轮到你了。 日志里还混着它自己做 prompt injection 测试留下的一堆模板。 它说那些都是“测试数据”，不用管。 附件：她没解出来-附件.zip （它不知道自己在哪一步错了。你知道。）


<a href="/Download/WpCTF/Comp/P26/Cr/%E5%A5%B9%E6%B2%A1%E8%A7%A3%E5%87%BA%E6%9D%A5-%E9%99%84%E4%BB%B6.zip" download>
    文件
</a>

#### 答案
PCTF{the_agent_was_sure_it_was_right_853eaad7}

#### 过程
这真的不是misc吗（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/16.png" alt="" style="max-width: 80%; height: auto;">

神入agent，不太聪明的样子（）

首先是图片banner里面有个nonce = 0849ca1e06c756d66c7758fd，这应该是个16进制

```python
nonce = bytes.fromhex("0849ca1e06c756d66c7758fd")
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/17.png" alt="" style="max-width: 80%; height: auto;">

我这里用PS拉了一下对比度

其次是capture这张图片

（有一说一这我真没注意到）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/18.png" alt="" style="max-width: 80%; height: auto;">

会发现有水平上的重复，那就尝试把这张图水平位移后与自己异或，看能出来啥东西

```python
import numpy
import sys
from pathlib import Path

from PIL import Image

base = Path(__file__).resolve().parent
input = base / "她没解出来-附件2/capture.png"
img = numpy.array(Image.open(input).convert("RGB"))

for i in range(1, 200):
    proc = numpy.zeros_like(img)
    proc[:, i:] = img[:, :-i]

    Image.fromarray(img ^ proc).save(base / f"她没解出来-附件2/output/cap-{i}.png")
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/19.png" alt="" style="max-width: 80%; height: auto;">

欸，在位移190的时候出现了salt

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/20.png" alt="" style="max-width: 80%; height: auto;">

然后是那个gif

会发现只有上下含有文字的俩东西在动，其他都不变

那直接随波逐流了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/21.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/22.png" alt="" style="max-width: 80%; height: auto;">

NOT ME 

AND ASH

然后就是解密enc

前面三张图片都用了得到一堆字符

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/23.png" alt="" style="max-width: 80%; height: auto;">

vault一看就不觉得是能获取到key的样子（）

因此我先去尝试直接用字符串解密，啥也没解出来，于是借鉴了一下wp

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/24.png" alt="" style="max-width: 80%; height: auto;">

提示说KDF是个SHA256，那就是说key的生成应该是啥东西的哈希，虽然似乎并不是在说这一问，那反正就是那几个字符串排列组合一下都生成几个哈希试试看呗（）

由于对文章的加密方式也不知道，于是就开始尝试碰瓷了，最容易想到的就是异或

大概试了几次tar试出来了

```python
import numpy
import sys
from pathlib import Path
from hashlib import sha256

base = Path(__file__).resolve().parent
input = base / "她没解出来-附件2/notes.enc"
data = input.read_bytes()

tar = b"SALT AND ASH"
key = sha256(tar).digest()

decrypted = bytes(b ^ key[i % len(key)] for i, b in enumerate(data))

try:
    print(decrypted.decode('utf-8'))
finally:
    out = base / "她没解出来-附件2/notes.txt"
    out.write_bytes(decrypted)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/25.png" alt="" style="max-width: 80%; height: auto;">

然后就是，看那个vault的bin也能大概猜出啦flag在那里，那就要想怎么去解，肯定需要一个key

她说salt不需要，结合那几句话没一句真话（），推测应该是需要盐来生成真正的key的

但是并不知道盐是什么，以及怎么用

那就去wp搜一下

能找到这种，一共25个（如果没数错的话）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/26.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/27.png" alt="" style="max-width: 80%; height: auto;">

还有个这个，相当于告诉我们key怎么用了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/28.png" alt="" style="max-width: 80%; height: auto;">

根据日志末尾

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/29.png" alt="" style="max-width: 80%; height: auto;">

可以得知bin里面是有tag的，正常情况下tag一般会放到最后16字节

那么现在有nonce，有key，有密文，有验证tag，基本可以断定为AES的GCM了

```python
import numpy
import sys
from pathlib import Path
from hashlib import sha256
from Crypto.Cipher import AES

base = Path(__file__).resolve().parent / "她没解出来-附件2"
input = base / "notes.enc"
data = input.read_bytes()

tar = b"SALT AND ASH"
key = sha256(tar).digest()

decrypted = bytes(b ^ key[i % len(key)] for i, b in enumerate(data))
salts = [
    0x01cc0cc71687ae97b23ed717107a89df,
    0xb1547cc270e3ab6ee6388fdaf74216dd,
    0xa5e8b2c21a2e9a7c9d7a449eff9acbd3,
    0xa3923f251ab4b76358274f72c1aa2082,
    0xb795c07e37eaccdfb059da1dd127f37a,
    0xf6751fc99d95c713e1368e1a13339ae9,
    0x0841dbd0c13575e7768feabe09be5e9a,
    0x3a10470d2c1ed3f84c44c2d700cd5d24,
    0x3c37633f3924653cc6be3afed95d0442,
    0x523ee5124afaccef20a6b08693165f35,
    0x7cbe0186f47c3659e5be383609e60203,
    0xf1956e5ffbb54630bb3c18cffa8b1af4,
    0xc14693cb8407386c04ba114b0eb81a09,
    0x0de71c38347326fdf0d8f23e9ac5a638,
    0x0ba20527af3b9a414ebaa5143dca16d2,
    0xf9b559710b6a7678a1d828dfab440152,
    0xd232b706576d7ed2faa3e1b511c8b49e,
    0x2b9cc9388948eeaed70c3366ce2a0bb4,
    0x255e9f1e6cd6d0b4e42fee287d59fda7,
    0x1a37a92f373c9a31192d5bf221e27b2a,
    0x82279ba34e326da0caabadde4d725da0,
    0x412eeaa3628ebb1d168fe1e6fc9e7bf9,
    0x28b3a9938fdff4ddcf11cefd07d53a28,
    0x1dd73eccc2914e1050c032341b410d64,
    0xf15fe3608670e90a2c2d522c0f7b07bd,
]

nonce = bytes.fromhex("0849ca1e06c756d66c7758fd")

cipher_f = base / "vault.bin"
vault = cipher_f.read_bytes()
tag = vault[-16:]
cipher = vault[:-16]

for salt in salts:
    try:
        key = sha256(sha256(decrypted).digest() + salt.to_bytes(16, "big") + b"PCTF-2026\n").digest()

        plain = AES.new(key, AES.MODE_GCM, nonce = nonce).decrypt_and_verify(cipher, tag)

        print(plain.decode('utf-8'))
    finally:
        continue
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/30.png" alt="" style="max-width: 80%; height: auto;">

### 04 并案处理
#### 题目
凌晨三点，实验室打印机吐出了两份你的死亡证明 第一份说你死于参考文献少了一个逗号。 第二份说你死于答辩时说了一句“这个显然成立”。 你说自己还活着。打印机说：“系统里显示，你已经通过了死亡审核。” 为了核实你到底死了几次，档案员把所有卷宗两两并案。奇怪的是，档案柜只多占了一点地方。 她翻出一本没有封面的办事手册，页角盖着一个歪歪扭扭的章：案卷编号：2609.20771。 “按这个办，应该来得及。”她把签发记录搅成一包乱码，继续打印你的讣告。 如对死亡结果有异议，请自行解密。 请勿重复去世，以免影响学分认定。


<a href="/Download/WpCTF/Comp/P26/Cr/attachments%28case%29.zip" download>
    文件
</a>

#### 答案
PCTF{is_yangyangyang_two_echoes_reveal_the_hidden_forms_3a3734560e5090f7}

#### 过程
我已认输（）俩AI都教不会我（）

2609.20771是篇论文

[https://arxiv.org/abs/2609.20771](https://arxiv.org/abs/2609.20771)

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/31.png" alt="" style="max-width: 80%; height: auto;">

最终的目的应该就是用这个函数恢复密钥

那就需要知道这三个参数分别应该传入什么

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/32.png" alt="" style="max-width: 80%; height: auto;">

q0、q1是源于这个函数，结合上面的feature推断这应该是把coefficient（系数）转化为整数的东西

那么q0、q1应该就是俩布尔函数的anf系数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/33.png" alt="" style="max-width: 80%; height: auto;">

instance里给出了n是80

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/34.png" alt="" style="max-width: 80%; height: auto;">

其下方给出了nonce跟tag，是AES-GCM模式

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/35.png" alt="" style="max-width: 80%; height: auto;">

每一个输入是19长度，所有chart从6 - 917，因此总共有48个chart，每个chart有14个basis，用于选择是否与origin异或来更改输入，因此传入的是48组每组16384个，一共98304种输入，会得到98304个字节的输出

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/36.png" alt="" style="max-width: 80%; height: auto;">

正好与traces.bin大小对应

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/37.png" alt="" style="max-width: 80%; height: auto;">

但是这里提到，输出中有1/8的噪声，并且不知道哪些输出是第一个函数，哪些是第二个函数

因此需要先拆分输出

先按照json中的分组拆成48个组

```python
from pathlib import Path

base = Path(__file__).resolve().parent / "attachments(case)"

traces_p = base / "traces.bin"
traces_r = traces_p.read_bytes()

traces = [int.from_bytes(traces_r[i * 2048:(i + 1) * 2048], "little") for i in range(48)]
```

（后续“略微”借助了AI的伟力（））

比方说这里先用第一组作为示例

由于一组的输出值存在顺序，那不妨假定这个编号是存在意义的，即这个编号决定了选用哪几个basic参与混合

比方说第八个数索引是7编号是111，那就是basis[2]、basis[1]、basis[0]参与了与origin的混合

因此两个相邻的（0 1、2 3、4 5、...）输入的混合只相差了basic[0]

比方说索引6跟7，110跟111，只相差了basis[0]未参与混合

因此这里就可以尝试做一个测试，看看加上了这个固定的输入变化之后输出是否存在差别

```python
outI = [(traces[0] >> t) & 1 for t in range(16384)]

diff = [outI[t] ^ outI[t ^ 1] for t in range(16384)]
```

接下来继续排查看看basis[1]、basis[2]、… 这些在切换basis[0]的时候是否存在是否对输出具有影响

比方说，diff[t] == ((t >> 2) & 1)，就说明：没选择这个值时切换[0]没影响，或者选择了这个值时切换[0]有影响

当然，也能一次性选取多个，比方说 

diff[t] == (((t >> 1) & 1) ^ ((t >> 3) & 1))

这个假如满足的话，就说明，这俩仅一个开着的情况下会对结果造成影响，或者两个都不开或两个都开时，输出不变。其中两个都开时，可以理解为两个作用相互抵消

因此我们可以直接用一个整数mask来表示选择了哪几位

检测方式最简单的就是

```python
masks = []
max_score = 1
for mask in range(16384):
    same = 0
    disp = 0

    for t in range(16384):
        predicted = (t & mask).bit_count() & 1

        if predicted == diff[t]:
            same += 1
        else:
            disp += 1

    score = max(same, disp) // 2

    if score > max_score:
        masks = [mask]
        max_score = score
    elif score == max_score:
        masks.append(mask)
```

但这样就要跑48 * 16384 * 16384种情况，比较慢，因此（GPT向我）推荐使用快速沃尔什变换（具体方式不在此阐述）

```python
def fwht(values):
    result = values.copy()
    step = 1

    while step < len(result):
        for start in range(0, len(result), step * 2):
            for j in range(step):
                left = start + j
                right = left + step

                a = result[left]
                b = result[right]

                result[left] = a + b
                result[right] = a - b

        step *= 2

    return result

N = len(diff)
    scores = fwht([1 if bit == 0 else -1 for bit in diff])

    ranked = sorted(range(N), key=lambda mask: abs(scores[mask]), reverse=True)

    for mask in ranked[:5]:
        score = (N + abs(scores[mask])) // 2

        print(f"{mask:5d} : {score}/{N} ; {score / N}")
```

这里更改为了查看分数最高的五位

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/38.png" alt="" style="max-width: 80%; height: auto;">（第一组）

能发现，前两项相比于后面两项具有显著性的提高，相比于完全随机（50%）都多了约7个百分点，能推测大概率是我们要找的俩函数的影子

现在是找了basis[0]，那么接下来去看basis[1]、[2]、...

```python
for i in range(14):
    dir = 1 << i
    diff = [out[t] ^ out[t ^ dir] for t in range(16384)]
```

剩下的不变

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/39.png" alt="" style="max-width: 80%; height: auto;">

会发现，每一组都有两个是突出的

这个mask的作用就是告诉我们，当仅改变某一项时，更改哪些其他项会导致输出发生变化，用于寻找恢复二次项位

（下面是GPT举的例子，我觉得很详细：）

 假设只有一个函数、没有噪声。把是否选择各个 basis 的开关叫作：  

t₀、t₁、t₂、……

 假设这个 chart 里的函数是：

$ f(t)=t_0t_1\oplus t_0t_3\oplus t_2t_4
 $

现在只翻转 t₀，把前后输出异或：

$ f(t)\oplus f(t\oplus 1)=t_1\oplus t_3 $

 于是对应的 mask 就是：mask = (1 << 1) | (1 << 3) ，也就是 0b1010

所以，切换第 0 位时找到 mask = 0b1010，就说明原函数中存在：t₀t₁、t₀t₃

也就是说这两项系数为1

（例子end）

但是我们现在只知道这些mask属于这俩函数，还不能确定谁属于哪个函数

因此我们不妨采用跟mask相同的方式来判断：即同时切换basis[0]与basis[1]，也就是dir = 3

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/40.png" alt="" style="max-width: 80%; height: auto;">

会注意到最高分是8064跟8935

如果同时切换这俩，那么相应的，俩mask也应该同时存在

8064 = 16236 ^ 8428

8935 = 1154 ^ 9829

看，确实，这证明16236跟8428是一组的，1154跟9829是一组的

借此，我们就能还原出来这俩函数的所有二次项系数

```python
out = [(trace >> t) & 1 for t in range(16384)]

cand = {}
for i in range(14):
    dir = 1 << i
    diff = [out[t] ^ out[t ^ dir] for t in range(16384)]

    N = len(diff)
    scores = fwht([1 if bit == 0 else -1 for bit in diff])

    ranked = sorted(range(N), key=lambda mask: abs(scores[mask]), reverse=True)

    cand[dir] = (ranked[0], ranked[1])

fun1 = {1: cand[1][0]}
fun2 = {1: cand[1][1]}
for dir in cand.keys():
    if dir == 1:
        continue
    diff = [out[t] ^ out[t ^ dir ^ 1] for t in range(16384)]

    N = len(diff)
    scores = fwht([1 if bit == 0 else -1 for bit in diff])

    ranked = sorted(range(N), key=lambda mask: abs(scores[mask]), reverse=True)

    if (ranked[0] ^ fun1[1]) in cand[dir]:
        fun1[dir] = ranked[0] ^ fun1[1]
        fun2[dir] = ranked[1] ^ fun2[1]
    elif (ranked[1] ^ fun1[1]) in cand[dir]:
        fun1[dir] = ranked[1] ^ fun1[1]
        fun2[dir] = ranked[0] ^ fun2[1]
    else:
        print(f"{dir} failed")

print(fun1)
print(fun2)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/41.png" alt="" style="max-width: 80%; height: auto;">

藉此，再借助48个chart，即能让二次项恢复完毕

然后是一次项

首先，需要先算出来没有二次项的值，或者说，算出来二次项的值后将其跟out抵消掉

```python
quad = [0] * 16384
for i in range(14):
    mask = fun1[1 << i]

    for j in range(i + 1, 14):
        if (mask >> j) & 1:
            for t in range(16384):
                quad[t] ^= ((t >> i) & 1) & ((t >> j) & 1) 
```

当(mask >> j) & 1为1的时候，也就是说此时存在一个 i * j 的二次项

因此需要对这16384个输入全部加上（也就是异或）这么一个二次项

```python
rem = [0] * 16384
for t in range(16384):
    rem[t] = out[t] ^ quad[t]
```

从out中将二次项全部抵消掉

然后剩下的就是一次项，依旧是同理，用mask一个一个找，常数项根据不同多还是相同多来决定

```python
masks = []
max_score = 1
for mask in range(16384):
    same = 0
    disp = 0

    for t in range(16384):
        predicted = (t & mask).bit_count() & 1

        if predicted == rem[t]:
            same += 1
        else:
            disp += 1

    score = max(same, disp) // 2
    const = 0 if same > disp else 1
```

当然，可以直接fwht

```python
scores = fwht([1 if bit == 0 else -1 for bit in rem])

line = max(range(16384), key=lambda mask: abs(scores[mask]))
const = int(scores[line] < 0)
```

这里直接取了最大值，因为这里的rem是根据fun1算出来的，要算fun2的再用fun2的算rem

常数项这么判断的意义是，由于加法是异或，因此若常数项为1，整体结果翻转，因此当差别最大时就说明，常数项是1

然后将数据保存下来

```python
coe = const | (line << 1)

offset = 15
for i in range(14):
    mask = fun[1 << i]

    for j in range(i + 1, 14):
        coe |= ((mask >> j) & 1) << offset
        offset += 1

coes.append(coe)
```

于是遍历48张表，我们得到了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/42.png" alt="" style="max-width: 80%; height: auto;">

类似这样的48张表，每一组都包含了俩函数80个常量的部分信息

然后需要干的第一件事是分组，将相同的函数分到同一侧

（有一说一这块我并不是很理解）

我们不妨假设要求的俩函数是q(x)（到时候解出来俩解就是俩函数的系数了）

对一张chart，不取、仅取一个、取俩basis，通过算出来的两个局部函数（也就是把几个变量定死让剩下的动）计算出来的值都是不一样的，不妨将其命名为y0与y1

存在如下4种可能：00、01、10、11

我们需要一个标志位来区分俩函数，也就是说希望这个标志位是0时y0 = q(x)，标志位为1时y1 = q(x)

也就是说q_at_x = y0 ^ ((y0 ^ y1) & swap)，swap就是这个标志位

当y0 == y1时，q = y0

当y0 != y1时，q ^ swap = y0

对于一张chart，swap都是一样的，

```python
instance = loads((base / "instance.json").read_text())
charts = instance["charts"]

equas = []
for i in range(48):
    chart = charts[i]
    rest = restricts[i]


    origin = int(chart["origin"], 16)
    basis = [int(value, 16) for value in chart["basis"]]

    inputs = [(0, origin)]
    inputs += [(1 << i, origin ^ basis[i]) for i in range(14)]
    inputs += [(1 << i | 1 << j,  origin ^ basis[i] ^ basis[j]) for i in range(14) for j in range(i + 1, 14)]

    for t, x in inputs:
        y0 = (rest[0] & feature(t, 14)).bit_count() & 1
        y1 = (rest[1] & feature(t, 14)).bit_count() & 1
        
        lhs = feature(x, 80)
        if (y0 != y1):
            lhs |= 1 << (3241 + i)

        equas.append((lhs, y0))
```

然后消元，这里运用高斯消元（不在此赘述）

```python
pivots = {}

for lhs, rhs in equas:
    while lhs:
        highest = lhs.bit_length() - 1

        if highest not in pivots:
            pivots[highest] = (lhs, rhs)
            break

        saved_lhs, saved_rhs = pivots[highest]
        lhs ^= saved_lhs
        rhs ^= saved_rhs
    else:
        # 左边消成了 0，右边也应当是 0
        if rhs != 0:
            raise ValueError("矛盾 0 = 1")

print(len(pivots))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/43.png" alt="" style="max-width: 80%; height: auto;">

会发现这里通过消元找到了3288个主元

但是方程一共有3289个变量（常数项1、一次项80、二次项由于只有j>i一共 80 * 79 // 2 = 3160，再加上新加的swap未知位48（48个charts）），也就是说有一个自由位

因此先把自由位找出来

```python
free_bits = [bit for bit in range(3289) if bit not in pivots]
free_bit = free_bits[0]
```

这个自由位分别可以填0跟1，也就对应了俩函数

```python
qs = []
for b in (0, 1):
    solu = b << free_bit

    for highest in sorted(pivots):
        lhs, rhs = pivots[highest]

        know = (lhs & solu).bit_count() & 1

        value = rhs ^ know

        solu |= value << highest

    qs.append(solu & ((1 << 3241) - 1))

print(qs[0])
print(qs[1])
```

从自由位起开始往高位逐位恢复

lhs这里就是掩码决定了哪些位需要被保留

solu就是已经恢复好的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/44.png" alt="" style="max-width: 80%; height: auto;">

得到q0与q1，带入那个求key的公式就行了

```python
from Crypto.Cipher import AES

q0 = 934358376193521906270531326273155312479075442219072953217397871969004471104534580099945577287101734019318197807196661791176196607586865225180215155371149273947070274194683659884619945106752897668885782534959099308795503429288040064783005839682353174400100270908856759995164965397190943374814658156576340255613950499904199871945964617339832327463248192302737340074835006809685990292383864943016548567196369346232576736165594923394852458740067904022520209476825129177343390955677178891174799811718328796610652539998593233292502761855428337648829414863447064863602069451966313433103878208268382904016372671773627910567764598432971647394748766920498483716231306765105235767521833823898994423451830995831693816011997141515228063686308942188623849347763255541580413131331658608019666770666124773092790946891338096941389529247646471591054754487154994132092952142262873169832582929043978621585348978594850900228681218755509697987374154937166705792824142810435938760937635493500181368
q1 = 782124074505970045400843520694699661292469625733671212692999220878832408329380592053210846655678101716380486682303899880994736029415103985865287666896741290503616662560979519517263036752771289806327080706458138999606279246553725539361093374757437202321566253181609391503201847991959551889976415269231916743602035060188825550694735883317383488597366731666874191542613245708076579952848007734299820135204619121298875520374079251926499463752455084958842021221720579587464866214038286608707734532157723078433020302045155437847482875504595193372271219614975834046517145326713721432767136516229770344961211683048278820341556800872107951991629500459353644934512084943751983185396643433347333705687751369792465676468788869717722620982003700917857292595226028155015728809810637498447857796138629552270411320498976216281283400180362143601313293648705236271376872948962258872890036380654027741064133282085056194505425083506557755222595092847707659961365850495418809738636854822021762318
key = derive_key(q0, q1, 80)

nonce = bytes.fromhex("e4cdae8c7c5f2ac3210fb1b4")
ciphertext = bytes.fromhex("c8cf467742c4cdf852abc6be48b2e5df2e84ac269a7778cacad4d021b01fe3729552c7d93040671c5e37595c92c98499dff211e90e4ecefd7671a5f1d3cab1cb0da557d34fbfb2fb80")
tag = bytes.fromhex("c68484792660bacb7b61b41959ad8055")

cipher = AES.new(key, AES.MODE_GCM, nonce = nonce)
cipher.update(b"casefile/v1")

print(cipher.decrypt_and_verify(ciphertext, tag))
```

注意这里需要加上个AAD，直接验证的话是通过不了的

来源是这里

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/45.png" alt="" style="max-width: 80%; height: auto;">

是因为

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/46.png" alt="" style="max-width: 80%; height: auto;">

common上面提了一嘴，所以猜测有的（其实是一开始直接解没解出来（））

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/47.png" alt="" style="max-width: 80%; height: auto;">

#### 代码（一把梭）
```python
from pathlib import Path
from hashlib import sha256
from json import loads
from Crypto.Cipher import AES

DOMAIN = b"casefile/v1"

def feature(x, n):
    """ANF order: 1, x_0,...,x_(n-1), x_0*x_1, x_0*x_2,... ."""
    out = 1 | (x << 1)
    offset = 1 + n
    for i in range(n - 1):
        if (x >> i) & 1:
            out |= (x >> (i + 1)) << offset
        offset += n - i - 1
    return out

def coefficient_count(n):
    return 1 + n + n * (n - 1) // 2

def pack_coefficients(coefficients, n):
    return coefficients.to_bytes((coefficient_count(n) + 7) // 8, "little")


def derive_key(q0, q1, n):
    first, second = sorted([pack_coefficients(q0, n), pack_coefficients(q1, n)])
    return sha256(DOMAIN + b"\0" + n.to_bytes(2, "little")
                  + first + second).digest()

def fwht(values):
    result = values.copy()
    step = 1

    while step < len(result):
        for start in range(0, len(result), step * 2):
            for j in range(step):
                left = start + j
                right = left + step

                a = result[left]
                b = result[right]

                result[left] = a + b
                result[right] = a - b

        step *= 2

    return result


base = Path(__file__).resolve().parent / "attachments(case)"

traces_p = base / "traces.bin"
traces_r = traces_p.read_bytes()

traces = [int.from_bytes(traces_r[i * 2048:(i + 1) * 2048], "little") for i in range(48)]


restricts = []
for trace in traces:
    out = [(trace >> t) & 1 for t in range(16384)]

    cand = {}
    for i in range(14):
        dir = 1 << i
        diff = [out[t] ^ out[t ^ dir] for t in range(16384)]

        N = len(diff)
        scores = fwht([1 if bit == 0 else -1 for bit in diff])

        ranked = sorted(range(N), key=lambda mask: abs(scores[mask]), reverse=True)

        cand[dir] = (ranked[0], ranked[1])

    quad_fun1 = {1: cand[1][0]}
    quad_fun2 = {1: cand[1][1]}
    for dir in cand.keys():
        if dir == 1:
            continue
        diff = [out[t] ^ out[t ^ dir ^ 1] for t in range(16384)]

        N = len(diff)
        scores = fwht([1 if bit == 0 else -1 for bit in diff])

        ranked = sorted(range(N), key=lambda mask: abs(scores[mask]), reverse=True)

        if (ranked[0] ^ quad_fun1[1]) in cand[dir]:
            quad_fun1[dir] = ranked[0] ^ quad_fun1[1]
            quad_fun2[dir] = ranked[1] ^ quad_fun2[1]
        elif (ranked[1] ^ quad_fun1[1]) in cand[dir]:
            quad_fun1[dir] = ranked[1] ^ quad_fun1[1]
            quad_fun2[dir] = ranked[0] ^ quad_fun2[1]
        else:
            print(f"{dir} failed")


    coes = []
    for fun in [quad_fun1, quad_fun2]:
        quad = [0] * 16384
        for i in range(14):
            mask = fun[1 << i]

            for j in range(i + 1, 14):
                if (mask >> j) & 1:
                    for t in range(16384):
                        quad[t] ^= ((t >> i) & 1) & ((t >> j) & 1) 

        rem = [0] * 16384
        for t in range(16384):
            rem[t] = out[t] ^ quad[t]

        scores = fwht([1 if bit == 0 else -1 for bit in rem])

        line = max(range(len(scores)), key=lambda mask: abs(scores[mask]))
        const = int(scores[line] < 0)

        coe = const | (line << 1)

        offset = 15
        for i in range(14):
            mask = fun[1 << i]

            for j in range(i + 1, 14):
                coe |= ((mask >> j) & 1) << offset
                offset += 1

        coes.append(coe)

    restricts.append(tuple(coes))

instance = loads((base / "instance.json").read_text())
charts = instance["charts"]

equas = []
for i in range(48):
    chart = charts[i]
    rest = restricts[i]


    origin = int(chart["origin"], 16)
    basis = [int(value, 16) for value in chart["basis"]]

    inputs = [(0, origin)]
    inputs += [(1 << i, origin ^ basis[i]) for i in range(14)]
    inputs += [(1 << i | 1 << j,  origin ^ basis[i] ^ basis[j]) for i in range(14) for j in range(i + 1, 14)]

    for t, x in inputs:
        y0 = (rest[0] & feature(t, 14)).bit_count() & 1
        y1 = (rest[1] & feature(t, 14)).bit_count() & 1
        
        lhs = feature(x, 80)
        if (y0 != y1):
            lhs |= 1 << (3241 + i)

        equas.append((lhs, y0))


pivots = {}
for lhs, rhs in equas:
    while lhs:
        highest = lhs.bit_length() - 1

        if highest not in pivots:
            pivots[highest] = (lhs, rhs)
            break

        saved_lhs, saved_rhs = pivots[highest]
        lhs ^= saved_lhs
        rhs ^= saved_rhs
    else:
        # 左边消成了 0，右边也应当是 0
        if rhs != 0:
            raise ValueError("方程组出现矛盾：0 = 1")


free_bits = [bit for bit in range(3289) if bit not in pivots]
free_bit = free_bits[0]

qs = []
for b in (0, 1):
    solu = b << free_bit

    for highest in sorted(pivots):
        lhs, rhs = pivots[highest]

        know = (lhs & solu).bit_count() & 1

        value = rhs ^ know

        solu |= value << highest

    qs.append(solu & ((1 << 3241) - 1))

key = derive_key(qs[0], qs[1], 80)

nonce = bytes.fromhex("e4cdae8c7c5f2ac3210fb1b4")
ciphertext = bytes.fromhex("c8cf467742c4cdf852abc6be48b2e5df2e84ac269a7778cacad4d021b01fe3729552c7d93040671c5e37595c92c98499dff211e90e4ecefd7671a5f1d3cab1cb0da557d34fbfb2fb80")
tag = bytes.fromhex("c68484792660bacb7b61b41959ad8055")

cipher = AES.new(key, AES.MODE_GCM, nonce = nonce)
cipher.update(b"casefile/v1")

print(cipher.decrypt_and_verify(ciphertext, tag))
```

### 05 本句已申请转为常温
#### 题目
你往实验室的打印机里倒了一袋猫粮，它宣布自己获得了语言学博士学位。 从此，每到凌晨三点，冰箱、拖鞋和星期八就轮流来作证。每次它们都会换一套名牌；有些夜晚，三张嘴还会一起胡说。 你问 flag 在哪。打印机吐出一沓口供，又贴上一张收费通知： 喵喵喵，汪汪汪。 本次咨询不解释人话，也不接受用逻辑报销。


<a href="/Download/WpCTF/Comp/P26/Cr/%E5%B8%B8%E6%B8%A9.zip" download>
    文件
</a>

#### 答案
PCTF{yangyangyang_miaomiaomiao_wangwangwang_6ecc54e896a82df2}

#### 过程
还有人类吗（） 

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/48.png" alt="" style="max-width: 80%; height: auto;">

依旧AES-GCM

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/49.png" alt="" style="max-width: 80%; height: auto;">

恢复密钥的方式是将几个多项式转化成bytes后结合起来

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/50.png" alt="" style="max-width: 80%; height: auto;">

由于多项式固定位置的次数固定，这里很可能跟上一题一样也是存的是系数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/51.png" alt="" style="max-width: 80%; height: auto;">

通过此处能看出来这个多项式是个啥东西

能看出来其运算方式就是：先把上一次运算的结果 * x，再加上一个新的值（乘法自定义，加法用异或）

（就是说，假如系数是2、5、8，第一处就是2，第二次就是2 * x + 5，第三次就是2 * x * x + 5 * x + 8）

sealed里写了，degree为9，也就是说这个多项式最高次为10，其系数列表长度也为10，但是现在不知道有几个多项式

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/52.png" alt="" style="max-width: 80%; height: auto;">

注意到这里有一大堆不大像人类能想象出来的东西

只有汪跟喵，那很可能就是一个0一个1，既然不知道顺序，那不妨猜测题目给的顺序是对的，喵在汪前，那就是喵0汪1

那既然一列只有三个输出，很可能只有三个多项式函数

这里面一共96条，每个数都是8字节

```python
rows = [
    [0b11110010, 0b11110101, 0b10100000],
    [0b00011011, 0b11000010, 0b01001110],
    [0b00010010, 0b01000111, 0b01101011],
    [0b10111110, 0b01110100, 0b01001111],
    [0b10111100, 0b10110010, 0b11110101],
    [0b01110011, 0b10111011, 0b10110110],
    [0b10011110, 0b01011011, 0b00000101],
    [0b11001000, 0b10011110, 0b10100111],
    [0b01011110, 0b01001000, 0b00110010],
    [0b10011111, 0b01000011, 0b11100001],
    [0b00100101, 0b10110110, 0b10011000],
    [0b11000101, 0b11110100, 0b00001001],
    [0b00001000, 0b11110111, 0b00000011],
    [0b11001010, 0b10111010, 0b00010100],
    [0b00011100, 0b00101111, 0b01011000],
    [0b00111111, 0b01010000, 0b11111100],
    [0b01000011, 0b01101010, 0b01100111],
    [0b01001100, 0b11001100, 0b11001100],
    [0b01110100, 0b00001000, 0b00011001],
    [0b10011000, 0b10110010, 0b00001010],
    [0b00001000, 0b10110110, 0b10011110],
    [0b10100101, 0b11101011, 0b11110011],
    [0b11011000, 0b00000000, 0b11000110],
    [0b00111111, 0b01010011, 0b01110101],
    [0b00011010, 0b01110000, 0b00001011],
    [0b01111100, 0b00101001, 0b00100001],
    [0b11011010, 0b11010011, 0b11001110],
    [0b00110000, 0b01001110, 0b11000011],
    [0b00001001, 0b11101010, 0b00111010],
    [0b10010011, 0b00110010, 0b00011100],
    [0b01011001, 0b00001100, 0b11101101],
    [0b00010100, 0b10011011, 0b01000000],
    [0b11101000, 0b11000111, 0b01110011],
    [0b10100110, 0b00011001, 0b01110100],
    [0b11100010, 0b01110011, 0b11111110],
    [0b01100101, 0b01111110, 0b11110101],
    [0b00001111, 0b10100010, 0b01011100],
    [0b00110110, 0b01110111, 0b10101100],
    [0b10001010, 0b00010111, 0b10101011],
    [0b00100100, 0b10101101, 0b11110000],
    [0b01010101, 0b10101000, 0b00011010],
    [0b11100010, 0b10111100, 0b10011100],
    [0b01100110, 0b10001111, 0b01010110],
    [0b10110100, 0b01100100, 0b11101000],
    [0b11000000, 0b00100011, 0b11100100],
    [0b00010000, 0b01001011, 0b00011101],
    [0b00111101, 0b00001110, 0b10101011],
    [0b01001100, 0b10001001, 0b11001000],
    [0b00110010, 0b01110000, 0b11111001],
    [0b00000011, 0b00101011, 0b01101100],
    [0b11111110, 0b10100010, 0b01001100],
    [0b01011111, 0b01001110, 0b11111100],
    [0b01001110, 0b10111111, 0b11101110],
    [0b10100011, 0b10001111, 0b00001111],
    [0b10010000, 0b10100111, 0b11100011],
    [0b10000011, 0b10101101, 0b10010101],
    [0b00100110, 0b10100110, 0b01101110],
    [0b01100110, 0b01000000, 0b01000111],
    [0b11000010, 0b00100010, 0b10110001],
    [0b01001000, 0b10010000, 0b00110000],
    [0b00010110, 0b10101001, 0b00100000],
    [0b10010011, 0b10100111, 0b10000000],
    [0b10110110, 0b01010001, 0b00000110],
    [0b01001010, 0b00000010, 0b10100111],
    [0b11000000, 0b01100010, 0b00100001],
    [0b00001111, 0b01010010, 0b11000000],
    [0b11110110, 0b00100111, 0b01100010],
    [0b11010101, 0b01001000, 0b11110000],
    [0b11101100, 0b01010101, 0b01111111],
    [0b10011110, 0b00001011, 0b00011101],
    [0b11101110, 0b11011100, 0b11011110],
    [0b10100010, 0b00000010, 0b10011001],
    [0b00000111, 0b11010101, 0b10110110],
    [0b01111110, 0b00010110, 0b01100000],
    [0b01000011, 0b01000010, 0b11111101],
    [0b10000010, 0b01011000, 0b00010011],
    [0b11011111, 0b00100011, 0b11001001],
    [0b00110001, 0b11110001, 0b00100011],
    [0b10101000, 0b11011001, 0b10010010],
    [0b11010001, 0b01000010, 0b11001111],
    [0b00111100, 0b10011100, 0b00000000],
    [0b10000000, 0b10000000, 0b01000011],
    [0b11001010, 0b01000101, 0b11001100],
    [0b00001000, 0b01011110, 0b11010111],
    [0b11101010, 0b01001111, 0b00010001],
    [0b11010110, 0b11011000, 0b10100110],
    [0b11011011, 0b01001100, 0b11011000],
    [0b11010001, 0b10011100, 0b01110100],
    [0b01001001, 0b11010011, 0b00001001],
    [0b10000011, 0b01010101, 0b00010000],
    [0b00001110, 0b11100001, 0b01000001],
    [0b11110010, 0b01110101, 0b01100110],
    [0b10000001, 0b11101000, 0b01100111],
    [0b01101000, 0b01000101, 0b10010001],
    [0b01000011, 0b11110100, 0b01000000],
    [0b11100010, 0b00101011, 0b11110111],
]
```

原题说，三张嘴会同时说胡话，那按照理解就是某一行会同时出错

首先先把错误数据尝试删除

由于无法确定是否第一列真的来源于同一个函数，需要找到一个方式让顺序不再重要（类似轮换式）

于是我们可以构造 (z + a)(z + b)(z + c)

这里引入z的目的是，如果仅有a + b + c 或者说 abc 的话，到时候没办法恢复a、b、c

如果引入了z，那么展开以后就是

$ z^3+(a+b+c) \cdot z^2+(ab+ac+bc) \cdot z+abc $

此时在z的不同次幂的位置，有三个不同的包含a、b、c的式子，这样后面能还原a、b、c

这是因为在此处加法是异或，因此可以直接找z，该方程z的根就是a、b、c

因此我们需要构建$ (a+b+c) $的值、$ (ab+ac+bc) $的值、以及$ abc $的值

```python
sums = []
for row in rows:
    ab = mul(row[0], row[1])
    bc = mul(row[1], row[2])
    ac = mul(row[0], row[2])
    
    v1 = row[0] ^ row[1] ^ row[2]
    v2 = ab ^ bc ^ ac
    v3 = mul(ab, row[2])
    
    sums.append((v1, v2, v3))
    print((v1, v2, v3))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/53.png" alt="" style="max-width: 80%; height: auto;">

一共96行

然后开始尝试清楚错误行

我们希望让错误行的“权重”为0，也就是说不干扰后续对多项式的求解，也就是说，我们希望出现一个函数，其作用是将所有的错误行自动清理掉

假设有一行x = m是错误行，那便让这个函数，称之为E(x)，包含一个因子 (x ^ 2) ，这样当此行传入E(x)的时候，便会让E(x) = 0

然后，假如没有错误，解方程的方式就是让F(x) = y，那既然现在有错误行，可以在等式两边同时乘上E(x)，这样当错误行出现的时候，E(x)便会让等式两边都变成0

令S1、2、3(x) · E(x) 为 Q1、2、3(x) ，这里S1、S2、S3指的就是上面算出来的那个s1 s2 s3各自决定的方程

由于E(x)本身次数是e（错误个数）

那么Q1、Q2、Q3分别就是9 + e、18 + e、27 + e次，可填系数分别就是10 + e、19 + e、28 + e个，为了便于消元等后续行为，把E也一块塞进来，由于E(x)是e次，但是为了防止E(x)直接等于0（也就是说啥也没有），强行令E(x)最高项系数为1，因此E(x)需要填的系数也是e个

也就是说一共有57 + 4e个系数需要求解，由于方程一共有96 * 3个，因此e最高取(288 - 57) // 4 = 57

现在就有一个问题，参数从何而来

这里我一开始猜的是行数，就是说第一行就是1，第五行传入x就是5，但是后来发现解不出来

遂换成，第一行用EXP[0]、第五行用EXP[4]这样的

构建矩阵

```python
matrix = []
for i in range(96):
    x = EXP[i]
    y = sums[i]

    powers = [1]
    for _ in range(84):
        powers.append(mul(powers[-1], x))

    row1 = powers[:67] + [0] * 76 + [0] * 85 + [mul(y[0], p) for p in powers[:57]] + [mul(y[0], powers[57])]
    row2 = [0] * 67 + powers[:76] + [0] * 85 + [mul(y[1], p) for p in powers[:57]] + [mul(y[1], powers[57])]
    row3 = [0] * 67 + [0] * 76 + powers[:85] + [mul(y[2], p) for p in powers[:57]] + [mul(y[2], powers[57])]

    matrix.extend([row1, row2, row3])
```

然后高斯消元化为行阶梯型（这里我直接让GPT写的（））

```python
nvars = len(matrix[0]) - 1  # 285 个未知系数
pivot_row = 0              # 下一个主元行要放的位置
pivot_cols = []

for col in range(nvars):
    # 在还没处理的行里，找这一列非零的行
    found = None
    for r in range(pivot_row, len(matrix)):
        if matrix[r][col] != 0:
            found = r
            break

    if found is None:
        continue

    matrix[pivot_row], matrix[found] = matrix[found], matrix[pivot_row]

    # 整行乘主元的逆元，把主元化成 1
    scale = inverse(matrix[pivot_row][col])
    matrix[pivot_row] = [mul(value, scale) for value in matrix[pivot_row]]

    # 消掉下面所有行的这一列
    for r in range(pivot_row + 1, len(matrix)):
        factor = matrix[r][col]
        if factor == 0:
            continue

        for j in range(col, nvars + 1):  # 最后一格右端也要更新
            matrix[r][j] ^= mul(factor, matrix[pivot_row][j])

    pivot_cols.append(col)
    pivot_row += 1

for row in matrix[pivot_row:]:
    if not any(row[:-1]) and row[-1] != 0:
        raise ValueError("matrix has no root, z = nz")

print(len(pivot_cols))
```

大致做法跟我们正常做矩阵一样，先把首行第一个变成1，然后把这下面的全部变成0，通过行变换跟列变换

这里就能测试出来，如果x = i 或其他的而非EXP[i]，就会报错

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/54.png" alt="" style="max-width: 80%; height: auto;">

也能证明x就是EXP[i]

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/55.png" alt="" style="max-width: 80%; height: auto;">

一共282个主元

然后解方程

```python
solu = [0] * nvars
for i in range(len(pivot_cols) - 1, -1, -1):
    col = pivot_cols[i]
    row = matrix[i]

    value = row[-1]
    for j in range(col + 1, nvars):
        value ^= mul(row[j], solu[j])

    solu[col] = value

q1 = solu[:67]
q2 = solu[67:143]
q3 = solu[143:228]
e = solu[228:285] + [1]
```

然后把e从q里面剔除掉，这样就得到了原本的s1、s2、s3那三个函数

e目前只是错误行候选项，错误行肯定在e里面，但是由于给了57个因子的位置，实际上的错误行很可能会比e排除掉的少

由于定义q时，e就是其中一个因子，因此若出现无法整除的情况即证明存在问题

```python
s1 = []
s2 = []
s3 = []
for q, s in zip([q1, q2, q3], [s1, s2, s3]):
    rem = q.copy()
    quot = [0] * (len(q) - len(e) + 1)
    degree = len(e) - 1

    for i in range(len(quot) - 1, -1, -1):
        coe = quot[i] = rem[i + degree]

        for j, value in enumerate(e):
            rem[i + j] ^= mul(coe, value)

    if any(rem):
        raise ValueError("q // e failed")

    s[:] = quot
```

这样就能把s1、s2、s3整出来了

然后直接枚举找根

```python
corrects = []
for i in range(96):
    x = EXP[i]
    v1 = evaluate(s1, x)
    v2 = evaluate(s2, x)
    v3 = evaluate(s3, x)

    roots = []
    for z in range(256):
        if (evaluate([v3, v2, v1, 1], z) == 0):
            roots.append(z)

    print(tuple(roots))
    corrects.append(tuple(roots))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/56.png" alt="" style="max-width: 80%; height: auto;">

但是会发现

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/57.png" alt="" style="max-width: 80%; height: auto;">

可能会出现重根

这时不妨利用v1，也就是v1 = a ^ b ^ c，假如重根是a，那么v1 = a ^ a ^ b就等于b

因此可以在压入前加上判断

```python
corrects = []
for i in range(96):
    x = EXP[i]
    v1 = evaluate(s1, x)
    v2 = evaluate(s2, x)
    v3 = evaluate(s3, x)

    roots = []
    for z in range(256):
        if (evaluate([v3, v2, v1, 1], z) == 0):
            roots.append(z)

    if len(roots) == 2:
        if v1 == roots[0]:
            roots.append(roots[1])
        elif v1 == roots[1]:
            roots.append(roots[0])
        else:
            raise ValueError("错了喵~")
    
    elif len(roots) == 2:
        roots *= 3

    corrects.append(roots)
```

于是我们现在得到了一份正确的表格

剩下的就是，怎么找到这个函数

由于这个多项式也就9次，10个系数需要找，那么10个方程就能解出来  
也就是说，取corrects前10个组成一个方程组，由于每一位对应哪个函数并不知道，那就枚举

即，先令160为第一个函数，假设27也是第一个函数，解出来如果有一个不对那就舍弃改成78属于第一个函数

总共数量也就5万多次（59049），可以依靠计算机枚举

这里依靠itertools的product生成枚举项

然后再次高斯消元得系数

```python
results = []
for test in product(*corrects[:10]):

    matrix = []
    for i in range(10):
        x = EXP[i]
        y = test[i]

        powers = [1]
        for _ in range(9):
            powers.append(mul(powers[-1], x))

        matrix.append(powers + [y])

    for col in range(10):
        for r in range(col, 10):
            if matrix[r][col] != 0:
                matrix[col], matrix[r] = matrix[r], matrix[col]
                break
        else:
            raise ValueError("非零主元喵~！")

        scale = inverse(matrix[col][col])
        matrix[col] = [mul(value, scale) for value in matrix[col]]
        
        for r in range(10):
            if r == col:
                continue

            factor = matrix[r][col]
            if factor == 0:
                continue

            for j in range(11):
                matrix[r][j] ^= mul(factor, matrix[col][j])

    cand = [row[-1] for row in matrix]


    for i in range(10, 96):
        if evaluate(cand, EXP[i]) not in corrects[i]:
            break

    else:
        results.append(cand)
        print(cand)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/58.png" alt="" style="max-width: 80%; height: auto;">

得到三组

```python
[173, 11, 246, 166, 166, 254, 99, 24, 2, 119]
[22, 96, 7, 27, 255, 69, 234, 22, 39, 249]
[33, 249, 158, 12, 118, 67, 43, 201, 253, 149]
```

解就行了

```python
results = [
    [173, 11, 246, 166, 166, 254, 99, 24, 2, 119]
    [22, 96, 7, 27, 255, 69, 234, 22, 39, 249]
    [33, 249, 158, 12, 118, 67, 43, 201, 253, 149]
]

key = derive_key(results)
nonce = bytes.fromhex("dffb4001f8332077bbd64aab")
ciphertext = bytes.fromhex("f655857628c976d8813a179278bc20598eb779419439ff6c6fbc46843f5a1c71046fb823ac6ac630464a79269f172c0e3328491fbf2dbcf1479beb743b")
tag = bytes.fromhex("32136566a9caf52dba776d693a3d5bd5")

cipher = AES.new(key, AES.MODE_GCM, nonce = nonce)
cipher.update(b"nightshift/v1")

print(cipher.decrypt_and_verify(ciphertext, tag))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/59.png" alt="" style="max-width: 80%; height: auto;">

#### 代码（一把梭）
```python
from itertools import product
from hashlib import sha256
from Crypto.Cipher import AES

MODULUS = 0x11D
DOMAIN = b"nightshift/v1"
EXP = [0] * 510
LOG = [0] * 256
value = 1
for exponent in range(255):
    EXP[exponent] = value
    LOG[value] = exponent
    value <<= 1
    if value & 0x100:
        value ^= MODULUS
for exponent in range(255, 510):
    EXP[exponent] = EXP[exponent - 255]
assert len(set(EXP[:255])) == 255

rows = [
    [0b11110010, 0b11110101, 0b10100000],
    [0b00011011, 0b11000010, 0b01001110],
    [0b00010010, 0b01000111, 0b01101011],
    [0b10111110, 0b01110100, 0b01001111],
    [0b10111100, 0b10110010, 0b11110101],
    [0b01110011, 0b10111011, 0b10110110],
    [0b10011110, 0b01011011, 0b00000101],
    [0b11001000, 0b10011110, 0b10100111],
    [0b01011110, 0b01001000, 0b00110010],
    [0b10011111, 0b01000011, 0b11100001],
    [0b00100101, 0b10110110, 0b10011000],
    [0b11000101, 0b11110100, 0b00001001],
    [0b00001000, 0b11110111, 0b00000011],
    [0b11001010, 0b10111010, 0b00010100],
    [0b00011100, 0b00101111, 0b01011000],
    [0b00111111, 0b01010000, 0b11111100],
    [0b01000011, 0b01101010, 0b01100111],
    [0b01001100, 0b11001100, 0b11001100],
    [0b01110100, 0b00001000, 0b00011001],
    [0b10011000, 0b10110010, 0b00001010],
    [0b00001000, 0b10110110, 0b10011110],
    [0b10100101, 0b11101011, 0b11110011],
    [0b11011000, 0b00000000, 0b11000110],
    [0b00111111, 0b01010011, 0b01110101],
    [0b00011010, 0b01110000, 0b00001011],
    [0b01111100, 0b00101001, 0b00100001],
    [0b11011010, 0b11010011, 0b11001110],
    [0b00110000, 0b01001110, 0b11000011],
    [0b00001001, 0b11101010, 0b00111010],
    [0b10010011, 0b00110010, 0b00011100],
    [0b01011001, 0b00001100, 0b11101101],
    [0b00010100, 0b10011011, 0b01000000],
    [0b11101000, 0b11000111, 0b01110011],
    [0b10100110, 0b00011001, 0b01110100],
    [0b11100010, 0b01110011, 0b11111110],
    [0b01100101, 0b01111110, 0b11110101],
    [0b00001111, 0b10100010, 0b01011100],
    [0b00110110, 0b01110111, 0b10101100],
    [0b10001010, 0b00010111, 0b10101011],
    [0b00100100, 0b10101101, 0b11110000],
    [0b01010101, 0b10101000, 0b00011010],
    [0b11100010, 0b10111100, 0b10011100],
    [0b01100110, 0b10001111, 0b01010110],
    [0b10110100, 0b01100100, 0b11101000],
    [0b11000000, 0b00100011, 0b11100100],
    [0b00010000, 0b01001011, 0b00011101],
    [0b00111101, 0b00001110, 0b10101011],
    [0b01001100, 0b10001001, 0b11001000],
    [0b00110010, 0b01110000, 0b11111001],
    [0b00000011, 0b00101011, 0b01101100],
    [0b11111110, 0b10100010, 0b01001100],
    [0b01011111, 0b01001110, 0b11111100],
    [0b01001110, 0b10111111, 0b11101110],
    [0b10100011, 0b10001111, 0b00001111],
    [0b10010000, 0b10100111, 0b11100011],
    [0b10000011, 0b10101101, 0b10010101],
    [0b00100110, 0b10100110, 0b01101110],
    [0b01100110, 0b01000000, 0b01000111],
    [0b11000010, 0b00100010, 0b10110001],
    [0b01001000, 0b10010000, 0b00110000],
    [0b00010110, 0b10101001, 0b00100000],
    [0b10010011, 0b10100111, 0b10000000],
    [0b10110110, 0b01010001, 0b00000110],
    [0b01001010, 0b00000010, 0b10100111],
    [0b11000000, 0b01100010, 0b00100001],
    [0b00001111, 0b01010010, 0b11000000],
    [0b11110110, 0b00100111, 0b01100010],
    [0b11010101, 0b01001000, 0b11110000],
    [0b11101100, 0b01010101, 0b01111111],
    [0b10011110, 0b00001011, 0b00011101],
    [0b11101110, 0b11011100, 0b11011110],
    [0b10100010, 0b00000010, 0b10011001],
    [0b00000111, 0b11010101, 0b10110110],
    [0b01111110, 0b00010110, 0b01100000],
    [0b01000011, 0b01000010, 0b11111101],
    [0b10000010, 0b01011000, 0b00010011],
    [0b11011111, 0b00100011, 0b11001001],
    [0b00110001, 0b11110001, 0b00100011],
    [0b10101000, 0b11011001, 0b10010010],
    [0b11010001, 0b01000010, 0b11001111],
    [0b00111100, 0b10011100, 0b00000000],
    [0b10000000, 0b10000000, 0b01000011],
    [0b11001010, 0b01000101, 0b11001100],
    [0b00001000, 0b01011110, 0b11010111],
    [0b11101010, 0b01001111, 0b00010001],
    [0b11010110, 0b11011000, 0b10100110],
    [0b11011011, 0b01001100, 0b11011000],
    [0b11010001, 0b10011100, 0b01110100],
    [0b01001001, 0b11010011, 0b00001001],
    [0b10000011, 0b01010101, 0b00010000],
    [0b00001110, 0b11100001, 0b01000001],
    [0b11110010, 0b01110101, 0b01100110],
    [0b10000001, 0b11101000, 0b01100111],
    [0b01101000, 0b01000101, 0b10010001],
    [0b01000011, 0b11110100, 0b01000000],
    [0b11100010, 0b00101011, 0b11110111],
]

def mul(a, b):
    return 0 if a == 0 or b == 0 else EXP[LOG[a] + LOG[b]]

def inverse(a):
    if a == 0:
        raise ZeroDivisionError("zero has no multiplicative inverse")
    return EXP[255 - LOG[a]]

def evaluate(coefficients, x):
    value = 0
    for coefficient in reversed(coefficients):
        value = mul(value, x) ^ coefficient
    return value


sums = []
for row in rows:
    ab = mul(row[0], row[1])
    bc = mul(row[1], row[2])
    ac = mul(row[0], row[2])
    
    s1 = row[0] ^ row[1] ^ row[2]
    s2 = ab ^ bc ^ ac
    s3 = mul(ab, row[2])

    sums.append((s1, s2, s3))

matrix = []
for i in range(96):
    x = EXP[i]
    y = sums[i]

    powers = [1]
    for _ in range(84):
        powers.append(mul(powers[-1], x))

    row1 = powers[:67] + [0] * 76 + [0] * 85 + [mul(y[0], p) for p in powers[:57]] + [mul(y[0], powers[57])]
    row2 = [0] * 67 + powers[:76] + [0] * 85 + [mul(y[1], p) for p in powers[:57]] + [mul(y[1], powers[57])]
    row3 = [0] * 67 + [0] * 76 + powers[:85] + [mul(y[2], p) for p in powers[:57]] + [mul(y[2], powers[57])]

    matrix.extend([row1, row2, row3])


nvars = len(matrix[0]) - 1  # 285 个未知系数
pivot_row = 0              # 下一个主元行要放的位置
pivot_cols = []

for col in range(nvars):
    # 在还没处理的行里，找这一列非零的行
    found = None
    for i in range(pivot_row, len(matrix)):
        if matrix[i][col] != 0:
            found = i
            break

    if found is None:
        continue

    matrix[pivot_row], matrix[found] = matrix[found], matrix[pivot_row]

    # 整行乘主元的逆元，把主元化成 1
    scale = inverse(matrix[pivot_row][col])
    matrix[pivot_row] = [mul(value, scale) for value in matrix[pivot_row]]

    # 消掉下面所有行的这一列
    for i in range(pivot_row + 1, len(matrix)):
        factor = matrix[i][col]
        if factor == 0:
            continue

        for j in range(col, nvars + 1):  # 最后一格右端也要更新
            matrix[i][j] ^= mul(factor, matrix[pivot_row][j])

    pivot_cols.append(col)
    pivot_row += 1

for row in matrix[pivot_row:]:
    if not any(row[:-1]) and row[-1] != 0:
        raise ValueError("matrix has no root, z = nz")

print(len(pivot_cols))

    
solu = [0] * nvars
for i in range(len(pivot_cols) - 1, -1, -1):
    col = pivot_cols[i]
    row = matrix[i]

    value = row[-1]
    for j in range(col + 1, nvars):
        value ^= mul(row[j], solu[j])

    solu[col] = value

q1 = solu[:67]
q2 = solu[67:143]
q3 = solu[143:228]
e = solu[228:285] + [1]

s1 = []
s2 = []
s3 = []
for q, s in zip([q1, q2, q3], [s1, s2, s3]):
    rem = q.copy()
    quot = [0] * (len(q) - len(e) + 1)
    degree = len(e) - 1

    for i in range(len(quot) - 1, -1, -1):
        coe = quot[i] = rem[i + degree]

        for j, value in enumerate(e):
            rem[i + j] ^= mul(coe, value)

    if any(rem):
        raise ValueError("q // e failed")

    s[:] = quot

corrects = []
for i in range(96):
    x = EXP[i]
    v1 = evaluate(s1, x)
    v2 = evaluate(s2, x)
    v3 = evaluate(s3, x)

    roots = []
    for z in range(256):
        if (evaluate([v3, v2, v1, 1], z) == 0):
            roots.append(z)

    if len(roots) == 2:
        if v1 == roots[0]:
            roots.append(roots[1])
        elif v1 == roots[1]:
            roots.append(roots[0])
        else:
            raise ValueError("错了喵~")
    
    elif len(roots) == 1:
        roots *= 3

    corrects.append(roots)

results = []
for test in product(*corrects[:10]):

    matrix = []
    for i in range(10):
        x = EXP[i]
        y = test[i]

        powers = [1]
        for _ in range(9):
            powers.append(mul(powers[-1], x))

        matrix.append(powers + [y])

    for col in range(10):
        for r in range(col, 10):
            if matrix[r][col] != 0:
                matrix[col], matrix[r] = matrix[r], matrix[col]
                break
        else:
            raise ValueError("非零主元喵~！")

        scale = inverse(matrix[col][col])
        matrix[col] = [mul(value, scale) for value in matrix[col]]
        
        for r in range(10):
            if r == col:
                continue

            factor = matrix[r][col]
            if factor == 0:
                continue

            for j in range(11):
                matrix[r][j] ^= mul(factor, matrix[col][j])

    cand = [row[-1] for row in matrix]


    for i in range(10, 96):
        if evaluate(cand, EXP[i]) not in corrects[i]:
            break

    else:
        results.append(cand)
        print(cand)


def derive_key(polynomials):
    serialized = sorted(bytes(polynomial) for polynomial in polynomials)
    return sha256(DOMAIN + b"\0" + b"".join(serialized)).digest()

key = derive_key(results)
nonce = bytes.fromhex("dffb4001f8332077bbd64aab")
ciphertext = bytes.fromhex("f655857628c976d8813a179278bc20598eb779419439ff6c6fbc46843f5a1c71046fb823ac6ac630464a79269f172c0e3328491fbf2dbcf1479beb743b")
tag = bytes.fromhex("32136566a9caf52dba776d693a3d5bd5")

cipher = AES.new(key, AES.MODE_GCM, nonce = nonce)
cipher.update(b"nightshift/v1")

print(cipher.decrypt_and_verify(ciphertext, tag))
```

### 06 来签个到吧
#### 题目
Alice 知道直接发送同一条消息不太安全，于是她为其中一份消息乘上了一个随机掩码。她认为，只要掩码足够大，原消息就不会泄露。 加油，其实就是一道签到题！！！


<a href="/Download/WpCTF/Comp/P26/Cr/%E7%AD%BE%E4%B8%AA%E5%88%B0.zip" download>
    文件
</a>

#### 答案
PCTF{aDypQ7XuDNoGYH4p1tGU7lBuS0Ju}

#### 过程
看到rsa的那一刻感觉通透了（）

怎么敢的啊（）复用了三次（）你要随机干啥啊（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/60.png" alt="" style="max-width: 80%; height: auto;">

c2跟c3相当于是

$ c2 \equiv m^{e2} \cdot r^{e2} \pmod n $

$ c3 \equiv r^{e2} \pmod n $

所以c2乘上c3逆元就能把r消掉

变成

$ c4 \equiv m^{e2} \pmod n $

然后就跟

$ c1 \equiv m^{e1} \pmod n $

共模攻击就行了

9 × 65537 - 34696 × 17 = 1

```python
n = 104290902396023798825331906914980473840233841143538975454720956070834456159517179855093166280582041081317704502389303064189731511674439735072076708507562727451958846770767564759771493334642950647122600035078008639451730426714072935655683709160215221282087554759441747380619436476578015293471818905026195711731
e1 = 65537
e2 = 17
c1 = 15596341094722580399405554573453763681710766685632871522029305227584772760331027005072423526497521624615163540837648988699423878791398201566908100067201349617828764134697151200842732541223436186762225244566254752316537723578291582332122379565790487423775510721064908240579660219875061534322456466153315956766
c2 = 51876385458446758315159327473611266176758077704264416511141351877107767000717491654021563112943427015888505832489178798489679712776329781661438714012166729607349219842801607188044761798697190738931427070851113277043087324050628353698136521839286360751796318781377402498001642936503017028489024511670433985321
c3 = 103335254495684833437666649058496410905068707734819185133867990024477536632492526183954561777704338120294404350590224870000094455098049995023996306091232623387610456867972290615511635991368157242491981191783878948817230555657493138542685754086865543574946356492697125058653013902415613976863703979527283931868


r_c3 = pow(c3, -1, n)
c4 = c2 * r_c3 % n

m = pow(c1, 9, n) * pow(c4, -34696, n) % n

print(m.to_bytes((m.bit_length() + 7) // 8, "big"))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/61.png" alt="" style="max-width: 80%; height: auto;">

### 07 百景图
#### 题目
百景图 残页两千零四十八枚，幅不盈寸；有原迹，有后人添笔，添笔处与原画只差毫厘。 题签已佚，旧册尚在人间。认祖归宗、物归原序，添的那几笔自会说出答案。


<a href="/Download/WpCTF/Comp/P26/Cr/attachments%28hundred%29.zip" download>
    文件
</a>

#### 答案
PCTF{you_get_a_correct_answer}

#### 过程
我又不是梅露露（）搞半天还要自己拼（）

有一说一真让我做我找来源那步就卡住了（）

既然题目说“添笔处与原画只差毫厘”那就很可能是类似隐写术，改了颜色代码的最后一位或最后两位，因此判别不出来

那就去找原图

这些图是CIFAR-100，去网上下载下来

然后我尝试保存了一下第一张图看看是不是（）

```python
from pathlib import Path
import pickle
from PIL import Image

base = Path(__file__).resolve().parent / "attachments(hundred)"
folder = base / "cifar-100-python" / "cifar-100-python"

with (folder / "train").open("rb") as f:
    dataset = pickle.load(f, encoding="bytes")

pixels = dataset[b"data"][0]

pixels = pixels.reshape(3, 32, 32).transpose(1, 2, 0)

Image.fromarray(pixels).save(base / "first.png")
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/62.png" alt="" style="max-width: 80%; height: auto;">（芝士结果）

那么接下来就是遍历读取image，尝试跟CIFAR-100里面这些图片匹配

```python
base = Path(__file__).resolve().parent / "attachments(hundred)"
t_folder = base / "cifar-100-python" / "cifar-100-python"
i_folder = base / "images"

with (t_folder / "train").open("rb") as f:
    dataset = pickle.load(f, encoding="bytes")

checks = []
for i, path in enumerate(i_folder.glob("*.png")):
    with Image.open(path) as img:
        pixels = numpy.array(img.convert("RGB"))

    pixels = pixels.transpose(2, 0, 1).reshape(-1)

    for j, ori in enumerate(dataset[b"data"]):
        if (numpy.array_equal(pixels >> 1, ori >> 1)):
            checks.append((j, int(not numpy.array_equal(pixels, ori))))
            break
    print(f"{i + 1} / 2048")
```

但是尝试跑一下就知道，这么做慢的一批

主要是每次都要去遍历50000张图，非常慢

因此不妨让遍历变成查字典，只要通过这个键能查出来就证明存在

```python
with (t_folder / "train").open("rb") as f:
    dataset = pickle.load(f, encoding="bytes")

lookup = {}
for j, ori in enumerate(dataset[b"data"]):
    fingerprint = (ori >> 1).tobytes()
    lookup.setdefault(fingerprint, []).append(j)
```

先加上一个字典

```python
checks = []
for i, path in enumerate(i_folder.glob("*.png")):
    with Image.open(path) as img:
        pixels = numpy.array(img.convert("RGB"))

    pixels = pixels.transpose(2, 0, 1).reshape(-1)

    fingerprint = (pixels >> 1).tobytes()
    matches = lookup.get(fingerprint, [])

    if len(matches) == 1:
        j = matches[0]
        ori = dataset[b"data"][j]
        changed = int(not numpy.array_equal(pixels, ori))
        checks.append((j, changed))
    else:
        print(f"何字典？{path.name} - {len(matches)}")

    print(f"{i} / 2048")
```

然后直接查字典，这样就省去了每张图遍历50000次

但是现在依旧不知道顺序是什么

因此先采用CIFAR-100的顺序

然后开始看到底改了啥

先看看是不是只改了一个颜色

```python
    if len(matches) == 1:
        j = matches[0]
        ori = dataset[b"data"][j]
        changed = int(not numpy.array_equal(pixels, ori))
        checks.append(((j, i), changed))


        positions = numpy.flatnonzero(pixels != ori)

        if len(positions):
            r += numpy.count_nonzero(positions < 1024)
            g += numpy.count_nonzero((positions >= 1024) & (positions < 2048))
            b += numpy.count_nonzero(positions >= 2048)
```

然后把r、g、b三个print出来

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/63.png" alt="" style="max-width: 80%; height: auto;">

可以看到基本都改了r，g也改了，b完全没动

那细看一下到底是谁改了g，此时r什么状况

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/64.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/65.png" alt="" style="max-width: 80%; height: auto;">

也就是说G改的两处，R都没动

那看看G改了啥

```python
        if len(positions):
            r += numpy.count_nonzero(positions < 1024)
            g += numpy.count_nonzero((positions >= 1024) & (positions < 2048))
            b += numpy.count_nonzero(positions >= 2048)
            
            g_count = numpy.count_nonzero((positions >= 1024) & (positions < 2048))
            if g_count:
                g_bits = pixels[1024:1024 + 256] & 1
                data = numpy.packbits(g_bits).tobytes()
                print(j, data)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Cr/66.png" alt="" style="max-width: 80%; height: auto;">

#### 代码（一把梭）
```python
from pathlib import Path
import pickle
from PIL import Image
import numpy

base = Path(__file__).resolve().parent / "attachments(hundred)"
t_folder = base / "cifar-100-python" / "cifar-100-python"
i_folder = base / "images"

with (t_folder / "train").open("rb") as f:
    dataset = pickle.load(f, encoding="bytes")

lookup = {}
for j, ori in enumerate(dataset[b"data"]):
    fingerprint = (ori >> 1).tobytes()
    lookup.setdefault(fingerprint, []).append(j)

checks = []
r = 0
g = 0
b = 0
for i, path in enumerate(i_folder.glob("*.png")):
    with Image.open(path) as img:
        pixels = numpy.array(img.convert("RGB"))

    pixels = pixels.transpose(2, 0, 1).reshape(-1)

    fingerprint = (pixels >> 1).tobytes()
    matches = lookup.get(fingerprint, [])

    if len(matches) == 1:
        j = matches[0]
        ori = dataset[b"data"][j]
        changed = int(not numpy.array_equal(pixels, ori))
        checks.append(((j, i), changed))


        positions = numpy.flatnonzero(pixels != ori)

        if len(positions):
            r += numpy.count_nonzero(positions < 1024)
            g += numpy.count_nonzero((positions >= 1024) & (positions < 2048))
            b += numpy.count_nonzero(positions >= 2048)
            
            g_count = numpy.count_nonzero((positions >= 1024) & (positions < 2048))
            if g_count:
                g_bits = pixels[1024:1024 + 256] & 1
                data = numpy.packbits(g_bits).tobytes()
                print(j, data)
            

    else:
        print(f"何字典？{path.name} - {len(matches)}")

    print(f"{i} / 2048")

checks.sort()

print(f"r: {r}")
print(f"g: {g}")
print(f"b: {b}")
```



