#typescript-express-mongoose

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
MONGO_URI=mongodb://localhost:57017/test npm test
```

## 项目结构
app
--controllers
--decorators
--lib
--middleware
--models

### 路由
直接在 Controller 方法上使用注解
@router('get /user/findOne')
如果没有直接 url 则默认是 /controller/method

