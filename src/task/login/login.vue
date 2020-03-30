<template>
  <div class="login">
    <a-tabs v-model="activeName" @change="handleClick" type="card">
      <a-tab-pane tab="用户登录" key="first">
        <a-form :form="loginForm"   :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" >

          <a-form-item label="用户代号" >
            <a-input v-model="loginForm.userId"></a-input>
          </a-form-item>
          <a-form-item label="用户密码" >
            <a-input type="password" v-model="loginForm.userPassword" auto-complete="off"></a-input>
          </a-form-item>
          <a-form-item label="应用代号" >
            <a-input v-model="loginForm.appId"></a-input>
          </a-form-item>
          <a-form-item label="应用密码" >
            <a-input type="password" v-model="loginForm.appPassword" auto-complete="off"></a-input>
          </a-form-item>


          <a-form-item>
            <a-button type="primary" @click="submitForm('loginForm')">登录</a-button>
            <a-button @click="resetForm('loginForm')">重置</a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="用户注册" key="second">
        <registerUser></registerUser>
      </a-tab-pane>

      <a-tab-pane tab="应用注册" key="third">
        <registerApp></registerApp>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>
<script>
  import registerUser from './RegisterUser'
  import registerApp from './RegisterApp'

  import axios from '@/utils/axios.js'
  import store from '@/store/index'

  export default {
    data() {

      return {
        activeName: 'first',
        loginForm: {
          userName: '',
          userPassword: '',
          checkPass: '',
        },


      };
    },

    methods: {
      //选项卡切换
      handleClick(tab, event) {
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //提交表单
      submitForm(formName) {

        let valid = true

        if (valid) {

          store.dispatch("user/actLOGIN", this.loginForm).then((data) => {


            if (data.isSuccess) {
              this.$message.success('登录成功')
              this.$router.push('win10');
            }
          })
        }
      },
      },
      components: {
        registerUser, registerApp

      }
    }

</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    width: 400px;
    margin: 0 auto;
  }

</style>
