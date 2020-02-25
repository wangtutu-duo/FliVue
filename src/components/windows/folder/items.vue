<template xmlns:v-contextmenu="http://www.w3.org/1999/xhtml">
  <div >


    <div  :class="['box', theme]" @contextmenu.stop="showItemContextMenu" @dblclick="openWnd">

      <i class="icon-image">
        <img :src="iconImages(iconImage)" alt="icon">
      </i>
      <span class="app-title">{{desc}}</span>
    </div>

  </div>
</template>
<script>
  import store from '../../../store/index'

  export default {
    name: "items",
    props: {
      itemId:String,


    },
    data() {
      return {
        itemInfo:{},
        itemType:null,
        taskInfo:{},
        name:null,
        desc:null,
        theme:null,
        title:null,
        iconImage: null,
      }
    },
    created()
    {

      this.itemInfo = store.getters["info/getItemInfo"](this.itemId)

      if(this.itemInfo)
      {
        this.desc=this.itemInfo["desc"];
        this.iconImage = this.itemInfo.icon

        this.itemType = this.itemInfo.type
      }
      else
      {
        this.desc = "建设中，勿操作"
        this.iconImage = "./images/icongrid/socc_character_256.png"
      }



    },

    directives: {
      drag(el) {
        let oDiv = el; //当前元素
        let self = this; //上下文
        //禁止选择网页上的文字
        document.onselectstart = function () {
          return false;
        };
        oDiv.onmousedown = function (e) {
          //鼠标按下，计算当前元素距离可视区的距离
          let disX = e.clientX - oDiv.offsetLeft;
          let disY = e.clientY - oDiv.offsetTop;
          document.onmousemove = function (e) {
            //通过事件委托，计算移动的距离
            let l = e.clientX - disX;
            let t = e.clientY - disY;
            //移动当前元素
            if (l < 10) l = 10;
            if (t < 10) t = 10;
            oDiv.style.left = l + "px";
            oDiv.style.top = t + "px";
          }
          document.onmouseup = function (e) {
            document.onmousemove = null;
            document.onmouseup = null;
          };
          //return false不加的话可能导致黏连，就是拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
          return false;
        };
      }
    },
    methods: {

      handleClick(){},
      showItemContextMenu(e) {
        this.$emit('showItemContextMenu', e);

      },
      openWnd: function() {

        console.log("click icon");
        let para = {itemId: this.itemId}
        this.$store.commit('wins/addWindow', para)
        this.iconSelected = false
        this.iconFocused = false
      },
      iconImages: require.context('../../../assets/', true, /\.png$/)
    },

  }
</script>

<style scoped>
  .icon1 {
    position: relative;
    text-align: center;
    display: flex;
    flex-direction: column;
    width: 100%;
    padding-bottom: 3px;
    height: auto;
    overflow: hidden;
    z-index: 1;
    text-decoration: none;
    cursor: default;
  }

  .icon1::after {
    pointer-events: auto;
    box-sizing: border-box;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .icon1:hover::after {
    pointer-events: all;
    background: rgba(151, 203, 239, 0.192156862745098);
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: inset 0px 0px 0px 1px rgba(247, 235, 250, 0.396078431372549);
  }

  .icon1.selected {
    height: auto;
    z-index: 2;
  }

  .icon1.selected::after {
    pointer-events: all;
    background: rgba(153, 200, 240, 0.384);
    border: 1px solid rgba(0, 0, 0, 0);
    box-shadow: inset 0px 0px 0px 1px rgba(254, 254, 252, 0.25);
  }
  .icon1.focused {
    z-index:2;
  }
  .icon.focused .app-title {
    -webkit-line-clamp: inherit;
    word-break: initial;
    max-height: 10000px;
    z-index: 3;
  }

  .icon-image {
    /* max-width: 48px; */
    max-height: 48px;
    text-align: center;
    margin: 2px auto 0 auto;
    z-index: 3;

  }

  .icon-image img {
    width: 48px;
    height: 48px;
  }

  .app-title {
    margin-top: 3px;
    margin-bottom: -1px;
    z-index: 3;
    font-size: 12px;
    font-weight: 100;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: 34px;
    overflow: hidden;
    text-shadow: -1px 0 2px #000,
    0 1px 1px #000,
    1px 0 1px #000,
    0 -1px 2px #000,

    2px 0 2px #000,
    0 2px 2px #000;
    color: #fff;
    white-space: pre-wrap;
    word-break:break-all;
    word-wrap: break-word;
    line-height: 15px;
    letter-spacing: 0.01em;
  }
</style>
