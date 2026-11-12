---
title: Reverse - Week2
status: published
pubDate: 2026-10-31
type: Reverse
tags:
- algorithm-reverse
- dynamic-analysis
- brute-force
- black-box-analysis
- prng
- sudoku
- python
- pyinstaller
- bytecode
- base64
- custom-base64
- obfuscation
- anti-disassembly
- binary-patching
- unpacking
- xor
- tea
- android
- jni
- frida
- hooking
- aes
- cbc
- ida
- x64dbg
---
 - 2026.10.31 finished
### 01 这是一个二游五灵王的陷阱
#### 题目
时 从不讲道理


<a href="/Download/WpCTF/Comp/Que26/Re/challenge-genshin.exe" download>
    文件
</a>

#### 答案
flag{miao_final_wish_destiny_C6}

#### 过程
伊斯塔露的大手还在发力（）

我也能十几抽就出金吗QAQ

main函数是个选择题，里面看不到怎么判定成功的，那么找字符串

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/1.png" alt="" style="max-width: 80%; height: auto;">

判定这里应该是成功，按x找引用

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/2.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/3.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/4.png" alt="" style="max-width: 80%; height: auto;">

也就是说是在抽卡那里判断的

被判断的值是a1偏移12地址对应的值，a1是从main一路传下来的，源于main的v5

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/5.png" alt="" style="max-width: 80%; height: auto;">

v5是rsp+0x40，那也就意味着result需要找的是rsp+0x4C，也就是v5[3]，要让第三个值等于7才行

那么就去追踪v5[3]怎么改变的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/6.png" alt="" style="max-width: 80%; height: auto;">

给0x60FE3C也就是v5[3]打断点

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/7.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/8.png" alt="" style="max-width: 80%; height: auto;">

第一处触发位于401F43，初始化写入

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/9.png" alt="" style="max-width: 80%; height: auto;">

第二次触发是读取，如果大于0返回 - 1的值，否则返回0

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/10.png" alt="" style="max-width: 80%; height: auto;">

（原来这个地方是存命座啊，那看来其实就是要100抽抽出来7只了（））

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/11.png" alt="" style="max-width: 80%; height: auto;">

如果抽出来了这里就会对v5[3]自增一，但是不超过7

然后看result == 7后怎么输出的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/12.png" alt="" style="max-width: 80%; height: auto;">

还需要追踪0x60FE34也就是v5[1]

追踪发现，4选项修改时间和每次抽卡出金（A golden star descends: Miao!）都会触发对其的修改

修改时间的位置是401CF6

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/13.png" alt="" style="max-width: 80%; height: auto;">

sub_4022F8将sub_4022C0(*a1)的值存入了全局变量dword_408030中去

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/14.png" alt="" style="max-width: 80%; height: auto;">

401CF6的a1源于设置的时间

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/15.png" alt="" style="max-width: 80%; height: auto;">

抽卡位置具体触发位置是函数401D54

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/16.png" alt="" style="max-width: 80%; height: auto;">

a1依旧是v5，出去看a2来源

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/17.png" alt="" style="max-width: 80%; height: auto;">

源于HIDWORD(v3)，源于函数sub_40230B

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/18.png" alt="" style="max-width: 80%; height: auto;">

XOR随机数生成器，dword_408030来源已说明

也就是说，这就是个依靠精度为秒的随机数种子的随机抽卡，时间范围只有一天，情况只有86400种可能，那直接枚举爆破就行了

黑盒启动

```python
import subprocess
from pathlib import Path


base = Path(__file__).resolve().parent
exe = base / "challenge.exe"

for seconds in range(86400):
    hour = seconds // 3600
    minute = seconds // 60 % 60
    second = seconds % 60
    time_text = f"{hour:02d}:{minute:02d}:{second:02d}"

    # 4：设置时间；2：十连（100 抽共十次）；5：退出。
    commands = f"4\n{time_text}\n" + "2\n" * 10 + "5\n"

    # 每次 run 都启动全新的进程，互不继承抽卡状态。
    process = subprocess.run(
        [str(exe)],
        input=commands.encode("ascii"),
        cwd=base,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        timeout=30,
        check=False,
    )

    if process.returncode != 0:
        print(process.stdout.decode("utf-8", errors="replace"))
        raise RuntimeError(f"崩了：{process.returncode}，t：{time_text}")

    if b"Correct!" in process.stdout:
        print(f"\nt：{time_text} UTC", flush=True)
        output_file = base / "output.txt"
        output_file.write_bytes(process.stdout)
        print(process.stdout.split(b"Correct!", 1)[1].decode("utf-8", errors="replace"))
        break

    if seconds % 100 == 0:
        print(f"{seconds + 1} now:{time_text}", flush=True)
else:
    print("无Correct!")

```

我这里没写异步并发

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/19.png" alt="" style="max-width: 80%; height: auto;">

### 02 Mathgame
#### 题目
跑起来 跑起来


<a href="/Download/WpCTF/Comp/Que26/Re/sudu8.exe" download>
    文件
</a>

#### 答案
flag{1234567856781234234567816781234534567812781234564567812381234567}

#### 过程
苦也，这也言雪峰（）

上面的example很好的说明了要干啥，就是做数独

每行、每列、每个2 * 4，1 - 8有且仅能出现一次

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/20.png" alt="" style="max-width: 80%; height: auto;">

比较对象v6和v4，v6写死，但是看不到此时已被加密，v4是用户输入值

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/21.png" alt="" style="max-width: 80%; height: auto;">

将输入值转化为ascii码对应的值（"1" -> 1），同时把输入逐字符拆成数组

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/22.png" alt="" style="max-width: 80%; height: auto;">

比较处也没有任何加密

那直接开debug拿v6吧

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/23.png" alt="" style="max-width: 80%; height: auto;">

rsp+0x1A0直接定位出来

```plain
0 0 0 4 0 6 7 0
5 6 7 0 1 2 0 0
0 0 0 5 0 7 8 1
6 0 8 1 0 0 4 0
0 0 5 6 7 0 0 2
0 0 0 2 3 4 5 0
4 5 6 0 0 0 2 0
8 0 0 3 4 5 0 0
```

得出解

```plain
1 2 3 4 5 6 7 8
5 6 7 8 1 2 3 4
2 3 4 5 6 7 8 1
6 7 8 1 2 3 4 5
3 4 5 6 7 8 1 2
7 8 1 2 3 4 5 6
4 5 6 7 8 1 2 3
8 1 2 3 4 5 6 7
```

即

1234567856781234234567816781234534567812781234564567812381234567

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/24.jpg" alt="" style="max-width: 80%; height: auto;">

（坚持手搓这块（））

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/25.png" alt="" style="max-width: 80%; height: auto;">

### 03 PangbaiOfficial
#### 题目
PangBai酱不希望别人能随意使用自己的python环境


<a href="/Download/WpCTF/Comp/Que26/Re/main.exe" download>
    文件
</a>

#### 答案
flag{happy?c7f_happy_r3verse_happy_game}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/26.png" alt="" style="max-width: 80%; height: auto;">

初见端倪，又给我来这套（恼）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/27.png" alt="" style="max-width: 80%; height: auto;">

好了那没事了这是个启动器，需要先把exe解包

```bash
python pyinstxtractor.py main.exe
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/28.png" alt="" style="max-width: 80%; height: auto;">

然后拆main.pyc

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/29.png" alt="" style="max-width: 80%; height: auto;">

尝试解一下就会发现，根本不对，KEY第一次base64解码完就已经不是base64了

我先前怀疑的是是不是跟花指令一样解出来有问题

```bash
pycdas "main.pyc" -o "main_dis.txt"
```

看了眼汇编，确实没问题

```plain
main.pyc (Python 3.11)
[Code]
    File Name: main.py
    Object Name: <module>
    Qualified Name: <module>
    Arg Count: 0
    Pos Only Arg Count: 0
    KW Only Arg Count: 0
    Stack Size: 2
    Flags: 0x00000000
    [Names]
        'base64'
        'KEY'
        'main'
        '__name__'
    [Locals+Names]
    [Constants]
        0
        None
        b'ECeCKJ4bHwkLnW8Nbt4KTpMZENkwQNxN9UcFcOMlmULrnU31EzwKQ887EKxatQH/mtu+EOIz/Kp='
        [Code]
            File Name: main.py
            Object Name: main
            Qualified Name: main
            Arg Count: 0
            Pos Only Arg Count: 0
            KW Only Arg Count: 0
            Stack Size: 3
            Flags: 0x00000003 (CO_OPTIMIZED | CO_NEWLOCALS)
            [Names]
                'input'
                'encode'
                'base64'
                'b64encode'
                'KEY'
                'print'
            [Locals+Names]
                'user_input'
                'encrypted'
            [Constants]
                None
                'Input the flag: '
                'Correct!'
                'Wrong!'
            [Disassembly]
                0       RESUME                          0
                2       LOAD_GLOBAL                     1: NULL + input
                14      LOAD_CONST                      1: 'Input the flag: '
                16      PRECALL                         1
                20      CALL                            1
                30      LOAD_METHOD                     1: encode
                52      PRECALL                         0
                56      CALL                            0
                66      STORE_FAST                      0: user_input
                68      LOAD_GLOBAL                     5: NULL + base64
                80      LOAD_ATTR                       3: b64encode
                90      LOAD_FAST                       0: user_input
                92      PRECALL                         1
                96      CALL                            1
                106     STORE_FAST                      1: encrypted
                108     LOAD_GLOBAL                     5: NULL + base64
                120     LOAD_ATTR                       3: b64encode
                130     LOAD_FAST                       1: encrypted
                132     PRECALL                         1
                136     CALL                            1
                146     STORE_FAST                      1: encrypted
                148     LOAD_FAST                       1: encrypted
                150     LOAD_GLOBAL                     8: KEY
                162     COMPARE_OP                      2 (==)
                168     POP_JUMP_FORWARD_IF_FALSE       17 (to 204)
                170     LOAD_GLOBAL                     11: NULL + print
                182     LOAD_CONST                      2: 'Correct!'
                184     PRECALL                         1
                188     CALL                            1
                198     POP_TOP                         
                200     LOAD_CONST                      0: None
                202     RETURN_VALUE                    
                204     LOAD_GLOBAL                     11: NULL + print
                216     LOAD_CONST                      3: 'Wrong!'
                218     PRECALL                         1
                222     CALL                            1
                232     POP_TOP                         
                234     LOAD_CONST                      0: None
                236     RETURN_VALUE                    
            [Exception Table]
        '__main__'
    [Disassembly]
        0       RESUME                          0
        2       LOAD_CONST                      0: 0
        4       LOAD_CONST                      1: None
        6       IMPORT_NAME                     0: base64
        8       STORE_NAME                      0: base64
        10      LOAD_CONST                      2: b'ECeCKJ4bHwkLnW8Nbt4KTpMZENkwQNxN9UcFcOMlmULrnU31EzwKQ887EKxatQH/mtu+EOIz/Kp='
        12      STORE_NAME                      1: KEY
        14      LOAD_CONST                      3: <CODE> main
        16      MAKE_FUNCTION                   0
        18      STORE_NAME                      2: main
        20      LOAD_NAME                       3: __name__
        22      LOAD_CONST                      4: '__main__'
        24      COMPARE_OP                      2 (==)
        30      POP_JUMP_FORWARD_IF_FALSE       12 (to 56)
        32      PUSH_NULL                       
        34      LOAD_NAME                       2: main
        36      PRECALL                         0
        40      CALL                            0
        50      POP_TOP                         
        52      LOAD_CONST                      1: None
        54      RETURN_VALUE                    
        56      LOAD_CONST                      1: None
        58      RETURN_VALUE                    
    [Exception Table]
```

那么剩下的可能就是base64被改了，不再是原先的base64了而是自定义的

找base64或名称类似的pyc

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/30.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/31.png" alt="" style="max-width: 80%; height: auto;">

对的被篡改了

然后用被改过的表解就行了

```python
KEY = b'ECeCKJ4bHwkLnW8Nbt4KTpMZENkwQNxN9UcFcOMlmULrnU31EzwKQ887EKxatQH/mtu+EOIz/Kp='
_CUSTOM_TABLE = b'6iZ1UwWGeLdRnHb/5gmKtQJ0IkETxc9vYMAo8j2OVuFrq4Dl73hCpzBNfa+yXSPs'
_STANDARD_TABLE = b'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'

import binascii

reverse = bytes.maketrans(_CUSTOM_TABLE, _STANDARD_TABLE)

def decode_once(data):
    return binascii.a2b_base64(data.translate(reverse))

result = decode_once(decode_once(KEY))
print(result)
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/32.png" alt="" style="max-width: 80%; height: auto;">

### 04 何为百合啊？
#### 题目
hey？量产的花咋办？


<a href="/Download/WpCTF/Comp/Que26/Re/challenge-lilies.exe" download>
    文件
</a>

#### 提示
可以先学一学如何去除花指令，尝试去除一些。最后想想有没有其他办法呢？

另外 我在10.11曾更新过附件 当时发过通知 没看到的选手记得重新下载


#### 答案
flag{tw1n_catgirls_flower_b1oom}

#### 过程
<!-- 这是一张图片，ocr 内容为：HEX VIEW-1 PSEUDOCODE-A IDA VIEW-A CHAR **ARGV, CONST CHAR **ENVP) _FASTCALL MAIN(INT ARGC, INT 1234567 C, CONST 1 INT V3;// EAX CONST CHAR *V4; // RCX CHAR V6[256]; // [RSP+20H] [RBP-118H] BYREF SUB_140001440((INT)"INPUT YOUR FLAG:\N", ARGV, ENVP); 8 IF ( (UNSIGNED INT)SUB_1400014A0("%255S", V6) 1 ) } V3 - (( _FASTCALL *)(CHAR *))LOC_140001000)(V6); INT64 10 "CORRECT!\N"; V4 三 11 IF ( !V3 12 V4 "WRONG!\N"; 13 140001440() 14 SUB -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/33.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：TEXT:000000014000100A [RSP+OBOH],RCX MOY TEXT:0000000140001012 EAX, EAX XOR TEXT:0000000140001014 TEST EAX, EAX JZ PTR LOC 140001018+3 TEXT:0000000140001016 SHORT NEAR TEXT:0000000140001018 CODE XREF:.TEXT:000000001400010161J .TEXT:0000000140001018 10C 1400018: 141E8A0D1H TEXT:0000000140001018 PTR CAL1 NEAR TEXT:0000000140001018 DB 3 DUP(0) TEXT:000000014000101D TEXT:0000000140001020 TEXT:0000000014001020 SUBROUTTNF -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/34.png" alt="" style="max-width: 80%; height: auto;">

第一处花

test eax eax恒为0

因此jz一定跳转，跳转位置是140001018+3的位置，也就是说下面那个

<!-- 这是一张图片，ocr 内容为：TEXT:0000000140001018 CODE XREF: .TEXT:00000000140001016个J .TEXT:0000000140001018 10C 1400018: 141E8A0D1H .TEXT:0000000140001018 CAL1 NEAR PTR TEXT:0000000140001018 .TEXT:000000014000 PATCH BYTES TEXT:00000001400 TEXT:000000001400 ADDRESS 0X140001018 TEXT:00000001400 0X418 FILE OFFSET TEXT:000000014002 TEXT:000000014006 E8 B4 90 E8 01 00 00 00 B8 83 04 04 04 C3 E8 B4 ORIGINAL VALUE TEXT:000000014006 E8 B4 90 E8 01 00 00 00 B8 83 04 24 0A C3 E8 B4 VALUES TEXT:000000014006 TEXT:00000001400 HELP CANCEL OK TEXT:00000001400 TEXT:0000000140001027 DW 0B4E8H TEXT:00000000140001026 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/35.png" alt="" style="max-width: 80%; height: auto;">

E8 B4 90三个字节被跳过了

解决方式直接nop掉（全部改成90），包括jz的俩字节也nop掉

<!-- 这是一张图片，ocr 内容为：PSEUDOCODE-A LOCAL TYPES HEX VIEW-1 IDA VIEW-A **ENVP) 123 1 MAIN(INT ARGC, CONST CHAR **ARGV, CONST CHAR INT _FASTCALL MAI INT V3;// EAX CONST CHAR *V4; // RCX 4 5 CHAR V6[256]; // [RSP+20H] [RBP-118H] BYREF 6789 SUB_140001440((INT)"INPUT YOUR FLAG:\N", ARGV, ENVP); IF ( (UNSIGNED INT)SUB_1400014A0("%255", V6) --- 1 ) 丁 V3 : SUB_140001000(V6); 10 "CORRECT!\N"; 11 V4 IF !V3 12 V4 - "WRONG!\N"; 13 SUB_140001440(INT)V4); 14 15 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/36.png" alt="" style="max-width: 80%; height: auto;">

重新F5就正常了

sub_7FF6E1321440大概率是打印字符串的，三处调用传入的参数都是给我们看的字符串

<!-- 这是一张图片，ocr 内容为：6789 IT)"INPUT YOUR FLAG:\N", ARGV, ENVP); SUB_7FF6E1321440((INT)"  IF (UNSIGNED I _7FF6E13214A0("%255S", V6) 三: 1 ) D INT)SUB. J  V3 : SUB_7FF6E1321000(V6); 10 CHAR V6[256]; // [RSP+20H] [RBP-118H] BYREF  V4 - CORRECT!\N"; 11 "12345678901234567890" IF ( !V3 ) 12 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/37.png" alt="" style="max-width: 80%; height: auto;">

sub_7FF6E13214A0是scanf

那也就是说真正的判断只有sub_7FF6E1321000

<!-- 这是一张图片，ocr 内容为：PSEUDOCODE-A HE IDA VIEW-A SUB_7FF6E1321000() INT64 123 ((VOID(*)(VOID))(CHAR 1))(); *)&SUB_7FF6E1321020 RETURN SUB_7FF6E1321020(); -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/38.png" alt="" style="max-width: 80%; height: auto;">

上面那个函数调用的是sub_7FF6E1321020地址+1的函数而并非sub_7FF6E1321020

去汇编看

<!-- 这是一张图片，ocr 内容为：TEXT:00007FF6E1321019 NOP .TEXT:0007FF6E132101A NOP TEXT:00007FF6E132101B .TEXT:0007FF6E132101B LOC_7FF6E132101B: ; CODE XREF: SUB_7FF6E1321000+16个J CALL .TEXT:0007FF6E132101B SUB 7FF6E1321020+1 NEAR PTR SUB_7FF6E1321000 ENDP ; .TEXT:00007FF6E132101B SP-ANALYSIS FAILED .TEXT:00007FF6E132101B TEXT:00007FF6E1321020 SUBROUTINE TEXT:00007FF6E1321020 TEXT:00007FF6E1321020 TEXT:00007FF6E1321020 INT64 SUB 7FF6E1321020( .TEXT:0007FF6E1321020 CODE XREF: SUB_7FF6E1321000:LOC_7FF6E132101B1P SUB_7FF6E1321020 PROC NEAR TEXT:00007FF6E1321020 EAX,0A240483H TEXT:00007FF6E1321020 MOV RETN .TEXT:00007FF6E1321025 SUB 7FF6E1321020 ENDP .TEXT:00007FF6E1321025 ,TEXT:0007FF6E1321025 TEXT:00007FF6E1321025 DW0B4E8H TEXT:00007FF6E1321026 DB 2 DUP(90H) ,TEXT:00007FF6E1321028 DW 0C031H, 0C085H, 374H .TEXT:0007FF6E132102A -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/39.png" alt="" style="max-width: 80%; height: auto;">

call return

而且是从 1021 开始的计算

U取消编译，然后C从1021开始反编译到1025，可以看到这块在干啥

<!-- 这是一张图片，ocr 内容为：SUBROUTINE TEXT:00007FF6E1321021 TEXT:00007FF6E1321021 TEXT:00007FF6E1321021 CODE XREF: SUB_7FF6E1321000:LOC_7FF6E132101B个P .TEXT:00007FF6E1321021 SUB 7FF6E1321021 PROC NEAR [RSP+0], OAH DWORD PTR TEXT:00007FF6E1321021 ADD RETN TEXT:00007FF6E1321025 .TEXT:0007FF6E1321025 SUB 7FF6E1321021 ENDP ,TEXT:00007FF6E1321025 TEXT:00007FF6E1321025 DW 0B4E8H .TEXT:00007FF6E1321026 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/40.png" alt="" style="max-width: 80%; height: auto;">

往[rsp]也就是返回地址处add了0x0A也就是10，也就是说这里return后返回的不是101C的位置而是102A

解决方案是把 00007FF6E132101B 到 00007FF6E1321029 全部nop掉，一共15个

<!-- 这是一张图片，ocr 内容为：RETN B PATCH BYTES ADDRESS 0X7FF6E132101B 0X41B FILE OFFSET E8 01 00 00 00 B8 83 04 0A C3 E8 B4 90 90 31 ORIGINAL VALUE VALUES 909090909090909090909090909090 HELP OK CANCEL QQBAE8037ACA85CQH 483R800000001EGH 31QQQQRAE8C3QA24H -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/41.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：TEXT:00007FF6E1321027 NOP TEXT:00007FF6E1321028 NOP .TEXT:0007FF6E1321029 NOP .TEXT:0007FF6E132102A EAX, EAX XOR TEST TEXT:00007FF6E132102C EAX, EAX SHORT NEAR PTR LOC_7FF6E1321030+3 JZ .TEXT:0007FF6E132102E .TEXT:0007FF6E1321030 CODE XREF: .TEXT:0007FF6E132102E1J .TEXT:00007FF6E1321030 10C 7FF6E1321030: 7FF6A163A0E9H TEXT:00007FF6E1321030 CA11 PTR NEAR TEST EAX, EAX .TEXT:00007FF6E1321035 JZ TEXT:00007FF6E1321037 SHORT NEAR PTR LOC_7FF6E1321039+3 .TEXT:0007FF6E1321039 ; CODE XREF: .TEXT:0007FF6E13210371J LOC7FF6E1321039: .TEXT:0007FF6E1321039 1 7FF66E7AA0F2H CALL .TEXT:0007FF6E1321039 NEAR PTR EAX,1C2FDH .TEXT:0007FF6E132103E OR XOR EAX, EAX .TEXT:0007FF6E1321043 TEST TEXT:00007FF6E1321045 EAX, EAX JZ SHORT NEAR PTR LOC 7FF6E1321049+3 TEXT:00007FF6E1321047 .TEXT:0007FF6E1321049 CODE XREF: .TEXT:00007FF6E13210471J .TEXT:00007FF6E1321049 10C_7FF6E1321049: 7FF6A163A102H .TEXT:0007FF6E1321049 CA11 PTR NEAR .TEXT:0007FF6E132104E EAX TEST EAX, SHORT NEAR AR PTR LOC_7FF6E1321052+3 JZ TEXT:00007FF6E1321050 TEXT:00007FF6E1321052 .TEXT:00007FF6E1321052 10C 7FF6E1321052: TEXT:00007FF6E13210501J CODE XREF: 7FF66E7AA10BH CAL1 .TEXT:0007FF6E1321052 NEAR PTR PUSH TEXT:00007FF6E1321057 RSP AL,60H .TEXT:0007FF6E1321058 AND LOC7FF6E1321060 .TEXT:00007FF6E132105A CA11 TEXT:00007FF6E132105A DB 0B8H TEXT:00007FF6E132105F TEXT:00007FF6E1321060 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/42.png" alt="" style="max-width: 80%; height: auto;">

然后4个连续的jz jnz（这里是test jz）

102C - 1032、1035 - 103B、1045 - 104B、104E - 1054全部nop

<!-- 这是一张图片，ocr 内容为：TEXT:00007FF6E1321054 NOP RDX, [RSP+60H] LEA TEXT:00007FF6E1321055 CALL TEXT:00007FF6E132105A LOC7FF6E1321060 TEXT:00007FF6E132105A DB OB8H TEXT:00007FF6E132105F TEXT:00007FF6E1321060 TEXT:00007FF6E1321060 ; CODE XREF: .TEXT:0007FF6E132105A1J .TEXT:00007FF6E1321060 10C 7FF6E1321060: DWORD PTR [RSP], OAH TEXT:00007FF6E1321060 ADD TEXT:00007FF6E1321064 RETN TEXT:00007FF6E1321064 DB OE8H TEXT:00007FF6E1321065 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/43.png" alt="" style="max-width: 80%; height: auto;">

下面一处jz jnz（这里test jz），

<!-- 这是一张图片，ocr 内容为：TEXT:00007FF6E1321069 EAX,EAX XOR TEST .TEXT:0007FF6E132106B EAX, EAX SHORT NEAR PTR LOC 7FF6E132106F+3 JZ .TEXT:00007FF6E132106D .TEXT:00007FF6E132106F CODE XREF: .TEXT:0007FF6E132106D1J .TEXT:00007FF6E132106F LOC 7FF6E132106F: 7FF75B1AA128H .TEXT:0007FF6E132106F CA11 NEAR PTR .TEXT:00007FF6E1321074 AL,0 ADD TEXT:00007FF6E1321076 AL, CH ADD ADD TEXT:00007FF6E1321078 [RAX], EAX .TEXT:0007FF6E1321078 0000 TEXT:00007FF6E132107A 0 O TEXT:00007FF6E132107B 0B8H TEXT:00007FF6E132107C -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/44.png" alt="" style="max-width: 80%; height: auto;">nop 106B - 1071

<!-- 这是一张图片，ocr 内容为：MOP TEXT:00007FF6E1321071 NOP 7FF6E13214F0 CA11 TEXT:00007FF6E1321072 SUB 7FF6E132107D 10C TEXT:00007FF6E1321077 CA11 TEXT:00007FF6E1321077 DB OB8H ,TEXT:0007FF6E132107C TEXT:00007FF6E132107D TEXT:00007FF6E132107D CODE XREF: .TEXT:0007FF6E13210771J TEXT:00007FF6E132107D 7FF6E132107D: LOC DWORD PTR [RSP], OAH TEXT:00007FF6E132107D ADD RETN TEXT:00007FF6E1321081 TEXT:00007FF6E1321081 DW 0B4E8H, 9090H, 0F883H .TEXT:00007FF6E1321082 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/45.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：[RCX], DH ADD TEXT:00007FF6E132108E RO1 BYTE PTR [RBP-17FC8B40H],OB4H TEXT:00007FF6E1321090 TEXT:00007FF6E1321097 NOP LOC 7FF6E132109E CALL .TEXT:00007FF6E1321098 TEXT:00007FF6E1321098 0B8H QP ,TEXT:00007FF6E132109D TEXT:00007FF6E132109E TEXT:00007FF6E132109E S CODE XREF: .TEXT:0007FF6E1321098个J LOC 7FF6E132109E: TEXT:00007FF6E132109E DWORD PTR [RSP], OAH ADD .TEXT:00007FF6E132109E TEXT:00007FF6E13210A2 RETN TEXT:00007FF6E13210A2 , OB4H, 2 DUP(90H), 31H DB OE8H,O ,TEXT:00007FF6E13210A3 R00274500ESOH OPAEOA27ACAOESA21H TAVT.QQAQ7F6612210A8 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/46.png" alt="" style="max-width: 80%; height: auto;">

又是两处call return，1077 - 108515个nop；1098 - 10A615个nop

总之后续基本上就是维持这样的操作，如果某次后续没出现东西就按C重新编译一下即可，如果还没出来就找E8按C重新编译

反正总共大约20几个call return，30几个jz jnz

<!-- 这是一张图片，ocr 内容为：用时30秒 的可执行代码区: 我扫描了原始 CHALLENGE-LIES.EXE 数量 花指令类型 25处 CALL修改返回地址 RET 35处 XOR EAX,EAX TEST JZ JZ 2 / 垃圾字节 60处 合计 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/47.png" alt="" style="max-width: 80%; height: auto;">

然后自1000开始到138F，按U全部取消编译

重新回到1000按C编译，然后按P定义函数

<!-- 这是一张图片，ocr 内容为：TEXT:00000/FF613Z10066 .TEXT:0007FF6E1321000 CODE XREF: MAIN+49LP SUB 7FF6E1321000 TEXT:00007FF6E1321000 PROC NEAR TEXT:00007FF6E1321000 BYTE PTR -OA8H TEXT:00007FF6E1321000 BUF1 - BYTE PTR -68H BUF2 TEXT:00007FF6E1321000  ; DWORD PTR -28H .TEXT:0007FF6E1321000 VAR 28 PTR -24H 三 TEXT:00007FF6E1321000 VAR 24 DWORD VAR 20 DWORD PTR -20H .TEXT:0007FF6E1321000 二 VAR 1C PTR -1CH 三 DWORD TEXT:00007FF6E1321000 - 18H PTR SRC .TEXT:00007FF6E1321000 QWORD .TEXT:0007FF6E1321000 RBX TEXT:00007FF6E1321000 PUSH R12 PUSH ,TEXT:0007FF6E1321001 SUB RSP,OB8H TEXT:00007FF6E1321003 [RSP+0C8H+SRC],RCX MOV ,TEXT:00007FF6E132100A .TEXT:00007FF6E1321012 XOR EAX, EAX TEST EAX, EAX .TEXT:00007FF6E1321014 NOP .TEXT:00007FF6E1321016 ,TEXT:00007FF6E1321017 NOP NOP ,TEXT:00007FF6E1321018 NOP ,TEXT:0007FF6E1321019 ,TEXT:0007FF6E132101A NOP .TEXT:00007FF6E132101B NOP TEXT:00007FF6E132101C NOP .TEXT:00007FF6E132101D NOP NAN 00400 0000755661321000 7FF6E132100 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/48.png" alt="" style="max-width: 80%; height: auto;">

函数复活（）

<!-- 这是一张图片，ocr 内容为：圆 PSEUDOCODE-A LOCAL TYPES IDA VIEW-A HEX VIEW-1 B00L8 FASTCALL SUB_7FF6E1321000(VOID *A1) 1234561 BYTE*V1;/// RBX INT V2;// R12D BYTE BUF1[64]; // [RSP+20H] [RBP-A8H] BYREF BYTE BUF2[64]; // [RSP+60H] [RBP-68H] BYREF 7 DWORD V6[4]; // [RSP+AOH] [RBP-28H] BYREF VOID *SRC; // [RSP+BOH] [RBP-18H] 8 9 SRC A1; 10 IF (UNSIGNED INT IED INT)SUB-7FF6E13214F0("CMT32POD5GRPLYPQYRG8MQGNWGGNW9PVNOCJHAP2WZNXBWEN", BUF2) 1- 32) 11 RETURN O; 12 V6[0]三167734099; 13 V6[1]858993459; 14 V6[2] -324508640; 15 V6[3]808468481; 16 MEMCPY(BUF1, SRC, OX20U); 17 V1 BUF1; 18 19 V2 4 20 OP L 21 22 SUB_7FF6E1321670(V1, V6); 23 V1+8; --V2; 24 25 WHILE( V2 ); 26 RETURN !MEMCMP(BUF1, BUF2, 0X20U); 27 28J -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/49.png" alt="" style="max-width: 80%; height: auto;">

现在正常了

注意到其最终比较对象是Buf1和Buf2，而在函数中并没有对Buf1进行赋值，Buf1的地址是rsp+0x20

而main中的v6也是rsp+0x20（见上文），因此Buf1这里指代的就是v6，也就是函数中传入的a1

比较对象是Buf2

通过debug能直接取出来值

<!-- 这是一张图片，ocr 内容为：RCX EA9CA146B571000 RDX FFFFFFFFFFFFFFFF 2WZNXBWEN", BUF2) 32 RSI0000000000000000 1 BYREF A2: CHAR BUF2[64]; // [RSP+60H] [RBP-68H] E PATH -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/50.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：HEX VIEW-1 ]X.P 50 58 FD 50 5B A2 00 00 60 5B FD 00 00000A25B50FD20 A2 00 00 91 A8 F3 CC AD 8A 1D CA 00000A25B50FD30 B5 1B 9C C6 86 29 98元 3A ~F. 7E C5 FF 41 9D 7B 00000A25B50FD40 46 B9 91 AE D9元 09 C3 D6 62 DO 7F 16 F6 00 80 000000A25B50FD50 00 00 00 AA 00 00 00 00 00 00 80元 000000A25B50FD60 02 7F F6 16 00 84 00 A9 00 D3 00 00 00 00 00 00 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/51.png" alt="" style="max-width: 80%; height: auto;">

```python
target = bytes.fromhex(
    "A8 AD 9C 3A 86 8A 1B 98 C6 CC 91 F3 CA 1D 29 B5 "
    "7E 46 91 09 9D 62 FF 7B D0 41 C5 D6 AE B9 D9 C3"
)
```

然后下面

<!-- 这是一张图片，ocr 内容为：-324508640; [719A 15 ]808468468481; V6[3] 16  MEMCPY(BUF1, SRC, 0X20U); 17 )BUF1;  V1 - (UNSIGNED INT 18 V2 川 19 DO 20 21 SUB_7FF616A81670(V1, (_INT64)V6); 22 +三 2; 23 V1 24 25 ( V2 ); WHILE 26 RETURN !MEMCMP(BUF1, BUF2, OX20U); 27 28 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/52.png" alt="" style="max-width: 80%; height: auto;">

每8字节一组扔到sub_7FF616A81670处理，一共处理4轮，也就是说flag大小是32字节

sub_7FF616A81670看着很复杂，其实就是tea

<!-- 这是一张图片，ocr 内容为：LODWORD(RESULT) : O; 35 V5 4; 36 37 OP 予 38 V6 : RESULT - 1640531527; 39 + 4LL * (V6 & 3)) + (16 * V2) (V2 >> 5)); *A1 +三 V2 + V6 + *( DWORD (A2 40 V7 三 *A1; 41 42 V8三V6 1640531527 43 - *(DWORD *)(A2 + 4LL * ((UNSIGNED INT)(V6 - 1640531527) >> 11) & 3)) 44 ++ + (16 * *A1) A(*A1 >>> 5)); 45 1013904242; V6 +三 46 *A1 +V2+V8; V9 三 47 A1[1] 三 V9; 48 V9) (V9 >> 5)); (V6&3))+((16 米 V10 49 710三V7+V9+V6+*(DWORD*)(A2+4LL*(V)4LL*(V) -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/53.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：第1项,共11项个小三X V6+101390424242; AA AB -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/54.png" alt="" style="max-width: 80%; height: auto;">

注意到，v6 += 1013904242;一共出现了11次

再加上一开始的 v6 = result - 1640531527 ，一共是12次

（由于v6是int，因此 += 1013904242，和 -= 1640531527并无区别）

因此不难发现，这里实际上就是把一个循环了12次的循环展开来了

<!-- 这是一张图片，ocr 内容为：V2 - A1[1]; LODWORD(RESULT) : O; V5 4 OP 1 1640531527; RESULT V6 *)(A2 + 4LL * (V6 & 3)) + (16 * V2) A (V2 >> 5)); *A1 +三 V2 + V6 + *(_DWORD V7 三 *A1; V8三V6 1640531527 *(_DWORD *)(A2 + 4LL * ((UNSIGNED INT)(V6 - 1640531527) >> 11) & 3)) )* -(16 * *A1) A (*A1 >> 5)); V6+1013904242; V9 三 *A1 + V2 + V8; A1[1] ; V9; 9 *)(A2+ 4LL * (V6 & 3)) + (16 * V9) 2 (V9 >> 5)); V10 三 V7 + V9 + V6 + *(_DWORD *A1 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/55.png" alt="" style="max-width: 80%; height: auto;">

比方说以第一部分为例

```python
v6 += delta
a1[0] += a1[1] + v6 + a2[v6 & 3] + ((16 * a1[1]) ^ (a1[1] >> 5)
# *(_DWORD *)(a2 + 4LL * (v6 & 3))意思就是访问对应下标，
# 4 * 的意义是一个元素是4字节，因此每次偏移4

v6 += delta 
# 虽然这里并没有直接加，但是注意到(-1640531527)的两倍在回绕下即为1013904242，
# 而且后续用的全是v6 - 1640531527，也就相当于这次加delta，下次也加上delta
a1[1] += a1[0] + v6 + a2[(v6 >> 11) & 3] + ((16 * a1[0]) ^ (a1[0] >> 5))
```

<!-- 这是一张图片，ocr 内容为：PRINT((((-1 1 (-1640531527) & OXFFFFFFFF) * 2) & OXFFFFFFF) -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/56.png" alt="" style="max-width: 80%; height: auto;"><!-- 这是一张图片，ocr 内容为：PS D:\_VISUAL 1013904242 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/57.png" alt="" style="max-width: 80%; height: auto;">

后面的操作都是如此

再结合

<!-- 这是一张图片，ocr 内容为：三 V2; 53 A1[1] 54 - V5 了 55 ( V5 ); WHILE .56 57 RESULT: RETURN -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/58.png" alt="" style="max-width: 80%; height: auto;"><!-- 这是一张图片，ocr 内容为：V2 LODWORD(RESULT) 4; OP -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/59.png" alt="" style="max-width: 80%; height: auto;">

也就是说一共循环48次

```python
target = bytes.fromhex(
    "A8 AD 9C 3A 86 8A 1B 98 C6 CC 91 F3 CA 1D 29 B5 "
    "7E 46 91 09 9D 62 FF 7B D0 41 C5 D6 AE B9 D9 C3"
)

cand = [int.from_bytes(target[i:i + 4], "little") for i in range(0, len(target), 4)]

key = [1677734099, 858993459, -324508640, 808468481]

delta = (-1640531527) & 0xFFFFFFFF

start = (delta * 96) & 0xFFFFFFFF

result = bytearray()
# result = []


for i in range(4):
    offset = start
    
    left = cand[2 * i]
    right = cand[2 * i + 1]

    for _ in range(48):
        right -= left + offset + key[(offset >> 11) & 3] + ((16 * left) ^ (left >> 5))
        right &= 0xFFFFFFFF

        offset -= delta
        offset &= 0xFFFFFFFF

        left -= right + offset + key[offset & 3] + ((16 * right) ^ (right >> 5))
        left &= 0xFFFFFFFF

        offset -= delta
        offset &= 0xFFFFFFFF

    left &= 0xFFFFFFFF
    right &= 0xFFFFFFFF
    result.extend(left.to_bytes(4, "little"))
    result.extend(right.to_bytes(4, "little"))
    # result.append(left)
    # result.append(right)

print(result)
```

<!-- 这是一张图片，ocr 内容为：PS D:\_VISUAL_STUDIO_CODE\ _APPLICATION\MICROSOFT BYTEARRAY(B'FLAG{TWLN_CATGIRLS_FLOWER_B1OOM}' CODE\ ANNLICATION\MIE NYMICROSOFT PST VISUAL STUDIE -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/60.png" alt="" style="max-width: 80%; height: auto;">

### 05 壳有壳味
#### 题目
upx -d 没味了怎么办 试试x64dbg呢


<a href="/Download/WpCTF/Comp/Que26/Re/miniupx.exe" download>
    文件
</a>

#### 提示
要不先试试手脱正常的upx？


#### 答案
flag{This_is_a_loli_upx}

#### 过程
x64dbg开

进入后按一次F9运行到程序中去而非Windows环境

按几次F8就会发现，在14002E012至14002E020间循环

<!-- 这是一张图片，ocr 内容为：RDX R9 48:BE 00100040010000( MOV RSI,MINIUPX.140001000 000000014002E000 OPTIONALHEADER.ADDRE 48:89F7 MOV RDI.RSI 000000014002E00A B9 00B40100 MOV ECX,1B400 000000014002E00D MOV AL,BYTE PTR DS:[RSI] RIP 000000014002E012 8A06 34 5A 000000014002E014 XOR AL,5A V BYTE PTR DS:[RDI],AL 8807 000000014002E016 MOV BJ 000000014002E018 48:FFC6 INC RSI 000000014002E01B 48:FFC7 INC RDI 000000014002E01E FFC9 DEC ECX 000000014002E020 75  F0 JNE MINIUPX.14002E012 CO140040010000 000000014002E022 RAX,MINIUPX.1400014CO 48:B8 MOV 000000014002E02C FFEO JMP RAX 000000014002E02E BYTE PTR DS IFRAXL.A 0000 ADD 0000 000000014002E030 ADD -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/61.png" alt="" style="max-width: 80%; height: auto;">

执行完这段循环后就会跳到miniupx.1400014C0的位置（miniupx.1400014C0扔进寄存器rax，然后jmp跳到rax的位置）

这一段能看出来就是在逐字节xor

<!-- 这是一张图片，ocr 内容为：0000000140001455 MOV RDI, 0000000140001436 .14000CC10 E8 D5B7000 CALL MINIUPX.1 000000014000143B 48:8B18 MOV RBX,QWORD PTR DS:[RAX] 000000014000143E E8  C5B7000 CALL MINIUPX.14000CC08 0000000140001443 4C:8BC7 MOV R8,RDI RDX:ENTRYPOINT 0000000140001446 48:8BD3 MOV RDX, RBX MOV ECX,DWORD PTR DS:[RAX] 8B08 0000000140001449 E8 DOFB FFF 000000014000144B CALL MINIUPX.140001020 8BD8 0000000140001450 MOV EBX,EAX 0000000140001452 E8 AD06000 MINIUPX.140001B04 CALL R -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/62.png" alt="" style="max-width: 80%; height: auto;">

注意到此处，分别往r8、rdx、ecx三个寄存器里面传入了值，而这三个值又恰好对应调用函数约定的第一个参数rcx（ecx是rcx低32位，对应argc恰好也是个32位int）、第二个参数rdx、第三个传入r8，然后call了140001020，也就是说140001020这个函数传入了三个值

那么追踪这个函数看看这个函数寄存器里面存的啥东西

<!-- 这是一张图片，ocr 内容为：跟踪 MINIUPX.00000201 0000000140029348 RAX 0000000000507B20 WORK_STA RBX 0000000000000001 RCX &"D:\\_WORK_STA 0000000000507B20 RDX 0000000000000000 RBP 000000000015FF18 RSP MINIUPX.00000001 000000014001C400 RSI &"ALLUSERSPROFIL 000000000050F5E0 RDI &"ALLUSERSPROFIL 000000000050F5E0 R8 0000000000010000 R9 0000000000000001 R10 R11 000000000015FEB0 00000000000000000 R12 0000000000000000 R13 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/63.png" alt="" style="max-width: 80%; height: auto;">

注意到rdx里面存的是路径，rcx数值是1（因为这里启动exe没有输入额外参数，因此只有文件名一个argv），r8是ALLUSER...，也是环境

因此140001020就是main

也就是说，前面逐字节异或就是在去壳，调用14C0的时候大概率已经处理完壳了

Ctrl + I 开Scylla，然后OEP写1400014C0，然后DUMP

<!-- 这是一张图片，ocr 内容为： MINIUPX.140001344 SCYLLA X64 V0.9.8 IMPORTS TRACE MISC HELP FILE ATTACH TO AN ACTIVE PROCESS 21832 - MINIUPX.EXE - D://WORK STATIONLLCODEX|CTF/MINIUPX.EXE PICK DLL IMPORTS LOD 200 200 PO 200 SHOW INVALID SHOW SUSPECT CLEAR 200 200 ACTIONS IAT INFO DUMP 00000001400014C0 OEP 01 AUTOTRACE IAT AUTOSEARCH DUMP PEREBUILD VA GET IMPORTS FIX DUMP SIZE LOG 007F 存 000 IAT SEARCH ADV: POSSIBLE IAT FIRST 0000014001D001D000 LAST 000014001D288 ENTRY. 0000 IAT SEARCH ADV: IAT VA 00000014001D000 RVA 00000000000001D000 SIZE OX0290 (656) 000 IAT SEARCH NOR: IAT VA 00000014001CFF8 RVA 00000000000001CFF8 SIZE OX02C8(712) 000 NOTHING TO REBUILD 000 NOTHING TO REBUILD 007F NOTHING TO REBUILD 000 0000 0004 0004 000 IMAGEBASE:0000000140000000 MINIUPXE INVALID: O IMPORTS: 0 0000 45 E2 F.FAHMAF.A.F EA 000000000015FFCO 00000 00000000001 5E: -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/64.png" alt="" style="max-width: 80%; height: auto;">

ida打开新exe即可

<!-- 这是一张图片，ocr 内容为：MEMSET(V7, 0, SIZEOF(V7)); SUB_140001100(AINPUTYOURFLAG); IF ( (UNSIGNED INT)SUB_140001160("%255S", V7) -- 1 ) 0 V4 : 0; V50; DEF0LL) 三: *(_QWORD *)(CHAR *)&UNK_14001D340 - 40 + V5) ) WHILE ( (*(_QWORD *)&V7[V5] A 0X123456789ABCDEF0LL) : 15 V5 +三 8; 916 17 IF ( V5 >: 32 ) 子 8 V4 三 1; 20 BREAK; 21 22 23 V6 : ACORRECT; 24 IF V4 25 V6 : AWRONG; SUB_140001100(V6); 26 27 RETURN O; 28 -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/65.png" alt="" style="max-width: 80%; height: auto;">

逻辑倒是很简单，逐64位（8字节）按位异或后跟目标比较

比较对象

<!-- 这是一张图片，ocr 内容为：.RDATA:00000014001D33D DB RDATA:000000014001D33E QP RDATA:000000014001D33F DATA XREF: MAIN+7810 DB 96H RDATA:0000000014001D340 UNK 14001D340 DB OB2H RDATA:000000014001D341 DB ODDH .RDATA:00000014001D342 DB OFDH .RDATA:00000014001D343 3 DB RDATA:000000014001D344 2 DB 000000014001D345 RDATA: 5CH DB RDATA :000000014001D346 { 7BH DB RDATA:000000014001D347 83H DB RDATA:000000014001D348 DB81H RDATA:000000014001D349 DB OD5H RDATA:000000014001D34A DB OE9H RDATA:000000014001D34B DB27H; RDATA:000000014001D34C 37H;7 QP RDATA:000000014001D34D 6BH QP K RDATA:000000014001D34E 7EH DB RDATA:000000014001D34F -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/66.png" alt="" style="max-width: 80%; height: auto;">

```python
target = bytes.fromhex(
    "96 B2 DD FD 03 02 5C 7B "
    "83 81 D5 E9 27 37 6B 7E "
    "9F B2 D5 C5 0D 26 4C 6F "
    "F0 DE BC 9A 78 56 34 12"
)
```

```python
target = bytes.fromhex(
    "96 B2 DD FD 03 02 5C 7B "
    "83 81 D5 E9 27 37 6B 7E "
    "9F B2 D5 C5 0D 26 4C 6F "
    "F0 DE BC 9A 78 56 34 12"
)

cand = [int.from_bytes(target[i:i + 8], "little") for i in range(0, len(target), 8)]

result = bytearray().join((c ^ 0x123456789ABCDEF0).to_bytes(8, "little") for c in cand)
```

（你愿意的话可以一行写完（））

```python
print(bytes(a ^ b for a, b in zip(target, (0x123456789ABCDEF0).to_bytes(8, "little") * 4))
```

<!-- 这是一张图片，ocr 内容为：X/CTF/1.PY BYTEARRAY(B'FLAG(THIS_IS_A_LOLI_UPX}\X00\X00\X00\X00\X00\X00\X00\X00*) S CODE> O PS D:\_VISUAL_STUDIO_CODE\ APPLICATION\MICROSOFT VS CO -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/67.png" alt="" style="max-width: 80%; height: auto;">

### 06 Pangbai泰拉记二周目（2）
#### 题目
在学习了一些基本的安卓知识后，pangbai着手开始了对存档加载逻辑的分析。他发现存档文件似乎是加密存储的，为了能够参透存档文件的结构，他开始研究存档文件解密。

做完这题希望大家能够去简单理解如下知识点，继续加油！

逆向中有什么常见的加密/编码算法？他们各自有什么特点？怎么解密/解码？

加密模式cbc、ecb等是什么意思？有什么作用？

加密填充是什么？为什么需要填充？

对应代码是怎么在点击按钮后执行的？

怎么寻找java层调用的so层（native层）的函数，或者说一个怎么在so文件中找到java层调用的对应的函数？java层是怎么调用so层的函数的？

结构体是什么意思？在IDA中的作用是什么？出现类似(*(__int64 (__fastcall **)(__int64, __int64))(*(_QWORD *)a1 + 1408LL))(a1, 16);函数调用的原因是什么？有没有办法恢复函数名？

没有方法能够在不解密、不实现对应函数的情况下拿到一个函数的返回结果？安卓要怎么动调？


<a href="/Download/WpCTF/Comp/Que26/Re/pbterraii.apk" download>
    文件
</a>

#### 答案
flag{Y0U_@Re_DEcRYp70_m4r5ter!!}

#### 过程
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/68.png" alt="" style="max-width: 80%; height: auto;">

应用打开似乎就是找明文，那反编译

进manifest找到入口类MainActivity



<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/69.png" alt="" style="max-width: 80%; height: auto;">

会发现最上面引用了一个库文件 libnative-lib.so，从其中引用了函数getAesKey

也获取到了IV

```python
IV = "1234567887654321"
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/70.png" alt="" style="max-width: 80%; height: auto;">

在此处使用

不难发现，这里就是调用了个AES加密，再用base64编码

那么就去so库里面找这个函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/71.png" alt="" style="max-width: 80%; height: auto;">

也就是这个函数

可以复现，但由于全部都是写死的值，也可以直接通过debug直接得到函数的返回值

```bash
adb connect 127.0.0.1:16384
adb devices

adb -s 127.0.0.1:16384 shell getprop ro.product.cpu.abi

adb -s 127.0.0.1:16384 root
adb -s 127.0.0.1:16384 shell id

adb -s 127.0.0.1:16384 push ".\frida-server" /data/local/tmp/frida-server

adb -s 127.0.0.1:16384 shell chmod 755 /data/local/tmp/frida-server
adb -s 127.0.0.1:16384 shell /data/local/tmp/frida-server
```

（PS，这里16384是我MuMu模拟器给的端口，应该是缺省，这个端口号每个设备可能都不一样；root如果返回uid=0(root) gid=0(root) groups=0(root)，那就是连上了；".\frida-server"这玩意去GitHub上下载，把自己的文件替换此处）

```bash
& "D:\_Program_Files_Ins(x86)\MuMuPlayer\nx_main\MuMuManager.exe" info -v 0
```

这是MuMu模拟器找端口号用的

然后验证一下，输入命令

```bash
frida-ps -U
```

出现了一堆进程名称，那证明是开对了

然后开始debug

先是hook

```java
Java.perform(function () {
    const Main = Java.use(
        "com.huanghunr.pangbaiterraii.MainActivity"
    );
    const getKey = Main.getAesKey.overload();

    getKey.implementation = function () {
        const key = getKey.call(this);
        const hex = [];

        for (let i = 0; i < key.length; i++) {
            hex.push(
                (key[i] & 0xFF).toString(16).padStart(2, "0")
            );
        }

        console.log("AES key: " + hex.join(" "));
        return key;
    };

    console.log("Hook 已安装，等待调用 getAesKey");
});
```

在该文件所在地

```bash
frida -U -f com.huanghunr.pangbaiterraii -l .\hook.js
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/72.png" alt="" style="max-width: 80%; height: auto;">

key到手

```python
key = bytes.fromhex("3C B4 03 67 30 CC 03 6F 30 E4 03 6F 30 E4 01 27")
```

比较对象是R.string.cipher_text

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/73.png" alt="" style="max-width: 80%; height: auto;">

得到cipher_text

那么直接启动srk

<!-- 这是一张图片，ocr 内容为：此版本编译于:9个月之前 设置 输入 操作流程 C7L91NX+XCH2IGS2XB7UQYPSQEUW3DRUSJBTO9ZWM4CJNRWENLRRH+G/DAWFKW2D BASE64解码 可用字符 A-ZA-Z0-9+/ 移除输入中的非可用字符 严格模式 OLI AES解密 KEY 十六进制 3CB4036730CC036F30E4036F30E401... IV MODE UTF8 CBC 12345678876543... RBC 64 输出格式 输入格式 原始数据 原始数据 输出 FLAG{YOU_@RE_DECRYP70_M4R5TER!!! -->
<img src="/Picture/WpCTF/Comp/Que26W2/Re/74.png" alt="" style="max-width: 80%; height: auto;">



