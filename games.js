var gamePattern = []
var userClickedPattern = []

var level = 0

buttonColours = ["red", "blue", "green", "yellow"]

function nextSequence() {
    var randomNumber = Math.round((Math.random() * 3))
    let randomChosenColour = buttonColours[randomNumber]
    gamePattern.push(randomChosenColour)
    playSound(randomChosenColour)
    level = level + 1
    $("h1").text("Level " + level)
}


$(document).on("keydown", (event) => {
    if (level === 0) {
        nextSequence()
    }
})


$(".btn").on("click", function(event) {
    var userChosenColour = event.target.id
    userClickedPattern.push(userChosenColour)
    animatePress(event.target.id)
    playSound(event.target.id)
    checkAnswer(gamePattern, userClickedPattern)
})

function playSound(name) {
        $("#" + name).fadeOut(100).fadeIn(100);
        const colorNoise = new Audio("sounds/" + name + ".mp3")
        colorNoise.play()
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed")
    setTimeout(function(){$("#" + currentColour).removeClass("pressed"); }, 100)
}

function checkAnswer(gameP, userClickedP) {
    if (gameP.length === userClickedP.length && gameP.toString() === userClickedP.toString()){
        setTimeout(function() {nextSequence()}, 1000)
        userClickedPattern = []
    } 
    else if (gameP.slice(0, userClickedP.length).toString() !== userClickedP.slice(0, userClickedP.length).toString()) {
        const lostGame = new Audio("sounds/wrong.mp3")
        lostGame.play()
        gamePattern = []
        userClickedPattern = []
        level = 0
        $("body").addClass("game-over")
        $("h1").text("Game Over, Press Any Key to Restart")
        setTimeout(function() {
            $("body").removeClass("game-over")
        }, 250)
    }
}
