import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
// 把vuex的内存存储到本地储存，防止刷新
// 引入 vuex-persistedstate 组件
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 书架
    bookList: [],
    // 历史记录
    historyList: [],
    // 是否登录
    Login: false,
    // 是否显示登录页面
    flag: false,
    // 评论头像
    imgSrc: '',
    // 首次启动广告
    showVideo: true,
    // 推荐背景色
    recommendColor: "#fff",
    // 热门背景色
    hotColor: "https://images.weserv.nl/?url=https://i0.hdslb.com/bfs/manga-static/95ecbdeb1cabde3094aae586dc7a62f69e6a5e89.jpg"
  },
  getters: {},
  mutations: {
    // 添加漫画
    addBook(state, payload) {
      state.bookList.unshift(payload)
      // 根据 "title" 属性 去重
      state.bookList = _.uniqBy(state.bookList, 'title')
    },
    // 取消追漫
    removeBook(state, payload) {
      let arr = [];
      state.bookList.forEach(v => {
        if (v.id != payload) {
          arr.push(v)
        }
      });
      state.bookList = arr;
    },
    // 删除书架漫画
    removeList(state, payload) {
      let arr = [];
      state.bookList.forEach(v => {
        if (payload.indexOf(v.id) == -1) {
          arr.push(v)
        }
      });
      state.bookList = arr;
    },
    // 添加历史记录
    addHistory(state, payload) {
      state.historyList.unshift(payload)
      state.historyList = _.uniqBy(state.historyList, 'title')
      if (state.historyList.length > 12) {
        state.historyList.unshift(payload)
        state.historyList.pop()
        state.historyList = _.uniqBy(state.historyList, 'title')
      }
    },
    // 删除书架漫画
    removeHistory(state, payload) {
      let arr = [];
      state.historyList.forEach(v => {
        if (payload.indexOf(v.id) == -1) {
          arr.push(v)
        }
      });
      state.historyList = arr;
    },
    // 是否显示登录页面
    changeFlag(state, payload) {
      state.flag = payload
    },
    // 修改成登录状态
    changeLogin(state, payload) {
      state.Login = payload
    },
    // 添加评论头像
    addImgSrc(state, payload) {
      state.imgSrc = payload
    },
    // 修改广告
    changeVideo(state, payload) {
      state.showVideo = payload;
    },
    // 修改背景色
    changeColor(state, payload) {
      state.recommendColor = payload
    },
    // 修改背景色
    changeHotColor(state, payload) {
      state.hotColor = payload
    }
  },
  actions: {},
  modules: {},
  // 配置 vuex-persistedstate
  plugins: [createPersistedState({
    storage: window.sessionStorage
  })]
})