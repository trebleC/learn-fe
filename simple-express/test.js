// const express = require('express')
const express = require('./index')

const conf = {
    PORT: 3001
}

const app = express()

app.use((req, res, next) => {
    console.log(1)
    next()
})

app.use((req, res, next) => {
    console.log(2)
    next()
})

app.use((req, res, next) => {
    console.log(3)
    next()
})

app.get('/', (req, res) => {
    res.end('home')
})

app.post('/', (req, res) => {
    res.end('post home')
})

app.get('/user/:id/:name', (req, res) => {
    const {params: {id, name}} = req
    res.end(JSON.stringify({id, name}))
})

// app.all('*', (req, res) => {
//     res.end('all *')
// })


app.listen(conf.PORT, () => {
    console.log(`The Server Is Staring On ${conf.PORT}`)
})