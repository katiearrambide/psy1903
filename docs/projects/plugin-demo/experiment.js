
let jsPsych = initJsPsych();

// Retrieve the query string from the URL
let queryString = new URLSearchParams(window.location.search);

// Extract the value for qualtricsId from the query string
let qualtricsId = queryString.get('qualtricsId');

// Persist the value for qualtricsId to your experiment data
jsPsych.data.addProperties({ qualtricsId: qualtricsId });

let participantId = getCurrentTimestamp();

let timeline = [];

// welcome screen

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Plugin-demo</h1>
    <p>This experiment is just a demo of the sketchpad jsPsych plug-in!</p>
    <p> Press SPACE to begin </p>
    `,
    choices: [' ']

};

timeline.push(welcomeTrial);


let wordDisplay = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Apple</h1> `,
    trial_duration: 750,
    choices: ['NO KEYS']
};

timeline.push(wordDisplay);


let draw = {
    type: jsPsychSketchpad,
    prompt: '<p>Draw the word you were just shown. You have 40 seconds!</p>',
    prompt_location: 'belowcanvas',
    trial_duration: 40000, //40 seconds
    show_countdown_trial_duration: true,
}


timeline.push(draw);

let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .csv();

        console.log(results);

        let prefix = 'plugin-demo';
        let dataPipeExperimentId = 'xGrIMXyGYhic';
        let forceOSFSave = true:

            let fileName = prefix + '-' + participantId + '.csv';

        saveResults(fileName, results, dataPipeExperimentId, forceOSFSave).then(response => {
            jsPsych.finishTrial();
        })

    }
}
timeline.push(resultsTrial);

//debrief screen

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function (data) {

        let linkToQualtricsSurvey = `https://harvard.az1.qualtrics.com/jfe/form/SV_8HaJEgaSuTw9L1A?experimentParticipantId=${participantId}`

        return `
        <h1>Thank you!</h1>
        <p>
            To complete your response, 
            please follow <a href='${linkToQualtricsSurvey}'>this link</a> 
            and complete the survey you see there.
        </p>
    `},
    choices: ['NO KEYS']
}

timeline.push(debriefTrial);

jsPsych.run(timeline);