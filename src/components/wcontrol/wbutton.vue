<template>
  <div v-loading="loading">
    <a-button   @click="doTask">
      <slot></slot>
    </a-button>
  </div>
</template>

<script>
  import store from '@/store/index'

  export default {
    name: "wbutton",

    props:
      {
        //  ...Button.props,

        taskName: String,
        moduleName: String,

        taskPara: {}
      },
    data: function () {
      return {
        loading: false
      }


    },

    methods:
      {
        doTask() {

          if(this.taskName)
          {
            this.loading = true;
            let taskInfo = this.$store.getters["info/getTaskInfo"](this.taskName)
            if(taskInfo.runType==null||taskInfo.runType=="backend") {
              store.dispatch("task/doTask", this.taskPara).then((data) => {
                console.debug(data)

                this.$emit("taskFinish", data)

                this.loading = false;
              });
            }
            else
            {
              let para = {itemId:this.taskName,taskPara:this.taskPara}
              this.$store.commit('wins/addWindow', para);
              this.loading = false;
            }
          }
          else
          {
            this.$emit("click")
          }
          //dotask
        },
      },
    computed:
      {}

  }


</script>

<style scoped>

</style>
