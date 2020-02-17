// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import iView from 'iview'
import App from './App'
import router from './router'

//引入Element-UI
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/theme/element-css.scss'
import isOutside from './utils/isOutside'
import Selected from './utils/selected'
import Mermaid from 'mermaid'
import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'
import VueContextMenu from 'vue-contextmenu'

Vue.use(contentmenu)
Vue.use(Mermaid)

Vue.use(ElementUI);
Vue.use(isOutside)
Vue.use(Selected)
Vue.use(Antd)
Vue.use(VueContextMenu)


//引入store
import store from './store'

Vue.config.productionTip = false
// window.console = (function () {
//
//   var c = {};
//
//   c.log = c.warn = c.debug = c.info = c.error = c.time = c.dir = c.profile = c.clear = c.exception = c.trace = c.assert = function () { };
//
//   return c;
//
// })();


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
