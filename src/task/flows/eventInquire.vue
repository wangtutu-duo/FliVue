<template>
  <div style="height:100%" v-loading="loading">
    <div class="card-container">

      <a-tabs type="card">
        <a-tab-pane tab="手工处理" key="hand">
          <div>
            <a-row>
              <a-col :span="4">请输入流程名称</a-col>
              <a-col :span="5">
                <wedit v-model="flowName" input-hint="请输入流程名称"></wedit>
              </a-col>

              <a-col :span="6">
                <wbutton @click="inquireEvent">查询事件</wbutton>
              </a-col>
              <a-col :span="6">
                <wbutton @click="triggerEvent">触发事件</wbutton>
              </a-col>
            </a-row>


            <a-table bordered
                     :dataSource="dataFlow"
                     :columns="colFlow"
                     :pagination="pagination"
                     rowKey="flowRefNo"
                     :scroll="{ x: 2000 }"
                     size="small"
            >

            </a-table>


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
    name: "eventInquire",
    components: {Wbutton, Wedit, JsonView},
    props:
      {
        itemId: String,
        taskPara: String
      },
    data() {
      return {
        dataFlow: null,
        pagination:
          {
            total: 0,
            pageSize: 10,
          },
        colFlow: [
          {
            title: '进程ID',
            dataIndex: 'flowProcId',
          },
          {
            title: '流程流水号',
            dataIndex: 'flowRefNo',
          },
          {
            title: '节点类型',
            dataIndex: 'nodeType',
          },
          {
            title: '节点名称',
            dataIndex: 'nodeName',
          },
          {
            title: '节点描述',
            dataIndex: 'nodeDesc',
          },
          {
            title: '事件字段',
            dataIndex: 'eventField',
          },
          {
            title: '字段内容',
            dataIndex: 'fieldValue',
          },
          {
            title: '创建时间',
            dataIndex: 'eventCreate',
          },
          {
            title: '触发时间',
            dataIndex: 'triggerTime',
          },

          {
            title: '事件状态',
            dataIndex: 'eventStatus',
          },
        ],
        flowName: "flowBasic1",
        processId: "",
        inJsonData: {},
        outJsonData: {},
        loading: false
      }

    },
    created() {
      this.inquireEvent();
    },
    methods: {
      inquireEvent() {

        this.loading = true;
        let filter = {
          flowName: {is: this.flowName},
          //orgId:{is:this.orgId},
          //userId:{is:this.userId}
        }
        let event = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
          flowName: this.flowName,
          //filter:filter,
          flowAction: "eventInquire",
          currentPage: 1,
          pageSize: 10
        }
        this.inJsonData = event
        axios.dealFlow(event).then(({data}) => {
          if (data.isSuccess) {

            this.outJsonData = data
            this.dataFlow = data.recordData;
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        })

      },
      triggerEvent() {

        this.loading = true;

        let filter = {AAA:{is:"A123"},
          BBB: {is:"B456"}
      }
        let trigger = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
          eventField: "AAA|BBB",
          AAA:"A123",
          BBB: "B456",
          filter:filter,
          singleCheck: true,      // true 满足条数超过1个就不执行，并返回提示， false 满足条件的都触发
          flowAction: "eventTrigger",

        }
        this.inJsonData = trigger
        axios.dealFlow(trigger).then(({data}) => {
          if (data.isSuccess) {

            this.outJsonData = data
            this.dataFlow = data.recordData;
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
