<template>
  <div style="height:100%" v-loading="loading">
    <div class="card-container">

      <a-tabs type="card">
        <a-tab-pane tab="手工录入" key="hand">
          <div>
            <a-row>
              <a-col :span="5">请输入流程名称</a-col>
              <a-col :span="7">
                <wedit v-model="flowName" input-hint="请输入测试流程名称"></wedit>
              </a-col>
              <a-col :span="5">请输入本次进程描述</a-col>
              <a-col :span="7">
                <wedit v-model="processDesc" input-hint="本次测试描述"></wedit>
              </a-col>


            </a-row>
            <a-row>

              <a-col :span="5">后续流程，请使用如下进程号</a-col>
              <a-col :span="7">
                <wedit v-model="processId" input-hint="点击生成流程号后产生"></wedit>
              </a-col>
              <a-col :span="10">
                <wbutton @click="prepareFlow">生成流程号</wbutton>
              </a-col>
            </a-row>

          </div>


        </a-tab-pane>
        <a-tab-pane tab="JSON" key="json">

          <a-row height="">

            <a-col :span="2">输入内容</a-col>
            <a-col :span="22">

              <json-view
                :value="inJsonData"
                :expand-depth=8
                boxed
                copyable/>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="2">输出内容</a-col>
            <a-col :span="22">

              <json-view
                :value="outJsonData"
                :expand-depth=8
                boxed
                copyable/>
            </a-col>
          </a-row>
        </a-tab-pane>

      </a-tabs>
    </div>


  </div>
</template>

<script>

  import Wedit from "../../components/wcontrol/wedit";
  import Wbutton from "../../components/wcontrol/wbutton";
  import axios from '@/utils/axios.js'
  import JsonView from 'vue-json-viewer'

  export default {
    name: "flowPrepare",
    components: {Wbutton, Wedit, JsonView},
    props:
      {
        itemId: String,
        taskPara: String
      },
    data() {
      return {

        flowName: "flowBasic1",
        processId: "",
        processDesc: "用户新增2019",
        inJsonData:{},
        outJsonData:{},
        loading:false,
      }

    },
    methods: {
      prepareFlow() {
        this.loading = true;
        if(this.flowName.length==0)
        {
          this.$message.error("请输入流程名及本次进程描述")
          this.loading = false;
          return
        }
        let flow = {
                    flowFirmId:"defalut",
                    flowAppId:"defalut",
                    flowName: this.flowName,
                    flowProcDesc:this.processDesc,
                    flowAction:"flowPrepare"}
        this.inJsonData = flow
        axios.dealFlow(flow).then(({data}) => {
          if (data.isSuccess) {
            this.processId = data.flowProcessId
            this.outJsonData = data
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        })

      },
    },
  };
</script>
<style>
  .editable-cell {
    position: relative;
  }

  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    line-height: 18px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell:hover .editable-cell-icon {
    display: inline-block;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
