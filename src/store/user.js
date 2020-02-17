import axios from '@/utils/axios.js'

const state = {
  token: window.sessionStorage.getItem('token'),
  username: '',
  orgid: '',
  orgname: '',
  logintime:'',

};

const getters = {};
const mutations = {
  LOGIN: (state, data) => {
      //更改token的值

      state.token = data.token;
      window.sessionStorage.setItem('token', data.token);
  },
  LOGOUT: (state) => {
      //登出的时候要清除token
      state.token = null;
      window.sessionStorage.removeItem('token');
  }
};

const actions = {

  actLOGIN: (context, indata)=>
  {
    console.debug(indata);
 return new Promise( (resolve,reject)=>{

 axios.userLogin(indata).then(( {data} ) =>
 {

     if(data.isSuccess)
        {
          context.commit("LOGIN", data);
          resolve(data);
        }
          else
          {
              console.log("login error");
              //reject(data);
          }

 })
 })},

 actLOGOUT: (context, indata)=>
  {
    console.debug(indata);
 return new Promise( (resolve,reject)=>{

 axios.userLogout(indata).then(( {data} ) =>
 {

     if(data.isSuccess)
        {
          context.commit("LOGOUT", data);
          resolve(data);
        }
          else
          {
              console.log("logout error");
              //reject(data);
          }

 })
 })},


};
export default {
namespaced: true,   //namespaced: true 的方式使其成为带命名空间的模块。保证在变量名一样的时候，添加一个父级名拼接。
state,
getters,
actions,
mutations
}
