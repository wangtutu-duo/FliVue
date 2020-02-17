import Vue from 'vue'
import Vuex from 'vuex'
import task from "./task.js"
import user from "./user.js"
import wins from "./wins.js"
import info from "./info.js"


Vue.use(Vuex);
export default new Vuex.Store({
  state:{
   

  },
  mutations: {},
  actions :{  },
  modules: {task,user,wins,info}
}
);
