<template>
  <div style="height:100%" v-loading="loading">
    <a-tabs type="card">
      <a-tab-pane tab="手工录入" key="hand">

        <div>
          <a-row>
            <a-col :span="5">请输入测试流程名称</a-col>
            <a-col :span="7">
              <wedit v-model="flowName"></wedit>
            </a-col>
            <a-col :span="7">
              <wedit v-model="flowDesc" input-hint="本次发起流程描述"></wedit>
            </a-col>
            <a-col :span="5">
              <a-button @click="beginFlow">生成流程流水号</a-button>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="5">流程流水号</a-col>
            <a-col :span="7">
              <wedit v-model="flowRefNo"></wedit>
            </a-col>
            <a-col :span="7">
              <a-button :disabled="disableCommit" @click="commitFlow">提交流程</a-button>
            </a-col>
          </a-row>

        </div>
        <a-table bordered
                 :dataSource="dataSource"
                 :columns="columns"
                 :pagination="pagination"

                 size="middle">
          <template slot="fldValue" slot-scope="text, record">
            <editable-cell :text="text" @change="onCellChange(record.key, 'fldValue', $event)"/>
          </template>

        </a-table>
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
</template>

<script>
  import EditableCell from '@/components/wcontrol/form/EditableCell.vue';
  import Wedit from "../../components/wcontrol/wedit";
  import Wbutton from "../../components/wcontrol/wbutton";
  import axios from '@/utils/axios.js'
  import JsonView from 'vue-json-viewer'
  export default {
    name: "flowBegin",
    components: {Wbutton, Wedit, EditableCell,JsonView},
    props:
      {
        itemId: String,
        //compara: String,
        taskPara: String
      },
    data() {
      return {
        flowId: "",
        loading: false,
        disableCommit:true,
        flowName: "flowBasic1",
        inJsonData:{},
        outJsonData:{},
        flowRefNo: null,
        flowDesc: "用户新增2019",
        pagination: {
          total: 0,
          pageSize: 100,
          hideOnSinglePage: true
        },
        dataSource: [
          {
            key: '0',
            fldName: 'orgId',
            fldDesc: '机构代号',
            fldValue: '0001',
          },
          {
            key: '1',
            fldName: 'orgName',
            fldDesc: '机构名称',
            fldValue: '我的单位',
          },
          {
            key: '2',
            fldName: 'action',
            fldDesc: '动作',
            fldValue: '1',
          },
        ],

        columns: [
          {
            title: '字段名',
            dataIndex: 'fldName',
            width: '20%',

          },
          {
            title: '字段描述',
            dataIndex: 'fldDesc',
            width: '40%',
          },
          {
            title: '字段值',
            dataIndex: 'fldValue',
            width: '40%',
            scopedSlots: {customRender: 'fldValue'},
          }
        ],
      };
    },
    methods: {
      beginFlow() {
        this.loading = true;
        if (this.flowName.length == 0 || this.flowDesc.length == 0) {
          this.$message.error("请输入流程名及本次进程描述")
          this.loading = false;
          return
        }
        let flow = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
          flowName: this.flowName,
          flowDesc: this.flowDesc,
          flowOrgId: "firstOrgId",
          flowOrgName: "firstOrgName",
          flowUserId: "firstUserId",
          flowUserName: "firstUserName",
          AAA:"A123",
          BBB:"B456",
          action:"2",
          flowAction: "flowBegin"
        }
        this.inJsonData = flow
        axios.dealFlow(flow).then(({data}) => {
          this.outJsonData = data
          if (data.isSuccess) {
            this.flowRefNo = data.flowRefNo
            this.disableCommit = false;
            this.$message.success(data.okMessage)
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        }).catch((data)=>{
          this.loading = false;
          this.$message.error("访问后台错误")
        });

      },

      commitFlow() {
        this.loading = true;
        if (!this.flowRefNo) {
          this.$message.error("请先生成流程流水号")
          this.loading = false;
          return
        }
        let flow = {
          //flowFirmId: "defalut",
          //flowAppId: "defalut",
          flowRefNo: this.flowRefNo,

          flowOrgId: "firstOrgId",
          flowOrgName: "firstOrgName",
          flowUserId: "firstUserId",
          flowUserName: "firstUserName",
          tranRefNo:"tranRefNo",
          AAA:"A123",
          BBB:"B456",
          action:"2",
          flowAction: "flowCommit"
        }
        this.inJsonData = flow
        axios.dealFlow(flow).then(({data}) => {
          this.outJsonData = data
          if (data.isSuccess) {
            this.$message.success(data.okMessage)
            this.disableCommit = true;
          } else {
            this.$message.error(data.errorMessage)
          }
          this.loading = false;
        }).catch((data)=>{
          this.loading = false;
          this.$message.error("访问后台错误")
        });

      },
      onCellChange(key, dataIndex, value) {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.dataSource = dataSource;
        }
      },
      onDelete(key) {
        const dataSource = [...this.dataSource];
        this.dataSource = dataSource.filter(item => item.key !== key);
      },
      handleAdd() {
        const {count, dataSource} = this;
        const newData = {
          key: count,
          name: `Edward King ${count}`,
          age: 32,
          address: `London, Park Lane no. ${count}`,
        };
        this.dataSource = [...dataSource, newData];
        this.count = count + 1;
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
