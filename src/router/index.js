
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import store from "@/store"

Vue.use(VueRouter)


export const nomorlRoutes = {
  path: "/",
  component: Layout,
  children: [
    {
      path: "mobileImport",
      component: () => import("../views/MobileImport/index.vue"),
      meta: {
        title: '号码导入',
        icon: 'chat'
      }
    },
    {
      path: "importHistory",
      component: () => import("../views/ImportHistory/index.vue"),
      meta: {
        title: '号码导入记录',
        icon: 'chat'
      }
    },
    {
      path: "chat",
      component: () => import("../views/Chat/index.vue"),
      meta: {
        title: '聊天',
        icon: 'chat'
      }
    },
    {
      path: "task",
      component: () => import("../views/Task/index.vue"),
      meta: {
        title: '任务',
        icon: 'chat'
      }
    },
    {
      path: "sayHello",
      component: () => import("../views/SayHello/index.vue"),
      meta: {
        title: '打招呼',
        icon: 'chat'
      }
    },
    {
      path: "keyword",
      component: () => import("../views/Keyword/List.vue"),
      meta: {
        title: '关键词',
        icon: 'chat'
      }
    },
    {
      path: "/",
      redirect: xxx => {
        const userInfo = sessionStorage.getItem('userInfo')
        if (userInfo) {
          const { role_id } = JSON.parse(userInfo)
          if (role_id == 'admin') return '/customer'
        }
        return '/mobileImport'
      },
      meta: {
        hiddenMenu: true
      }
    },
  ]
}

const constantRouters = [
  {
    path: "/login",
    component: () => import("../views/Login/index.vue"),
  },
  {
    path: "/user",
    component: () => import("../views/User/index.vue"),
  },
  nomorlRoutes,
  {
    path: "/test",
    component: () => import("../views/Test.vue"),
  },
  {
    path: "/",
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: constantRouters,

})


export default router