function wordFrequencyCounter(sentence) {
    let wordCounts = new Map();

    // Convert to lowercase and remove punctuation
    let wordsInSentence = sentence
        .toLowerCase()
        .replace(/[^\w\s]/g, '') // Remove punctuation
        .split(" "); // Split by spaces

    for (let word of wordsInSentence) {
        wordCounts.set(word, (wordCounts.get(word) || 0) + 1);
    }

    return wordCounts;
}

console.log(wordFrequencyCounter("Hello world! Hello everyone."));
console.log("---------------------------------------------------------------------------------------")
console.log(Object.fromEntries(wordFrequencyCounter("Hello world! Hello everyone.")));
console.log("---------------------------------------------------------------------------------------")
console.log([...wordFrequencyCounter("Hello world! Hello everyone.")]);
