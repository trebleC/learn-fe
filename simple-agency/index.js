// 房产中介
module.exports = class Agency {
    constructor(name) {
        this.name = name
        this.houseowners = []
        this.tenants = []
    }

    signHouse(owner) {
        this.houseowners.push(owner)
        this.noticeMsgTenant(owner)
    }

    signWanted(tenant) {
        this.tenants.push(tenant)
        this.noticeMsgOwner(tenant)
    }

    noticeMsgTenant(owner) {
        this.tenants.forEach(tenant => tenant.hasNewHouse(owner))
    }

    noticeMsgOwner(tenant) {
        this.houseowners.forEach(owner => owner.hasNewTenant(tenant))
    }
}