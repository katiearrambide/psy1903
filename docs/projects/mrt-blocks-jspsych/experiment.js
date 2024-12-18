let jsPsych = initJsPsych();

let timeline = [];

// welcome

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Math Response Time Task</h1>
    <p>In this experiment, you will be shown a series of math questions.</p>
    <p>Please answer as quickly and accurately as possible.</p>
    <p>Press <span class='key'>SPACE</span> to begin</p>
    `,
    choices: [' ']

};

timeline.push(welcomeTrial);


// questionairre using likert-scale
var likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

let questionnaire = {
    type: jsPsychSurveyLikert,
    questions: [
        { prompt: "I enjoy solving math problems.", name: 'prompt1', labels: likert_scale },
        { prompt: "I find math easy.", name: 'prompt2', labels: likert_scale },

    ],
    randomize_question_order: true
}

timeline.push(questionnaire);

// make 3 blocks

let blocks = [
    { name: 'Block 1', range: [0, 10] },
    { name: 'Block 2', range: [10, 20] },
    { name: 'Block 3', range: [20, 30] }
];

// outer loop for blocks

for (let i = 0; i < blocks.length; i++) {
    let block = blocks[i]; //allows it to access block that matches 0th, 1st, 2nd element which are block 1,2, and 3

    // block intro

    let blockIntro = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h2>${block.name}</h2><p>Press space to begin.</p>`
    };
    timeline.push(blockIntro);

    // loop through the 3 trials

    for (let i = 0; i < 3; i++) {
        let num1 = getRandomNumber(block.range[0], block.range[1]);
        let num2 = getRandomNumber(block.range[0], block.range[1]);
        let correctAnswer = num1 + num2;

        let mathResponse = {
            type: jsPsychSurveyHtmlForm,
            preamble: `<p>What is<span class='equation'> ${num1} </span> + <span class= 'equation'>${num2}?</span></p>`,
            html: `<p><input type='text'name='answer' id='answer'></p>`,
            autofocus: 'answer',
            button_label: 'Submit Answer',
            data: {
                collect: true,
                num1: num1,
                num2: num2,
                block: block.name,
                correctAnswer: correctAnswer


            },
            on_finish: function (data) {
                data.answer = data.response.answer;
                data.correct = (data.answer == correctAnswer);
            }
        };
        timeline.push(mathResponse);
    }

}


let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'mrt';
        let dataPipeExperimentId = 'your-experiment-id-here';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'plugin_version', 'collect', 'response'])
            .csv();

        // Generate a participant ID based on the current timestamp
        let participantId = new Date().toISOString().replace(/T/, '-').replace(/\..+/, '').replace(/:/g, '-');

        // Dynamically determine if the experiment is currently running locally or on production
        let isLocalHost = window.location.href.includes('localhost');

        let destination = '/save';
        if (!isLocalHost || forceOSFSave) {
            destination = 'https://pipe.jspsych.org/api/data/';
        }

        // Send the results to our saving end point
        fetch(destination, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
            },
            body: JSON.stringify({
                experimentID: dataPipeExperimentId,
                filename: prefix + '-' + participantId + '.csv',
                data: results,
            }),
        }).then(data => {
            console.log(data);
            jsPsych.finishTrial();
        })
    }
}
timeline.push(resultsTrial);


// debrief

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `<h1>Thank you!</h1><p>You can now close this tab.</p>`,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'trial_type', 'trial_index', 'plugin_version', 'collect', 'response'])
            .csv();
        console.log(data);
    }
};
timeline.push(debriefTrial);

jsPsych.run(timeline);
