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
      path: '/index',
      name: 'index',
      meta: {
        title: '首页',
        isShowNavbar: true
      },
      component: (resolve) => require(['../views/index.vue'], resolve)
    }
  ]
}]

export default new Router({
  mode: 'history',
  routes
})
