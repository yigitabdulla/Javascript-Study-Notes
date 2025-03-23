const words = ["act", "pots", "tops", "cat", "stop", "hat"]

function isAnagram(word1,word2) {
    const isTheseWordsAnagram = word1.split("").sort().join() == word2.split("").sort().join()
    return isTheseWordsAnagram
}

function groupAnagrams(words) {
    let groupAnagrams = []
    let tempArray = []

    for (let index = 0; index < words.length; index++) {
        let flag = false
        for (let j = 0; j < words.length; j++) {
            
            if(words[index] !== words[j] && isAnagram(words[index],words[j])) {
                
                if(groupAnagrams[j] && groupAnagrams[j].includes(words[j])) {
                    flag = true
                    break
                }
                tempArray.push(words[j])
                
            }
        }
        if(!flag) tempArray.push(words[index])
        if(tempArray.length > 0) groupAnagrams.push(tempArray)
        tempArray = []
    }

    return groupAnagrams
}

//const words = ["act", "pots", "tops", "cat", "stop", "hat"]

function groupAnagramsEfficient(words) {
    let anagramMap = new Map();

    for (let word of words) {
        let sortedWord = word.split("").sort().join("");
        if (!anagramMap.has(sortedWord)) {
            anagramMap.set(sortedWord, []);
        }
        anagramMap.get(sortedWord).push(word);
    }

    return Array.from(anagramMap.values());
}


//groupAnagrams(words).map(array => console.log(array.includes("cat")))
console.log(groupAnagramsEfficient(words))