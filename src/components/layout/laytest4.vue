<template>
  <div>
    Mermaid
    graph TD
    A --> B
    A --> C
    B --> D
    C --> D
  </div>



</template>
<script>



  export default {
    methods:
      {
        path () {
          let steps = []
          this.valueArr.forEach((curr, index) => {
            if (index === 0) {
              // 移动到起点
              steps.push('M' + curr.x + ',' + curr.y)
            }
            if (index !== this.valueArr.length - 1) {
              let next = this.valueArr[index + 1]
              // 两个控制点坐标
              var ctrl1 = {
                x: (curr.x + next.x) * 0.5,
                y: curr.y
              }
              var ctrl2 = {
                x: ctrl1.x,
                y: next.y
              }
              steps.push('C' + ctrl1.x + ',' + ctrl1.y)
              steps.push(ctrl2.x + ',' + ctrl2.y)
              steps.push(next.x + ',' + next.y)
            }
          })
          return steps.join(' ')
        }
      },
    doAnimation () {
      animation.progress = 0
      new TWEEN.Tween(animation)
        .delay(1000)
        .to({progress: 1}, this.duration, TWEEN.Easing.Quadratic.Out)
        .onUpdate(this.onUpdate)
        .start()
    },
    onUpdate () {
      this.valueArr.forEach((item) => {
        item.y = item.startY + (item.targetY - item.startY) * this.animation.progress
      })
    }
  }

</script>
<style rel="stylesheet/scss" lang="scss">
  .login {
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }



  .el-tabs__item {
    text-align: center;
    width: 60px;
  }

</style>
