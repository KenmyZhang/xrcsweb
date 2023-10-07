import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store'

import 'normalize.css/normalize.css'
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, { /* options */ });


Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(router)

// 全局自定义指令
Vue.directive('focus', {
  inserted(el, binding) {
    el.querySelector('textarea').focus()
  }
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    const userInfo = sessionStorage.getItem('userInfo')
    store.commit('setUserInfo', JSON.parse(userInfo))
  }
})
