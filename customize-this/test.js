require('./call')
require('./apply')
require('./bind')

function willCall(a, b) {
    console.log(this.name)
    console.log(a, b)
}

const obj = {
    name: 'quanquan'
}

willCall.customCall(obj, 1, 2)

function willApply(a, b) {
    console.log(this.name)
    console.log(a, b)
}

willApply.customApply(obj, [1, 2])


function willBind(a, b) {
    console.log(this.name)
    console.log(a, b)
}

willBind.customBind(obj, 1)(2)