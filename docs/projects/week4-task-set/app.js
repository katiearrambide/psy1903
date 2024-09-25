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


//function filterNumbers(numbers, evenOrOdd) {
//let results = [];
//for (let number of numbers) {
// if (evenOrOdd == 'even' && number % 2 == 0) {
//results.push(number);
// }
// if (evenOrOdd == 'odd' && number % 2 != 0) {
//results.push(number);
// }
// }
// return (results);
//}
//console.log(filterNumbers([1, 2, 3, 4, 5], 'odd'));

// question 9

alert(`    Welcome to the even/odd response time task.

    You are about to see a series of numbers.

    If the number you see is EVEN, type the letter "e".

    If the number you see is ODD, type the letter "o".

    Please answer as quickly and accurately as possible.`);




function displayRandomNumber(min, max) {
    return Math.floor(Math.random() * max) + min;
}

let results = [];

for (let i = 0; i < 5; i++) {

    let randomNumber = displayRandomNumber(1, 20);

    let start = Date.now();

    let response = prompt(`Number: ${randomNumber} 
        Type the letter "e" for EVEN. 
        Type the letter "o" for ODD.`);

    let end = Date.now();

    let responseTime = (end - start) / 1000;

    let correct = (randomNumber % 2 == 0 && response == 'e') ||
        (randomNumber % 2 != 0 && response == 'o');


    let result = {
        number: randomNumber,
        response: response,
        correct: correct,
        responseTime: responseTime
    }

    results.push(result);
}

alert('Thank you for participating!');

console.log(results);