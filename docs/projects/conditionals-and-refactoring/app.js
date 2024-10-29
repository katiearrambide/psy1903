let response = prompt('What is 4 + 6?');
//let correctAnswer = 'The answer is 10'

let feedback = ' ';

if (response == 10) {
    feedback = ('You got it correct! ');
} else if (response > 8 && response < 12)
//could also have been (response == 9 || response == 11
{
    feedback = ('You almost got it correct! ');
}
else {
    feedback = ('You got it incorrect. ');
}
alert(feedback + 'The expected answer is 10!');