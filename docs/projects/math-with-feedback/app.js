alert('In this experiment we will measure your response time. You will be shown a series of simple math equations. Answer these equations as quickly and accurately as you can.');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

let start1 = Date.now();

let response1 = prompt('What is ' + num1 + ' + ' + num2 + ' ? ');

let end1 = Date.now();

let responseTime1 = (end1 - start1) / 1000;

if (response1 == (num1 + num2)) {
    alert('You are correct. You answered: ' + response1 + ' in ' + responseTime1 + ' seconds ');
} else {
    alert('You are incorrect. You answered: ' + response1 + ' in ' + responseTime1 + ' seconds ');
}

let num3 = Math.floor(Math.random() * 10) + 1;
let num4 = Math.floor(Math.random() * 10) + 1;

let start2 = Date.now();

let response2 = prompt('What is ' + num3 + ' + ' + num4 + ' ? ');

let end2 = Date.now();

let responseTime2 = (end2 - start2) / 1000;

if (response2 == (num3 + num4)) {
    alert('You are correct. You answered: ' + response2 + ' in ' + responseTime2 + ' seconds ');
} else {
    alert('You are incorrect. You answered: ' + response2 + ' in ' + responseTime2 + ' seconds ');
}

let num5 = Math.floor(Math.random() * 10) + 1;
let num6 = Math.floor(Math.random() * 10) + 1;

let start3 = Date.now();

let response3 = prompt('What is ' + num5 + ' + ' + num6 + ' ? ');

let end3 = Date.now();

let responseTime3 = (end3 - start3) / 1000;

if (response3 == (num5 + num6)) {
    alert('You are correct. You answered: ' + response3 + ' in ' + responseTime3 + ' seconds ');
} else {
    alert('You are incorrect. You answered: ' + response3 + ' in ' + responseTime3 + ' seconds ');
}



