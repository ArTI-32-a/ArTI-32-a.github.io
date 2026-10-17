---
title: 2026.41 Weekly
tags:
  - algorithm
  - reverse
  - xor
  - rol
  - shuffle
  - obfuscation
  - ida
  - aes
  - cbc
  - feistel
  - sbox
  - unity
  - il2cpp
  - dnspy
  - resource
  - extraction
  - caesar
  - hex
  - encoding
status: published
pubDate: 2026-10-17T00:00:00.000Z
type: Reverse
---
 - 2026.10.17 finished

### 01 Night Market
#### 题目
夜市管理员留下了一个小程序，据说只有输入正确的通行口令，摊位灯牌才会亮起。 你拿到了校验程序和几份可疑的字节数组。请逆向程序中的 XOR 变换逻辑，还原原始输入。

```c
#include <stdint.h>
#include <stdio.h>
#include <string.h>

#define TICKET_LEN 37

static const uint8_t box_a[TICKET_LEN] = {
    0x43, 0x69, 0xa0, 0x92, 0xb5, 0xad, 0xcc, 0xe8,
    0xf5, 0x2c, 0x0e, 0x27, 0x57, 0x56, 0x7a, 0x65,
    0x88, 0xb3, 0xbd, 0xd4, 0xc1, 0xe7, 0xfe, 0x30,
    0x28, 0x23, 0x4c, 0x58, 0x79, 0x94, 0x8d, 0xbd,
    0x9c, 0xdf, 0xc3, 0xe2, 0x05
    };

static const uint8_t box_b[16] = {
    0xd3, 0xb5, 0x18, 0xba, 0xe4, 0xfa, 0x2a, 0xba,
    0x9d, 0x37, 0xc9, 0xae, 0xd6, 0x76, 0xc6, 0x03
    };

static const uint8_t want[TICKET_LEN] = {
    0x8e, 0x60, 0xb8, 0x44, 0x5e, 0x3f, 0x42, 0xa2,
    0xce, 0x14, 0x20, 0x7a, 0x0e, 0x6c, 0xa8, 0xb0,
    0xb2, 0xe7, 0xaf, 0xaf, 0x3f, 0xfa, 0xf0, 0x50,
    0xa9, 0xe7, 0x7e, 0x40, 0x55, 0x04, 0x86, 0xe9,
    0xf4, 0x82, 0x1e, 0x47, 0xa9
    };

static uint8_t rol8(uint8_t x, unsigned r) {
    return (uint8_t)((x << r) | (x >> (8 - r)));
}

static uint8_t route_at(size_t i) {
    return (uint8_t)(box_a[i] ^ ((i * 19u + 0x5du) & 0xffu));
}

static uint8_t seed_at(size_t i) {
    return (uint8_t)(box_b[i] ^ ((i * 23u + 0x91u) & 0xffu));
}

static uint8_t stream_at(size_t i, uint8_t state) {
    uint8_t a = seed_at((i * 7u + 3u) & 15u);
    uint8_t b = seed_at((i * 5u + 11u) & 15u);
    uint8_t p = (uint8_t)((i * 0x3du + 0x5bu) & 0xffu);

    return (uint8_t)(rol8((uint8_t)(a + i), 3) ^
                     rol8((uint8_t)(b ^ (uint8_t)(i * 0x29u)), 1) ^
                     state ^
                     p);
}

static uint8_t next_state(size_t i, uint8_t state, uint8_t cipher) {
    uint8_t a = seed_at((i * 7u + 3u) & 15u);
    uint8_t spice = (uint8_t)((i * 13u + 0x37u) & 0xffu);
    return rol8((uint8_t)(state ^ cipher ^ a ^ spice), 1);
}

static int check_ticket(const uint8_t *ticket) {
    uint8_t state = 0xa6;
    uint8_t mixed[TICKET_LEN];

    for (size_t i = 0; i < TICKET_LEN; i++) {
        uint8_t pos = route_at(i);
        uint8_t cipher = (uint8_t)(ticket[pos] ^ stream_at(i, state));
        mixed[i] = cipher;
        state = next_state(i, state, cipher);
    }

    uint8_t diff = 0;
    for (size_t i = 0; i < TICKET_LEN; i++) {
        diff |= (uint8_t)(mixed[i] ^ want[i]);
    }

    return diff == 0;
}

int main(int argc, char **argv) {
    if (argc != 2) {
        puts("usage: ./xor_night_market <ticket>");
        return 1;
    }

    if (strlen(argv[1]) != TICKET_LEN) {
        puts("The lanterns stay dark.");
        return 1;
    }

    if (check_ticket((const uint8_t *)argv[1])) {
        puts("Welcome to the deeper night market.");
        return 0;
    }

    puts("The lanterns stay dark.");
    return 1;
}

```

#### 答案
flag{neon_xor_chain_nFR7059MIEPeN9o4}

#### 过程
太善良了，居然直接给源码，不是v一个数字的变量名真好看啊（）

从入口开始看

argc是输入参数的数量，argv是输入的字符串数组

第一个判断是否输入俩（第一个是程序名，因此第二个才是传入的验证码）

第二个判断长度对不对

主要的判断逻辑在check_ticket函数中

依旧从后往前看

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/1.png" alt="" style="max-width: 80%; height: auto;">

可以看出来判断方式是逐字验证mixed[i]和want[i]是否相等（只要这俩有一个不一样，与自己做或就会使diff变成1，然后return就是false了）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/2.png" alt="" style="max-width: 80%; height: auto;">

want是写死的，那看mix就行了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/3.png" alt="" style="max-width: 80%; height: auto;">

首先调用了route_at，把结果存到pos里面去，然后下面ticket的索引是pos

很明显，打乱顺序来的

于是我模拟了一下

```python
box_a = [
    0x43, 0x69, 0xa0, 0x92, 0xb5, 0xad, 0xcc, 0xe8,
    0xf5, 0x2c, 0x0e, 0x27, 0x57, 0x56, 0x7a, 0x65,
    0x88, 0xb3, 0xbd, 0xd4, 0xc1, 0xe7, 0xfe, 0x30,
    0x28, 0x23, 0x4c, 0x58, 0x79, 0x94, 0x8d, 0xbd,
    0x9c, 0xdf, 0xc3, 0xe2, 0x05 ];

box_b = [
    0xd3, 0xb5, 0x18, 0xba, 0xe4, 0xfa, 0x2a, 0xba,
    0x9d, 0x37, 0xc9, 0xae, 0xd6, 0x76, 0xc6, 0x03 ];


def route_at(i):
    return (box_a[i] ^ ((i * 19 + 0x5d) & 0xff));


pos = [route_at(i) for i in range(0, 37)];

print(pos);
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/4.png" alt="" style="max-width: 80%; height: auto;">

顺序也有了

取了对应位置的ticket后，跟stream_at的返回值做异或

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/5.png" alt="" style="max-width: 80%; height: auto;">

seed_at函数（也是自己的一套异或逻辑）计算处理过的a和b

然后再算个p

然后a+i循环左移3位 和 异或b与(i * 0x29)的结果 和 state 和 p 四个值做异或

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/6.png" alt="" style="max-width: 80%; height: auto;">

state由这个函数控制，其有第三个参数cipher，因此state是跟输入挂钩的

那么开始反推

首先几个函数都照抄就行了

want源于ticket[pos] ^ stream_at()

那ticket[pos]就是want[i] ^ stream_at()，对于stream_at的第三个参数，直接传want[i]就行了

```python
from ansk import *; # 自定义库，定义了个rol8

box_b = [
    0xd3, 0xb5, 0x18, 0xba, 0xe4, 0xfa, 0x2a, 0xba,
    0x9d, 0x37, 0xc9, 0xae, 0xd6, 0x76, 0xc6, 0x03];

cipher = [
    0x8e, 0x60, 0xb8, 0x44, 0x5e, 0x3f, 0x42, 0xa2,
    0xce, 0x14, 0x20, 0x7a, 0x0e, 0x6c, 0xa8, 0xb0,
    0xb2, 0xe7, 0xaf, 0xaf, 0x3f, 0xfa, 0xf0, 0x50,
    0xa9, 0xe7, 0x7e, 0x40, 0x55, 0x04, 0x86, 0xe9,
    0xf4, 0x82, 0x1e, 0x47, 0xa9];

route = [30, 25, 35, 4, 28, 17, 3, 10, 0, 36, 21, 9, 22, 2, 29, 31, 5, 19, 14, 18, 24, 11, 1, 34, 13, 27, 7, 6, 8, 16, 26, 23, 33, 15, 32, 20, 12];

result = [0] * 37;

def seed_at(i):
    return (box_b[i] ^ ((i * 23 + 0x91) & 0xff))

def stream_at(i, state):
    a = seed_at((i * 7 + 3) & 15);
    b = seed_at((i * 5 + 11) & 15);
    p = (i * 0x3d + 0x5b) & 0xff;

    return rol8((a + i), 3) ^ rol8((b ^ (i * 0x29)), 1) ^ state ^ p;

def next_state(i, state, cipher):
    a = seed_at((i * 7 + 3) & 15)
    spice = (i * 13 + 0x37) & 0xff
    return rol8((state ^ cipher ^ a ^ spice), 1);

state = 0xa6;

for i in range(37):
    res = cipher[i] ^ stream_at(i, state)
    result[route[i]] = chr(res & 255)
    state = next_state(i, state, cipher[i])

# print(result);
print("".join(result));
```

注意得出的res记得跟256取模，res可能会超过256的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/7.png" alt="" style="max-width: 80%; height: auto;">

### 02 CTF+Binary练习题-Re-Day6（2） [Score=3]
#### 题目
当前赛季：赛季0-Alpha  
题目：CTF+Binary练习题-Re-Day6（2）[Score=3]  
挑战时间：19:30~22:30  
挑战规则：解出题目，并后续在ctf+发布合格wp的师傅，会增加3分权重。

群头衔系统：  
群头衔按字母顺序递进（A→B→C...→Z）  
头衔从A开始，题目名称中含有[Score=?]，每成功完成一次挑战会将群头衔ASCII码+=?该分数权重(比如：A+2=C)，得到新的群头衔

勋章奖励：  
总共设有3个勋章  
第1个勋章（一血奖励）：2小时内最快解出题目 且 在CTF+平台发布合格writeup的参与者可获得  
第2个勋章：群头衔达到K 且 至少获得过一次一血奖励的参与者可获得  
第3个勋章：群头衔达到Z 且 至少获得过一次一血奖励的参与者可获得

注意：  
仅仅达到群头衔要求但从未获得过一血的参与者无法获得勋章

QQ群：879334917

<a href="/Download/WpCTF/Practice/Plus/202641/Reverse/Challenge" download>
    文件
</a>

#### 答案
geesec{f01504d1c05417aaf67f127e652bed76}

#### 过程
评价是：C符 · 「纯粹的地址地狱」

出题人小时候要回家结果只找到了指向指向家的路牌的路牌

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/8.png" alt="" style="max-width: 80%; height: auto;">

main

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/9.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/10.png" alt="" style="max-width: 80%; height: auto;">？  
怎么这么多变量？怎么这么多函数？就不能像第一题一样好好把过程写清楚吗（恼）要干嘛

不难发现，有一堆黄的，肯定是ida抽风了

随便进一个带黄色参数的（比方说我去406E80

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/11.png" alt="" style="max-width: 80%; height: auto;">

这玩意实际上只有一个传参

esc , F5

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/12.png" alt="" style="max-width: 80%; height: auto;">

能正常很多

这题最主要的就是地址偏移，而且逻辑都基本一致，比方说我拿argv来举个例子

知周所众，传入main的字符串就是第二个变量argv，这里是a2（于是我把它重命名为argv了）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/13.png" alt="" style="max-width: 80%; height: auto;">这是argv的唯一一次调用

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/14.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/15.png" alt="" style="max-width: 80%; height: auto;">

v6是v101地址偏移16对应的地址

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/16.png" alt="" style="max-width: 80%; height: auto;">

也就是v103的地址

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/17.png" alt="" style="max-width: 80%; height: auto;">

而v103指向的（或者说这个变量保存的）地址是v110的地址

因此这里就是在说，*v6 = v110

然后下一行，先从*v6中取出来v110的地址，然后再偏移8位

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/18.png" alt="" style="max-width: 80%; height: auto;">

得到v111的地址

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/19.png" alt="" style="max-width: 80%; height: auto;">

v111里面存了v181的地址

因此sub_406EB0(*v6)干的就是取出v181的地址，随后再偏移16位

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/20.png" alt="" style="max-width: 80%; height: auto;">

即v182，也就是说，v182 = argv

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/21.png" alt="" style="max-width: 80%; height: auto;">

然后v182又把地址传给了位于40091A0的全局变量处

这就是这题的核心（）

同理，以此逻辑再看看那四个字符串都传到哪里去了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/22.png" alt="" style="max-width: 80%; height: auto;">

1: v186[3]

```plain
v86 + 24 即 v89 -> v125
v125 + 16 即 v126 -> v186
v186 + 24 即 rsp + 0x6E0 即 v186[3]
```

2: v184[6]

```plain
v149 + 24 即 v152 -> v178
v178 + 16 即 v179 -> v184
v184 + 24 即 rsp + 0x6A8 即 v184[6]
```

3: v191

```plain
v143 + 24 即 v145 -> v163
v163 + 8  即 v164 -> v190
v190 + 24 即 rsp + 0x770 即 v191
```

4: v189[24]

```plain
v163 + 24 即 v166 -> v168
v168 + 24 即 v171 -> v189
v189 + 24 即 rsp + 0x748 即 v189[24]
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/23.png" alt="" style="max-width: 80%; height: auto;">

好了于是能开始找逻辑到底写哪了

这里使用了v191，而我们又知道v191指向一个字符串，不难推测4012C0就是用来输出字符串的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/24.png" alt="" style="max-width: 80%; height: auto;">

这玩意还有两处使用，

（对了记得ida是可以改函数名的，我把加一个值的和输出字符串的都重命名了，看起来太坐牢了）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/25.png" alt="" style="max-width: 80%; height: auto;">

第三处print的是长度不对

```plain
v101 + 16 即 v103 -> v110
v110 + 16 即 v112 -> v178
v178 + 16 即 v179 -> v184
v184 + 24 即 rsp + 0x6A8 即 v184[6]
```

第一处print是输出两种可能，对了输出字符串4，不对输出字符串3

```plain
v163 + 24 即 v166 -> v168
v168 + 24 即 v171 -> v189
v189 + 24 即 rsp + 0x748 即 v189[24]
```

```plain
v94 + 24 即 v97 -> v149
v149 + 8 即 v150 -> v190
v190 + 24 即 rsp + 0x770 即 v191
```

因此不妨来看看if判断的那个4014A0

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/26.png" alt="" style="max-width: 80%; height: auto;">

一共两处return，地址偏移指向同样的地方即v78

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/27.png" alt="" style="max-width: 80%; height: auto;">

第一处直接给v78赋值0了，那我推测很可能是判断函数，于是我找有没有 = 1，还真有，一算地址还真是v78

```plain
v38 + 8 即 v39 -> v54
v54 + 24 即 v57 -> v58
v58 + 16 即 v60 -> v64
v64 + 24 即 v67 -> v77
v77 + 16 即 rsp + 0x2A8 即 v78
```

鉴定为判断函数，那只有两种可能，一种是逻辑写里面了，一种是只是比较是否一致

很显然并未在其中找到什么异或啊乘法啊之类的符号，合理推测只是判断是否一致（直接重命名为bytes_equal）

那么看看比较对象是谁：v62和dest，比较32位

dest源于复制：

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/28.png" alt="" style="max-width: 80%; height: auto;">

unk 407120的值是定值

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/29.png" alt="" style="max-width: 80%; height: auto;">

```python
target = bytes.fromhex(
    "c8 93 52 01 a8 f8 eb 63 "
    "a6 7f 43 ca b6 40 7f db "
    "b6 1a b3 ad d2 09 96 2d "
    "5c 6a f9 13 fd 09 46 09"
)
```

v62源于v189

```plain
v172 + 8 即 v173 -> v189
```

那么现在的目的就是去找v189，来源如下：

首先

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/30.png" alt="" style="max-width: 80%; height: auto;">

输入的内容被写入s，回车截断

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/31.png" alt="" style="max-width: 80%; height: auto;">

然后唯一一次对s的引用在此处

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/32.png" alt="" style="max-width: 80%; height: auto;">

验证格式，输入的s长度是40，最后189比较的却是32位，geesec{}一共8位，那么就能推测出来，这里大概率是去掉geesec{}的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/33.png" alt="" style="max-width: 80%; height: auto;">

4011B0是计算长度的

因此v77这里应该是32

然后进入下面的if

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/34.png" alt="" style="max-width: 80%; height: auto;">

改过名之后就很清楚了，除了那一大坨的偏移之外，只有三个函数的调用

第一个函数v68是v76，v69是v77，v70就是个地址

```plain
v110 + 40 即 v115 -> v131
v131 + 16 即 v132 -> v134
v134 + 16 即 v136 -> v168
v168 + 8 即 v169 -> v193
v193 + 16 即 rsp + 0x7A8
读取这里的8字节值 -> v68
```

```plain
v129 + 16 即 v130 -> v149
v149 + 16 即 v151 -> &v159
&v159 + 16 即 v161 -> v187
读取 v187 开头的4字节值 -> v69
```

```plain
v131 + 16 即 v132 -> v134
v134 + 8 即 v135 -> v183
v183 + 16 即 rsp + 0x688
取这个地址 -> v70
```

这个函数干的事是：

先令state = 0xB7，然后将输入的值放到缓冲区里面

内层循环state = buffer[j] ^ state，j < i

循环完后外层循环buffer[i] = state ^ buffer[i]

然后将值传到a3

第二个函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/35.png" alt="" style="max-width: 80%; height: auto;">

每个值跟0xC4异或

第三个函数，也是最复杂的一个

先重命名好

启用调试

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/36.png" alt="" style="max-width: 80%; height: auto;">

在函数入口处设置好断点后追踪RDI，会发现传入的地址是41CB30（其实看RSI也能发现这就是传入值，RSI存的是20h也就是32），这个值就是传入的字符串的第一个值所在地址

追踪41CB30

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/37.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/38.png" alt="" style="max-width: 80%; height: auto;">

停于此处

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/39.png" alt="" style="max-width: 80%; height: auto;">

对应伪C，也就是说，这里尝试读取值并存于v122处

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/40.png" alt="" style="max-width: 80%; height: auto;">

v122将值存入dl，dl又存入rax+rcx中去

此时运行到断点处

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/41.png" alt="" style="max-width: 80%; height: auto;">

也就是说，此处在准备往41CB60的位置写入值

追踪41CB60，去掉其他所有断点，F9

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/42.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/43.png" alt="" style="max-width: 80%; height: auto;">

在此处触发

注意到这里是把值传入edx中，然后edx和某个值esi异或

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/44.png" alt="" style="max-width: 80%; height: auto;">

esi也就是rbp + var_6EC

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/45.png" alt="" style="max-width: 80%; height: auto;">

这里对应的就是异或v110

不妨直接找一下110的传递链

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/46.png" alt="" style="max-width: 80%; height: auto;">

（ori_vector就是v130，我改名了），v110就是v130[i]（plus_16(v169) 就写在上面while循环里面）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/47.png" alt="" style="max-width: 80%; height: auto;">

v130在上面被赋值了16字节，再结合上面 < 16，现在能猜一手存在分组回绕（不然输入值处理不完了）

继续F9，停在了子函数404180里面了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/48.png" alt="" style="max-width: 80%; height: auto;">

这里是字节从rax+rcx进eax了，eax又传给rbp+var_30C，然后又传给eax

在404448的位置发现第二次异或，eax（刚刚传入的值）和ecx异或

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/49.png" alt="" style="max-width: 80%; height: auto;">

对应的其中v137 ^ v138

v138 = *(_BYTE *)(v136 + **(unsigned __int8 **)plus_16_0(*v7));

很明显是个数组，前面是0的位置，后面是下标

```plain
v165 + 16 即 v166 -> v189
v189 + 16 即 rsp + 0x3E0，即 v190，存入 a2
v136 -> v190
```

也就是说v136就是这个子函数的a2，看下标：

```plain
v173 + 16 即 v174 -> v175
v175 + 16 即 v177 -> v191
读取 v191 第一个字节，作为下标 i
```

在循环末尾

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/50.png" alt="" style="max-width: 80%; height: auto;">

```plain
v167 + 32 即 v171 -> v173
v173 + 16 即 v174 -> v175
v175 + 16 即 v177 -> v191
读取 v191 第一个字节，即 i
```

也就是说

v138 = a2[i];

也就是说，v138就是我们前面定位的eax

那么看看v137（也就是ecx）是啥

ecx源于rbp+var_318

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/51.png" alt="" style="max-width: 80%; height: auto;">

那么在Hex View处查找RBP - 0x318的位置

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/52.png" alt="" style="max-width: 80%; height: auto;">

从小端起算，这里是0x00007FFFFFFFC1D0

可以发现这里和刚进入此函数时传入的RDI一致，RDI对应的是传入的第一个参数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/53.png" alt="" style="max-width: 80%; height: auto;">

也就是说，此时ecx就是s[0]

s是个定值

源于函数402A00从unk_409180取的值

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/54.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/55.png" alt="" style="max-width: 80%; height: auto;">

这个函数就是把409180复制到s中去

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/56.png" alt="" style="max-width: 80%; height: auto;">

然后404180调用处将s传入了

好了看回去

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/57.png" alt="" style="max-width: 80%; height: auto;">

eax又跟ecx异或了一次，这次ecx源于rbp + rcx + var_2E0

对应伪C中的这句

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/58.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/59.png" alt="" style="max-width: 80%; height: auto;">

143是写好的值，后面是下标

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/60.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/61.png" alt="" style="max-width: 80%; height: auto;">

xor将值存入rbp + var_301，又存入dl，又存回rax+rcx

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/62.png" alt="" style="max-width: 80%; height: auto;">

写入后追踪RAX地址41CB90，和前面追踪同理

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/63.png" alt="" style="max-width: 80%; height: auto;">

又写回ecx了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/64.png" alt="" style="max-width: 80%; height: auto;">

对应伪C，从byte_409070处查表替换

因此这里可以理解为：

```c
for (i = 0; i < 16; i++)
    v144[i] = byte_409070[buffer[i]];
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/65.png" alt="" style="max-width: 80%; height: auto;">

```python
table = bytes([
    0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
    0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
    0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
    0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
    0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
    0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
    0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
    0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
    0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
    0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
    0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
    0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
    0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
    0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
    0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
    0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16,
])
```

然后while对这一组16个处理完后进入sub 405060重排顺序

```plain
0  1  2  3  4  5  6  7  8  9 10 11 12 13 14 15 新
0  5 10 15  4  9 14  3  8 13  2  7 12  1  6 11 原
```

其实这里已经有很明显的AES影子了，byte 409070是个S盒，405060是AES的行移位，每次处理16字节

然后追踪v144也就是RBP - 0x2D0，也就是0x7FFFFFFFBDC0，打断点

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/66.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/67.png" alt="" style="max-width: 80%; height: auto;">

对应伪C

这块直接看伪C就行了，比较简单

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/68.png" alt="" style="max-width: 80%; height: auto;">

这里删掉地址偏移就是

```c
v111 = v144[i];
v112 = v144[i + 1] ^ v111;
v113 = v144[i + 2] ^ v112;
v114 = v144[i + 3] ^ v113;
```

即

```c
v114 = v144[i] ^ v144[i+1] ^ v144[i+2] ^ v144[i+3];
```

然后进405330

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/69.png" alt="" style="max-width: 80%; height: auto;">（我的天这么正常的一个函数）

对味了，AES的列混合，基本可以断定就是AES了，然后就是找轮密钥从哪里来的（这个循环也就干了个列混合）

然后继续追踪

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/70.png" alt="" style="max-width: 80%; height: auto;">

404843处写回缓冲区，在此打断点看RAX和RCX的值

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/71.png" alt="" style="max-width: 80%; height: auto;">

继续追踪rax+rcx

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/72.png" alt="" style="max-width: 80%; height: auto;">

于此处触发

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/73.png" alt="" style="max-width: 80%; height: auto;">

对应下一个循环中的此处，这里也是直接看伪C就行了

缓冲区跟v108异或后存回自身

v108源于*((_BYTE *)v143 + **(unsigned __int8 **)plus_16_0(*v66)) ^ v107，偏移算一下就知道是v143[i] ^ *v106，v143是写好的值，那么就是看v106是谁

```plain
v154 + 16 即 v155 -> v167
v167 + 40 即 v172 -> v191
v191 + 24 即 rsp + 0x400，即 v192
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/74.png" alt="" style="max-width: 80%; height: auto;">

也就是说v106指向v192，最初v192是a1（C1D0），现在差了10h也就是16，也就是说这一轮是

```c
buffer[i] ^= s[16 + i] ^ ((unsigned char *)v143)[i];
```

这里由于是 ^= 也就是说是存回原地的，那直接继续追踪41CB90就行了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/75.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/76.png" alt="" style="max-width: 80%; height: auto;">

回到此处

也就是说整个函数顺序就是：

上一轮结果保存在 buffer

    ↓ 下一轮读取同一个 buffer

查表写入 v144

    ↓ 行移位、列混合

结果写回 buffer

    ↓ 轮密钥异或

下一轮

经过9轮后会进入最后一轮

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/77.png" alt="" style="max-width: 80%; height: auto;">

这里跟上面逻辑基本是一致的

sub_405060：原地行移位

    ↓

最后一组密钥数据与 v143 参与异或

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/78.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/79.png" alt="" style="max-width: 80%; height: auto;">

而后就回到外层了，继续追踪

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/80.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/81.png" alt="" style="max-width: 80%; height: auto;">

这里是跟0异或，因此不改变任何值，继续追踪

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/82.png" alt="" style="max-width: 80%; height: auto;">

这里就是把值覆盖ori_vector，也就是v130了

再追踪呢就会发现进比较了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/83.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/84.png" alt="" style="max-width: 80%; height: auto;">

于是这个函数处理流程就清楚了

现在去看看s的值，定位RSP+0x130的位置

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/85.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/86.png" alt="" style="max-width: 80%; height: auto;">

```python
s = bytes.fromhex("""
D3 4A A9 13 E7 A3 FA FA 2F C8 DD A3 8E C2 D7 3B
F7 44 4B 0A 10 E7 B1 F0 3F 2F 6C 53 B1 ED BB 68
A0 AE 0E C2 B0 49 BF 32 8F 66 D3 61 3E 8B 68 09
99 EB 0F 70 29 A2 B0 42 A6 C4 63 23 98 4F 0B 2A
15 C0 EA 36 3C 62 5A 74 9A A6 39 57 02 E9 32 7D
1B E3 15 41 27 81 4F 35 BD 27 76 62 BF CE 44 1F
B0 F8 D5 49 97 79 9A 7C 2A 5E EC 1E 95 90 A8 01
90 3A A9 63 07 43 33 1F 2D 1D DF 01 B8 8D 77 00
4D CF CA 0F 4A 8C F9 10 67 91 26 11 DF 1C 51 11
CA 1E 48 91 80 92 B1 81 E7 03 97 90 38 1F C6 81
3C AA 44 96 BC 38 F5 17 5B 3B 62 87 63 24 A4 06
""")
```

豪，那么，先尝试复现一下404180的一轮

```python
CONSTANT = bytes.fromhex(
    "F6 C9 DC 77 3F D5 88 9D "
    "92 0A 26 EE 48 9A 28 B1"
) # 也就是v143，记得是小端存储


# sub_405330
def xtime(x):
    return ((x << 1) ^ (0x1B if x & 0x80 else 0)) & 0xFF


# sub_405060：返回重排后的 16 字节
def shift_rows(block):
    order = (
        0, 5, 10, 15,
        4, 9, 14, 3,
        8, 13, 2, 7,
        12, 1, 6, 11,
    )
    return bytes(block[i] for i in order)


# 列混合：返回处理后的 16 字节
def mix_columns(block):
    result = bytearray(16)

    for i in range(0, 16, 4):
        a, b, c, d = block[i:i + 4]
        t = a ^ b ^ c ^ d

        result[i]     = a ^ t ^ xtime(a ^ b)
        result[i + 1] = b ^ t ^ xtime(b ^ c)
        result[i + 2] = c ^ t ^ xtime(c ^ d)
        result[i + 3] = d ^ t ^ xtime(d ^ a)

    return bytes(result)


def encrypt_block(block, s, table):
    if len(block) != 16:
        return
    if len(s) != 176:
        return
    if len(table) != 256:
        return

    state = bytearray(block)

    def add_round_key(r):
        for i in range(16):
            state[i] ^= s[16 * r + i] ^ CONSTANT[i]

    # 初始异或
    add_round_key(0)

    # 中间 9 轮
    for r in range(1, 10):
        state[:] = bytes(table[x] for x in state)
        state[:] = shift_rows(state)
        state[:] = mix_columns(state)
        add_round_key(r)

    # 最后一轮
    state[:] = bytes(table[x] for x in state)
    state[:] = shift_rows(state)
    add_round_key(10)

    return bytes(state)
```

调用：

```python
result = encrypt_block(block, s, table)
print(result.hex(" "))
```

其中s和table前面写过了，block就是404180传入的值

通过刚进入函数时的RSI来看

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/87.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/88.png" alt="" style="max-width: 80%; height: auto;">

也就是这两行，这次由于复现第一轮因此只取第一轮

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/89.png" alt="" style="max-width: 80%; height: auto;">

和前面的41CB90完全一致，证明复现正确（PS，这个值是跟你的输入相关的，我的输入是geesec{12345678901234567890123456789012}，如果输入不一致这个值也是不一致的）

那么再补上，先与v130 / 上一轮的处理结果做异或，再进入404180，就是完整的405370了

```python
ori_vector = bytes.fromhex(
    "BD B5 82 58 AE F5 27 89 "
    "03 B3 01 75 60 76 72 D2"
)

def encrypt_data(data, s, table):
    previous = ori_vector
    output = bytearray()

    for offset in range(0, len(data), 16):
        block = data[offset:offset + 16]

        block = bytes(block[i] ^ previous[i] for i in range(16))

        encrypted = encrypt_block(block, s, table)

        output.extend(encrypted)

        previous = encrypted

    return bytes(output)
```

这前面理论上来说还有一个补齐的，但由于这里输入的就是32位，因此补齐我就没写

那么，开逆！

AES怎么逆在此不再赘述（）

```python
from f_original import F

cipher = bytes.fromhex(
    "CA 5A 96 FF 08 49 72 39 36 18 13 8A 14 C0 0C 78 "
    "F8 7C 49 C7 BE E8 91 ED 7F B0 02 AD 77 74 D4 34"
)

c = [int.from_bytes(cipher[i:i + 4], "little") for i in range(0, len(cipher), 4)]
a = c[1::2]
b = c[::2]

table = bytes.fromhex("""
53 42 AF B8 12 6A 6C 5B 87 70 88 60 62 CE B5 2F
40 09 11 49 96 3B C8 78 54 D3 A4 C1 75 D2 20 0C
28 A3 02 58 1D A5 BF 59 23 F2 D8 F5 99 1F 0D 77
82 2A 24 AD C6 D1 73 7D 52 06 2B 79 F3 F8 E5 8C
91 71 E3 F1 CC 9F 94 FD 32 C9 8E 1A 19 18 61 FB
E9 5A DC 6F 81 4C 0A D9 90 6E 36 5C 39 1C 4B 45
43 3E 6D 25 DB 03 CD 44 B1 C3 84 72 A1 41 8A 10
80 7A 83 21 17 2C B6 4D 67 13 5D B9 CB 15 27 50
01 86 56 C7 98 B0 33 FA A0 C2 92 48 C4 22 1B FC
9C 16 EC E1 BB 0F C0 85 DE CA DF E6 7F E4 BC AA
AB E7 5E 30 A9 2E BA 4E F7 B7 37 9A 4A 76 A7 63
3F A8 55 9B BD 4F 38 8D 7E DD 31 69 8F D4 7C 0E
F0 35 FF BE 14 5F 51 9E 3D 57 DA 7B 04 A2 46 2D
F4 F9 97 68 CF 93 B2 08 D7 EB 8B 3C ED AE E8 34
AC E0 EF 65 B4 0B EA 95 C5 E2 EE 29 B3 A6 05 FE
3A 66 47 6B D5 D0 74 1E F6 00 9D 89 26 D6 07 64
""")

inv_table = [0] * len(table)
for i, value in enumerate(table):
    inv_table[value] = i

key = ((0x8877665540302010).to_bytes(8, "little") + (0x2301EFDECDBCAB90).to_bytes(8, "little"))
listkey = [int.from_bytes(key[i:i + 4], "little") for i in range(0, 16, 4)]


for k in range(3, -1, -1):
    for i in range(4):
        a[i], b[i] = b[i], a[i] ^ F(b[i], listkey[k], table)

result = b"".join((x & 0xFFFFFFFF).to_bytes(4, "little") for pair in zip(b, a) for x in pair)

result = result[1:] + result[:1]

result = bytes(inv_table[value] for value in result)

result = bytes((value ^ key[i % 16]) for i, value in enumerate(result))

print(result)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/90.png" alt="" style="max-width: 80%; height: auto;">

得出（）

### 03 obfuscat3_revenge
#### 题目
私密马赛没能让re手尽兴答案

<a href="/Download/WpCTF/Practice/Plus/202641/Reverse/obfuscat3_revenge" download>
    文件
</a>

#### 答案
SYC{Then_you_are_1mpressivse}

#### 过程
并非没尽兴（）

先看跟谁比

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/91.png" alt="" style="max-width: 80%; height: auto;">

target_enc是定值：

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/92.png" alt="" style="max-width: 80%; height: auto;">

```plain
target_enc = bytes.fromhex(
    "CA 5A 96 FF 08 49 72 39 36 18 13 8A 14 C0 0C 78 "
    "F8 7C 49 C7 BE E8 91 ED 7F B0 02 AD 77 74 D4 34"
)
```

然后去看逻辑

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/93.png" alt="" style="max-width: 80%; height: auto;">

输入值传入s，s地址传给src后进行了第一步加密

然后src值传给s1进行第二步加密

先看src部分

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/94.png" alt="" style="max-width: 80%; height: auto;">

这一步是查看是否是utf-8文本

 某些编辑器保存 UTF-8 文本时，会在开头添加这三个字节：EF BB BF

这里不重要，后面src = src + 3也去除它了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/95.png" alt="" style="max-width: 80%; height: auto;">

初见端倪

n是长度，这里是n - 3

然后就是把src复制给s1了

s1被扔进real_en加密处理

那就去real_en看看

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/96.png" alt="" style="max-width: 80%; height: auto;">？我认可你的极难定位了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/97.png" alt="" style="max-width: 80%; height: auto;">

总的来看一共4层

1，en1处理

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/98.png" alt="" style="max-width: 80%; height: auto;">

这里不妨设a2[i % 16]为y，a1[i]为x

那么

```plain
v4 = y & (x ^ y) = y & ~x

x = ~(y | ~x | ~(y & ~x)) | (~(y | ~x) & 0x8D | (y | ~x) & 0x72) ^ (v4 & 0x8D | ~v4 & 0x72)
  = (~y & x & (y & ~x)) | (((x & ~y) ^ 0x72) ^ ((y & ~x) ^ 0x72))
  = 0 | ((x & ~y) ^ (y & ~x))
  = x ^ y
```

注意到这里的0x8D是10001101，0x72是01110010，两者互补，因此(z & 0x8D) | (~z & 0x72)就是z ^ 0x72

因此这里en1就是a1依次跟a2[i % 16]进行异或

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/99.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/100.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/101.png" alt="" style="max-width: 80%; height: auto;">

因此传入的a2就是main里面的v10

2，for i 循环查表替换

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/102.png" alt="" style="max-width: 80%; height: auto;">

使用的数组是v34，源于传入的第三个参数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/103.png" alt="" style="max-width: 80%; height: auto;">

第三个参数是v9，是一个256长度的数组，位于rsp+0x1A0的位置

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/104.png" alt="" style="max-width: 80%; height: auto;">

也就是此处开始

```python
table = bytes.fromhex("""
53 42 AF B8 12 6A 6C 5B 87 70 88 60 62 CE B5 2F
40 09 11 49 96 3B C8 78 54 D3 A4 C1 75 D2 20 0C
28 A3 02 58 1D A5 BF 59 23 F2 D8 F5 99 1F 0D 77
82 2A 24 AD C6 D1 73 7D 52 06 2B 79 F3 F8 E5 8C
91 71 E3 F1 CC 9F 94 FD 32 C9 8E 1A 19 18 61 FB
E9 5A DC 6F 81 4C 0A D9 90 6E 36 5C 39 1C 4B 45
43 3E 6D 25 DB 03 CD 44 B1 C3 84 72 A1 41 8A 10
80 7A 83 21 17 2C B6 4D 67 13 5D B9 CB 15 27 50
01 86 56 C7 98 B0 33 FA A0 C2 92 48 C4 22 1B FC
9C 16 EC E1 BB 0F C0 85 DE CA DF E6 7F E4 BC AA
AB E7 5E 30 A9 2E BA 4E F7 B7 37 9A 4A 76 A7 63
3F A8 55 9B BD 4F 38 8D 7E DD 31 69 8F D4 7C 0E
F0 35 FF BE 14 5F 51 9E 3D 57 DA 7B 04 A2 46 2D
F4 F9 97 68 CF 93 B2 08 D7 EB 8B 3C ED AE E8 34
AC E0 EF 65 B4 0B EA 95 C5 E2 EE 29 B3 A6 05 FE
3A 66 47 6B D5 D0 74 1E F6 00 9D 89 26 D6 07 64
""")
```

3，for j 改位置

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/105.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/106.png" alt="" style="max-width: 80%; height: auto;">

结合perm的内容来看，就是循环右移1（31，0，1，2，...）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/107.png" alt="" style="max-width: 80%; height: auto;">

然后存回v36，并把v36按每4个字节拆成8个整数

4，for k循环，k = k - 993904947 + 993904948就是k++

然后调试追踪下面那一大坨

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/108.png" alt="" style="max-width: 80%; height: auto;">

断点打这两处，前面是call F的位置，后面是F回来的位置

第一处断点运行时：

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/109.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/110.png" alt="" style="max-width: 80%; height: auto;">

也就是说此时这俩值是0xB811A358（PS，这玩意应该是跟输入值相关的，要复现的话，我传入值是12345678）

然后再F9

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/111.png" alt="" style="max-width: 80%; height: auto;">

v5是0x3D64AB7F

然后再打断点

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/112.png" alt="" style="max-width: 80%; height: auto;">

相当于直接掠过v28赋值的这一大段位操作符

F9

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/113.png" alt="" style="max-width: 80%; height: auto;">

得到v28新值是0x85750827

这一大段位操作符里面，只有v5和v19（也就是旧的v29），鉴于前面那一大坨就是在给俩做异或，不放这里测试一下

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/114.png" alt="" style="max-width: 80%; height: auto;">

对的就是异或（我真求他了）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/115.png" alt="" style="max-width: 80%; height: auto;">

同理继续看下面

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/116.png" alt="" style="max-width: 80%; height: auto;">

v18v27俩值是0x8F9A9C3F

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/117.png" alt="" style="max-width: 80%; height: auto;">

执行完F后v7是0xE8C7AAB5

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/118.png" alt="" style="max-width: 80%; height: auto;">

执行完v26的赋值后v26是0x675D368A

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/119.png" alt="" style="max-width: 80%; height: auto;">

嗯对的又是异或（神了）

下面两组也是同样的操作

也就是说  
每一次循环干的事就是：  
a赋值给b，旧b跟F返回值异或赋值给a

这里面a指v28、v26、v24、v22

b指v29、v27、v25、v23

也就是：

```python
b, a = a, b ^ F(a, v20, v34)
```

那么现在欠缺的就是F怎么出来的了  
传入F的三个参数分别是a（变量）、v20、v34

v20是：v20 = *(_DWORD *)&v35[4 * (k % 4)];，也就是说，每次读v35的4个字节，0:4，4:8，8:12，12:16

v35是定值，源于传入的a2，a2来源上面说过，是main的v10，是个定值

v34源于a3也就是main的v9，上面也说过来源，也是个定值

那就好了，F真正的逻辑不需要知道，照抄就行了，

```python
def u32(x):
    return x & 0xFFFFFFFF


def BYTE1(x):
    return (x >> 8) & 0xFF


def BYTE2(x):
    return (x >> 16) & 0xFF


def HIBYTE(x):
    return (x >> 24) & 0xFF


def HIWORD(x):
    return (x >> 16) & 0xFFFF


def not_en(a1, a2):
    a1 = u32(a1)
    a2 = ((a2 & 0xFF) ^ 0x80) - 0x80

    v2 = u32(a1 << a2)
    v3 = u32(a1 >> (126 - a2 - 94))
    v4 = u32((v2 & 0x25EA1BC5 | ~v2 & 0xDA15E43A) ^ 0x25EA1BC5)
    v5 = u32((v3 & 0x64691B93 | ~v3 & 0x9B96E46C) ^ 0x64691B93)
    v6 = u32(v5 & ((v3 & 0x64691B93 | ~v3 & 0x9B96E46C) ^ 0x1D2BA36))
    v7 = u32(v2 & (v2 ^ 0x9A445E5A) ^ ~(~v4 | 0x65BBA1A5) | v2 & (v2 ^ 0x9A445E5A) & ~(~v4 | 0x65BBA1A5))
    v8 = u32(~(~(v3 & (v3 ^ 0x9A445E5A)) | ~v6) | (v3 & (v3 ^ 0x9A445E5A) & 0x198B3613 | ~(v3 & (v3 ^ 0x9A445E5A)) & 0xE674C9EC) ^ (v6 & 0x198B3613 | ~v6 & 0xE674C9EC))
    v9 = u32((v8 & 0xC480544A | ~v8 & 0x3B7FABB5) ^ (v7 & 0xC480544A | ~v7 & 0x3B7FABB5))
    return u32(~(v5 ^ v4 | v5 & v4 | ~v9) | (~(v5 ^ v4 | v5 & v4) & 0xFD4B7F36 | (v5 ^ v4 | v5 & v4) & 0x2B480C9) ^ (v9 & 0xFD4B7F36 | ~v9 & 0x2B480C9))


def F(a1, a2, a3):
    a1 = u32(a1)
    a2 = u32(a2)

    v3 = u32(~(~((a1 & 0x758299B7 | ~a1 & 0x8A7D6648) ^ 0x758299B7) | ~a2))
    v22 = u32(~(~(a1 & (a2 ^ a1)) | ~v3) | (a1 & (a2 ^ a1) & 0x37EA203 | ~(a1 & (a2 ^ a1)) & 0xFC815DFC) ^ (v3 & 0x37EA203 | ~v3 & 0xFC815DFC))
    v21 = a3[u32(((v22 & 0xFF) | ~v22 & 0xFFFFFF00) & (~v22 ^ ((v22 & 0xFF) | ~v22 & 0xFFFFFF00)))] & 0xFF
    v20 = a3[u32(~(~(v22 >> 8) | ~(BYTE1(v22) | ~(v22 >> 8) & 0xFFFFFF00)))] & 0xFF
    v19 = a3[u32((BYTE2(v22) | ~HIWORD(v22) & 0xFFFFFF00) & (~HIWORD(v22) ^ (BYTE2(v22) | ~HIWORD(v22) & 0xFFFFFF00)))] & 0xFF
    v18 = a3[u32(~(~(HIBYTE(v22) | 0xFF) | (~HIBYTE(v22) & 0x8F9BA9C5 | HIBYTE(v22) & 0x7064563A) ^ 0x8F9BA93A))] & 0xFF
    v4 = u32(
        ~(~(~(((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
               ^ (v21 & 0x26 | ~v21 & 0xA1824AD9))
            | ~(v20 << 8) | ~v21)
          | ((((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
              ^ (v21 & 0x26 | ~v21 & 0xA1824AD9)) & 0xE1D0D865
             | ~(((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
                 ^ (v21 & 0x26 | ~v21 & 0xA1824AD9)) & 0x1E2F279A)
          ^ (~(~(v20 << 8) | ~v21) & 0xE1D0D865
             | (~(v20 << 8) | ~v21) & 0x1E2F279A))
        & 0xB7FF90F8
    )
    v5 = u32(
        ((~(~(((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
               ^ (v21 & 0x26 | ~v21 & 0xA1824AD9))
             | ~(v20 << 8) | ~v21)
          | ((((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
              ^ (v21 & 0x26 | ~v21 & 0xA1824AD9)) & 0xE1D0D865
             | ~(((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
                 ^ (v21 & 0x26 | ~v21 & 0xA1824AD9)) & 0x1E2F279A)
          ^ (~(~(v20 << 8) | ~v21) & 0xE1D0D865
             | (~(v20 << 8) | ~v21) & 0x1E2F279A))
         & 0x48006F07 | v4)
        ^ 0x48006F07
    )
    v6 = u32(((v19 << 16) & 0xCF0E04B2 | ~(v19 << 16) & 0x30F1FB4D) ^ 0xCF0E04B2)
    v7 = u32(
        ~(~(~(~(((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
                 ^ (v21 & 0x26 | ~v21 & 0xA1824AD9))
              | ~(v20 << 8) | ~v21)
            | ((((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
                ^ (v21 & 0x26 | ~v21 & 0xA1824AD9)) & 0xE1D0D865
               | ~(((v20 << 8) & 0xB526 | ~(v20 << 8) & 0xA1824AD9)
                   ^ (v21 & 0x26 | ~v21 & 0xA1824AD9)) & 0x1E2F279A)
            ^ (~(~(v20 << 8) | ~v21) & 0xE1D0D865
               | (~(v20 << 8) | ~v21) & 0x1E2F279A))
          | 0x62696EE9)
    )
    v8 = u32((v19 << 16) & ((v19 << 16) ^ 0x62696EE9))
    v9 = u32(
        ~(v8 ^ v6 & (((v19 << 16) & 0xCF0E04B2 | ~(v19 << 16) & 0x30F1FB4D) ^ 0x529895A4)
          | v8 & v6 & (((v19 << 16) & 0xCF0E04B2 | ~(v19 << 16) & 0x30F1FB4D) ^ 0x529895A4))
        & (v7 ^ v5 & (v5 ^ 0x9D969116) | v7 & v5 & (v5 ^ 0x9D969116))
        | ~(v7 ^ v5 & (v5 ^ 0x9D969116) | v7 & v5 & (v5 ^ 0x9D969116))
        & (v8 ^ v6 & (((v19 << 16) & 0xCF0E04B2 | ~(v19 << 16) & 0x30F1FB4D) ^ 0x529895A4)
           | v8 & v6 & (((v19 << 16) & 0xCF0E04B2 | ~(v19 << 16) & 0x30F1FB4D) ^ 0x529895A4))
    )
    v10 = u32(
        ~(v6 ^ v5 | v6 & v5 | ~v9)
        | (~(v6 ^ v5 | v6 & v5) & 0x8196033E
           | (v6 ^ v5 | v6 & v5) & 0x7E69FCC1)
        ^ (v9 & 0x8196033E | ~v9 & 0x7E69FCC1)
    )
    v11 = u32((v10 & 0xD3333F3C | ~v10 & 0x2CCCC0C3) ^ 0xD3333F3C)
    v12 = u32(((v18 << 24) & 0x6D315547 | ~(v18 << 24) & 0x92CEAAB8) ^ 0x6D315547)
    v13 = u32(~(~v10 | 0x1E7532C0))
    v14 = u32((v18 << 24) & ((v18 << 24) ^ 0x1E7532C0))
    v15 = u32(
        ~(v14 ^ ~(~v12 | 0xE18ACD3F) | v14 & ~(~v12 | 0xE18ACD3F))
        & (~(~v13 | ~(v11 & (v11 ^ 0xE18ACD3F)))
           | (v13 & 0xA142C856 | ~v13 & 0x5EBD37A9)
           ^ (v11 & (v11 ^ 0xE18ACD3F) & 0xA142C856
              | ~(v11 & (v11 ^ 0xE18ACD3F)) & 0x5EBD37A9))
        | ~(~(~v13 | ~(v11 & (v11 ^ 0xE18ACD3F)))
            | (v13 & 0xA142C856 | ~v13 & 0x5EBD37A9)
            ^ (v11 & (v11 ^ 0xE18ACD3F) & 0xA142C856
               | ~(v11 & (v11 ^ 0xE18ACD3F)) & 0x5EBD37A9))
        & (v14 ^ ~(~v12 | 0xE18ACD3F) | v14 & ~(~v12 | 0xE18ACD3F))
    )
    v16 = u32(((v12 ^ v11 | v12 & v11) & 0x705F09F8 | ~(v12 ^ v11 | v12 & v11) & 0x8FA0F607)^ 0x705F09F8)
    return not_en(u32( ~(~v16 | ~v15) | (v16 & 0x80363BBB | ~v16 & 0x7FC9C444) ^ (v15 & 0x80363BBB | ~v15 & 0x7FC9C444)) ,5)
```

于是逆向逻辑就是从cipher出发，逆着key使用

a, b = b, a ^ F(b, key, table)

然后呢，在解密的时候还会发现有个坑

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/120.png" alt="" style="max-width: 80%; height: auto;">

欸，key的i溢出了，为什么呢（）  
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/121.png" alt="" style="max-width: 80%; height: auto;">

v10是8长度数组，因此如果真的要遍历16长度的话，会越界访问到v11去（我就说好端端的为什么不传数组要传指针，搁这等着我呢）

因此真正解这里的key需要v10和v11拼在一起

```python
from f_original import F

cipher = bytes.fromhex(
    "CA 5A 96 FF 08 49 72 39 36 18 13 8A 14 C0 0C 78 "
    "F8 7C 49 C7 BE E8 91 ED 7F B0 02 AD 77 74 D4 34"
)

c = [int.from_bytes(cipher[i:i + 4], "little") for i in range(0, len(cipher), 4)]
a = c[1::2]
b = c[::2]

table = bytes.fromhex("""
53 42 AF B8 12 6A 6C 5B 87 70 88 60 62 CE B5 2F
40 09 11 49 96 3B C8 78 54 D3 A4 C1 75 D2 20 0C
28 A3 02 58 1D A5 BF 59 23 F2 D8 F5 99 1F 0D 77
82 2A 24 AD C6 D1 73 7D 52 06 2B 79 F3 F8 E5 8C
91 71 E3 F1 CC 9F 94 FD 32 C9 8E 1A 19 18 61 FB
E9 5A DC 6F 81 4C 0A D9 90 6E 36 5C 39 1C 4B 45
43 3E 6D 25 DB 03 CD 44 B1 C3 84 72 A1 41 8A 10
80 7A 83 21 17 2C B6 4D 67 13 5D B9 CB 15 27 50
01 86 56 C7 98 B0 33 FA A0 C2 92 48 C4 22 1B FC
9C 16 EC E1 BB 0F C0 85 DE CA DF E6 7F E4 BC AA
AB E7 5E 30 A9 2E BA 4E F7 B7 37 9A 4A 76 A7 63
3F A8 55 9B BD 4F 38 8D 7E DD 31 69 8F D4 7C 0E
F0 35 FF BE 14 5F 51 9E 3D 57 DA 7B 04 A2 46 2D
F4 F9 97 68 CF 93 B2 08 D7 EB 8B 3C ED AE E8 34
AC E0 EF 65 B4 0B EA 95 C5 E2 EE 29 B3 A6 05 FE
3A 66 47 6B D5 D0 74 1E F6 00 9D 89 26 D6 07 64
""")

inv_table = [0] * len(table)
for i, value in enumerate(table):
    inv_table[value] = i

key = bytes.fromhex("10 20 30 40 55 66 77 88 90 AB BC CD DE EF 01 23")
listkey = [int.from_bytes(key[i:i + 4], "little") for i in range(0, 16, 4)]


for k in range(3, -1, -1):
    for i in range(4):
        a[i], b[i] = b[i], a[i] ^ F(b[i], listkey[k], table)

result = b"".join((x & 0xFFFFFFFF).to_bytes(4, "little") for pair in zip(b, a) for x in pair)

result = result[1:] + result[:1]

result = bytes(inv_table[value] for value in result)

result = bytes((value ^ key[i % 16]) for i, value in enumerate(result))

print(result)

```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/122.png" alt="" style="max-width: 80%; height: auto;">

### 04 极客大挑战2024-玩就行了
#### 题目
师傅们思来想去想要给大家搞点乐趣，快来和三叶草娘一起玩游戏吧~

链接: https://pan.baidu.com/s/1gXKEZJbRhyEfO6BHHQ1bLw?pwd=game 提取码: game

<a href="/Download/WpCTF/Practice/Plus/202641/Reverse/玩就行了.rar" download>
    文件
</a>

#### 答案
SYC{cOnGraduulaTions_mIneR:D}

#### 过程
虽然我最开始接触的写程序就是Unity，但是是写Unity不是反编译Unity口丫（）

Unity生命周期函数常见的一共有如下几种：Awake（物体实例化时调用），Start（组件实例化时调用），Update（每帧调用），FixedUpdate（固定帧调用，一般用于物理相关），OnDestroy（MonoBehavior被销毁调用）、OnEnable（组件激活调用）、OnDisable（组件失活调用）、

Unity本身反编译比较困难（）  
题目里已经给出了反编译的C++文件，位于

\玩就行了_BackUpThisFolder_ButDontShipItWithYourGame\il2cppOutput

下面

##### 1
先进Assembly-CSharp.cpp

然后直接查找生命周期函数，能找到五个对象：

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/123.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/124.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/125.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/126.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/127.png" alt="" style="max-width: 80%; height: auto;">

把小游戏玩一下就知道几个对象干啥的了（就是个黄金矿工）（其实应该说是挂载到GameObject上的组件）

Gold，黄金对象，游戏中实例化最多的东西

Hook，抓钩

Find，不重要，生命周期函数全是空的

ResolutionSetter，设置分辨率的

RandomCreate，大概是用来随机生成黄金用的

这其中值得看的，首先是Hook：

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/128.png" alt="" style="max-width: 80%; height: auto;">

start函数获取了transform对象，这个在Unity里是用来设置游戏对象的位置、旋转等信息的一个组件，这里从transform中获取了position

下面就是获取“money”的字符串（这应该都看得出来吧（））

Update：

一开始就是初始化

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/129.png" alt="" style="max-width: 80%; height: auto;">

第一个判断是否按下了鼠标，是的话就将moving设置为true

第二个判断如果不是moving状态就去label002f

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/130.png" alt="" style="max-width: 80%; height: auto;">

002f是控制旋转的，执行完后进0035

如果是moving就继续

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/131.png" alt="" style="max-width: 80%; height: auto;">

判断是否需要返回，等同于

```csharp
if (returnToInitPos)
    HookReturn();
else
    HookMove();
```

然后俩情况都去label0035

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/132.png" alt="" style="max-width: 80%; height: auto;">

label0035判断钱数量是否达标，如果不达标就去0079

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/133.png" alt="" style="max-width: 80%; height: auto;">

然后这是如果不跳转的话的继续执行

相当于

```csharp
targetScoreGo.SetActive(true);

Find find = UnityEngine.Object.FindObjectOfType<Find>();

if (find != null)
{
    find.SYC();
    return;
}
```

查找find组件所在对象，找到了调用SYC函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/134.png" alt="" style="max-width: 80%; height: auto;">

结合运行界面，这里直接去看SYC

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/135.png" alt="" style="max-width: 80%; height: auto;">

在SYC的0044里写出字符

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/136.png" alt="" style="max-width: 80%; height: auto;">

写出的V0源于L0

L0源于后面这一坨字符

有几种解法找字符串

##### 2.1 第一种是纯手工不开调试解：
搜索一下就会发现，这个字符串并不在这个文件里面

```csharp
import os

directory = 'D:\\__Work_Station\\_Codex\\ctf\\玩就行了\\玩就行了_BackUpThisFolder_ButDontShipItWithYourGame\\il2cppOutput'
target = "tringLiteral71443AC7CF5CC108984A138188DE915E32441BB2"

"""在目录中搜索包含目标字符串的文件"""
for root, dirs, files in os.walk(directory):
    for filename in files:
        filepath = os.path.join(root, filename)

        with open(filepath, 'r', encoding='utf-8') as f:
            if target in f.read():
                print(filepath)
```

那么去搜索了一下

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/137.png" alt="" style="max-width: 80%; height: auto;">

除了那个1之外，Assembly-CSharp是目前在看的文件

去剩下俩看看

mscorlib__16.cpp这里也没有是啥，只有引用

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/138.png" alt="" style="max-width: 80%; height: auto;">

Il2CppMetadataUsage.c找到了2684363953，也就是0xA00024B1，显然这不应该是字符串真正的内容

这里这个值是该变量初始化前的编号

/玩就行了_Data/il2cpp_data/Metadata/global-metadata.dat

去这个文件里面找（其实就是找global-metadata.dat这个文件，可以使用命令行或python直接搜）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/139.png" alt="" style="max-width: 80%; height: auto;">

根据unity对字符串的解码规则（如上图，这是我unity的editor，版本2022.3.59f1c1，里面就写了怎么解）  
0xA00024B1解得值为0x1258也就是4696，也就是说找下标为4696的记录

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/140.png" alt="" style="max-width: 80%; height: auto;">

开头字段分别对应如下规则：

文件偏移    字段

0x00       文件标识

0x04       版本号

0x08       字符串索引表的位置

0x0C       字符串索引表的大小

0x10       字符串文本数据区的位置

0x14       字符串文本数据区的大小

按照小端存储

字符串表位置在0x100的位置

数据区位置在0xB0B0的位置

所以该字符串索引应该是0x100 + 4696 * 8 = 0x93C0

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/141.png" alt="" style="max-width: 80%; height: auto;">

小段解释分别是6和37 03 02，也就是说，长度是6，相对偏移0x20337

那么其位置就是 0xB0B0 + 0x20337 = 0x2B3E7

得到

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/142.png" alt="" style="max-width: 80%; height: auto;">

output

然后去找 \玩就行了\玩就行了_Data\resources.assets

我这里用的是assetstudio

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/143.png" alt="" style="max-width: 80%; height: auto;">

欸会发现其实只有一个字符串在里面（）就是output

##### 2.2 第二种，伟大的DnSpy：
把\玩就行了\玩就行了_BackUpThisFolder_ButDontShipItWithYourGame\Managed\Assembly-CSharp.dll扔给DnSpy

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/144.png" alt="" style="max-width: 80%; height: auto;">

找到Find类，去看SYC函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/145.png" alt="" style="max-width: 80%; height: auto;">

好了直接告诉你了

然后去找output就行了

##### 3 回到ida
右边不知道是啥可以放到SRK里看看

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/146.png" alt="" style="max-width: 80%; height: auto;">

欸那要怀疑一下是不是程序了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/147.png" alt="" style="max-width: 80%; height: auto;">

得到文件，扔给ida

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/148.png" alt="" style="max-width: 80%; height: auto;">

非常清晰的main啊（）

依次进三个函数看看

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/149.png" alt="" style="max-width: 80%; height: auto;">

以防忘记（）

97是a，122是z，65是A，90是Z，48是0，57是9 

也就是说这里是凯赛位移，移位a2也就是20

比方说数字：(a2 + v3 - 48) % 10 + 48，就是说，先把这个数加上偏移20，然后减去48，这样就得到了这个数在数字中偏移后的具体位置，再模10防止移出去，+48再把ASCII移回数字区间

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/150.png" alt="" style="max-width: 80%; height: auto;">

用a2也就是GEEK作为密钥循环异或上个函数处理完的字符串

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/151.png" alt="" style="max-width: 80%; height: auto;">

结合下面大概能猜出来这里是做了什么处理把Str存到&v4[5]的位置，也就是说这里一个是输入一个是输出

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/152.png" alt="" style="max-width: 80%; height: auto;">

这里能看出来，还是逐字符处理，但是存入v4是每次存入2长度而非1长度

懒得看函数了直接开调试，然后就能发现（要复现的话，输入值123456789012345678901234567890）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/153.png" alt="" style="max-width: 80%; height: auto;">

纯粹就是把上面俩函数处理完的结果转化成16进制字符输出出去

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/154.png" alt="" style="max-width: 80%; height: auto;">

0A161230300C2D0A2B303D2428233005242C2D26182206233E097F133A

目标字符串

那开逆吧

```plain
cipher = bytes.fromhex("0A161230300C2D0A2B303D2428233005242C2D26182206233E097F133A")

key = b"GEEK"

result = bytes(x ^ key[i % len(key)] for i, x in enumerate(cipher))

print(result)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/155.png" alt="" style="max-width: 80%; height: auto;">

MSW{wIhAluxoofuNcihm_gChyL:X}

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/156.png" alt="" style="max-width: 80%; height: auto;">

### 05 影影措措
#### 题目
找flag

<a href="/Download/WpCTF/Practice/Plus/202641/Reverse/影影措措.exe" download>
    文件
</a>

#### 答案
flag{esgyh5-wcjki2-qh4e1i-orn2w-s4v3ue}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/157.png" alt="" style="max-width: 80%; height: auto;">

去check看看吧

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/158.png" alt="" style="max-width: 80%; height: auto;">

？连异或都没有？

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Practice/Plus/202641/Reverse/159.png" alt="" style="max-width: 80%; height: auto;">

送分题						

