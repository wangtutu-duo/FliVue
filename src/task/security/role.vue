<template>
  <div>

    <el-container>
      <el-header>

        角色信息

      </el-header>
      <el-container>

        <setting-show setting-name="roleMaint" :setting-para="settingPara"></setting-show>

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
        settingPara: {}
      }
    },
    created()
    {
      //this.settingPara = {orgName: this.orgName}
    },
    methods: {
      doSearch() {

        //this.settingPara = {orgName: this.orgName}
      },

    }
  }
</script>

<style scoped>

</style>
