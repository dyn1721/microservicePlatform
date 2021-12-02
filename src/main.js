import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Vuei18n from 'vue-i18n'
import { sync } from 'vuex-router-sync'
import zh_CN from "./locales/zh_CN";
import en_US from "./locales/en_US";
import defaultSettings from './defaultSettings'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(iView);
Vue.use(VueAxios, axios)
const mockURL = 'http://mockjs.xiaoyaoji.cn/mock/1kIdEixBdMu';
const devURL = 'http://1.15.154.241:8000/api/v1';
Vue.axios.defaults.baseURL = mockURL;

Vue.config.productionTip = false

import { message, Form } from 'ant-design-vue'
Vue.prototype.$form = Form;
Vue.prototype.$message = message;
message.config({
    duration: 2,// 持续时间
    top:`100px`, // 到页面顶部距离
    maxCount: 3 // 最大显示数, 超过限制时，最早的消息会被自动关闭
});

Vue.use(Vuei18n)

const messages = {
  "zh_CN": zh_CN,
  "en_US": en_US,
}
const i18n = new Vuei18n({
  locale: 'zh_CN',  // 当前语言标识
  messages
})

sync(store, router)

//加载默认设置
store.commit('global/UpdateDefaultSettings', defaultSettings)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
