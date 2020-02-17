<template>
  <div class="wform">
    <el-form ref="form" :model="formData" label-width="100px">
      <slot></slot>
    </el-form>
  </div>
</template>

<script>

  import wbutton from "@/components/wcontrol/wbutton";
  import store from '@/store/index'

  export default {
    name: "wform",
    components: {store, wbutton},

    props:
      {
        itemId: null,
        processId: null,
        taskPara: null,
        rules: null
      },
    data() {
      return {
        loading: false,
        taskType: "add",
        formData: {},
      }
    },
    created: function () {

      let taskInfo = this.$store.getters["info/getTaskInfo"](this.itemId)
      if (taskInfo) {
        let para = {taskName: this.itemId, taskData: this.taskPara, taskAction: "init"};

        store.dispatch("task/doTask", para).then((data) => {
            console.debug(data)
            this.setFormData(data, true)
            if (this.$parent.initForm) this.$parent.initForm();
            if (data.retMessage) {
              // this.$message({
              //   type: data.retType,
              //   message: data.retMessage
              // });
              this.$message.success(data.retMessage)
            }
            this.loading = false;
          }
        );

      }
    },

    mounted: function () {

      this.prepareFormFields()
    }
    ,

    methods:
      {
        prepareFormFields() {
          let fields = this.$refs.form.$children;

          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            let type = field.type
            if (type == "data") {
              this.prepareField(field);
            } else if (type == "button") {
              field.parentFormData = this.formData;
              field.parentForm = this;
            } else {
              this.prepareChildField(field);
            }
          }
        }
        ,
        prepareChildField(child) {
          let fields = child.$children;
          if (fields == null) return;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            let type = field.type
            if (type == "data") {

              this.prepareField(field);
            } else if (type == "button") {
              field.parentFormData = this.formData;
              field.parentForm = this;
            } else
              this.prepareChildField(field);
          }
        }
        ,
        prepareField(field) {
          if (field.name == null) return;
          field.parentFormData = this.formData;
          field.initValue = field.value0;
          if (this.taskType == "inquire")
            field.setProperty("P");
        }
        ,
        getFieldValue(field) {

          return this.formData[field];
        }
        ,
        setFieldValue(fieldName, value) {
          this.formData[fieldName] = value;

          let fields = this.$refs.form.$children;
          if (fields == null) return;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            if (field.type == "data") {
              if (field.name == fieldName) {

                field.value = value
                return;
              }

            } else
              this.setChildFieldValue(field, fieldName, value)
          }

        }
        ,
        setChildFieldValue(child, fieldName, value) {

          let fields = child.$children;
          if (fields == null) return;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            if (field.type == "data") {
              if (field.name == fieldName) {

                field.value0 = value
                return;
              }

            } else
              this.setChildFieldValue(field, fieldName, value)
          }

        }
        ,


        getFormData() {
          return this.formData;


          let fields = this.$refs.form.$children;
          if (fields == null) return this.formData;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            if (field.type == "data")
              this.formData[field.name] = field.value0
            else
              this.getChildData(field)
          }
          console.debug(this.formData)
          return this.formData;
        }
        ,
        getChildData(fields) {
          let children = fields.$children;
          if (children == null) return;
          for (let ii = 0; ii < children.length; ii++) {
            let field = children[ii]
            if (field.type == "data")
              this.formData[field.name] = field.value0
            else
              this.getChildData(field)
          }
        }
        ,
        setFormData(data, init) {
          let fields = this.$refs.form.$children;
          if (fields == null) return;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            let type = field.type
            if (type != "data")

              this.setChildData(field, data, init);
            else {
              if (data[field.name]) {
                field.value0 = data[field.name];
                if (init) field.initValue = field.value0;
                this.formData[field] = data[field.name]
              }
            }

          }
        }
        ,
        setChildData(fields, data, init) {
          let children = fields.$children;
          if (children == null) return;
          for (let ii = 0; ii < children.length; ii++) {
            let field = children[ii]
            if (field.type == "data") {
              if (data[field.name]) {
                field.value0 = data[field.name];
                if (init) field.initValue = field.value0;
                this.formData[field] = data[field.name]
              }
            } else
              this.setChildData(field)
          }
        }
        ,
        checkRules() {
          let ret0 = true;
          let fields = this.$refs.form.$children;
          if (fields == null) return true;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            let type = field.type
            if (type != "data") {
              let ret = this.checkChildRules(field);
              if (!ret) ret0 = false;
            } else {
              let ret = this.checkFieldRules(field);
              if (!ret) ret0 = false;
            }
          }
          return ret0;
        }
        ,
        checkChildRules(child,) {
          let fields = child.$children;
          if (fields == null) return true;
          let ret0 = true;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            let type = field.type
            if (type != "data") {
              let ret = this.checkChildRules(field);
              if (!ret) ret0 = false;
            } else {
              let ret = this.checkFieldRules(field);
              if (!ret) ret0 = false;

            }
          }
          return ret0;
        }
        ,


        checkFieldRules(field) {
          if (field.name == null) return true;
          console.debug("check field", field.name)
          let userFunction = this.rules[field.name];
          if (userFunction != null) {

            let ret = userFunction(field, field.value0)
            console.debug("check resule", ret)
            return ret;

          }

          return true
        }
        ,
        resetForm() {
          let fields = this.$refs.form.$children;
          if (fields == null) return;
          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            let type = field.type
            if (type == "data") {
              field.reset();
            } else

              this.resetChild(field);
          }
        }
        ,
        resetChild(child,) {
          let fields = child.$children;
          if (fields == null) return true;

          for (let ii = 0; ii < fields.length; ii++) {
            let field = fields[ii]
            let type = field.type
            if (type == "data") {
              field.reset();
            } else
              this.resetChild(field);
          }
        }
        ,
        submitForm() {
          let bCheck = true
          this.loading = true;
          bCheck = this.checkRules();

          if (!bCheck) {
            this.loading = false;
            return;
          }
          let taskdata = this.getFormData();
          let para = {taskName: this.itemId, taskData: taskdata, taskAction: "submit"};

          store.dispatch("task/doTask", para).then((data) => {
            console.debug(data)
            if (data.retMessage) {
              // this.$message({
              //   type: data.retType,
              //   message: data.retMessage
              // });
              this.$message.success(data.retMessage)
            }
            this.loading = false;
          });


        }
        ,
        cancelForm() {
          let bCheck = true
          this.loading = true;

          let taskdata = this.getFormData();
          let para = {taskName: this.itemId, taskData: taskdata, taskAction: "cancel"};

          store.dispatch("task/doTask", para).then((data) => {
            console.debug(data)

            this.$store.commit('wins/deleteApp', this.processId)
            this.loading = false;
          });

        }
      }
    ,
    watch:
      {}
  }

</script>

<style scoped>

</style>
