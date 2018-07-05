<template>
  <div id="app" ref="app">
    <transition :name="transitionName">
      <keep-alive>
        <router-view class="child-view"></router-view>
      </keep-alive>
    </transition>
    <!-- 更多样式参考 https://github.com/jkchao/vue-loading/blob/master/src/App.vue -->
    <vue-loading type="bars" color="#20A0FF" :size="{ width: '30px', height: '30px' }" v-show="showLoad" ></vue-loading>
    <tabbar v-show="isShow">
      <tabbar-item selected @on-item-click="url('index')">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item @on-item-click="url('login')">
        <span slot="label">登录</span>
      </tabbar-item>
      <tabbar-item badge="2">
        <span slot="label">News</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>

import Vue from 'vue'
import axios from 'axios'
import vueLoading from 'vue-loading-template'
import {
  mapActions
} from 'vuex'
Vue.use(vueLoading)
import { Tabbar, TabbarItem } from 'vux'
export default {
  name: 'app',
  components: {
    Tabbar,
    TabbarItem
  },
  data() {
    let _isShow = JSON.parse(sessionStorage.getItem("isShowNavbar"))
    return {
      transitionName: 'slide-left',
      showLoad:true,
      isShow:_isShow
    }
  },
  beforeRouteUpdate(to, from, next) {
    let state = window.pageChangeState
    this.isShow = !!this.$router.isShowNavbar
    sessionStorage.setItem("isShowNavbar", this.isShow)

    if (state === "isBack") {
      this.transitionName = 'slide-right'
    } else if (state === "") {
      this.transitionName = 'slide-left'
    } else {
      this.transitionName = 'slide-left'
    }
    window.pageChangeState = 'isForWard'
    next()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.isShow = !!to.meta.isShowNavbar
      sessionStorage.setItem("isShowNavbar", vm.isShow)
    })
  },
  methods: {
    ...mapActions(['LOGIN']),
    url:function(link){
        this.$router.push({
            name:link
        })
    }
  },
  mounted() {
    var $this=this
    /**
     * [instance 初始化axios对象]
     * @type {[type]}
     */
    let instance = axios.create({})

    instance.interceptors.request.use(function(requestConfig){
        $this.showLoad=true
        return requestConfig;
        },function(error){
        return Promise.reject(error);
    })

    instance.interceptors.response.use(function(response){
        $this.showLoad=false
        response.body = response.data
        if(response.data.code == 103){
            //退出
        }
        return response;
        },function(error){
        return Promise.reject(error);
    })

    Vue.prototype.$http = instance
    Vue.http = instance
    this.$refs['app'].style.minHeight = document.body.clientHeight+'px';

    this.LOGIN({username:'',password:''}).then((data) => {
        this.$router.push({
            name:'index'
        })
        if(data.code == 200){
            //Vue.http.defaults.headers.common['X-Token'] = data.data.userId+'#'+data.data.token; 登录存储token
            // this.$router.push({
            //     name: 'home_index'
            // });
        }else{
            
        }
    })
  },
  computed: {

  },
  watch:{

  }
}
</script>
<style>
#app .weui-tabbar{
    position: fixed;
}
.child-view {
  position: absolute;
  width: 100%;
  transition: all .3s cubic-bezier(.55, 0, .1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(50px, 0);
  transform: translate(50px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

</style>
