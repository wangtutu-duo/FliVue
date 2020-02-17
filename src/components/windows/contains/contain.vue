<template>
  <div
    class="grid-body"
    tabindex="0"
  >
    <v-contextmenu ref="contextmenu" :theme="theme" v-show="bMenuVisible">
      <v-contextmenu-item @click="newFolder">新增功能夹</v-contextmenu-item>
      <v-contextmenu-item @click="newModule">新增功能</v-contextmenu-item>
      <v-contextmenu-item @click="newTask">新增任务</v-contextmenu-item>
      <v-contextmenu-item @click="needHelp">帮助</v-contextmenu-item>
    </v-contextmenu>




    <div class="icon-grid">
      <li
        class="grid-cell"
        v-for="(app, index) in appLists"
        :key="index"
      >



        <app-icon
          :title="app.title"
          :icon-image="app.iconImage"
          :width="app.width"
          :height="app.height"
          :process-id="app.processId"
          :app-id="app.appId"
          :module-name="app.moduleName"
          :app-name="app.appName"
          :app-type="app.appType"
          :win-type="app.winType"
          :made-by="app.madeBy"
          :source="app.source"
          ref="icons"
          v-selected="Vcomp"
        ></app-icon>
      </li>
    </div>

    <div ref="aaa" :class="['box', theme]" v-contextmenu:contextmenu>

    </div>
    <div class="selection" ref="selection" v-show="selectionDisplay" :style="selectionArea"></div>


  </div>
</template>
<script>
  import myIcon from './icons.vue'
  import items from '../folder/items.vue'
  export default {
    components: {
      appIcon: myIcon,

    },
    props: {
      appLists: null,
      allItems: null,
      length: null,
      theme: null
    },
    data() {
      return {

        list: this.appLists,
        Vcomp: this,
        selectionArea: {
          width: '0',
          height: '0',
          top: '0',
          left: '0'
        },
        bMenuVisible: false,
        selectionDisplay: false,
        lastX: 0,
        lastY: 0
      }
    },
    mounted: function () {

    },
    methods: {

      handleClick(vm, event) {
        alert(`「${vm.$slots.default[0].text}」被点击啦！`)
      },

      newFolder: function (vm, event) {

      },
      newModule: function (vm, event) {

      },
      newTask: function (vm, event) {

      },
      needHelp: function (vm, event) {

      },
      selected: function () {

      },
      execute: function () {

      },
      delete: function () {

      },
      outside: function () {
      },
      click: function () {

      },
      mousedown: function (evt) {
        const touch = evt.touches && evt.touches[0]
        this.lastX = (touch || evt).clientX
        this.lastY = (touch || evt).clientY
        this.selectionDisplay = true
        window.addEventListener('mousemove', this.mousemove)
        window.addEventListener('mouseup', this.mouseup)

      },
      mousemove: function (evt) {
        if (this.lastX || this.lastY) {
          const { /*abs,*/ max, min} = Math
          const brect = this.$el.getBoundingClientRect()
          const touch = evt.touches && evt.touches[0]
          let x2 = (touch || evt).clientX
          let y2 = (touch || evt).clientY

          //cliping
          if (x2 < brect.left) x2 = brect.left
          if (y2 < brect.top) y2 = brect.top
          //if (x2 > brect.left + brect.width) x2 = brect.left + brect.width
          // if (y2 > brect.top + brect.height) y2 = brect.top + brect.height

          const x3 = min(this.lastX, x2)
          const y3 = min(this.lastY, y2)
          const x4 = max(this.lastX, x2)
          const y4 = max(this.lastY, y2)

          this.selectionArea.top = y3 + "px"
          this.selectionArea.left = x3 + "px"
          this.selectionArea.width = (x4 - x3) + "px"
          this.selectionArea.height = (y4 - y3) + "px"
        }
      },
      mouseup: function () {
        this.selectionDisplay = false;
        window.removeEventListener('mousemove', this.mousemove);
        window.removeEventListener('mouseup', this.mouseup);
        this.selectionArea.width = 0
        this.selectionArea.height = 0
        this.selectionArea.top = 0
        this.selectionArea.left = 0
        this.lastX = 0
        this.lastY = 0
      },
      enter: function () {
        this.$refs.icons.forEach(i => {
          if (i.iconSelected && !this.selectionDisplay) {
            this.$store.commit('win/addApp', i.$options.propsData)
          }
        })
      }
    }
  }
</script>

<style scoped>
  .grid-body {
    padding-top: 5px;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  .icon-grid {
    display: flex;
    flex: 1 1 0%;
    height: 100%;
    flex-flow: column wrap;
    align-content: flex-start;
  }

  .grid-cell {
    width: 76px;
    position: relative;
    display: flex;
    flex: 0 0 101px;
    align-items: flex-start;
    justify-content: center;
  }

  .selection {
    top: 0;
    position: fixed;
    width: 100px;
    height: 100px;
    background: rgba(0, 102, 204, 0.2745);
    border: 1px solid rgb(0, 120, 215);
    z-index: 4;
  }

  .menu_item {
    line-height: 20px;
    text-align: center;
    margin-top: 10px;
  }

  .menu {
    height: 100px;
    width: 80px;
    position: absolute;
    border-radius: 10px;
    border: 1px solid #999999;
    background-color: #f4f4f4;
  }

  .box {
    width: 100%;
  }
</style>
