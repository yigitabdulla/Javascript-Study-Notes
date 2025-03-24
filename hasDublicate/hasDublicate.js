var containsDuplicate = function(nums) {
    if (nums.length < 1 || nums.length > 10 ** 5) {
        throw new Error("nums length must be between 1 and 10^5");
    }

    if (Math.min(...nums) < -(10 ** 9) || Math.max(...nums) > 10 ** 9) {
        throw new Error("nums elements must be between -10^9 and 10^9");
    }

    let numSet = new Set();

    for (let num of nums) {
        if (numSet.has(num)) {
            return true;
        }
        numSet.add(num);
    }
    
    return false;
};
