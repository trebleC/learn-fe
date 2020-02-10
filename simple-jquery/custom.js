((root, undefined) => {
    const jQuery = function () {
        return new jQuery.fn.init()
    }

    jQuery.fn = jQuery.prototype = {
        init: function() {
            this.name = 'quanquan'
            return this
        },
        css() {
            console.log(`当前时间 ${Date.now()}: 代码走到了这里 我是 Css method`)
        }
    }

    jQuery.fn.init.prototype = jQuery.fn
    root.$ = root.jQuery = jQuery
})(window)
