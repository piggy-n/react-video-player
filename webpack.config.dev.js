const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = Object.assign({}, base, {
    mode: 'development', // production/development 模式
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react-video-player',
            template: 'index.html',
        }),
    ],
});