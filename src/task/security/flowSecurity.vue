<template>
  <div style="height:100%">
    <flow-maker flow-id="secFlow"></flow-maker>
  </div>
</template>

<script>
  import flowMaker from "@/components/flow/designer/FlowDesigner";
    export default {
        name: "flowSecurity",
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
