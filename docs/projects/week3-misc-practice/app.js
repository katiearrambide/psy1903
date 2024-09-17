
let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let response = prompt('What is ' + num1 + ' + ' + num2 + ' ? ');

let feedback = '';

if (response == num1 + num2) {
    feedback = 'Correct!';
} else if (response == (num1 + num2) + 1 || (num1 + num2) - 1) {
    feedback = 'You were close!';
} else {
    feedback = 'Incorrect.';
}

alert(feedback + ' The expected answer is ' + (num1 + num2));



//let num1 = Math.floor(Math.random() * 10) + 1;
//let num2 = Math.floor(Math.random() * 10) + 1;