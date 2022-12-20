const question = document.querySelector('#question');
const options = Array.from(document.querySelectorAll('.option-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'Name 3 JavaScript frameworks',
        option1: 'AngularJS, React, Vue.js',
        option2: 'Rice, Spaguetti, Cheese',
        option3: 'AngularMX, Jquery, HTML',
        option4: 'LovelyJS, EmberJS, VueJX',
        answer:1,
    },
    {
        question: 'What is the DOM?',
        option1: 'When chrome is running along with other apps on a computer',
        option2: 'The Document Object Model represents HTML documents in a way JavaScript can interpret.',
        option3: 'When a programmer finally makes some progress trying to fix a bug',
        option4: 'When Internet Explorer hits back for making fun of its speed',
        answer:2,
    },
    {
        question: 'What are the JavaScript data types',
        option1: 'PHP, HMTL, CSS, PHYTON, COMPLEX API & JAVA',
        option2: 'When a programmer tries to remove all the bugs from their code',
        option3: 'Reaction when someone says they are an HTML programmer',
        option4: 'Number, String, Boolean, Object, Symbol, Undefined & Null',
        answer:4,
    },
    {
        question: 'What is Git?',
        option1: 'When a programmer finds out that an application is not hosted on a Linux server',
        option2: 'When you try to fix something on the production on a release day',
        option3: 'When all the browsers have a meetup',
        option4: 'Git is a Distributed Version Control system (DVCS). It can track changes to a file and allows you to revert back to any particular change.',
        answer:4,
    },
    {
        question: 'The simplest way to create an empty object is using the Object constructor, like:',
        option1: 'variable object = new Object();',
        option2: 'new object = new Object();',
        option3: 'function object = new Object();',
        option4: 'var object = new Object();',
        answer:4,
    },
    {
        question: 'What are JSON common operations?',
        option1: 'Parsing: JSON.parse(text); \n  Stringification: JSON.stringify(object);',
        option2: 'When you try to fix something on the production on a release day',
        option3: 'When all the browsers have a meetup',
        option4: 'The programmer of the year',
        answer:1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 6

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/final.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    options.forEach(option => {
        const number = option.dataset['number']
        option.innerText = currentQuestion['option' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true 
}

options.forEach(option => {
    option.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedoption = e.target
        const selectedAnswer = selectedoption.dataset ['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedoption.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedoption.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()