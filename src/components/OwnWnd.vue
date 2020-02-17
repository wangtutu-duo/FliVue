<template>
  <el-container v-bind:id="id"
                v-if="dialogVisible">
    <el-header>
      <div @mousedown="mousedown" style="position: absolute;top: 0px; right: 20px;">
        <h2 v-html="title"></h2>
        <div @click.stop="closeDialog()" >
        <span>
          <svg class="icon" aria-hidden="false">
            <use xlink:href='#el-icon-ext-close'></use>
          </svg>
        </span>
        </div>
      </div>
    </el-header>
    <el-main>
      <slot>这里是内容</slot>
    </el-main>
    <el-footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="closeDialog">确 定</el-button>
      </span>
    </el-footer>
  </el-container>
</template>

<script>
import store from '../store/index'
  export default {
    name: 'OwnWnd',
    props: {
      titlex: String,
      id: [String, Number]
    },
    data() {
      return {
        title: '标题',
        selectElement: ''
      }
    },
    computed: {
      dialogVisible: {
        get: function () {
          console.debug(88888888);

          console.debug(this.$store.state.wins.dialogVisible);
          return this.$store.state.wins.dialogVisible
        },
        set: function (newValue) {
          this.$store.commit('newDialogVisible', newValue)
        }
      }
    },
    methods: {
      closeDialog(e) {
        this.dialogVisible = false
        // alert(this.dialogVisible)
        this.$store.commit('newDialogVisible', false)
      },
      mousedown(event) {
        this.selectElement = document.getElementById(this.id)
        var div1 = this.selectElement
        //this.selectElement.style.cursor = 'move'
        this.isDowm = true
        var distanceX = event.clientX - this.selectElement.offsetLeft
        var distanceY = event.clientY - this.selectElement.offsetTop
        // alert(distanceX)
        // alert(distanceY)
        console.log(distanceX)
        console.log(distanceY)
        document.onmousemove = function (ev) {
          var oevent = ev || event
          div1.style.left = oevent.clientX - distanceX + 'px'
          div1.style.top = oevent.clientY - distanceY + 'px'
        }
        document.onmouseup = function () {
          document.onmousemove = null
          document.onmouseup = null
          div1.style.cursor = 'default'
        }
      }
    }
  }
</script>

<style scoped>
  .el-container {
    position: absolute;
    height: 500px;
    width: 500px;
    border: 1px;
    top: 20%;
    left: 35%;
    border-radius: 2px;
  }

  .dialog-footer {
    text-align: right;
  }

  .el-main {
    background-color: rgb(113, 79, 79);
  }

  .el-footer {
    background-color: rgb(39, 5, 5);
  }

  .el-header {
    background-color: rgb(39, 34, 34);
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
