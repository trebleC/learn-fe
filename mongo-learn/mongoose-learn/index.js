const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://localhost/users', {
    useNewUrlParser: true
})

conn.on('open', () => {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 连接成功`)
})

conn.on('error', () => {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 连接失败`)
})

const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    sex: String,
    create_at: Date,
    hobby: {
        type: Array,
        default: []
    }
})

const User = conn.model('User', userSchema)

console.log(User === conn.model('User'))
;(async () => {
    // 新增
    const ret = await User.create({
        name: 'quanquan',
        age: 28,
        sex: 'male',
        create_at: new Date()
    })
    console.log(`当前时间 ${Date.now()}: debug 的数据是 ret: `, ret)
})()

