const merge = require('webpack-merge');
const {isProd, isDev, common} = require('./webpack.common');

const config = merge(common, {

});

module.exports = config;

