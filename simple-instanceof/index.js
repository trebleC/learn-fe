class Person { }

class Man extends Person { }

const quanquan = new Man();

console.log(quanquan instanceof Object)  // true
console.log(quanquan instanceof Person)  // true
console.log(quanquan instanceof Man)     // true
console.log(quanquan instanceof Array)   // false

const simpleInsetanceof = (sub, sup) => {
    let __proto__ = sub.__proto__
    while (__proto__) {
        if (__proto__ === sup.prototype) return true
        __proto__ = __proto__.__proto__
    }

    return false
}

console.log(simpleInsetanceof(quanquan, Object))  // true
console.log(simpleInsetanceof(quanquan, Person))  // true
console.log(simpleInsetanceof(quanquan, Man))     // true
console.log(simpleInsetanceof(quanquan, Array))   // false