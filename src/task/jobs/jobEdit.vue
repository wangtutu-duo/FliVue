<template>
  <div>


    <a-row>
      <a-col :span="4">
        任务名称:
      </a-col>
      <a-col :span="8">
        <a-input v-model="jobInfoData.jobName"></a-input>
      </a-col>
      <a-col :span="4">
        任务组:
      </a-col>
      <a-col :span="8">
        <a-input v-model="jobInfoData.jobGroup"></a-input>
      </a-col>

    </a-row>

    <a-row>

      <a-col :span="4">
        任务描述:
      </a-col>
      <a-col :span="20">
        <a-input v-model="jobInfoData.jobDesc"></a-input>
      </a-col>
    </a-row>

    <a-row>


      <a-col :span="4">
        执行类型:
      </a-col>
      <a-col :span="8">
        <a-switch checkedChildren="流程类" unCheckedChildren="函数类" defaultChecked v-model="isFlowModel"/>
      </a-col>

      <a-col :span="4">
        执行名称:
      </a-col>
      <a-col :span="8">
        <a-input v-model="jobInfoData.dealName"></a-input>
      </a-col>
    </a-row>
    <a-row>


      <a-col :span="4">
        触发类型:
      </a-col>
      <a-col :span="8">
        <a-switch checkedChildren="simple触发" unCheckedChildren="cron触发" defaultChecked v-model="isSimple" />
      </a-col>
      <a-col :span="4">
        启动标识:
      </a-col>
      <a-col :span="8">
        <a-switch checkedChildren="启动" unCheckedChildren="停止" defaultChecked v-model="isStart"/>
      </a-col>
    </a-row>
    <div v-if="isSimple">
      <a-row>
        <a-col :span="4">
          延迟时间:
        </a-col>
        <a-col :span="8">
          <a-input v-model="jobInfoData.trigger.delay"></a-input>
        </a-col>
        <a-col :span="4">
          间隔时间:
        </a-col>
        <a-col :span="8">
          <a-input v-model="jobInfoData.trigger.interval"></a-input>
        </a-col>
      </a-row>
      <a-row>
        <a-col :span="4">
          执行次数:
        </a-col>
        <a-col :span="8">
          <a-input v-model="jobInfoData.trigger.runCount"></a-input>
        </a-col>
        <a-col :span="4">
          执行时间:
        </a-col>
        <a-col :span="8">
          <a-input v-model="jobInfoData.trigger.runTime"></a-input>
        </a-col>
      </a-row>

    </div>
    <div v-if="!isSimple">
      <a-row>
        <a-col :span="4">
          cron描述:
        </a-col>
        <a-col :span="20">
          <a-input v-model="jobInfoData.trigger.cronExpress"></a-input>
        </a-col>
      </a-row>
    </div>


  </div>
</template>
<script>


  import axios from '@/utils/axios.js'
  import store from '@/store/index'

  export default {
    name: "jobEdit",
    props: {
      jobInfo: null,
    },
    components: {},
    data() {

      return {
        jobInfoData: {
          jobId: "",
          jobName: "",
          madeBy: "custom",
          jobGroup: "custom",
          jobDesc: "",
          triggerType: "",
          jobType: "",
          trigger: {
            delay: "",
            interval: "",
            runCount: "",
            runTime: "",
            cronExpress: ""
          },
        },
        isFlowModel: true,
        isSimple: true,
        isCron:false,
        isStart: true,
      };
    },
    created()
    {
      this.prepareJobData(this.jobInfo);
    },
    methods: {
      prepareJobData(newVal)
      {

        let jobtype = "addjob";
        if(newVal!=null) jobtype = newVal.jobType;

        if (jobtype  != "addjob") {
          this.jobInfoData.jobId = newVal.jobId;
          this.jobInfoData.jobName = newVal.jobName;
          this.jobInfoData.jobGroup = newVal.jobGroup;
          this.jobInfoData.jobDesc = newVal.jobDesc;
          this.jobInfoData.triggerType = newVal.triggerType;
          this.jobInfoData.jobType = newVal.jobType;
          if (newVal.trigger != null) {
            this.jobInfoData.trigger.delay = newVal.trigger.delay;
            this.jobInfoData.trigger.interval = newVal.trigger.interval;
            this.jobInfoData.trigger.runCount = newVal.trigger.runCount;
            this.jobInfoData.trigger.runTime = newVal.trigger.runTime;
            this.jobInfoData.trigger.cronExpress = newVal.trigger.cronExpress;
          }
          if (this.jobInfoData.jobType == "method")     //flowModel
          {
            this.isFlowModel = true;
          } else {
            this.isFlowModel = false;
          }
          if (this.jobInfoData.triggerType == "simple")     //cron
          {
            this.isSimple = true;
          } else {
            this.isSimple = false;
          }
          if (this.jobInfoData.triggerType == "start")     //
          {
            this.isStart = true;
          } else {
            this.isStart = false;
          }
        } else {
          this.jobInfoData.jobId = "";
          this.jobInfoData.jobName = "";
          this.jobInfoData.jobGroup = "custom";
          this.jobInfoData.jobDesc = "";
          this.jobInfoData.triggerType = "simple";
          this.jobInfoData.jobType = "flowModel";
          this.jobInfoData.trigger.delay = "1";
          this.jobInfoData.trigger.interval = "10";
          this.jobInfoData.trigger.runCount = "1";
          this.jobInfoData.trigger.runTime = "10";
          this.jobInfoData.trigger.cronExpress = "";
          this.isFlowModel = true;
          this.isSimple = true;
          this.isStart = true;
        }
      },
    },
    watch: {
      jobInfo(newVal, oldValue) {
        this.prepareJobData(newVal);
      }
    },


  }

</script>


