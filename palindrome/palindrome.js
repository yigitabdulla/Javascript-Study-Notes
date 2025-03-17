const isPalindrome = (word) => {
    reverse = word.split("").reverse().join("")
    if(reverse == word) {
        return word + " is polindrome!"
    } else {
        return word + " is not polindrome!"
    }
}

console.log(isPalindrome("mammam"))