const fs = require('fs')
const path = require('path')

// 可写流 write end
const ws = fs.createWriteStream('./files/write', {
    flags: 'w',
    encoding: 'utf8',
    highWaterMark: 5,
    autoClose: true,
    start: 0
})

const flag = ws.write('1', err => {
    if (err) return void console.log('文件写入失败')
    console.log('写入成功')
})

// 如果写入内容的字节数大于 highWaterMark flag = false
// 否则 highWaterMark flag = false
console.log(flag)