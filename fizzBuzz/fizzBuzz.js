const fizzBuzz = (number) => {
    

    for (let index = 1; index <= number; index++) {
        if(index % 15 == 0) {
            console.log(`${index} FizzBuzz`)
        }
        else if(index % 3 == 0) {
            console.log(`${index} Fizz`)
        }
        else if(index % 5 == 0) {
            console.log(`${index} Buzz`)
        }
        else {
            console.log(`${index}`)
        }
    }
}

console.log(fizzBuzz(15))