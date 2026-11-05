---
title: Reverse - Week4
status: published
pubDate: 2026-11-05
type: Reverse
tags:
- algorithm-reverse
- unity
- dotnet
- csharp
- dnspy
- resource-extraction
- code-patching
- android
- apk
- apktool
- smali
- repackaging
- frida
- hooking
- dynamic-analysis
- sm4
- vm-reverse
- bytecode
- stack-machine
- xor
- rol
- windows
- ipc
- named-pipe
- ida
---
### 01 O神之一手
#### 题目
一花一叶一菩提，轮回皆是一场迷……

你说得对，但是《O神之一手》是一款……

等等，你下棋给我下好了呀？


<a href="/Download/WpCTF/Comp/Que26/Re/o9%20.zip" download>
    文件
</a>


#### 提示
作者为了防止被ai小子糖到，解出题目flag联系（qq：2316541630）兑换平台flag

#### 答案（题目flag）
flag{P09_DEMO_9ply_certified}

#### 过程
启动后会发现缺失了第九关

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/1.png" alt="" style="max-width: 80%; height: auto;">

那大概率跟flag相关

因此需要找怎么复活第九关

将Assembly-CSharp.dll挂载到dnspy

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/2.png" alt="" style="max-width: 80%; height: auto;">

在GameBootstrap会找到一个EnterP09的函数

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/3.png" alt="" style="max-width: 80%; height: auto;">

被OnLevelClicked调用

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/4.png" alt="" style="max-width: 80%; height: auto;">

通过VisibleRecords是否存在Id == 9来判断是否允许进入

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/5.png" alt="" style="max-width: 80%; height: auto;">

能被VisibleRecords返回的Record是当“HideArchived”为false或者是不存在 Status：“Archived”的键值对

下面已经写了，HideArchived是true，那么判断就只有Archived不存在

我稍微去看了一下资源文件，第九章确实是Archived

##### \# region 资源文件
<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/6.png" alt="" style="max-width: 80%; height: auto;">

Start生命周期函数里面第二个函数名是 加载档案 

去这里找

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/7.png" alt="" style="max-width: 80%; height: auto;">

可以看到，这里从某个资源里面加载了第九章

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/8.png" alt="" style="max-width: 80%; height: auto;">

但是会发现这玩意调用的是接口下面的一个虚函数，那就看这里调用的是哪个实现了这个接口的类的对应的方法

上面有写，bundleSource来源是函数CreateBundleSource的返回值

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/9.png" alt="" style="max-width: 80%; height: auto;">

可以看到这里返回的是UnityAssetBundleSource

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/10.png" alt="" style="max-width: 80%; height: auto;">

该类实现的LoadText方法加载的资源位于“assets/streamingassets/data/archive_records/”下面

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/11.png" alt="" style="max-width: 80%; height: auto;">

而恰好也确实存在这样一个文件夹，下面也确实存在一个文件

用StudioAssets打开后会发现

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/12.png" alt="" style="max-width: 80%; height: auto;">

确实，状态是Archived

##### \# endregion
不过这里不用真的去找，直接把下面的bool改成false就行了（记得保存）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/13.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/14.png" alt="" style="max-width: 80%; height: auto;">

现在能进去了

但是当开始下的时候会发现，欸，不让你成功

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/15.png" alt="" style="max-width: 80%; height: auto;">

被禁止了

那不妨暴力搜索一下这个字符串，看看谁扔出去的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/16.png" alt="" style="max-width: 80%; height: auto;">

但是会发现很奇怪的是无人调用它

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/17.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/18.png" alt="" style="max-width: 80%; height: auto;">

发现这个类是实现了一个接口的，那不妨推测很可能是通过接口的函数调用的

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/19.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/20.png" alt="" style="max-width: 80%; height: auto;">

对的，进入方式是AllowCommit被拒绝

AllowCommit就在刚刚DescribeRefusal那个函数上面

由于是同一个对象，因此实现肯定也是同一个类

那就回到刚刚找到字符串的那个类里面查看AllowCommit的实现

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/21.png" alt="" style="max-width: 80%; height: auto;">

会发现，判断是否能下会有两种情况，一种是下完以后继续，一种是下完这步后就赢了

刚刚就是下完这步就赢了的情况，却被拒绝了

这时候不妨看看这个ply是啥东西

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/22.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/23.png" alt="" style="max-width: 80%; height: auto;">

赋值都在在TryPlay函数里面，当point == -1的情况或者在所有不被允许的情况都被排除后，执行新 position（return出去了）的 ply 相比于传入的 position 对象的 ply 加1

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/24.png" alt="" style="max-width: 80%; height: auto;">

这个函数在OnBoardClicked中被执行，也就是说是在板子被点击的时候执行（挂在一个事件上执行的），通过游戏推测就是下一步棋的时候触发

因此ply的作用大概率是计步数

回到前面，不妨看看这个判断到底在判断什么

After.Ply大概率是在说下一步下好后是第几步

revision源于committedMoves这个泛型数组的长度

上文有图，传入的数组是 this._moves 这个数组，

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/25.png" alt="" style="max-width: 80%; height: auto;">

而很不巧的是，this._moves数组的赋值在AllowCommit下面

也就是说，假如这步是最终步，下好后进win分支，此时下了（比方说）9步（虽然成功确实是只能下9步），但是moves只累计了8步，因此判断失败不让下

那么解决方案很简单，让成功判定变成revision + 1就行了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/26.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/27.png" alt="" style="max-width: 80%; height: auto;">

得到题目flag

flag{P09_DEMO_9ply_certified}

虽然还有只能走9步的判定，但是这玩意好像没必要说，因为如果执行的步数超过9了根本来不及，下面8个子根本保不住，我也没想到怎么把步数压到9以内（）

### 02 pangbai泰拉记二周目（3）
#### 题目
通过之前的学习，pangbai大概理解了apk的分析方法。但是最近遇到了一点困难，他想获得一个函数的返回值，但是这个函数的内部极其复杂，肉眼根本没办法看。他想，要是安卓也能动调就好了，这样就可以直接修改参数获得函数的返回值了，根本就不用去管函数里面的东西。

下面是需要了解的知识点，继续加油！

安卓要怎么动调？怎么动调Java层？怎么动调so层？

frida是什么？在安卓场景下有什么用法？怎么用？

什么是重打包技术？有什么用？

动调，frida hook，重打包技术各有什么优点呢？使用的场景分别是什么呢？

adb工具是什么？在安卓中有什么作用呢？

什么是安卓root？为什么要root呢？有什么作用？

*推荐安卓9以上版本运行，看不懂的地方要善用AI呢


<a href="/Download/WpCTF/Comp/Que26/Re/pbterraiii.apk" download>
    文件
</a>

#### 答案
flag{fr1d4_h00k5_th3_c0unt_jn1_r3v34l5_k3y5_sm4_0p3n5_th3_v4ult}

#### 过程
这下应用真的没啥用了（）就一个10秒cps测试器（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/28.png" alt="" style="max-width: 80%; height: auto;">

也是直接就看到了个FlagActivity，进去就是密文跟IV

```python
cipher = bytes.fromhex("a6fb8351c8990e6297d07a62e1d57c122056029524960abe7e30866f4959edf5743936a55bd29c3642c7aab688d2de923cc61d8a77b18aae43bbdf8106e9c01b12d58e2bb033cbf7ad46d1a0a74695f6")

iv = bytes.fromhex("269aba34de97c012ccfe58ae161ba8da")
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/29.png" alt="" style="max-width: 80%; height: auto;">

比较对象在此处，比较的是传入的bArr2

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/30.png" alt="" style="max-width: 80%; height: auto;">

调用处传入的是输入的bytes，flag长度64，以flag开头

而key是new SecretKeySpec(bArr, "SM4")这里实例化的（证实加密是SM4）

bArr源于传入参数bArr，这个又源于this.key.clone()

尝试debug获取，但是

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/31.png" alt="" style="max-width: 80%; height: auto;">

这里入口并不是FlagActivity而是MainActivity，需要重新打包一下变成以FlagActivity作为起始

先解包

```bash
apktool d pbterraiii.apk -o unpack
```

然后修改manifest

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/32.png" alt="" style="max-width: 80%; height: auto;">

但是如果这个时候直接打包会发现应用根本打不开

这是因为Flag的OnCreate前面有一个判断

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/33.png" alt="" style="max-width: 80%; height: auto;">

如果EXTRA_SCORE != 67676767会直接退出

因此需要前往文件处把EXTRA_SCORE的值修改掉

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/34.png" alt="" style="max-width: 80%; height: auto;">

文件位于此处（也就只有smali的文件夹里面有符合要求的文件吧（））

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/35.png" alt="" style="max-width: 80%; height: auto;">

此处就对应上面的return

move-result-object v0获取了EXTRA_SCORE（根据行数line47和line 49的return，结合原函数大致也能猜出来吧（））

那就需要给v0 push进67676767

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/36.png" alt="" style="max-width: 80%; height: auto;">

然后重新打包

```bash
apktool b unpack -o moded.apk
```

然后扔给MT管理器签名

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/37.png" alt="" style="max-width: 80%; height: auto;">

然后安装

成功进入flag页面

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/38.png" alt="" style="max-width: 80%; height: auto;">

现在就是尝试去捕获key

依旧跟二周目2一样，通过frida的hook捕获key

```javascript
Java.perform(function () 
{
    const F = Java.use("com.huanghunr.pangbaiterraiii.FlagActivity");

    const func = F["lambda$verify$7$com-huanghunr-panb
```

这里我直接捕获的是传入的第一个参数bArr，后面直接把这玩意当作密钥使用了

```bash
adb connect 127.0.0.1:16384

adb -s 127.0.0.1:16384 root
adb -s 127.0.0.1:16384 shell id

adb -s 127.0.0.1:16384 shell chmod 755 /data/local/tmp/frida-server
adb -s 127.0.0.1:16384 shell /data/local/tmp/frida-server
```

```bash
frida -U -f com.huanghunr.pangbaiterraiii -l .\hook.js
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/39.png" alt="" style="max-width: 80%; height: auto;">

捕获key

```python
key = bytes.fromhex("3364753ce4bb6e537f88c387624e6f57")
```

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/40.png" alt="" style="max-width: 80%; height: auto;">

### 03 tinyvm
#### 题目
きみはふわふわ、もちもち、あま〜い香りのする、ちっちゃくてシンプルなVMちゃんだよ♡


<a href="/Download/WpCTF/Comp/Que26/Re/TinyVM.exe" download>
    文件
</a>

#### 答案
flag{wlzhkhjodqowmla5qy}

#### 过程
<!-- 这是一张图片，ocr 内容为：PUTS("THIS MACHINE SPEAKS IN STACKS AND NUMBERS."); 11 V3 三___IOB_FUNC(); 12 FWRITE("INPUT YOUR FLAG: ", 1U, OX11U, V3 + 1); 13 __IOB_FUNC()3 14 V4  FFLUSH(V4 + 1); 15 IF ( (UNSIGNED INT)SUB_401985(V7, 128, &V6) && V6 - 三三 24 16 ] 17 (UNSIGNED INT)SUB_401939(V7, 24) _INT64 V6; // [RSP+28H] [RBP-58H] BYREF IF 24) && 18 19 0X18LL  PUTS("CORRECT!"); 20 21 RETURN O; 22 ELSE 00000E84 MAIN:16 (401A84) HEX VIEW-1 ................ 10 FE 60 00 00 00 00 00 92 1A 40 00 00 00 00 00 000000000060FD80 00 E0 10 01 E3 FE 7F 00 00 30 DA 06 E3 FE 7F 00 1 000000000060FD90 DA 06 E3 FE 7F 00 00 903CB50000000000 .0. 30 000000000060FDA0 0000000000 00 0000B500000000 000000000060FDB0 18 00 31 32 33 34 35 36 37 38 31 32 33 34 35 3 36 000000000060FDC0 30 39 1234567890123456 37 38 39 30 31 32 33 34 0000000000 000000000060FDD0 00 78901234........ 00 00 AA AA AA A AA AA AA 1R R1 A8 AA AA AA AA AA AA AAAAAAAAAABAFNEA @ 1:000000000060FDC0 UNKNOWN 000000000060FDCO: STACK[00002748]:00 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/41.png" alt="" style="max-width: 80%; height: auto;">

v6 rsp+0x28这里存的是长度，判断要求是长度为24可进入

同时rsp+0x30也就是v7的位置是我们的输入

那重点看俩判断就行了，sub_401939跟sub_401616

<!-- 这是一张图片，ocr 内容为：PSEUDOCODE-A IDA VIEW-RIP _FASTCALL SUB_401939(_BYTE *A1,__INT64 A2) INT64 123 1  CHAR *V2; / RAX CHAR *V3; // RDX 4 5 CHAR V4; // CL 9 IF ( !A2 ) 7 RETURN 1; 8 INT8 9 IF 0X5EU 32) UNSIGNED 10 RETURN 0; 11 V2 三 A1 + 1; 12 V3 ; &A1[A2];  WHILE ( V2 !: V3 ) 13 } 14 15 V4 三 *V2++; IF ( (UNSIGNED __INT8)(V4 - 32) > 0X5EU ) 16 0; RETURN 17 18 1; 19 RETURN 20 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/42.png" alt="" style="max-width: 80%; height: auto;">

前一个函数只是在判断是否是ASCII可打印字符

后一个函数就是个虚拟机

<!-- 这是一张图片，ocr 内容为：V2 三 1; 21 V3 三 512; 22 WHILE ( 1 ) 23 24 V5 : BYTE_4050A0[V1]; 25 BYTE_4050A0[V2]; 26 V6 WORD2(V12) 三 V1 + 2; 27 28 V9 三 0; V10 0; 29 IF ( V5 三 70 30 } 31 RESULT : SUB_4015DA(&V11, &V9); 32  IF ( !(_DWORD)RESULT ) 33 34 RETURN RESULT; -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/43.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：132 LABEL 22: 133 IF ( !-V3 134 RETURN O; 135 V1 三 WORD2(V12); 136 V2 : WORD2(V12) + 1; 137 IF ( V2 > 0X17 ) 138 O; 139 RETURN 140 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/44.png" alt="" style="max-width: 80%; height: auto;">

v5是指令，是byte_4050A0的所有偶数位

v6是参数，是byte_4050A0的所有奇数位

```python
data = bytes.fromhex(
    "13 00 21 00 27 00 39 00 42 00 39 00 46 01 58 03 "
    "6B 00 71 00 7D 00 FF 00 00 00 00 00 00 00 00 00"
)
```

因此按顺序分别执行

19、33、39、57、66、57、70、88、107、113、125、255这几处

<!-- 这是一张图片，ocr 内容为：IDAVIEW-RIP V11; // [RSP+40H] OH][RBP-40H]BYREF INT64 13  V12; // [RSP+48H] INT64 [RBP-38H] BYREF 14 二 15 [RBP-30H] [RSP+50H] INT64 V13; 16 17 V11 三 0; SREZZ333 V12 ; 22675456; A1! V13 V1 三 0; V2 三 1; V3 三 512; 1) WHILE 25 BYTE_4050A0[V1]; V5 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/45.png" alt="" style="max-width: 80%; height: auto;">

v13就是传入参数（地址扔给v13了）

v11地址+8就是v12

<!-- 这是一张图片，ocr 内容为：71 ELSE IF ( V5 -: 193 19 72 73  IF ( BYTE1(V12) > 0X17U ) 74 75 RETURN O; RESULT : SUB 4015B0(&V11, *(UNSIGNED - INT8 *)(V13 + BYTE1(V12)); 76 IF ( !(_DWORD)RESULT ) 77 78 RETURN RESULT; 丁 79 80 ELSE 了 81 IF ( V5 !: 33 ) 82 RETURN O; 83  IF ( !(_BYTE)V12 ) 84 RETURN 0; 85 B 4015B0(&V11, *((UNSIGNED 1)); _INT8 *)&V11 + (UNSIGNED INT)(UNSIGNED INT8)V12  RESULT : SUB_4 98 IF ( !( DWORD)RESULT ) 87 RETURN RESULT; 88 子 89 GOTO LABEL_22; 90 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/46.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：PSEUDOCODE-A IDA VIEW-RIP _INT64 AL, CHAR A2) FASTCALL SUB_4015B0( INT64 23456 UNSIGNED __INT8 V2; // R8 _INT64 RESULT; // RAX BYTE * 水 (A1 V2 7 0; RESULT IF ( V2 <: 7U ) 8 *(_BYTE *)(AL + 8) 三 V2 + 1; 10 * BYTE *)(A1 + V2) 三 A2; 11 12 RETURN 1; 13 RETURN RESULT; 14 15 000009B0 SUB 4015B0:12 (4015B0) HEX VIEW-1 7F FE 0000 FD 34 E3 17 60 BO 00 02 00 00 00 000000000060FCE0 00 ..*.....4........ E3 FE FE E3 DA 7月 06 10 00 00 EO 7F 00 000000000060FCF0 01 00 00 ................ 30 00 E3 FE 00 1月 00 00 DA FD 000000000060FD00 00 06 0............... 60 00 00 11 E3 00 FE 00 00 00 00 000000000060FD10 00 00 7日 00 3A 00 .............. 11 31 1.. 01 00 01 000000000060FD20 00 00 02 00 00 00 00 00 00 00 00 A CA AAAAAAAAAA6AFN3A AA AA AA AA AA AA AA AA AA AA -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/47.png" alt="" style="max-width: 80%; height: auto;">

将输入的第一个值传入v11中去，然后跳到Label 22，LABEL 22前面有说，就是将俩索引 += 2

下一次循环是33

<!-- 这是一张图片，ocr 内容为：82 IF ( V5 !: 33 ) 83 RETURN O;  IF ( !(_BYTE)V12 ) 84 85 RETURN O; *)&V11 + (UNSIGNED INT) 86 _INT8)V12 - 1); (UNSIGNED INT8 RESULT - SUB_4015B0(&V11, *((UNSIGNED 87 IF( DWORD) RD IRESULT 88 RETURN RESULT; 00000C04 SUB 4016:86 (401804) HEX VIEW-1 30000000060FD10 00 00 00 3A 11 01 E3 FE 7F 00  11000000 31 31 00 00  00000000060FD20 00 00 02005A 01 000000 00 18000000000000 COFD600000000 00 30000000060FD30 北 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/48.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： IF ( !(_BYTE)V12 84 85 RETURN O; HED ._INT8 *)&V11 + (UNSIGNED INT)(UNSIGNED RESULT 三 SUB_4015B0(&V11, *((UNSIGNED _INT8)V12 - 1)); 86  IF ( !(_DWORD)RESULT ) 87 RETURN RESULT; 00000A16 SUB 401616:87 (401616) HEX VIEW-1 000000000060FCE0 BO FD 60 00 00 00 00 00 34 17 02 E3 FE 7F 00 00 E0 10 01 E3 FE 7F 00 00  ................. 00 DA 06 E3 FE 7F 000000000060FCF0 00 00 30 DA 06 E3 FE 7F 00 00000000 000000000060FD00 00 00 11000000 00 000000000060FD10 000 00 00 7A 7A 00000 00 00 0400000 000000000060FD20 ZZ....... 02 180000000000000 COFD60000000000 000000000060FD30 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/49.png" alt="" style="max-width: 80%; height: auto;">

还是同一个函数，但这次第二个参数传入的是v11的第一个（为了验证换了个参数传，依旧是一样的）

下一次进39

<!-- 这是一张图片，ocr 内容为：IF ( V5 <: 0X46U ) 41 J 42  IF ( V5 : 39 ) 43 } 44 RESULT - SUB 4015B0(&V11, BYTE_4050D8[(BYTE1(V12) + V6) & 31); 45  IF ( !(_DWORD)RESULT ) 46 47 RETURN RESULT; _INT64 V12; // [R 子 48 0X6015A0002LL E IF ( V5 > 0X27U ELSE I 49 50 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/50.png" alt="" style="max-width: 80%; height: auto;">

依旧是同一个函数，从byte_4050D8中取出来，BYTE1(v12)此时是0，v6也是0（对照前面指令集），因此这里取的就是byte_4050D8第一个

<!-- 这是一张图片，ocr 内容为：,RDATA:00000000004050CD DB 2DH, 30H, OBEH, 99H, 53H, 4CH, OACH, 35H, 9BH, 3EH _INT8 BYTE_4050D8[8] RDATA:0000000004050D8 UNSIGNED  DB 5BH, 85H, 9AH, 48H, 0, 0, 0 .RDATA:00000000004050D8 BYTE 4050D8 DATA XREF: RDATA:00000000004050D8  EXCEPTION POINTERS EXCEPTIONINFO STRUCT RDATA:00000000004050E0 CONST -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/51.png" alt="" style="max-width: 80%; height: auto;">

```python
table = bytes.fromhex("5B 85 9A 48 0 0 0 0")
```

<!-- 这是一张图片，ocr 内容为：E3 FE 1F FD 7F 60 00 30 00 00 00 000000000060FD00 00 00 00 DA06 E3 00 11 FE 00 7F 11 01 3A 00 00 00 00 000000000060FD10 00 00 00 7A 5B 01 5A 00 00 00 00 7A ZZ] 03 00 000000000060FD20 90 00 00 00 00 .. CO 18 00 FD 00 00 60 00 00 00 00 000000000060FD30 00 00 00 00 00 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/52.png" alt="" style="max-width: 80%; height: auto;">

也就是"["

下一个57

<!-- 这是一张图片，ocr 内容为：50 IF ( V5 :: 57 ) 51 52 53 RESULT ; SUB_4015DA(&V11, &V10); IF ( !(_DWORD)RESULT ) 54 RETURN RESULT; 55 SUB_4015DA(&V11, &V9); 56 RESULT IF ( !(_DWORD)RESULT ) 57 58  RETURN RESULT; _INT8)(V10 A V9)); RESULT - SUB_4015B0(&V11, (UNSIGNED 59 IF ( !(_DWORD)RESULT ) 60 61 RETURN RESULT; 了 62 63 ELSE -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/53.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：IDAVIEW-RIP PSEUDOCODE-A SUB 4015DA( FASTCALL INT64 INT64 12345678 *A2) BYTE A1 } V2; // R8 CHAR RESULT; INT64 RAX UNSIGNED INT8 V4;// R8 *)(A1 +8); 水 * BYTE V2 8 三0; RESULT IF ( V2 ) 6 10  V4 三 V2 - 1; MUN *(_BYTE *)(AL + 8) 三 V4; *)(A1 + V4); *A2 (_BYTE 1; RETURN 14 15 RESULT; 16 RETURN J 17 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/54.png" alt="" style="max-width: 80%; height: auto;">

将a1+8也就是v12回退1，并取出a1也就是v11的第三个值扔给v10

同理，a1+8再回退1，取出v11第二个扔给v9

<!-- 这是一张图片，ocr 内容为：(1, &V10); CHAR V10; , &V9); -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/55.png" alt="" style="max-width: 80%; height: auto;"><!-- 这是一张图片，ocr 内容为：&V9); UNSIGNED INT8 V9; OX7AU (UNSI -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/56.png" alt="" style="max-width: 80%; height: auto;">

然后再进入4015B0，v12+1，把v10与v9的异或压入第二个值

<!-- 这是一张图片，ocr 内容为：01 E3 FE 7F 7A 5B 000000000060FD10 11 00 3A 00 000 00 00 11 00 7A 5B 02 00 21 08 00 01 00 5A 00 00 00 00 000000000060FD20 00 00 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/57.png" alt="" style="max-width: 80%; height: auto;">

进下一次循环，66

<!-- 这是一张图片，ocr 内容为：ELSE 63 64 IF ( V5 !: 66 65 O; RETURN 66 BYTE2(V12)); RESULT 4015B0(&V11, 67 SUB IF ( !(_DWORD) )RESULT 68 RESULT; RETURN 69 了 70 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/58.png" alt="" style="max-width: 80%; height: auto;">

把v12第三个值压入v11第三个字节处

再进下一次循环，57

<!-- 这是一张图片，ocr 内容为：50 IF ( V5 -: 57 ) 51 ] 52  RESULT ; SUB_4015DA(&V11, &V10); 53  IF ( !(_DWORD)RESULT ) 54 55 RETURN RESULT; _4015DA(&V11, &V9); 56  RESULT : SUB_46 IF ( !(_DWORD)RESULT ) 57  RETURN RESULT; 58 _INT8)(V10 ( V9)); RESULT 三 SUB_4015B0(&V11, (UNSIGNED 59 IF ( !(_DWORD)RESULT 60 RETURN RESULT; 61 00000BD2 SUB 401616:49 (4017D2) HEX VIEW-1 02 E3 FE 7F 00 000000000060FCE0 BO FD 60000 00 00 00 34 17  00 06 E3 FE 7F 00 EO 10 01 E3 FE 7F 00 000000000060FCF0 00 00 00 DA 06 E3 FE 7F 00 000 60 00 1F 000000000060FD00 FD 00 DA 30 00 0............. 0000 00000000000 FE 7F 00 E3 01 000000000060FD10 11 00 00 3A 11 0000 ................. 00 7A 21 01 0C 0000 00 00 00 00 000 Z!Z.......Z.... 5A 03 000000000060FD20 00 AAAAAAAAAGAEN30 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/59.png" alt="" style="max-width: 80%; height: auto;">

还是一样，v12 - 2再 + 1，在第二个值的位置压入当前第二个值和第三个值异或的结果

<!-- 这是一张图片，ocr 内容为：56 RESULT 三 SUB_4015DA(&V11, &V9);  IF ( !(_DWORD)RESULT ) 57 58 RETURN RESULT; V9)); INT8)(V10 RESULT : SUB_4015B0(&V11, (UNSIGNED 59  IF ( !(_DWORD)RESULT 60 61 RETURN RESULT; 0000A16 SUB 401616:60 (401616) HEX VIEW-1 00 FD 60 00 34 17 02 E3 FE 7F 00 00 00 00 000000000060FCE0 BO 00 00 EO1001E3 7F FE 7F 00 00 DA06 00 00 000000000060FCF0 00 7F 30 00 00 00 1F FD DA06 FE 60 00 00 00 000000000060FD00 00 E3 FE 7F 21 5A 00 11 00 00 3A 00 00 000000000060FD10 00 00 7A 7B 01 0C 00 00 ....Z..... 00 00 00 0200 Z{Z. 5A 00 000000000060FD20 00 00 180000000000000 00 CO FD 60 00 00 00 00 00 000000000060FD30 00 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/60.png" alt="" style="max-width: 80%; height: auto;">

下一次循环，70

<!-- 这是一张图片，ocr 内容为：24 4050A0[ V5 25 BYTE BYTE_4050A0[V2]; 26 V6 WORD2(V12) 三 V1 + 2; 27 V9 三 0; 28 29 V10 三 0; 70) IF 30 川川 31 RESULT : SUB 4015DA(&V11, &V9); 32 IF ( !(_D (_DWORD)RESULT 33 34 RESULT; RETURN V7 17 ; SUB_401607(V9, V6); 35 RESULT 三 SUB_4015B0(&V11, V7); 36  IF ( !(_DWORD)RESULT 37 38 RETURN RESULT; LABEL _22; 39 GOTO 40 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/61.png" alt="" style="max-width: 80%; height: auto;">

还是4015DA，v12 - 1，把v11第二个值取出来给v9

<!-- 这是一张图片，ocr 内容为：(&V11, &V9); UNSIGNED 0X7BU V6); -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/62.png" alt="" style="max-width: 80%; height: auto;">

然后401607，循环左移1（指令集此时v6 = 1），（可以函数改个名）

<!-- 这是一张图片，ocr 内容为：X IDAVIEW-RIP PSEUDOCODE-A _FASTCALL SUB_401607(CHAR CHAR CHAR A2 A1, 2 } __ROL1_(A1, A2 & 7); 3 RETURN 4 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/63.png" alt="" style="max-width: 80%; height: auto;">

然后把循环左移的值压入第二位，v12 + 1

<!-- 这是一张图片，ocr 内容为：36  SUB_4015B0(&V11, V7); RESULT (_DWORD)RESULT 37 IF 38 RETURN RESULT; GOTO LABEL_22; 39 了 40 IF ( V5 < 0X46U 41 SUB 401616:37 (401616) 00000A16 HEX VIEW-1 ..*.....4...... 34 17 02 E3 FE 7F 00 00 FD 000000000060FCE0 00 00 60 00 00 BO 00 10 01 E3 FE 7F 00 FE 7F EO DA 90 E3 00 00 00 000000000060FCF0 00 E3 FD 60 00 00  FE 1F 00 DA 7F 90 000000000060FD00 30 00 00 00 7F 11 00 01 E3 FE 11 00 7B 00 00 00 3A 00 000000000060FD10 00 00 F6 00 SA 0E 01 00 00 00 00 00 Z 00 00 5A 7A 000000000060FD20 00 02 Z 00 00 00 00 00 00 60 FD 18 00 00 00 00 CO 00 000000000060FD30 00 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/64.png" alt="" style="max-width: 80%; height: auto;">

下一次循环88

<!-- 这是一张图片，ocr 内容为：IF ( V5 :: 88 ) 101 } 102 RESULT : SUB_4015DA(&V11, &V9); 103 IF ( !(_DWORD)RESULT ) 104  RETURN RESULT; 105 _INT8)(V9 + BYTE1(V12) + V6)); RESULT ; SUB_4015B0(&V11, (UNSIGNED 106  IF ( !(_DWORD)RESULT ) 107 RESULT; 108 RETURN -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/65.png" alt="" style="max-width: 80%; height: auto;">

从v11中取出第二位放入v9，将v9 + v6（也就是3）+ v12第二位重新放回v11第二位

<!-- 这是一张图片，ocr 内容为：RETURN RESULT; 105 BYTE1(V12) + V6));  RESULT : SUB_4015B0(&V11, (UNSIGNED INT8)(V9 106  IF ( (_DWORD)RE 107 )RESULT 108 RETURN RESULT; 401616:107 (401616) 00000A16 SUB 4 HEX VIEW-1 17 02 E3 FE 7F 00  BO FD 0000 00 00 000000000060FCE0 34 60 00 10 01 E3 FE 7F 00  CFO 06 E3 FE 7F 00 00 EO DA 00 000000000060FCF E3 FE 7F 00 FD6000000000000 1F 00 00 DA 30 90 D00 0000000000601 0.......' 3A 11 01 E3 FE 7F F6 00 00 1100 0000 FD10 00 00 00000000 OO Z.Z.......Z.... 02005A011100000000 F9 7A SA 000000000060FD20 00 00 00 00 CO ED 60 00 00 00 0 000000000060FD30 180000000000000 00 00 00 00 00 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/66.png" alt="" style="max-width: 80%; height: auto;">

下一次循环107

<!-- 这是一张图片，ocr 内容为：109 ELSE 110 } 111 !: 107 ) IF V5 112 O; RETURN 113  BYTE1(V12) > 0X17U IF 114 O; 115 RETURN _4015DA(&V11, &V9); 116 SUB RESULT 三 ) IF ( !(_DWORD)RESULT 117 118 RESULT; RETURN IF ( BYTE_4050C0[BYTE1(V12)] !: V9 ) 119 BYTE3(V12) 三 0; 120 121 GOTO LABEL_22; 122 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/67.png" alt="" style="max-width: 80%; height: auto;">

从v11第二位取出放入v9，与byte_4050C0的v12第二位作比较，如果不一样就往v12第四位赋值0（目前是1）

```python
cipher = bytes.fromhex(
    "D1 23 34 A2 95 1B 0C C6 "
    "9D 19 40 A2 CB 2D 30 BE "
    "99 53 4C A0 35 9B 3E B2"
)
```

这也能推断出来v12第四位应该就是判断位

<!-- 这是一张图片，ocr 内容为：91 IF ( V5 :: 113 92 93 *)&V12 + 2);  RESULT : SUB 4015DA(&V11, (CHAR 94 IF ( ! DWORD)RESULT 95 RETURN RESULT; 96 GOTO LABEL_22; 97 98 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/68.png" alt="" style="max-width: 80%; height: auto;">

下一次循环，113

将v11第一位，也就是本次处理的数放入v12第三位（作为下一次循环处理的东西）

<!-- 这是一张图片，ocr 内容为：7F E3 FE 11 11 3A 01 00 00 000000000060FD10 00 00 00 00 00 00 00 7A 7A F9 00 000000000060FD20 14 5A 00 00 00 00 00 00 00 00 00 00 Z.Z. -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/69.png" alt="" style="max-width: 80%; height: auto;">

下一次循环，125

<!-- 这是一张图片，ocr 内容为：123  IF ( V5 !: 125 ) 124 BREAK; 125 IF 0X17U 126 ++BYTE1(V12) IV 127 二 2 * V6; 128 V8 C ( V8 > 0X17 IF 129 130 ;; RETURN WORD2(V12) 三 V8; 131 132 LABEL 22: 133 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/70.png" alt="" style="max-width: 80%; height: auto;">

v12第二位（看前面能发现其实就是索引i）自加1

同时重置v12（v6此次循环是0）

下一次循环，回到19

<!-- 这是一张图片，ocr 内容为：71 ELSE IF ( V5 : 19 ) 7347777  IF ( BYTE1(V12) > 0X17U ) RETURN O; *)(V13 + BYTE1(V12))); *(UNSIGNED INT8  RESULT : SUB_4015B0(&V11,  IF ( !(_DWORD)RESULT RETURN RESULT; 78 79 80 ELSE } 81 IF F ( V5 !三 33 ) 82 RETURN 0; 83  IF ( !(_BYTE)V12 ) 84 RETURN 0; 85 D __INT8 *)&V11 + (UNSIGNED INT)(UNSIGNED . RESULT - SUB_4015B0(&V11, *((UNSIGNED _ 86  IF ( !(_DWORD)RESULT ) 87 RETURN RESULT; 88 00000A16 401616:77 (401616) SUB HEX VIEW-1 60 00 00 00 00 00 34 17 02 E3 FE 7F 00 00 000000000060FCE0 BO FD 00000 EO 1 1001E3FE7FE7F 000000000060FCF0 DA 00 06 E3 FE 7F 0 00 00 00001FFD60 E3 FE 0元 60000000 30 7F 90 00 00 000000000060FD00 DA 7F 00 01 E3 FE 3A 11 00 00 000000000060FD10 11 00 00 00 00 00 00 7A 1.Z 01 000000000060FD20 02 00 01 00 00 00 5A 31 F9 00 00 00 00 00 00000000060FD38 AA 20元 AA 60 AA PA AA AA 9A AO FD 99 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/71.png" alt="" style="max-width: 80%; height: auto;">

取出来下一个值

因此这个VM每次做的事就是，逐字节处理，每次处理方式就是：先把这个值跟byte_4050D8对应索引循环取出来的值异或，再把这个值跟上次输入的值异或，再把这个值循环左移1，再把这个值+3+i， 然后跟目标比较

```python
table = bytes.fromhex("5B 85 9A 48")

cipher = bytes.fromhex(
    "D1 23 34 A2 95 1B 0C C6 "
    "9D 19 40 A2 CB 2D 30 BE "
    "99 53 4C A0 35 9B 3E B2"
)

pre = 0x5A

result = bytearray()

for i, c in enumerate(cipher):
    res = c - i - 3
    res = ((res >> 1) | (res << 7)) & 0xFF
    res ^= pre
    res ^= table[i & 3]

    pre = res
    result.append(res)

print(result)
```

<!-- 这是一张图片，ocr 内容为：IFVALHYYX_QODB@[W!XOE IXIE BYTEARRAY(B' + _CODE\_APPLICATION\MICROSOFT VISUAL STUDIO VS PS BYTEARRAY(B'FLAG{WLZHKHJODQOWMLA5QY}' O PS D:\ VISUAL STUDIO CODE\ APPLICATION\MICROSOFT VI -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/72.png" alt="" style="max-width: 80%; height: auto;">

### 04 户山今日澄
#### 题目
欧耶耶！桃花谢了有玫瑰~饿啊！hey？

谁在遥控我...


<a href="/Download/WpCTF/Comp/Que26/Re/release.zip" download>
    文件
</a>

#### 答案
flag{kasumi_jelly_dance_and_spin}

#### 过程
我真的在疫情中活下来了吗（）

应该能发现，Kasumi是主程序，StorageCore应该是专门用来处理的

##### Kasumi里：
<!-- 这是一张图片，ocr 内容为：*() *)&CONSOLESCREENBUFFERINFO.DWSIZE.X + ZE.X + V12) 三 0; 147 BYTE IF ( V12 三 33 ) 148 } 149 INT)SUB_401650(&CONSOLESCREENBUFFERINFO) ) IF ( UNSIGNED 150 子 151 PUTS("KIRA KIRA! DOKI DOKI! YOU FOUND THE SECRET!"); 152 RETURN O; 153 154 155 ELSE 156 } PUTS("OOPS! THAT DOESN'T SOUND RIGHT. 157 1; 158 RETURN 159 } 160 161 ELSE 162 } PUTS("OOPS! WRONG LENGTH."); 163 1; 164 RETURN 165 166 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/73.png" alt="" style="max-width: 80%; height: auto;">

长度33

判断是sub_401650

##### StageCore里：
<!-- 这是一张图片，ocr 内容为：// RSI *V9; VOID 9 78 INT V10; // EDI V3 : 2; 9 SUB_401C10( LO(ARGC,ARGV,ENVP); 10 IF INT - 2 ) 11 了 12 V7 - ARGV[1]; 13 ', OX15U); V3 - STRNCMP(V7, "LLLL. |\PIPE|\KASUMISTAGE_' 14 IF ( V3 ) 15 了 16 2; 17 RETURN } 18 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/74.png" alt="" style="max-width: 80%; height: auto;">

能看出来，需要在启动exe的时候后面跟一个参数，那么需要回到Kasumi里面找谁给StageCore里传入了值

##### Kasumi里：
<!-- 这是一张图片，ocr 内容为：LABEL 7; 54 GOTO WCSCAT(FILENAME, AS); 55 TICKCOUNT - GETTICKCOUNT(); 56 CURRENTPROCESSID - GETCURRENTPROCESSID(); 57 CURRENTPROCESSID, TICKCOUNT); SUB-401600(MULTIBYTESTR, 128, "LLLLI.I\PIPEL\KASUMISTAGE_%081X %081X", 58 IF ( MULTIBYTETOWIDECHAR(0, O, MULTIBYTESTR, -1, WIDECHARSTR, 128) 59 &&&(INT)SUB-401620(COMMANDLINE, 776, L""%1S\" %1S", FILENAME, WIDECHARSTR) TR)>:0 60 61 && (MEMSET(&PROCESSINFORMATION, O, SIZEOF(PROCESSINFORMATION)), 62 MEMSET(&STARTUPINFO, O, SIZEOF(STARTUPINFO)), 63 STARTUPINFOCB104, CREATEPROCESSW(FILENAME, COMMANDLINE, O, O, O, OXBOEEOOOU, 9, 8STARTUPINFO, 8PROCESSINFORMATION))) ) 64 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/75.png" alt="" style="max-width: 80%; height: auto;">

这里能发现一个奇怪的字符串，\\.\pipe\ ... ... 

这是个管道，符合windows的命名管道的要求，用来在进程间通信

那可以推测出来应该就是用这个管道在Kasumi跟StageCore间通信

<!-- 这是一张图片，ocr 内容为：(PIPE\/KASUMISTAGE_%081X %081X", CURRENTPROCESSID, TICKCOUNT); 58 SUB_401600(MULTIBYTESTR,128, TR, -1, WIDECHARSTR, 128) IF ( MULTIBYTETOWIDECHAR(O, O, MULTIBYTESTR, -1 59 \" %LS", FILENAME, WIDECHARSTR) >: 0 && (INT)SUB_401620(COMMANDLINE, 776, L"\"%1S\" % 60 && (MEMSET(&PROCESSINFORMATION, O, SIZEOF(PROCESSINFORMATION)), 61 MEMSET(&STARTUPINFO, 0, SIZEOF(STARTUPINFO)), 62  STARTUPINFO.CB ; 104, 63 COMMANDLINE, O, O, 0, OX80000000U, O, 0, 8STARTUPINFO, 8PROCESSINFORMATION)) 64 CREATEPROCESSW(FILENA) AME 65 WCHAR FILENAME[264L; // [RSP+360H] [RBP-868H] BYREF V11 80 99 CLOSEHANDLE(PROCESSINFORL"D:IL-HORK STATIONILLCODEXI|CTFI/RELEASELLSTAGECORE.EXE" 67 68 HPROCESS : PROCESSINFORMATION.HPROCESS -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/76.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：它846668 STARTUPINFO.CB 104, PATH W(FILENAME, COMMANDLINE, 0, 0, 0, 0X80OOOOU, 0, 0, 0, 8STARTUPINFO, 8PROCESSINFORMATION)) CREATEPROCESSW(F D:/WORK ST W WCHAR COMMANDLINE[4]; // [RSP+570H] [RBP-658H] BYREF V11 : 80; HPROCESS ; PROCESSINFORMATION.HPROCESS; -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/77.png" alt="" style="max-width: 80%; height: auto;">

此处尝试新建了一个进程，可以看到在尝试打开StageCore，使用的命令是

"D:\__Work_Station\_Codex\CTF\release\StageCore.exe" \\.\pipe\KasumiStage_00001B7C_022F88F7

<!-- 这是一张图片，ocr 内容为：PROCESSINFORMATION.HPROCESS; HPROCESS WHILE ( 1 ) Y 0 FILEA - CREATEFILEA(MULTIBYTESTR, OXCO000000, O, O, 3U, O, 0); 123456 FILEA !: (HANDLE)-1LL ) IF BREAK; IF ( WAITFORSINGLEOBJECT(HPROCESS, O) > SLEEP(0X4BU); IF ( --V11 CONTINUE; 子 9 0 8; GOTO LABEL EI1 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/78.png" alt="" style="max-width: 80%; height: auto;">

这里在尝试连接管道，连接好后就利用FileA控制了

<!-- 这是一张图片，ocr 内容为：81 FILEA; V13 82 IF ( (UNSIGNED INT)SUB_401C10(FILEA) 83 SUB_401CA0(V13, (__INT64)&V14); 84 ((VOID *)(VOID ID *))CLOSEHANDLE)(V13); FASTCALL 85 86 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/79.png" alt="" style="max-width: 80%; height: auto;">

然后现在有俩函数401C10跟401CA0，这俩目前都传入了FileA

<!-- 这是一张图片，ocr 内容为：圆 IDA VIEW-RIP 12345678 BOOL8 FASTCALL SUB_401C10(HANDLE HFILE, _INT16 A2, CONST VOID *A3, DWORD O A4) 了 _BOOL8 RESULT; // RAX : BUFFER; // [RSP+30H] [RBP-28H] BYREF INT B _INT16 V9; // [RSP+34H] [RBP-24H] _INT16 V10; // [RSP+36H] [RBP-22H]  DWORD V11; / [RSP+38H] [RBP-20H] IF ( A4 > 0X200 LL A4 && !A3 ) 9 RETURN O; 10 V10 三 A2; 11 BUFFER ; 1297306443; 12 13 V9 三 1; 14 V11 三 A4; IF ( !(UNSIGNED INT)SUB_401AFO(HFILE, &BUFFER, OXCU) ) 15 RETURN O; 16 17 RESULT ; 1; IF ( A4 ) 18 RETURN (UNSIGNED INT)SUB 401AFO(HFILE, A3, A4) !- O; 19 RETURN RESULT; 20 211 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/80.png" alt="" style="max-width: 80%; height: auto;">

欸会发现，这玩意实际上是需要4个参数的

这玩意先进行一次判断，如果a4大于512 或者 a4为0且a3非空 那么就退出

然后先利用管道处理了Buffer跟0x0C

如果a4不为0的话再用管道处理a3跟a4

<!-- 这是一张图片，ocr 内容为：PSEUDOCD IDAVIEW-RIP FASTCALL SUB-401AFO(HANDLE HFILE, CHAR *IPBUFFER, DWORD NNUMBEROFBYTESTOWRITE) INT64 DWORD V4;// EBX 345 DWORD NUMBEROFBYTESWRITTEN; // [RSP+3CH] [RBP-2CH] BYREF  V4 : NNUMBEROFBYTESTOWRITE; 9  IF ( !NNUMBEROFBYTESTOWRITE ) RETURN 1; WHILE ( 1 ) 9 ] 10 NUMBEROFBYTESWRITTEN : 0; 11 ( !WRITEFILE(HFILE, LPBUFFER, V4, 8NUMBEROFBYTESWRITTEN, 0) 11 ! IF !NUMBEROFBYTESWRITTEN 12 BREAK; 13 LPBUFFER +: NUMBEROFBYTESWRITTEN; 14  V4 - NUMBEROFBYTESWRITTEN; 15 IF ( !V4 16 RETURN -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/81.png" alt="" style="max-width: 80%; height: auto;">

去看401AF0就会发现，这玩意在往管道里面写入

通过俩名字能看出来，前一个是缓冲区，后一个是 有多少需要写入的字节，相当于就是长度

那么再看第一次的 

if ( !(unsigned int)sub_401AF0(hFile, (char *)&Buffer, 0xCu) )

就会发现，这里往外传了12字节而非4字节，也就是说，结合内存地址会发现，这玩意把Buffer、v9、v10、v11，4个全发出去了

v10是参数a2，v11就是长度

第二次调用401AF0就是把传入这个函数的东西写入管道，a3是buffer，a4是长度

同理来看401CA0

<!-- 这是一张图片，ocr 内容为：IDA VIEW-RIP PSEUDOCODE 1 FASTCALL SUB-401CA0(HANDLE HFILE, WORD *A2, VOID *A3, DWORD A4, DWORD *A5) INT64 2  INT BUFFER; // [RSP+20H] [RBP-38H] BYREF _INT16 V11; // [RSP+24H] [RBP-34H] _INT16 V12; // [RSP+26H] [RBP-32H] DWORD NNUMBEROFBYTESTOREAD; // [RSP+28H] [RBP-30H] IF ( !(UNSIGNED INT)SUB_401B80(HFILE, &BUFFER, OXCU) BUFFER!!1297306443 V11 !: 1 10 11 NNUMBEROFBYTESTOREAD > 0X200 12 NNUMBEROFBYTESTOREAD > A4 LL !(UNSIGNED INT)SUB_401B80(HFILE, A3, NNUMBEROFBYTESTOREAD))) ) 13 NNUMBEROFBYTESTOREAD && (!A3 14 0; 15 RETURN 子 16 IF ( A2 ) 17 *A2 : V12; 18 IF ( A5 ) 19 *A5 : NNUMBEROFBYTESTOREAD; 20 RETURN 1; 21 22} -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/82.png" alt="" style="max-width: 80%; height: auto;">

这里是5个参数

<!-- 这是一张图片，ocr 内容为：IDA VIEW-RIP LFASTCALL SUB-401880(HANDLE HFILE, CHAR *LPBUFFER, DWORD NNUMBEROFBYTESTOREAD) 12345 INT64 DWORD V4;// EBX DWORD NUMBEROFBYTESREAD; // [RSP+3CH] [RBP-2CH] BYREF  V4 : NNUMBEROFBYTESTOREAD;  IF ( !NNUMBEROFBYTESTOREAD ) RETURN 1; WHILE ( 1 ) ] 10 NUMBEROFBYTESREAD : 0; 11 !READFILE(HFILE, LPBUFFER, V4, &NUMBEROFBYTESREAD, 0) IF ( !REA !NUMBEROFBYTESREAD ) 12 BREAK; 13  LPBUFFER +: NUMBEROFBYTESREAD; 14 15  V4 -: NUMBEROFBYTESREAD; IF ( !V4 ) 16 RETURN 1; 17 子 18 O; RETURN 19 20 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/83.png" alt="" style="max-width: 80%; height: auto;">

401B80是在读取文件

再结合前面的判断，相当于说的就是，先通过缓冲区把东西读进Buffer，如果检测到前面写入的Buffer+v9+v10+v11这个文件头，就把后面剩下的东西读进a3，把文件头的v10那个位置的值存入a2，长度存入a5

a4就是限制读取长度用的

那么现在需要把401650重新编译一下（读取和写入的参数量都不对）

<!-- 这是一张图片，ocr 内容为：FILEA; 97 IF ( !SUB_401C10(FILEA, 1, (CHAR *)&V20 + 4, 0XCU) ) ) 98 GOTO LABEL_25; 99 COMMANDLINE, OX200U, (DWORD *)&V20) ) IF ( !(UNSIGNED INT)SUB_401CA0(V15, &V19, 100 LABEL_25; 101 GOTO IF ( V19 !: 2 ) 102 GOTO LABEL_25; 103  IF ( (_DWORD)V20 !- 1 ) 104 GOTO LABEL_25; 105 IF ( LOBYTE(COMMANDLINE[0]) ! 1 ) 106 GOTO LABEL_25; 107 IF ( !SUB_401C10(V15, 3, (CHAR *)V26, 0XC6U) 108 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/84.png" alt="" style="max-width: 80%; height: auto;">

这里把rsp+0x70开始的12字节发过去

<!-- 这是一张图片，ocr 内容为：39 V1 三 ASC_4058; V2 三 0; 112; V21 三 V22 三 56; V20 0X6300000000LL; 三 V19 三 0; -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/85.png" alt="" style="max-width: 80%; height: auto;"><!-- 这是一张图片，ocr 内容为：二 [RSP+6AH] [RBP-B5EH] INT16 22233 BYRE V19;  // [RSP+6CH] [RBP-B5CH] INT64 BYRE V20 [RBP-B54H] [RSP+74H] INT V21; [RBP-B50H] // [RSP+78H] INT V22; 24  INFORMATION PROCESSINFORMA PROCESS STRUCT -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/86.png" alt="" style="max-width: 80%; height: auto;">

也就是0x63（99）、112、56

注意看输出就会发现其实就是

<!-- 这是一张图片，ocr 内容为：KASUMI'S LITTLE STAGE - 99 FRAMES. ONE LE ONE LITTLE SECRET. EVERY THREE BEATS HIDE A LITTLE STORY. ENTER THE 33-CHARACTER SECRET: D:\_WORK_STATION\_CODEX\CTF\RELEASE>STAGECORE D:\__WORK_STATION\_CODEX\CTF\RELEASE>KASUMI B THE WINDOW TO SEE THE FULL 112X56 STAGE - PLAYING ANYWAY. [TIP] MAXIMIZE OR FULLSCREEN (F11) -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/87.png" alt="" style="max-width: 80%; height: auto;">

帧数、长、宽

再从那边接收最多512长度的字节存入CommandLine，

然后判断头文件v10的位置是否是2（这里大致能看出来大概率是信息类型）

检测长度是否是1

然后看此次传过来的1长度的数据是否是1

<!-- 这是一张图片，ocr 内容为：00000000006AF650 00 10 10 00 00 0000 0000 00 00 00 00 00 5F 01 5F 3A 5C 00 57 00 00 00 00 6F 00 00 00000000006AF660 44 .W.O. 00 _.S.T.A.T.I. 61 53 7400 72 00 5F 74 6900 00 00 00 6B 00 00 00000000006AF670 5C 64 65 6F 00 5F 6E 00 00 C.O.D.E. 6F 43 00 00 00 00 O.N.\. 00 00000000006AF680 43 54 5C 78 AA 5C 72 65 AA AA AA AA 46 AA AA 040004000464F699 AA -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/88.png" alt="" style="max-width: 80%; height: auto;">

（确实是）

这大概是确认是否成功接收到前面的信息了

<!-- 这是一张图片，ocr 内容为：25; 107 LABEL GOTO IF ( !SUB_40 )V26, 0XC6U) ) 6_401C10(V15, 3, (CHAR 108 GOTO LABEL_25; 109 COMMANDLINE, 0X200U, (DWORD *)&V20) ) IF ( !(UNSIGNED INT)SUB_401CA0(V15, &V19, 110 O LABEL_25; 111 GOTO L , V19 !: 4 ) IF 112  GOTO LABEL_25; 113  IF ( (_DWORD)V20 !- 33 ) 114 GOTO LABEL_25; 115 : 13; V16 116 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/89.png" alt="" style="max-width: 80%; height: auto;">

然后再发，这次发的是v26，一共198位

<!-- 这是一张图片，ocr 内容为：V1 : ASC_405058; 612345 V2  0; V21 ; 112; V22 三 56; 0X6300000000LL; V20 三 V19 三 0; 6789 WHILE ( 1 ) V3 三 V1 + 6272; 三0; V4 01234 OP *V1++ !二 32; V5 *二 V5; V4 +川 了 4567 V3 !- V1 ); WHILE V26[V2++] 三 V4; IF ( V2 - 99 ) 89 BREAK; OFF_49CF60[V2]; V1 三 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/90.png" alt="" style="max-width: 80%; height: auto;"><!-- 这是一张图片，ocr 内容为：RDATA:000000000049CF49 ALIGN 20H .RDATA:000000000049CF60 OFF_49CF60 DQ OFFSET ASC_405058 RDATA:000000000049CF60 RDATA:00000000049CF60 .RDATA:00000000049CF68 DQ OFFSET 406B40 ASC OFFSET DQ 4083C8 RDATA:000000000049CF70 ASC OFFSET DQ 409C50 RDATA:000000000049CF78 ASC OFFSET ASC RDATA:000000000049CF80 40B4D8 BP OFFSET .RDATA:00000000049CF88 ASC_40CD60 BP OFFSET 40E5E8 BP RDATA:000000000049CF90 ASC DQ OFFSET RDATA:000000000049CF98 ASC 40FE70 OFFSET BP 4116F8 RDATA:000000000049CFA0 ASC DQ OFFSET RDATA:000000000049CFA8 ASC_412F80 OFFSET BP RDATA:000000000049CFB0 ASC_414808 OFFSET ASC_416090 RDATA:000000000049CFB8 BP OFFSET RDATA:000000000049CFC0 ASC_417918 BP OFFSET DQ RDATA:000000000049CFC8 4191A0 ASC DQ OFFSET RDATA:000000000049CFD0 ASC 41AA28 OFFSET RDATA:000000000049CFD8 41C2B0 BP ASC .RDATA:00000000049CFEO DA OFFSET 41DB38 ASC (SYNCHRONIZED 000000000049CF60: .RDATA:OFF 49CF60 0009B160 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/91.png" alt="" style="max-width: 80%; height: auto;">

v26源于此处，6272 = 112 * 56

v1一开始是asc_405058但结合off_49CF60的遍历能推出来，应该就是遍历那99张图片，其中v4的累加是v1这个值是否不等于32也就是空格，也就是说这里在统计一帧中有多少非空格字符（有一说一知道这玩意干啥（）反正也是debug直接获取值的（））

<!-- 这是一张图片，ocr 内容为：00000000006AF270 40 23 20 20 20 20 20 20 20 20 20 20 20 20 20 20 B1057F05 00000000006AF280 76 75 05 3C 05 B4 05 90 78元 05 B8 05 ..X.V.<.... .U. E8 CC08 08 0A07 42 6106 00000000006AF290 73 A...B.......S.. 60 90元 60 60 60 98 ,.N.......+...V. 09 F7 08 17 09 A5 07 4E 5606 00000000006AF2A0 60 02 86 08 8.....0.....W.. 77 F104 4F 05 05 05 CA 00000000006AF2B0 B3 38 05 05 88元 90 十 S AR AF AG AAAAAAAAAA6AF2CA 8D A5 53 D7 74 A5 A7 A6 FF A6 DR AF DD UNKNOWN 00000000006AF280: STACK[00068E0]:00000000006AF280 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/92.png" alt="" style="max-width: 80%; height: auto;">

```python
v26 = [
    1457, 1407, 1400, 1398, 1340, 1460, 1464, 1653, 1633, 1802, 2114,
    2252, 2280, 2313, 2419, 2448, 2469, 2382, 2295, 2327, 2200, 2091,
    1794, 1622, 1592, 1482, 1459, 1359, 1416, 1440, 1399, 1265, 1363,
    1495, 1652, 1757, 1791, 2011, 2264, 2319, 2388, 2278, 2323, 2396,
    2376, 2206, 2067, 2078, 1890, 1747, 1525, 1448, 1401, 1363, 1406,
    1291, 1351, 1309, 1398, 1379, 1488, 1839, 1859, 2091, 2031, 2111,
    2291, 2332, 2326, 2258, 2258, 2234, 2121, 1971, 1770, 1743, 1560,
    1463, 1358, 1274, 1361, 1330, 1328, 1281, 1310, 1393, 1501, 1602,
    1649, 2079, 2246, 2192, 2168, 2200, 2345, 2326, 2314, 2149, 2065,
]
```

然后接受了33位，存到CommandLine里面

<!-- 这是一张图片，ocr 内容为：( !SUB_401C10(V15, 3, (CHAR *)V26, 0XC6U) IF(!S GOTO LABEL_25; *)&V20) IF !(UNSIGNED INT)SUB_401CA0(V15, &V19, COMMANDLINE, OX200U, (DWORD LABEL 25; GOTO A3: WCHAR COMMANDLINE[4]; // [RSP+570H] [RBP-658H] BYREF 401650:100 (401983) 00000D83 SUB {0XADADU,0XF647U,0X92F8U,0X6806U} LEX VIEW-1 0000006AF630 20 20 20 20 20 20 20 20  23 20 20 20 20 20 2 00 63 01 00 900000000 3000006AF640 000000000 000000 10100000000 00000000000000 00000000 3000006AF650 AD AD 47 F8 92 06 68 62 21 14 27 38 27 D0 6A ..G....HB!.'8'.. 3000006AF660 BA AD 8C ED 82 49 DB 7C C3 DD 8B 93  75 F6 E7 3000006AF670 45006E005C005F00 43006F0064006500 0000006AF680 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/93.png" alt="" style="max-width: 80%; height: auto;">

```python
received = bytes.fromhex(
    "AD AD 47 F6 F8 92 06 68 62 21 14 27 38 27 D0 6A "
    "BA AD 8C ED 82 49 DB 7C C3 DD 8B 93 E3 75 F6 E7 "
    "45"
)
```

然后下面开始处理输入

<!-- 这是一张图片，ocr 内容为：115 LABEL GOTO V16 : 13; 116 V17 三 0; 117 *)COMMANDLINE; *(_QWORD *)WIDECHARSTR 三 * *(_QWORD 118 119 V28 三 V34; 120 V29 三 V35; V30 : V36; 121 122 V31 - V37; 123 OP 124 *)WIDECHARSTR + V17), 3); )(A1 (*(_BYTE ((_BYTE V17) ROL1 V18 V16 125 十 V16 +三 7; 126 *)FILENAME + V17+) : V18; BYTE 127 小 128  WHILE ( V17 !: 33 ); 129 IF ( SUB_401C10(V15, 5, (CHAR *)FILENAME, OX21U) 130 INT)SUB_401CA0(V15, &V19, COMMANDLINE, OX200U, (DWORD && (UNSIGNED )&V20) 131 && V19 三 6 132 (_DWORD)V20 -: 1 ) && 133 子 134 ; LOBYTE(COMMANDLINEF01) 三 1; V7   -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/94.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为：L;// COMMANDLINE[4]; WCHAR [RSP+570H] _INT64 V34; // [RSP+578H] [RBP-650H] _INT64 V35; // [RSP+580H] [RBP-648H] _INT64 V36; // [RSP+588H] [RBP-640H] // [RSP+590H] [RBP-638H] CHAR -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/95.png" alt="" style="max-width: 80%; height: auto;">

能看出来，v34、v35、v36、v37就是返回值的+8、+16、+24、+32

这里很简单，就是输入值逐位与返回值对应位置异或后循环左移3，再加上13+7 * i  

然后再发出去，这次接收的就是是否是正确的了，因此判断还得去另一边看看

##### StageCore：
<!-- 这是一张图片，ocr 内容为：NAMEDPIPEA - CREATENAMEDPIPEA(V7, 3U, 8U, 8U, OX800U, OX800U, OX2710U, 0); 21 NAMEDPIPEA; 22 V9  NAMEDPIPEA -: (HANDLE)-1LL ) IF 23 24 RETURN 3; 25 子 26 ) : 535 ) ELSE IF ( CONNECTNAMEDPIPE(NAMEDPIPEA, 0) L GETLASTERROR() 27 28 V10 : SUB_4015B0(V9); 29 FLUSHFILEBUFFERS(V9); 30 DISCONNECTNAMEDPIPE(V9); 31  CLOSEHANDLE(V9); 32 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/96.png" alt="" style="max-width: 80%; height: auto;">

可以看到这里是创建了一个管道然后扔给了v9，v9将这玩意扔到了sub_4015B0里面

找到对应的read函数（找到后记得read跟write在4015B0里也得重编译一下，又是不全的）

<!-- 这是一张图片，ocr 内容为：IDA VIEW-RIP PSEUDOCODE-A 12345678901 FASTCALL SUB 4019EO(HANDLE HFILE, WORD *A2, VOID *A3, DWORD INT64 A5 A4,DWORD INT BUFFER; // [RSP+20H] [RBP-38H] BYREF _INT16 V11; // [RSP+24H] [RBP-34H] _INT16 V12; // [RSP+26H] [RBP-32H] DWORD NNUMBEROFBYTESTOREAD; // [RSP+28H] [RBP-30H] IF ( !(UNSIGNED INT)SUB_4018CO(HFILE, &BUFFER, OXCU) BUFFER !: 1297306443 V11 !: 1  NNUMBEROFBYTESTOREAD > O 0X200 12 NNUMBEROFBYTESTOREAD > A4 NUMBEROFBYTESTOREAD && (LA3 (L (L (UNSIGNED INT)SUB,4018CE(HFILE, A3, NNUMBEROFBYTESTOREAD)) ) 13 14 15 RETURN 0; 16 IF ( A2 ) 17 18  *A2 三 V12; IF( A5 ) 19  *A5 : NNUMBEROFBYTESTOREAD; 20 RETURN 1; 21 22 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/97.png" alt="" style="max-width: 80%; height: auto;">

会发现跟另一边的接收完全一致

直接找第三次调用（因为对应那边是第三次发送）

<!-- 这是一张图片，ocr 内容为：IDA VIEW-RIP IF ( _401950(HFILE, 4, &V16[1], 0X21U) !SUB 64 !(UNSIGNED INT)S 0(HFILE, &V15, V18, 0X200U, V16) )SUB 4019E0(H 65 V15 !: 5 66 V16[0] !:33 ) 67 68 RETURN 0; 69 子 70 71 V9 0; 72 V10 73 V11 90; 74 OP ] 75 + V9) A BYTE_405090[(5 * (_BYTE)V9 + 3) & 0XF]); _INT8)(*(_BYTE * 76 *)V18+ V12 - (UNSIGNED _ROL1_(V12, V9 % 5 + 1); LOBYTE(V12) 三 77 V11 人: V12; 78 V13 : BYTE_405060[V9++] A V11; 79 V10 |- V13; 80 子 81  WHILE ( V9 !: 33 ); 82 二0; 83 V14 三 V10  SUB_401950(HFILE, 6, &V14, 1U); 84 RETURN SUT 85 -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/98.png" alt="" style="max-width: 80%; height: auto;">

比较对象是byte_405060

```python
target = bytes.fromhex(
    "42 6F 2C 2F 28 7F 61 EC 93 56 EC E8 90 D3 A3 04 "
    "F7 64 0B 06 FC 6A 21 27 3F 8C 08 69 F3 3A 22 3F "
    "71"
)
```

处理方式是，前面处理过的数据，逐位先跟405090的(5 * i + 3) & 0xF这个位置做异或后循环左移i % 5 + 1这么多，再跟v11异或，然后再跟405060比较  

```python
table = bytes.fromhex(
    "80 F5 9E 67 4E 63 A7 7D 69 D7 1C 0A 54 24 75 FC"
)
```

两次处理结合起来就是完整的处理方式

可以逆了

```python
target = bytes.fromhex(
    "42 6F 2C 2F 28 7F 61 EC 93 56 EC E8 90 D3 A3 04 "
    "F7 64 0B 06 FC 6A 21 27 3F 8C 08 69 F3 3A 22 3F "
    "71"
)

table = bytes.fromhex(
    "80 F5 9E 67 4E 63 A7 7D 69 D7 1C 0A 54 24 75 FC"
)

received = bytes.fromhex(
    "AD AD 47 F6 F8 92 06 68 62 21 14 27 38 27 D0 6A "
    "BA AD 8C ED 82 49 DB 7C C3 DD 8B 93 E3 75 F6 E7 "
    "45"
)

res1 = []
res2 = []

def ror8(tar, n):
    '''
    immitate the 'ROR1' in C\n
    rotate the lower 8 bits of 'tar' right (circular shift)
    '''
    n &= 7
    tmp = tar
    tar &= 0xFF

    return (tmp & ~0xFF) | (((tar >> n) | (tar << (8 - n))) & 0xFF)

state = 90
for i, c in enumerate(target):
    tmp = c ^ state
    tmp = ror8(tmp, i % 5 + 1)
    res1.append(tmp ^ table[(5 * i + 3 & 0xF)])

    state = c

for i, c in enumerate(res1):
    tmp = (c - 13 - 7 * i) & 0xFF
    tmp = ror8(tmp, 3)
    tmp = tmp ^ received[i]

    res2.append(chr(tmp & 0xFF))

print("".join(res2))
```

<!-- 这是一张图片，ocr 内容为：PS D:\_VISUAL_STUDIO_CODE\_ APPLICATION  FLAG{KASUMI_JELLY_DANCE_AND_SPIN} O PS D:\_VISUAL STUDIO CODE\ APPLICATIOR -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/99.png" alt="" style="max-width: 80%; height: auto;">





