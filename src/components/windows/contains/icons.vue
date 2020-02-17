<template>
    <div
        class="icon1"

        @dblclick="doubleClick"
        v-contextmenu:contextmenu
    >
      <v-contextmenu ref="contextmenu" :theme="theme">
        <v-contextmenu-item @click="handleClick">菜单1</v-contextmenu-item>
        <v-contextmenu-item @click="handleClick">菜单2</v-contextmenu-item>
        <v-contextmenu-item @click="handleClick">菜单3</v-contextmenu-item>
      </v-contextmenu>
      <div  :class="['box', theme]" v-contextmenu:contextmenu>


        <i class="icon-image">
            <img :src="iconImages(iconImage)" alt="icon">
        </i>
        <span class="app-title">{{title}}</span>
      </div>

    </div>
</template>
<script>



    export default {
        name: "icon",
        props: {

          processId: null,
          appId: String,
          moduleName:String,                    //指的是一类模组 如 权限管理
          appName:String,                     //描述  taskname
          appType:String,           //task folder,
          winType:String,      //win, dialog, wins  多窗口
          madeBy:String,     //component, json, vue
          source:String,               //路径或内容
          title: String,
          length:null,
          minimized: Boolean,
          focused: Boolean,
          zIndex: null,
          width: null,
          height: null,
          iconImage: String,
          theme:String

         },
        data() {
            return {
                'iconselected': false,
                'iconfocused': false,
                'startX': 0,
                'startY': 0,
                'diffResult': false
            }
        },
        mounted: function () {
            window.addEventListener('mousedown', this.startAt);
            window.addEventListener('touchstart', this.startAt);
            window.addEventListener('mouseup', this.diffXY);
            window.addEventListener('touchend', this.diffXY);
        },
        beforeDestroy: function () {
            window.removeEventListener('mousedown', this.startAt);
            window.removeEventListener('mouseup', this.diffXY);
            window.removeEventListener('touchstart', this.startAt);
            window.removeEventListener('touchend', this.diffXY);
        },
        methods: {

          handleClick (vm, event) {
            alert(`「${vm.$slots.default[0].text}」被点击啦！`)
          },
            newFolder: function () {

            },
            newModule: function (data) {

            },
            newTask: function (data) {

            },

            execute: function () {

            },
            startAt: function (e) {
                this.startX = ('clientX' in e) ? e.clientX : e.touches[0].clientX
                this.startY = ('clientY' in e) ? e.clientY : e.touches[0].clientY
            },
            diffXY: function (e) {
                let nowX = ('clientX' in e) ? e.clientX : e.touches[0].clientX
                let nowY = ('clientY' in e) ? e.clientY : e.touches[0].clientY
                this.diffResult = (this.startX == nowX && this.startY == nowY)
            },

            mousedown: function () {
                this.iconSelected = true
                this.iconFocused = true
            },
            clickoutside: function () {
                if (this.diffResult) {
                    this.iconSelected = false
                    this.iconFocused = false
                }
            },
            click: function () {
                // this.iconSelected = true
            },
            doubleClick: function () {
              console.log("click icon");
                this.$store.commit('wins/addApp', this.$options.propsData)
                this.iconSelected = false
                this.iconFocused = false
            },
            iconImages: require.context('../../../assets/', true, /\.png$/)
        }
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
