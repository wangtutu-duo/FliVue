<template>
  <div style="height:100%">

    <flow-maker :flow-name="flowName"></flow-maker>
  </div>
</template>

<script>
  import flowMaker from "@/components/flow/designer/FlowDesigner";
    export default {
        name: "flowMaint",
        components:{flowMaker},
      props:
        {
          itemId: String,
          //compara: String,
          taskPara:String
        },
      data() {
        return {
          flowName:this.taskPara,
        }
      }
    }
</script>

<style scoped>

</style>
