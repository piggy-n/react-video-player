const path = require('path');

module.exports = {
    entry: {
        index: './src/index.tsx',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: { "@": path.resolve(__dirname, "./src") },
    },
    output: {
        path: path.resolve(__dirname, 'dist/src'),
        library: 'react-video-player',
        libraryTarget: 'umd',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.svg?$/,
                loader: 'svg-sprite-loader',
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    devtool: 'inline-source-map',
};