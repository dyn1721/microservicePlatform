<template>
  <a-grid-content>
         <a-card :loading="loading" :bordered="false" :bodyStyle="{padding:'0px'}">
        <div class="salesCard">
          <a-tabs size="large" :tabBarStyle="{marginBottom: '24px',paddingLeft:'16px'}">
            <div slot="tabBarExtraContent" class="salesExtraWrap">
              <div class="salesExtra">
                <a >
                  {{$t('app.analysis.all-day')}}
                </a>
                <a class="currentDate">
                  {{$t('app.analysis.all-week')}}
                </a>
                <a >
                  {{$t('app.analysis.all-month')}}
                </a>
                <a >
                  {{$t('app.analysis.all-year')}}
                </a>
              </div>
              <a-range-picker style="width:256px;"/>
            </div>
            <a-tab-pane key="myList" :tab="$t('business.homework.myList')">

				<a-row>
				     
				</a-row>
             
           
         
            </a-tab-pane>
            <a-tab-pane key="create" :tab="$t('business.homework.createNew')">
              
            </a-tab-pane>
          </a-tabs>
        </div>
    </a-card>
    <!-- <a-row :gutter="24">8</a-row> -->
  </a-grid-content>
</template>

<script>
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
	listData:[    
		{
			courseName:'高等软件工程',
			courseId:'1',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'高等软件工程',
			courseId:'1',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'高等软件工程',
			courseId:'1',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'高等软件工程',
			courseId:'1',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'高等软件工程',
			courseId:'1',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'高等软件工程',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'高等软件工程',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'高等软件工程',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		},
		{
			courseName:'操作系统',
			courseId:'2',
			coverPic:'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png'
		}
	]
  }),
  components: {
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
	}
  },
  computed: {
          ...mapGetters({username: "global/loginUserName"}),
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
