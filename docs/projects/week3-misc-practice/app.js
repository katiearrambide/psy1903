
//let num1 = Math.floor(Math.random() * 10) + 1;
//let num2 = Math.floor(Math.random() * 10) + 1;

//let response = prompt('What is ' + num1 + ' + ' + num2 + ' ? ');

//let feedback = '';

//if (response == num1 + num2) {
feedback = 'Correct!';
//} else if (response == (num1 + num2) + 1 || (num1 + num2) - 1) {
feedback = 'You were close!';
//} else {
feedback = 'Incorrect.';
//}

//alert(feedback + ' The expected answer is ' + (num1 + num2));



//let num1 = Math.floor(Math.random() * 10) + 1;
//let num2 = Math.floor(Math.random() * 10) + 1;

//let age = prompt('How old are you?');
//if (age < 12) {
//alert('Child');
//}
//if (age >= 12 && age < 18) {
//alert('Teenager');
//}
//if (age >= 18) {
//alert('Adult');
//}

let response = prompt('Please enter a whole number.');

if (response % 2 == 0) {
    alert('The number you entered was even.');
}
if (response % 2 !== 0) {
    alert('The number you entered was odd. ');
}