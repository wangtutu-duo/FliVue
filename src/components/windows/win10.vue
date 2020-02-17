<template>
  <div  >
    <el-container>
      <el-main>

        <notifybar></notifybar>
        <folder item-id = "root"></folder>
        <windows
          v-for="(app) in getAppList"
          :key="app.processId"
          :process-id="app.processId"
          :item-id="app.itemId"
          :z-index="app.zIndex"
          :focused="app.focused"
          :minimized="app.minimized"
          :taskPara="app.taskPara"
        >
        </windows>
      </el-main>
      <el-footer>
        <taskbar></taskbar>
      </el-footer>

    </el-container>
  </div>
</template>

<script>
  import notifybar from '@/components/windows/notifybar.vue'
  import taskbar from '@/components/windows/taskbar.vue'
  import windows from '@/components/windows/window/window.vue'

  import folder from '@/components/windows/folder/folder.vue'
  export default {
    components: {
      'notifybar': notifybar,
      'taskbar': taskbar,
      'windows': windows,
      'folder': folder
    },
    data: function () {
      return {

      }
    },
    mounted: function () {
      this.$nextTick(function () {
        window.addEventListener('resize', this.resizeWindow);
      });
    },
    beforeDestroy: function () {
      window.removeEventListener('resize', this.resizeWindow);
    },
    methods: {
      resizeWindow: function () {
        this.$store.commit('wins/screenRecalculation');
      }
    },
    computed: {
      direction: function () {
        return this.$store.getters["wins/getTaskbarDirection"];
      },
      getAllTaskList: function () {
        return this.$store.getters["wins/getAllTaskList"];
      },

      getAppList: function () {
        console.debug("wins/getAppList");
        console.debug(this.$store.getters["wins/getAppList"])
        return this.$store.getters["wins/getAppList"];
      },
      getZIndex() {
        return this.$store.getters["wins/getMaxZIndex"];
      },

    }
  }
</script>


<style>
</style>
