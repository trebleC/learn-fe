const mongoose = require('mongoose')

const conn = mongoose.createConnection('mongodb://localhost/users', {
    useNewUrlParser: true
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

// 因为内部要用 this 所以这里不要用箭头函数
userSchema.statics.findByName =  function(name) {
    return this.findOne({name})
}

// 通过 userSchema.methods 给每个文档的实例添加方法
userSchema.methods.findByName = function() {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 userSchema.methods.findByName`)
    return this.model('User').findOne({name: this.name})
}

// 虚拟属性存在但是不存在与数据库中, 通过两个 Or 多个字段计算得来
userSchema.virtual('userAge').get(function() {
    return `${this.name}:${this.age}`
})

const User = conn.model('User', userSchema)

;(async () => {
    const doc = await User.findByName('quanquan')
    console.log(`当前时间 ${Date.now()}: debug 的数据是 doc.userAge: `, doc.userAge)
    process.exit(0)
})()

