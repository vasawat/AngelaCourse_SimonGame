
var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];
var userChosenColour = "" ;
var level = 0 ;
var start = false ;

function nextSequence (randomNumber) {
  level++;
  $("#level-title").text("Level" + " " + level);
  userClickedPattern = [];
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  sounds(randomChosenColour);
  animatePress(randomChosenColour);
}

$(".btn").on("click",(function () {
    userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    sounds (userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
);

function sounds (namesound) {
    var audio = new Audio ("sounds/" + namesound + ".mp3") ;
    audio.play();
}

$(document).keypress(function () {
    if (!start) {
        $("#level-title").text("Level " + level);
        nextSequence();
        start = true;
      }
})

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
  }

function checkAnswer (currentlevel) {
    if (gamePattern[currentlevel] === userClickedPattern[currentlevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function () {
                nextSequence();
            },1000);
        }
    } 
    else  {
      sounds("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
      gameover();
    }
}
function gameover() {
    gamePattern = [];
    level = 0 ;
    start = false ;
}