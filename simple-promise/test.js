const fs = require('fs')

fs.readFile('1', 'utf8', (err, data) => {
    fs.readFile(data, 'utf8', (err, data) => {
        fs.readFile(data, 'utf8', (err, data) => {
            console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
        })
    })
})