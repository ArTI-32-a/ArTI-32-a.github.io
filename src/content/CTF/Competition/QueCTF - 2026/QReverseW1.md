---
title: Reverse - Week1
tags:
  - algorithm
  - reverse
  - xor
  - android
  - apk
  - native
  - resource
  - extraction
  - maze
  - tea
  - block
  - cipher
  - symmetric
  - crypto
  - brute
  - force
  - black
  - box
  - analysis
  - assembly
  - ida
status: published
pubDate: 2026-10-29T00:00:00.000Z
type: Reverse
---
 - 2026.10.29 finish

### 01 intro
#### 题目



<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/intro" download>
    文件
</a>

#### 答案
flag{51mp13_x0r_cr4ck3d_61371f68aaaee5251e8b3e6cf877fe92b32e6286}

#### 过程
进main

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/1.png" alt="" style="max-width: 80%; height: auto;">

逻辑非常清楚

往v9里面读了0x41个字符

然后每个字符判断 输入的与aCtf2026这个8长度的数组异或的值 是否等于期待值  
那直接把期待值异或aCtf2026即可

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/2.png" alt="" style="max-width: 80%; height: auto;">

```python
key = bytearray(b'?ctf2026')
cipher = bytes.fromhex("""
59 0F 15 01 49 05 03 5B 4F 52 47 39
4A 00 40 69 5C 11 40 05 59 03 56 69
09 52 47 51 03 56 04 0E 5E 02 15 03 57
05 00 03 0E 06 4C 04 01 55 04 55 59 5B 43
51 54 55 0B 04 5D 50 46 03 04 02 0A
00 42
""")

result = []
for i in range(len(cipher)):
    result.append(chr(cipher[i] ^ key[i & 7]))

print("".join(result))
```

### 02 Pangbai泰拉记二周目(1)
#### 题目
_前情提要_

两年前，pangbai 解出了 straw 学长留下的那道 Wwift 题目，如愿以偿地在那台二手 iPhone 7 上，玩到了他日思夜想的泰拉。

某个下班后的夜晚，pangbai 疲惫地躺在床上刷视频，一条多人联机玩泰拉的视频忽然吸引了他。听到视频里大家的欢声笑语，还有那段再熟悉不过的 BGM，他的思绪一下子被拉回了两年前 —— 他和 straw 并肩大战神吞的画面还历历在目。那时他操作还不熟练，两人失败了几百次，也没能将神吞击败。后来啊，straw 学长毕业了，他们就再也没有一起登录过泰拉……

pangbai 笑了。或许现在的他，已经有了单挑神吞的实力。为了弥补当时的遗憾，他决定再次向神吞宣战。可那台 iPhone 7 早已报废，自己手上也没有苹果设备。万幸的是，当年他把存档备份到了网盘上。

这一次，他直接在游戏商店购买了正版泰拉，却发现 iPhone 的存档在安卓上根本读不出来。pangbai 有些苦恼，但不愿就此放弃。为了弥补这份遗憾，他决定自己动手给存档做适配。就这样，pangbai踏上了他的安卓学习之旅……

（故事纯属虚构，和现实人物无关）

_题面_

pangbai拿到了泰拉的apk，但是他无从下手，于是他决定先去了解一下apk的基本知识。

在做完题后，如果你能够按照自己的思路回答出来下面的问题，说明你已经吃透这个题目了呢。加油！！

apk文件是什么？怎么查看和反编译apk文件？

点开一个app后，第一个界面是怎么启动的？

apk中的字符串资源存在哪个位置？

apk中的图片等静态文件资源一般存在哪个位置？

apk的包名是什么？有什么作用？

安卓的 activity 是什么？怎么定位一个activity的位置？




<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/pbterrai.apk" download>
    文件
</a>

#### 答案
flag{W31c0m3_70_7h3_W0r1d_0f_@ndr01d}

#### 过程
四处藏flag的来了  
搞半天还要自己拼

老规矩第一步看manifest找入口

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/3.png" alt="" style="max-width: 80%; height: auto;">

然后找到了flag碎片1

flag{W31

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/4.png" alt="" style="max-width: 80%; height: auto;">

main在此处

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/5.png" alt="" style="max-width: 80%; height: auto;">

找到了flag残片4

1d_0f_@

直接去看asset就能找到flag3

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/6.png" alt="" style="max-width: 80%; height: auto;">

7h3_W0r

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/7.png" alt="" style="max-width: 80%; height: auto;">

字符串放的位置一般在resources.arsc/res/values/strings.xml下面

得到flag2

c0m3_70_

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/8.png" alt="" style="max-width: 80%; height: auto;">

so库里面flag5

ndr01d}

### 03 艾克赛尔
#### 题目
谁把氮气门丢我附件里了呀




<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/siuumaze.exe" download>
    文件
</a>

#### 答案
flag{DDDDDDDDSAAAAAAAASSDDDDDDDDSWAAAAAAAASSSDDDDDDDSAAAAAAA}

#### 过程
进main

直接开调试

实际上是个走迷宫小游戏（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/9.png" alt="" style="max-width: 80%; height: auto;">

可以看出来，迷宫行是20，

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/10.png" alt="" style="max-width: 80%; height: auto;">

一共400，也就是说这是个20 * 20的迷宫

```plain
maze = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 7, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 4, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 5, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 8, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]
```

v10是当前位置

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/11.png" alt="" style="max-width: 80%; height: auto;">

初始值是 (1, 1)（记得内存里面是小端存储）

wasd非常好理解吧（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/12.png" alt="" style="max-width: 80%; height: auto;">

判断是不能出界（v10是个64位数，HIDWORD就是取高32位无符号，SHIDWORD是取高32位有符号，通过后面20 * SHIDWORD能看出来，高位是x轴，(int)v10，由于int是32位，因此这里相当于是取了低32位）

格子也不能是0

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/13.png" alt="" style="max-width: 80%; height: auto;">

限制步数55格

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/14.png" alt="" style="max-width: 80%; height: auto;">

这里说地图上值为3、4、5的有特殊效果

具体表现如下：v11低位重置为0，当v11低位小于格子值的时候，沿着原方向多走格子值的步数（沿用v8和v7，也就是说和上面的方向一致）

v11高位用来遍历buffer的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/15.png" alt="" style="max-width: 80%; height: auto;">

最终格是 (17, 10)（依旧小端）

那就走迷宫吧（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/16.png" alt="" style="max-width: 80%; height: auto;">

### 04 meow~
#### 题目



<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/meow.exe" download>
    文件
</a>

#### 答案
flag{Meow_1ovE_y0u_m0st}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/17.png" alt="" style="max-width: 80%; height: auto;">

v8是个bool

v8 = v9 == 24 -> 一共24个字符

剩下俩判断是否是flag{和}（ASCII 125就是}）

最后一个判断

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/18.png" alt="" style="max-width: 80%; height: auto;">

比较对象

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/19.png" alt="" style="max-width: 80%; height: auto;">

```python
expected_cipher = bytes.fromhex(
    "05 7C E0 F0 B9 8A DF 6D "
    "B9 06 82 9E F8 14 31 BD "
    "EF 4F 71 0B FC 56 7F 17"
)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/20.png" alt="" style="max-width: 80%; height: auto;">

这里就是说，8个字节为一组调用3次，每次循环，把输入按照小端存储拆成两个32位的整形，

比方说v4，先把*(v5+2)也就是int[2]往右移16位，再把v5这个16位的或运算（也就是读取int[0]和int[1]），再把*(v5+3)也就是int[3]右移24位，就相当于把4个字节变成了一个整数

v3同理

然后把这俩整数扔到了一个名为tea的函数中去

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/21.png" alt="" style="max-width: 80%; height: auto;">

非常典型的tea加密，tea加密由于是异或，直接将顺序调换，加法变成减法就行了，异或直接照抄即可

```python
cipher = bytes.fromhex(
    "05 7C E0 F0 B9 8A DF 6D "
    "B9 06 82 9E F8 14 31 BD "
    "EF 4F 71 0B FC 56 7F 17"
)

delta = 0x9E3779B9
result = []

for i in range(0, 24, 8):
    a1 = int.from_bytes(cipher[i:i + 4], "little")
    a2 = int.from_bytes(cipher[i + 4:i + 8], "little")

    start = (delta * 32) & 0xFFFFFFFF

    for j in range(32):
        a2 -= (a1 + start) ^ (16 * a1 + 1936943469) ^ ((a1 >> 5) + 561603947)
        a2 &= 0xFFFFFFFF
        a1 -= (a2 + start) ^ (16 * a2 + 2003789133) ^ ((a2 >> 5) + 2003789165)
        a1 &= 0xFFFFFFFF

        start -= delta
        start &= 0xFFFFFFFF

    result.extend(a1.to_bytes(4, "little"))
    result.extend(a2.to_bytes(4, "little"))


print("".join([chr(c) for c in result]))
```

记得要去 & 0xFFFFFFFF，因为存在溢出的情况

### 05 Strange_rc4
#### 题目



<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/C1.zip" download>
    文件
</a>

#### 答案
flag{Y0u_cr4ck_7h3_57r4ng3_RC4}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/22.png" alt="" style="max-width: 80%; height: auto;">

上面那个是cookie，进去看就知道了

到sub_140008720也不是main，main具有标志性的三个参数argc argv envp，这里具有三个参数的是sub_140002595，也就是该程序的main，继续跟进这个函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/23.png" alt="" style="max-width: 80%; height: auto;">

其利用了argc和argv

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/24.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/25.png" alt="" style="max-width: 80%; height: auto;">

能看出来其利用方式是输入 C1.exe flag.enc <输出文件名>（虽然这里给的Usage是cmain.exe，但是下载的文件是C1.exe）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/26.png" alt="" style="max-width: 80%; height: auto;">

豪，然后后续可以有两种解法

##### 其一，邪道
这题非常神，可以直接爆破出来

我发现这玩意可以爆破是因为当时拿到C1.exe后，反编译看到一堆函数遂决定debug，于是我去把flag.enc先不设断点加密了一次

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/27.png" alt="" style="max-width: 80%; height: auto;">

欸？！“flag”已经给我解出来了

后面还都是正常的ascii码，又注意到flag没变但是后面应该是"{"的变成了"}"，那也就意味着，这玩意有一定概率是类似异或分组加密那种东西，4个4个字节改变，于是我去试，明文的后4个字符改变是不是不影响前面4个字符

为了方便测试我顺手写了个cmd

```bash
:START
C1 flag.txt o.txt
C1 o.txt o2.txt
pause
goto START
```

明文 flag{123abcd 下

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/28.png" alt="" style="max-width: 80%; height: auto;">

明文 flag{123+=+= 下

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/29.png" alt="" style="max-width: 80%; height: auto;">

欸前面的还真不变

然后我又继续想是不是单个字符改变也不会影响

于是明文 flag{123-=+= 

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/30.png" alt="" style="max-width: 80%; height: auto;">

真的只改变了一处

这也就意味着这玩意是逐字符加密的

也就是说，既然我已有了flag.enc，将其加密一次后获得一个target

随后枚举 ASCII 中的 95 个可打印字符，即 0x20到0x7E。每次用同一个候选字符填满与密文等长的文件，连续加密两次，并将结果与target逐位置比较。若某位置的输出相同，则将该字符记录为该位置的明文候选。一次测试可以同时检查所有位置，因此总共只需枚举 95 次。

然后就被我爆破出来了

```python
import subprocess
import tempfile
from pathlib import Path


result = []
target = b"flag}_2u_et4cia7j3_51t4pg3_TA6}"
size = len(target)

base = Path(__file__).resolve().parent
exe = base / "C1.exe"
candidates = list(range(32, 127))

matches = [[] for _ in range(size)]


def encrypt_r(data, input, output):
    input.write_bytes(data)
    output.unlink(missing_ok=True)

    # 列表里的各项就是命令及其参数，不需要手动拼引号。
    # 等价于：C1.exe input.bin output.bin
    process = subprocess.run(
        [str(exe), str(input), str(output)],
        cwd = exe.parent,
        stdout = subprocess.PIPE,
        stderr = subprocess.STDOUT,
        timeout = 30,
        check = False,
    )
    if process.returncode != 0 or not output.is_file():
        message = process.stdout.decode(errors="replace")
        raise RuntimeError(f"C1 执行失败，退出码 {process.returncode}：\n{message}")
    return output.read_bytes()



with tempfile.TemporaryDirectory(prefix="c1_probe_", dir=base) as folder:
    folder = Path(folder)
    input_path = folder / "input.bin"
    output_path = folder / "output.bin"

    def encrypt(data):
        return encrypt_r(data, input_path, output_path)

    for c, value in enumerate(candidates):
        probe = bytes([value]) * size
        transformed = encrypt(encrypt(probe))

        print(c + 1)

        for i in range(size):
            if transformed[i] == target[i]:
                matches[i].append(chr(value))

    print(bytes(ord(m[0]) for m in matches))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/31.png" alt="" style="max-width: 80%; height: auto;">

##### 其二，正常解（空缺）
（等什么时候愿意复盘吧）

### 06 Hello_Assemb1y
#### 题目
欢迎来到汇编世界！




<a href="/Download/WpCTF/Comp/QueCTF2026/Reverse/Hello_Assemb1y.asm" download>
    文件
</a>

#### 答案
QCTF{We1come_To_Assemb1y_Wor1d!}

#### 过程
纯粹的汇编

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/32.png" alt="" style="max-width: 80%; height: auto;">

输出塞到了input_buf里面，与FLAG_LEN比较长度

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/33.png" alt="" style="max-width: 80%; height: auto;">

把input_buf的地址移动到si（由于输入字符[0]和[1]一般用作允许输入的长度和实际长度，[2]开始才是真正的输入内容）

cipher偏移地址移动到di

清空bx（自异或）

把FLAG_LEN的值移动到cx，

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/34.png" alt="" style="max-width: 80%; height: auto;">

由于存在此句，也就意味着cx是用作计数器的，check_loop到key_ready俩标签中间是一个循环

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/35.png" alt="" style="max-width: 80%; height: auto;">

si是input，也就是说这里在做的是输入与key循环逐字节异或后加3，与cipher比较

比较对象是cipher

```python
cipher = bytes.fromhex(
    "1C 29 3B 2D 17 22 03 60"
    "12 03 28 03 36 3B 03 1A"
    "27 22 22 0D 28 0A 60 18"
    "33 22 0D 21 60 0E 6C 1B"
)

key = "Hello"

print("".join([chr((c - 3) ^ ord(key[i % 5])) for i, c in enumerate(cipher)]))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W1Re/36.png" alt="" style="max-width: 80%; height: auto;">

