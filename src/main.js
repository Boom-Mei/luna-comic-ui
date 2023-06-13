import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入rem适配
import "amfe-flexible/index"
// 引入通用css
import '@/assets/css/rest.css'
// 引入icon
import '@/assets/font_3380908_15d6nc92zis/iconfont.css'
// 引入vant
import Vant from 'vant';
import 'vant/lib/index.css';
// vant 图片懒加载
import { Lazyload } from 'vant';
// 引入3D轮播图
import Carousel3d from 'vue-carousel-3d';
// 引入axios
import axios from './plugins/axios'

Vue.prototype.$axios = axios

Vue.use(Vant).use(Carousel3d).use(Lazyload, {
  lazyComponent: true,
  loading: require('@/assets/image/玩命加载中.png'),
  error: require('@/assets/image/没有.png')
});
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')