
// VARIABLES 

var questions = [
  { q: `Are you ready to begin?`, a1: `I'm ready.`, a2: `I'm not ready.`, a3: `Huh?`, a4: `Placeholder.` },
  { q: `Can you answer the first question?`, a1: `Huh?`, a2: `It is not possible.`, a3: `It is possible.`, a4: `Placeholder.` },
  { q: `Will you answer the second question?`, a1: `Probably.`, a2: `Okay.`, a3: `Maybe.`, a4: `Placeholder.` },
  { q: `Is this the last question?`, a1: `Nah.`, a2: `Whatever.`, a3: `Yep that's it.`, a4: `Placeholder.`}
];

var active = []; 

var answerKey = [
  {ans: `I'm ready.`},
  {ans: `It is possible.`}, 
  {ans: `Okay.`}, 
  {ans: `Yep that's it.`},
];

// Totals for end
var correct = 0;
var incorrect = 0;
var noAnswer = 0;

// For trivia
var initialized = false;
var questionIndex = -1;
var answered = false;
var guess = "";

// TESTING 

// window.onload = function() {
  // active.push(questions.shift());
  // initialize();
  // timer.start(); // Starting timer on load for testing purposes. Should be called when a question loads
  // $(".question").attr("id", "0"); // this is how we'll get the index
  // $("#0").text(active[0].q);
  // $("#answer-1").text(active[0].a1);
  // $("#answer-2").text(active[0].a2);
  // $("#answer-3").text(active[0].a3);
// };

// var timeLimit = 15;
// var transition = 3; 


// TIMER 

var timerInterval;
var timerActive = false; // is this actually used anywhere?

// Timer object
var timer = {
  time: 16,

  reset: function() {
    timer.time = 16;
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

// TRIVIA - ANSWER EVENT

// main function
// push question[0] into answer array, THEN splice 
// need to make it so player can only choose an answer once per question
// and so player can't choose answers at all if time reaches 0

function start() {
  initialized = true;
  // answered = false;
  console.log(`You initialized the game!`);
  console.log(`-------------------------------`);
  guess = "";
  setTimeout(function(){ next(); }, 3000);
}

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
  // answer1.attr("id", "testing");
  var answer2 = $(`<div class="answer">`).text(active[0].a2);
  // answer2.addClass("answer");
  var answer3 = $(`<div class="answer">`).text(active[0].a3);
  var answer4 = $(`<div class="answer">`).text(active[0].a4);

  $(`.answerBox`).empty();
  answerBox.append(answer1, answer2, answer3, answer4);
  timer.reset();
  timer.start(); 

};

function checkAns() {
  console.log(`The answered function has been called.`)
  timer.stop();
  // check if the answer is true or false
  if (guess === answerKey[questionIndex].ans) {
    console.log(`You answered correctly.`)
    // answered = false;
  }
  else  {
    console.log(`You answered incorrectly.`)
    // setTimeout(next(), 3000); // should execute next function in 3 seconds
    // answered = false;
  }

  if (questions.length > 0) {
    setTimeout(function(){ next(); }, 4000); // should execute next function in 3 seconds
  }

};

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

  //  answered check will matter once I add the count between questions (to say whether they got it right or wrong)
  // questions.length > 0 stops this once the last question has been taken out of the questions array
  // else if (timer.time > 0 && questions.length > 0) {
  //   answered = true;
  //   // timer.stop();
  //   console.log(`You clicked an answer!`);
  //   console.log(`answered is ${answered}.`);
  //   console.log(`-------------------------------`);
  //   checkAns();
  // }
  // else if (questions.length === 0) {
  //   // timer.stop();
  //   console.log(`You answered the last question!`);
  //   console.log(`-------------------------------`);
  //   checkAns();
  // }
});
  // questionIndex = $(".question").attr("id");
  // guess = this.id; // the id is a string and can't access the object

  // conditional to determine if it was 1-4, then select the corresponding
  // key value

  // this is comparing strings
  // right now this relies on the duplicate ans key in each part of the questions array
  // there should be a way to do it without the double answer and without having to compare strings
  // console.log(`Player chooses ${guess}.`)
  // if ($(`#${guess}`).text() === answerKey[questionIndex].ans) {
  //   console.log(`Wow! Player guessed correctly.`)
    // if player is right, display a message, and move to next question after short duration
  // }
  // else {
    // console.log(`Wrong.`)
    // if player is wrong, display a different message etc.
  // }


// function initialize() {
  // default variables
  // after a brief (.5s) pause, informs player about the game
  // and asks if they are ready
  // player has two options to reply, but both lead to the game starting
  // this is the first question/answer, but not part of the trivia count
// }

// function next() {
  // next question + answers load
  // question count ++ 
  // timer starts - call timer function

// }

// function countDown() {
  // timer-- 
// }


// EVENTS 