import axios from '@/utils/axios.js'

const state = {
  count: 0,
}

const mutations = {
  DOTASK: (state, data) => {

    state.token = data;
    window.sessionStorage.setItem('token', data);

  }

};
const getters =
  {

  };

const actions = {
  doSetting({commit}, para) {


    console.debug("setting para:" + para);
    return new Promise((resolve, reject) => {

      axios.doSetting(para).then(({data}) => {
        console.debug(data);

        if (data.isSuccess) {
          resolve(data);
        } else {
          console.log("do setting error：" + listname);
          //reject(data);
        }

      }).catch(()=>{
        reject(data);
      })
    })
  },

  doTask({commit}, para) {
    // commit(TASK.DOTASK, data);

    console.debug("task para:" + para);
    return new Promise((resolve, reject) => {

      axios.doTask(para).then(({data}) => {
        console.debug(data);

        if (data.isSuccess) {
          resolve(data);
        } else {
          console.log("doTask error：" + para.taskName);
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
