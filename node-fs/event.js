const EventEmitter = require('events')

const e = new EventEmitter()

e.on('eat', () => {
    console.log('米饭')
})

e.on('eat', () => {
    console.log('馒头')
})

e.emit('eat')