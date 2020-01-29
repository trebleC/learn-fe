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

userSchema.methods.findByName = function() {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 userSchema.methods.findByName`)
    return this.model('User').findOne({name: this.name})
}

const User = conn.model('User', userSchema)

;(async () => {
    const newUser = new User({
        name: 'quanquan',
        age: 28,
        sex: 'male',
        create_at: new Date()
    })
    const doc = await newUser.findByName()
    console.log(`当前时间 ${Date.now()}: debug 的数据是 doc: `, doc)
    process.exit(0)
})()

