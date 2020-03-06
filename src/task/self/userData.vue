<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">增加字段</a-button>
    <a-table :columns="columns"
             :pagination="pagination"
             size="small"
             :dataSource="dataSource" bordered>
      <template
        v-for="col in ['fldName', 'fldDesc', 'fldValue']"
        :slot="col"
        slot-scope="text, record, index"
      >
        <div :key="col">

          <a-input
            v-if="record.editable"
            style="margin: -1px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />

        </div>
      </template>
      <template slot="operation" slot-scope="text, record, index">
        <div class="editable-row-operations">

          <a-button @click="e => handleDelete(e.target.value, record.key, col)">删除</a-button>

        </div>
      </template>
    </a-table>
  </div>
</template>
<script>
  import EditableCell from '@/components/wcontrol/form/EditableCell.vue';
  import Wbutton from "../../components/wcontrol/wbutton";

  export default {
    name: "userData",
    components: {
      Wbutton,
      EditableCell,
    },
    data() {
      return {
        pagination:
          {
            total: 0,
            pageSize: 10,
            hideOnSinglePage: true
          },
        dataSource: [
          {
            key: '0',
            fldName: 'action',
            fldDesc: '操作',
            fldValue: 'accept',
            editable: true
          },
          {
            key: '1',
            fldName: 'orgId',
            fldDesc: '机构号',
            fldValue: '0001',
            editable: true
          },
          {
            key: '2',
            fldName: 'userId',
            fldDesc: '用户名',
            fldValue: '0001',
            editable: true
          },
          {
            key: '3',
            fldName: 'tranNo',
            fldDesc: '交易号',
            fldValue: 'tran0001',
            editable: true
          },
          {
            key: '4',
            fldName: 'tranNum',
            fldDesc: '交易数字',
            fldValue: '30',
            editable: true
          },
        ],
        count: 5,
        columns: [
          {

            title: '字段名称',
            dataIndex: 'fldName',
            width: '30%',
            scopedSlots: {customRender: 'fldName'},
          },
          {
            title: '字段描述',
            width: '30%',
            dataIndex: 'fldDesc',
            scopedSlots: {customRender: 'fldDesc'},
          },
          {
            title: '字段值',
            width: '30%',
            dataIndex: 'fldValue',
            scopedSlots: {customRender: 'fldValue'},
          },
          {
            width: '10%',
            title: '操作',
            dataIndex: 'operation',
            scopedSlots: {customRender: 'operation'},
          },
        ],
      };
    },
    methods: {
      handleChange(value, key, column) {
        const newData = [...this.dataSource];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target[column] = value;
          this.dataSource = newData;
        }
      },
      edit(key) {
        const newData = [...this.dataSource];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
          target.editable = true;
          this.dataSource = newData;
        }
      },
      handleDelete(value, key, column) {
        console.debug("删除" + key)
        const dataSource = [...this.dataSource];
        this.dataSource = dataSource.filter(item => item.key !== key);
      },
      onCellChange(key, dataIndex, value) {
        const dataSource = [...this.dataSource];
        const target = dataSource.find(item => item.key === key);
        if (target) {
          target[dataIndex] = value;
          this.dataSource = dataSource;
        }
      },

      handleAdd() {
        const {count, dataSource} = this;
        const newData = {
          key: `${count}`,
          fldName: `fld ${count}`,
          fldDesc: "请输入字段描述",
          fldValue: "",
          editable: true
        };
        this.dataSource = [...dataSource, newData];
        this.count = this.count + 1;
      },
    },
    watch:
      {
        dataSource(newVal, oldVal) {
          this.$emit('datachange', newVal);
        }
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
