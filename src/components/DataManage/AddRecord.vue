<template>
  <div class="add-record">
    <a-card :title="tableName + ' 添加记录'">
      <a-form-model :model="record">
        <a-form-model-item v-for="(field, index) in tableFields"
                           :label="field.charAt(0).toUpperCase() + field.substring(1)"
                           :prop="field"
                           :label-col="{ span: 3, offset: 1 }" :wrapper-col="{ span: 16 }">
          <a-input v-model="record[field]">
          </a-input>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ offset: 4, span: 16 }">
          <a-button type="primary" @click="createRecord()">
            提交
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>
import {Card, FormModel, Input, Button, Row, Col} from "ant-design-vue";

export default {
  name: "AddRecord",
  data() {
    return {
      tableFields: [],
      record: {},
    }
  },
  mounted() {
    this.axios.get(`/tables/${this.tableName}/field`)
        .then((res) => {
          this.tableFields = res.data.tableFields;
        })
        .catch((err) => {
          this.$message.error('获取表字段失败');
        });
  },
  methods: {
    createRecord() {
      this.axios.post(`/tables/${this.tableName}/records`, this.record)
          .then((res) => {
            this.$message.success('添加数据成功');
          })
          .catch((err) => {
            this.$message.error('添加数据失败');
          });
    }
  },
  props: ['tableName'],
  components: {
    ACard: Card,
    ACardGrid: Card.Grid,
    ACardMeta: Card.Meta,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    ARow: Row,
    ACol: Col,
    AInput: Input,
    AButton: Button,
  }
}
</script>

<style scoped>

</style>