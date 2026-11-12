---
title: Osint - Week1
status: published
pubDate: 2026-11-07
type: Osint
tags:
- osint
- geolocation
- image-analysis
- landmark-identification
- subway
- exif
- gps
- baidu-maps
- poi-search
- maimai
---
### 01
#### 题目
ljnljn 攥着出门条踏出校门的时候，心里算得清清楚楚：九个小时，不隔夜，天黑之前必须归队。

警校的日子总是被队列、体能和法条填得满满当当，难得挤出来这么一小段松散的假期，他没有安排别的行程，只买了一张地铁票。

地铁钻出地面，风裹着阳光撞进车厢。走出地铁站的出口，一抬头就看见那片流畅起伏的蓝色玻璃幕墙，阳光在曲面上碎成一片晃眼的光斑，像摊开在城市里的一汪静水。

他站在站台檐下静静望了一会儿。平日里训练习惯了绷紧肩膀，时刻保持警觉，可此刻这座带着莫比乌斯环意象的大楼安安静静立在晴蓝的天底下，没有口令，没有集合哨，没有随时要绷紧的戒备。

他沿着路边慢慢走，银杏新叶在脚边晃。九个小时很短，短到不够走远，不够把所有疲惫都卸掉；九个小时也很长，足够他站在这里，好好看看这座城市，看看自己以后将要守护的烟火人间。

风掠过玻璃，远处路上车流缓缓流动。他抬手看了一眼手表，在心里记下这个晴朗的瞬间。

不用奔赴远方，不必追赶行程。等时间走到尽头，他就要准时回去，重新穿上藏蓝，回到那个整齐严肃的集体里。

这短暂的九个小时，是属于他一个人的喘息，是喧嚣训练间隙偷来的一段温柔，藏在地铁站出口，广场流动的玻璃光影里。

等归队的时间一到，他会收好这份松弛，继续往前走。



问：此时ljnljn在哪个地铁站的哪个出口？（flag格式为PCTF{地铁站名-出口号}，如PCTF{西单-D1}）


<a href="/Download/WpCTF/Comp/P26/Os/t1.zip" download>
    文件
</a>

#### 答案
PCTF{朝阳公园-D1}

#### 过程
根据题目中泄露的信息，?公园站，3号线

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Os/1.jpg" alt="" style="max-width: 80%; height: auto;">

那就看是哪个口就行了

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Os/2.png" alt="" style="max-width: 80%; height: auto;">

D1口，非常吻合啊（）

### 02
#### 题目
ljnljn 又一次拿到了九个小时的短假。 没有再去往那边，他径直走进熟悉的电玩城，走到这台舞萌跟前。在校里要时刻收着性子，听口令、守纪律，注意力要留给队列、体能和专业课；只有站在这台圆环机器前的时候，紧绷的重心可以交给节拍。

一首一首推进，一扇扇关卡的门接连亮起通关标识。指尖追着流转的音符滑动、敲击，把积攒的压力顺着节奏释放出去。当最后一个音符落下，屏幕瞬间铺开斑斓的彩光，ALL COMPLETE！全部完成。 万花筒的图案在圆盘中央闪闪发亮，机台四周的彩灯一圈圈晕开。

他盯着屏幕看了几秒，心里轻轻落了一下。 九个小时依旧有限，天黑前必须按时归队。音游的全部完成是这趟外出的小目标，是难得可以由自己掌控的圆满。等尽兴之后，他会收好这份开心，准时回到警校，重新换回严谨的状态。 这一趟短暂出逃，留给自己的，是舞萌机上这一场绚烂的全通关。



问题：ljnljn在一个电玩城游玩，请问电玩城负责人的电话是多少（参考百度地图），flag格式：PCTF{电话号码}）


<a href="/Download/WpCTF/Comp/P26/Os/t2.zip" download>
    文件
</a>

#### 答案
PCTF{17732625011}

#### 过程
欸不是你怎么开门开这么快（）我龙之区域还没爬呢（）

全国音游地图你在干啥啊喂（）收录舞萌给我收录全了啊（）

直接看exif

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Os/3.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Os/4.png" alt="" style="max-width: 80%; height: auto;">

会发现这里的定位方式是基站定位，那么要先找到这个GPS地址，然后根据这个地址往外辐射找机厅

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Os/5.png" alt="" style="max-width: 80%; height: auto;">

然后直接暴力搜索安次区舞萌DX

[https://maimai-net.cn/find](https://maimai-net.cn/find)

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Os/6.png" alt="" style="max-width: 80%; height: auto;">

<!-- 这是一张图片，ocr 内容为： -->
<img src="/Picture/WpCTF/Comp/P26W1/Os/7.jpg" alt="" style="max-width: 80%; height: auto;">



