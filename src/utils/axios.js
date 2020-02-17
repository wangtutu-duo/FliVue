import axios from 'axios'
import store from '@/store'
import router from '@/router'

//创建axios实例
var instance = axios.create({
  timeout: 5000, //请求超过5秒即超时返回错误
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
});


//request拦截器
instance.interceptors.request.use(

  config => {
    console.log("instance.interceptors.request.use here");
    //判断是否存在token，如果存在的话，则每个http header都加上token
    if (store.state.token) {
      config.headers.Authorization = `token ${store.state.token}`;
    }
    return config;
  }
);

//respone拦截器
instance.interceptors.response.use(

  response => {
    return response;
  },
  error => { //默认除了2XX之外的都是错误的，就会走这里
    console.log("instance.interceptors.response.use here");
    if (error.response) {
      switch (error.response.status) {
        case 401:
          store.dispatch('UserLogout'); //可能是token过期，清除它
          router.replace({ //跳转到登录页面
            path: 'login',
            query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
          });
      }
    }
    return Promise.reject(error.response);
  }
);

export default {
  //用户注册
  userRegister(data) {
    return axios.post('/rat/register', data);
  },
  //用户登录
  userLogin(data) {

    return axios.post('/rat/login', data);
  },
    //用户登录
    userLogout(data) {

      return axios.post('/rat/logout', data);
    },
  //获取用户
   getUser(data) {
    return instance.post('/rat/user', data);
   // return instance.post('/rat/user', data);
  },
  //删除用户
  delUser(data) {
    return instance.post('/rat/delUser', data);
  },
  doTask(para) {

    return axios.post('/rat/doTask', para);
  },
  doSetting(para) {

    return instance.post('/rat/doSetting', para);
  },

  doInquire(para) {
    return instance.post('/rat/doInquire', para);
  },
  getPara(data)
  {

    var ret = instance.post('/rat/getPara', data);
    return ret;
  },
  savePara(data)
  {

    var ret = instance.post('/rat/savePara', data);
    return ret;
  },
  getDataList(data)
  {

    var ret = instance.post('/rat/doList', data);
    return ret;
  },
  getInfo(data)
  {

    var ret = instance.post('/rat/getInfo', data);
    return ret;
  },



}
