<template>
  <div class="system-log">
    <h2 style="margin-bottom: 10px;">
      后端控制台输出
      <a-icon type="loading" v-if="loading" />
      <a @click="loadLog()" v-else><a-icon type="reload" /></a>
    </h2>
    <pre class="log-content">{{ logContent }}</pre>
  </div>
</template>

<script>
import {Row, Col, Button, Icon} from "ant-design-vue";

export default {
  name: 'system-log',
  data() {
    return {
      logContent: '',
      loading: false,
    }
  },
  mounted() {
    this.loadLog();
  },
  methods: {
    loadLog() {
      this.loading = true;
      this.axios.get(`/log`)
          .then((res) => {
            this.logContent = res.data.logContent;
            this.$message.success("日志获取成功");
            this.loading = false;
          })
          .catch((err) => {
            this.$message.error("日志获取失败");
            this.loading = false;
          });
    }
  },
  components: {
    ARow: Row,
    ACol: Col,
    AButton: Button,
    AIcon: Icon,
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
