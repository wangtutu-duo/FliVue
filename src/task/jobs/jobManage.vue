<template>
  <div style="height:100%" v-loading="loading">
    <div class="card-container">

      <a-modal
        title="任务维护"
        ref="jobModal"
        style="top: 80px;width:600px"
        :visible="modal1Visible"
        @ok="() => editJobInfo()"
        @cancel="() => cancelEdit()"
      >
        <job-edit :job-info="currentJobInfo"  ref="editJob"></job-edit>
      </a-modal>
      <a-tabs type="card">
        <a-tab-pane tab="手工处理" key="hand">
          <div>
            <a-row>
              <a-col :span="3">
                <wedit></wedit>
              </a-col>
              <a-col :span="2">
                <wbutton @click="inquireJob">查询任务</wbutton>
              </a-col>
              <a-col :span="2">
                <wbutton @click="addJob">新增任务</wbutton>
              </a-col>
              <a-col :span="2">
                <wbutton @click="editJob">修改任务</wbutton>
              </a-col>
              <a-col :span="2">
                <wbutton @click="deleteJob">删除任务</wbutton>
              </a-col>
              <a-col :span="2">
                <wbutton @click="stopJob">停止任务</wbutton>
              </a-col>
              <a-col :span="2">
                <wbutton @click="startJob">启动任务</wbutton>
              </a-col>
              <a-col :span="2">
                <wbutton @click="stopJob">关闭任务</wbutton>
              </a-col>

              <a-col :span="3">
                <wedit v-model="hostIp"></wedit>
              </a-col>
              <a-col :span="3">
                <wedit v-model="hostName"></wedit>
              </a-col>
            </a-row>


            <a-table bordered
                     :dataSource="dataJobInfo"
                     :columns="colJobInfo"
                     :pagination="pagination"
                     rowKey="jobId"
                     :scroll="{ x: 2400 }"
                     size="small"
                     :rowSelection="rowSelection">
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
  import JobEdit from "./jobEdit";

  export default {
    name: "jobManage",
    components: {JobEdit, Wbutton, Wedit, JsonView},
    props:
      {
        itemId: String,
        taskPara: String
      },
    data() {
      return {
        dataJobInfo: null,
        pagination:
          {
            //defaultCurrent:1,
            //current:1,
            // showSizeChange:()=>{this.inquireFlow();},
            showQuickJumper: true,
            total: 0,
            pageSize: 8,
            // change:()=>{this.inquireFlow();},
          },
        colJobInfo: [

          {
            title: 'JobId',
            dataIndex: 'jobId',
          },
          {
            title: 'job名称',
            dataIndex: 'jobName',
          },
          {
            title: 'job组',
            dataIndex: 'jobGroup',
          },
          {
            title: 'job类型',
            dataIndex: 'jobType',
          },
          {
            title: '创建时间',
            dataIndex: 'jobCreate',
          },

          {
            title: '开始时间',
            dataIndex: 'jobBegin',
          },
          {
            title: '截止时间',
            dataIndex: 'endTime',
          },
          {
            title: '上次执行时间',
            dataIndex: 'prevTime',
          },
          {
            title: '下次执行时间',
            dataIndex: 'nextTime',
          },
          {
            title: '最新状态',
            dataIndex: 'jobStatus',
          },
          {
            title: '最大次数',
            dataIndex: 'maxCount',
          },
          {
            title: '触发次数',
            dataIndex: 'triggerCount',
          },
          {
            title: '执行次数',
            dataIndex: 'dealCount',
          },
          {
            title: '成功次数',
            dataIndex: 'okCount',
          },
          {
            title: '失败次数',
            dataIndex: 'failCount',
          },
          {
            title: '机器名',
            dataIndex: 'runHost',
          },
          {
            title: '机器IP',
            dataIndex: 'runIp',
          },
          {
            title: 'job备注',
            dataIndex: 'jobMemo',
          },
        ],
        selectJobs: [],
        selectJobInfo: [],
        currentJobInfo: {},
        editData: {},
        inJsonData: {},
        outJsonData: {},
        loading: false,
        hostName: "",
        hostIp: "",
        modal1Visible: false,

      }

    },
    created: function () {
      console.debug("begin inquire job log")
      this.inquireJob();
    },
    methods: {


      editJobInfo() {
        this.editData = this.$refs.editJob.jobInfoData;
        let isFlowModel = this.$refs.editJob.isFlowModel;
        let isSimple = this.$refs.editJob.isSimple;
        let isStart = this.$refs.editJob.isStart;
        if (isFlowModel) this.editData.jobType = "flowModel";
        else this.editData.jobType = "appMethod";
        if (isSimple) this.editData.triggleType = "simple";
        else this.editData.triggleType = "cron";
        if (isStart) this.editData.jobStatus = "waitstart";
        else this.editData.jobStatus = "stop";

        if (this.editData.jobId == "") this.dealJob("jobAdd");
        else
          this.dealJob("jobEdit");
        this.modal1Visible = false;
      },
      cancelEdit() {
        this.modal1Visible = false;

      },

      addJob() {
        this.currentJobInfo = {};
        this.currentJobInfo["jobType"]="addjob";

        this.modal1Visible = true;
      },
      editJob() {
        let aa = this.selectJobInfo;

        if (aa.length != 1) {
          this.$message.info("请选择一条记录进行修改")
          return;
        }
        this.currentJobInfo = aa[0];
        if (this.currentJobInfo.jobGroup != "custom") {
          this.$message.info("系统产生的记录不能修改");
          return;
        }
        this.modal1Visible = true;

      },
      deleteJob() {
        let aa = this.selectJobs;
        if (aa.length == 0) {
          this.$message.info("请选择需要删除的任务")
          return;
        }
        this.dealJob("jobDelete");
      },
      stopJob() {
        let aa = this.selectJobs;
        if (aa.length == 0) {
          this.$message.info("请选择需要停止的任务")
          return;
        }
        this.dealJob("jobStop");
      },
      closeJob() {
        let aa = this.selectJobs;
        if (aa.length == 0) {
          this.$message.info("请选择需要关闭的任务")
          return;
        }
        this.dealJob("jobClose");
      },
      startJob() {
        let aa = this.selectJobs;
        if (aa.length == 0) {
          this.$message.info("请选择需要启动的任务")
          return;
        }
        this.dealJob("jobStart");
      },
      dealJob(actionType) {

        this.loading = true;
        let aa = this.selectJobs;
        let filter = {
          jobId: {in: this.selectJobs}
        }

        let job = {
          jobAction: actionType,
          filter: filter,
          jobInfo: this.editData,
        }
        this.inJsonData = job
        axios.dealJob(job).then(({data}) => {
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

      inquireJob() {

        this.loading = true;
        let filter = {
          jobStatus: {in: ["create", "open", "begin", "option"]},
          //orgId:{is:this.orgId},
          //userId:{is:this.userId}
        }
        let job = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
          //  flowName: this.flowName,
          //  flowProcId: this.processId,
          jobAction: "jobInquireInfo",

          // filter: filter,
          currentPage: 1,
          pageSize: 1000,
        }
        this.inJsonData = job
        this.dataJobInfo = null;
        axios.dealJob(job).then(({data}) => {
          if (data.isSuccess) {
            this.outJsonData = data
            this.dataJobInfo = data.recordData;
            this.hostName = data.hostName;
            this.hostIp = data.hostIp;
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

    },
    computed: {
      rowSelection() {
        const {selectedRowKeys} = this;
        return {
          onChange: (selectedRowKeys, selectedRows) => {
            this.selectJobs = selectedRowKeys;
            this.selectJobInfo = selectedRows;
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
          },
          getCheckboxProps: record => ({
            props: {
              disabled: false, //record.jobStatus === 'running', // Column configuration not to be checked
              name: record.flowProcId,
            },
          }),
        };
      },
    }

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
