# microservicePlatform-front
 高等软工项目

#### 需要的接口
##### 登录/注册
- **自动登录密钥提交服务器保存(autoLoginKey:String)** 
 
自动登录会向服务器查询这个密钥和本地密钥比对，符合就无需密码登录（避免使用极不安全的cookie） 每个user保存一个该属性  
 返回true表示成功保存来回调

- **自动登录密钥检查(username:String,loadAutoKey:String)**  
用户勾选自动登录后以后访问首先发送该请求，检查该用户对应的密钥字段是否正确，保证登录的安全性  
返回true false就行

- **检查账号密码 (username:String, password: String)**  
登录时请求   
返回true false就行 （暂时没考虑检查账户是否存在这种细分错误）  

- **注册(username:String,password:String)**  
没啥好说的 你懂的 创个新user  
返回true表示成功保存来回调 false表示用户名重复  



#### 软件架构
* [vue/cli3](https://cli.vuejs.org)
* vue 2.5.17 
* vue-router 3.0.1
* vuex 3.0.1
* vuex-router-sync 5.0.5
* vue-i18n 8.1.0
* numeral 2.0.6
* axios 0.18.0
* [ant-design-vue 1.1.2 组件库](https://vuecomponent.github.io/ant-design-vue)
* [antv/g2 3.2.7 图表库](http://g2.alipay.com/)




#### 安装教程
```
npm install
```

### 运行包含热加载的开发环境
```
npm run serve
```

### 打包压缩后的生产文件
```
npm run build
```

### 本地如何运行打包后的生产文件
```
npm install serve -g  安装serve服务 -g 安装到全局

serve -s dist 运行打包后的生产文件 dist 打包后的文件夹
```

### Lints and fixes files
```
npm run lint
```

#### 功能模块
##### 登录
包含**自动登录**判断：
没登录直接url访问踢回登录页；
已登录但是没勾选自动登录下次也得登录；
勾选自动登录无需再次登录

目前唯一指定账号：
用户名 test
密码 123

#### 原项目

https://github.com/ruyangit/admin-workbench-ui
