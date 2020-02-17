<template >
  <div  id="app"  >
  <router-view></router-view>
  </div>
</template>

<script>



export default {
  name:'app',

}
</script>

<style >

  * {
    margin: 0;
    padding: 0;
    border: 0;
    min-height: 0;
    min-width: 0;

    font-family: 'Segoe UI', 'malgun gothic';
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  *:focus {
    outline: none
  }
  .selection {
    background: rgba(0, 102, 204, 0.2745);
    border: 1px solid rgb(0, 120, 215);
    z-index: 4;
  }
  .overlay{
    filter: blur(25px);
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1100;
    top: 0px;
    left: 0px;
    bottom: 0px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;

  }

  html,body,#app, .el-container{
    /*设置内部填充为0，几个布局元素之间没有间距*/
    padding: 0px;
    /*外部间距也是如此设置*/
    margin: 0px;
    /*统一设置高度为100%*/
    height: 100%;
    overflow: hidden;
  }

</style>

