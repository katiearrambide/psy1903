// Create variables to store references to elements on the page
let form = document.getElementsByTagName('form')[0];
let results = document.getElementById('results');
let equation = document.getElementById('equation');

let num1output = document.getElementById('num1');
let num2output = document.getElementById('num2');

let num1 = Math.floor(Math.random() * 10) + 1;
let num2 = Math.floor(Math.random() * 10) + 1;

num1output.innerHTML = num1;
num2output.innerHTML = num2;

//console.log(num1);
//console.log(num2);

//equation.innerHTML = 'What is ' + num1 + ' + ' + num2 + '?';

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {


    // Prevent the default form submission b
    event.preventDefault();

    //stop the timer

    //calculate response time

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    results.innerHTML = 'Hello ' + response + '!';

    //hide the form (including instructions)
    form.style.display = 'none';
});








