var lengthOfLongestSubstring = function(s) {
    let solution = "";
    
    for (let i = 0; i < s.length; i++) {
        let temp = "";
        
        for (let j = i; j < s.length; j++) {
            if (!temp.includes(s[j])) {
                temp += s[j];
            } else {
                break;
            }
        }

        if (temp.length > solution.length) {
            solution = temp;
        }
    }

    return solution.length;
};


var lengthOfLongestSubstringOptimized = function(s) {
    let charSet = new Set();
    let left = 0;
    let maxLength = 0;

    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }

        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};

var lengthOfLongestSubstringOptimized_2 = function(s) {
    let lastSeen = {};
    let maxLength = 0;
    let left = 0;

    for (let right = 0; right < s.length; right++) {
        const char = s[right];

        if (char in lastSeen && lastSeen[char] >= left) {
            left = lastSeen[char] + 1;
        }

        lastSeen[char] = right;
        maxLength = Math.max(maxLength, right - left + 1);
    }

    return maxLength;
};



console.log(lengthOfLongestSubstringOptimized_2("aasbdjhasdgb"));
