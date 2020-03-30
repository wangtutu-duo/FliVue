<template>
  <a-form :model="appForm"    :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }" >
    <a-form-item label="应用代号" >
      <a-input v-model="appForm.appId"></a-input>
    </a-form-item>
    <a-form-item label="应用名称" >
      <a-input v-model="appForm.appName"></a-input>
    </a-form-item>
    <a-form-item label="应用描述"  >
      <a-input v-model="appForm.appDesc"></a-input>
    </a-form-item>
    <a-form-item label="密码"  >
      <a-input type="password" v-model="appForm.password"  ></a-input>
    </a-form-item>
    <a-form-item label="确认密码" prop="checkPass">
      <a-input type="password" v-model="appForm.checkPass"  ></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="submitForm('appForm')">注册</a-button>
      <a-button @click="resetForm('ruleForm')">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
  import axios from '@/utils/axios.js'
  export default {
    data() {

      return {
        activeName: 'third',
        appForm: {
          appId:'',
          appName: '',
          password: '',
          checkPass: '',
        },

      };
    },
    methods: {
      submitForm(formName) {
        let valid =true;
          if (valid) {
            axios.userRegister(this.appForm)
              .then(({ data }) => {
                if (data.success) {
                  this.$message({
                    type: 'success',
                    message: '注册成功'
                  });
                } else {
                  this.$message({
                    type: 'info',
                    message: '用户名已经存在'
                  });
                }
              })
          }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>
