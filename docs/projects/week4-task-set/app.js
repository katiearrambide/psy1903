// Question 3

//function celsiusToFarenheit(celsius) {
//return (celsius * 1.8) + 32;
//}

//console.log(celsiusToFarenheit(10));

// Question 4

//function convertTemp(temp, convertTo) {
//if (convertTo == 'c') {
//return (temp - 32) / 1.8;
// }

//if (convertTo == 'f') {
//return (temp * 1.8) + 32;
//}
//}

//console.log(convertTemp(10, 'c'));
//console.log(convertTemp(10, 'f'));

//Question 5

//let results = [];

//function getWordLengths(words) {
//for (let word of words) {
//results.push(word.length)
//}
// return (results);
//}


//let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];

//console.log(getWordLengths(words));

// Question 6



//function getLongestWord(words) {
//let longestWord = ''
// for (let word of words) {
// if (word.length > longestWord.length) {
//   longestWord = word
//  }

//}
// return longestWord
//}


//let words = ['apple', 'banana', 'cherry', 'pear', 'grape'];


//console.log(getLongestWord(words));

// Question 7

//function getOddNumbers(numbers) {
//let results = [];
//for (let number of numbers) {
//if (number % 2 != 0) {
//results.push(number)
// }
// }
// return (results);
//}

//console.log(getOddNumbers([1, 2, 3, 4, 5]));
//console.log(getOddNumbers([12, 45, 10, 11, 6, 1]));

// question 8


function filterNumbers(numbers, evenOrOdd) {
    let results = [];
    for (let number of numbers) {
        if (evenOrOdd == 'even' && number % 2 == 0) {
            results.push(number);
        }
        if (evenOrOdd == 'odd' && number % 2 != 0) {
            results.push(number);
        }
    }
    return (results);
}
console.log(filterNumbers([1, 2, 3, 4, 5], 'odd'));