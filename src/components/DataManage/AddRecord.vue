<template>
  <div class="add-record">
    <a-card :title="tableName + ' 添加记录'">
      <a-form :form="record">
        <a-form-item v-for="(field, index) in tableSchema"
                     :label="field.name.charAt(0).toUpperCase() + field.name.substring(1)">
          <a-input :v-decorator="'[' + field.name + ',{ rules: [{ required: true, message: \'Field Required!\'}]},]'">
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import {Card, Form, Input, Button} from "ant-design-vue";
// 字段类型分类：
// 0. 字符串 -> 单行/多行文本框
// 1. 单选枚举值 -> 下拉列表
// 2. 多选枚举值 -> 穿梭框
// 3. 布尔值 -> 开关
// 4. 整数 -> 整数文本框
// 5. 浮点数 -> 浮点数文本框
export default {
  name: "AddRecord",
  mounted() {
    this.requestTableSchema();
  },
  data() {
    return {
      tableSchema: [
        {
          name: 'username',
          type: 0,
        },
        {
          name: 'password',
          type: 0,
        },
      ],
      record: {},
    }
  },
  props: ['tableName'],
  methods: {
    requestTableSchema() {
      // TODO: 网络获取表字段与类型
    }
  },
  components: {
    ACard: Card,
    ACardGrid: Card.Grid,
    ACardMeta: Card.Meta,
    AForm: Form,
    AFormItem: Form.Item,
    AInput: Input,
    AButton: Button,
  }
}
</script>

<style scoped>

</style>