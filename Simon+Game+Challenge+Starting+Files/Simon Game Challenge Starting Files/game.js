var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern =[];//game pattern a one by one push hoitese so first level a ekta then 2 ta and so on and so forth (important)
var userClickedPattern = [];

var gameStart= false;
var level=0;

$(document).on('keydown', function(){
    if(!gameStart){
        $('#level-title').text('Level '+ level);
        nextSequence();
        gameStart=true;
    }
    
   
   
})

$('.btn').on('click',function () {
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatedPress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
 })

 function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        console.log('success');
        if(userClickedPattern.length==gamePattern.length){
            setTimeout(function() {
               nextSequence();
            }, 1000);

        }
    }
    else {
        console.log("wrong");   
        playSound("wrong");
        $("body").addClass('game-over');
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $('#level-title').text('Game over, Press Any key to restart');
        startOver();
    }
    
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level '+ level);
    var randomNumber=Math.floor(Math.random() * 4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $('#'+randomChosenColour).fadeIn('100').fadeOut('100').fadeIn('100');
    playSound(randomChosenColour);
    
}

function playSound(name) {
    var audio = new Audio('./sounds/'+name+'.mp3');
    audio.play();
  
    
}
function animatedPress(currentColour) {
   
    $('#'+currentColour).addClass("pressed");

    setTimeout(function() {
        $('#'+currentColour).removeClass("pressed");
    }, 100);

    
}



function startOver() {
     gameStart= false;
     level=0;
     gamePattern =[];
}
