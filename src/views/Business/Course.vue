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
								<img class='detailCoverPic' :src="courseDetails.picSrc" />.
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
								<!--  <a-button type="primary" size="large">
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
			courseDetails: {
				title: '高等软件工程',
				picSrc: "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
				intro: "高等软工歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死歪歪滴爱死绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子绝绝子",
				teacher: "张三", //预处理
				assistant: "aa",
				notice:"还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了还没交作业二的该打打了"
			}

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
		},
		mounted() {
			console.log(this.$route.query.courseid)
			this.$message.success(this.$route.query.courseid);
		}
	};
</script>
<style lang="less">
	@import url("./homework.less");
</style>
