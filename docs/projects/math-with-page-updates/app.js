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

let start = Date.now();

// Listen for the form to be submitted
form.addEventListener('submit', function (event) {


    // Prevent the default form submission b
    event.preventDefault();

    //stop the timer
    let end = Date.now();

    //calculate response time
    let responseTime = (end - start) / 1000;

    // Collect the response
    let response = form.elements['response'].value;

    // Report the results
    if (response == (num1 + num2)) {
        results.innerHTML = 'You answered ' + (response) + ' (correct) in ' + responseTime + ' seconds ';

    } else {
        results.innerHTML = 'You answered ' + (response) + ' (incorrect) in ' + responseTime + ' seconds ';
    }

    //hide the form (including instructions)
    form.style.display = 'none';
});