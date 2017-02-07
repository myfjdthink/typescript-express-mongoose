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

## tslint
tslint 是基于 eslint 的代码风格检查工具。
配置文件是 tslint.json, 要执行代码风格检查请运行

```
npm tslint
```

Webstorm 有对 tslint 添加支持，配置一下即可。

## install
需要全局安装 typescript

```
npm install typescript@2.1.5 -g
npm i typings -g
```
然后安装依赖包

```
npm i
```

## build

```
npm build
```

typescript 文件无法直接运行，需要编译成 js，该命令会将 src 的 ts 文件编译为 js 文件并输出到 build 目录。首次运行或者发布前要 build 一次。

## run

```
MONGO_URI=mongodb://localhost:57017/user_koala  npm start
```
MONGO_URI 是 db 的连接方式。
实际执行的是 build/app.js 文件。

## test

```
npm test
```
