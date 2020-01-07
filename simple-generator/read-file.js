const fs = require('fs')
const util = require('util')
const readFile =  util.promisify(fs.readFile)

function * readHello() {
    const content1 = yield readFile('1', 'utf8')
    const content2 = yield readFile(content1, 'utf8')
    const content3 = yield readFile(content2, 'utf8')
    return content3
}

var it = readHello()

const {value} = it.next()
value.then(data => {
    const {value} = it.next(data)
    value.then(data => {
        const {value} = it.next(data)
        value.then(data => {
            const {value} = it.next(data)
            console.log(`当前时间 ${Date.now()}: debug 的数据是 value: `, value)
        })
    })
})