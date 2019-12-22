// const express = require('express')
const express = require('./index')

const conf = {
    PORT: 3001
}

const app = express()

app.get('/', (req, res) => {
    res.end('home')
})

app.listen(conf.PORT, () => {
    console.log(`The Server Is Staring On ${conf.PORT}`)
})