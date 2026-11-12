---
title: Reverse - Week1
status: published
pubDate: 2026-11-06
type: Reverse
tags:
- algorithm-reverse
- ida
- dynamic-analysis
- base64
- xor
- repeating-key-xor
- win32
- windows-message
- modular-inverse
- integer-wraparound
- javascript
- code-patching
- upx
- unpacking
- exception-handling
- little-endian
---
### 01 Base64 is Re's base
#### 题目
什么是逆向？什么是c？什么是base64编码？


<a href="/Download/WpCTF/Comp/P26/Re/easybase.rar" download>
    文件
</a>

#### 答案
PCTF{ba34_i4_Re4_bas4!!_fir1fl2_w1shyou_h@ppy!}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/1.png" alt="" style="max-width: 80%; height: auto;">

长度47

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/2.png" alt="" style="max-width: 80%; height: auto;">

比较对象unk_140004050，比较长度64

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/3.png" alt="" style="max-width: 80%; height: auto;">

```python
data = bytes.fromhex(
    "7A 6A 61 7A 7D 41 5B 46 76 7B 62 1F 77 1D 44 1F "
    "77 1E 65 43 61 69 16 46 76 77 62 1F 66 7C 69 49 "
    "75 42 43 56 62 78 75 5C 62 43 16 1C 62 77 61 40 "
    "4A 78 16 1E 77 1D 47 6E 4C 67 6D 1A 66 77 1F 12"
)
```

处理函数是140001000

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/4.png" alt="" style="max-width: 80%; height: auto;">

其中那张表就是标准的base64表

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/5.png" alt="" style="max-width: 80%; height: auto;">

可以看出来就是标准的base64编码过程

每次取3位（v11 < v13; v13 += 3），然后处理4次，每次都是取6位（ 右移18、12、6、0位，全都仅保留0x3F也就是6位）查表存入值

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/6.png" alt="" style="max-width: 80%; height: auto;">

这里在补等号填充末尾

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/7.png" alt="" style="max-width: 80%; height: auto;">

然后再每一位跟0x2F异或一下，就返回出去了

可以逆了

```python
cipher = bytes.fromhex(
    "7A 6A 61 7A 7D 41 5B 46 76 7B 62 1F 77 1D 44 1F "
    "77 1E 65 43 61 69 16 46 76 77 62 1F 66 7C 69 49 "
    "75 42 43 56 62 78 75 5C 62 43 16 1C 62 77 61 40 "
    "4A 78 16 1E 77 1D 47 6E 4C 67 6D 1A 66 77 1F 12"
)

print([c ^ 0x2F for c in cipher])
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/8.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/9.png" alt="" style="max-width: 80%; height: auto;">

### 02 EZWin32
#### 题目
简单窗口程序, flag格式为PCTF{}


<a href="/Download/WpCTF/Comp/P26/Re/ezwin32.7z" download>
    文件
</a>

#### 答案
flag{w1n32_gui_1s_fun}

#### 过程
题目诈骗实在是太可恶了（恼）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/10.png" alt="" style="max-width: 80%; height: auto;"><!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/11.png" alt="" style="max-width: 80%; height: auto;">

很可惜的是字符串找不到，那就只能动态调试找了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/12.png" alt="" style="max-width: 80%; height: auto;">

ShowWindow处展示了窗口，此处断点无法跳出，判断这里就是读取输入，一旦检测到按下回车（Msg.message == 256就是WM_KEYDOWN，13就是Enter）就给Window发送一条消息

SendMessageW就是给第一个参数，这里就是window，发消息，0x111是WM_COMMAND也就是说有一条命令需要处理，0x3EA就是1002，也就是构造了一个1002控件被操作的命令

那就看注册的函数是谁

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/13.png" alt="" style="max-width: 80%; height: auto;">

注册的窗口源于v9

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/14.png" alt="" style="max-width: 80%; height: auto;">

注册的函数时WndProc

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/15.png" alt="" style="max-width: 80%; height: auto;">

在这里找到了字符串Wrong，那上面的判断就是逻辑了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/16.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/17.png" alt="" style="max-width: 80%; height: auto;">

长度22，格式是flag{}

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/18.png" alt="" style="max-width: 80%; height: auto;">

String就是输入字符串，从第五位开始逐位验证

比较对象byte_5B50CF

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/19.png" alt="" style="max-width: 80%; height: auto;">

```python
target = bytes.fromhex(
    "00 00 00 00 00 BF 74 90 70 72 2A F1 AA 95 2E 63 "
    "B8 13 F5 93 83"
)
```

加密就这一句

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/20.png" alt="" style="max-width: 80%; height: auto;">

反着解就行了

但是，当直接照着这个反着写的时候

```python
target = bytes.fromhex(
    "00 00 00 00 00 BF 74 90 70 72 2A F1 AA 95 2E 63 "
    "B8 13 F5 93 83"
)

res = []

for i in range(5, len(target)):
    c = target[i]
    c ^= 0x33
    c -= i
    c /= 3
    print(c)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/21.png" alt="" style="max-width: 80%; height: auto;">

会发现存在小数，这是因为发生了溢出回绕，原本的判断(_BYTE)v10 + 3 * ((unsigned __int8)v11 ^ 0x5A)这里还会再模256的

因此这里应该乘上模逆元而非除以3

```python
target = bytes.fromhex(
    "00 00 00 00 00 BF 74 90 70 72 2A F1 AA 95 2E 63 "
    "B8 13 F5 93 83"
)

res = []

for i in range(5, len(target)):
    c = target[i]
    c ^= 0x33
    c -= i
    c = (c * 171) & 0xFF
    c ^= 0x5A

    res.append(chr(c))

print("".join(res))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/22.png" alt="" style="max-width: 80%; height: auto;">

### 03 Reverse Welcomes You！
#### 题目
欢迎来到逆向的世界！


<a href="/Download/WpCTF/Comp/P26/Re/easy_reverse.exe" download>
    文件
</a>

#### 答案
PCTF{h3ll0_r3v3rs3_w0rld}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/23.png" alt="" style="max-width: 80%; height: auto;">

### 04 TAIKO SAY YA!!!
#### 题目
满compo可以得flag噢


<a href="/Download/WpCTF/Comp/P26/Re/taiko.zip" download>
    文件
</a>

#### 答案
PCTF{P3rf3ct_Combo_0nly_Taik0!}

#### 过程
让我想起了某个错位+一笔画的紫13.3（）不过三小只可爱（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/24.png" alt="" style="max-width: 80%; height: auto;">

按照题目提示，AP了就能输出flag，我直接搜了flag，然后就出来这个decodeFlag函数，可以看到传入了restoreEnc跟deriveKey

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/25.png" alt="" style="max-width: 80%; height: auto;">

打开html会发现，这里是直接调用的本地文件跑的

那直接改源文件就行了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/26.png" alt="" style="max-width: 80%; height: auto;">

会发现打印出来的是乱码，那肯定利用了什么信息加密了

一首歌变动的信息也就只有打歌成绩跟连击数，那不妨去decodeFlag和其调用的俩函数看看是不是有利用这些信息的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/27.png" alt="" style="max-width: 80%; height: auto;">

还真有，那就找找一共有多少音符

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/28.png" alt="" style="max-width: 80%; height: auto;">

在找perfectCount的时候找到个这里，也就是说perfect给100分

因此可以直接

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/29.png" alt="" style="max-width: 80%; height: auto;">

当然，也能去taiko\img这里数数量（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/30.png" alt="" style="max-width: 80%; height: auto;">

（我没数我不想数（））

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/31.png" alt="" style="max-width: 80%; height: auto;">

但是格式要求是PCTF{}（我真求他了那你写FLAG干啥）

### 05 Upxxor
#### 题目
脱壳？金蝉？


<a href="/Download/WpCTF/Comp/P26/Re/upx_xor.zip" download>
    文件
</a>

#### 答案
PCTF{upx_4nd_r0ll1ng_x0r}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/32.png" alt="" style="max-width: 80%; height: auto;">

有壳，需要脱个壳

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/33.png" alt="" style="max-width: 80%; height: auto;">

直接upx就行

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/34.png" alt="" style="max-width: 80%; height: auto;">

然后ida就能正常打开了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/35.png" alt="" style="max-width: 80%; height: auto;">

到30行的时候数据依旧未被处理

从此处可以看出来，比较对象位于rsp+0x40+128的位置（Str[j + 128]）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/36.png" alt="" style="max-width: 80%; height: auto;">

```python
target = bytes.fromhex(
    "25 33 2C 19 10 46 09 0D 2F 4C 31 0F 6C 0B 45 1C "
    "14 6E 05 54 26 0D 40 0A 22 "
)
```

加密方式就是输入字符逐位与aUpxK3y循环逐位异或

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/37.png" alt="" style="max-width: 80%; height: auto;">

```python
key = 'upx_k3y'
```

那非常简单啊

```python
target = bytes.fromhex(
    "25 33 2C 19 10 46 09 0D 2F 4C 31 0F 6C 0B 45 1C "
    "14 6E 05 54 26 0D 40 0A 22 "
)

key = 'upx_k3y'

print("".join( [ chr(target[i] ^ ord(key[i % 7])) for i in range(len(target)) ] ))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/38.png" alt="" style="max-width: 80%; height: auto;">

### 06 testre1
#### 题目
testre1


<a href="/Download/WpCTF/Comp/P26/Re/testre1_vault.zip" download>
    文件
</a>

#### 答案
PCTF{76e4e5ad-598b-418a-b287-67b1d9436f9d}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/39.png" alt="" style="max-width: 80%; height: auto;">

main是这个（可恶啊居然不是三个参数，你知道我找三个参数找了多久吗（恼））

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/40.png" alt="" style="max-width: 80%; height: auto;">

正常打开就会发现，根本没有输入的地方

main里面唯一一个函数挂在异常回调里面，是sub_140001540

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/41.png" alt="" style="max-width: 80%; height: auto;">

大概能猜出来此处触发成功，那就看怎样才能触发异常回调跑到这里

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/42.png" alt="" style="max-width: 80%; height: auto;">

函数第一句就是

0xC0000094对应的异常是整数异常除0

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/43.png" alt="" style="max-width: 80%; height: auto;">

（源于[https://ask.csdn.net/questions/8302286](https://ask.csdn.net/questions/8302286)）

因此要想办法触发除0异常

那就看注册了异常处理器后面的汇编看看有没有能触发的地方

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/44.png" alt="" style="max-width: 80%; height: auto;">

这里可以看到在14000337C的下面有一个idiv ecx，而ecx前面自异或变成0了，因此触发的方式就是跳到这里

可以看到跳过来的方式是jz，判断条件是前面的cmp，也就是说要让rsp+0x48+var_1C的值等于0x0DEADBEEF即可

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/45.png" alt="" style="max-width: 80%; height: auto;">

（记得是小端存储）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Re/46.png" alt="" style="max-width: 80%; height: auto;">





