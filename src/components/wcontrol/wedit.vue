<template>

  <el-input v-model="value" :placeholder="inputHint"></el-input>

</template>

<script>
  export default {
    name: "wedit",

    props:
      {
        value0:String,
        inputHint: String,
      },
    model: {
      prop: 'value0',
      event: "valueChange"
    },
    data() {
      return {
        value: this.value0,
      }

    },
    watch:
      {
        value(newVal, oldVal) {
          console.debug("newVal0" + newVal);
          console.debug("oldVal0" + oldVal);
          this.$emit("valueChange", newVal)
        },
        value0(newVal, oldVal) {
          console.debug("value change");
          console.debug("newVal0" + newVal);
          console.debug("oldVal0" + oldVal);
          this.value =newVal;
        }

      }
  }
</script>

<style scoped>

</style>
