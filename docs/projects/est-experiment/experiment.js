let jsPsych = initJsPsych();

let timeline = [];

// welcome screen

let welcomeTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Welcome to the Emotional Stroop Task!</h1>
    <p>In this experiment, you will complete the following three tasks:</p>
    <ul class='instruction'><li>In Task 1 you will be asked to describe an image. </li>
    <li>In Task 2 you will answer a brief set of questions.</li>
    <li>In Task 3 you will be asked to identify the color of a series of words.</li></ul>
    <p>Press <span class='key'>SPACE</span> to begin</p>
    `,
    choices: [' ']

    //style questions see notepad

};

timeline.push(welcomeTrial);

//priming task goes here

let images = ['failure', 'neutral', 'success']
let randomIndex = getRandomNumber(0, 2)
let image = images[randomIndex]


let primingTrial = {
    type: jsPsychSurveyHtmlForm,
    preamble: `<p>Describe what you see in the image.</p>`,
    html: `
   
   <img src='primeimages/${image}prime.png'>
          <input name='responseInput' id='response' type='text'>`,

    autofocus: 'response',
    button_label: 'Submit Answer',
    data: {
        collect: true,
        trialType: 'prime',

    },
    on_finish: function (data) {
        data.whichPrime = image
    }
};
timeline.push(primingTrial);




function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



//questionnaire task

//uses 5 point linkert scale
var likert_scale = [
    "Strongly Disagree",
    "Disagree",
    "Neutral",
    "Agree",
    "Strongly Agree"
];

let questionnaire = {
    type: jsPsychSurveyLikert,
    preamble: `
    <h1>Task 2 of 3</h1>
    <p>Please answer the following questions.</p>
    `,
    questions: [
        { prompt: "In fantasies about my career, often I am in a group and they are praising me.", name: 'prompt1', labels: likert_scale },
        { prompt: "Most people who know me say I am ambitious.", name: 'prompt2', labels: likert_scale },
        { prompt: "I regularly list my goals where I can see them during the day.", name: 'prompt3', labels: likert_scale },
        { prompt: "Most evenings, I kick back and relax rather than prepare for the next day's tasks.", name: 'prompt4', labels: likert_scale },
        { prompt: "I am basically a competitive person, and I compete just for the sake of competing.", name: 'prompt5', labels: likert_scale },
        { prompt: "I like taking risks.", name: 'prompt6', labels: likert_scale },
        { prompt: "I like it when people say in front of others that I am doing a good job.", name: 'prompt7', labels: likert_scale },
        { prompt: "I would be more successful, but other people disrupt my plans. ", name: 'prompt8', labels: likert_scale },
        { prompt: "If I knew others disapproved of my actions, it would cause me to rethink my plans.", name: 'prompt9', labels: likert_scale },
        { prompt: "People do not like to admit it, but success in life is less about hard work and more about luck and being in the right place at the right time.", name: 'prompt10', labels: likert_scale },



    ],

    data: {
        collect: true,
        trialType: 'questionnaire',
    }

}

timeline.push(questionnaire);

//EST instructions

let estInstructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Task 3 of 3</h1>
    <p>In this final task, you will see words displayed in the colors <span class='red'>red</span>, <span class='green'>green</span>, or <span class='blue'</span>blue.</p>
    <p> If the color of the word is <span class='red'>red</span>, press the <span class='key'>r</span> key</p>
    <p> If the color of the word is <span class='green'>green</span>, press the <span class='key'>g</span> key</p>
    <p> If the color of the word is <span class='blue'>blue</span>, press the <span class='key'>b</span> key</p>
    <p> Please respond as quickly and accurately as possible. </p>
    <p>Press <span class='key'>SPACE</span> to begin</p>
    `,
    choices: [' ']



};

timeline.push(estInstructions);

//make 3 blocks--practice, emotionA, emotionB

let counter = 1;

for (let block of conditions) {
    console.log(block);

    // Screen to introduce the block

    let blockIntroScreen = {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: `<h1>Part ${counter} of 3</h1>`,
        trial_duration: 1000,
        choices: ['NO KEY']


    };

    counter++;

    timeline.push(blockIntroScreen);


    // Screen to display the word as the selected color
    //Listen r,g,b keys

    for (let trial of block.trials) {
        console.log(trial.color);
        console.log(trial);

        let conditionTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `<h1 class = '${trial.color}'>${trial.word}</h1>`,
            data: {
                collect: true,
                block: block.block,
                word: trial.word,
                color: trial.color,
                valence: trial.valence,
                trialType: 'est',
                // ⭐ Add a block id to our results data
            },
            choices: ['r', 'g', 'b'],
            on_finish: function (data) {
                if (data.response == trial.expectedResponse) {
                    data.correct = true;
                }
                else {
                    data.correct = false;
                }

            }
        }
        timeline.push(conditionTrial);
        let fixationTrial = {
            type: jsPsychHtmlKeyboardResponse,
            stimulus: `+ `,
            trial_duration: 250, // 250 milliseconds 
            choices: ['NO KEY']
        }

        timeline.push(fixationTrial);
    }


}

//save results trial


let resultsTrial = {
    type: jsPsychHtmlKeyboardResponse,
    choices: ['NO KEYS'],
    async: false,
    stimulus: `
        <h1>Please wait...</h1>
        <span class='loader'></span>
        <p>We are saving the results of your inputs.</p>
        `,
    on_start: function () {
        //  ⭐ Update the following three values as appropriate ⭐
        let prefix = 'est-experiment';
        let dataPipeExperimentId = 'NcGwLJXbbxob';
        let forceOSFSave = false;

        // Filter and retrieve results as CSV data
        let results = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'plugin_version', 'collect',])
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

//debrief screen

let debriefTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: `
    <h1>Thank you!</h1>
    <p>The experiment is now complete. You can now close this tab</p>
    `,
    choices: ['NO KEYS'],
    on_start: function () {
        let data = jsPsych.data
            .get()
            .filter({ collect: true })
            .ignore(['stimulus', 'plugin_version', 'collect'])
            .csv();
        console.log(data);
    }
}
timeline.push(debriefTrial);


//save results 



jsPsych.run(timeline);



