let experiment = 'Stroop';

let welcomeMessage = `
Welcome to our ` + experiment + `experiment.
Please read the instructions carefully
`;
console.log(welcomeMessage);

// Define a variable to hold our experiment name

console.log(typeof experiment); // string
console.log(experiment.charAt(0)); // 'S'


let trialCountMax = 20;
//console.log(trialCountMax.charAt(0));
//console.log(typeof trialCountMax); // number

// TODO: randomize colors
let colors = ['red', 'green', 'blue'];

alert('Welcome to the ' + experiment + ' experiment!');

trialCountMax = 40;

// At the halfway point we will display a pause screen
let halfWayCount = trialCountMax / 2;

console.log(halfWayCount);

let correct = true;
console.log(typeof correct);

console.log(10 > 15); // false


let response1 = prompt('What is 5 + 3?');
console.log(response1);

let response2 = prompt('what is 5 + 5?');
console.log(response2);


console.log("Hello World");


let courseName = 'Programming for Psychologists';
console.log(courseName.toUpperCase());
console.log(courseName.indexOf("Psychologists"));
console.log(courseName.replace("Programming", "Coding"));
