const fs = require('fs')
const Promise = require('./index')

// fs.readFile('1', 'utf8', (err, data) => {
//     fs.readFile(data, 'utf8', (err, data) => {
//         fs.readFile(data, 'utf8', (err, data) => {
//             console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
//         })
//     })
// })

const readFile = filePath => new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) reject(err)
        resolve(data)
    })
})

readFile('1')
    .then(data => readFile(data))
    .then(data => readFile(data))
    .then(data => {
        console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
    })

const p1 = 1
const p2 = new Promise(resolve => resolve(2))
const p3 = new Promise((resolve, reject) => reject(3))

Promise.all([p3, p2, p1]).then(resp => {
    console.log(resp)
}, err => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 err: `, err)
})

