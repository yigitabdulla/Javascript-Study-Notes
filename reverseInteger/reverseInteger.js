const reverseInteger = (number) => {
    let dummyNum = ""

    while(number % 10 >= 1) {
        dummyNum += (number%10).toString()
        number = Math.floor(number / 10)
    }
    return +dummyNum
}

console.log(reverseInteger(12341))