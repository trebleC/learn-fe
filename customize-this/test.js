require('./call')
function willCall(a, b) {
    console.log(this.name)
    console.log(a, b)
}

const obj = {
    name: 'quanquan'
}

willCall.customCall(obj, 1, 2)