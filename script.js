// Questions array
var questions = [{
        question: "Where is the correct place to insert a JavaScript ? ",
        choices: ['The &lt;body&gt; section', 'The &lt;head&gt; section', 'Both &lt;body&gt; and &lt;head&gt; section'],
        answer: 0
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        choices: [' &lt;script src="xxx.js"&gt;', ' &lt;script name="xxx.js"&gt;', ' &lt;script href="xxx.js"&gt;'],
        answer: 0
    },
    {
        question: "The external JavaScript file must contain the &lt;script&gt; tag.",
        choices: ['True', 'False'],
        answer: 0
    },
    {
        question: "How do you write 'Hello World' in an alert box ? ",
        choices: ['msg("Hello World");', ' msgBox("Hello World");', 'alert("Hello World");', 'alertBox("Hello World");'],
        answer: 2
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: [' function myFunction()', 'function = myFunction()', ' function:myFunction()'],
        answer: 0
    }

];

// player information dictionary
var playerInfo = {
    name: null,
    score: 0

}

// Timer 
function Timer() {
    // if counter ends 
    if (counter <= 0) {
        // call complete quiz function  
        quiz_complete();

    } else {
        // decrement counter by 1
        counter--
        // update counter in html element
        span_timer.innerHTML = counter;
    }

}

// start quiz
function start_quiz() {
    // Timer function will run after every 1 second
    countdown = setInterval(Timer, 1000);
    // Hide screen start quiz 
    div_start_quiz.hidden = true;
    // Hide screen quiz 
    div_quiz.hidden = false;
    // call function get_question to get questions
    get_question(questions[curent_ques]);
}

// get questions by rendering questions and it choices to html elements
function get_question(ques) {
    // update question in question el
    document.getElementById('question').innerHTML = ques.question
    var choices = ""

    // iterate over quiestion choices in array
    for (let i = 0; i < ques.choices.length; i++) {
        // create DOM html elements
        var div = document.createElement('div'),
            label = document.createElement('label'),
            input = document.createElement('input'),
            span = document.createElement('span');

        // set properties to html elements
        div.className = "ans ml-2"
        label.className = "radio"
        input.type = "radio"
        input.name = "ans"
        input.value = i

        // set choices value to label
        span.innerHTML = (i + 1) + ". " + ques.choices[i]
        label.appendChild(input)
        input.ans = i;

        // append elemnts to div
        label.appendChild(span);
        div.append(label);
        choices += div.outerHTML;
    }
    // set dynamic choices HTML created to choices div 
    document.getElementById('choices').innerHTML = choices

}

// check answers selected by user
function check_answer(ans) {
    // compare current answer with the answer stored in current question array
    if (ans == questions[curent_ques].answer) {
        // update the html with Correct text
        h3_validate_ans.innerHTML = "Correct !";
        // increment the player score by 10
        playerInfo.score += 10

    } else {
        // update the html with Wrong text
        h3_validate_ans.innerHTML = "Wrong !";
        // decremet timer counter by 10 if wrong answer
        counter -= 10;
    }
    // wait 1 second after user has slected choice
    setTimeout(next_question, 1000)

}

// get next question by iterating questions array
function next_question() {

    h3_validate_ans.innerHTML = '';
    // get length of questions array 
    var total = questions.length - 1;

    // compare length of questions array with current question index
    if (total != curent_ques) {
        // increment to question index by 1
        curent_ques++;
        // get next question
        get_question(questions[curent_ques])
    } else {
        // if all question are answered then call quiz_complete
        quiz_complete();
    }
}

// quiz complete function when the quiz has ended
function quiz_complete() {
    // stop the timer
    clearInterval(countdown);

    // hide start_quiz div
    div_start_quiz.hidden = true;
    // hide quiz div
    div_quiz.hidden = true;
    // show initials div
    div_initials.hidden = false;
    // update players score in html
    span_score.innerHTML = playerInfo.score;
}

// save initials in local storage of browser
function save_initails() {
    // get form data when submitted
    var formData = new FormData(document.querySelector('form'));
    // set player name 
    playerInfo.name = formData.get('name')
        // get high score player from local storage
    let localdata = localStorage.getItem("player");
    // check if local storage is not empty
    if (localdata != null) {
        // parse player from localstorage
        var player = JSON.parse(localdata)
            // compare high socre of current player from player in localstorage

        if (playerInfo.score > player.score) {
            // update localstorage player with high socre
            localStorage.setItem("player", JSON.stringify(playerInfo));
        }
    } else {
        // update localstorage player with high socre
        localStorage.setItem("player", JSON.stringify(playerInfo));
    }

}
// view high score screen; get high socre player from local storage
function view_high_score() {

    div_high_score.hidden = false;
    div_start_quiz.hidden = true;
    div_quiz.hidden = true
    div_initials.hidden = true;
    div_high_score = true;
    // get player from localstorage
    let localdata = localStorage.getItem("player");
    if (localdata != null) {
        var player = JSON.parse(localdata);
        // display player name and his score stored in local storage
        span_high_score.innerHTML = player.name + ": " + player.score

    } else {

        // display no score if no player stored in localstorage
        span_high_score.innerHTML = "No high Socre";
    }


}

// click event on radio buttons (question choices)
document.addEventListener('click', function(e) {
    if (e.target.type == "radio") {
        check_answer(e.target.value)
    }
})


// click events 
document.getElementById('btn_start').addEventListener('click', start_quiz)
document.getElementById('view_score').addEventListener('click', view_high_score)
document.getElementById('btn_return').addEventListener('click', function() {
    // reload page
    location.reload()
})

// initialization of DOM elements and values
var span_timer = document.getElementById('timer'),
    div_start_quiz = document.getElementById('start_quiz'),
    div_quiz = document.getElementById('quiz'),
    div_high_score = document.getElementById('high_score'),
    h3_validate_ans = document.getElementById('validate_ans'),
    div_initials = document.getElementById('initials'),
    span_score = document.getElementById('score'),
    form = document.getElementById('form'),
    span_high_score = document.getElementById('high-score'),
    counter = 60,
    countdown = null,
    curent_ques = 0;

// form submit event 
form.addEventListener('submit', save_initails);

// show hide screens and set initial values on startup 
div_start_quiz.hidden = false;
div_quiz.hidden = true
div_initials.hidden = true;
div_high_score.hidden = true;
span_timer.innerHTML = 0
playerInfo.score = 0