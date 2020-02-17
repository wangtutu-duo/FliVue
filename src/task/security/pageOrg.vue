<template>
  <div>
    <fedit name="orgId" label="机构代码" ref="orgId"></fedit>
    <fedit name="orgName" label="机构名称" ref="orgName"></fedit>
    <fedit name="frCode" label="法人号" ref="frCode"></fedit>
    <fedit name="orgLevel" label="机构等级" ref="orgLevel"></fedit>
    <fedit name="parentId" label="上级机构" ref="parentId"></fedit>
  </div>
</template>

<script>
  import fedit from "@/components/wcontrol/form/fedit";

  export default {
    name: "pageOrg",
    components: {fedit},
    methods:
      {}

  }
</script>

<style scoped>

</style>
