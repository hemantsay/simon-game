
var gamePattern = [];
const buttonColours = ["red","blue","green","yellow"];


var userClickedPattern = [];
var level =0;
var keyPressed = false;

function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level)
    
    const randomNumber = Math.floor(Math.random()*4);

    
    const randomChosenColour = buttonColours[randomNumber] ;

    gamePattern.push(randomChosenColour);
    
    

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}




function playSound(name){
    var audio = new Audio("./sounds/"+ name +".mp3");
    audio.play();
}


// user click by button 

$(".btn").click(function(){
    var userChoosenColour = $(this).attr("id");
    userClickedPattern.push(userChoosenColour);

    
    playSound(userChoosenColour);
    animatePress(userChoosenColour);

    checkAnswer(userClickedPattern.length-1);


})


function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
    }, 100);

}



$(document).keypress(function(){
    if(!keyPressed){
        $("#level-title").text("Level "+ level);
        nextSequence();
        keyPressed = true;
    }
});


function checkAnswer(currentLevel){
    
    if(gamePattern[currentLevel]=== userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){

                nextSequence();
                
                
            }, 1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 200);

        startOver();



    }
}


function startOver() {
    level = 0;
    gamePattern = [];
    keyPressed = false;
  }
  