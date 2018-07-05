<template>
  <div id="app" ref="app">
    <transition :name="transitionName">
      <keep-alive>
        <!-- 如果不给显示的页面设置最小的高度，从前一个很长的页面到下一个页面也是很长，即使内容很少 -->
        <router-view class="child-view" :style="styles" :class="{paddingBottom:isShow}"></router-view>
      </keep-alive>
    </transition>
    <!-- 更多样式参考 https://github.com/jkchao/vue-loading/blob/master/src/App.vue -->
    <vue-loading type="bars" color="#20A0FF" :size="{ width: '30px', height: '30px' }" v-show="showLoad" ></vue-loading>
    <!-- VUX底部固定菜单，默认是absolute，手动修改成fixed -->
    <tabbar v-show="isShow">
      <tabbar-item selected @on-item-click="link('index')">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item show-dot>
        <span slot="label">Message</span>
      </tabbar-item>
      <tabbar-item @on-item-click="link('login')">
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
    link:function(url){
        this.$router.push({
            name:url
        })
    }
  },
  mounted() {
    this.$refs['app'].style.minHeight = document.body.clientHeight+'px'
    var $this=this

    /**
     * [instance 初始化axios对象]
     */
    let instance = axios.create({})

    /**
     * [axios请求前]
     */
    instance.interceptors.request.use(function(requestConfig){
        $this.showLoad=true
        return requestConfig;
        },function(error){
        return Promise.reject(error);
    })

    /**
     * [axios请求后]
     */
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

    /*
    * 添加VUE实例属性用来代替axios
    */
    Vue.prototype.$http = instance
    Vue.http = instance

    this.$refs['app'].style.minHeight = document.body.clientHeight+'px';


    /*
    * 测试axios loading效果用，默认要跳到哪个页面
    */
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
    styles(){
      if(this.isShow){
        let minHeight = document.body.clientHeight - 60
        return {
          minHeight:`${minHeight}px`
        }
      } else {
        return {
          minHeight:`${document.body.clientHeight}px`
        }
      }
    }
  }
}
</script>
<style>
#app .weui-tabbar{
    position: fixed;
}

.paddingBottom {
  padding-bottom: 70px;
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
