---
title: "Reverse"
pubDate: 2026-06-09
tags: ["algorithm-reverse", "rc4", "tea", "stream-cipher", "block-cipher", "symmetric-crypto", "xor", "pkcs7"]
type: "Reverse"
status: "published"
---
 - 2026.06.09 finish

### 1 lit_rc4_variant
#### 题目
程序实现一种 64 字节状态 的流密码式异或：初始化与 RC4 类似但模 64，且输出字节与 S[v7] + S[v10]（模 256）异或——与「标准 RC4 输出 S[(S[i]+S[j])&255]」不同。密钥为 ASCII 字符串，放在 .rdata。





#### 答案
LitCTF{rev05_rc4_variant_64!}

#### 过程
看逻辑

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/1.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/2.png" alt="" style="max-width: 80%; height: auto;">

前面加密部分一共有三个循环体

第一个for循环是初始化（通过++v7和++v8来循环处理v18和v19（因为俩地址一样，等号是浅拷贝）），往v18里面按顺序赋值，往v19里面赋值key

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/3.png" alt="" style="max-width: 80%; height: auto;">

可以看到，key是12个字符

然后第二个循环体do-while，处理被填充的v18（具体处理没仔细看，反正直接照抄就行，这玩意是处理密钥的，为了保证密钥一致肯定得把代码原封不动抄下来）

第三个循环才开始加密，因为输入的Str仅被赋值给了Buf1，Buf1到第三个循环体才开始被使用

这里加密逻辑就是一个异或（Buf1地址给了v14，v14只在最后一个自增的自异或语句中出现），前面依旧是处理密钥

三个循环后面就是和期望比较了

```python
import ansk # 自定义的库
# from ansk import *;

cipher = ansk.get_str_hex('7B 3D 38 77 4E 72 42 7D 45 37 76 0F 53 53 4F 66 37 17 75 37 5F 49 58 72 74 7F 79 1F 3A 00 00 00')
key = 'lit_rc4_key!'

s_box = []
v19 = []
result = []

for i in range(64):
    s_box.append(i)
    v19.append(ord(key[i % 12]))


v10 = 0
for i in range(len(s_box)):
    v12 = (v10 + (s_box[i] & 0xFFFFFFFF) + (v19[i] & 0xFFFFFFFF)) >> 31
    v10 = (((v12 >> 26) + (v10 + s_box[i] + v19[i])) & 0x3F) - (v12 >> 26)
    
    s_box[i], s_box[v10] = s_box[v10], s_box[i]


v15 = 0
v16 = 0
for i in range(29):
    v16 = (v16 + 1) % 64
    v17 = s_box[v16]
    v15 = (v15 + v17) % 64

    sv16 = s_box[v16] = s_box[v15]
    s_box[v15] = v17

    result.append(chr(cipher[i] ^ (s_box[(sv16 + v17) & 0x3F] + sv16)))


print(''.join(result))
```

这里需要注意一下，并不需要处理全部密文，只需要处理29位

最开始的验证就是验证是否输入的flag是29位

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/4.png" alt="" style="max-width: 80%; height: auto;">

因此，很容易能发现，RC4的代码逻辑十分明显（解密代码直接无脑抄就行）

初始化S盒（就是这里的v18） -> 处理（事实上只是打混）S盒 -> 异或加密

这里的S盒即是最终加密明文的密钥

### 2 lit_tea_standard
#### 题目
程序把你输入的 flag 做 PKCS#7 填充 到 8 字节倍数，再按 8 字节一块 做 标准 TEA（32 轮，delta = 0x9E3779B9），与内存中的密文逐字节比较。密钥 k[0..3] 以 4×uint32 形式存放在 .rdata。





#### 答案
LitCTF{rev03_tea_standard!!}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/5.png" alt="" style="max-width: 80%; height: auto;">

很明显主逻辑在这里（输入flag前面不用看（），输入后循环前一堆地址导来导去的）

（好标准的对称加密啊（））

看看循环中的东西

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/6.png" alt="" style="max-width: 80%; height: auto;">

读取v8的8个字节，左半存v9，右半存v10（DWORD指的是32位无符号整数，即4个字节，*(_DWORD *)v8 相当于是先把v8当作32位无符号整数的指针，再取这个指针的地址；v8 + 1即是取下一个4字节）

然后判断是i不等于-957401312

i在循环体中每次自减1640531527

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/7.png" alt="" style="max-width: 80%; height: auto;">

可以看到，这里是循环了32次

循环体里面的顺序是先自减i，然后处理v9，然后处理v10，进下一次循环；32次循环过后，处理下一个8字节（v8 += 8）

然后循环体处理完后跟g_cipher比较

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/8.png" alt="" style="max-width: 80%; height: auto;">

那写代码即可

```python
cipher = [0xED, 0xEF, 0x21, 0xFE, 0xB7, 0x9B, 0x3C, 0xB0, 0x1E, 0x93, 0x72, 0xE2, 0x2, 0x3E, 0x29, 0xBC, 0x36, 0xF7, 0x0C, 0x92, 0x2E, 0x5A, 0xAE, 0x46, 0x44, 0xFA, 0x45, 0x25, 0x1A, 0xE5, 0x8C, 0x87]
blocks = [cipher[i:i+8] for i in range(0, len(cipher), 8)]


def overflow(value, bits=32, signed=True):
    mask = (1 << bits) - 1
    value &= mask
    if signed and (value & (1 << (bits - 1))):
        value -= (1 << bits)
    return value

def overflow_unsigned(value, bits=32):
    return value & ((1 << bits) - 1)

result = []
for block in blocks:
    i = -957401312

    v9 = int.from_bytes(block[:4], 'little')
    v10 = int.from_bytes(block[4:], 'little')
    for times in range(32):
        v10 = (v10 - ((i + v9) ^ ((v9 >> 5) - 559038737) ^ (16 * v9 - 889275714))) & 0xFFFFFFFF
        v9 = (v9 - ((i + v10) ^ ((v10 >> 5) - 1341448704) ^ (16 * v10 - 1591939156))) & 0xFFFFFFFF
        i += 1640531527
        i = overflow(i)

    result.append(v9.to_bytes(4, 'little'))
    result.append(v10.to_bytes(4, 'little'))



print(b''.join(result))
    
    
```

这里注意有几个很容易出bug的位置

首先，记得把16进制数组变成bytes，不然python不像C，减不了（即需要v9 = int.from_bytes(block[:4], 'little')这个转换）

其次，记得要和加密逻辑反过来，加密逻辑是先减i，再加v9，再加v10；那么解密就得反过来，先减v10，再减v9，再加i

然后，对v10和v9的处理记得加上 与运算 0xFFFFFFFF，毕竟python不会溢出，需要和0xFFFFFFFF模拟unsigned溢出，让超过2^32 - 1的回到0；

对于上一条还有一个补充：不能用 v10 -= ...... 这是因为v10与运算完后再减依旧会导致v10变成负数

与v10和v9同理，i也得处理，不过i不是unsigned，因此不能直接用0xFFFFFFFF进行与运算，所以这里写了一个函数用来模拟溢出

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/9.png" alt="" style="max-width: 80%; height: auto;">

最后的4个\x04是填充用的

具体逻辑在这里

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/10.png" alt="" style="max-width: 80%; height: auto;">

### 3 lit_b64_alphabet
#### 题目
程序把你输入的 flag 按标准 Base64 的分组方式编码，但 64 个输出字符的字母表 不是 RFC 默认顺序，而是程序里保存的一串置换。比对对象是内存中的 期望密文字符串。





#### 答案
LitCTF{rev02_custom_b64_table!}

#### 过程
既然说是base64，那需要找的就是表和编码后的字符串

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/11.png" alt="" style="max-width: 80%; height: auto;">

一个写着alphabet，一个写着判断如果一样就返回Good，那结果显而易见了吧（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/12.png" alt="" style="max-width: 80%; height: auto;">

获取一下alphabet的值

然后就可以尝试写代码了

```python
def decode(cipher, chart) -> str:
    if (len(chart) != 64):
        return "Wrong"
    
    chart_dict = {c: i for i, c in enumerate(chart)}

    cipher = cipher.rstrip("=")

    result = []
    for i in range(0, len(cipher), 4):
        sli = cipher[i: i+4]

        sli_val = [chart_dict[c] for c in sli]

        cip_bytes = 0
        for s in sli_val:
            cip_bytes = (cip_bytes << 6) | s

        
        if (len(sli) == 4):
            result.append((cip_bytes >> 16) & 0xFF)
            result.append((cip_bytes >> 8) & 0xFF)
            result.append((cip_bytes) & 0xFF)
        elif (len(sli) == 3):
            result.append((cip_bytes >> 10) & 0xFF)
            result.append((cip_bytes >> 2) & 0xFF)
        elif (len(sli) == 2):
            result.append((cip_bytes >> 4) & 0xFF)

    return bytes(result).decode('ASCII')


def main():
    cipher = 'zjA5lToj9PUAGn2O+v6TRPosgYWB6noyGjhBgjfwyl=='
    chart = '2KuEphj84USZF67iloxzfYd+MrDgRG9yLwBnHAXcJq3eCN/s1bOQ5TvPa0tVkWmI'
    print(decode(cipher, chart))


if __name__ == '__main__':
    main()
```

得到答案

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/13.png" alt="" style="max-width: 80%; height: auto;">

### 4 lit_xor_chain
#### 题目
程序读入一行字符串，对 每个字节 先做异或常数、再加常数，再与内存里的 期望数组 逐字节比较。逻辑与常见逆向入门讲义中的「循环 + xor + add + 数组比对」一致。





#### 答案 
LitCTF{rev01_xor_then_add_ok!}

#### 过程
逻辑就写在main里面

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/14.png" alt="" style="max-width: 80%; height: auto;">

主逻辑在if里面，先判断是否是30个字符，然后在for里面对g_expected字符串依次遍历存储到i里面（循环末尾的++i），与处理后v4（即输入字符串）比较，循环体中是对v4的地址自增（++v4），比较v4是否已自增到末尾，若自增到末尾即退出（++v4 == &v8 ，v4在前面被赋值了Str，即把Str的地址给了v4，而v8被定义在Str后，或者看寄存器地址也行，因此如果v4自增后地址和v8一致，就证明遍历字符串结束了）

去看g_expected的内容

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/15.png" alt="" style="max-width: 80%; height: auto;">

那么根据for里面对v4的处理逻辑写代码即可

```python
expected = [0x23, 0x40, 0x2B, 0x16, 0x0B, 0x19, 0x2E, 0x25, 0x3C, 0x29, 0x67, 0x68, 0x12, 0x2F, 0x42, 0x25, 0x12, 0x2B, 0x3F, 0x3C, 0x41, 0x12, 0x38, 0x3B, 0x3B, 0x12, 0x42, 0x3E, 0x78, 0x34]

result = []

for e in expected:
    for test in range(0, 128):
        if (e == (test ^ 0x52) + 5):
            result.append(chr(test))
            break;

print(''.join(result))
# print(bytes.fromhex(result).decode('ASCII'))
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/16.png" alt="" style="max-width: 80%; height: auto;">

### 5 lit_xtea_tweak
#### 题目
流程与「分组 + 填充 + 分块加密」类似 XTEA，但轮常数 delta 被换成 0xDEADBEEF（标准文献里常见的是 0x9E3779B9）。若直接套用网上搜到的 XTEA 脚本而不改 delta，解密会失败。





#### 答案
LitCTF{rev04_xtea_delta_twk!}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/17.png" alt="" style="max-width: 80%; height: auto;">

和tea那题很类似，显然主逻辑在这里

第一个do while用来补位填充，使得plain的长度变成8的倍数，然后第二个do while里面对输入的内容进行每8个字节一次的分组处理（依旧好标准的对称加密）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/18.png" alt="" style="max-width: 80%; height: auto;">

依旧是循环32次

然后去看看这个逻辑里面有两个常量g_key和g_cipher

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/19.png" alt="" style="max-width: 80%; height: auto;">

得到了这俩信息，仿照着第二题写代码即可

```python
def overflow(value, bits=32, signed=True):
    mask = (1 << bits) - 1
    value &= mask
    if signed and (value & (1 << (bits - 1))):
        value -= (1 << bits)
    return value

key = [0x11111111, 0x22222222, 0x33333333, 0x44444444, 0x00000000, 0x00000000, 0x00000000, 0x00000000]
cipher = [0xE3, 0xEE, 0x1E, 0xE7, 0xD3, 0xA7, 0x96, 0x6F, 0xC6, 0xA7, 0xB9, 0xE1, 0xB9, 0x4E, 0x67, 0x86, 0x5F, 0x03, 0x04, 0xA6, 0xDB, 0xBB, 0xB9, 0x40, 0x56, 0x3A, 0xF7, 0x9E, 0xEE, 0x64, 0xD4, 0x06]

blocks = [cipher[i:i + 8] for i in range(0, len(cipher), 8)]

result = []
for block in blocks:
    v9 = int.from_bytes(block[:4], 'little')
    v10 = int.from_bytes(block[4:], 'little')

    i = -709370400
    for times in range(32):
        v10 = (v10 - ((key[(i >> 11) & 3] + i) ^ (v9 + ((v9 >> 5) ^ (16 * v9))))) & 0xFFFFFFFF
        i += 559038737
        v9 = (v9 - ((key[i & 3] + i) ^ (v10 + ((v10 >> 5) ^ (16 * v10))))) & 0xFFFFFFFF

    result.append(v9.to_bytes(4, 'little'))
    result.append(v10.to_bytes(4, 'little'))

print(b''.join(result))



```

记得在运算的时候，能打括号的都打上，防止由于优先级不同而导致的问题（或者拆开来算也行）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Lit26/Re/20.png" alt="" style="max-width: 80%; height: auto;">

