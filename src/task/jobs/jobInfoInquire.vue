<template>
  <div style="height:100%" v-loading="loading">
    <div class="card-container">


      <a-tabs type="card">
        <a-tab-pane tab="手工处理" key="hand">
          <div>
            <a-row>

              <a-col :span="6">
                <wbutton @click="inquireJobInfo">查询任务信息</wbutton>
              </a-col>
            </a-row>


            <a-table bordered
                     :dataSource="dataJobInfo"
                     :columns="colJobInfo"
                     :pagination="pagination"
                     rowKey="jobId"
                     :scroll="{ x: 2400 }"
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
    name: "jobInfoInquire",
    components: {Wbutton, Wedit, JsonView},
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
            title: '最大次数',
            dataIndex: 'maxCount',
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


        inJsonData: {},
        outJsonData: {},
        loading: false
      }

    },
    created: function () {
      console.debug("begin inquire job log")
      this.inquireJobInfo();
    },
    methods: {


      inquireJobInfo() {

        this.loading = true;
        let filter = {
          jobStatus: {in: ["create", "open", "begin", "option"]},
          //orgId:{is:this.orgId},
          //userId:{is:this.userId}
        }
        let joblog = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
        //  flowName: this.flowName,
        //  flowProcId: this.processId,
          jobAction: "jobInquireInfo",

         // filter: filter,
          currentPage: 1,
          pageSize: 1000,
        }
        this.inJsonData = joblog
        axios.dealJob(joblog).then(({data}) => {
          if (data.isSuccess) {
            this.outJsonData = data
            this.dataJobInfo = data.recordData;

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
