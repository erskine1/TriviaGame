
// VARIABLES 

var questions = [
  { q: `What's the first question?`, a1: `It's the first one.`, a2: `No.`, a3: `I can't read.`, a4: `Placeholder.` },
  { q: `Can you answer the first question?`, a1: `Huh?`, a2: `It is not possible.`, a3: `It is possible.`, a4: `Placeholder.` },
  { q: `Will you answer the second question?`, a1: `Probably.`, a2: `Okay.`, a3: `Maybe.`, a4: `Placeholder.` },
  { q: `Is this the last question?`, a1: `Nah.`, a2: `Whatever.`, a3: `Yep that's it.`, a4: `Placeholder.`}
];

var active = []; 

var answerKey = [
  {ans: `It's the first one.`},
  {ans: `It is possible.`}, 
  {ans: `Okay.`}, 
  {ans: `Yep that's it.`},
];

// For trivia
var initialized = false;
var questionIndex = -1;
var answered = false;
var guess = "";

// Totals for scoreCard
var correct = 0;
var incorrect = 0;
var noAnswer = 0;

// TIMER 
var timerInterval;
var timerActive = false;

var timer = {
  time: 11,

  reset: function() {
    timer.time = 11;
  },

  start: function() {
    if (!timerActive) {
      timerInterval = setInterval(timer.countDown, 1000);
      timerActive = true;
      $("#timer").show();
    }
  },

  countDown: function() {
    timer.time--;
    $("#timer").text(`You have ${timer.time} seconds to select an answer. Choose wisely.`)
    if (timer.time < 0) {
      $("#timer").text(`Your failure has not gone unnoticed.`)
      noAnswer++;
      checkAns();
    }
  },

  stop: function() {
    clearInterval(timerInterval);
    timerActive = false;
    // $("#timer").hide();
    $("#timer").text(`-`)
  },

};

// TRIVIA FUNCTIONS

function start() {
  initialized = true;
  // answered = false;
  console.log(`You initialized the game!`);
  console.log(`-------------------------------`);
  guess = "";
  setTimeout(function(){ next(); }, 3000);
}

// Stages the next question/answers in the DOM
function next() {
  answered = false;
  active.shift();
  active.push(questions.shift());
  questionIndex++; 
  guess = ""; 

  console.log(`The next function has been called.`);
  console.log(`-------------------------------`);
  
  var answerBox = $(`.answerBox`); 

  $(`.question`).text(active[0].q); 
  var answer1 = $(`<div class="answer">`).text(active[0].a1);
  var answer2 = $(`<div class="answer">`).text(active[0].a2);
  var answer3 = $(`<div class="answer">`).text(active[0].a3);
  var answer4 = $(`<div class="answer">`).text(active[0].a4);

  $(`.answerBox`).empty();
  answerBox.append(answer1, answer2, answer3, answer4);
  timer.reset();
  timer.start(); 

};

// Checks if answer is correct or incorrect
function checkAns() {
  console.log(`The answered function has been called.`)
  timer.stop();

  // Each conditional stage should have DOM manipulation
  // highlight the correct answer
  // display a message depending on whether they got it right 
  // messages can be randoms from an object containing wrong/right arrays!

  if (guess === answerKey[questionIndex].ans) {
    correct++;
    console.log(`You answered correctly.`)
  }
  else  {
    incorrect++;
    console.log(`You answered incorrectly.`)
  }

  if (questions.length > 0) {
    setTimeout(function(){ next(); }, 3000);
    $("#timer").text(`Question timeout is running.`)
  }
  else if (questions.length === 0) {
    scoreCard();
  }
};

// function that will present the scores at the end of the game
// will include a restart button
function scoreCard() {
  console.log(`-----Final Score-----`)
  console.log(`Correct: ${correct}.`)
  console.log(`Incorrect: ${incorrect}.`)
  console.log(`Unanswered: ${noAnswer}.`)
}

// TRIVIA CLICK EVENT
// or document? 
$(".answerBox").on("click", "div.answer", function() {
  guess = $(event.target).text();
  
  if (!initialized) {
    console.log(`initialized is ${initialized}.`);    
    console.log(`-------------------------------`);
    start();
  }

  else if (initialized && !answered && timer.time > 0) {
    if (questions.length > 0) {
      answered = true;
      console.log(`You clicked an answer!`);
      console.log(`answered is ${answered}.`);
      console.log(`-------------------------------`);
      checkAns();
    }
    else if (questions.length === 0) {
      answered = true;
      console.log(`You answered the last question!`);
      console.log(`answered is ${answered}.`);
      console.log(`-------------------------------`);
      checkAns();
    }
  }
});