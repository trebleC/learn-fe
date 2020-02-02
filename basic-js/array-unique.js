const origin = [1, 2, 3, 4, 2, 1]

const renderResult = (origin, unique) => {
    console.log(`方法 ${unique.name}: `)
    console.table({ origin, uniqueed: unique(origin) })
    console.log('\n\n')
}

// 第一种, 最古老的方法
const unique = arr => {
    let repeat
    const ret = []

    for (let i = 0, len = arr.length; i < len; i++) {
        for (let j = 0, length = ret.length; j < length; j++) {
            if (ret[j] === arr[i]) {
                repeat = true
                break
            }
        }

        if (!repeat) {
            ret.push(arr[i])
        }
    }

    return ret
}

renderResult(origin, unique)
