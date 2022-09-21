const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 'https://lzz.enbo12119.com';
// 'http://192.168.9.148';

module.exports = Object.assign({}, base, {
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            title: 'react-video-player',
            template: 'index.html',
        }),
    ],
    devServer: {
        proxy: {
            '/prod-api': {
                target: process.env.PROXY,
                changeOrigin: true,
            },
            '/proxy': {
                target: process.env.PROXY,
                changeOrigin: true,
                pathRewrite: { '^/proxy': '' },
            },
        }
    }
});
