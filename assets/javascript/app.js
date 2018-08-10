

window.onload = function () {
  setTimeout(function(){ fadeStart(); }, 1500);  
};

// VARIABLES 

var questions = [
  { q: `Which of these is not a previous name of Morrowind?`, a1: `Dwemereth.`, a2: `Resdayn.`, a3: `Solstheim.`, a4: `Dunmereth.` },
  { q: `What is Morrowind's capital city?`, a1: `Mournhold.`, a2: `Vivec.`, a3: `Gnisis.`, a4: `Balmora.` },
  { q: `What was the name of Kagrenac's enchanted hammer?`, a1: `Wraithguard.`, a2: `Keening.`, a3: `Sunder.`, a4: `Cyclone.` },
  { q: `Which great house lost its seat in the Fourth Era?`, a1: `Redoran.`, a2: `Telvanni.`, a3: `Sadras.`, a4: `Hlaalu.`},
  { q: `Which of these is the correct translation of Vvardenfell?`, a1: `Red Mountain.`, a2: `City of the Strong Shield.`, a3: `Ministry of Truth.`, a4: `Sea of Ghosts.`}
];

var active = []; 

var answerKey = [
  {ans: `Solstheim.`},
  {ans: `Mournhold.`}, 
  {ans: `Sunder.`}, 
  {ans: `Hlaalu.`},
  {ans: `City of the Strong Shield.`}
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
    $("#timer").text(``)
  }

};

// TRIVIA FUNCTIONS

function fadeStart() {
  $(`.trivia`).fadeIn("slow", function() {
  }) // Fade in!
};

function restart() {
  var questions = [
    { q: `Which of these is not a previous name of Morrowind?`, a1: `Dwemereth.`, a2: `Resdayn.`, a3: `Solstheim.`, a4: `Dunmereth.` },
    { q: `What is Morrowind's capital city?`, a1: `Mournhold.`, a2: `Vivec.`, a3: `Gnisis.`, a4: `Balmora.` },
    { q: `What was the name of Kagrenac's enchanted hammer?`, a1: `Wraithguard.`, a2: `Keening.`, a3: `Sunder.`, a4: `Cyclone.` },
    { q: `Which great house lost its seat in the Fourth Era?`, a1: `Redoran.`, a2: `Telvanni.`, a3: `Sadras.`, a4: `Hlaalu.`},
    { q: `Which of these is the correct translation of Vvardenfell?`, a1: `Red Mountain.`, a2: `City of the Strong Shield.`, a3: `Ministry of Truth.`, a4: `Sea of Ghosts.`}
  ];
  
  initialized = false;
  questionIndex = -1;
  answered = false;

  correct = 0;
  incorrect = 0;
  noAnswer = 0;

  timer.stop();
  timer.reset();

  active.shift();
  start();
}

function start() {
  initialized = true;
  // answered = false;
  console.log(`You initialized the game!`);
  console.log(`-------------------------------`);
  guess = "";
  // questionIndex++; 
  setTimeout(function(){ next(); }, 1500);
}

// Stages the next question/answers in the DOM
function next() {
  answered = false;
  active.shift();
  active.push(questions.shift());
  questionIndex++; 
  guess = ""; 

  var answerBox = $(`.answerBox`); 
  $(`.question`).text(active[0].q);
  var answer1 = $(`<div class="answer banner-thick">`).text(active[0].a1);
  var answer2 = $(`<div class="answer banner-thick">`).text(active[0].a2);
  var answer3 = $(`<div class="answer banner-thick">`).text(active[0].a3);
  var answer4 = $(`<div class="answer banner-thick">`).text(active[0].a4);

  $(`.answerBox`).empty();
  answerBox.append(answer1, answer2, answer3, answer4);
  timer.reset();
  timer.start();
  
};

// Checks if answer is correct or incorrect
function checkAns() {
  console.log(`The answered function has been called.`)
  timer.stop();

  var box = $(`.answerBox`).empty();
  var guard = $(`<img>`);
  guard.attr(`src`, `assets/images/redoran.gif`)
  guard.addClass(`guard`); 
  box.append(guard);

  if (guess === answerKey[questionIndex].ans) {
    correct++;
    console.log(`You answered correctly.`)
    box.append(`<div class="speech">... Correct</div>`);

    var amateur = new Audio(src="assets/sounds/correct/amateur.mp3");
    var attention = new Audio(src="assets/sounds/correct/attention.mp3");
    var truth = new Audio(src="assets/sounds/correct/truth.mp3");
    var yes = new Audio(src="assets/sounds/correct/yes.mp3");
    var warmly = new Audio(src="assets/sounds/correct/warmly.mp3");

    if (correct === 1) {
      amateur.play();
    }
    else if (correct === 2) {
      attention.play();
    }
    else if (correct === 3) {
      truth.play();
    }
    else if (correct === 4) {
      yes.play();
    }
    else if (correct === 5) {
      warmly.play();
    }
    
  }
  else {
    incorrect++;
    console.log(`You answered incorrectly.`)
    box.append(`<div class="speech">... The correct answer was ${answerKey[questionIndex].ans}</div>`);

    var relax = new Audio(src="assets/sounds/incorrect/relax.mp3");
    var mind = new Audio(src="assets/sounds/incorrect/mind.mp3");
    var no = new Audio(src="assets/sounds/incorrect/no.mp3");
    var worse = new Audio(src="assets/sounds/incorrect/worse.mp3");
    var wish = new Audio(src="assets/sounds/incorrect/wish.mp3");

    if (incorrect === 1) {
      relax.play();
    }
    else if (incorrect === 2) {
      mind.play();
    }
    else if (incorrect === 3) {
      no.play();
    }
    else if (incorrect === 4) {
      worse.play();
    }
    else if (incorrect === 5) {
      wish.play();
    }
  }

  if (questions.length > 0) {
    setTimeout(function(){ next(); }, 5000);
    // $("#timer").text(`Question timeout is running.`)
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
};

// TRIVIA CLICK EVENT
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

$("#restart").on("click", function() {
  restart();  
});