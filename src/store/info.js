import store from "./index";
import axios from '@/utils/axios.js'

const state = {
  sysInfo: {},
  listInfo: {},
  menuItemInfo: {},
  settingInfo: {},
  taskInfo: {},
  tableInfo:{},
  cacheFlag: []
}


const mutations = {
  cleanAllPara: (state) => {
    console.debug("clean all para")
    state.cacheFlag = [];

  },
  setListCommit: (state, data) => {
    state.listInfo = data;
    state.cacheFlag["LIST"] = true;
  },
  setFolderCommit: (state, data) => {
    state.menuItemInfo = data;
    state.cacheFlag["MENU"] = true;
  },
  setTableCommit: (state, data) => {
    state.tableInfo = data;
    state.cacheFlag["TABLE"] = true;
  },
  setSettingCommit: (state, data) => {
    state.settingInfo = data;
    state.cacheFlag["SETTING"] = true;
  },
  setTaskCommit: (state, data) => {
    state.taskInfo = data;
    state.cacheFlag["TASK"] = true;
  },
};

const getters = {
  getList: (state) => (list) => {

    return state.listInfo[list.listName];

  },
  getTaskInfo: (state) => (taskId) => {
    return state.taskInfo[taskId];

  },
  getSetting: (state) => (setting) => {

    return state.listInfo[setting.settingName];

  },
  getTableInfo: (state) => (tableName) => {
    console.debug("getTable:",tableName)
    return state.tableInfo[tableName];

  },
  getItemType: (state) => (itemId) => {
    return state.menuItemInfo.items[itemId].type;

  },
  getItemInfo: (state) => (itemId) => {
    return state.menuItemInfo.items[itemId];
  },
  getFolder: (state) => (folder) => {
    if (state.menuItemInfo.folder[folder.folderId]) return state.menuItemInfo.folder[folder.folderId];
    return null;
  },

};

const actions = {

  getListAct: (context, list) => {
    list["taskType"] = "getlist";

    return new Promise((resolve, reject) => {
      if (state.cacheFlag["LIST"]) {
        if (context.state.listInfo[list.listName] != null) {
          resolve(context.state.listInfo[list.listName]);
          return;
        }
      }
      axios.getDataList(list).then(({data}) => {
        if (data.isSuccess)
          context.commit("setListCommit", data.lists);

        if (context.state.listInfo[list.listName] != null) {
          resolve(context.state.listInfo[list.listName]);
          return;
        } else {
          console.log("getList error：" + list.listName);
          //reject(data);
        }
      })
    })
  },
  getFlowAct: (context, flow) => {
    return new Promise((resolve, reject) => {

      axios.getPara(flow).then(({data}) => {
        if (data.isSuccess)
        {
          resolve(data);
          return;
        } else {
          console.log("getFlow error：" + flow.flowName);
          reject(data);
        }
      })
    })
  },
  saveFlowAct: (context, flow) => {
    return new Promise((resolve, reject) => {

      axios.savePara(flow).then(({data}) => {
        if (data.isSuccess)
        {
          resolve(data);
          return;
        } else {
          console.log("saveFlow error：" + flow.flowName);
          reject(data);
        }
      })
    })
  },


  getFolderInfoAct: (context, folder) => {
    console.debug("actions:" + folder.folderId);
    //let reqData ={taskType:"getlist", listName:listname}


    return new Promise((resolve, reject) => {
      if (state.cacheFlag["MENU"]) {
        if (context.state.menuItemInfo["folder"] != null) {
          if (context.state.menuItemInfo.folder[folder.folderId] != null) {
            resolve(context.state.menuItemInfo.folder[folder.folderId]);
            return;
          }
        }
      }
      axios.getPara(folder).then(({data}) => {
        if (data.isSuccess)
          context.commit("setFolderCommit", data.info);
        console.log("getFolder error：" + folder.folderId);
        if (context.state.menuItemInfo.folder[folder.folderId] != null) {
          resolve(context.state.menuItemInfo.folder[folder.folderId]);
          return;
        } else {
          console.log("getFolder error：" + folder.folderId);
          //reject(data);
        }
      })
    })
  },


  getSettingInfoAct: (context, setting) => {
    console.debug("getSettingInfoAct:" + setting.settingName);

    return new Promise((resolve, reject) => {
      if (state.cacheFlag["SETTING"]) {
        if (context.state.settingInfo[setting.settingName] != null) {
          if (context.state.settingInfo[setting.settingName] != null) {
            resolve(context.state.settingInfo[setting.settingName]);
            return;
          }
        }
      }
      axios.getPara(setting).then(({data}) => {
        if (data.isSuccess)
          context.commit("setSettingCommit", data.info);
        console.log("getSetting error：" + setting.settingName);
        if (context.state.settingInfo[setting.settingName] != null) {
          resolve(context.state.settingInfo[setting.settingName]);
          return;
        } else {
          console.log("getSetting error：" + setting.settingName);
          //reject(data);
        }
      })
    })
  },

  getTableInfoAct: (context, table) => {
    console.debug("getTableInfoAct:" + table.tableName);

    return new Promise((resolve, reject) => {
      if (state.cacheFlag["TABLE"]) {
        if (context.state.tableInfo[table.tableName] != null) {
          if (context.state.tableInfo[table.tableName] != null) {
            resolve(context.state.tableInfo[table.tableName]);
            return;
          }
        }
      }
      axios.getPara(table).then(({data}) => {
        if (data.isSuccess)
          context.commit("setTableCommit", data.info);

        if (context.state.tableInfo[table.tableName]!= null) {
          resolve(context.state.tableInfo[table.tableName]);
          return;
        } else {
          console.log("table error：" + table.tableName);
          //reject(data);
        }
      })
    })
  },
  getTaskInfoAct: (context, task) => {
    console.debug("actions:" + task.taskId);
    //let reqData ={taskType:"getlist", listName:listname}


    return new Promise((resolve, reject) => {
      if (state.cacheFlag["TASK"]) {
        if (context.state.taskInfo[task.taskId] != null) {
          resolve(context.state.taskInfo[task.taskId]);
          return;
        }
      }
      if (context.state.menuItemInfo["folder"] != null && context.state.menuItemInfo.folder[task.taskId] != null) {
        resolve(context.state.menuItemInfo.folder[task.taskId]);
        return;
      }

      axios.getPara(task).then(({data}) => {
        if (data.isSuccess)
          context.commit("setTaskCommit", data.info);

        if (context.state.taskInfo[task.taskId] != null) {
          resolve(context.state.taskInfo[task.taskId]);
          return;
        } else {
          console.log("task error：" + task.taskId);
          //reject(data);
        }
      })
    })
  },
};


export default {
  namespaced: true,   //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
  state,
  getters,
  actions,
  mutations
}
