<template>
  <a-grid-content>
         <a-card :loading="loading" :bordered="false" :bodyStyle="{padding:'0px'}">
        <div class="salesCard">
          <a-tabs size="large" :tabBarStyle="{marginBottom: '24px',paddingLeft:'16px'}">
            <a-tab-pane key="myList" :tab="$t('business.homework.myList')">

				<a-row>
				      <a-col v-for="(item,i) in listData" :key="i" :span="6" style="height: 310px;">
						  <a @click="routeCourseInfo(item.courseid)" >
						  <a-card  hoverable style="width: 99%;height: 88%;" > <!-- style="width: 2400px;height: 2400px;" -->
						        <img
						          slot="cover"
						          alt="example"
						          :src="item.picsrc"
						        />
									<p class="courseTitle0">{{item.title}}</p>
									<!--  <template slot="actions" class="ant-card-actions">
									     <a-icon key="setting" type="setting" />
									     <a-icon key="edit" type="edit" />
									     <a-icon key="ellipsis" type="ellipsis" />
									   </template>
									     <a-avatar
									       slot="avatar"
									       src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
									     /> -->			
						  	</a-card>
							</a>
				      </a-col>
				</a-row>
             
           
         
            </a-tab-pane>
            <a-tab-pane style="height: 500px;"  key="create" :tab="$t('business.homework.createNew')">
              <p v-show="!ifTeacher" style="font-size: 25px; position: absolute; left: 600px; top:230px; ">学生账号不能新建课程！</p>
			  <div v-show="ifTeacher" >
				  <Input style="margin-bottom: 10px;width: 80%;position: relative;left: 10%; " v-model="update1" placeholder="课程名" />
				  <Input style="margin-bottom: 10px;width: 80%;position: relative;left: 10%;" v-model="update2" type="textarea" :autosize="{minRows: 3,maxRows: 10}"
				   placeholder="课程简介" />
				    <Input style="margin-bottom: 10px;width: 80%;position: relative;left: 10%;" v-model="update3" placeholder="讲师" />
					 <Input style="margin-bottom: 10px;width: 80%;position: relative;left: 10%;" v-model="update4" placeholder="助教" />
					 <a-button @click="createNewCourse" type="primary" size="default" style=" position: relative;width: 80%;left: 10%;top: 10px;  ">
					 	修改课程信息
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
import GLOBAL from '../global.js';
import { mapGetters } from "vuex";
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
  MiniProgress

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
	listData:[],
	visitLevel: 0,
	update1:null,
	update2:null,
	update3:null,
	update4:null,
  }),
  components: {
	AButton: Button,
	AAvatar:Avatar,
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
	routeCourseInfo(id){
		this.$router.push({path:'/business/courseInfo/',query: {courseid:id}})
	},
	createNewCourse(){
		//  interface check: 新建课程( username ，courseName,courseIntro,teacher，assistant )  简化版本 安全考虑应该username存在vuex中防止修改 懒得改了
		axios.get(GLOBAL.URL+'/createCourse', {
		          params: {
					username:localStorage.getItem("username"),
		            coursename: this.update1,
		            intro: this.update2,
					teacher: this.update3,
					assis: this.update4,
		          }
		        })
		        .then(res => {
		            var courseId=res.data
		            this.listData.push({
		            	title:this.update1,
		            	courseid:courseId,
		            	picsrc:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		            })
					this.$Message.success('创建课程成功！');
		          })
	}
  },
  computed: {
          ...mapGetters({username: "global/loginUserName"}),
		  ifTeacher: function() {
		  	return this.visitLevel == 2
		  }
        },
  mounted() {
	 //  interface check: 返回账户权限( username )
	 var username=localStorage.getItem("username")
	 axios.get(GLOBAL.URL+'/level', {
	           params: {
	             username: username
	           }
	         })
	         .then(res => {
	             this.visitLevel = res.data;
				 console.log(this.visitLevel);
				 //interface check: 获取某用户相关的所有课程(username)
				 axios.get(GLOBAL.URL+'/courses', {
				           params: {
				             username: username,
				           }
				         })
				         .then(res => {
							 this.listData=res.data;
				             console.log(res.data)
				           })
	           })
	
  }
};
</script>
<style lang="less">
@import url("./homework.less");
</style>
