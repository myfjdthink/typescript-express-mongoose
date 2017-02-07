#klg-direct-invest
## 背景描述
直投项目，其他 P2P 平台可以直接发送放款请求到该项目。
经过风控后，系统将借款人录入标的，生成放款订单。
由财务审核放款订单后调用第三方支付平台接口给借款人直接放款。

## 开发语言
使用 typescript 开发。
软件版本
- typescript  版本 2.1.5
- node 版本 6.x  lts
- npm 版本 3.x

## install
需要全局安装 typescript

```
cnpm install typescript@2.1.5 -g
cnpm i typings -g
```

## build

```
npm build
```

会将 src 的 ts 文件编译为 js 文件并输出到 build 目录。

## run

```
npm start
```

实际执行的是 build/app.js 文件。

## test

```
npm test
```
