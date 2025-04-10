const l1 = [2,4,3,8], l2 = [5,6,4,7,9,1]

var addTwoNumbers = function(l1, l2) {
    const maxLength = Math.max(l1.length, l2.length)

    let extra = 0
    const answer = []
    
    for (let i = 0; i < maxLength; i++) {
        
        if (l1[i] && l2[i] && l1[i] + l2[i] < 10 && extra == 0) {
            answer.push(l1[i] + l2[i]);
            continue;
        }
    
        if (l1[i] && l2[i] && l1[i] + l2[i] >= 10 && extra == 0) {
            answer.push((l1[i] + l2[i]) % 10);
            extra = 1;
            continue;
        }
    
        if (l1[i] && l2[i] && l1[i] + l2[i] < 9 && extra == 1) {
            answer.push(l1[i] + l2[i] + 1);
            extra = 0;
            continue;
        }
    
        if (l1[i] && l2[i] && l1[i] + l2[i] >= 9 && extra == 1) {
            answer.push(((l1[i] + l2[i]) % 10) + 1);
            extra = 0;
            continue;
        }

        if (l1[i] && !l2[i] && extra == 1 && l1[i] + extra < 10) {
            answer.push(l1[i] + 1);
            extra = 0;
            continue;
        }

        if (l1[i] && !l2[i] && extra == 0 && l1[i] + extra < 10) {
            answer.push(l1[i]);
            extra = 0;
            continue;
        }

        if (l1[i] && !l2[i] && extra == 1 && l1[i] + extra >= 10) {
            answer.push((l1[i] + 1) % 10);
            extra = 1;
            continue;
        }

        if (l1[i] && !l2[i] && extra == 0 && l1[i] + extra >= 10) {
            answer.push((l1[i] + 1) % 10);
            extra = 1;
            continue;
        }

        if (!l1[i] && l2[i] && extra == 1 && l2[i] + extra < 10) {
            answer.push(l2[i] + 1);
            extra = 0;
            continue;
        }

        if (!l1[i] && l2[i] && extra == 0 && l2[i] + extra < 10) {
            answer.push(l2[i]);
            extra = 0;
            continue;
        }

        if (!l1[i] && l2[i] && extra == 1 && l2[i] + extra >= 10) {
            answer.push((l2[i] + 1) % 10);
            extra = 1;
            continue;
        }

        if (!l1[i] && l2[i] && extra == 0 && l2[i] + extra >= 10) {
            answer.push((l2[i]) % 10);
            extra = 1;
            continue;
        }
    
    }

    if(extra == 1) answer.push(1)
    

    

    return answer
};

var addTwoNumbersShort = function(l1, l2) {
    const maxLength = Math.max(l1.length, l2.length);
    let extra = 0;
    const answer = [];
    
    for (let i = 0; i < maxLength; i++) {
        
        let num1 = l1[i] !== undefined ? l1[i] : 0;
        let num2 = l2[i] !== undefined ? l2[i] : 0;
        
        let sum = num1 + num2 + extra;

        if (sum >= 10) {
            answer.push(sum % 10);
            extra = 1;
        } else {
            answer.push(sum);
            extra = 0;
        }
    }

    if (extra === 1) {
        answer.push(1);
    }
    
    return answer;
};

console.log(addTwoNumbers(l1,l2))