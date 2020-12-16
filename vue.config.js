module.exports = {
  publicPath: './', // 根路径
  devServer: {
    open: true, // 浏览器自动打开页面
    host: 'localhost',
    port: 8080,
    https: false,
    proxy: {
      // 配置跨域
      '/api': {
        target: 'http://ttapi.research.itcast.cn',
        ws: true, // 是否跨域
        changeOrigin: true,
        // 重写地址
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
