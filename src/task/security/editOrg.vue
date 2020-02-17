<template>
  <div>
    <wform ref="form" :rules="rules" :item-id="itemId" :process-id="processId" :task-para="taskPara">
      <fedit name="orgId" label="机构代码" ref="orgId"></fedit>
      <fedit name="orgName" label="机构名称" ref="orgName"></fedit>
      <fedit name="frCode" label="法人号" ref="frCode"></fedit>
      <fedit name="orgLevel" label="机构等级" ref="orgLevel"></fedit>
      <fedit name="parentId" label="上级机构" ref="parentId"></fedit>
      <fbuttons></fbuttons>
    </wform>
  </div>
</template>

<script>
  import fedit from "@/components/wcontrol/form/fedit";
  import wform from "@/components/wcontrol/form/wform";
  import fbuttons from "../../components/wcontrol/form/fbuttons";

  export default {
    name: "editOrg",
    components: {fbuttons, wform, fedit},
    props: {itemId: null,processId:null,taskPara:null},
    data() {
      return {
        rules: {

        }
      }
    },
    methods: {
      submitCheck() {
        return true;
      },
      getchilds() {
        let children = this.$refs.page.$children;
        children[0].value = "12334"
        console.log(children.length);
        alert(children.length);
      }
    }
  }
</script>

<style scoped>

</style>
