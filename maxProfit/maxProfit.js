
function maxProfit(numbers) {
    let minPrice = 10e9
    let maxProfit = 0

    for (let index = 0; index < numbers.length; index++) {
        minPrice = Math.min(minPrice,numbers[index])
        const potentialProfit = numbers[index] - minPrice
        maxProfit = Math.max(maxProfit,potentialProfit)
    }
    
    return maxProfit
}

const prices = [7,1,5,3,6,4]

console.log(maxProfit(prices))





