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
      tableFields: ['id', 'username', 'password'],
      tableData: [
        {
          key: '1',
          id: 0,
          username: 'hzy',
          password: '123',
        }
      ],
    }
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