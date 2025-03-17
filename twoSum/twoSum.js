const list = [2,7,11,16]

function twoSum(array,target) {

    for (let index = 0; index < array.length; index++) {
        
        for (let j = index + 1; j < array.length; j++) {
            if(array[index] + array[j] == target) {
                return `Indexes are ${index} and ${j}`
            }            
        }
        
    }
    return 'No solution'

}

function twoSumHashMap(array, target) {
    const map = new Map();

    for (let i = 0; i < array.length; i++) {
        let complement = target - array[i];

        if (map.has(complement)) {
            return `Indexes are ${map.get(complement)} and ${i}`;
        }
        map.set(array[i], i);
    }

    return 'No solution';
}

console.log(twoSumHashMap(list, 18));


console.log(twoSum(list,9))