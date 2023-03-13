const questions = [
    {
        "text": "Was bedeutet HTML?",
        "options": [
            "Hightech Multilanguage",
            "Hypertext Markup Language",
            "Hover to Markable Library",
            "Had too many lessons"
        ],
        "answer": 1
    },
    // {
    //     "text": "Welches Element wird verwendet, um eine geordnete Liste in HTML zu erstellen?",
    //     "options": [
    //         "'<ul>'",
    //         "'<li>'",
    //         "'<ol>'",
    //         "'<list>'"
    //     ],
    //     "answer": 2
    // },
    // {
    //     "text": "Welches Tag wird verwendet, um eine Überschrift im HTML-Dokument zu definieren?",
    //     "options": [
    //         "'<h1>'",
    //         "'<title>'",
    //         "'<head>'",
    //         "'<body>'"
    //     ],
    //     "answer": 0
    // },
    // {
    //     "text": "Welches Element wird verwendet, um einen Link in HTML zu erstellen?",
    //     "options": [
    //         "'<a>'",
    //         "'<link>'",
    //         "'<href>'",
    //         "'<url>'"
    //     ],
    //     "answer": 0
    // },
    {
        "text": "Was bedeutet das Akronym DOM?",
        "options": [
            "Document Object Model",
            "Display Object Model",
            "Database Object Model",
            "Design Object Model"
        ],
        "answer": 0
    },
    {
        "text": "Was bedeutet CSS?",
        "options": [
            "Cascading Style Sheets",
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Colorful Style Sheets"
        ],
        "answer": 0
    },
    {
        "text": "Wie kann man in CSS einen roten Hintergrund definieren?",
        "options": [
            "background-color: red",
            "color: red",
            "background: red",
            "background-color: #FF0000"
        ],
        "answer": 0
    },
    {
        "text": "Wie kann man in CSS eine Schriftart definieren?",
        "options": [
            "font-family",
            "text-style",
            "font-style",
            "font-size"
        ],
        "answer": 0
    },
    {
        "text": "Welches Element wird verwendet, um JavaScript-Code in einem HTML-Dokument zu definieren?",
        "options": [
            "src",
            "href",
            "link",
            "script"
        ],
        "answer": 3
    },
    {
        "text": "Was ist die korrekte Syntax für eine JavaScript-Funktion?",
        "options": [
            "function:myFunction() {}",
            "function myFunction() {}",
            "myFunction():function {}",
            "myFunction()=function {}"
        ],
        "answer": 1
    },
    {
        "text": "Welches Zeichen wird in JavaScript verwendet, um eine Variable einzubinden?",
        "options": [
            "#",
            "@",
            "$",
            "&"
        ],
        "answer": 2
    },
    {
        "text": "Welches Event wird ausgelöst, wenn ein Benutzer auf ein HTML-Element klickt?",
        "options": [
            "onhover",
            "onload",
            "onmouseclick",
            "onclick"
        ],
        "answer": 3
    },
    {
        "text": "Wie kann man eine Schleife in JavaScript beenden?",
        "options": [
            "break",
            "return",
            "stop",
            "exit"
        ],
        "answer": 0
    },
    {
        "text": "Welches Event wird ausgelöst, wenn ein Benutzer die Maus über ein HTML-Element bewegt?",
        "options": [
            "onhover",
            "onload",
            "onmouseover",
            "onkeydown"
        ],
        "answer": 2
    },
    {
        "text": "Wie kann man in JavaScript eine Zahl in eine Zeichenkette umwandeln?",
        "options": [
            "toString()",
            "toNumber()",
            "toText()",
            "parseInt()"
        ],
        "answer": 0
    }
];

let currentQuestion = 0;
let clickedOptions = [];
let clickedRight = 0;

let AUDIO_SUCCESS = new Audio('audio/success.mp3')
let AUDIO_FAIL = new Audio('audio/fail.mp3')
let AUDIO_FINISH = new Audio('audio/finish.mp3')





function init() {
    document.getElementById('questions-total').innerHTML = questions.length;
    showQuestion();
}


function showQuestion() {
    if (gameIsFinished()) {
        showEndScreen();
    }
    else {
        updateQuestion();
    }
    updateProgressBar();
}


function gameIsFinished() {
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    AUDIO_FINISH.play();
    document.getElementById('endscreen-body').style = '';
    document.getElementById('question-body').style = 'display: none;';
    document.getElementById('result').innerHTML = `${clickedRight}/${questions.length} Punkten`;
}


function updateQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-counter').innerHTML = currentQuestion + 1;
    document.getElementById('question-text').innerHTML = question.text;

    for (let i = 0; i < question.options.length; i++) {
        const option = question.options[i];
        document.getElementById(`option-${i}`).innerHTML = option;
    }
}


function updateProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').style = `width: ${percent}%`;
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
}


function answer(clickedId) {
    const question = questions[currentQuestion];
    const clickedElement = document.getElementById(clickedId);
    const rightElement = document.getElementById(`option-${question.answer}`);

    clickedElement.parentNode.classList.add('text-white');
    rightElement.parentNode.classList.add('bg-success');
    rightElement.parentNode.classList.add('border-success');

    if (answerIsRight(clickedId)) {
        AUDIO_SUCCESS.play();
        clickedRight++;
    }
    else {
        AUDIO_FAIL.play();
        clickedElement.parentNode.classList.add('bg-danger');
        clickedElement.parentNode.classList.add('border-danger');
        rightElement.parentNode.classList.add('bg-opacity-25');
    }

    document.getElementById('next-button').disabled = false;
    clickedOptions.push(clickedId.slice(-1));
}


function answerIsRight(clickedId) {
    return clickedId.slice(-1) == questions[currentQuestion].answer;
}


function nextQuestion() {
    resetOptions();
    document.getElementById('next-button').disabled = true;

    currentQuestion++;
    showQuestion();
}


function resetOptions() {
    const question = questions[currentQuestion];
    const lastClickedElement = document.getElementById(`option-${clickedOptions[currentQuestion]}`);
    const lastRightElement = document.getElementById(`option-${question.answer}`);

    lastClickedElement.parentNode.classList.remove('text-white');
    lastRightElement.parentNode.classList.remove('bg-success');
    lastRightElement.parentNode.classList.remove('border-success');

    if (lastClickedElement !== lastRightElement) {
        lastClickedElement.parentNode.classList.remove('bg-danger');
        lastClickedElement.parentNode.classList.remove('border-danger');
        lastRightElement.parentNode.classList.remove('bg-opacity-25');
    }
}


function restart() {
    document.getElementById('question-body').style = '';
    document.getElementById('endscreen-body').style = 'display: none;';
    currentQuestion = 0;
    clickedOptions = [];
    clickedRight = 0;
    init();
}