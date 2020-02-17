<template>
  <div>
    <wform ref="forms" :rules="rules">

      <fedit name="xxx" label="上级机构xxx" ref="xxx"></fedit>
      <fedit name="xxx2" label="上级机构xxx2" ref="xxx2"></fedit>
      <el-row :gutter="20">

        <el-col :span="6">
          <fedit name="xxx3" label="上级机构xxx3" ref="xxx3"></fedit>
        </el-col>

      </el-row>

    </wform>
    <el-button type="primary" icon="el-icon-search" @click="getchilds()">取值</el-button>
    <el-button type="primary" icon="el-icon-search" @click="setchilds()">设值</el-button>
  </div>
</template>

<script>
  import fedit from "@/components/wcontrol/form/fedit";
  import wform from "@/components/wcontrol/form/wform";

  export default {
    name: "addUser",
    components: {wform, fedit},
    props:
      {
        itemId: String,
        compara: String,
      },
    data() {
      return {
        rules: {
          xxx: {},
          xxx2: {}
        },
      }

    },
    methods: {
      submitCheck() {
        console.log('submit!');
        return true;
      },
      getchilds() {
        this.$refs.forms.getFormData()

      },
      setchilds() {

        let data = {"xxx": "wwww", "xxx2": "wwww33"}
        this.$refs.forms.setFormData(data)

      }
    }
  }
</script>

<style scoped>

</style>


// WEBPACK FOOTER //
// addUser.vue
