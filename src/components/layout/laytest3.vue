<template>
  <div class="drag">
    <div ref="element" class="content"  v-drag draggable="false" v-contextmenu:contextmenu onclick="">
      <p>文字网页</p>
      <p>文字网页</p>
      <p>文字网页</p>
      <p>文字网页</p>
    </div>
    <v-contextmenu ref="contextmenu" :theme="theme">
      <v-contextmenu-item @click="handleClick">菜单1</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">菜单2</v-contextmenu-item>
      <v-contextmenu-item @click="handleClick">菜单3</v-contextmenu-item>
    </v-contextmenu>
  </div>
</template>
<script >
  export default {
    data(){
      return {
        dd:"",
        inout:""
      }
    },
    directives: {
      drag(el){
        let oDiv = el; //当前元素
        let self = this; //上下文
        //禁止选择网页上的文字
        document.onselectstart = function() {
          return false;
        };
        oDiv.onmousedown = function(e){
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;
          document.onmousemove = function(e){
            //通过事件委托，计算移动的距离
            let l = e.clientX - disX;
            let t = e.clientY - disY;
            //移动当前元素
            if(l<10) l=10;
            if(t<10) t=10;
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";
          }
          document.onmouseup = function(e){
            document.onmousemove = null;
            document.onmouseup = null;
          };
          //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
          return false;
        };
      }
    }
  }
</script>
<style>
  .drag{
    position: relative;
  }
  /* position:absolute;这个还是要设的，不然拖动块定不了位置 */
  .content{
    position:absolute;
    height:100px;
    width:100px;
    background-color: #67C23A;
    cursor: pointer;
  }
</style>
