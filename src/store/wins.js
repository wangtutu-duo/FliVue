import util from '@/utils/util'
import store from '../store/index'
import Vue from 'vue'
const state = {
  screenWidth: window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth,

screenHeight: window.innerHeight
  || document.documentElement.clientHeight
  || document.body.clientHeight,

  maxZIndexValue: 25,
  processCount: 0,
  taskbarDirection: 'bottom',
  appList: [

  ],



};

const getters = {

  getWndRatio: function(){
  let ratio = 0,
    screen = window.screen,
    ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  }
  else if (ua.indexOf('msie')) {
    if (screen.deviceXDPI && screen.logicalXDPI) {
      ratio = screen.deviceXDPI / screen.logicalXDPI;
    }
  }
  else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
    ratio = window.outerWidth / window.innerWidth;
  }

  if (ratio) {
    ratio = Math.round(ratio * 100);
  }
  return ratio;
},


  getScreenWidth: function (state) {
    return state.screenWidth
  },
  getScreenHeight: function (state) {
    return state.screenHeight
  },
  getZIndex: function (state) {
    return state.maxZIndexValue
  },
  getProcessCount: function (state) {
    return state.processCount
  },
  getTaskbarDirection: function (state) {
    return state.taskbarDirection
  },
  getWinInfo: (state) => (processId) => {
    let i = 0;
    let index = state.appList.findIndex(app => app.processId === processId)
    if(index>=0)
    {

      return state.appList[index];
    }
    return  null
  },
  getAppList: function (state) {
    console.debug("get applist");
    console.debug(state.appList)
    return state.appList
  }
};
const mutations = {

  screenRecalculation: function (state) {
    state.screenWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth

    state.screenHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight
},
incrementZIndex: function (state) {
    state.maxZIndexValue++
},
incrementProcessCount: function (state) {
    state.processCount++
},
setTaskbarDirection: function (state, payload) {
    state.taskbarDirection = payload.direction
},
setFocus: function (state, process) {

    Vue.set(
        state,
        'appList',
        state.appList.map(
            app => {
                if (app.processId === process.processId) {
                    if (process.focused) {
                        store.commit('wins/incrementZIndex')
                        let zValue = this.getters["wins/getZIndex"]
                        console.debug("focus zvalue:" + zValue)
                        return ({ ...app, focused: true, zIndex: zValue })
                    } else {
                        return ({ ...app, focused: false })
                    }
                } else {
                    if (process.focused) {
                        return ({ ...app, focused: !process.focused})
                    } else {
                        return ({ ...app})
                    }
                }
            }
        )
    )
},
  addWindow: function (state, item) {

    this.commit('wins/incrementProcessCount')

    store.commit('wins/incrementZIndex')
    let zValue = this.getters["wins/getZIndex"]
    let itemId = item.itemId;
    let itemInfo = store.getters["info/getItemInfo"](itemId)

    let processId = itemId
    if(itemInfo["winType"]!=null&&itemInfo["winType"]==2)
    {
      processId = itemId + this.getters["wins/getProcessCount"]
    }
    let index = state.appList.findIndex(app => app.processId === processId)
    if(index>=0)
    {
      store.commit('wins/setFocus', { processId: processId, focused: true})
      return
    }

    console.debug("winInfo:")
    console.debug(itemInfo)
    let process = {
      'processId': processId,
      'itemId': itemId,
      'taskPara':item.taskPara,
      'winType':itemInfo.type,
      'zIndex': zValue,
      'rect': itemInfo.rectWnd,
      'icon': itemInfo.icon,
      'title':itemInfo.desc,
      'focused': false,
      'minimized': false,

    }
    state.appList.push(process)
    store.commit('wins/setFocus', { processId: processId, focused: true})

  },
deleteApp: function (state, processId) {
    let index = state.appList.findIndex(app => app.processId === processId)
    Vue.delete(state.appList, index)

    //active window list
    let currentActive = state.appList.filter(
        app => !app.minimized
    )

    //maxZindex
    let nextFocusZIndex = Math.max.apply(Math, currentActive.map(
        process => process.zIndex
    ))

    //maxZindex's index
    index = currentActive.findIndex(app => app.zIndex === nextFocusZIndex)

    //to get maxZIndex's processId
    if (index != -1) {
        let focusTargetId = currentActive[index].processId || 0
        let nextFocusStatus = state.appList.map(
            app => {
                if (app.processId === focusTargetId) {
                    store.commit('wins/incrementZIndex')
                    let zValue = this.getters["wins/getZIndex"]
                    return ({ ...app, focused: true, zIndex: zValue })
                } else {
                    return ({ ...app, focused: false })
                }
            }
        )
        Vue.set(state,'appList',nextFocusStatus)
    }
},
minimize: function (state, processId) {
    //minimize
    let toMminimize = state.appList.map(
        app => {
            if (app.processId === processId) {
                return ({ ...app, minimized: true, focused: false })
            } else {
                return ({ ...app })
            }
        }
    )
    //active window list
    let currentActive = toMminimize.filter(
        app => !app.minimized
    )

    //maxZindex
    let nextFocusZIndex = Math.max.apply(Math, currentActive.map(
        process => process.zIndex
    ))

    //maxZindex's index
    let index = currentActive.findIndex(app => app.zIndex === nextFocusZIndex)
    //to get maxZIndex's processId
    if (index != -1) {
        let focusTargetId = currentActive[index].processId || 0
        toMminimize = toMminimize.map(
            app => {
                if (app.processId === focusTargetId) {
                    store.commit('wins/incrementZIndex')
                    let zValue = this.getters["wins/getZIndex"]
                    return ({ ...app, focused: true, zIndex: zValue })
                } else {
                    return ({ ...app, focused: false })
                }
            }
        )
    }

    //set next focus to maxZIndex's window
    Vue.set(
        state,
        'appList',
        toMminimize
    )
},
unMinimize: function (state, processId) {
  let tounMminimize = state.appList.map(
    app => {
      if (app.processId === processId) {
        store.commit('wins/incrementZIndex')
        let zValue = this.getters["wins/getZIndex"]
        return ({ ...app,minimized:false, focused: true, zIndex: zValue })
      } else {
        return ({ ...app, focused: false })
      }
    }
  )
  Vue.set(
    state,
    'appList',
    tounMminimize
  )
}

};

const actions = {

};
export default {
namespaced: true,   //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
state,
getters,
actions,
mutations
}
