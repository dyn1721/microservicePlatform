<template>
  <div class="data-manage">
    <a-row :gutter="8">
      <a-col :span="6">
        <a-card title="数据库表">
          <a-list item-layout="horizontal" :data-source="tableList" style="max-height: 450px; overflow: auto;">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a @click="showTable(item.name, index)">{{ item.name }}</a>
              <a-button slot="actions" @click="showAdd(item.name, index)">
                <a-icon type="plus"/>
              </a-button>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="18">
        <div class="data-list" v-if="currentTableName">
          <TableData :tableName="currentTableName" v-if="currentShow === 0" :key="currentTable"></TableData>
          <AddRecord :tableName="currentTableName" v-if="currentShow === 1" :key="currentTable"></AddRecord>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {Row, Col, Card, List, Button, Icon, Avatar} from "ant-design-vue";
import {DjangoURL} from '@/main';
import TableData from "@/components/DataManage/TableData.vue";
import AddRecord from "@/components/DataManage/AddRecord.vue";

export default {
  data() {
    return {
      currentShow: 0,
      currentTable: 0,
      currentTableName: '',
      tableList: [],
      oldBaseURL: '',
    }
  },
  mounted() {
    this.oldBaseURL = this.axios.defaults.baseURL;
    this.axios.defaults.baseURL = DjangoURL;

    this.axios.get('/tables')
        .then((res) => {
          this.tableList = res.data.tableList;
        })
        .catch((err) => {
          this.$message.error('数据库表获取失败');
        });
  },
  destroyed() {
    this.axios.defaults.baseURL = this.oldBaseURL;
  },
  methods: {
    showTable(tableName, index) {
      this.currentShow = 0;
      this.currentTable = index;
      this.currentTableName = tableName;
    },
    showAdd(tableName, index) {
      this.currentShow = 1;
      this.currentTable = index;
      this.currentTableName = tableName;
    },
  },
  components: {
    ARow: Row,
    ACol: Col,
    ACard: Card,
    ACardGrid: Card.Grid,
    ACardMeta: Card.Meta,
    AList: List,
    AListItem: List.Item,
    AAvatar: Avatar,
    AButton: Button,
    AIcon: Icon,
    TableData,
    AddRecord,
  },
}
</script>

<style>
</style>
