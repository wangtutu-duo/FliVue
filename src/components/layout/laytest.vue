<template>
  <div class="layout1">

    <v-contextmenu ref="contextmenu" :theme="theme">
      <v-contextmenu-item @click="handleClick">菜单1</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">菜单2</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">菜单3</v-contextmenu-item>
    </v-contextmenu>


    <el-container >
      <el-header>Header</el-header>
      <el-main :class="['box', theme]" v-contextmenu:contextmenu>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>
<script>

  export default {
    props: {
      theme: String,
    },
    methods: {
      handleClick (vm, event) {
        alert(`「${vm.$slots.default[0].text}」被点击啦！`)
      },
    },
  }

</script>




<style rel="stylesheet/scss" lang="scss">
  .layout1 {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
  .el-tabs__item {
    text-align: center;
    width: 60px;
  }

</style>
<style scoped>
  .box {
    width: 100%;
  }
</style>
