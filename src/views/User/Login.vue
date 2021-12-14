<template>
  <div class="ai-login-main">
    <div class="ai-login">
      <h3 style="font-size: 16px; margin-bottom: 20px;">登录</h3>
      <a-form-model :model="loginInfo">
        <a-form-model-item
            prop="username"
        >
          <a-input placeholder="用户名/邮箱" size="large" v-model="loginInfo.username">
            <a-icon type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <a-form-model-item
            prop="password"
        >
          <a-input type="password" placeholder="密码" size="large" v-model="loginInfo.password">
            <a-icon type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-model-item>
        <div>
          <a-checkbox :checked="autoLogin" @change="onSwithAutoLogin">
            自动登录
          </a-checkbox>
          <a style="float:right;" href="#"> 忘记密码 </a>
        </div>
        <a-form-model-item>
          <a-button @click="submitLogin()" size="large" icon='login' class="submit" type="primary"
                    htmlType="submit">
            登录
          </a-button>
        </a-form-model-item>
        <div class="other">
          <router-link to="/user/register" class="register">注册账户</router-link>
        </div>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import GLOBAL from '../global.js';
import {
  FormModel,
  Tabs,
  Input,
  Icon,
  Checkbox,
  Row,
  Col,
  Button,
} from "ant-design-vue";
import SendCaptchaButton from "@/components/SendCaptchaButton";
import {mapGetters} from "vuex";

export default {
  name: "ai-login",
  data: () => ({
    activeKey: "1",
    submitting: false,
    autoLogin: false,
    start: false,
    loginInfo: {},
  }),
  mounted() {
    let loadAutoKey = localStorage.getItem("autoLoginKey");
    let username = localStorage.getItem("username");
    if (loadAutoKey) {
      // interface check: 自动登录密钥检查(username,loadAutoKey)
      this.$store.commit('global/updateUsername', username);
      this.$store.commit('global/AutoLoginChecking', true);
      this.$router.push({path: '/dashboard'});
    }
  },
  computed: {
    ...mapGetters({autoLoginKey: "global/AutoLoginChecking"}),
  },
  methods: {
    submitLogin() {
      this.axios.post(`/login`, this.loginInfo)
          .then((res) => {
            if (this.autoLogin) {
              // 本地存储自动登录密钥 时间戳+随机数
              let timestamp = (new Date()).valueOf() + ''
              let randomAdd = parseInt(Math.random() * 10000)
              // console.log(timestamp + randomAdd)
              // interface check: 自动登录密钥提交服务器(timestamp+randomAdd)
              localStorage.setItem("username", this.loginInfo.username);
              localStorage.setItem("autoLoginKey", timestamp + randomAdd);
            }
            this.$store.commit('global/updateUsername', this.loginInfo.username)
            this.$store.commit('global/AutoLoginChecking', true)
            this.$message.success('登录成功');
            this.$router.push({path: '/dashboard'});
          })
          .catch((err) => {
            this.$message.error('用户名或密码错误');
          });
    },
    onSwithAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
  },
  components: {
    ATabs: Tabs,
    ATabPane: Tabs.TabPane,
    AButton: Button,
    ACheckbox: Checkbox,
    AInput: Input,
    AIcon: Icon,
    ARow: Row,
    ACol: Col,
    AFormModel: FormModel,
    AFormModelItem: FormModel.Item,
    ASendCaptchaButton: SendCaptchaButton
  },
  methods: {
    onSwithAutoLogin(e) {
      this.autoLogin = e.target.checked;
    },
    onSwitchTab(key) {
      this.active = [];
      if (key === "1") {
		console.log('1')
        this.active.push("username");
        this.active.push("password");
      } else {
        this.active.push("mobile");
        this.active.push("captcha");
      }
    },
    handleSubmit(e) {
      this.form.validateFields(
        this.active,
        {
          force: true
        },
        (err, values) => {
          if (!err) {
			//不知道为啥values失效- -
			values=this.form.getFieldsValue()
            // console.log("Received values of form: ", values);
			// interface check: 检查账号密码（）
			axios.get(GLOBAL.URL+'/login', {
					params: {
						username: values['username'],
						password: values['password'],
					}
				})
				.then(res => {
						console.log(res.data);
						var check=res.data;
						if (check==1){
							if (this.autoLogin){
								// 本地存储自动登录密钥 时间戳+随机数
								var timestamp = (new Date()).valueOf()+''
								var randomAdd = parseInt(Math.random()*10000)
								console.log(timestamp+randomAdd)
								//  interface check: 自动登录密钥提交服务器(timestamp+randomAdd) 
								axios.get(GLOBAL.URL+'/loginKey', {
								          params: {
								            username: values['username'],
								            loginkey: timestamp+randomAdd,
								          }
								        })
								        .then(res => {
								            localStorage.setItem("username", values['username']);
								            localStorage.setItem("autoLoginKey", timestamp+randomAdd);	
								          })
								}
							this.$store.commit('global/updateUsername', values['username'])
							this.$store.commit('global/AutoLoginChecking', true)   
							this.$router.push({path:'/dashboard'})
							}
						else{
							this.$message.error('登录检查失败 请重新输入正确的用户名和密码！');
							this.form.setFieldsValue({
								password:''
							});
						}
					})
          }
        }
      );
    },
    send() {
      new Promise((resolve, reject) => {
        this.form.validateFields(["mobile"], {}, (err, values) => {
          if (err) {
            reject(err);
          } else {
            message.loading("Action in progress..", 0);
            setTimeout(() => {
              this.start = true;
              message.destroy();
              message.success("This is a message of success code [ 4569 ]", 10);
            }, 1000);
          }
        });
      });
    }
  },
  mounted() {	
	console.log("autoLoginChecking")
	// console.log(this.$store.state.global.autoLoginChecked)
	var loadAutoKey = localStorage.getItem("autoLoginKey")
	var username=localStorage.getItem("username")
	if (loadAutoKey!= undefined){
		//interface check: 自动登录密钥检查(username,loadAutoKey) 
		//simulate
		axios.get(GLOBAL.URL+'/checkLoginKey', {
		          params: {
		            username: username,
		            loginkey: loadAutoKey
		          }
		        })
		        .then(res => {
					if (res.data==1){
						this.$store.commit('global/updateUsername', username)
						this.$store.commit('global/AutoLoginChecking', true)
						this.$router.push({path:'/dashboard'})
					}
		          })
	}
    this.onSwitchTab();
	
  }
};
</script>

<style lang="less">
@import url("./login.less");
</style>