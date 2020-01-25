class MySkeletonPlugin {
    apply(compiler) {
        compiler.hooks.compilation.tap('html-webpack-plugin-before-html-generation', function (compilation) {
            compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync('MySkeletonPlugin', function (htmlPluginData, callback) {
                console.log(`当前时间 ${Date.now()}: debug 的数据是 htmlPluginData: `, htmlPluginData)
                htmlPluginData.html = 'hello world'
                callback()
            })
        });
    }
}

module.exports = MySkeletonPlugin