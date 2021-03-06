# microservicePlatform-front

高等软工项目 前端部分

- [x] 登录/注册
- [x] 查看日志
- [x] 用户管理
- [x] 数据表管理
- [x] 课程、作业相关页面

#### DLC模块
- **暂时或者永远都不需要搞的 ：**
- 不重要 图片封面上传和保存（同一封面 或者指定演示封面即可）  
- 助教 助教即老师
- 不重要 语言切换（目前大部分可以切换 但是写的很麻烦 到时候找个页面针对性演示即可）  
- 助教 老师字段 简化 为String

#### 数据格式（类属性）

##### 课程
```js
this.courseDetails = {
  title: 'APEX：从落地重伤到顶猎乱杀',
  courseId: '1',
  picSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
  intro: "301歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子",
  teacher: "卡莎 青野", //简化为String  
  assistant: "白字 火神",  // 简化为String   
  notice: "还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了",
  task: [
    {
      taskId: '1', 
      taskTitle: '作业一 R301压枪教学',
      taskIntro: '关于我一梭子只能打11这件事'
    },
    {
      taskId: '2',
      taskTitle: '作业二 凤凰打电教学',
      taskIntro: '如何让队友帮你顶住10s'
    },
  ],
  studentList: [
    {
      username: '卡卡国大孝子',
      intro: 'apex我只认卡神！',
      gender: 'sir'
    },
    {
      username: '火烧俱乐部',
      intro: '注意米线！',
      gender: 'miss'
    },
  ]
};
``` 

#### 需要的接口

##### 登录/注册

-OK **自动登录密钥提交服务器保存(autoLoginKey:String)** 
 
自动登录会向服务器查询这个密钥和本地密钥比对，符合就无需密码登录（避免使用极不安全的cookie） 每个user保存一个该属性  
 返回true表示成功保存来回调

-OK **自动登录密钥检查(username:String,loadAutoKey:String)**  
用户勾选自动登录后以后访问首先发送该请求，检查该用户对应的密钥字段是否正确，保证登录的安全性  
返回true false就行

-OK **检查账号密码 (username:String, password: String)**  
登录时请求   
返回true false就行 （暂时没考虑检查账户是否存在这种细分错误）  

-OK **注册(username:String,password:String)**  
没啥好说的 你懂的 创个新user(后台无需检查用户名密码合法性)  
返回true表示成功保存来回调 false表示用户名重复  

-OK  **返回账户权限( username )**
查询该用户是学生还是老师  
学生返回1 老师2  

##### 作业发布平台  
-OK **获取某用户相关的所有课程(username)**   
如果是老师账号就返回他开的课程，学生返回他选的课程    
返回数据格式如：
```js
listData: [    
  {
    courseName:'高等软件工程',
    courseId:'1',
    coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'  //封面pic
  },
  {
    courseName:'高等软件工程2',
    courseId:'2',
    coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
  },
]
``` 

-OK **新建课程( username ，courseName,courseIntro,teacher，assistant )**
- 只会在身份是老师时调用
新建课程到该老师账号名下 （添加助教老师权限操作**通过权限管理模块**实现）    
创建成功返回courseId 失败返回失败标志  

-OK **新建作业( username ，courseId,taskname,taskIntro )**
- 只会在身份是老师时调用  
新建作业到该老师账号该课程名下 （添加助教老师权限操作**通过权限管理模块**实现）      
创建成功返回taskId 失败返回失败标志    

-OK **返回某课程的详细数据( courseID ，username )**  
根据username用户权限返回结果，结果包括该用户对课程访问权限等级  
例如 0 无任何权限（不返回课程数据）； 1 学生（并返回该课程简介 通知 任务列表和课程学生等相关数据） 2 老师（并返回课程相关数据）  
返回数据如：  
```js
this.courseDetails = {  
  title: 'APEX：从落地重伤到顶猎乱杀',  
  visitLevel:'2', //该账户的访问权限
  courseId:'1',  
  picSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",  
  intro: "301歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子",  
  teacher: "卡莎" 青野", //简化为String  
  assistant: "白字 火神",  // 简化为String   
  notice:"还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了",    
  task: [ 
    {  
      taskId: '1',  
      taskTitle: '作业一 R301压枪教学',  
      taskIntro: '关于我一梭子只能打11这件事'  
    },  
    {  
      taskId: '2',  
      taskTitle: '作业二 凤凰打电教学',  
      taskIntro: '如何让队友帮你顶住10s'  
    },  
  ],  
  studentList: [  
    {  
      username: '卡卡国大孝子',  
      intro: 'apex我只认卡神！',  
      gender: 'sir'  
    },  
    {  
      username: '火烧俱乐部',  
      intro: '注意米线！',  
      gender: 'miss'
    },  
  ]  
};  
``` 

-DELETE **X ****列表查询某user某课程的作业记录 ( username ，courseId， taskList : [ taskId1,taskId2,taskId3 ]  )**   **砍了**
-  只会在身份是学生时调用  
查询某username对应某courseId 下 指定taskList的作业提交状态（已提交1，未提交0 ，已打分*）  
返回同样也是对应的状态list[1,0,1```]  

-OK **学生提交作业( username ，courseId,taskId,content )**  
- 只会在身份是学生时调用   
某学生提交某课程某task的文本作业    
返回提交状态  

-OK **修改课程信息(courseid,title,intro)**  
- 只会在身份是老师时调用    
修改该课程的课程名和简介属性 返回修改结果  

-OK **修改课程最新通知(courseid,notice)**  
- 只会在身份是老师时调用    
修改指定课程通知字段属性 返回修改结果  

-OK **修改作业信息(courseid,taskid,tasktitle，taskinfo)**  
- 只会在身份是老师时调用  
修改指定课程指定任务的标题和简介字段属性 返回修改结果

-OK **删除课程(courseid)**
- 只会在身份是老师时调用  
修改数据库中与该课程相关所有数据 返回修改结果

-OK **删除作业(courseid,taskid)**
- 只会在身份是老师时调用  
修改数据库中与该课程该作业相关所有数据 返回修改结果

-OK **删除学生(courseid,username)**
- 只会在身份是老师时调用  
修改数据库中与该课程该学生相关所有数据 返回修改结果

-OK **获取某作业的提交情况(courseid,taskid)**
- 只会在身份是老师时调用    
返回该课程该作业的所有提交记录    
返回数据格式如：

```js
this.update3 = [
  {
    username:'AA',
    content:"sadjksaljdslajdlsadjkla"
  },
  {
    username:'BB',
    content:"sadjksaljdslajdlsadjkla"
  },
  {
    username:'CC',
    content:"sadjksaljdslajdlsadjkla"
  },
]
``` 

-OK **获取某人在某课程的所有作业的提交情况(courseid,username)**
- 只会在身份是老师时调用   
返回某人在某课程的所有作业的提交情况
返回数据格式如：

``` js
this.update3 = [
  {
    taskTitle:"作业一 R301压枪教学",
    commit:'感觉不如3030····近战'
  },
  {
    taskTitle:"作业二 凤凰打电教学",
    commit:'学会了 就是队友死太快了'
  },
  {
    taskTitle:"作业四 决赛圈的终极一战处理",
    commit:'打不到决赛圈怎么办 老师'
  },
]
``` 

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

#### 原项目

https://github.com/ruyangit/admin-workbench-ui
