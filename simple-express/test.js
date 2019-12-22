// const express = require('express')
const express = require('./index')

const conf = {
    PORT: 3001
}

const app = express()

app.get('/', (req, res) => {
    res.end('home')
})

app.post('/', (req, res) => {
    res.end('post home')
})

app.get('/user/:id/:name', (req, res) => {
    const {params: {id, name}} = req
    console.log(`当前时间 ${Date.now()}: debug 的数据是 id, name: `, id, name)
    res.end(JSON.stringify({id, name}))
})

app.all('*', (req, res) => {
    res.end('all *')
})


app.listen(conf.PORT, () => {
    console.log(`The Server Is Staring On ${conf.PORT}`)
})