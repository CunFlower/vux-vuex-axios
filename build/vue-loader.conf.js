'use strict'
const utils = require('./utils')
const config = require('../config')
var isProduction = process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'testing'
let sourceMap;
if(process.env.NODE_ENV === 'production'){
  sourceMap = config.build.productionSourceMap
} else if(process.env.NODE_ENV === 'testing'){
  sourceMap = config.test.productionSourceMap
} else {
  sourceMap = config.dev.cssSourceMap
}
module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: sourceMap,
    extract: isProduction
  }),
  cssSourceMap: sourceMap,
  cacheBusting: config.dev.cacheBusting,
  transformToRequire: {
    video: ['src', 'poster'],
    source: 'src',
    img: 'src',
    image: 'xlink:href'
  }
}
