<template>
  <div class="table-data">
    <a-card :title="tableName + ' 查看数据'">
      <a-table :columns="tableColumns" :data-source="tableData"></a-table>
    </a-card>
  </div>
</template>

<script>
import {Card, Icon, Input, Table} from "ant-design-vue";

export default {
  name: "TableData",
  data() {
    return {
      tableFields: [],
      tableData: [],
    }
  },
  mounted() {
    this.axios.get(`/tables/${this.tableName}/field`)
        .then((res) => {
          this.tableFields = res.data.tableFields;
        })
        .catch((err) => {
          this.$message.error('获取表数据失败');
        });
    this.axios.get(`/tables/${this.tableName}/records`)
        .then((res) => {
          this.tableData = res.data.tableData;
        })
        .catch((err) => {
          this.$message.error('获取表数据失败');
        });
  },
  computed: {
    tableColumns() {
      let columns = [];
      this.tableFields.forEach((field) => {
        columns.push({
          title: field.charAt(0).toUpperCase() + field.substring(1),
          dataIndex: field,
          key: field,
        });
      });
      return columns;
    }
  },
  props: ['tableName'],
  components: {
    AIcon: Icon,
    AInput: Input,
    ACard: Card,
    ACardGrid: Card.Grid,
    ACardMeta: Card.Meta,
    ATable: Table,
  }
}
</script>

<style scoped>

</style>