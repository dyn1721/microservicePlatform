<template>
  <div class="system-log">
    <h2 style="margin-bottom: 10px;">
      后端控制台输出
<!--      <a-icon type="loading" v-if="loading" />-->
      <a-divider type="vertical" />
      <a @click="startLog()" v-if="interval === null"><a-icon type="play-circle" /></a>
      <a-icon type="play-circle" v-else />
      <a-divider type="vertical" />
      <a @click="stopLog()" v-if="interval !== null"><a-icon type="pause-circle" /></a>
      <a-icon type="pause-circle" v-else />
      <a-divider type="vertical" />
      <a @click="logContent = ''" v-if="logContent"><a-icon type="stop" /></a>
      <a-icon type="stop" v-else />
    </h2>
    <pre class="log-content">{{ logContent }}</pre>
  </div>
</template>

<script>
import {Row, Col, Button, Icon, Divider} from "ant-design-vue";
import {DjangoURL} from '../../main';

export default {
  name: 'system-log',
  data() {
    return {
      logContent: '',
      loading: false,
      interval: null,
    }
  },
  mounted() {
    this.oldBaseURL = this.axios.defaults.baseURL;
    this.axios.defaults.baseURL = DjangoURL;

    this.startLog();
  },
  destroyed() {
    this.axios.defaults.baseURL = this.oldBaseURL;

    this.stopLog();
  },
  methods: {
    loadLog() {
      this.loading = true;
      this.axios.get(`/log`)
          .then((res) => {
            // if (!res.data.logContent.includes('GET /api/v1/log')) {
            //
            // }
            this.logContent += res.data.logContent;
            // this.$message.success("日志获取成功");
            this.loading = false;
          })
          .catch((err) => {
            this.$message.error("日志获取失败");
            this.loading = false;
          });
    },
    startLog() {
      if (!this.interval) {
        this.interval = setInterval(this.loadLog, 1000);
        this.$message.success("开始获取日志");
      }
    },
    stopLog() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
      this.$message.info("日志已停止获取");
    }
  },
  components: {
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AIcon: Icon,
    ADivider: Divider,
  },
}
</script>

<style>
.log-content {
  background-color: black;
  height: 450px;
  color: white;
  padding: 15px;
  font-size: 16px;
  overflow: auto;
  border-radius: 5px;
}
</style>
