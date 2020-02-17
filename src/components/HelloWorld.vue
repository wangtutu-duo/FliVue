<template>
  <div class="hello">


    <h1>user list：</h1>

    <ul>
      <li v-for="(item,index) in users" :key="item._id">
        {{ index + 1 }}.{{ item.username }}
        <el-button @click="del_user(index)">删除</el-button>
      </li>
    </ul>

    <el-button type="primary" @click="logout()">注销</el-button>

  </div>

</template>

<script>
import axios from '@/utils/axios.js'
import OwnWnd from '@/components/OwnWnd'
import store from '../store/index'

export default {
  name: 'HelloWorld',
  data () {
    return {users:{}}
  },
  created(){

    axios.getUser({}).then(({ data }) => {
      console.debug("3311111");
      console.debug("33111112");
      if (data.success){
        //成功了就把data.result里的数据放入users，在页面展示

        this.users = data.result;
      }
    })
  },
  methods:{
    del_user(index, event){
      let thisID = {
        id:this.users[index]._id
      }
      axios.delUser(thisID)
        .then(response => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          //移除节点
          this.users.splice(index, 1);
        }).catch((err) => {
          console.log(err);
      });
    },
    logout(){

      this.$store.dispatch("user/actLOGOUT",{}).then((data)=>{
         // store.dispatch(USER.userLOGIN,this.ruleForm).then((data)=>{

          if (data.isSuccess) {
                this.$message({
                  type: 'success',
                  message: '登出成功'
                })

                this.$router.push('login');

                }else
                {
                this.$message({
                type: 'info',
                 message: '登出失败'
                })
                }
          })

      }},
    components: {
    OwnWnd,

  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hello {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 400px;
  margin: 60px auto 0 auto;
}
</style>
