import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import $ from 'jquery'

/*引入Element-UI库*/
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

/*使用Vuex管理数据*/
import Vuex from 'vuex'
Vue.use(Vuex)

/*引入基本css*/
import '../src/assets/css/base.css'

/*图片懒加载与加载失败*/
import VueLazyload from 'vue-lazyload'
import loading from './assets/imgs/lazyload/loading.gif'
import error from './assets/imgs/error/error.jpg'
Vue.use(VueLazyload, {
  loading,
  error
})

//引入百度地图
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  ak: 'YOUR_APP_KEY'
})

//引入高德地图
import AMap from 'vue-amap'
Vue.use(AMap)




Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
