window.pageChangeState = 'isForWard'
window.addEventListener("popstate", () => {
  window.pageChangeState = "isBack"
}, false);
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import PageTransition from '../PageTransition.vue'
Vue.use(Router)

const routes = [{
  path: '/',
  name: 'PageTransition',
  component: PageTransition,
  children: [
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        isShowNavbar: true
      },
      component: (resolve) => require(['../views/login.vue'], resolve)
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '没有找到页面',
        isShowNavbar: false
      },
      component: (resolve) => require(['../views/404.vue'], resolve)
    },
    {
      path: '/index',
      name: 'index',
      meta: {
        title: '首页',
        isShowNavbar: true
      },
      component: (resolve) => require(['../views/index.vue'], resolve)
    }
  ]
},
{
  path: '*',
  redirect:'/404'
}
]

export default new Router({
  routes,
  scrollBehavior(to, from, savedPosition) {
    // return 期望滚动到哪个的位置
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})
