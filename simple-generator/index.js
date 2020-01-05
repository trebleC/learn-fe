const obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    [Symbol.iterator]() {
        let idx = 0
        return {
            next: () => ({
                done: idx === this.length,
                value: this[idx++]
            })
        }
    }
}

const arr = [...obj]

console.log(Array.isArray(arr), arr)
console.log(Array.isArray(obj), obj)