const arrayChunk = (array,chunk) => {

    let splittedArray = []
    let dummyArray = []
    let flag = 0
    
    for (let index = 0; index < array.length; index++) {

        dummyArray.push(array[index])

        if(index >0 && (index+1) % chunk == 0) {
            splittedArray.push(dummyArray)
            dummyArray = []
            flag++
        }
        if(Math.floor(array.length / chunk) == flag) {
            splittedArray.push(array.slice(index+1,))
            return splittedArray
        }
    }
    
    
}

const arrayChunkSecond = (array,chunk) => {

    let splittedArray = []
    let index = 0
    
    while(index < array.length) {
        const arrayChunk = array.slice(index, index + chunk)
        splittedArray.push(arrayChunk)
        index += chunk
    }

    return splittedArray
    
    
}


console.log(arrayChunkSecond([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],4))