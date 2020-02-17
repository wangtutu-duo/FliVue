<template>
  <div v-loading="loading" style="width: 98%; ">
    <el-table
      :data="settingData"
      border
      height="400"
    >

      <el-table-column :show-overflow-tooltip="true" v-for="(field,key) in settingInfo.fields " :key="key"
                       :prop="field"
                       :label="getLabel(field)"
      >
      </el-table-column>
      <el-table-column
        align="right" label="操作" :v-if="showTask">
        <template slot="header" slot-scope="header">
          <wbutton
            size="mini"
            type="danger"
          >Delete
          </wbutton>
        </template>
        <template slot-scope="scope">
          <div style='width: 100px;display:block;word-break: break-all;word-wrap: break-word;'>
            <wbutton v-for="(task,key0) in settingInfo.tasks" :key="key0" :task-name="task"
                     :task-para="getTaskPara(scope.$index)">{{getTaskName(task)}}
            </wbutton>
          </div>
        </template>
      </el-table-column>


    </el-table>
    <el-pagination
      @size-change="SizeChange"
      @current-change="CurrentPageChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  import store from '../../../store/index'
  import wbutton from "@/components/wcontrol/wbutton";

  export default {
    name: "setting",
    components: {store, wbutton},
    props:
      {
        settingName: null,
        settingPara: null
      },
    data() {
      return {
        settingInfo: {},
        tableInfo: null,

        showTask: false,
        settingData: [],
        loading: false,
        total: 0,
        currentPage:1,
        pageSize:20,
        pageCount:1,
        pagerCount:5,
      }
    },
    created() {
      console.debug("create and get settiing ")
      this.makeSetting();
    },
    methods:
      {
        makeSetting() {

          console.debug("get setting:  " + this.settingName);
          this.loading = true;
          let info2 = {module: this.moduleName, paraType: "getTablePara", tableName: "secOrg"}
          store.dispatch("info/getTableInfoAct", info2).then((data) => {
            //let a = store.info.getters.getSetting;
            console.debug(data)

            //this.settingInfo = data;
          });
          let info = {module: this.moduleName, paraType: "getSettingPara", settingName: this.settingName}
          store.dispatch("info/getSettingInfoAct", info).then((data) => {
            //let a = store.info.getters.getSetting;
            console.debug(data)
            this.settingInfo = data;

            this.showTask = this.hasTask()
            this.getSettingData();
            this.loading = false;
          });


        },
        getLabel(name) {
          let field = this.settingInfo.fieldInfo[name];
          let label = null;
          if (field) {
            label = field["label"];
            if (label) return label;
          }
          let entType = this.settingInfo.entType;
          if (entType == "table") {
            let tableName = this.settingInfo.entName;
            label = "[" + tableName + name + "]"
            if (!this.tableInfo) {
              this.tableInfo = this.$store.getters["info/getTableInfo"](tableName)
            }
            if(this.tableInfo) {
              if (this.tableInfo["fields"]) {
                if (this.tableInfo.fields[name])
                  label = this.tableInfo.fields[name].fldDesc;
              }
              else
              {
                console.debug("get label error:" + name);
              }
            }
            return label;
          }
        },
        hasTask() {
          if (this.settingInfo["tasks"] && this.settingInfo["tasks"].length > 0) return true;
          else return false;
        },
        getTaskName(name) {
          let taskInfo = this.$store.getters["info/getTaskInfo"](name)
          if (taskInfo["shortName"]) return taskInfo.shortName;
          return taskInfo.name
        },
        getTaskPara(index) {
          let rowData = this.settingData[index];
          let para = {};
          let parafld = this.settingInfo.taskPara;
          if (parafld != null && parafld.length > 0) {
            for (let ii = 0; ii < parafld.length; ii++) {
              let fld = parafld[ii];
              if (rowData[fld])
                para[fld] = rowData[parafld];
              else
                para[fld] = fld;
            }
          }
          return para;
        },
        getDefaultTask() {
          if (this.settingInfo["tasks"] && this.settingInfo["tasks"].length > 0) {
            let task0 = this.settingInfo["tasks"][0];
            let taskInfo = this.$store.getters["info/getTaskInfo"](task0)
            taskInfo["taskName"] = task0;
            if (taskInfo.taskType == "add") {
              return taskInfo;
            }
            return false;

          }
        },
        SizeChange(size)
        {
          this.pageSize = size;
          this.getSettingData()
          console.debug(size);
        },
        CurrentPageChange(nPage)
        {
          this.currentPage = nPage;
          this.getSettingData()
          console.debug(nPage);
        },
        getSettingData()
        {
          this.loading = true;
          this.settingData = null
          let setPara = this.settingPara;
          setPara["currentPage"] = this.currentPage;
          setPara["pageSize"] = this.pageSize;
          let para = {settingName: this.settingName, settingPara: setPara}
          store.dispatch("task/doSetting", para).then((data) => {

            console.debug(data)
            this.settingData = data.settingData;
            this.total = data.total;
            this.showDefault = false;
            if (this.total == 0 && this.taskDefautl)
              this.showDefault = true;
            console.debug(data);
            this.loading = false;
          }).catch((data)=>{
            this.loading = false;
          });
        }
      },
    watch:
      {
        settingPara() {
            this.getSettingData();
        },
      }
  }
</script>

<style scoped>

</style>
