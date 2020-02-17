<template>

  <div>
    <el-button type="primary" @click="confirm()">提交</el-button>
    <el-button type="primary" @click="reset()">重置</el-button>
    <el-button type="primary" @click="cancel()">取消</el-button>
  </div>
</template>

<script>

  export default {
    name: "fbuttons",

    props:
      {
        value: String,
        name: null,
      },

    data() {
      return {

        type: "button",
        parentFormData: {},
        parentForm: null
      }

    },
    methods:
      {
        confirm() {
          this.parentForm.submitForm();
          console.debug(this.processId, this.itemId)
        },
        reset() {
          this.parentForm.resetForm();
        },
        cancel() {
          this.parentForm.cancelForm();
        },
      },
    watch:
      {}
  }
</script>

<style scoped>

</style>
