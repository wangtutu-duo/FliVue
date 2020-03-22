<template>
  <div style="height:100%" v-loading="loading">
    <div class="card-container">


      <a-tabs type="card">
        <a-tab-pane tab="手工处理" key="hand">
          <div>
            <a-row>

              <a-col :span="6">
                <wbutton @click="inquireJobLog">查询任务日志</wbutton>
              </a-col>
            </a-row>


            <a-table bordered
                     :dataSource="dataJobLog"
                     :columns="colJobLog"
                     :pagination="pagination"
                     rowKey="jogLogId"
                     :scroll="{ x: 1000 }"
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
    name: "jobLogInquire",
    components: {Wbutton, Wedit, JsonView},
    props:
      {
        itemId: String,
        taskPara: String
      },
    data() {
      return {
        dataJobLog: null,
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
        colJobLog: [
          {
            title: 'LogId',
            dataIndex: 'logId',
          },
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
            title: 'job序号',
            dataIndex: 'jobNo',
          },
          {
            title: '执行时间',
            dataIndex: 'jobTime',
          },
          {
            title: 'job状态',
            dataIndex: 'jobStatus',
          },
          {
            title: '任务个数',
            dataIndex: 'jobCount',
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
      this.inquireJobLog();
    },
    methods: {


      inquireJobLog() {

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
          jobAction: "jobInquireLog",

         // filter: filter,
          currentPage: 1,
          pageSize: 1000,
        }
        this.inJsonData = joblog
        axios.dealJob(joblog).then(({data}) => {
          if (data.isSuccess) {
            this.outJsonData = data
            this.dataJobLog = data.recordData;

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
