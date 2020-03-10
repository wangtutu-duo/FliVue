<template>
  <div
    class="grid-body" tabindex="0"
  >

    <vue-context-menu
      :contextMenuData="foderMenuData">
    </vue-context-menu>

    <vue-context-menu
      :contextMenuData="itemMenuData">
    </vue-context-menu>


    <div @contextmenu="showFolderMenu">
      <div class="icon-grid">
        <items v-for="(itemId, index) in folderItems" :item-id="itemId"
               :key="index"
               @showItemContextMenu="showItemMenu">

        </items>
      </div>
      <div class="selection" ref="selection" v-show="selectionDisplay" :style="selectionArea"></div>
    </div>

  </div>
</template>
<script>
  import store from '../../../store/index'
  import items from './items.vue'
  import {flidConfig} from '@/store/flidConfig.js'
  import $ from 'jquery'

  export default {
    name: "folder",
    components: {
      items: items,
    },
    props: {
      itemId: String,

      compara: String,

    },
    data() {
      return {
        folderId: String,
        folderItems: null,
        test: null,
        bMenuVisible: false,
        selectionArea: {
          width: '0',
          height: '0',
          top: '0',
          left: '0'
        },

        selectionDisplay: false,
        theme: null,
        foderMenuData: flidConfig.contextMenu.folder,
        itemMenuData: flidConfig.contextMenu.item
      }
    },
    created: function () {

        this.folderId = this.itemId
        this.getFolderItems()


    },
    methods: {

      showFolderMenu(e) {
        let event = window.event || e;

        event.preventDefault();
        $('.vue-contextmenuName-folder-menu').css('display', 'none');
        $('.vue-contextmenuName-item-menu').css('display', 'none');

        let x = event.clientX;
        let y = event.clientY;
        this.foderMenuData.axis = {x, y};

      },
      showItemMenu(e) {
        let event = window.event || e;

        event.preventDefault();
        $('.vue-contextmenuName-item-menu').css('display', 'none');
        $('.vue-contextmenuName-folder-menu').css('display', 'none');
        let x = event.clientX;
        let y = event.clientY;
        this.itemMenuData.axis = {x, y};
      },
      getFolderItems() {
        if (this.folderId == null) {
          return;
        }

        let info = {paraType: "getMenuPara", folderId: this.folderId}
        store.dispatch("info/getFolderInfoAct", info).then((data1) => {

          console.debug(data1)
          this.folderItems = data1;
        });
        info = {paraType: "getTaskPara", taskId: this.folderId}
        store.dispatch("info/getTaskInfoAct", info).then((data2) => {
          //let a = store.info.getters.getList;
          console.debug(data2)
        });
      },
      newFolder: function (vm, event) {

      },
      newModule: function (vm, event) {

      },
      newTask: function (vm, event) {

      },
      needHelp: function (vm, event) {


      },
    },

  }
</script>


<style scoped>
  .grid-body {
    padding-top: 15px;
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
    width: 100px;
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
