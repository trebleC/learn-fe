const PENDING = 'PENDING'
const RESOLVED = 'RESOLVED'
const REJECTED = 'REJECTED'

const resolvePromise = (promise2, x, resolve, reject) => {
    let called = false

    if (promise2 === x) throw new TypeError('Circular reference')

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        try {
            const {then} = x

            if (typeof then === 'function') {
                then.call(x, y => {
                    if (called) return
                    called = true
                    resolvePromise(promise2, y, resolve, reject)
                }, r => {
                    if (called) return
                    called = true
                    reject(r)
                })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}
class Promise {
    constructor(excutor) {
        this.status = PENDING
        this.value = null
        this.reason = null

        this.onResolvedCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = value => {
            if (value instanceof Promise) {
                return value.then(data => resolve(data), err => reject(err))
            }

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

        try {
            excutor(resolve, reject)
        } catch(e) {
            reject(e)
        }
    }
    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function'  ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function'  ? onRejected : e => {throw e}

        const promise2 = new Promise((resolve, reject) => {
            if (this.status === RESOLVED) {
                setTimeout(() => {
                    try {
                        const x = onFulfilled(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        const r = onRejected(this.reason)
                        resolvePromise(promise2, r, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }

            if (this.status === PENDING) {
                this.onResolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            const x = onFulfilled(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                          } catch (e) {
                            reject(e)
                          }
                    }, 0);
                })
                this.onRejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                          const r = onRejected(this.reason)
                          resolvePromise(promise2, r, resolve, reject)
                        } catch (e) {
                          reject(e)
                        }
                    }, 0)
                })
            }
        })

        return promise2
    }
}

const p = new Promise((resolve, reject) => {
    console.log(`当前时间 ${Date.now()}: 代码走到了这里 开始`)
    resolve(new Promise(resolve => (resolve('第一步'))))
})

p.then(data => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
    return {name: 'quanquan'} // new Promise(resolve => resolve({name: 'quanquan'}))
}, err => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 err: `, err)
}).then(data => {
    console.log(`当前时间 ${Date.now()}: debug 的数据是 data: `, data)
})

// 这个静态方法必须得用普通函数的书写方式
Promise.defer = Promise.deferred = function () {
    const dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
      dfd.resolve = resolve
      dfd.reject = reject
    })
    return dfd
}


module.exports = Promise