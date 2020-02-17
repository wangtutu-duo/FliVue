<template>
  <div>

    <el-container>
      <el-header>
        <el-row :gutter="20">

          <el-col :span="6">
            <wedit v-model="userName" input-hint="请输入用户名"></wedit>
          </el-col>

          <el-col :span="6">

            <wbutton>用户查询</wbutton>

          </el-col>

        </el-row>

      </el-header>
      <el-container>





              <setting-show setting-name="userMaint" setting-para="getPara()"></setting-show>


      </el-container>

    </el-container>

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
  import wedit from "@/components/wcontrol/wedit";
  import wselect from "@/components/wcontrol/wselect";
  import wbutton from "@/components/wcontrol/wbutton";
  import settingShow from "@/components/wcontrol/setting/setting";
    export default {
      name: "user",
      components: {wselect,wedit, wbutton,settingShow},
      data() {
        return {users: {},
          userName:null
        }
      },
      created() {

        axios.getUser({}).then(({data}) => {

          if (data.success) {
            //成功了就把data.result里的数据放入users，在页面展示

            this.users = data.result;
          }
        })
      },
      methods: {
        getPara() {
          let para= {userName:this.userName}
          return para
        }
        }
    }
</script>

<style scoped>

</style>
