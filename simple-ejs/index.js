const ejs = require('ejs')
const fs = require('fs')
const path = require('path')

const obj = {
    name: 'quanquan',
    sex: 'male'
}
const ejsStr = fs.readFileSync(path.resolve(__dirname, 'index.ejs'), 'utf-8')
const htmlStr = ejs.render(ejsStr, obj)

console.log(htmlStr)