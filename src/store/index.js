import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
Vue.use(Vuex)

// import { getTotalUnread } from '@/api/index'
export default new Vuex.Store({
  //定义数据，相当于data
  state: {
    totalUnReadMsg: 0,
    userInfo: {},
    mainRouteObj: {}, // menu的信息
  },
  //相当于vuex的计算属性
  getters: {
  },
  //里面定义方法，操作state方发（同步）
  mutations: {
    setToTalUnReadMsg(state, payload) {
      state.totalUnReadMsg = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setMainRouteObj(state, payload) {
      sessionStorage.setItem("mainRouteObj", JSON.stringify(payload));
      state.mainRouteObj = payload
    },
  },
  // 操作异步操作mutation（异步）
  actions: {
    async hanldeGetTotalUnread({ commit }, payload) {
      // const { unread_count, result, code } = await getTotalUnread();
      // if(result=='ok' && code ==200){
      //   commit('setToTalUnReadMsg', unread_count)
      // }else{
      //   console.error('请求获取总数失败');
      // }
    }
  },
  //模块化
  modules: {
  },
})
