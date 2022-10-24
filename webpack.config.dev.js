const base = require('./webpack.config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LOCALHOST = 'https://lzz.enbo12119.com';
// const LOCALHOST = 'http://192.168.9.148';

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
                target: LOCALHOST,
                changeOrigin: true,
            },
            '/proxy': {
                target: LOCALHOST,
                changeOrigin: true,
                pathRewrite: { '^/proxy': '' },
            },
        }
    }
});
