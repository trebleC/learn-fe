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
        const promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                const x = onFulfilled(this.value)
                resolve(x)
            }

            if (this.status === REJECTED) {
                const r = onRejected(this.reason)
                reject(r)
            }

            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    const x = onFulfilled(this.value)
                    resolve(x)
                })
                this.onRejectedCallbacks.push(() => {
                    const r = onRejected(this.reason)
                    reject(r)
                })
            }
        })

        return promise2
    }
}

const p = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log(`当前时间 ${Date.now()}: 代码走到了这里 开始`)
        resolve('第一步')
    }, 1e3);
})

p.then(data => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
    return '第二步'
}).then(data => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
    return '第三步'
}).then(data => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
})


module.exports = Promise