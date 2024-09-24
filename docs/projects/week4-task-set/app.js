// Question 3

//function celsiusToFarenheit(celsius) {
//return (celsius * 1.8) + 32;
//}

//console.log(celsiusToFarenheit(10));

// Question 4

function convertTemp(temp, convertTo) {
    if (convertTo == 'c') {
        return (temp - 32) / 1.8;
    }

    if (convertTo == 'f') {
        return (temp * 1.8) + 32;
    }
}

//console.log(convertTemp(10, 'c'));
//console.log(convertTemp(10, 'f'));




