// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  /*判断用户是否登录*/
  if(window.localStorage.getItem('token')){
    to.meta.pageChangeState = window.pageChangeState
    document.title = !!to.meta.title ? to.meta.title : ''//即将进入页面的标题
    router.isShowNavbar = to.meta.isShowNavbar
    next()
  }else{
    //防止死循环
    if(to.path=='/login'){
      next()
    }else{
      next('/login')
    }
  }
})
router.afterEach((to,from,next)=>{
  //window.scrollTo(0,0);
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
