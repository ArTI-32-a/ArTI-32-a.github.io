---
title: "2026 - Individual"
pubDate: 2026-04-12
tags: ["meiya cup", "2026"]
status: "draft"
---
 - 2026.03.20 start

 - 2026.04.12 finish

## 检材密码
FEYn0MJLYy9zTQRFHlXGRkVqXv3IkE8h

## 全题
### 01 # 请你使用CHAN_MH.zip检材回答以下问题这个智能手机是什么操作系统?
A. iOS 17.1.1

B. iOS 17.2.1

C. iOS 17.3.1

D. iOS 17.0.1

#### 答案
A

#### 过程

<img src="/Picture/WpDF/Meiya/2026Individual/1.png" alt="" style="max-width: 80%; height: auto;">

### 02 在这个手机中，有多少组国际移动设备识别码(IMEI)号码? (请以阿拉伯数字作答)
#### 答案
2

#### 过程
先全局搜索IMEI，找到一串疑似的号码

而后全局搜索得到的这串号码

357328098205226

即可找到


<img src="/Picture/WpDF/Meiya/2026Individual/2.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/3.png" alt="" style="max-width: 80%; height: auto;">

### 03 承上题，以下哪一个才是正确的国际移动设备识别码(IMEI)号码?
#### 答案
A

#### 过程
承上题可得

357328098205226

### 04 请指出最后使用的使用者身分模组(SIM)的集成电路卡识别码(ICCID)
#### 答案
A

#### 过程
由题，去sim卡信息里面找


<img src="/Picture/WpDF/Meiya/2026Individual/4.png" alt="" style="max-width: 80%; height: auto;">

### 05 请指出最后使用的Apple ID是多少？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
whoishogan@gmail.com

#### 过程

<img src="/Picture/WpDF/Meiya/2026Individual/5.png" alt="" style="max-width: 80%; height: auto;">

### 06 蓝牙模组中的蓝牙地址是多少？(请以下格式作答:xx:xx:xx:xx:xx:xx)
#### 答案
f8:38:80:bb:f5:28

#### 过程
并非在火眼的分析 -> 蓝牙 里面

总共1000多条（）
<img src="/Picture/WpDF/Meiya/2026Individual/6.png" alt="" style="max-width: 80%; height: auto;">

在文件里面找到CHAN MH mobile后，在根目录下面有一个iDevice_info.txt，这里面存的是设备信息

可以在其中找到bluetooth


<img src="/Picture/WpDF/Meiya/2026Individual/7.png" alt="" style="max-width: 80%; height: auto;">

### 07 这个智能手机曾经启动「个人热点」分享网络，请问他的「热点」名称？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
iPhone

#### 过程
原理是，iPhone的热点不支持改热点名，因此热点名就是本机名（？）


<img src="/Picture/WpDF/Meiya/2026Individual/8.png" alt="" style="max-width: 80%; height: auto;">

### 08 这个智能手机没有连接过以下哪一个服务集标识符(SSID)
A. Hongn Home

B. CMHK

C. 1010 free wifi

D. ErrorError

#### 答案
A

#### 过程
Service Set Identifier ，即SSID，意思就是wifi名字

在wifi连接记录里面能看到


<img src="/Picture/WpDF/Meiya/2026Individual/9.png" alt="" style="max-width: 80%; height: auto;">

以及，根据第9题题干得出CMHK也被用过（事实上这个网络应该并不存在吧（））

### 09 × 请指出首次连接服务集识别码(SSID)名称为" CMHK"的无线区域网络(Wi-Fi)的日期及时间(请以GMT +8时区及以下格式作答: yyyy-MM-dd HH:mm:ss)
#### 无答案，似乎题存在问题
### 10 安装了以下即时哪个通讯软件?i) WhatsAppii) WeChatiii) WhatsApp Businessiv) QQ
A. 只有 i) 和 ii)

B. 只有 i), ii) 和 iii)

C. 只有 i), ii) 和 iv)

D. 以上皆是

#### 答案
A

#### 过程

<img src="/Picture/WpDF/Meiya/2026Individual/10.png" alt="" style="max-width: 80%; height: auto;">

### 11 承上题，请指出即时通讯软件"WhatsApp"的版本(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
2.25.14.79

#### 过程
虽然在火眼里面看似是

731647702.0

这坨东西，但事实上并不对

错误示范（）
<img src="/Picture/WpDF/Meiya/2026Individual/11.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/12.png" alt="" style="max-width: 80%; height: auto;">

应去配置文件查找（这我怎么找得到口丫）

具体路径在这里

CHAN_MH_mobile.tar/var/mobile/Applications/group.net.whatsapp.WhatsApp.shared/Library/Preferences/group.net.whatsapp.WhatsApp.shared.plist


<img src="/Picture/WpDF/Meiya/2026Individual/13.png" alt="" style="max-width: 80%; height: auto;">

/var/mobile/Applications/

这个路径下面存的应该就是iPhone手机的应用的包的信息了

### 12 陈民浩的手机中，总共安装3个文件传输软件，封包名称分别为com.apple.Sharing.AirDropUI、com.lenovo.anyshare、com.estmob.paprika，其中有哪一个软件曾经用来传送/接收文件功能?
A. com.apple.Sharing.AirDropUI

B. com.lenovo.anyshare

C. com.estmob.paprika

#### 答案
C

#### 过程
既然上题找到了应用文件的位置所在地，题目也给了应用的包名，不妨在此处找一下应用包

A根本搜不出来（真的装了吗？？）

B和C倒是能搜出来

A

<img src="/Picture/WpDF/Meiya/2026Individual/14.png" alt="" style="max-width: 80%; height: auto;">

B

<img src="/Picture/WpDF/Meiya/2026Individual/15.png" alt="" style="max-width: 80%; height: auto;">

C

<img src="/Picture/WpDF/Meiya/2026Individual/16.png" alt="" style="max-width: 80%; height: auto;">

能在C的document里面确实找到文件


<img src="/Picture/WpDF/Meiya/2026Individual/17.png" alt="" style="max-width: 80%; height: auto;">

B里面的document文件夹下面没有直接存有文件，在子文件夹bigoad里面的子文件夹files里面存的文件也不太像正常传输的文件（相比于Cdocument里面的文件）


<img src="/Picture/WpDF/Meiya/2026Individual/18.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/19.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/20.png" alt="" style="max-width: 80%; height: auto;">

### 13 承上题，与其有传送/接收过资料装置的装置ID是多少? (请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
5402313593439

#### 过程
位于/com.estmob.paprika/Library下的com.estmob.sendanywhere.sdk.database.realm这个文件


<img src="/Picture/WpDF/Meiya/2026Individual/21.png" alt="" style="max-width: 80%; height: auto;">

可以看出来，ID是

5402313593439


<img src="/Picture/WpDF/Meiya/2026Individual/22.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/23.png" alt="" style="max-width: 80%; height: auto;">

上面四个文件夹，Application Support应该是依赖项，Cookies是网络应用层的文件，Webkit里面存的是WebsiteData网站数据，Preferences里面应该是没有和“传输记录”相关的

第7个文件com.estmob.sendanywhere.sdk.database.realm中间有一个sendanywhere怀疑和传输相关

### 14 承上题，这个装置名称是?(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
Samsung SM-G930F

#### 过程
确实承上题

### 15 承上题，本机装置的装置ID是多少?(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
3836403626142

#### 过程
由题，找本机ID

因此要去找属性

.plist文件用来存放属性的列表（应该是property list罢）

在该程序包的preference文件夹里面有一个文件是properties

其中能找到一行是device id


<img src="/Picture/WpDF/Meiya/2026Individual/24.png" alt="" style="max-width: 80%; height: auto;">

### 16 承上题，陈民浩的手机(CHAN_MH_mobile.zip)是传送方或是接收方?
A. 传送方

B. 接收方

C. 传送及接收方

#### 答案
B

#### 过程
由前面哪个数据库里其他页的信息可知，传输的内容的文件格式是  
Screenshot_20250423-105307_Gallery.jpg，而且仅有这一种格式  
因此怀疑是别的手机传入的，这是Android文件的截图格式，iPhone应为IMG_xxxx的格式


<img src="/Picture/WpDF/Meiya/2026Individual/25.png" alt="" style="max-width: 80%; height: auto;">

### 17 根据传送档案的名称，判断是以下哪一类型? (单选)
A. 屏幕截图

B. 手机拍摄影片

C. PDF文件

D. zip压缩文件

#### 答案
A

#### 过程
接上面，screenshot

### 18 承上题，接收至哪一个装置?
A. CHAN_MH_mobile.zip

B. blk0_sda.bin

C. FUNG_CC_mobile.zip

D. LAM_KH_Mobile.zip

E. WONG_CW_mobile.zip

#### 答案
B

#### 过程
虽然B依旧在加载（搜的好慢口丫），但是剩下几个都没有对应文件


<img src="/Picture/WpDF/Meiya/2026Individual/26.png" alt="" style="max-width: 80%; height: auto;">

既然已知该文件在blk0里面（主要是搜了20分钟搜不出来），又得知该文件是jpg，不妨去文件分类里面去找，然后找文件地址

发现会有两个，一个存在DCIM里面，一个存在clipboard里面  
DCIM是和相机图库相关的文件夹，略过  
另一个clipboard指的是剪切板

这里就可以确认肯定是blk0传过去的了


<img src="/Picture/WpDF/Meiya/2026Individual/27.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/28.png" alt="" style="max-width: 80%; height: auto;">

### 19 承上题，传送方是通过此文档传输软件的哪个模式作出传送?
A. SEND_PARTIALLY

B. SEND_PAPRIKA

C. SEND_DIRECTLY

D. SEND_BYCLOUD

E. SEND_BLUETOOTH

#### 答案
C

#### 过程
由题，既然是blk0手机传过去的，那应该去blk0里面找

既然是由com.estmob.sendanywhere这个程序接收的，这玩意不像邮件，那也应该由这个程序发出（微信发出总不能QQ收吧）

联系13、14题，这种信息应该也是存放在数据库里面的

去该程序下面的sqlite文件分类里面找

虽然我本来想找带transfer这种字的，结果没找到，于是从上往下翻了一下，在main.db里面找到了（其实找这种东西可以只看标题来确认有没有的）


<img src="/Picture/WpDF/Meiya/2026Individual/29.png" alt="" style="max-width: 80%; height: auto;">

### 20 从来没有安装以下哪个网络浏览器？
A. Safari

B. Chrome

C. Firefox

D. edge

#### 答案
BCD

#### 过程
抱怨先抱怨一下18题怎么搜了块50分钟还没搜出来？！

<img src="/Picture/WpDF/Meiya/2026Individual/30.png" alt="" style="max-width: 80%; height: auto;">

既然21问了safari，肯定用过，A排除

Firefox全局搜都没搜到

在application里搜索edge只有edge的数据库

chrome更是查无此人

为了确认确实能搜出来，safari在application确实是能搜出来的


<img src="/Picture/WpDF/Meiya/2026Individual/31.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/32.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/33.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/34.png" alt="" style="max-width: 80%; height: auto;">

### 21 承上题，网络浏览器Safari有多少个书签(Bookmark)记录？(请以阿拉伯数字作答)
#### 答案
9

#### 过程
送分题，直接去分析里面就能看到


<img src="/Picture/WpDF/Meiya/2026Individual/35.png" alt="" style="max-width: 80%; height: auto;">

### 22 承上题，曾经通过Safari浏览器用下列哪一个字词进行过搜索?
A. 非法处理尸体最高刑罚

B. escape room hong kong

C. cypto wallet

D. 非法处理尸体

#### 答案
ABC

#### 过程
送分题，直接看搜索历史就行了

可以看出来，并没有第四个


<img src="/Picture/WpDF/Meiya/2026Individual/36.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/37.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/38.png" alt="" style="max-width: 80%; height: auto;">

### 23 有多少个图片文件曾经储存到iCloud?(请以阿拉伯数字作答)
#### 答案
2

#### 过程
火眼里面找不到iCloud（这么重要的东西居然没有）

CHAN_MH_mobile.tar/var/mobile/Library/Mobile Documents/com~apple~CloudDocs

这是路径（真没想到路径里面连icloud都没有，在var里面都没搜出来，下次得搜cloud了）

里面存有两张照片


<img src="/Picture/WpDF/Meiya/2026Individual/39.png" alt="" style="max-width: 80%; height: auto;">

### 24 相册中有多少张图片是通过屏幕截图功能取得？(请以阿拉伯数字作答)
#### 答案
15

#### 过程
送分题，分析里面能直接看到


<img src="/Picture/WpDF/Meiya/2026Individual/40.png" alt="" style="max-width: 80%; height: auto;">

### 25 # 请参考参赛材料FUNG_CC_mobile.zip回答以下问题这部智能手机连接过多少个 Wi-Fi 网络？(请以阿拉伯数字作答)
#### 答案
2

#### 过程
首先是解开密码，密码我是试出来的（据说备份多用4或6位），然后我试了0000、1111、2222、...、1234，就把俩需要解密的都试出来了（运气好这一块（）） 

解开密码就是送分题，分析里面能直接看到


<img src="/Picture/WpDF/Meiya/2026Individual/41.png" alt="" style="max-width: 80%; height: auto;">

### 26 这部智能手机曾经连接过以下哪个无线网络？i) THREE_WIFIii) wanchaiiii)iPhone(2)iv) Router
A. 只有 i)

B. 只有 ii) 和 iii)

C. 只有 ii), iii) 和 iv)

D. 以上皆是

#### 答案
B

#### 过程
承接上题

### 27 这部手提手机最早连接(非热点)Wi-Fi的时间是什么？(请以GMT +8时区及以下格式作答: yyyy-MM-dd HH:mm:ss)
#### 答案
2025-04-15 19:29:23

#### 过程
首先，不能在WiFi连接记录里面看，因为这里显示的是最后连接时间


<img src="/Picture/WpDF/Meiya/2026Individual/42.png" alt="" style="max-width: 80%; height: auto;">

题目说非热点，前文提到过（第7题），iPhone的热点名就是iPhone，因此这里的iPhone是热点，排除

全局搜索WiFi名，6条信息，有4个文件名跟wifi挂钩


<img src="/Picture/WpDF/Meiya/2026Individual/43.png" alt="" style="max-width: 80%; height: auto;">

第一个文件里面没时间信息

第二个（搜索信息4和5是一个文件）和第三个里面都有时间信息，在对应的wifi下有一个addat，信息都是一样的

得知时间是

2025-04-15 11:29:23

第二个

<img src="/Picture/WpDF/Meiya/2026Individual/44.png" alt="" style="max-width: 80%; height: auto;">

第三个

<img src="/Picture/WpDF/Meiya/2026Individual/45.png" alt="" style="max-width: 80%; height: auto;">

但是由于GMT +8，所以是

2025-04-15 19:29:23

（真坑啊）

### 28 承上题，请列出这个连接的服务集识别码(SSID)?(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
wanchai

#### 过程
SSID，Service Set Identifierss，人话即为名称

名称上面展示过

### 29 承上题，请列出这个连接的登入金钥?(请依照参赛材料中的原文作答，注意区分大小写、空格及符号？
#### 答案
#### 过程
登入金钥意思就是密码（为此还专门问了deepseek（））

那就去火眼密码里面查找就行了


<img src="/Picture/WpDF/Meiya/2026Individual/46.png" alt="" style="max-width: 80%; height: auto;">

### 30 相册中有两张图像互换格式图片(gif)「IMG_0057.GIF」及「IMG_0062.GIF」，请指出由哪一个软件拍摄?
A. Infltr

B. Discreet

C. Meitu

D. Prisma

#### 答案
A

#### 过程
分析里面直接能看到


<img src="/Picture/WpDF/Meiya/2026Individual/47.png" alt="" style="max-width: 80%; height: auto;">

### 31 曾经以空投(AirDrop)方式成功传送了文件到另外一个装置，以下哪一个陈述是正确的？
A. 传送了一个图片文件

B. 传送了两个图片文件

C. 传送了一个图片文件及一个文件

D. 传送了一个图片文件及两个文件

#### 答案
C

#### 过程
（网上查到的）

airdrop分为前端和后端，俩包名分别是

com.apple.UIKit.activity.AirDrop

com.apple.sharingd

全局搜索这两条信息

前面一项命中了1个文件，后面一项命中了5个文件


<img src="/Picture/WpDF/Meiya/2026Individual/48.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/49.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/50.png" alt="" style="max-width: 80%; height: auto;">

先查看首个文件interactionC.db（以后再有查Airdrop就可以直接找interactionC.db了（））

这个文件的路径在

FUNG_CC_mobile.tar\var\mobile\Library\CoreDuet\People\interactionC.db

打开数据库后，在筛选数据里面将刚刚用来命中文件的包名输入后，出现两条信息

这里面显示了两个包名，根据34，一个是文件，一个是照片，推断一个文件一个照片


<img src="/Picture/WpDF/Meiya/2026Individual/51.png" alt="" style="max-width: 80%; height: auto;">

### 32 . 原生APP「相片」中，有一个图片文件曾经通过空投"AirDrop"方式成功传送，请指出这个图片文件的文件全名(请包含扩展名，依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
#### 过程
（网上查到的）

需要去找到相片的数据库找信息，去找数据库Photos（这个事实上直接在分析里面定位到源文件就可以直接定位到数据库，不用那么麻烦去找）


<img src="/Picture/WpDF/Meiya/2026Individual/52.png" alt="" style="max-width: 80%; height: auto;">

然后找到ZASSET，里面唯一一个跟分享挂钩的是ZLASTSHAREDDATA（最后分享日期），找到唯一一个不是NULL的是IMG_0083.HEIC


<img src="/Picture/WpDF/Meiya/2026Individual/53.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/54.png" alt="" style="max-width: 80%; height: auto;">

### 33 承上题，请写出这个图片文件的开始传送的日期及时间？(请以GMT +8时区及以下格式作答: yyyy-MM-dd HH:mm:ss)
#### 答案
2025-04-17 09:10:03

#### 过程
上一题给出了一个数值766545003，这个数值是一个时间戳，是从格林尼治时间2001年1月1日 00:00:00 开始的秒数，因此，需要把这个时间转化为UTC 0对应的时间

```python
from datetime import datetime, timezone, timedelta
ref = datetime(2001, 1, 1, tzinfo=timezone.utc)
dt = ref + timedelta(seconds=766545003)
print(dt)

#2025-04-17 01:10:03
```

由于UTC +8，小时上面加8

### 34 请指出哪一个多媒体文件同时储存在APP「文件」(套件识别码: com.apple.DocumentsApp)及APP「照片」(套件识别码: com.apple.mobileslideshow)中？(请包含扩展名，依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
#### 过程
由题，能存进照片肯定至少得是照片或视频

先找到俩包路径

由于不确定这些文件的具体位置（因为题目提供的信息根本找不到）

对于文件，找的方式是找pdf文件，然后所有pdf文件只有两种路径，

FUNG_CC_mobile.tar/var/mobile/Applications/group.net.whatsapp.WhatsApp.shared/Message/Media/120363401289578356@g.us/6/f/6f2d86cb-b942-4c2a-8b24-b834521ffff4.pdf

这是一种，很明显能在包名中看到“Shared”，鉴定为分享软件

另一种就是

FUNG_CC_mobile.tar/var/mobile/Applications/group.com.apple.FileProvider.LocalStorage/File Provider Storage/CP24_01_Cryptoasset_Exposures.pdf

确认这是文件的具体路径


<img src="/Picture/WpDF/Meiya/2026Individual/55.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/56.png" alt="" style="max-width: 80%; height: auto;">

对于照片，去找带IMG_XXXX格式的文件就行，示例路径

FUNG_CC_mobile.tar/var/mobile/Media/DCIM/100APPLE/IMG_0045.JPG


<img src="/Picture/WpDF/Meiya/2026Individual/57.png" alt="" style="max-width: 80%; height: auto;">

那现在得知了俩路径，去俩地方对照就行

可以看出来，文件里面存有两张带IMG字样的文件

照片里面也有这俩名字

但是，0008的大小不一样（理论上应该要去验证哈希）


<img src="/Picture/WpDF/Meiya/2026Individual/58.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/59.png" alt="" style="max-width: 80%; height: auto;">

### 35 请指出在APP「照片」(套件识别码: com.apple.mobileslideshow)中的图片文件「IMG_0079.JPG」是由哪一个APP拍摄？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
Discreet

#### 过程
在分析里面直接能看到这个文件是在Discreet分类下面的


<img src="/Picture/WpDF/Meiya/2026Individual/60.png" alt="" style="max-width: 80%; height: auto;">

### 36 承上题，已知该图片文件是由上述APP所拍摄，并其后储存在APP「照片」(套件识别码: com.apple.mobileslideshow)成「IMG_0079.JPG」，请问该图片的原文件名称？ (请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
DiscreetCameraApp_1744790959352.png

#### 过程
甚至直接搜就能搜出来

和0079大小是一致的（理论上也要验证哈希的说（））


<img src="/Picture/WpDF/Meiya/2026Individual/61.png" alt="" style="max-width: 80%; height: auto;">

### 37 承上题，请指出原文件的建立时间？(请以GMT +8时区及以下格式作答: yyyy-MM-dd HH:mm:ss)
#### 答案
2025-04-16 16:09:19

#### 过程
承上题，就是下面的修改时间

（所以为什么这个文件真没有创建时间？！甚至导出找元数据也找不到信息？！）

### 38 请指出在APP「照片」(套件识别码: com.apple.mobileslideshow)中，储存多媒体文件「IMG_0014.MOV」与储存「IMG_0016.MOV」之间有没有其他多媒体文件储存到APP「照片」中？
A. 有

B. 没有

C. 有拍摄，但没有储存

D. 无法确认

#### 答案
B

#### 过程
这俩视频时间是 04-16 13:04:29 到 04-16 13:04:52

照片在这段时间内并未新增


<img src="/Picture/WpDF/Meiya/2026Individual/62.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/63.png" alt="" style="max-width: 80%; height: auto;">

### 39 承上题，以下哪个陈述是正确描述上一题的答案？
A. 制作多媒体文件「IMG_0015.MOV」时，直接储存到隐藏相册中

B. 制作作多媒体文件「IMG_0015.MOV」时，直接上传到iCloud

C. 制作多媒体文件「IMG_0014.MOV」时用了缩时摄影

D. 制作多媒体文件「IMG_0015.MOV」时名称被更改为「IMG_0016.MOV」

#### 答案
C

#### 过程
依旧是在视频里面可以找到


<img src="/Picture/WpDF/Meiya/2026Individual/64.png" alt="" style="max-width: 80%; height: auto;">

### 40 ? APP「照片」(套件识别码: com.apple.mobileslideshow)中，「IMG_0027.HEIC」的原地理位置信息(WGS84)是？
A. (22.2816569, 114.1756115)

B. (22.2826366666667, 114.168503333333)

C. (22.2826216666667, 114.168525)

D. (22.2826216666667, 114.168503333333)

#### 答案
?

#### 过程
火眼中给出的是A，但是直接查看文件的exif显示的信息完全不在四个答案中


<img src="/Picture/WpDF/Meiya/2026Individual/65.png" alt="" style="max-width: 80%; height: auto;">

前一个大概是22.2826361，后一个大概是114.1685025，反而是和B接近

### 41 曾经通过网络浏览器「Safari」下载了多少个图片文件？
A. 1

B. 2

C. 3

D. 4

#### 答案
B

#### 过程
依旧在图片里直接看到


<img src="/Picture/WpDF/Meiya/2026Individual/66.png" alt="" style="max-width: 80%; height: auto;">

### 42 多媒体文件「 IMG_0004.MOV」曾被修改后再储存成另一个文件，该文件名称是?
A. IMG_0085.mov

B. IMG_0086.mov

C. IMG_0087.mov

D. IMG_0088.mov

#### 答案
A

#### 过程
总之就是，按顺序搜了一堆表后，在ZADDITIONALASSETATTRIBUTES这个表里面，能找到信息，具体来说，键是Z_PK，对应的值是82

可以看到，这个表里面有一个数据是originalfilename，里面是0004

回到ZASSET里，82对应的是0085


<img src="/Picture/WpDF/Meiya/2026Individual/67.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/68.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/69.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/70.png" alt="" style="max-width: 80%; height: auto;">

### 43 曾经通过人工智能聊天APP "POE"查询一个问题，请列出这个问题的完整句子？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
What's that mean

#### 过程
在application里面找不到，上网查了后发现是开发商Quora的


<img src="/Picture/WpDF/Meiya/2026Individual/71.png" alt="" style="max-width: 80%; height: auto;">

在Application里面搜开发商确实搜出来了（命名一般是com.开发商.应用，至少安卓是这样的），在Documents里面找到一个数据库


<img src="/Picture/WpDF/Meiya/2026Individual/72.png" alt="" style="max-width: 80%; height: auto;">

搜索Message（意味用户输入信息）

可以看到，第一个Message: 后面，有一个reference，查看这个reference关联的信息，其text是What's that mean

完整信息：（格式化了一下 Shift + Alt + F）

```json
{
    "isDeleted": false,
    "text": "What’s that mean",
    "chat": {
        "$reference": "Chat:Q2hhdDoxMDY5ODc1MDcw"
    },
    "bot": null,
    "creationTime": 1744782606792741,
    "attachments": [
        {
            "$reference": "MessageAttachment:TWVzc2FnZUF0dGFjaG1lbnQ6MzQ5NDcxNTAy"
        }
    ],
    "reactionCounts": [],
    "command": null,
    "messageCode": "1mvs4t45qlw2et7a3wk4a",
    "authorNickname": "human",
    "viewerReaction": null,
    "responsibleJob": null,
    "messageStateText": null,
    "viewerCanDelete": true,
    "hasCitations": false,
    "canvasTabs": [],
    "id": "TWVzc2FnZTozNzcwNTE2MjYzNjY=",
    "contentType": "text_markdown",
    "__typename": "Message",
    "authorUser": {
        "$reference": "PoeUser:UG9lVXNlcjoyOTkzNDM5Mzc1"
    },
    "messageId": 377051626366,
    "isChatAnnouncement": false,
    "sourceType": "chat_input",
    "state": "complete",
    "referencedMessage": null
}
```


<img src="/Picture/WpDF/Meiya/2026Individual/73.png" alt="" style="max-width: 80%; height: auto;">

### 44 承上题，请指出提问的日期及时间(答题格式: yyyy-MM-dd HH:mm:ss 作答, GMT+8)
#### 答案
2025-04-16 13:50:06

#### 过程
就在上题后面有一个creationTime，是一串数字，推断是时间戳

1744782606792741

但是很明显位数不对，上面一题时间戳是9位，那么推测此题时间戳应该是微秒级的

以及此处这个时间戳是从1970年开始的

```python
from datetime import datetime, timezone, timedelta
ref = datetime(1970, 1, 1, tzinfo=timezone.utc)
dt = ref + timedelta(seconds=1744782606792741 / 1000000)
print(dt)

#2025-04-16 05:50:06.792741+00:00
```

UTF+8，小时加8

### 45 承上题，当时使用的是哪一个机器人?(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
gpt4_1_mini

#### 过程
承接上上题那个key，其中键值对有一个是reference里的Chat，根据那个chat找到另一个json

```json
{
    "canvasTabsConnection(first:15)": {
        "$reference": "CanvasTabConnection:Q2FudmFzVGFiQ29ubmVjdGlvbjoxMDY5ODc1MDcw"
    },
    "messagesConnection(last:5)": {
        "$reference": "Chat:Q2hhdDoxMDY5ODc1MDcw.messagesConnection(last:5)"
    },
    "membersConnection(includeUsers:false)": {
        "$reference": "Chat:Q2hhdDoxMDY5ODc1MDcw.membersConnection(includeUsers:false)"
    },
    "lastMessage": {
        "$reference": "Message:TWVzc2FnZTozNzcwNTE2Mzk2Nzg="
    },
    "id": "Q2hhdDoxMDY5ODc1MDcw",
    "viewerIsOwner": true,
    "hasMultipleUsers": false,
    "title": "What's that",
    "canvasTabInForeground": null,
    "unseenItemCount": 0,
    "membersIncludeUntrustedBot": false,
    "defaultBotObject": {
        "$reference": "Bot:Qm90OjMwMzc="
    },
    "membersConnection(first:1,includeBots:false,includeViewerInUsers:false)": {
        "$reference": "Chat:Q2hhdDoxMDY5ODc1MDcw.membersConnection(first:1,includeBots:false,includeViewerInUsers:false)"
    },
    "lastInteractionTime": 1744782607094187,
    "chatId": 1069875070,
    "__typename": "Chat",
    "botMembersCount": 1,
    "lastMessageSeenByAllOtherMembers": {
        "$reference": "Message:TWVzc2FnZTozNzcwNTE2Mzk2Nzg="
    },
    "chatSettingsFieldBotToEdit": null,
    "lastNonChatBreakMessage": {
        "$reference": "Message:TWVzc2FnZTozNzcwNTE2Mzk2Nzg="
    },
    "activeJobs": [],
    "userMemberToHighlight": null,
    "membersCount": 2,
    "isContextOptimizationOn": true,
    "shouldBotAutoRespond": true
}
```

这里面告诉我们bot是"Bot:Qm90OjMwMzc="

于是去找这个bot

```json
{
    "isTrustedBot": true,
    "picture": {
        "$reference": "Bot:Qm90OjMwMzc=.picture"
    },
    "monthlyActiveUsers": null,
    "shouldHideLimitedAccessTag": false,
    "isServerBot": false,
    "viewerIsFollower": false,
    "allowsImageAttachments": true,
    "supportsRemix": false,
    "promptPlaintext": "",
    "handle": "GPT-4.1-mini",
    "shareLink": "https:\/\/poe.com\/GPT-4.1-mini",
    "messagePointLimit": {
        "$reference": "MessagePointLimit:TWVzc2FnZVBvaW50TGltaXQ6MzAzNw=="
    },
    "limitedAccessType": "no_limit",
    "introduction": "",
    "messageTimeoutSecs": 120,
    "__typename": "Bot",
    "nickname": "gpt4_1_mini",
    "conversationStarters": [
        "Write a Python function where given an int array, it returns the length of the longest strictly increasing subsequence. Give the naive solution and an optimal solution.",
        "Explain the concept of black holes in a way that a 10-year-old would understand"
    ],
    "id": "Qm90OjMwMzc=",
    "followerCount": 110,
    "translatedBotTags": [
        "OFFICIAL",
        "NEW"
    ],
    "displayName": "GPT-4.1-mini",
    "botId": 3037,
    "botImageInfo": {
        "$reference": "Bot:Qm90OjMwMzc=.botImageInfo"
    },
    "shouldHide": true,
    "viewerIsCreator": false,
    "creator": {
        "$reference": "PoeUser:UG9lVXNlcjoyOTEwNDAwODc5"
    },
    "isOfficialBot": true,
    "shouldConfirmBeforeAddingAsMember": false,
    "description": "GPT-4.1 mini is a small, fast & affordable model that matches or beats GPT-4o in many intelligence and vision-related tasks. Supports 1M tokens of context.",
    "isPromptPublic": false,
    "botPricing": {
        "$reference": "Bot:Qm90OjMwMzc=.botPricing"
    },
    "poweredBy": "Powered by OpenAI.",
    "isCreatedByPoeUserAccount": false,
    "canUserAccessBot": true,
    "deletionState": "not_deleted",
    "hasMarkdownRendering": true
}
```

nickname键值对

### 46 承上题，当时的使用者名称是？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
Duncan

#### 过程
依旧延续43题json，里面有一个autherUser，其中有一个PoeUser:UG9lVXNlcjoyOTkzNDM5Mzc1，检索

```json
{
    "bio": null,
    "id": "UG9lVXNlcjoyOTkzNDM5Mzc1",
    "fullName": "Duncan",
    "uid": 2993439375,
    "profilePhotoUrl(size:small)": "https:\/\/qph.cf2.poecdn.net\/main-thumb-2993439375-50-tymoksragfztjqazsfsxyawptkcjfhek.jpeg",
    "profilePhotoUrl(size:large)": "https:\/\/qph.cf2.poecdn.net\/main-thumb-2993439375-200-tymoksragfztjqazsfsxyawptkcjfhek.jpeg",
    "viewerIsFollowing": false,
    "viewerIsFollowedBy": false,
    "__typename": "PoeUser",
    "isFollowable": false,
    "isPoeOnlyUser": true,
    "profilePhotoUrl(size:tiny)": "https:\/\/qph.cf2.poecdn.net\/main-thumb-2993439375-25-tymoksragfztjqazsfsxyawptkcjfhek.jpeg",
    "profilePhotoUrl(size:medium)": "https:\/\/qph.cf2.poecdn.net\/main-thumb-2993439375-100-tymoksragfztjqazsfsxyawptkcjfhek.jpeg",
    "handle": null,
    "viewerIsUser": true
}
```

找到fullname

### 47 请指出即时通讯软件"WeChat"的 "WeChat ID"(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
wxid_c9xyspglub7512

#### 过程
送分题

分析里面的微信能直接看到


<img src="/Picture/WpDF/Meiya/2026Individual/74.png" alt="" style="max-width: 80%; height: auto;">

### 48 承上题，这个"WeChat ID"关注了多少个「视频号」？
A. 1

B. 2

C. 3

D. 4

#### 答案
B

#### 过程
微信里面有视频号，直接定位源文件能直接找到数据库（这谁想得到（？））

然后从上往下找表找到finderContactTable3找到了视频号信息

后面有一个followStage，1的值一共两个


<img src="/Picture/WpDF/Meiya/2026Individual/75.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/76.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/77.png" alt="" style="max-width: 80%; height: auto;">

### 49 请指出即时通讯软件WhatsApp的WhatsApp ID(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案 
85254974406@s.whatsapp.net

#### 过程
火眼里直接能看到


<img src="/Picture/WpDF/Meiya/2026Individual/78.png" alt="" style="max-width: 80%; height: auto;">

### 50 即时通讯软件WhatsApp中，封存了下列哪个聊天群？
A. 凤凰VIP会员心得交流群

B. 币淘 群组1

C. Sportsmen

D. Titus Wong Manson Finance

#### 答案
A

#### 过程
封存在数据库里面的信息是Archived为true（即1）

找数据库的方式是，找到群组，定位源文件，这个时候就能定位到一个数据库，导出数据库就能看信息了


<img src="/Picture/WpDF/Meiya/2026Individual/79.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/80.png" alt="" style="max-width: 80%; height: auto;">

### 51 即时通讯软件WhatsApp中，总共追踪了多少个频道？(请以阿拉伯数字作答)
#### 答案
19

#### 过程
火眼直接在分析看


<img src="/Picture/WpDF/Meiya/2026Individual/81.png" alt="" style="max-width: 80%; height: auto;">

### 52即时通讯软件「WhatsApp」中，下列哪个是群组 "Investors" 的管理员？i) 85254974406@s.whatsapp.netii) 85260927726@s.whatsapp.netiii) 85254961408@s.whatsapp.net
A. 只有 i)

B. 只有 i) 和 ii)

C. 只有 ii) 和 iii)

D. 以上皆是

#### 答案
B

#### 过程
火眼群组成员


<img src="/Picture/WpDF/Meiya/2026Individual/82.png" alt="" style="max-width: 80%; height: auto;">

### 53 即时通讯软件「WhatsApp」中，群组 "Investors" 的群组ID？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
120363417204753192@g.us

#### 过程
延续50题数据库，首先找到群组


<img src="/Picture/WpDF/Meiya/2026Individual/83.png" alt="" style="max-width: 80%; height: auto;">

### 54 即时通讯软件「WhatsApp」中，「社群」名称是什么？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
We are 3

#### 过程
在社群列表里


<img src="/Picture/WpDF/Meiya/2026Individual/84.png" alt="" style="max-width: 80%; height: auto;">

WhatsApp里的群组事实上也是通过社群建立的，或者说，如下图中的[]里面的内容，就是社群名


<img src="/Picture/WpDF/Meiya/2026Individual/85.png" alt="" style="max-width: 80%; height: auto;">

### 55 承上题，请指出这个社群的群组图案的哈希值（SHA256格式）。
A. B1A3706C574F81A3EE084FB9509997E06349E86D904D1DC10B879D1D5ED83125

B. B8BA258402925E139CAFBBBBBC809EC160B70BB03DBD4D0F3063F58F69D0B956

C. E43ADC646295BC5011577D4E733B6289D31A5E11ACB45285BE1FF530260DF383

D. 20E64C78F9926548CEEFB1783991A4AD71A6631F3C86002254342

#### 答案
A

#### 过程
延续第50题，跳转到那个数据库后即可定位到数据库的位置，位于

FUNG_CC_mobile.tar/var/mobile/Applications/group.net.whatsapp.WhatsApp.shared

文件夹下面，同级文件与文件夹有如下


<img src="/Picture/WpDF/Meiya/2026Individual/86.png" alt="" style="max-width: 80%; height: auto;">

由于题目要求找图片，那么合理推断，图片文件应该位于Media下面

于是顺着Media找到如下目录

FUNG_CC_mobile.tar/var/mobile/Applications/group.net.whatsapp.WhatsApp.shared/Media/Profile

（事实上Media下面就Profile一个目录）

然后往下翻，第二张就是，计算哈希就行


<img src="/Picture/WpDF/Meiya/2026Individual/87.png" alt="" style="max-width: 80%; height: auto;">

和题目对照，会发现哈希不对，那合理推测还有一张

然后就会很阴的发现确实还有一张

（怪不得出选择题，这搁填空题不得被骂死（））


<img src="/Picture/WpDF/Meiya/2026Individual/88.png" alt="" style="max-width: 80%; height: auto;">

### 56 即时通讯软件「WhatsApp」中，找出WhatsApp ID:85254961408@s.whatsapp.net曾经是在而现在已经不在的群组，请指出该群组的名称。(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
Sportsmen

#### 过程
这个ID是 陳民浩 的

我真没想到要去消息里面找（）

说句实话，做完57再做这个绝对更容易（）


<img src="/Picture/WpDF/Meiya/2026Individual/89.png" alt="" style="max-width: 80%; height: auto;">

### 57 即时通讯软件「WhatsApp」中，总共出现了多少个「投票」活动？(请以阿拉伯数字作答)
#### 答案
15

#### 过程
去聊天记录看


<img src="/Picture/WpDF/Meiya/2026Individual/90.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/91.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/92.png" alt="" style="max-width: 80%; height: auto;">

会发现投票会有[投票消息]

总共15个，频道里12个，群聊3个

### 58 ? 承上题，总共在多少个「投票」活动中作出了投票？(请以阿拉伯数字作答)
#### 答案


#### 过程
跳转到源文件发现依旧是ChatStorage文件

然后定位下一条消息Suport you，其上一条消息即为那个投票，对应的type类型是46


<img src="/Picture/WpDF/Meiya/2026Individual/93.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/94.png" alt="" style="max-width: 80%; height: auto;">

虽然我不知道为什么不能定位时间戳（？）

上条信息时间戳算出来是4月17号的，但火眼里显示是4月16号，很诡异

（后补，时间戳计算的是UTF0，但我传入的是UTF+8）


<img src="/Picture/WpDF/Meiya/2026Individual/95.png" alt="" style="max-width: 80%; height: auto;">

然后检索出来的信息分别对应15次投票（其实理论上也可以试type不同数值，看看到底哪个是15的说（）)

（总之搁正常测试大概率想不到）


<img src="/Picture/WpDF/Meiya/2026Individual/96.png" alt="" style="max-width: 80%; height: auto;">

之后就完全卡壳了

网上有说将两个表统合的，用SQL语句

```sql
SELECT  ZWAMESSAGE.Z_PK,
        ZWAMESSAGE.ZMESSAGETYPE, 
        ZWAMESSAGE.ZMESSAGEINFO, 
        ZWAMESSAGE.ZTEXT, 
        ZWAMESSAGE.ZFROMJID, 
        ZWAMESSAGE.ZTOJID, 
        ZWAMESSAGEINFO.ZRECEIPTINFO 
FROM 
    ZWAMESSAGE
    RIGHT JOIN ZWAMESSAGEINFO ON ZWAMESSAGE.ZMESSAGEINFO = ZWAMESSAGEINFO.Z_PK
WHERE ZMESSAGETYPE = 46;
```

然后在ZRECEIPTINFO里面是protobuf格式的16进制加密

可惜我这里完全解不出来（躺）

### 59 即时通讯软件「WhatsApp」中，根据群组「 IQ COIN 💰💰💰💰」对话内容正在策划，哪一种犯罪计划？
A. 诈骗

B. 抢劫

C. 谋杀

D. 以上都不对

#### 答案
A

#### 过程
看聊天记录就行


<img src="/Picture/WpDF/Meiya/2026Individual/97.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/98.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/99.png" alt="" style="max-width: 80%; height: auto;">

这群人说要黑进CEO的电脑，发消息让CEO付虚拟币

### 60 承上题，该群组建立者的WhatsApp ID是什么？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
85254974406@s.whatsapp.net

#### 过程
依旧群聊消息，能看到是该机机主duncan建立的


<img src="/Picture/WpDF/Meiya/2026Individual/100.png" alt="" style="max-width: 80%; height: auto;">

### 61 承上题，该群组的建立时间是什么？(请以GMT +8时区及以下格式作答: yyyy-MM-dd HH:mm:ss)
#### 答案
2025-04-25 16:57:55

#### 过程
承上题，时间就在上面写着

### 62 # 根据你分析结果。三人因感情瓜葛内讧因而发生这次袭击事件。你怀疑梁燕玲曾到袭击现场，你将你的发现通知警察。警察扩大现场搜索范围，终于在案发现场附近，发现陈民浩名下的小汽车，车上发现一部智能手机。请你以参赛材料LEUNG_YL_Mobile.zip回答以下问题参考LEUNG_YL_Mobile.zip，该手机用作注册iCloud的email?
A. lingleung1502@gmail.com

B. lingleung1502@yahoo.com.hk

C. lingleung1503@gmail.com

D. lingl1502@gmail.com

#### 答案
A

#### 过程
火眼直接看


<img src="/Picture/WpDF/Meiya/2026Individual/101.png" alt="" style="max-width: 80%; height: auto;">

### 63 参考LEUNG_YL_Mobile.zip，文件IMG_0021.HEIC 所拍摄的相机型号是甚么?
A. iPhone SE (3rd generation)

B. iPhone SE (2nd generation)

C. iPhone 12 mini

D. iPhone XR

#### 答案
A

#### 过程
查看Exif属性，导出文件扔到exiftool里面看


<img src="/Picture/WpDF/Meiya/2026Individual/102.png" alt="" style="max-width: 80%; height: auto;">

### 64 参考LEUNG_YL_Mobile.zip，文件IMG_0005.JPG所拍摄的座标(WGS 84)是多少？(请以纬度,经度的顺序及以下格式作答xx.xxxxxx,xx.xxxxxx)
#### 答案
22.337655,114.139441

#### 过程
latitude是纬度，longitude是经度（以防英语看不懂（））

分析里面找到IMG_0005，定位到源文件，找到数据库导出，找到表ASSET

在IMG 0005那一行能直接看到


<img src="/Picture/WpDF/Meiya/2026Individual/103.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/104.png" alt="" style="max-width: 80%; height: auto;">



### 65 参考LEUNG_YL_Mobile.zip，文件IMG_0022.JPG是以下哪种方向拍摄?
A. 不旋转

B. 旋转180度

C. 顺时针90度

D. 逆时针90度

#### 答案
C

#### 过程
exif信息


<img src="/Picture/WpDF/Meiya/2026Individual/105.png" alt="" style="max-width: 80%; height: auto;">

CW是顺时针：Clockwise

CCW是逆时针：Counter-clockwise

### 66 文件IMG_0022.JPG的建立时间(GMT +08:00)是?(请以GMT +8时区及以下格式作答: yyyy-MM-dd HH:mm:ss)
#### 答案
2025-05-16 11:33:15

#### 过程
就看上面的exif信息就行，一眼能看出来，access和creation肯定不是，这日期年份都不对

### 67 参考LEUNG_YL_Mobile.zip，在WhatsApp 与”85254974406@s.whatsapp.net”聊天对话中，于2025-05-16 11:33:39时的信息所传送的座标(WGS 84)是多少?(请以纬度,经度顺序及以下格式作答xx.xxxxxxxxxxxx, xxx.xxxxxxxxxxxx)
#### 答案
#### 过程
先找一下谁（）馮子超

消息也找一下


<img src="/Picture/WpDF/Meiya/2026Individual/106.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/107.png" alt="" style="max-width: 80%; height: auto;">

定位源文件导出数据库ChatStorage.sqlite

在WaMessage这个表里面找到该信息，具体来说是筛时间戳

```python
import time
# from datetime import *;

# 提示输入时间，格式必须严格匹配
timezone = input("请输入时区: UTF")
timezone = int(timezone)
calibration = timezone * 3600

date_str = input("请输入时间 (格式: YYYY-MM-DD HH:MM:SS): ")

# 解析字符串 → struct_time → 时间戳
t = time.strptime(date_str, "%Y-%m-%d %H:%M:%S")
timestamp = int(time.mktime(t))
timestamp -= calibration

print(timestamp)
# strand = datetime(2001, 1, 1, tzinfo=timezone.utc);
# t2 = time.strptime(strand)
strand_str = "2001-01-01 00:00:00";
t2 = time.strptime(strand_str, "%Y-%m-%d %H:%M:%S");
t2stamp = int(time.mktime(t2));
print(timestamp - t2stamp)
```

可以看到，这条消息的编号是1416


<img src="/Picture/WpDF/Meiya/2026Individual/108.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/109.png" alt="" style="max-width: 80%; height: auto;">

然后这几张表里面唯一有经纬坐标的是WaMediaItem


<img src="/Picture/WpDF/Meiya/2026Individual/110.png" alt="" style="max-width: 80%; height: auto;">

尝试搜PK会发现搜不出来，这里应该去搜message


<img src="/Picture/WpDF/Meiya/2026Individual/111.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/112.png" alt="" style="max-width: 80%; height: auto;">



值得一提的是，在火眼里面看的东西并不正确

在火眼的位置里面看信息（居然还有位置这种东西）


<img src="/Picture/WpDF/Meiya/2026Individual/113.png" alt="" style="max-width: 80%; height: auto;">

位置信息就在后面
### 68 参考LEUNG_YL_Mobile.zip，在WhatsApp 与 "85254974406@s.whatsapp.net”聊天对话中，于2025-05-16 11:33:39时的信息所传送的座标(WGS 84)所指的餐厅英文名称是? (请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
Fai Kee Seafood Restaurant

#### 过程
火眼直接在消息那里能直接看到


<img src="/Picture/WpDF/Meiya/2026Individual/114.png" alt="" style="max-width: 80%; height: auto;">

### 69 参考LEUNG_YL_Mobile.zip，在WhatsApp 中聊天群组ID 120363401289578356里，于2025-04-29 08:31:02，机主传送了一个PDF 文件，该PDF的内容是什么？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
0xe36D4bCf0132B8Dc7317C2Fb9bfa1845629F6638

#### 过程
先看一下是哪个群

欸 IQ COIN，老朋友（）

找消息找文件，发现是mission_money.jpg这个文件

下面标注了这个文件的名称：

0d32df31-b323-4d08-be55-bf15c84f8ea6.pdf


<img src="/Picture/WpDF/Meiya/2026Individual/115.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/116.png" alt="" style="max-width: 80%; height: auto;">

去这个人的文件分类pdf那里看，找到对应文件导出

打开发现里面是空的，双击发现能选中文字，鉴定为白色字体（那我背景开护眼你不就炸了（））

既然双击能选中，直接复制出来就行


<img src="/Picture/WpDF/Meiya/2026Individual/117.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/118.png" alt="" style="max-width: 80%; height: auto;">

这里直接复制就行
### 70 参考LEUNG_YL_Mobile.zip，在WhatsApp 中聊天群组ID 120363401289578356里，有多少个参加者？
A. 2

B. 3

C. 4

D. 5

#### 答案
B

#### 过程
找群，依旧老朋友


<img src="/Picture/WpDF/Meiya/2026Individual/119.png" alt="" style="max-width: 80%; height: auto;">

就3个人（做了这么多应该早就清楚了吧（））


<img src="/Picture/WpDF/Meiya/2026Individual/120.png" alt="" style="max-width: 80%; height: auto;">

### 71 参考LEUNG_YL_Mobile.zip，于2025-04-25 17:11:37 时使用WhatsApp 所拨打的手机号码是多少?
A. 85254962307

B. 85254961408

C. 85254974406

D. 85254993306

#### 答案
C

#### 过程
火眼直接能看到


<img src="/Picture/WpDF/Meiya/2026Individual/121.png" alt="" style="max-width: 80%; height: auto;">

### 72 参考LEUNG_YL_Mobile.zip，总共有多少个WhatsApp的通话记录? (包括拨打、接收及未接来电)
A. 4

B. 5

C. 6

D. 7

#### 答案
D

#### 过程
承接上题

### 73 参考LEUNG_YL_Mobile.zip，WhatsApp 聊天群组ID 120363400622997111 的群组名称是?
A. Investors

B. Foodies

C. We are 3

D. Happy Sharing within 3

#### 答案
#### 过程
火眼直接搜


<img src="/Picture/WpDF/Meiya/2026Individual/122.png" alt="" style="max-width: 80%; height: auto;">

### 74 参考LEUNG_YL_Mobile.zip，WhatsApp 聊天群组Happy Sharing within 3 于2025-04-17 10:12:34 传送的WGS 84座标是多少?
A. 22.323436345441, 113.276894376508

B. 22.326923370361, 114.168403625488

C. 21.239876452236, 115.925422314543

D. 20.124955642236, 114.168403625488

#### 答案
B

#### 过程
这不就是67题吗（）

先获取一下时间戳

766548754


<img src="/Picture/WpDF/Meiya/2026Individual/123.png" alt="" style="max-width: 80%; height: auto;">

然后找该时间戳对应的消息的Z_PK，然后切换到表ZWAMEDIAITEM（WaMediaItem）将Z_PK对应的数值扔到ZMESSAGE里找坐标


<img src="/Picture/WpDF/Meiya/2026Individual/124.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/125.png" alt="" style="max-width: 80%; height: auto;">

### 75 参考LEUNG_YL_Mobile.zip，Instagram 的版本是?
A. 375.2.0.15.82 (722575504)

B. 376.1.0.14.56 (722575504)

C. 376.1.0.27.82 (722575504)

D. 376.0.0.17.23 (722575504)

#### 答案
#### 过程
应用列表找找

找到了，但数值有问题，窝要验牌

顺便看一下包名：

com.burbn.instagram


<img src="/Picture/WpDF/Meiya/2026Individual/126.png" alt="" style="max-width: 80%; height: auto;">

右键跳转到源文件查看数据库


<img src="/Picture/WpDF/Meiya/2026Individual/127.png" alt="" style="max-width: 80%; height: auto;">

很可惜的是数据库里面也没有，那就只能去找包了，在应用包里面找版本

在Application文件夹里面搜应用包名

这下找到了

很明显肯定在Library里，很明显肯定在preference里（主要是剩下俩文件夹名字肯定和版本对不上号）


<img src="/Picture/WpDF/Meiya/2026Individual/128.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/129.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/130.png" alt="" style="max-width: 80%; height: auto;">

### 76 参考LEUNG_YL_Mobile.zip，社交媒体软件Instagram 的安装时间?(请以GMT+8时区及格式YYYY-MM-DD hh:mm:ss作答)
#### 答案
2025-04-26 11:50:47

#### 过程
承接上题，就在上题上面

记得是UTF+8，小时要改

### 77 # 跟据你的分析，警察在香港西贡蕉坑，找到一个行李箱，内藏一名女子尸体，身上没有任何身份证明文件，裤袋内搜获一个U盘，根据法医初步检验，死者头部及颈部有明显瘀伤，相信曾发生激烈争执，死因为气管受压导致窒息，死亡时间相信是在2025-05-16 0900时至1000时 。调查人员初步检查这个U盘，没有发现可疑资料，现在交由你进行电子数据鉴定工作。请参考参赛材料LEUNG_YL_USB.E01，答以下问题参考LEUNG_YL_USB.E01，这个U盘里有多少个分区？(请以阿拉伯数字作答)
#### 答案
2

#### 过程
参考了学长的挂载U盘过程，于是看到了如下文章

记得改成zip📎25美亚个人赛u盘仿真.txt
原链接https://mp.weixin.qq.com/s/_UyMjDHS1G7j_eZ_00VGhQ?scene=1&amp;click_id=1
首先，用Arsenal Image Mounter挂载U盘镜像

选择disk device，write temporary

注意Create这个选项一定不能选择


<img src="/Picture/WpDF/Meiya/2026Individual/131.png" alt="" style="max-width: 80%; height: auto;">

大佬的解释

<img src="/Picture/WpDF/Meiya/2026Individual/132.png" alt="" style="max-width: 80%; height: auto;">

我这里直接OK就行了

然后以管理员运行VM

新建虚拟机 -> 自定义 -> 下一步 -> 稍后安装操作系统 -> 选择win10（这个是根据U盘来的） -> BIOS -> ... -> 选择SATA -> 使用物理磁盘 -> 选择U盘对应的PhysicalDriveN，这个N对应的数字在资源管理器可以看到

资源管理器打开方式：Win R，输入

perfmon.exe /res

后面就下一步、完成就行了

具体流程如下组图所示（）


<img src="/Picture/WpDF/Meiya/2026Individual/133.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/134.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/135.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/136.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/137.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/138.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/139.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/140.png" alt="" style="max-width: 80%; height: auto;">

对了，在显示里面有一个3D图形加速关掉


<img src="/Picture/WpDF/Meiya/2026Individual/141.png" alt="" style="max-width: 80%; height: auto;">

于是我们很开心的打开了检材（什么叫加载了10分钟？！我还以为我哪步整错了）


<img src="/Picture/WpDF/Meiya/2026Individual/142.png" alt="" style="max-width: 80%; height: auto;">

进去打开文件管理器就能看到，俩磁盘


<img src="/Picture/WpDF/Meiya/2026Individual/143.png" alt="" style="max-width: 80%; height: auto;">



理论上，看火眼也能直接看出来，具体来说应该是如下

火眼分区显示
<img src="/Picture/WpDF/Meiya/2026Individual/144.png" alt="" style="max-width: 80%; height: auto;">

所有未使用空间肯定不显示，排除

EFISECTOR是启动盘，直接排除

分区4由于空间过小，windows经常会自动忽略小于8MB的可移动介质分区，这个可能也是用来存一些启动工具的，而且，分区4这个名字甚至没有分区名，很可能并未注册

剩下两个TIM和EFI也是常见的分区名

### 78 参考LEUNG_YL_USB.E01，这个U盘里的分区结构是什么？(请以英文大写作答)
#### 答案
MBR

#### 过程
分区结构，一般多指MBR或GPT，这俩基本占绝大多收

其他情况，有混合结构（MBR和GPT都有）、无分区表（超级软盘）、UD分区等非标准分区（这些信息一般存在EFISECTOR里）、APM（老式MAC的U盘）

对于这道题，去火眼找信息，在启动盘的文件夹里可以找到一个$MBR的文件，证明这是MBR分区的


<img src="/Picture/WpDF/Meiya/2026Individual/145.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/146.png" alt="" style="max-width: 80%; height: auto;">

### 79 参考LEUNG_YL_USB.E01，以下哪项描述是正确的？i) U盘的总容量是16GBii) 文件系统包括 FAT32、exFAT 和 NTFSiii) exFAT 分区的容量是 16GBiv) 分区标签名是 "SanDisk"
A. 只有 i) 和 ii)

B. 只有 i) 和 iii)

C. 只有 ii) 和 iv)

D. 以上皆非

#### 答案
D

#### 过程
没一个对的

前三个直接去火眼就能看

只有fat12、fat16和exfat

exfat一个分区27.65GB，也肯定超过16GB


<img src="/Picture/WpDF/Meiya/2026Individual/147.png" alt="" style="max-width: 80%; height: auto;">

第四个去VM看

TIM和WEPE


<img src="/Picture/WpDF/Meiya/2026Individual/148.png" alt="" style="max-width: 80%; height: auto;">

### 80 参考LEUNG_YL_USB.E01，以下哪项描述是正确的？i) 此U盘曾连接到一台名为 "PC" 的电脑ii) U盘内存有一个已加密的压缩文件iii) 已加密的压缩文件的创建日期系 2025-05-15
A. 只有 ii)

B. 只有 iii)

C. 只有 ii) 和 iii)

D. 以上皆是

#### 答案
C

#### 过程
i完全不知道怎么找

ii和iii很明显，在TIM里面有个zip文件，导出后能发现是加密的


<img src="/Picture/WpDF/Meiya/2026Individual/149.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/150.png" alt="" style="max-width: 80%; height: auto;">

### 81 承上题，该压缩文件的解压密码是多少？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
54d#e(nm

#### 过程
不就在桌面吗？


<img src="/Picture/WpDF/Meiya/2026Individual/151.png" alt="" style="max-width: 80%; height: auto;">



事实上看了别人写的wp才发现原来应该去找图片吗（）  
在TIM\\WEPE里面，有一张照片，就是桌面上那张  
我还以为图片大小不对还专门去爆破了一下，没想到居然没啥问题

### 82 参考LEUNG_YL_USB.E01，以下哪项描述是正确的？i) 这是一个可引导U盘ii) 有一个分区标签名为 "EFI"iii) 卷标日期为 2025-05-15 (UTC +8)iv) 有一个分区的总容量小于 500 MB
A. 只有 i)

B. 只有 i) 和 ii)

C. 只有 i), iii) 和 iv)

D. 以上皆是

#### 答案
D

#### 过程
事实上只要2和4能出来就行了（）这俩直接延续79题就能直接做出来

对于1，都能挂上虚拟机了肯定是可引导的啊（）

3没找到（）

### 83 tammy.txt文件的内容是什么？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
due_diligence

#### 过程
在WEPE\Program Files\tammy.txt


<img src="/Picture/WpDF/Meiya/2026Individual/152.png" alt="" style="max-width: 80%; height: auto;">

### 84 文件“xcontainer”的加密算法是什么？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
AES(Twofish)

#### 过程
这xcontainer就在一堆VC边上，他还好心的防止你没有VC用（bushi


<img src="/Picture/WpDF/Meiya/2026Individual/153.png" alt="" style="max-width: 80%; height: auto;">

剩下的就是去找密码

事实上密码在VM里根本找不到，因为已经被删了


<img src="/Picture/WpDF/Meiya/2026Individual/154.png" alt="" style="max-width: 80%; height: auto;">

导出后用VC把xcontainer解密了

然后查看加密卷属性


<img src="/Picture/WpDF/Meiya/2026Individual/155.png" alt="" style="max-width: 80%; height: auto;">

### 85 分析文档 "xcontainer" 的属性。关于此磁盘镜像，以下哪项描述是正确的？i) 大小为 4943872 字节ii) 文件系统是 FAT iii) 没有嵌入式备份头iv) 块大小为 128 位
A. 只有 i) 和 ii)

B. 只有 ii) 和 iv)

C. 只有 ii), iii) 和 iv)

D. 以上皆是

#### 答案


#### 过程
1不对，大小是5,242,880 字节


<img src="/Picture/WpDF/Meiya/2026Individual/156.png" alt="" style="max-width: 80%; height: auto;">

3有的，所以也不对


<img src="/Picture/WpDF/Meiya/2026Individual/157.png" alt="" style="max-width: 80%; height: auto;">

剩下的，4是对的，就在上面的块大小中写着的

2的话，挂载上后查看盘属性就行


<img src="/Picture/WpDF/Meiya/2026Individual/158.png" alt="" style="max-width: 80%; height: auto;">

### 86 WinPE 启动后，系统会自动将核心映像挂载在哪个虚拟机？
A. C:

B. D:

C. X:

D. Z:

#### 答案
C

#### 过程
打开虚拟机就能看到了


<img src="/Picture/WpDF/Meiya/2026Individual/159.png" alt="" style="max-width: 80%; height: auto;">

### 87 下列哪些 Windows PE 指令在预设环境下无法执行？i) Powershellii). Eventvwriii). HostnameiV). Diskpart
A. 只有 i) 和 ii)

B. 只有 iii) 和 iv)

C. 只有 i), ii) 和 iii)

D. 以上皆是

#### 答案
C

#### 过程
去虚拟机里Win R cmd 试一下就行


<img src="/Picture/WpDF/Meiya/2026Individual/160.png" alt="" style="max-width: 80%; height: auto;">

### 88 必须包含哪个文件，才能启动 Windows PE环境？
A. WEPE64.wim

B. install.wim

C. WinPE.log

D. hiberfil.sys

#### 答案
A

#### 过程
A能找到

BCD找不到


<img src="/Picture/WpDF/Meiya/2026Individual/161.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/162.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/163.png" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/164.png" alt="" style="max-width: 80%; height: auto;">

### 89 若要判断一个U盘是否为可开机的Windows PE，以下哪些文件必须存在？i) WEPE64.wim 或 boot.wimii) bootmgriii) EFI\Boot\bootx64.efiiv) hiberfil.sys
A. 只有 ii 和 iv

B. 只有 i), ii) 和 iii)

C. 只有 i) 和 iv)

D. 以上皆是

#### 答案
B

#### 过程
1在88已经找到了

3也能找到


<img src="/Picture/WpDF/Meiya/2026Individual/165.png" alt="" style="max-width: 80%; height: auto;">

但是4找不到，也是88告诉我们的

问题是我2也找不到口丫



具体来说

1是PE核心映像文件

2是Windows启动管理器，对于传统BIOS启动是必须的

3是UEFI启动文件，对于UEFI启动是必须的

4是Windows休眠文件，与PE无关

### 90 这个 WinPE U盘的操作环境 (Operating Environment) 是基于哪一个 Windows 版本？
A. Windows 7

B. Windows 8.1

C. Windows 10 PE

D. Windows 11 PE

#### 答案
C

#### 过程
这标识，这界面，一看就是win10吧（）

不管怎么说，就算小版本看不大出来，大版本肯定能分辨出来的说（）


<img src="/Picture/WpDF/Meiya/2026Individual/166.png" alt="" style="max-width: 80%; height: auto;">

### 91 根据你综合多项通讯软件的对话记录，浏览记录及资料分析，发现冯子超、陈民浩伙同女子梁燕玲共同做了一宗涉及加密货币投资的诈骗案件，因东窗事发打算携赃而逃。女子梁燕玲负责处理有关清洗黑钱事项，警察相信梁燕玲携带同相关材料逃跑，请你运用电子数据鉴定技巧寻找与加密货币相关的材料，尽快启动冻结程序。参考LEUNG_YL_USB.E01，该U盘盘有一个加密的文件，该文件所用的加密软件名称是? (只需回答软件名称，不需要回答软件版本，(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
VeraCrypt

#### 过程
前面不是刚解过吗（）

### 92 参考LEUNG_YL_USB.E01，请列出与IQ Coin有关的虚拟钱包的地址(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
0x548dafDe4B17d7d3C9485E79B3B5018801C7855E

#### 过程
把那个xcontainer解密挂载出来后有一个图片里面有一个二维码


<img src="/Picture/WpDF/Meiya/2026Individual/167.jpg" alt="" style="max-width: 80%; height: auto;">

然后随波逐流解一下二维码就行了


<img src="/Picture/WpDF/Meiya/2026Individual/168.png" alt="" style="max-width: 80%; height: auto;">

### 93 承上题，这个钱包属于哪一种加密货币(请以英文大写作答)
#### 答案
BNB

#### 过程
什么叫用自己的钱包地址当密码？  
这能叫提示？？

合着承上题是这个意思是罢？？！

总之学到了，以后也像xidian那样把生日、钱包地址这些信息存到txt里面配合弱口令爆破密码



密码就是上题答案，需要爆破的文件就是检材里面最后一个从未被用过的zip文件


<img src="/Picture/WpDF/Meiya/2026Individual/169.png" alt="" style="max-width: 80%; height: auto;">

于是成功解出来两张图片


<img src="/Picture/WpDF/Meiya/2026Individual/170.jpg" alt="" style="max-width: 80%; height: auto;">

<img src="/Picture/WpDF/Meiya/2026Individual/171.jpg" alt="" style="max-width: 80%; height: auto;">

这其中第二张能找到货币信息


<img src="/Picture/WpDF/Meiya/2026Individual/172.png" alt="" style="max-width: 80%; height: auto;">



我本来还以为是通过钱包地址上区块链直接找这个钱包的，查看钱包信息之类的，结果没想到这个钱包根本搜不到（或许是因为被冻结了吧）

### 94 承上题，这个钱包总共有多少次存入记录？(请以阿拉伯数字作答)
#### 答案
1

#### 过程
就一次，看图片就行


<img src="/Picture/WpDF/Meiya/2026Individual/173.png" alt="" style="max-width: 80%; height: auto;">

### 95 承上题，存入款项的支账地址是什么？(请依照参赛材料中的原文作答，注意区分大小写、空格及符号)
#### 答案
0x6144ACfdf84bbEC6bccB310516A89D4b3ee48c1A

#### 过程
直接上网站去BNB那里看，直接定位到这位的钱包，在token交易记录里能看到一个in，输入方与图片一致

[https://bscscan.com/address/0x548dafDe4B17d7d3C9485E79B3B5018801C7855E#tokentxns](https://bscscan.com/address/0x548dafDe4B17d7d3C9485E79B3B5018801C7855E#tokentxns)


<img src="/Picture/WpDF/Meiya/2026Individual/174.png" alt="" style="max-width: 80%; height: auto;">

### 96 承上题，这项交易传送了多少BEP-20 IQ Coin?(请以阿拉伯数字依照参赛材料中的原文作答，注意区分大小写、空格及符号和不用标点符号 )
#### 答案
1000000000

#### 过程
承上题，边上写着1000000000

### 97 助记词是由加密货币钱包生成的一系列单词，帮助用户恢复其私钥。助记词通常由12到24个单词组成
A. 正确

B. 错误

#### 答案
A

#### 过程
对的，因为低于12个容易被爆破出来

做到的题也一般都是12 - 24个

Mnemonics with less than 12 words have low entropy and may be guessed by an attacker.

### 98 根据你的信息警察查知这个加密钱包涉及近期一宗巨额诈骗案，请你查出这个钱包余额额度，警察将会进行冻结程序<br>请指出包含有疑似助记词的文件的希哈值(MD5格式)(请以阿拉伯数字和英文大写作答)
#### 答案
183B8E0C6365FEE834479269141A3F91

#### 过程
就92那图片边上有个txt文件（当时打开就觉得应该是助记词（））


<img src="/Picture/WpDF/Meiya/2026Individual/175.png" alt="" style="max-width: 80%; height: auto;">

一眼盯真鉴定为助记词文件

记得大写



