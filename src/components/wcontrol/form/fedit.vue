<template>

  <div>


    <div ref="formfield" class="el-form-item">
      <label :for="name" class="el-form-item__label" style="width: 100px;">{{label}}</label>
      <div class="el-form-item__content" style="margin-left: 100px;">
        <div data-v-62e717a4="" class="el-input">
          <el-input v-model="value" :placeholder="inputHint" ref="field" @blur="blur()" :disabled="disabled"></el-input>
        </div>
        <div class="el-form-item__error">
          {{fieldMessage}}
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  import Vue from 'vue'

  export default {
    name: "fedit",

    props:
      {
        value0: String,
        prop: null,
        label: null,
        table: null,
        field: null,
        name: null,
        inputHint: String,
      },
    model: {
      prop: 'value0',
      event: "valueChange"
    },
    data() {
      return {

        value: "",
        initValue: "",
        type: "data",
        disabled:false,
        required:false,
        parentFormData: {},
        fieldMessage: "",
        fldClass: "el-form-item",
        rule: [
          {required: true, message: '请输入您的名称', trigger: 'blur'},
          {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}
        ],
      }

    },

    methods:
      {
        focus() {
          this.$refs.field.focus();
        },
        blur() {
          new Error('请输入密码');
          this.fieldCheck();
        },
        reset() {
          this.value = this.initValue;
        },
        getFieldValue()
        {
          return this.value;
        },
        setFieldValue(value)
        {
          this.value = value;
        },


        setProperty(prop)
        {
            this.disabled= false;
            this.required = false;
            if(prop=="P")  this.disabled= true;
            if(prop=="M")  this.required = true;
        },
        getRule() {
          let aa = []
          let r1 = {required: true, message: '请输入您的名称', trigger: 'blur'}
          let r2 = {min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur'}


          return aa;
        },
        setFldStyle() {

          if (this.required)
            this.$refs.formfield.className = this.fldClass + " is-required";
          else
            this.$refs.formfield.className = this.fldClass;
        },
        fieldCheck()
        {
          this.setFldStyle();
            if(this.value=="ok")
              this.fieldMessage = ""
          else
              this.fieldMessage = "输入值有误"
        }

      },
    watch:
      {
        value(newVal, oldVal) {
          this.parentFormData[this.name] = newVal
          this.$emit("valueChange", newVal)
        },
        value0(newVal, oldVal) {
          this.value = newVal;
        },
        parentFormData()
        {
          this.value = this.parentFormData[name];
        }
      }
  }
</script>

<style scoped>

</style>
