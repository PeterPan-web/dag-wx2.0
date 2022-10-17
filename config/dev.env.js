'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  //开发环境的url
  // API_ROOT:'"http:// 192.168.31.151:8080/data-store"'
})
