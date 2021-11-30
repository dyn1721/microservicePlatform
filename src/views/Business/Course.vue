<template>
	<a-grid-content>
		<a-card :loading="loading" :bordered="false" :bodyStyle="{padding:'0px'}">
			<div class="salesCard">
				<a-tabs size="large" :tabBarStyle="{marginBottom: '24px',paddingLeft:'16px'}">
					<div slot="tabBarExtraContent" class="salesExtraWrap">
						<div class="salesExtra">
							<a>
								{{$t('app.analysis.all-day')}}
							</a>
							<a class="currentDate">
								{{$t('app.analysis.all-week')}}
							</a>
							<a>
								{{$t('app.analysis.all-month')}}
							</a>
							<a>
								{{$t('app.analysis.all-year')}}
							</a>
						</div>
						<a-range-picker style="width:256px;" />
					</div>
					<a-tab-pane key="courseInfo" :tab="$t('business.homework.courseInfo')">

						<a-row>
							<a-col :span="8" style="height: 300px;">
								<img class='detailCoverPic' :src="courseDetails.picSrc" />
								<a-button v-show="ifTeacher" type="primary" size="" style=" position: absolute; top:95%;left: 100px;width: 140px; ">
								   修改课程信息
								 </a-button>
								 <a-button v-show="ifTeacher" type="primary" size="" style=" position: absolute; top:95%;left: 250px;width: 140px; ">
								    修改最新通知
								  </a-button>
								  <a-button v-show="ifTeacher" type="primary" size="" style=" position: absolute; top: 110%;left: 100px;width: 140px; ">
								     上传课程封面
								   </a-button>
								   <a-button v-show="ifTeacher" type="danger" size="" style=" position: absolute; top: 110%;left: 250px;width: 140px; ">
								      删除课程
								    </a-button>
							</a-col>
							<a-col :span="8" style="height: 500px;">
								<Card :bordered="true">
									<img src="../../assets/course.png" style="height: 40px; position: absolute; top:30px;" />
									<p style="font-size: 25px; position: absolute; left: 80px; top:30px; ">{{courseDetails.title}}</p>
									<br /><br /><br /><br /><br />
									<p style="font-size: 16px;">{{courseDetails.intro}}</p>

									<br /><br /><br />
									<p style="font-size: 18px;">讲师：{{courseDetails.teacher}}</p>
									<p style="font-size: 18px;">助教：{{courseDetails.assistant}}</p>
								</Card>
								<!-- <a-card>
						<Icon type="checkmark" />
						 
						 <p style="font-size: 30px;font-weight: bold; " >{{courseDetails.title}} </p>
						 </a-card> -->
							</a-col>
							<a-col :span="8">
								<Card style="width: 90%;position: relative;left: 5%;" :bordered="true">
									<img src="../../assets/notice.png" style="height: 40px; position: absolute; top:30px;" />
									<p style="font-size: 25px; position: absolute; left: 80px; top:30px; ">最新通知</p>
									<br /><br /><br /><br /><br />
									<p style="font-size: 16px;">{{courseDetails.notice}}</p>
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
						<Card v-for="(item,i) in courseDetails.task" :key="'task'+i"  style="height: 200px;">
							<img :src="item.iconSrc" style=" position: absolute; top:30px;left: 30px; height: 70px;" />
							<p style=" position: absolute; top:30px;left: 120px; font-size: 18px;"  > {{item.taskTitle}} </p>
							<hr  noshade size=1 color=#dfe2df width=300  style=" position: absolute; top:60px;left: 120px; ">
							<p style=" position: absolute; top:70px;left: 120px; font-size: 14px;width: 75%;"  > {{item.taskIntro}} </p>
							<img v-show="ifStudent" :src="item.status" style=" position: absolute; top:30%;right: 30px; height: 70px;"/>
							<a-button v-show="ifStudent" type="primary" size="" style=" position: absolute; top: 72%;right: 29px;width: 70px; ">
							   提交
							 </a-button>
							 
							 <a-button v-show="ifTeacher" type="primary" size="" style=" position: absolute; top:20%;right: 29px;width: 100px; ">
							    提交情况
							  </a-button>
							  <a-button v-show="ifTeacher" type="primary" size="" style=" position: absolute; top: 40%;right: 29px;width: 100px; ">
							     修改作业
							   </a-button>
							   <a-button v-show="ifTeacher" type="danger" size="" style=" position: absolute; top: 60%;right: 29px;width: 100px; ">
							      删除作业
							    </a-button>
						</Card>
					</a-tab-pane>
					<a-tab-pane key="students" :tab="$t('business.homework.students')">

					</a-tab-pane>
				</a-tabs>
			</div>
		</a-card>
		<!-- <a-row :gutter="24">8</a-row> -->
	</a-grid-content>
</template>

<script>
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
			courseID:null,
			visitLevel:0,
			courseDetails: {},

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

		},
		computed: {
			...mapGetters({
				username: "global/loginUserName"
			}),
			ifStudent:function(){
				return this.visitLevel==1
			},
			ifTeacher:function(){
				return this.visitLevel==2
			}
		},
		mounted() {
			console.log(this.$route.query.courseid)
			this.$message.success(this.$route.query.courseid);
			this.courseID=this.$route.query.courseid;
			//  interface check: 返回某课程的详细数据( courseID ，username )
			//simulate
			this.visitLevel=2; // teacher 2 student 1 none 0（踢回）
			this.courseDetails={
				title: 'APEX：从落地重伤到顶猎乱杀',
				courseId:'1',
				picSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
				intro: "301歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子",
				teacher: "卡莎", //list ["张三"]
				assistant: "白字 火神",  // list ["aa"]
				notice:"还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了",
				task:[
					{
						taskId:'1',
						taskTitle:'作业一 R301压枪教学',
						taskIntro:'关于我一梭子只能打11这件事'
					},
					{
						taskId:'2',
						taskTitle:'作业二 凤凰打电教学',
						taskIntro:'如何让队友帮你顶住10s'
					},
					{
						taskId:'3',
						taskTitle:'作业三 碎片西部实战教学',
						taskIntro:'落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打落地一把波塞克 装备全靠打'
					}
				],
			};
			//  interface check: 列表查询某user某课程的作业记录 ( username ，courseId， taskList : [ taskId1,taskId2,taskId3 ]  )
			//simulate
			if (this.visitLevel==1){
				var result=[1,0,1];
				for (var i=0;i<this.courseDetails.task.length;i++){
					if (result[i]==1){
						this.courseDetails.task[i]['status']=require('../../assets/complete.png');	
					}
					else if(result[i]==0){
						this.courseDetails.task[i]['status']=require('../../assets/out.png');	
					}
				}
			}
			
			//config Icon
			for (var i=0;i<this.courseDetails.task.length;i++){
				this.courseDetails.task[i]['iconSrc']=require('../../assets/ran'+(Math.floor(Math.random() * 4)+1)+'.png');	
			}
		}
	};
</script>
<style lang="less">
	@import url("./homework.less");
</style>
