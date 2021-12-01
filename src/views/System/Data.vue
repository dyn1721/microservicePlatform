<template>
  <div class="data-manage">
    <a-row :gutter="8">
      <a-col :span="6">
        <a-card title="数据库表">
          <a-list item-layout="horizontal" :data-source="tableList">
            <a-list-item slot="renderItem" slot-scope="item, index">
              <a @click="showTable(item.name, index)">{{ item.name }}</a>
              <a-button slot="actions" @click="showAdd()">
                <a-icon type="plus"/>
              </a-button>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="18">
        <div class="data-list">
          <TableData :tableName="currentTableName" v-if="currentShow === 0"></TableData>
          <AddRecord :tableName="currentTableName" v-if="currentShow === 1"></AddRecord>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import {Row, Col, Card, List, Button, Icon, Avatar} from "ant-design-vue";
import TableData from "../../components/DataManage/TableData.vue";
import AddRecord from "../../components/DataManage/AddRecord";

export default {
  data() {
    return {
      currentShow: 0,
      currentTable: 0,
      currentTableName: 'Groups',
      tableList: [
        {
          name: 'Groups',
        },
        {
          name: 'Users',
        },
      ],
    }
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
  methods: {
    showTable(tableName, index) {
      this.currentShow = 0;
      this.currentTable = index;
      this.currentTableName = tableName;
      // TODO: 网络获取表数据，更新到tableData
    },
    showAdd() {
      this.currentShow = 1;
    },
    toggleForm() {
      console.log("toggleForm");
    }
  }
}
</script>

<style>
</style>
