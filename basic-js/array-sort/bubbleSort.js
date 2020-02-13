const {swap} = require('./utils')
const randomArr = [9, 10, 0, 2, 1];


const bubbleSort = array => {
    const len = array.length

    for (let outerIndex = 0; outerIndex < len; outerIndex++) {
        for (let innerIndex = 0; innerIndex < len - 1; innerIndex++) {
            if (array[innerIndex] > array[innerIndex + 1]) {
                swap(array, innerIndex, innerIndex + 1)
            }
        }
    }
}

const bubbleSortArray = randomArr.slice()
console.time('bubbleSort')
bubbleSort(bubbleSortArray)
console.timeEnd('bubbleSort')
console.log(bubbleSortArray)


