const isPalindrome = (word) => {
    reverse = word.split("").reverse().join("")
    if(reverse == word) {
        return true
    } else {
        return false
    }
}

console.log(isPalindrome("mammam"))