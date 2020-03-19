<template>
  <div style="height:100%" v-loading="loading">
    <div class="card-container">

      <a-modal
        title="输入提交数据"
        ref="userDataModal"
        style="top: 80px;width:600px"
        :visible="modal1Visible"
        @ok="() => submit()"
        @cancel="() => cancel()"
      >
        <user-data ref="userData"></user-data>
      </a-modal>

      <a-tabs type="card">
        <a-tab-pane tab="手工处理" key="hand">
          <div>
            <a-row>
              <a-col :span="4">请输入机构代号</a-col>
              <a-col :span="5">
                <wedit v-model="orgId" input-hint="请输入机构代号"></wedit>
              </a-col>
              <a-col :span="4">请输入用户代号</a-col>
              <a-col :span="5">
                <wedit v-model="userId" input-hint="请输入用户代号"></wedit>
              </a-col>
              <a-col :span="6">
                <wbutton @click="inquireFlow">查询流程</wbutton>
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
              <template slot="operation" slot-scope="text, record">
                <wbutton @click="prepareTask(record.flowRefNo)">执行</wbutton>
              </template>
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
  import userData from "./userData";
  import Wbutton from "../../components/wcontrol/wbutton";
  import axios from '@/utils/axios.js'
  import JsonView from 'vue-json-viewer'

  export default {
    name: "mytasks",
    components: {Wbutton, Wedit, JsonView, userData},
    props:
      {
        itemId: String,
        taskPara: String
      },
    data() {
      return {
        dataFlow: null,
        modal1Visible: false,
        flowRefNo: null,
        orgId: null,
        userId: null,

        pagination:
          {
            //defaultCurrent:1,
            //current:1,
           // showSizeChange:()=>{this.inquireFlow();},
            showQuickJumper:true,
            total: 0,
            pageSize: 8,
           // change:()=>{this.inquireFlow();},
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
            title: '创建时间',
            dataIndex: 'flowCreate',
          },
          {
            title: '开始时间',
            dataIndex: 'flowBegin',
          },
          {
            title: '结束时间',
            dataIndex: 'flowEnd',
          },
          {
            title: '指定机构',
            dataIndex: 'assignOrgId',
          },
          {
            title: '执行机构',
            dataIndex: 'dealOrgId',
          },
          {
            title: '指定人',
            dataIndex: 'assignUserId',
          },

          {
            title: '执行人',
            dataIndex: 'dealUserId',
          },
          {
            title: '进程状态',
            dataIndex: 'flowStatus',
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            width: 80,
            scopedSlots: {customRender: 'operation'},

          },
        ],
        flowName: "flowBasic1",
        processId: "",

        inJsonData: {},
        outJsonData: {},
        loading: false
      }

    },
    created: function () {
      console.debug("begin inquire flow")
      this.inquireFlow();
    },
    methods: {
      setModal1Visible(modal1Visible) {
        this.modal1Visible = modal1Visible;
      },
      prepareTask(flowRefNo) {

        this.loading = true;
        this.flowRefNo = flowRefNo;
        let flow = {
          flowRefNo: flowRefNo,
          flowAction: "flowBegin",
          flowOrgId: "beginOrg",
          flowUserId: "beginUser",
          flowCheck: "false",
        }
        this.inJsonData = flow
        axios.dealFlow(flow).then(({data}) => {
          if (data.isSuccess) {
            this.outJsonData = data
            this.setModal1Visible(true);
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        }).catch((data) => {
          this.loading = false;
          this.$message.error("访问后台错误")
        });
      },
      inquireFlow() {

        this.loading = true;
        let filter = {
          flowStatus: {in: ["create", "open", "begin", "option"]},
          //orgId:{is:this.orgId},
          //userId:{is:this.userId}
        }
        let flow = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
          flowName: this.flowName,
          flowProcId: this.processId,
          flowAction: "flowInquire",

          filter: filter,
          currentPage: 1,
          pageSize: 1000,
        }
        this.inJsonData = flow
        axios.dealFlow(flow).then(({data}) => {
          if (data.isSuccess) {
            this.outJsonData = data
            this.dataFlow = data.recordData;

            this.$message.success(data.okMessage)
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        }).catch((data) => {
          this.loading = false;
          this.$message.error("访问后台错误")
        });

      },
      submit() {
        this.loading = true;

        console.debug(this.$refs.userData);


        let flow = {

          flowRefNo: this.flowRefNo,
          flowAction: "flowCommit",

        }
        let userData = this.$refs.userData.dataSource;
        userData.forEach((item) => {
          let fld = item.fldName;
          let value = item.fldValue;
          flow[fld] = value;
        })
        this.inJsonData = flow
        axios.dealFlow(flow).then(({data}) => {
          if (data.isSuccess) {

            this.outJsonData = data
            this.setModal1Visible(false)
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        }).catch((data) => {
          this.loading = false;
          this.$message.error("访问后台错误")
        });
      },
      cancel() {
        this.setModal1Visible(false)
        this.loading = true;

        let flow = {
          flowRefNo: this.flowRefNo,
          flowAction: "flowCancel",

        }
        this.inJsonData = flow
        axios.dealFlow(flow).then(({data}) => {
          if (data.isSuccess) {
            this.outJsonData = data

          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        }).catch((data) => {
          this.loading = false;
          this.$message.error("访问后台错误")
        });
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
