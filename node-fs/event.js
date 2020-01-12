// const EventEmitter = require('events')

class EventEmitter {
    constructor() {
        this._events = {}
    }

    on(et, cb) {
        if (this._events[et]) {
            this._events[et].push(cb)
        } else {
            this._events[et] = [cb]
        }
    }

    emit(et) {
        if (Array.isArray(this._events[et])) {
            this._events[et].forEach(fn => fn())
        } else {
            console.warn(`没有绑定 ${et} 类型的事件`);

        }
    }
}


const e = new EventEmitter()

e.on('eat', () => {
    console.log('米饭')
})

e.on('eat', () => {
    console.log('馒头')
})

e.emit('eat')