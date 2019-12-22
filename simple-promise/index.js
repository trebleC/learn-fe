const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
    constructor(excutor) {
        this.status = PENDING
        this.value = null

        const resolve = value => {
            this.value = value
            this.status = RESOLVED
        }

        const reject = reason => {
            this.reason = reason
            this.status = REJECTED
        }

        excutor(resolve, reject)
    }

    then(onFulfilled, onRejected) {
        if (this.status === RESOLVED) {
            onFulfilled(this.value)
        }

        if (this.status === REJECTED) {
            onRejected(this.reason)
        }
    }
}

const p = new Promise(resolve => {
    resolve('好呀~')
})

p.then(result => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 result: `, result)
})

// export default Promise