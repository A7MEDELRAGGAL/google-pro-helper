# Google Pro Helper

本仓库收录两个独立版本：浏览器扩展版与批量版，分别保留各自的目录结构和原有代码。

| 版本 | 目录 | 简介 |
| --- | --- | --- |
| 浏览器扩展版 | [extension](./extension/) | 在浏览器中使用的扩展项目，包含扩展清单、弹窗页面、脚本与图标。 |
| 批量版 | [batch](./batch/) | 用于批量账号任务管理的本地控制台项目，包含网页界面、后端、启动脚本与测试。 |

## 目录结构

```text
google-pro-helper/
├── extension/   # 浏览器扩展版
├── batch/       # 批量版
├── .gitignore
└── README.md
```

## 浏览器扩展版

原文来源：[B 站已发布帖子](https://www.bilibili.com/opus/1267073583504424964)

Linuxdo原帖在此:

https://linux.do/t/topic/3123997（压缩包夸克链接我直接放下面了）

链接：https://pan.quark.cn/s/bd70b3410a69

提取码：ziUg

（💰 免费激活 Google AI Pro 12 / 24 个月」| offer token 注入）

借用佬友的拓展来说明单号如何操作，感谢开源

（我本人大部分号是用的是注册机批量搞的，原理都一样，总共整了七个目前都活过了半个月，不过被这么大批量薅，估计也活不久了）

> **在此提示，不要用大号！！！！**

### **1.首先去到原帖下载佬友提供的压缩包，解压后，在chrome浏览器上点击"加载未打包的拓展程序"，注意打开开发者模式**

![image](https://i0.hdslb.com/bfs/new_dyn/f6ecc1314583543aedb82bf0d950213e3747579686817540.png@1192w.webp)

### **2.然后打开 one.google.com/plans，按照拓展里步骤，先开12月的，注意正上方的绿色提示，和右下角的提示**

![image](https://i0.hdslb.com/bfs/new_dyn/5de4698ae0cd2a371a1ecb3e6727a8823747579686817540.png@1130w_1760h.webp)

![image](https://i0.hdslb.com/bfs/new_dyn/33147e398928380c614b5ae85bd50a903747579686817540.png@1192w.webp)

![image](https://i0.hdslb.com/bfs/new_dyn/2544ad49e1db82fb90999fe3355e6fbd3747579686817540.png@92h.webp)

### **3.然后选择pro套餐，进行绑卡（需要卡里有至少1u验证，u卡基本都行，测试卡：starryblu/maya/bybit/mexc/招行master/中行2233master/bitEU/wise/savo卡全都可以）付款前一定要看清，第一个步骤首月必定是0元的**

> PS：这里需要说明如果是已经给了折扣的情况，如下图，付款时有极大概率需要付款首月的youtube会员，小心别被反薅，正常显示的都是在下个月才收费

![image](https://i0.hdslb.com/bfs/new_dyn/b24d7dc8773238dce8883de6ac8fb5a13747579686817540.png@1192w.webp)

![image](https://i0.hdslb.com/bfs/new_dyn/9b5d510ce927dc364d468eb82cc7182e3747579686817540.png@1046w_1590h.webp)

### **4.然后如果不再出订购页面的话，不要着急，也不要取消订阅（其实取消了也无所谓）。**

先把拓展切换到六个月，再重新进入页面，接着点击切换到年付

就会再次出现订购页面，这里会出现2028.5.5付款（示例日期），不要担心，这个其实还是免费的，到2028.5.5才会付款；同样的方法再次操作，切换下一个6个月，就能实现2年pro会员了

![image](https://i0.hdslb.com/bfs/new_dyn/59a750f80e575523398a3cee77f0ae343747579686817540.png@1192w.webp)

> ps：
>
> 最后一定注意取消订阅，不要被反薅，因为附带有一个每月的youtube会员需要付费，不取消的话下个月就会被反薅

![image](https://i0.hdslb.com/bfs/new_dyn/c65340f450d8c110abd88de7f0faa99c3747579686817540.png@1192w.webp)

**佬友补充：**

> Fy6666:
>
> YouTube Premium Individual Add On无法使用。您可以单独订阅此套装中的其他商品。提示这样子怎么办呢？查了，是YouTube那个会员资格只有美国、加拿大、巴西、法国、德国、日本哦，这6个国家可以

> aikavvak12una:
>
> 账号地区不对可以直接先添加美国的付款方式就再订阅就行了
>
> 我的一个小号条款地区甚至是中国 🤣

更改play商店支付方式即可，和谷歌账号属地无关


## 使用入口

- **浏览器扩展版**：打开 Chrome 扩展管理页，开启开发者模式，选择“加载已解压的扩展程序”，加载 `extension` 目录。
- **批量版**：在 Windows 下进入 `batch` 目录，首次使用运行 `1_首次运行_安装依赖并启动.bat`，之后运行 `2_启动控制台.bat`。详细说明见 [批量版原说明](./batch/README.md)。

两个版本独立使用。本次整理仅增加仓库分层和本页介绍，不修改项目源代码。

本地账号与支付配置（`config*.json`）、环境变量文件、缓存和运行数据不提交到仓库；批量版的配置请在本地填写。
