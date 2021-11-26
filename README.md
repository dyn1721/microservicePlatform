# microservicePlatform-front
 高等软工项目

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
