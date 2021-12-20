<template>
  <div class="table-data">
    <a-card :title="tableName + ' 查看数据'">
      <a-table
          :columns="tableColumns"
          :data-source="tableData"
          rowKey="_id"
          :scroll="{ x: tableFields.length * 150, y: 350 }"
          :pagination="false">
        <span slot="action" slot-scope="text, record">
          <a @click="showModify = true; currentRecord = record;">修改</a>
          <a-divider type="vertical"/>
          <a @click="showDelete = true; currentRecord = record;">删除</a>
        </span>
      </a-table>
      <a-pagination
          v-model="currentPage"
          :total="totalPage * 10"
          @change="handlePageChange"
          style="text-align: right; margin-top: 10px;"/>
    </a-card>
    <a-modal
        title="修改记录"
        :visible="showModify"
        okText="提交"
        @ok="modifyRecord()"
        @cancel="showModify = false"
    >
      <a-form-model :model="currentRecord">
        <a-form-model-item v-for="(field, index) in tableFields"
                           v-if="field !== '_id'"
                           :label="field"
                           :prop="field"
                           :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }">
          <a-input v-model="currentRecord[field]">
          </a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
    <a-modal
        title="删除记录"
        :visible="showDelete"
        @ok="deleteRecord()"
        @cancel="showDelete = false"
    >
      确认要删除此条记录？
    </a-modal>
  </div>
</template>

<script>
import {Card, Icon, Input, Table, Divider, FormModel, Modal, Pagination} from "ant-design-vue";
import {DjangoURL} from '../../main';

export default {
  name: "TableData",
  data() {
    return {
      tableFields: [],
      tableData: [],
      showModify: false,
      showDelete: false,
      currentRecord: {},
      oldBaseURL: '',
      currentPage: 1,
      totalPage: 1,
    }
  },
  mounted() {
    this.oldBaseURL = this.axios.defaults.baseURL;
    this.axios.defaults.baseURL = DjangoURL;

    this.axios.get(`/tables/${this.tableName}/field`)
        .then((res) => {
          this.tableFields = res.data.tableFields;
        })
        .catch((err) => {
          this.$message.error('获取表模式失败');
        });
    this.fetchRecords();
    this.fetchTotalPage();
  },
  destroyed() {
    this.axios.defaults.baseURL = this.oldBaseURL;
  },
  computed: {
    tableColumns() {
      let columns = [];
      this.tableFields.forEach((field) => {
        columns.push({
          title: field,
          dataIndex: field,
          key: field,
        });
      });
      columns.push({
        title: '操作',
        key: 'action',
        scopedSlots: {customRender: 'action'},
        fixed: 'right',
        width: 110,
      });
      return columns;
    },
  },
  methods: {
    handlePageChange(page, pageSize) {
      this.fetchRecords();
    },
    fetchTotalPage() {
      this.axios.get(`/tables/${this.tableName}/page?pageSize=10`)
          .then((res) => {
            this.totalPage = res.data.totalPage;
          })
          .catch((err) => {
            this.$message.error('获取总页数失败');
          });
    },
    fetchRecords() {
      this.axios.get(`/tables/${this.tableName}/records?pageSize=10&pageIdx=${this.currentPage - 1}`)
          .then((res) => {
            this.tableData = res.data.tableData;
          })
          .catch((err) => {
            this.$message.error('获取表数据失败');
          });
    },
    modifyRecord() {
      this.axios.post(`/tables/${this.tableName}/records/${this.currentRecord._id}`, this.currentRecord)
          .then((res) => {
            this.$message.success('修改数据成功');
            this.fetchRecords();
            this.showModify = false;
          })
          .catch((err) => {
            this.$message.error('修改数据失败');
          });
    },
    deleteRecord() {
      this.axios.delete(`/tables/${this.tableName}/records/${this.currentRecord._id}`)
          .then((res) => {
            this.$message.success('删除数据成功');
            this.fetchTotalPage();
            this.fetchRecords();
            this.showDelete = false;
          })
          .catch((err) => {
            this.$message.error('删除数据失败');
          });
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
    ADivider: Divider,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    AModal: Modal,
    APagination: Pagination,
  }
}
</script>

<style scoped>

</style>