let jsPsych = initJsPsych();

let timeline = [];

// Welcome Screen
let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task</h1>
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press SPACE to begin</p>
    `,
    choices: [' ']

};

timeline.push(welcomeTrial);

for (let condition of conditions) {
    let mathResponse = {
        type: jsPsychSurveyHtmlForm,
        preamble: `<p> What is ${condition.num1} + ${condition.num2} ?`,
        html: `<p><input type= 'text' name='answer' id='answer'></p>`,
        autofocus: 'answer', //id of the field we want to auto=focus
        button_label: 'Submit Answer',
        data: {
            collect: true,
            num1: condition.num1,
            num2: condition.num2,
            correctAnswer: condition.answer

        },
        on_finish: function (data) {
            data.answer = data.response.answer
            if (data.answer == (condition.num1 + condition.num2) == true) {
                data.correct = true;
            }
            else {
                data.correct = false;
            }

        }
    }
    timeline.push(mathResponse);
}


//Debrief Screen
let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you!</h1>
<p>You can now close this tab</p>
`,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect', 'response'])
            .csv();
        console.log(data);
    }

}
timeline.push(debriefTrial);

jsPsych.run(timeline);
