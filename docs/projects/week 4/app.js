//let feedback = 'correct';
//let responseTime = 2.4;
//let anwer = 25;

//alert(`You are ${feeback}. Answer: ${answer}. Response time: ${responseTime}`);

//part 1 functions
let num1 = getRandomNumber(1, 10);
let num2 = getRandomNumber(1, 100);

console.log(num1);
console.log(num2);

displayRandomNumber();

function getRandomNumber(min, max) {
    let randomNumber = Math.floor(Math.random() * max) + min;
    return randomNumber;
}

function displayRandomNumber() {
    alert(getRandomNumber(1, 10));
}

//arrays

//an array of numbers
let ages = [45, 23, 28, 35, 35];

//an array of strings
//
let names = ['Alice', 'Jamal', 'Avi', 'Kyle'];

names[1] = 'Bob';
names.unshift('Sara');
console.log(names);
console.log(names[4]); // Kyle

// an array can contain other arrays
let numbers = [1, 2, 3, [8, 9, 10]];

//an array of mixed data types (strings, numbers, arrays)
let mixed = ['a', 'b', 1, 1, [true, 'bar']];

// Part 3 Loops

let names = ['alice', 'jamal', 'avi', 'kyle'];

let namesThatStartWithA = [];

for (let name of names) {
    if (name.charAt == 'A') {
        namesThatStartWithA.push(name);
    }
}

console.log(namesThatStartWithA);

// Part 4 Numerical for Loops
let results = [];

for (let i = 0; i < 3; i++) {
    let num1 = getRandomNumber(1, 10);
    let num2 = getRandomNumber(1, 10);

    let start1 = Date.now();

    let response1 = prompt(`What is ${num1} + ${num2} ? `);

    let end1 = Date.now();

    let responseTime1 = (end1 - start1) / 1000;

    if (response1 == (num1 + num2)) {
        feedback('correct');
    } else {
        feedback('incorrect');
    }

    let result = {
        response: response,
        answer: anwer,
        feedback: feedback,
        time: time
    }

    results.push([result]);
}

console.log(results);

//Part 5 Objects

// Array: Store Multiple Elements, accessed via numerical indexes
let participantA = ['Alice', 21, true];

let participantB = { name: 'Alice', age: 21, consent: true }








let person = {
    // Strings
    firstName: 'Elliot',
    lastName: 'Brown',

    // Number
    age: 30,

    // Array
    hobbies: ['reading', 'gaming', 'hiking'],

    // Nested Object
    address: {
        street: '324 Western Ave',
        city: 'Cambridge',
        zipCode: '02139'
    },

    // Functions
    // Observe how the keyword *this* is used in functions to reference other properties within this object
    getFullName: function () {
        return `${this.firstName} ${this.lastName}`;
    },

    greet: function () {
        return `Hello, my name is ${this.getFullName()} and I am ${this.age} years old.`;
    },

    getAddress: function () {
        return `I live at ${this.address.street}, ${this.address.city} ${this.address.zipCode}`;
    },

    getHobbies: function () {
        return `My hobbies include ${this.hobbies.join(', ')}`;
    }

};

console.log(person.getAddress());

document.getElementById()
console.log()





// Testing the functions, accessed via dot notation and invoked with parenthesis
console.log(person.greet()); // Hello, my name is Elliot Brown and I am 30 years old.

console.log(person.getAddress()); // I live at 324 Western Ave, Cambridge 02139
console.log(person.getHobbies()); // My hobbies include reading, gaming, hiking

// Testing the properties
console.log(person.firstName); // Elliot
console.log(person.age); // 30

console.log(person.firstName);

