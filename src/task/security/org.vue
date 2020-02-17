<template>
  <div>

    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <wedit v-model="orgName" input-hint="请输入机构"></wedit>
          </el-col>
          <el-col :span="6">
            <wbutton  @click="doSearch()" >机构查询</wbutton>
          </el-col>
        </el-row>

      </el-header>
      <el-container>

        <setting-show setting-name="orgMaint" :setting-para="settingPara"></setting-show>

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
    name: "org",
    components: {wselect, wedit, wbutton, settingShow},
    data() {
      return {
        orgName: null,
        settingPara:{}
      }
    },

    methods: {
      doSearch()
      {
        this.settingPara={orgName:this.orgName }
      },

    }
  }
</script>

<style scoped>

</style>
