<template>
  <a-form :model="userForm"    :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
    <a-form-item label="用户代号">
      <a-input v-model="userForm.userId"></a-input>
    </a-form-item>
    <a-form-item label="用户名称">
      <a-input v-model="userForm.userName"></a-input>
    </a-form-item>
    <a-form-item label="密码"  >
      <a-input type="password" v-model="userForm.passord"  ></a-input>
    </a-form-item>
    <a-form-item label="确认密码" prop="checkPass">
      <a-input type="password" v-model="userForm.checkPass"  ></a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" @click="submitForm('userForm')">注册</a-button>
      <a-button @click="resetForm('userForm')">重置</a-button>
    </a-form-item>
  </a-form>
</template>
<script>
import axios from '@/utils/axios.js'
export default {
  data() {


    return {
      activeName: 'second',
      userForm: {
        userId: '',
        userName:'',
        password: '',
        checkPass: '',
      },

    };
  },
  methods: {
    submitForm(formName) {
      let valid = true;
        if (valid) {
          axios.userRegister(this.userForm)
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
