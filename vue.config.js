const {
  defineConfig
} = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  devServer: {
    host: "localhost",
    // host:"192.168.39.13",
    open: false,
    proxy: {
      // /api是在axios的baseUrl配置默认加上的
      '/api': {
        target: 'http://localhost:8089',
        // ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === 'production') {
      config.mode = 'production';
      // 打包文件大小配置
      config.performance = {
        maxEntrypointSize: 10000000,
        maxAssetSize: 30000000
      }
    }
  },
})



// module.exports = {
//   // 选项...
//   devServer: {
//     port: 899,
//     open: false,
//     proxy: {
//       '/api': {
//         target: 'http://localhost:8089',
//         // ws: true,
//         // changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// }