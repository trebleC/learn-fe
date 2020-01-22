const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const obj = {
    name: 'quanquan',
    sex: 'male'
}

const render = (ejsStr, obj) => {
    return ejsStr.replace(/<%=(.*)%>/g, (...args) => {
        return obj[args[1]]
    })
}

const ejsStr = fs.readFileSync(path.resolve(__dirname, 'index.ejs'), 'utf-8')
const htmlStr = render(ejsStr, obj)

console.log(htmlStr)