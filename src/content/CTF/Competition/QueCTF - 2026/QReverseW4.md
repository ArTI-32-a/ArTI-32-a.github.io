---
title: Reverse - Week4
status: draft
pubDate: 2026-11-04
type: Reverse
tags: []
---
### 01 O神之一手
#### 题目
一花一叶一菩提，轮回皆是一场迷……

你说得对，但是《O神之一手》是一款……

等等，你下棋给我下好了呀？

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

#### 答案


#### 过程
这下应用真的没啥用了（）就一个10秒cps测试器（）

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/28.png" alt="" style="max-width: 80%; height: auto;">

也是直接就看到了个FlagActivity，进去就是密文跟IV（先猜一手AES）

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

而key是new SecretKeySpec(bArr, "SM4")这里实例化的

bArr源于传入参数bArr，这个又源于this.key.clone()

尝试debug获取，但是

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/Que/2026W4Re/31.png" alt="" style="max-width: 80%; height: auto;">

这里入口并不是FlagActivity而是MainActivity，需要重新打包一下变成以FlagActivity作为起始



### 03 tinyvm
#### 题目
きみはふわふわ、もちもち、あま〜い香りのする、ちっちゃくてシンプルなVMちゃんだよ♡

#### 答案


#### 过程


### 04 户山今日澄
#### 题目
欧耶耶！桃花谢了有玫瑰~饿啊！hey？

谁在遥控我...

#### 答案


#### 过程


