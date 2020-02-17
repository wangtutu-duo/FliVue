<template>
  <div>
    <wform ref="form" :rules="rules" :item-id="itemId" :process-id="processId" :task-para="taskPara">
      <page-org ref="orgpage"></page-org>
      <fbuttons></fbuttons>
    </wform>
  </div>
</template>

<script>
  import fedit from "@/components/wcontrol/form/fedit";
  import wform from "@/components/wcontrol/form/wform";
  import fbuttons from "../../components/wcontrol/form/fbuttons";
  import pageOrg from "./pageOrg";

  export default {
    name: "addOrg",
    components: {pageOrg, fbuttons, wform, fedit},
    props: {itemId: null, processId: null, taskPara: null},
    data() {
      let validateOrg = (fld, value) => { return this.validateOrg(fld, value); };

      return {
        rules: {
          orgId: validateOrg,
          orgName: validateOrg,
        }

      }
    },
    methods: {
      initForm()
      {
        console.debug("init form")
      },
      submitCheck() {

        let f = this.$refs.form;
        f.setFieldValue("orgId", this.count++)
        return true;
      },

      validateOrg(field, value) {
        if (value ==null ||value === '') {
          field.fieldMessage="好啊  好啊"
          return false
        } else {
          return true
        }},
        validateName()
        {}

    }
  }
</script>

<style scoped>

</style>
