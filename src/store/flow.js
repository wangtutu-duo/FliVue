import axios from '@/utils/axios.js'

const state = {
  count: 0,
}
const getters = {};

const mutations = {};

const actions = {
  flowBegin: (context, flow) => {
    return new Promise((resolve, reject) => {

      axios.flowBegin(flow).then(({data}) => {
        if (data.isSuccess)
        {
          resolve(data);

        } else {
          reject("error");
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
