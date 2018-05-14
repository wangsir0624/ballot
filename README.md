# ballot
基于以太坊区块链开发的投票应用

## Usage

### truffle安装
此Demo是采用truffle开发框架进行开发的，使用之前必须先安装truffle。

```bash
npm install -g truffle
```

Ethereum客户端安装
推荐先在私有区块链网络上进行测试，测试通过之后再部署到正式网络上。可以使用[Ganache](http://truffleframework.com/ganache/)或[truffle develop](http://truffleframework.com/docs/getting_started/client)工具快速搭建以太坊测试网络，对于习惯使用图形界面的用户，推荐使用Ganache。如果对命令行操作比较熟悉的话，也可以使用ganache-cli或truffle develop。

### 流程

首先打开Ethereum客户端，以Ganache进行说明，Ganache默认使用的rest API地址为http://127.0.0.1:7545，打开truffle.js，配置好网络。

编译
```bash
truffle compile
```

迁移
```bash
truffle migrate
```

使用浏览器进行访问，要注意的是，访问以太坊Dapp必须使用专用的浏览器。Firefox、Chrome以及Opera等浏览器可以使用metamask插件进行访问。


