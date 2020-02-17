<template>

  <div>
    <el-button type="primary" @click="click()">提交</el-button>

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
        processId:"",
        itemId:"",
        parentFormData: {},
        type: "button",


      }

    },
    methods:
      {
        click(){}
      },
    watch:
      {}
  }
</script>

<style scoped>

</style>
