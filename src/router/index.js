import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/panel/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('../views/panel/MyView.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/bookshelf',
    name: 'bookshelf',
    component: () => import('../views/panel/BookshelfView.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/sort',
    name: 'sort',
    component: () => import('../views/panel/SortView.vue'),
    meta: {
      keepAlive: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/search/SearchView.vue'),
    meta: {
      hideNav: true
    }
  },
  {
    path: '/all/:allid/:allname',
    name: 'all',
    props: true,
    component: () => import('@/views/All/AllView.vue'),
    meta: {
      hideNav: true
    }
  },
  {
    path: '/details/:bookId',
    name: 'details',
    props: true,
    component: () => import('@/views/Details/DetailsView.vue'),
    meta: {
      keepAlive: true,
      hideNav: true,
      scrollToTop: true
    }
  },
  {
    path: '/content/:bookId/:chapterId',
    name: 'content',
    props: true,
    component: () => import('@/views/content/ContentView.vue'),
    meta: {
      hideNav: true,
      scrollToTop: true
    }
  },
  {
    path: '/404',
    name: '404',
    component: () => import('../views/other/NotFoundComponent.vue'),
    meta: {
      hideNav: true,
      scrollToTop: true
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]

// 返回页面回到顶部
// 只能作用于history模式
const scrollBehavior = (to, from, savedPosition) => {
  // 前进/后退
  if (savedPosition) {
    return savedPosition
  }
  const position = {}
  // 滚动到锚点
  if (to.hash) {
    position.selector = to.hash
    return position
  }
  // 通过路由元信息控制回到顶部
  if (to.matched.some(m => m.meta.scrollToTop)) {
    position.x = 0
    position.y = 0
  }
  return position
}

const router = new VueRouter({
  // mode: 'hash',
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior
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