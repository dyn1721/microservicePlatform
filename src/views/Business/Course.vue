<template>
  <a-grid-content>
    <a-card :loading="loading" :bordered="false" :bodyStyle="{padding:'0px'}">
      <div class="salesCard">
        <a-tabs size="large" :tabBarStyle="{marginBottom: '24px',paddingLeft:'16px'}">
          <a-tab-pane key="courseInfo" :tab="$t('business.homework.courseInfo')">

            <a-row>
              <a-col :span="8" style="height: 300px;">
                <img class='detailCoverPic' :src="courseDetails.picsrc"/>
                <a-button @click="courseModify" v-show="ifTeacher" type="primary" size="default"
                          style=" position: absolute; top:95%;left: 100px;width: 140px; ">
                  修改课程信息
                </a-button>
                <a-button @click="courseInfoModify" v-show="ifTeacher" type="primary" size="default"
                          style=" position: absolute; top:95%;left: 250px;width: 140px; ">
                  修改最新通知
                </a-button>
                <a-button v-show="ifTeacher" type="primary" size="default"
                          style=" position: absolute; top: 110%;left: 100px;width: 140px; ">
                  上传课程封面
                </a-button>
                <a-button @click="deleteWarn" v-show="ifTeacher" type="danger" size="default"
                          style=" position: absolute; top: 110%;left: 250px;width: 140px; ">
                  删除课程
                </a-button>
              </a-col>
              <Drawer title="修改课程信息" v-model="courseModifyVisible" width="420" :mask-closable="false">

                <div class="demo-drawer-footer">
                  <Input style="margin-bottom: 10px" v-model="update1" :placeholder="courseDetails.title"/>
                  <Input style="margin-bottom: 10px" v-model="update2" type="textarea"
                         :autosize="{minRows: 3,maxRows: 10}"
                         :placeholder="courseDetails.intro"/>
                  <Button style="margin-right: 8px" @click="courseModifyVisible = false">取消</Button>
                  <Button type="success" @click="submitCourseModify">提交</Button>
                </div>
              </Drawer>
              <Drawer title="修改最新通知" v-model="courseNoticeModifyVisible" width="420" :mask-closable="false">

                <div class="demo-drawer-footer">
                  <Input style="margin-bottom: 10px" v-model="update1" type="textarea"
                         :autosize="{minRows: 3,maxRows: 10}"
                         :placeholder="courseDetails.notice"/>
                  <Button style="margin-right: 8px" @click="courseNoticeModifyVisible = false">取消</Button>
                  <Button type="success" @click="submitCourseInfoModify">提交</Button>
                </div>
              </Drawer>
              <Drawer title="修改作业" v-model="homeworkModifyVisible" width="1020" :mask-closable="false">

                <div class="demo-drawer-footer">
                  <Input style="margin-bottom: 10px" v-model="update1" :placeholder="courseDetails.title"/>
                  <Input style="margin-bottom: 10px" v-model="update2" type="textarea"
                         :autosize="{minRows: 3,maxRows: 10}"
                         :placeholder="courseDetails.intro"/>
                  <Button style="margin-right: 8px" @click="homeworkModifyVisible = false">取消</Button>
                  <Button type="success" @click="homeworkModifySubmit">提交</Button>
                </div>
              </Drawer>
              <Drawer :title="update1+'的提交情况'" v-model="submitVisible" width="1020" :mask-closable="false">
                <Card v-for="(item,i) in update3" :key="'submit'+i" style="height: 100px;">
                  <p style="font-size: 25px; position: absolute; left: 20px; top:30px;font-weight: bold; ">
                    {{ item.userid }}:</p>
                  <p style="font-size: 22px; position: absolute; right: 20px; top:30px;font-style:oblique ; ">"
                    {{ item.submit }} "</p>
                </Card>
              </Drawer>
              <Drawer :title="update1+'的提交情况'" v-model="submitVisiblePersonal" width="1020" :mask-closable="false">
                <Card v-for="(item,i) in update3" :key="'submit'+i" style="height: 100px;">
                  <p style="font-size: 25px; position: absolute; left: 20px; top:30px;font-weight: bold; ">
                    {{ item.taskid }}:</p>
                  <p style="font-size: 22px; position: absolute; right: 20px; top:30px;font-style:oblique ; ">"
                    {{ item.submit }} "</p>
                </Card>
              </Drawer>
              <Drawer :title="'提交: '+update2" v-model="submitHwVisible" width="620" :mask-closable="false">
                <div class="demo-drawer-footer">
                  <p style="font-size: 14px; font-style:oblique ;">{{ update3 }}</p>
                  <br/><br/>
                  <Input style="margin-bottom: 10px" v-model="update4" type="textarea"
                         :autosize="{minRows: 1,maxRows: 8}" placeholder="请输入你的提交内容"/>

                  <Button style="margin-right: 8px" @click="submitHwVisible = false">取消</Button>
                  <Button type="success" @click="submitHomeworkOver">提交</Button>
                </div>
              </Drawer>
              <a-col :span="8" style="height: 500px;">
                <Card :bordered="true">
                  <img src="../../assets/course.png" style="height: 40px; position: absolute; top:30px;"/>
                  <p style="font-size: 25px; position: absolute; left: 80px; top:30px; ">{{ courseDetails.title }}</p>
                  <br/><br/><br/><br/><br/>
                  <p style="font-size: 16px;">{{ courseDetails.intro }}</p>

                  <br/><br/><br/>
                  <p style="font-size: 18px;">讲师：{{ courseDetails.teacher }}</p>
                  <p style="font-size: 18px;">助教：{{ courseDetails.assistant }}</p>
                </Card>
                <!-- <a-card>
            <Icon type="checkmark" />

             <p style="font-size: 30px;font-weight: bold; " >{{courseDetails.title}} </p>
             </a-card> -->
              </a-col>
              <a-col :span="8">
                <Card style="width: 90%;position: relative;left: 5%;" :bordered="true">
                  <img src="../../assets/notice.png" style="height: 40px; position: absolute; top:30px;"/>
                  <p style="font-size: 25px; position: absolute; left: 80px; top:30px; ">最新通知</p>
                  <br/><br/><br/><br/><br/>
                  <p style="font-size: 16px;">{{ courseDetails.notice }}</p>
                </Card>
                <!-- 	 <a-button type="primary" size="large">
                      查看作业
                    </a-button>
                <a-button type="primary" size="large">
                     查看学生
                   </a-button>
                 <a-button type="primary" size="large">
                      管理作业
                    </a-button>
                  <a-button type="primary" size="large">
                       管理学生
                     </a-button> -->
              </a-col>
            </a-row>


          </a-tab-pane>

          <a-tab-pane key="homeworks" :tab="$t('business.homework.homeworks')">
            <Card v-for="(item,i) in courseDetails.task" :key="'task'+i" style="height: 200px;">
              <img :src="item.iconSrc" style=" position: absolute; top:30px;left: 30px; height: 70px;"/>
              <p style=" position: absolute; top:30px;left: 120px; font-size: 18px;"> {{ item.tasktitle }} </p>
              <hr noshade size=1 color=#dfe2df width=300 style=" position: absolute; top:60px;left: 120px; ">
              <p style=" position: absolute; top:70px;left: 120px; font-size: 14px;width: 75%;">
                {{ item.taskintro }} </p>
              <img v-show="ifStudent" :src="item.status"
                   style=" position: absolute; top:30%;right: 30px; height: 70px;"/>
              <a-button @click='submitHomework(item,i)' v-show="ifStudent" type="primary"
                        style=" position: absolute; top: 72%;right: 29px;width: 70px; ">
                提交
              </a-button>

              <a-button v-show="ifTeacher" @click="submitShow(item)" type="primary"
                        style=" position: absolute; top:20%;right: 29px;width: 100px; ">
                提交情况
              </a-button>
              <a-button v-show="ifTeacher" @click="homeworkModify(item,i)" type="primary"
                        style=" position: absolute; top: 40%;right: 29px;width: 100px; ">
                修改作业
              </a-button>
              <a-button @click="deleteHomeworkWarn(item,i)" v-show="ifTeacher" type="danger"
                        style=" position: absolute; top: 60%;right: 29px;width: 100px; ">
                删除作业
              </a-button>
            </Card>
          </a-tab-pane>
          <a-tab-pane key="students" :tab="$t('business.homework.students')">
            <Card v-for="(item,i) in courseDetails.studentList" :key="'student'+i" style="height: 80px;">
              <img :src="require(item.gender=='sir'? '../../assets/male.png' : '../../assets/female.png')"
                   style=" position: absolute; top:10px;left: 30px; height: 70px;"/>
              <p style=" position: absolute; top:30px;left: 120px; font-size: 18px;"> {{ item.username }} </p>
              <p style=" position: absolute; top:30px;left: 300px; font-size: 18px; font-style:oblique ;"> "
                {{ item.intro }} "
              </p>
              <a-button @click="submitShowPersonal(item)" v-show="ifTeacher" type="primary"
                        style=" position: absolute; top:30%;right: 150px;width: 100px; ">
                作业情况
              </a-button>
              <a-button @click="deleteStudentWarn(item,i)" v-show="ifTeacher" type="danger"
                        style=" position: absolute; top:30%;right: 29px;width: 100px; ">
                删除学生
              </a-button>
            </Card>
          </a-tab-pane>

          <a-tab-pane style="height: 500px;" key="create" tab="新建作业">
            <p v-show="!ifTeacher" style="font-size: 25px; position: absolute; left: 600px; top:230px; ">学生账号不能新建作业！</p>
            <div v-show="ifTeacher">
              <Input style="margin-bottom: 10px;width: 80%;position: relative;left: 10%; " v-model="update1"
                     placeholder="作业名"/>
              <Input style="margin-bottom: 10px;width: 80%;position: relative;left: 10%;" v-model="update2"
                     type="textarea" :autosize="{minRows: 3,maxRows: 10}"
                     placeholder="作业内容"/>
              <a-button @click="createHomework" type="primary" size="default"
                        style=" position: relative;width: 80%;left: 10%;top: 10px;  ">
                新建作业
              </a-button>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <!-- <a-row :gutter="24">8</a-row> -->
  </a-grid-content>
</template>

<script>
import axios from 'axios';
import GLOBAL from '@/views/global';
import {
  mapGetters
} from "vuex";
import {
  Card,
  Row,
  Col,
  Tooltip,
  Icon,
  Tabs,
  DatePicker,
  Avatar,
  Button

} from "ant-design-vue";
import GridContent from "@/components/PageHeaderWrapper/GridContent";
import Trend from "@/components/Trend";
import NumberInfo from "@/components/NumberInfo";
import {
  ChartCard,
  Field,
  yuan,
  MiniProgress,
  // MiniBar,
  // MiniArea
} from "@/components/Charts";
import numeral from "numeral";
// import moment from 'moment';
// import 'moment/locale/zh-cn';
// moment.locale('zh-cn');

export default {
  data: () => ({
    loading: false,
    courseID: null,
    visitLevel: 0,
    courseDetails: {},
    courseModifyVisible: false,
    courseNoticeModifyVisible: false,
    submitVisiblePersonal: false,
    homeworkModifyVisible: false,
    submitHwVisible: false,
    submitVisible: false,
    update1: null,
    update2: null,
    update3: null,
    update4: null,
    update5: null,

  }),
  components: {
    AButton: Button,
    AAvatar: Avatar,
    AGridContent: GridContent,
    ACard: Card,
    ARow: Row,
    ACol: Col,
    AChartCard: ChartCard,
    AField: Field,
    ATooltip: Tooltip,
    AIcon: Icon,
    ATrend: Trend,
    AMiniProgress: MiniProgress,
    // AMiniBar: MiniBar,
    // AMiniArea: MiniArea,
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    ARangePicker: DatePicker.RangePicker,
    ANumberInfo: NumberInfo
  },
  methods: {
    yuan,
    numeral,
    deleteWarn() {
      this.$Modal.confirm({
        title: '重要操作提示',
        content: '<p>你确定要删除该课程？</p><p>该操作可能不可逆，请确认</p>',
        onOk: () => {
          //interface check: 删除课程(courseid)
          axios.get(GLOBAL.URL + '/deleteCourse', {
            params: {
              courseid: this.courseID,
            }
          })
              .then(res => {
                this.$Message.info('delete ok');
                this.$router.push({path: '/dashboard'})
              })

        },
        onCancel: () => {
          this.$Message.info('delete cancel');
        }
      });
    },

    deleteHomeworkWarn(item, i) {
      this.$Modal.confirm({
        title: '重要操作提示',
        content: '<p>你确定要删除该作业？</p><p>该操作可能不可逆，请确认</p>',
        onOk: () => {
          //interface check: 删除作业(courseid,taskid)
          axios.get(GLOBAL.URL + '/deleteTask', {
            params: {
              taskid: item.taskid,
            }
          })
              .then(res => {
                this.courseDetails.task.splice(i, 1)
                this.$Message.info('delete ok');
              })
        },
        onCancel: () => {
          this.$Message.info('delete cancel');
        }
      });
    },
    deleteStudentWarn(item, i) {
      this.$Modal.confirm({
        title: '重要操作提示',
        content: '<p>你确定要删除该学生？</p><p>该操作可能不可逆，请确认</p>',
        onOk: () => {
          //interface check: 删除学生(courseid,username) courseDetails.studentList
          axios.get(GLOBAL.URL + '/deleteStudent', {
            params: {
              courseid: this.courseID,
              username: item.username,
            }
          })
              .then(res => {
                this.courseDetails.studentList.splice(i, 1)
                this.$Message.info('delete ok');
              })
        },
        onCancel: () => {
          this.$Message.info('delete cancel');
        }
      });
    },
    courseModify() {
      this.update1 = this.courseDetails.title
      this.update2 = this.courseDetails.intro
      this.courseModifyVisible = true;
    },
    submitCourseModify() {
      //interface check: 修改课程信息(courseid,title,intro)
      axios.get(GLOBAL.URL + '/modifyCourseInfo', {
        params: {
          courseid: this.courseID,
          title: this.update1,
          intro: this.update2
        }
      })
          .then(res => {
            this.courseDetails.title = this.update1
            this.courseDetails.intro = this.update2
          })
      this.courseModifyVisible = false;
    },
    courseInfoModify() {
      this.update1 = this.courseDetails.notice
      this.courseNoticeModifyVisible = true;
    },
    submitCourseInfoModify() {
      //interface check: 修改课程最新通知(courseid,notice)
      axios.get(GLOBAL.URL + '/modifyCourseNotice', {
        params: {
          courseid: this.courseID,
          notice: this.update1,
        }
      })
          .then(res => {
            this.courseDetails.notice = this.update1
          })
      this.courseNoticeModifyVisible = false;
    },
    homeworkModify(item, i) {
      console.log(item)
      this.update1 = item.tasktitle
      this.update2 = item.taskintro
      this.update3 = item.taskid
      this.update4 = i
      this.homeworkModifyVisible = true;
    },
    homeworkModifySubmit() {
      //interface check: 修改作业信息(courseid,taskid,tasktitle，taskinfo)
      axios.get(GLOBAL.URL + '/modifyTaskInfo', {
        params: {
          taskid: this.update3,
          tasktitle: this.update1,
          taskintro: this.update2
        }
      })
          .then(res => {
            console.log(this.update4)
            this.courseDetails.task[this.update4].tasktitle = this.update1
            this.courseDetails.task[this.update4].taskintro = this.update2
            this.$Message.success('作业信息已更新');
          })
      this.homeworkModifyVisible = false;
    },
    submitShowPersonal(item) {
      this.update1 = item.username
      //interface check: 获取某人在某课程的所有作业的提交情况(courseid,username)
      axios.get(GLOBAL.URL + '/getSbsubmit', {
        params: {
          courseid: this.courseID,
          username: item.username,
        }
      })
          .then(res => {
            this.update3 = res.data;
            console.log(res.data)
            this.submitVisiblePersonal = true
            // this.update3=[{
            // 	taskTitle:"作业一 R301压枪教学",
            // 	commit:'感觉不如3030····近战'
            // },
            // {
            // 	taskTitle:"作业二 凤凰打电教学",
            // 	commit:'学会了 就是队友死太快了'
            // },
            // {
            // 	taskTitle:"作业四 决赛圈的终极一战处理",
            // 	commit:'打不到决赛圈怎么办 老师'
            // },
            // ]
          })
    },
    submitShow(item) {
      this.update1 = item.tasktitle
      this.update2 = item.taskintro
      this.update3 = item.taskid
      //interface check: 获取某作业的提交情况(courseid,taskid)
      axios.get(GLOBAL.URL + '/taskSubmit', {
        params: {
          taskid: item.taskid,
        }
      })
          .then(res => {
            console.log(res.data)
            this.update3 = res.data;
            // [{
            //          	username:'十年老OP',
            //          	content:"感觉不如原神。。。画质"
            //          },
            //          {
            //          	username:'火烧俱乐部',
            //          	content:"我宣布直播间由白字占领！！"
            //          },
            //          {
            //          	username:'Sally哥',
            //          	content:"Sally哥来了全杀了"
            //          },
            //          ]
            this.submitVisible = true;
          })
    },
    createHomework() {
      //  interface check: 新建作业( username ，courseId,taskname,taskIntro )
      axios.get(GLOBAL.URL + '/createTask', {
        params: {
          username: localStorage.getItem("username"),
          courseId: this.courseID,
          taskname: this.update1,
          taskIntro: this.update2,
        }
      })
          .then(res => {
            var taskId = res.data
            this.courseDetails.task.push({
              taskid: taskId,
              tasktitle: this.update1,
              taskintro: this.update2,
              iconSrc: require('../../assets/ran' + (Math.floor(Math.random() * 4) + 1) + '.png')
            })
            this.$Message.success('创建作业成功！');
          })
    },
    submitHomework(item, i) {
      this.update1 = item.taskid;
      this.update2 = item.tasktitle;
      this.update3 = item.taskintro;
      this.update5 = i;
      console.log(this.update5);
      this.submitHwVisible = true;
    },
    submitHomeworkOver() {
      //  interface check: 学生提交作业( username ，courseId,taskId,content=this.update4 )
      console.log(this.courseDetails)
      axios.get(GLOBAL.URL + '/submitTask', {
        params: {
          username: localStorage.getItem("username"),
          taskId: this.update1,
          submit: this.update4
        }
      })
          .then(res => {
            var res = 1 //提交成功
            this.courseDetails.task[this.update5]['status'] = require('../../assets/complete.png');
            this.submitHwVisible = false;
            this.$Message.success('提交作业成功！');
          })

    }
  },
  computed: {
    ...mapGetters({
      username: "global/loginUserName"
    }),
    ifStudent: function () {
      return this.visitLevel == 1
    },
    ifTeacher: function () {
      return this.visitLevel == 2
    }
  },
  mounted() {
    // axios.get(GLOBAL.URL+'/errorTest', {
    //           params: {
    //             username: values['username'],
    //             password: values['password'],
    //           }
    //         })
    //         .then(res => {

    //           })
    console.log(this.$route.query.courseid)
    this.$message.success(this.$route.query.courseid);
    this.courseID = this.$route.query.courseid;
    var username = localStorage.getItem("username")
    axios.get(GLOBAL.URL + '/level', {
      params: {
        username: username
      }
    })
        .then(res => {
          this.visitLevel = res.data;
          //  interface check: 返回某课程的详细数据( courseID ，username )
          axios.get(GLOBAL.URL + '/courseInfo', {
            params: {
              courseid: this.courseID,
              username: username,
            }
          })
              .then(res => {
                this.courseDetails = res.data;
                //  interface check: 列表查询某user某课程的作业记录 ( username ，courseId， taskList : [ taskId1,taskId2,taskId3 ]  )
                //simulate  已取消
                if (this.visitLevel == 1) {
                  // var result = [1, 0, 1,0];
                  for (var i = 0; i < this.courseDetails.task.length; i++) {
                    this.courseDetails.task[i]['status'] = require('../../assets/out.png');
                    // if (result[i] == 1) {
                    // 	this.courseDetails.task[i]['status'] = require('../../assets/complete.png');
                    // } else if (result[i] == 0) {
                    // 	this.courseDetails.task[i]['status'] = require('../../assets/out.png');
                    // }
                  }
                }
                //config Icon
                for (var i = 0; i < this.courseDetails.task.length; i++) {
                  this.courseDetails.task[i]['iconSrc'] = require('../../assets/ran' + (Math.floor(Math.random() * 4) + 1) + '.png');
                }
              })
          // this.courseDetails = {
          // 	title: 'APEX：从落地重伤到顶猎乱杀',
          // 	courseId: '1',
          // 	picSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
          // 	intro: "301歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子",
          // 	teacher: "卡莎", //list ["张三"]
          // 	assistant: "白字 火神", // list ["aa"]
          // 	notice: "还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了",
          // 	task: [{
          // 			taskId: '1',
          // 			taskTitle: '作业一 R301压枪教学',
          // 			taskIntro: '关于我一梭子只能打11这件事'
          // 		},
          // 		{
          // 			taskId: '2',
          // 			taskTitle: '作业二 凤凰打电教学',
          // 			taskIntro: '如何让队友帮你顶住10s'
          // 		},
          // 		{
          // 			taskId: '3',
          // 			taskTitle: '作业三 碎片西部实战教学',
          // 			taskIntro: '落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打'
          // 		},
          // 		{
          // 			taskId: '4',
          // 			taskTitle: '作业四 决赛圈的终极一战处理',
          // 			taskIntro: '还在人云亦云 拾人牙慧？ 教你打apex 告诉你决赛圈如何3个蓝甲打3个红甲！还在人云亦云 拾人牙慧？ 教你打apex 告诉你决赛圈如何3个蓝甲打3个红甲！还在人云亦云 拾人牙慧？ 教你打apex 告诉你决赛圈如何3个蓝甲打3个红甲！还在人云亦云 拾人牙慧？ 教你打apex 告诉你决赛圈如何3个蓝甲打3个红甲！还在人云亦云 拾人牙慧？ 教你打apex 告诉你决赛圈如何3个蓝甲打3个红甲！还在人云亦云 拾人牙慧？ 教你打apex 告诉你决赛圈如何3个蓝甲打3个红甲！'
          // 		}
          // 	],
          // 	studentList: [
          // 		{
          // 				username: '宁神',
          // 				intro: 'apex马枪之神 北航摸鱼王',
          // 				gender: 'sir'
          // 			},
          // 		{
          // 				username: '胡神',
          // 				intro: 'apex密客专精 众神殿永远嘀神之一',
          // 				gender: 'sir'
          // 			},
          // 		{
          // 				username: 'SCYU',
          // 				intro: '批站认证：北航第一虚拟主播 2021年百大up猪',
          // 				gender: 'sir'
          // 			},
          // 		{
          // 			username: '卡卡国大孝子',
          // 			intro: 'apex我只认卡神！',
          // 			gender: 'sir'
          // 		},
          // 		{
          // 			username: '火烧俱乐部',
          // 			intro: '注意米线！',
          // 			gender: 'sir'
          // 		},
          // 		{
          // 			username: '十年老OP',
          // 			intro: '刻晴和胡桃大伙不好选吧！',
          // 			gender: 'sir'
          // 		},
          // 		{
          // 			username: '犹如幻翳',
          // 			intro: '该账号已封禁',
          // 			gender: 'sir'
          // 		},
          // 		{
          // 			username: '嘉心糖都是神',
          // 			intro: '好像当嘉然小姐的狗啊',
          // 			gender: 'miss'
          // 		},
          // 		{
          // 			username: 'otto',
          // 			intro: '大家好啊 我叫电棍',
          // 			gender: 'sir'
          // 		},
          // 		{
          // 			username: '炫√',
          // 			intro: '我是狗？我是炫公主！',
          // 			gender: 'miss'
          // 		},
          // 		{
          // 			username: '山泥若',
          // 			intro: '只能阴间再见了',
          // 			gender: 'sir'
          // 		},
          // 	]
          // };

        })
  }
};
</script>
<style lang="less">
@import url("./homework.less");
</style>
