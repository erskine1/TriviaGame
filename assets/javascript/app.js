

// VARIABLES 

var questions = [
  { q: `Are you ready to begin?`, "a1": `I'm ready.`, a2: `I'm not ready.`, ans: `I'm ready.` },
  { q: `Can you answer the first question?`, a1: `It is possible.`, a2: `It is not possible.` },
  { q: `Can you answer the second question?`, a1: `Probably.`, a2: `Maybe.` },
]

// TESTING 

window.onload = function() {
  // initialize();
  timer.start(); // Starting timer on load for testing purposes. Should be called when a question loads
  $(".question").attr("id", "0"); // this is how we'll get the index
  $("#0").text(questions[0].q);
  $("#answer-1").text(questions[0].a1);
  $("#answer-2").text(questions[0].a2);
};


var correct = 0;
var incorrect = 0;
var noAnswer = 0;
var questionCount = 0;

// var timeLimit = 15;
// var transition = 3; 


// TIMER 

var timerInterval;
var timerActive = false;

// Timer object
var timer = {
  time: 6,

  reset: function() {
    timer.time = 6;
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
      timer.stop();
      $("#timer").text(`Your failure has not gone unnoticed.`)
    }
  },

  stop: function() {
    clearInterval(timerInterval);
    timerActive = false;
    // $("#timer").hide();
  },

};

// TRIVIA - ANSWER EVENT

$(".answer").on("click", function()  {

  // need to make it so player can only choose an answer once per question
  // and so player can't choose answers at all if time reaches 0

  questionIndex = $(".question").attr("id");
  guess = this.id; // the id is a string and can't access the object

  // conditional to determine if it was 1-4, then select the corresponding
  // key value

  // this is comparing strings

  console.log(`Player chooses ${guess}.`)
  if ($(`#${guess}`).text() === questions[questionIndex].ans) {
    console.log(`Wow! Player guessed correctly.`)
    // if player is right, display a message, and move to next question after short duration
  }
  else {
    console.log(`Wrong.`)
    // if player is wrong, display a different message etc.
  }
});

function initialize() {
  // default variables
  // after a brief (.5s) pause, informs player about the game
  // and asks if they are ready
  // player has two options to reply, but both lead to the game starting
  // this is the first question/answer, but not part of the trivia count
}

function next() {
  // next question + answers load
  // question count ++ 
  // timer starts - call timer function

}

function countDown() {
  // timer-- 
}


// EVENTS 