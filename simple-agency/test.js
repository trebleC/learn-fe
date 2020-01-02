const Agency = require('./index')
const agency = new Agency('我爱我家')

class Person {
    constructor(name) {
        this.agency = agency
        this.name = name
    }

    sign() {
        throw new Error('请在子类重写这个方法~')
    }
}

class HouseOwner extends Person {
    constructor(name) {
        super(name)
    }

    sign() {
        this.agency.signHouse(this)
    }

    hasNewTenant(tenant) {
        console.log(`匹配到了新的租客 ${tenant.name}`)
    }
}


class Tenant extends Person {
    constructor(name) {
        super(name)
    }

    sign() {
        this.agency.signWanted(this)
    }

    hasNewHouse(owner) {
        console.log(`匹配到了新的房东 ${owner.name}`)
    }
}

const owner = new HouseOwner('料公司')
const tenant = new Tenant('罗圈圈')
const owner2 = new HouseOwner('朱元璋')
const tenant2 = new Tenant('秦始皇')
const owner3 = new HouseOwner('忽必烈')
const tenant3 = new Tenant('李世民')

owner.sign()
tenant.sign()
owner2.sign()
tenant2.sign()
owner3.sign()
tenant3.sign()
