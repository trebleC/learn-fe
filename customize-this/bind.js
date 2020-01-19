Function.prototype.customBind = function(context = {}, ...args) {
    return (...rest) => {
        this.apply(context, [...args, ...rest])
    }
}