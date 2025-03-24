var topKFrequent = function(nums, k) {
    // Constraints validation
    if (nums.length < 1 || nums.length > 10 ** 5) {
        throw new Error("nums length must be between 1 and 10^5");
    }
    if (Math.min(...nums) < -(10 ** 4) || Math.max(...nums) > 10 ** 4) {
        throw new Error("nums elements must be between -10^4 and 10^4");
    }
    
    let uniqueElements = new Set(nums).size;
    console.log(uniqueElements)
    if (k < 1 || k > uniqueElements) {
        throw new Error("k must be between 1 and the number of unique elements in nums");
    }

    let frequencies = new Map();
    for (let num of nums) {
        frequencies.set(num, (frequencies.get(num) || 0) + 1);
    }

    let sortedNums = [...frequencies.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(entry => entry[0]);

    return sortedNums;
};

topKFrequent([1,1,1,2,2,3],2)
