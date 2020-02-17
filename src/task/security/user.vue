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
        return {
          userName:null
        }
      },

      methods: {
        }
    }
</script>

<style scoped>

</style>
