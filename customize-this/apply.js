Function.prototype.customApply = function(context = {}, args) {
    // 如果 context 已经有 func 方法, 就缓存该方法
    // func 不是确定的值, 甚至可以叫 a b c....
    const {func} = context

    // 把当前函数作为 context 的一个属性
    context.func = this

    // 把当前函数作为 context 的一个属性执行
    const ret = context.func(...args)

    // 还原 context 的 func 方法 OR 属性
    context.func = func
    return ret
}