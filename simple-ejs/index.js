const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const obj = {
    name: 'quanquan',
    sex: 'male',
    arr: [
        '是时候扼杀那些陷入黑暗的人了',
        '我用双手成就你的梦想',
        '我的剑就是你的⚔'
    ]
}

const render = (ejsStr, obj) => {
    return ejsStr.replace(/<%=(.*?)%>/g, (...args) => {
        return obj[args[1]]
    })
}

const ejsStr = fs.readFileSync(path.resolve(__dirname, 'index.ejs'), 'utf-8')
const htmlStr = ejs.render(ejsStr, obj)

console.log(htmlStr)