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

app.all('*', (req, res) => {
    res.end('all *')
})


app.listen(conf.PORT, () => {
    console.log(`The Server Is Staring On ${conf.PORT}`)
})