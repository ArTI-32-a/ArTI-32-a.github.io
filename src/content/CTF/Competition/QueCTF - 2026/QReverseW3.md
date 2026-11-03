---
title: Reverse - Week3
status: published
pubDate: 2026-11-03
type: Reverse
tags:
- algorithm-reverse
- cpp
- vtable
- dynamic-analysis
- shuffle
- xor
- elf
- hooking
- frida
- side-channel
- instruction-count
- valgrind
- callgrind
- brute-force
- black-box-analysis
- python
- pyinstaller
- bytecode
- self-modifying-code
- obfuscation
- aes
- ctr
- ecb
- tea
- ida
---
### 01 cpp噩梦
#### 题目
##### Rookie's Nightmare
##### Welcome to your first nightmare.
Countless functions. Endless lines of code. And somewhere in the darkness, three silent guardians are waiting for you.

But don't panic. Not everything you see is what it seems.

Sometimes, the best way to escape a nightmare is to start from the end.

##### Can you find your way out?
Too many functions? Too much code?

Not every line deserves your attention. Focus on what the program actually does, not how the C++ library does it.

Every nightmare has an ending.

Find where the program decides whether your answer is right or wrong. Sometimes, working backwards is easier than moving forward.


<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/RookiesNightmare.exe" download>
    文件
</a>

#### 答案
flag{cpp_vtable_is_a_nightmare!}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/1.png" alt="" style="max-width: 80%; height: auto;">

此处判断正确，判断条件是v49 == v50

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/2.png" alt="" style="max-width: 80%; height: auto;">

或者是调用对应位置的函数表第一个函数，逐个检查v34，如果到达末尾即判断成功

那么就是去看这个函数是啥，开debug看看对应的汇编call了啥

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/3.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/4.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/5.png" alt="" style="max-width: 80%; height: auto;">

也就是说这里是调用了sub_4017A4这个函数

看函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/6.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/7.png" alt="" style="max-width: 80%; height: auto;">

先判断*(a2 + 8)是否等于32，否则直接返回0

前面有写，传入a2的是v52

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/8.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/9.png" alt="" style="max-width: 80%; height: auto;">

v52每个元素大小8，v52[1]对应的是Size，那么结合前面大致推测是判断输入字符串是否是32长度，并且v53应该就是输入字符串了

去rsp+0x60看看内存

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/10.png" alt="" style="max-width: 80%; height: auto;">

对的确实是

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/11.png" alt="" style="max-width: 80%; height: auto;">

这里从a2[0]中取出了输入字符串放入*(a2+32)的位置，也就是a2[4]

然后把末尾地址放入了a2[5]和a2[6]的位置

然后第一轮循环执行完后进入第二次循环，依旧是查rax地址

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/12.png" alt="" style="max-width: 80%; height: auto;">

4A6120

也就是说这里调用了4A6120这个地址的函数

结合上面的函数表那就是sub_4016F4

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/13.png" alt="" style="max-width: 80%; height: auto;">

（我把sub_4A09F0重命名为malloc_b了）

重排

v4存入了改变后的字符串，这里是逐字符替换，将原本的字符串顺序按照qword_4A61A0的顺序重排

v5是末尾，由于v4是QWORD指针+1字节偏移8

然后存回a2

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/14.png" alt="" style="max-width: 80%; height: auto;">

```python
table = [
     3, 17,  8, 25,  0, 30, 13, 21,
    11,  6, 27,  2, 19, 14, 31,  9,
    24,  5, 16,  1, 28, 12, 22,  7,
    20, 15, 29,  4, 18, 26, 10, 23,
]
```

继续，第三轮循环

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/15.png" alt="" style="max-width: 80%; height: auto;">

RAX是4A6148

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/16.png" alt="" style="max-width: 80%; height: auto;">

函数sub_4018B2

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/17.png" alt="" style="max-width: 80%; height: auto;">

跟byte_4A6180循环异或，随后与unk_4A6160比较

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/18.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/19.png" alt="" style="max-width: 80%; height: auto;">

```python
cipher = bytes.fromhex(
    "74 44 1D 12 75 16 2E 08 "
    "72 47 23 07 72 52 3F 10 "
    "7B 54 2B 0A 61 55 2B 16 "
    "4C 68 27 1D 4C 5A 36 01"
)

key = bytes.fromhex("13 37 42 66")
```

都比较了后面也不重要了

可以解了

```python
cipher = bytes.fromhex(
    "74 44 1D 12 75 16 2E 08 "
    "72 47 23 07 72 52 3F 10 "
    "7B 54 2B 0A 61 55 2B 16 "
    "4C 68 27 1D 4C 5A 36 01"
)

key = bytes.fromhex("13 37 42 66")

table = [
     3, 17,  8, 25,  0, 30, 13, 21,
    11,  6, 27,  2, 19, 14, 31,  9,
    24,  5, 16,  1, 28, 12, 22,  7,
    20, 15, 29,  4, 18, 26, 10, 23,
]

rev = [0] * len(table)

for i, value in enumerate(table):
    rev[value] = i


tmp = [c ^ key[i & 3] for i, c in enumerate(cipher)]

result = [chr(tmp[rev[j]]) for j in range(32)]

print("".join(result))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/20.png" alt="" style="max-width: 80%; height: auto;">

### 02 宝石魔术 ·现代刻印
#### 题目
「听好了！远坂家的魔术师，无论在什么情况下都要保持优雅。这可是最基本的修养。」

「不过……这件礼装倒是有点意思。明明披着一种术式的外衣，内部却刻着另一套完全不同的魔术回路。」

「哼，障眼法而已。只要找到正确的刻印位置，理清魔力的流向，再复杂的封印也不过如此。」

「什么？你还想让我直接告诉你答案？」

「笨、笨蛋！这可是我花了不少宝石才准备好的课题！至少给我认真分析一下啊！」

「……真拿你没办法。如果实在找不到头绪，就先仔细看看这件礼装的内部结构吧。」

「我、我才不是特意提醒你呢！只是看不下去你在这种地方浪费时间而已！」


<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/minipe" download>
    文件
</a>

#### 答案
flag{M1n1PE_R3c0v3ry!}

#### 过程
elf文件，调试需要扔到wsl里面去

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/21.png" alt="" style="max-width: 80%; height: auto;">

长度16，比较对象是s跟s2

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/22.png" alt="" style="max-width: 80%; height: auto;">

得到key

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/23.png" alt="" style="max-width: 80%; height: auto;">

### 03 ezHook
#### 题目
你即将面对逆向最热门的技术之一——Hook


<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/ezHook" download>
    文件
</a>

#### 答案
flag{Y0u_F1nd_th1z_Crazy_H0ok!}

#### 过程
elf文件

进main

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/24.png" alt="" style="max-width: 80%; height: auto;">

比较对象是s与unk_402070

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/25.png" alt="" style="max-width: 80%; height: auto;">

```python
target = bytes.fromhex(
    "8A 58 71 0D 92 27 11 D5 "
    "88 F3 D5 15 9E 43 08 AE "
    "0C 13 36 18 6F 52 F9 35 "
    "A4 98 8F 92 B1 6D 58 00"
)
```

s是输入字符串

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/26.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/27.png" alt="" style="max-width: 80%; height: auto;">

判断长度是否是31

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/28.png" alt="" style="max-width: 80%; height: auto;">

此时s还并未被加密

看这个函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/29.png" alt="" style="max-width: 80%; height: auto;">

循环逐字节异或计算出来的result（a2指针在往后移动，直到移动到v5的位置也就是a2的最后一位终止）

用hook跑一遍直接把result提取出来

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/30.png" alt="" style="max-width: 80%; height: auto;">

base是0x400000

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/31.png" alt="" style="max-width: 80%; height: auto;">

result挂在al上面，这条指令相比于base偏移0x16A9

```javascript
const address = Process.mainModule.base.add(0x16A9);

const result = [];

Interceptor.attach(address, 
{ 
    onEnter: function ()
    {
        let res = this.context.rax.toUInt32() & 0xFF;
        res = res.toString(16).padStart(2, "0");
        res = "0x" + res;

        result.push(res);

        if (result.length === 31)
        {
            console.log(result);
        }
    }
})

console.log(result)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/32.png" alt="" style="max-width: 80%; height: auto;">

得到了密钥流

```python
target = bytes.fromhex(
    "8A 58 71 0D 92 27 11 D5 "
    "88 F3 D5 15 9E 43 08 AE "
    "0C 13 36 18 6F 52 F9 35 "
    "A4 98 8F 92 B1 6D 58"
)

key = bytes.fromhex("ec 34 10 6a e9 7e 21 a0 d7 b5 e4 7b fa 1c 7c c6 3d 69 69 5b 1d 33 83 4c fb d0 bf fd da 4c 25")

table = bytes.fromhex(
    "80 D3 FF FF FF 7F 00 00 88 FF FF FF FF FF FF FF "
    "00 00 00 00 00 00 00 00 90 52 40 00 00 00 00 00 "
    "B0 D3 FF FF FF 7F 00 00 AE DE CA F7 FF 7F 00 00 "
    "B0 D3 FF FF FF 7F 00 00 8F 1A C9 F7 FF 7F 00 00 "
    "A0 52 40 00 00 00 00 00 A0 52 40 00 00 00 00 00 "
    "00 00 00 00 00 00 00 00 30 30 E0 F7 FF 7F 00 00 "
    "E0 D3 FF FF FF 7F 00 00 10 54 C8 F7 FF 7F 00 00 "
    "54 72 61 63 65 72 50 69 18 02 00 00 00 00 00 00 "
    "54 72 61 63 65 72 50 69 00 00 00 00 00 00 00 00 "
    "A0 52 40 00 00 00 00 00 1E 12 40 00 00 00 00 00 "
    "54 72 61 63 65 72 50 69 64 3A 09 35 33 36 0A 00 "
    "67 29 0A 00 00 00 00 00 38 D4 FF FF FF 7F 00 00 "
    "06 00 00 00 AA 00 00 00 00 00 00 00 00 00 00 00 "
    "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
    "00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 "
    "00 00 00 00 00 00 00 00 00 7C 85 25 29 61 93 BD "
    "50 D5 FF FF FF 7F 00 00"
)

result = [chr(c ^ k) for c, k in zip(target, key)];

print("".join(result))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/33.png" alt="" style="max-width: 80%; height: auto;">



值得一提的是，这题不能通过直接读取result的方式来计算

依靠前后异或能异或出来ida里面的result使用的密钥流

输入前：

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/34.png" alt="" style="max-width: 80%; height: auto;">

处理后：

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/35.png" alt="" style="max-width: 80%; height: auto;">

```python
processed = bytes.fromhex(
    "ED D4 54 16 C2 26 D9 A9 BB F0 D6 A2 1B B0 4E 57"
    "FE 64 06 64 C0 BA 73 38 8B 92 14 7E 63 9E C7 00"
)

result = [p ^ (48 + ((i + 1) % 10)) for i, p in enumerate(processed)]

print([hex(x) for x in result])
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/36.png" alt="" style="max-width: 80%; height: auto;">

并不正确

用这个异或出来的密钥解得的答案也同样并不正确

### 04 signal
#### 题目
它从来只给出两种结局，却藏不住判断那一刻，几乎听不见的杂音。

#### 提示
##### 1 
这道题纯静态分析难度极高，预期解并不是纯静态分析

##### 2
因为现代cpu的优化，精确到微秒的计时器也可能有非常大的噪声，需要寻找一些更客观并且噪音不会太大的数据反映程序的执行情况


<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/w3_signal" download>
    文件
</a>

#### 答案
flag{1n57ruc710n_C0un7_15_7h3_516n41_a1389f9ec346d61a96223468bcc}

#### 过程
确实静态地狱，这玩意静态完全看不了，通过字符串想找输入的位置都找不到，correct和wrong更是连引用都没有

那就找找在分析的时候泄露了啥信息

首先尝试验证的是长度

由于正常情况下长度不匹配会直接返回，长度匹配才会继续执行，因此如果长度匹配的话，那一次执行的refs会显著高于其他项

```python
from re import *
import subprocess
from pathlib import *
from statistics import *

valgrind = Path.home() / "_Tools/valgrind/valgrind"
program = Path(__file__).resolve().parent / "w3_signal"


candidates = ["123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"]


def get_times(text):
    process = subprocess.run(
        [
            str(valgrind),
            "--tool=callgrind",
            "--callgrind-out-file=out.txt",
            str(program),
        ],
        input=(text + "\n").encode(),
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        timeout=60,
    )

    log = process.stderr.decode(errors="replace")

    match = search(r"I\s+refs:\s*([\d,]+)", log)
    if match is None:
        raise RuntimeError(log)

    print(f"{text} - ref: {match}")
    return int(match.group(1).replace(",", ""))


for cand in candidates:

    for i in range(1, len(cand) + 1):
        prefix = cand[:i]
        prefix = "CTF{" + prefix + "}"

        for _ in range(3):
            get_times(prefix)

        print("\n");
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/37.png" alt="" style="max-width: 80%; height: auto;">

长度是65

于是我开始尝试从首位开始爆破

```python
prefix = ""

for value in range(32, 127):
    cand = prefix.join(chr(value)).ljust(65, "0")
    
    for _ in range(3):
        get_times(cand)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/38.png" alt="" style="max-width: 80%; height: auto;">

所有的位数差别都不大，而且都是以2开头的，但是前面获取到的65长度的测试flag refs数量却是3百万多

测试了是否是格式不对（把CTF改成flag），发现这点并未改变，删除了第一个大括号也并未改变，直到删除了最后一个大括号差别出现了

```python
candidates = ["".join("ffff").ljust(64, "0") + ("}"), "".join("flag0").ljust(64, "0") + ("0")]

for cand in candidates:
    for _ in range(3):
        get_times(cand)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/39.png" alt="" style="max-width: 80%; height: auto;">

因此我猜测是否是从后往前判断的

```python
suffix = "}"

for value in range(32, 127):
    cand = "0" * (65 - len(suffix) - 1) + chr(value) + suffix

    for _ in range(2):
        get_times(cand)

    print()
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/40.png" alt="" style="max-width: 80%; height: auto;">

猜对了

那么就这么从后往前逐位爆破就行了

```python
suffix = "c}"

for _ in range(65):
    if (len(suffix) == 65):
        break

    curr = {}
    for value in range(32, 127):
        probe = "0" * (65 - len(suffix) - 1) + chr(value) + suffix

        curr[value] = get_times(probe)

    key = max(curr, key=curr.get) 
    suffix = chr(key) + suffix

    print("0" * (65 - len(suffix)) + suffix)
    print()
    print()
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/41.png" alt="" style="max-width: 80%; height: auto;">

值得一提的是第一位并不正确（大概是因为完全执行完了，因此无法很好的判断“成功”与“失败”两种情况吧）

不过一眼就能看出来就是了

### 05 bytecode
#### 题目
你听我解释，他不应该是这样的TuT


<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/bytecode.exe" download>
    文件
</a>

#### 答案
flag{pyc_smc_bytecode}

#### 过程
python的exe，先pyinstxtractor反编译exe，再pycdc反编译pyc

```bash
pycdc challenge.pyc -o challenge.py
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/42.png" alt="" style="max-width: 80%; height: auto;">

TEA

但是目前不知道crypto的aes_decrypt()函数是何逻辑

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/43.png" alt="" style="max-width: 80%; height: auto;">

存在这样一个被加密的crypto，于是应该寻找如何解密它

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/44.png" alt="" style="max-width: 80%; height: auto;">

发现了一个key

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/45.png" alt="" style="max-width: 80%; height: auto;">

真就只有一个key

那就找谁调用了这个key，将文件加密

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/46.png" alt="" style="max-width: 80%; height: auto;">

根据文件名pyimod01_archive.pyc推断出来可能是它（这个名字最像（））

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/47.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/48.png" alt="" style="max-width: 80%; height: auto;">

对于解密部分只能看出来，create这个函数创建了一个利用刚刚的key和传入参数iv，也就是data的前16字节，创建了一个AES对象，然后再decrypt中用CTR加密

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/49.png" alt="" style="max-width: 80%; height: auto;">

此处cipher中不清楚的只有_aesmod

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/50.png" alt="" style="max-width: 80%; height: auto;">

cipher在Zlib中被初始化

现在需要找的是_aesmod，在字节码中找到

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/51.png" alt="" style="max-width: 80%; height: auto;">

直接搜_aes就搜到了，就是tinyaes这个库

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/52.png" alt="" style="max-width: 80%; height: auto;">

在cipher的decrypt解密结束后，调用了zlib的decompress函数处理obj

于是现在就能将crypto的pyc解密出来了

解密出来的文件是没有文件头的，需要自行添加

```python
import tinyaes
from pathlib import Path
import zlib

base = Path(__file__).resolve().parent

data = (base / "crypto.pyc.encrypted").read_bytes()

key = b"S3cureCTFKey2026"
iv = data[:16]
cipher = data[16:]

cipher = tinyaes.AES(key, iv)
cipher = cipher.CTR_xcrypt_buffer(data[16:])
res = zlib.decompress(cipher)

header = bytes.fromhex("A7 0D 0D 0A") + bytes(12)

output = (base / "crypto.pyc")
output.write_bytes(header + res)
```

结合上面看过的challenge的字节码，crypto中只调用了aes_decrypt这一个函数 

查看返回值后会发现，aes_decrypt这个函数只有开头处理了返回值，后面处理的不是返回值而是文件本身

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/53.png" alt="" style="max-width: 80%; height: auto;">

对返回值也就是密钥的处理只有这么多

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/54.png" alt="" style="max-width: 80%; height: auto;">

这里干了件事，把原代码中的<<跟>>反转了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/55.png" alt="" style="max-width: 80%; height: auto;">

一共改了4处

```python
from Crypto.Cipher import AES

KEY_BOX = bytes.fromhex('16445a08fd5cd47afd440293d286359b')
_AES_KEY = bytes.fromhex('00112233445566778899aabbccddeeff')
DELTA = 0x9E3779B9

raw = AES.new(_AES_KEY, AES.MODE_ECB).decrypt(KEY_BOX)
KEY = tuple((int.from_bytes(raw[index:index + 4], 'little') for index in range(0, 16, 4)))

target = bytes.fromhex('419a03ccd03acc07c6fbf6b9266bf058d98a16f3ceaac03c')
result = bytearray()


for offset in range(0, len(target), 8):
    v0 = int.from_bytes(target[offset:offset + 4], 'little')
    v1 = int.from_bytes(target[offset + 4:offset + 8], 'little')
    total = (0 + DELTA * 32) & 0xFFFFFFFF

    for i in range(32):
        v1 = v1 - ((v0 >> 4 ^ v0 << 5) + v0 ^ total + KEY[total >> 11 & 3]) & 0xFFFFFFFF
        v0 = v0 - ((v1 >> 4 ^ v1 << 5) + v1 ^ total + KEY[total & 3]) & 0xFFFFFFFF
        total = total - DELTA & 0xFFFFFFFF
    
    result.extend(v0.to_bytes(4, 'little'))
    result.extend(v1.to_bytes(4, 'little'))

print(result)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W3Re/56.png" alt="" style="max-width: 80%; height: auto;">

