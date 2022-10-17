'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {//设置反向代理，实现跨域.

      '/dag-web': {
          target: 'http://43.142.92.150:80', //设置调用接口域名和端口号别忘了加http
          changeOrigin: true,
          pathRewrite: {// 如果接口本身没有/dag-web需要通过pathRewrite来重写了地址
              '^/dag-web': '/hfdagl' //这里理解成用‘/dag-web’代替target里面的地址，组件中我们调接口时直接用/dag-web代替
          },
          //解决跨域引起的session问题，这段代码改变cookie 的作用于为 path="/"
          onProxyRes(proxyRes, req, res) {
              var oldCookie = proxyRes.headers['set-cookie']
              if (oldCookie == null || oldCookie.length == 0) {
                  delete proxyRes.headers['set-cookie']

                  return

              }

              var oldCookieItems = oldCookie[0].split(';')

              var newCookie = ''

              for(var i=0; i < oldCookieItems.length; ++i){
                  if(newCookie.length >0)

                      newCookie += ';'

                  if(oldCookieItems[i].indexOf('Path=') >= 0)

                      newCookie += 'Path=/'

                  else

                      newCookie += oldCookieItems[i]

              }

              proxyRes.headers['set-cookie'] = [newCookie]

          }

      },
    },
    // Various Dev Server settings
    host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 80, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
