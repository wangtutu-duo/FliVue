<template>
<div class="taskbar">
    <div class="start-btn"></div>
    <div class="search-bar">
        <div class="search-icon"></div>
        <div class="search-text"><span>taskbar</span></div>
    </div>
    <div class="search-btn"></div>

    <div class="task-view"></div>
    <div class="task-grid">
        <div class="task"
             :id = "'taskbaritem' + process.processId"
            :task-process-id="process.processId"
            :class="{
                'task-opened': process.hasOwnProperty('processId'),
                'focused':process.focused
            }"
            v-for="(process) in getSortedAllTaskList"
            :key="process.processId"
            @click="tryOpen(process)"
            @mouseover.once=" ;"
        >

        <img width="20"
            :src="iconImages(process.icon)"
            style="position:absolute; top:0; left:0; right:0; bottom:0; width:24px; height:24px; margin:auto;"
        />
          <div><span>{{process.title}} </span></div>

        <hr>
        </div>
    </div>

    <div class="task-bar-drag" @mousedown="dragStart" @touchstart="dragStart">

    </div>
    <el-button @click="cleanCache()">清除缓存</el-button>
    <div class="clock-area">
        <div v-text="currentTime"></div>
        <div v-text="currentDay"></div>
        <div v-text="currentDate"></div>
    </div>
    <div class="notify-btn"></div>
    <div class="show-desktop"></div>
    <div class="taskbar-color"></div>
    <!-- <div style="min-width:200px; max-width: 700px; width:100%; height: 700px; background: red;position: absolute; bottom:40px;background-color:#000000; opacity: 0.84;"></div> -->

</div>
</template>

<script>
export default {
    props:
      {
        length:null,
      },
    data () {
        return {
            isDrag : false,
            currentTime : '',
            currentDay  : '',
            currentDate : '',

        }
    },
    mounted : function() {
        setInterval(this.updateDateTime, 1000);
        window.addEventListener('mouseup', this.dragEnd);
        window.addEventListener('mousemove', this.drag);
        window.addEventListener('touchend', this.dragEnd);
        window.addEventListener('touchmove', this.drag);

    },
    beforeDestroy: function() {
        window.removeEventListener('mouseup', this.dragEnd);
        window.removeEventListener('mousemove', this.drag);
        window.removeEventListener('touchend', this.dragEnd);
        window.removeEventListener('touchmove', this.drag);

    },
    methods : {
        cleanCache:function(){
          this.$store.commit('info/cleanAllPara')
        },
        dragStart: function() {
            this.isDrag = true;
        },
        drag : function (e) {
            if(this.isDrag){
                if (event.clientX != 0 && event.clientY != 0) {
                    let clientX = (e.clientX) ? e.clientX : e.touches[0].clientX;
                    let clientY = (e.clientY) ? e.clientY : e.touches[0].clientY;
                    this.$store.commit('wins/setTaskbarDirection', {
                        direction: this.getCardinalDirection(clientX, clientY)
                    });
                }
            }
        },
        dragEnd: function() {
            this.isDrag = false;
        },
        updateDateTime () {
            let nowDate     = new Date();
            let hour        = nowDate.getHours();
            let minute      = nowDate.getMinutes();
            let month       = nowDate.getMonth() + 1;
            let date        = nowDate.getDate();
            let week        = ['一', '二', '三', '四', '五', '六', '日'];
            let currentTime = '';

            if ( hour < 12 ) {
                currentTime = '上午';
            } else {
                currentTime = '下午';
                hour -= 12;
            }

            if ( minute < 10 ) {
                minute = '0' + minute;
            }

            currentTime += (hour ? hour : 12) + ":" + minute;
            if ( month < 10 ) month = '0' + month;
            if ( date < 10 )  date  = '0' + date;

            this.currentTime = currentTime;
            this.currentDate = nowDate.getFullYear()+'-'+month+'-'+date;
            this.currentDay  = '周 ' +  week[nowDate.getDay()] ;
        },

        getCardinalDirection : function (posX, posY) {
            let y1 = (this.getScreenHeight / this.getScreenWidth) * posX;                          // y = ax    graph[ / ]
            let y2 = - (this.getScreenHeight / this.getScreenWidth) * posX + this.getScreenHeight; // y = -ax+b graph[ \ ]
            let direction = 0;
            if (y1 > posY)         // y > ax     graph[ */  ]
                direction += 1100;
            else                   // y <= ax    graph[  /* ]
                direction += 11;
            if (y2 > posY)         // y > -ax+b  graph[  \* ]
                direction += 1001;
            else                   // y <= -ax+b graph[ *\  ]
                direction += 110;
            if (direction) {
                return {
                    2101: 'top',
                    1210: 'right',
                    121 : 'bottom',
                    1012: 'left'
                }[direction]
            }
        },
        tryOpen: function(app) {
          console.debug(app)
            if (app.hasOwnProperty('processId')) {
                if (app.minimized) {
                    this.$store.commit('wins/unMinimize', app.processId)
                } else {
                    let maxZValue = Math.max.apply(Math, this.$store.state.wins.appList.map(
                        process => process.zIndex
                    ))
                    if (app.zIndex == maxZValue) {
                        this.$store.commit('wins/minimize', app.processId)
                    } else {
                        this.$store.commit('wins/setFocus', {processId:app.processId, focused: true})
                    }
                }
            // eslint-disable-next-line
            } else {

            }
        },
        iconImages: require.context('../../assets/', true, /\.png$/)

    },
    computed: {
        getScreenWidth() {

            let w = this.$store.getter["wins/getScreenWidth"];
             console.debug('wwwwwww' + w);
            return this.$store.getter["wins/getScreenWidth"];
        },
        getScreenHeight() {
          console.debug('hhhhhhhhhh：');

          let h = this.$store.state.wins.screenHeight;
          console.debug('hhhhh：' + h);
          return this.$store.getter["wins/getScreenHeight"];
        },
        getSortedAllTaskList() {
            console.debug("get getSortedAllTaskList")
            let o = Object.values(this.$store.state.wins.appList);

            console.log(o);
            o.sort(function(a,b){
                return a.processId - b.processId
            })

            return o;
        }
    }
}
</script>

<style>
    .task-bottom {
        flex-direction: column;
    }
    .task-top {
        flex-direction: column-reverse;
    }
    .task-left {
        flex-direction: row-reverse;
    }
    .task-right {
        flex-direction: row;
    }
</style>

<style scoped>
    @keyframes button_out {
        0% { background-color: rgba(255,255,255,0.1);}
        100% {background-color: rgba(0,0,0,0);}
    }
    @keyframes button_in {
        0% { background-color: rgba(255,255,255,0.1);}
        100% { background-color: rgba(255,255,255,0.1);}
    }
    .taskbar {
        z-index: 2147483647;
        flex:none;
        color:white;
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 50px;
        display: flex;
    }
    .start-btn {
        flex:none;
        background-image: url('../../assets/images/taskbar/start_op0.png');
        background-position: center center;
        background-repeat: no-repeat;
        animation: button_out .2s;
    }
    .start-btn:hover {
        background-color: rgba(255,255,255,0.1);
        background-image: url('../../assets/images/taskbar/start_op0_hover.png');
    }
    .search-bar {
        border-top:1px solid rgb(187,187,187);
        border-bottom:1px solid rgba(0,0,0,0);
        background-color: rgb(242,242,242);
        height: 100%;
        width: 344px;
        box-sizing:border-box;
        color: rgb(43,43,43);
        font-size: 15px;
        flex:none;
        letter-spacing: 0.005em;
    }
    .search-icon {
        width:40px;
        height:100%;
        float:left;
        background-image: url('../../assets/images/taskbar/search.png');
        background-position: center center;
        background-repeat: no-repeat;
    }
    .search-text {
        width:304px;
        height:100%;
        display:flex;
        float:left;
        justify-content:center;
        flex-direction: column;
    }
    .search-bar:hover {
        background-color: rgb(255,255,255);
        cursor: text;
    }
    .search-btn {
        flex:none;
        background-image: url('../../assets/images/taskbar/search_w.png');
        background-position: center center;
        background-repeat: no-repeat;
        animation: button_out .2s;
    }
    .search-btn:hover {
        background-color: rgba(255,255,255,0.1);
    }
    .task-view {
        flex:none;
        animation: button_out .2s;
        background-image: url('../../assets/images/taskbar/timeline.png');
        background-position: center center;
        background-repeat: no-repeat;
    }
    .task-view:hover {
        background-color: rgba(255,255,255,0.1);
        background-image: url('../../assets/images/taskbar/timeline_hover.png');
        background-position: center center;
        background-repeat: no-repeat;
    }
    .task-grid {
        display:flex;
        flex-wrap: wrap;
        flex-direction: inherit;
        flex: none;
        overflow: auto;
    }
    .task {
        position: relative;
        text-align:center;
        flex:none;
        animation: button_out .2s;
    }
    .task:hover {
        background-color: rgba(255,255,255,0.1);
    }
    .task.focused {
        background-color: rgba(255,255,255,0.2);
    }
    .task.focused:hover {
        background-color: rgba(255,255,255,0.28);
    }

    .task hr {
        display: none;
    }
    .task-opened hr {
        position: absolute;
        display: block;
        background-color: #adacf0;
    }
    .task-bar-drag {
        height: 100%;
        width: 100%;
        min-width: 9px;
        flex-basis: auto;
        flex-grow: 0;
        flex-shrink: 1;
    }
    .notify-btn {
        flex:none;
        animation: button_out .2s;
        background-image: url('../../assets/images/taskbar/notify.png');
        background-position: center center;
        background-repeat: no-repeat;
    }
    .notify-btn:hover {
        background-color: rgba(255,255,255,0.1);
    }
    .clock-area {
        flex:none;
        animation: button_out .2s;
    }
    .clock-area div {
        /* font-size:0.788em; */
        font-size:0.8em;

        color:#dddddd;
        text-align:center;
    }
    .clock-area:hover {
        background-color: rgba(255,255,255,0.1);
    }
    .show-desktop{
        flex:none;
        animation: button_out .2s;
    }
    .show-desktop:hover {
        background-color: rgba(255,255,255,0.1);
    }
    .taskbar-color {
        width:100%;
        height:100%;
        position:absolute;
        top: 0;
        left: 0;
        z-index:-2;
        background-color:#000000;
        opacity: 0.84;
    }
    .task-bottom .taskbar {
        height: 40px;
        width: 100vw;
        flex-direction : row;
    }
    .task-bottom .start-btn{
        height: 100%;
        width: 48px;
    }
    .task-bottom .search-btn {
        width: 0;
    }
    .task-bottom .task{
        height: 40px;
        width: 48px;
        margin-left: 1px;
    }
    .task-bottom .task-opened hr{
        height: 2px;
        left:8.335%;
        bottom: 0;
        width: 83.33%;
    }
    .task-bottom .task:hover hr {
        width: 100%;
        left: 0;
    }
    .task-bottom .focused hr {
        width: 100%;
        left: 0;
    }

    .task-bottom .task-view{
        height: 100%;
        width: 48px;
        margin-right: 2px;
    }
    .task-bottom .notify-btn{
        height: 100%;
        width: 40px;
    }
    .task-bottom .clock-area {
        height: 100%;
        width: 80px;
        padding-top:1px;
        box-sizing:border-box;
        line-height: 18px;
    }
    .task-bottom .clock-area div:nth-of-type(2) {
        display: none;
    }
    .task-bottom .show-desktop{
        height: 100%;
        width: 4px;
        border-left: 1px solid #8a8a8a;
        margin-left: 8px;
    }
    .task-top .taskbar {
        height: 40px;
        width: 100vw;
        top: 0;
        flex-direction : row;
    }
    .task-top .start-btn{
        height: 100%;
        width: 48px;
    }
    .task-top .search-btn {
        display: block;
        height: 100%;
        width: 48px;
    }
    .task-top .search-bar {
        display: none;
    }
    .task-top .task{
        height: 40px;
        width: 48px;
        margin-left: 1px;
    }
    .task-top .task-opened hr{
        height: 2px;
        left:8.335%;
        top: 0;
        width: 83.33%;
    }
    .task-top .task:hover hr {
        width: 100%;
        left: 0;
    }
    .task-top .focused hr {
        width: 100%;
        left: 0;
    }
    .task-top .task-view{
        height: 100%;
        width: 48px;
        margin-right: 2px;
    }
    .task-top .notify-btn{
        height: 100%;
        width: 40px;
    }
    .task-top .clock-area {
        height: 100%;
        width: 80px;
        padding-top:1px;
        box-sizing:border-box;
        line-height: 18px;
    }
    .task-top .clock-area div:nth-of-type(2) {
        display: none;
    }
    .task-top .show-desktop{
        height: 100%;
        width: 4px;
        border-left: 1px solid #8a8a8a;
        margin-left: 8px;
    }
    .task-left .taskbar {
        height: 100vh;
        width: 66px;
        min-width: 62px;
        left: 0;
        flex-direction : column;
    }
    .task-left .start-btn{
        height: 40px;
        width: 100%;
    }
    .task-left .search-btn {
        display: block;
        height: 40px;
        width: 100%;
    }
    .task-left .search-bar {
        display: none;
    }
    .task-left .task{
        height: 46px;
        width: 100%;
        margin-top: 1px;
    }
    .task-left .task-opened hr{
        width: 2px;
        left:0;
        top: 8.335%;
        height: 83.33%;
    }
    .task-left .task:hover hr {
        top: 0;
        height: 100%;
    }
    .task-left .focused hr {
        top: 0;
        height: 100%;
    }
    .task-left .task-view{
        height: 40px;
        width: 100%;
        margin-bottom:2px;
    }
    .task-left .notify-btn{
        height: 32px;
        width: 100%;
        margin: 0 auto;
    }
    .task-left .clock-area{
        height: 51px;
        width: 100%;
        margin: 11px 0;
    }
    .task-left .show-desktop{
        height: 4px;
        width: 100%;
        border-top: 1px solid #8a8a8a;
        margin-top: 8px;
    }
    .task-right .taskbar {
        height: 100vh;
        width: 66px;
        min-width: 62px;
        right: 0;
        flex-direction : column;
    }
    .task-right .start-btn{
        height: 40px;
        width: 100%;
    }
    .task-right .search-btn {
        display: block;
        height: 40px;
        width: 100%;
    }
    .task-right .search-bar {
        display: none;
    }
    .task-right .task{
        height: 46px;
        width: 100%;
        margin-top: 1px;
    }
    .task-right .task-opened hr{
        width: 2px;
        right:0;
        top: 8.335%;
        height: 83.33%;
    }
    .task-right .task:hover hr {
        top: 0;
        height: 100%;
    }
    .task-right .focused hr {
        top: 0;
        height: 100%;
    }
    .task-right .task-view{
        height: 40px;
        width: 100%;
        margin-bottom:2px;
    }
    .task-right .notify-btn{
        height: 32px;
        width: 100%;
        margin: 0 auto;
    }
    .task-right .clock-area{
        height: 51px;
        width: 100%;
        margin: 11px 0;
    }
    .task-right .show-desktop{
        height: 4px;
        width: 100%;
        border-top: 1px solid #8a8a8a;
        margin-top: 8px;
    }
</style>
