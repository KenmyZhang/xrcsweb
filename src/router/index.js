
import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'
import store from "@/store"

Vue.use(VueRouter)


export const nomorlRoutes = {
  path: "/admin",
  component: Layout,
  children: [
    {
      path: "chat",
      component: () => import("../views/Chat/index.vue"),
      meta: {
        title: '消息',
        icon: 'chat'
      }
    },
    {
      path: "/admin",
      redirect: xxx => {
        const userInfo = sessionStorage.getItem('userInfo')
        if (userInfo) {
          const { role_id } = JSON.parse(userInfo)
          if (role_id == 'admin') return '/admin/customer'
        }
        return '/admin/chat'
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

const router = new VueRouter({ routes: constantRouters })


export default router