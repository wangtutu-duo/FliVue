<template>
  <div style="height:100%" v-loading="loading">
    <div class="card-container">

      <a-tabs type="card">
        <a-tab-pane tab="操作" key="hand">
          <div>
            <a-row>
              <a-col :span="5">请输入流程名称</a-col>
              <a-col :span="7">
                <wedit v-model="flowName" input-hint="请输入流程名称"></wedit>
              </a-col>
              <a-col :span="5">
                <wbutton @click="inquireProcess">查询进程</wbutton>
              </a-col>
              <a-col :span="5">
                <wbutton @click="deleteProcess">删除进程</wbutton>
              </a-col>
            </a-row>


            <a-table bordered
                     rowKey="flowProcId"
                     :dataSource="dataProc"
                     :columns="colProc"
                     :pagination="pagination"
                     size="small"
                     :scroll="{ x: 2000 }"
                     :rowSelection="rowSelection">
              <a slot="flowProcId" slot-scope="text" href="javascript:;">{{text}}</a>
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
    name: "procInquire",
    components: {Wbutton, Wedit, JsonView},
    props:
      {
        itemId: String,
        taskPara: String
      },
    data() {
      return {
        dataProc: null,
        pagination:
          {
            total: 0,
            pageSize: 10,
          },
        colProc: [
          {
            title: '进程ID',
            dataIndex: 'flowProcId',
            scopedSlots: {customRender: 'flowProcId'},
          },
          {
            title: '进程描述',
            dataIndex: 'flowProcDesc',

          },
          {
            title: '流程Id',
            dataIndex: 'flowId',
          },
          {
            title: '流程名',
            dataIndex: 'flowName',
          },
          {
            title: '流程版本',
            dataIndex: 'flowVersion',
          },
          {
            title: '进程创建时间',
            dataIndex: 'flowProcCreate',
          },
          {
            title: '进程开始时间',
            dataIndex: 'flowProcBegin',
          },
          {
            title: '进程结束时间',
            dataIndex: 'flowProcEnd',
          },
          {
            title: '进程状态',
            dataIndex: 'flowProcStatus',
          },
        ],
        flowName: "flowBasic1",
        processId: "",
        processDesc: "用户新增2019",
        inJsonData: {},
        outJsonData: {},
        loading: false,
        total: 0,
        pageSize: 10,
        selectProc:null

      }

    },
    created()
    {
      this.inquireProcess();
    },
    methods: {
      deleteProcess() {

        this.loading = true;
        let aa = this.selectProc;
        let filter = {
          flowProcId: {in: this.selectProc}
        }

        let proc = {
          flowAction: "procDelete",
          filter: filter,
        }
        this.inJsonData = proc
        axios.dealFlow(proc).then(({data}) => {
          if (data.isSuccess) {

            this.outJsonData = data
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
      inquireProcess() {

        this.loading = true;
        let proc = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
          flowName: this.flowName,
          flowAction: "procInquire",
          currentPage: 1,
          pageSize: 10
        }
        this.inJsonData = proc
        axios.dealFlow(proc).then(({data}) => {
          if (data.isSuccess) {

            this.outJsonData = data
            this.dataProc = data.recordData;
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        }).catch((data) => {
          this.loading = false;
          this.$message.error("访问后台错误")
        });

      }
      ,
    },
    computed: {
      rowSelection() {
        const {selectedRowKeys} = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectProc = selectedRowKeys;
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            props: {
              disabled: record.flowProcStatus === 'begin', // Column configuration not to be checked
              name: record.flowProcId,
            },
          }),
        };
      }
      ,
    }
  }
  ;
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
