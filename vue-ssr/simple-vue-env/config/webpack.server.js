const merge = require('webpack-merge')
const path = require('path')
const base = require('./webpack.base')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(base, {
    target: 'node',
    entry: {
        server: path.resolve(__dirname, '../server-entry.js')
    },
    output: {
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../public/index.ssr.html'),
            filename: 'index.ssr.html',
            excludeChunks: ['server']
        })
    ]
})