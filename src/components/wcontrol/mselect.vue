<template>
  <el-select v-model="value"   multiple collapse-tags   :placeholder="inputHint">
    <el-option
      v-for="item in listData"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
  //import { Select } from "element-ui";
  import store from '@/store/index'

  export default {

    name: "mselect",
    model: {
      prop: 'value0',
      event: "valueChange"
    },
    props:
      {
        //  ...Select.props,
        value0:null,
        splitWord: String,
        multiple:Boolean,
        collapseTags:Boolean,
        inputHint: String,
        listName: String,
        moduleName: String,
        fiendName: String,
      },
    data() {
      return {
        value: this.value0,
        keytype: "",
        listData: [],

      }
    },

    created() {
      console.debug("create and get datalist ")
      this.makelist();
    },
    methods:
      {
        makelist() {
          //return this.$store.getters["info/getList"](this.moduleName,this.fieldName,this.listName);
          //return this.$store.getters["wins/getScreenHeight"]

          console.debug("get list: a");


          let info = {module: this.moduleName, fieldName: this.fieldName, listName: this.listName}
          store.dispatch("info/getListAct", info).then((data) => {
            //let a = store.info.getters.getList;
            console.debug(data)
            this.listData = data.listData;
          });

          // console.debug("get list: b");
          // let b = this.$store.getters("info/getList",this.moduleName,this.fieldName,this.listName);
          // console.debug("get listb:" + b);
          // return this.$store.info.getters.getList(this.moduleName,this.fieldName,this.listName);
        }

      },
    computed:
      {},
    watch:
      {
        value(newVal, oldVal) {
          //splitWord
          newVal = newVal.join(this.splitWord);
          console.debug("select item",newVal)
          this.$emit("valueChange", newVal)
        },
        value0(newVal, oldVal) {

          this.value =  newVal.split(this.splitWord);
        }
      }

  }
</script>

<style scoped>

</style>
