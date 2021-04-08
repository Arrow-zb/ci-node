# DUI-RESOURCE-CI项目说明
## 1. 简介
项目主要的目的是：
1. 接收 dui-ui 的 gitlab hook 请求，拉取 dui-ui 代码，自动进行打包构建
2. 将构建好的 dui-ui lib 以及其他依赖推送到 dui-static 仓库
* node服务，地址 http://xxxx 
## 2. 搭建流程
### 2.1 express cli
```bash
npx express-generator
```
项目目录
```bash
.
├── README.md
├── app.js                  // 主入口文件
├── bin                         
│   └── www                 // 启动入口
├── package.json
├── public
├── routes  
│   └── index.js            
└── views
```
express cli 会自动为我们生成一个文件目录。
其中 cookie-parser 是用于处理 cookie 的，因此，在本项目中不需要。
其中 模板引擎也是不需要的
morgan HTTP request logger middleware for node.js。
### 2.2 CI
utils/ci.js 里需要实现的功能如下：
1. 捕获由 gitlab 发送的请求以获取 tag 版本
2. 监控异常

### 2.3 ci.sh
ci.sh 需要实现的功能如下：
1. 自动拉取 dui-ui 代码 并构建
2. 自动将 dui-ui lib copy 到 dui-static lib 中
3. 自动 push 到 dui-static 中
需要注意的是首次操作， 不论是拉取还是push，都需要解决权限问题
### 2.4 dingtalk-robot-sender
钉钉机器人推送消息


