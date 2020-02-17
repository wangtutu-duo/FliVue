<template>
  <div style="height:100%">
    <flow-maker flow-id="secUser"></flow-maker>
  </div>
</template>

<script>
  import flowMaker from "@/components/flow/designer/FlowDesigner";
    export default {
        name: "flowUser",
        components:{flowMaker},
      props:
        {
          itemId: String,
          compara: String,
        },
    }
</script>

<style scoped>

</style>
