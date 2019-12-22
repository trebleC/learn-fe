const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

class Promise {
    constructor(excutor) {
        this.status = PENDING
        this.value = null

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if (this.status === PENDING) {
                this.value = value
                this.status = RESOLVED
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        const reject = reason => {
            if (this.status === PENDING) {
                this.reason = reason
                this.status = REJECTED
                this.onRejectedCallbacks.forEach(fn => fn())
            }
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

        if (this.status === PENDING) {
            this.onResolvedCallbacks.push(() => onFulfilled(this.value))
            this.onRejectedCallbacks.push(() => onRejected(this.reason))
        }
    }
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject('不行~')
    }, 1e3);
})

p.then(result => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 result: `, result)
}, reason => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 reason: `, reason)
})

// export default Promise