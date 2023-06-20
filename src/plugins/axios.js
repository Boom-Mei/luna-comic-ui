// "use strict";

// import Vue from 'vue';
// import axios from "axios";

// // Full config:  https://github.com/axios/axios#request-config
// // axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// let config = {c
//   baseURL: "https://apis.netstart.cn/bcomic/",
//   // baseURL: process.env.baseURL || process.env.apiUrl || "",
//   timeout: 60 * 1000, // Timeout
//   // timeout: 3000
//   // withCredentials: true, // Check cross-site Access-Control
// };

// const _axios = axios.create(config);

// _axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor
// _axios.interceptors.response.use(
//   function (response) {
//     // Do something with response data
//     if (response.data) {
//       if (response.data.data) {
//         return response.data.data
//       }
//       return response.data
//     }
//     return response;
//   },
//   function (error) {
//     // Do something with response error
//     return Promise.reject(error);
//   }
// );

// Plugin.install = function (Vue) {
//   Vue.axios = _axios;
//   window.axios = _axios;
//   Object.defineProperties(Vue.prototype, {
//     axios: {
//       get() {
//         return _axios;
//       }
//     },
//     $axios: {
//       get() {
//         return _axios;
//       }
//     },
//   });
// };

// Vue.use(Plugin)

// export default Plugin;



// axios文档：https://www.axios-http.cn/docs/post_example
import axios from 'axios'

// 如果是绝对地址的话，是浏览器直接发起的请求
// 如果是相对地址的话，就是nodejs服务器发起的请求，dev环境就可以走到proxy
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// Add a request interceptor
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
})

// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Do something with response data
  const data = response.data
  const status = response.data.code || 200
  // const statusWhiteList = website.statusWhiteList || []
  const message = response.data.msg || '未知错误'
  // 如果在白名单里则自行catch逻辑处理
  // if (statusWhiteList.includes(status)) return Promise.reject(response)
  // 如果是401则跳转到登录页面
  // if (status === 401)
  // return new Promise(resolve => resolve()).then(() => {
  //     router.push({
  //         path: '/login',
  //         query: {
  //             redirect: router.currentRoute.value.fullPath
  //         }
  //     })
  // })
  // return Promise.reject(message)
  // 如果请求为非200否者默认统一处理
  if (status !== 200) {
    return Promise.reject(message)
  }
  // error ret: 24
  if (data && data.ret && data.ret != 814) {
    // reject里面就是catch中的error对象
    return Promise.reject(data)
  }
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
})

export default axios