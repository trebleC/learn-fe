((root, undefined) => {
    // 这样写明显会出现死循环
    const jQuery = function () {
        return new jQuery()
    }

    root.$ = root.jQuery = jQuery
})(window)
