import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/panel/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/panel/MyView.vue')
  },
  {
    path: '/bookshelf',
    name: 'bookshelf',
    component: () => import('../views/panel/BookshelfView.vue')
  },
  {
    path: '/sort',
    name: 'sort',
    component: () => import('../views/panel/SortView.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/SearchView.vue'),
    meta: {
      hideNav: true,
    }
  },
  {
    path: '/all/:allid/:allname',
    name: 'all',
    props: true,
    component: () => import('@/views/All/AllView.vue'),
    meta: {
      hideNav: true,
    }
  },
  {
    path: '/details/:detailsid',
    name: 'details',
    props: true,
    component: () => import('@/views/Details/DetailsView.vue'),
    meta: {
      hideNav: true,
    }
  },
  {
    path: '/content/:contentid/:detailsid',
    name: 'content',
    props: true,
    component: () => import('@/views/content/ContentView.vue'),
    meta: {
      hideNav: true,
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//   let token = store.getters.mytoken; //拿到vuex里面得mytoken
//   if (to.meta.islogin) {//判断是否需要登录
//     if (token) {//如果需要登录，查看是否有token数据，没有token跳转登录
//       next()
//     } else {
//       next("/login")
//     }
//     return
//   }
//   next()
// })

export default router