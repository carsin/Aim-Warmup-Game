var view = {
    height: undefined,
    width: undefined,
};

var playLoops = 0;
var score = 0;

$(document).ready(function() {
    $("#instruction-view").fadeIn("fast");
    
    $("#settings").hide();
    resizeWindow();
    $("#settings-button").click(function() {
        if ($("#settings-button").html() === "Click me to edit settings!") {
            $("#settings-button").html("Click me to close the settings!");
            $("#settings").show();
        } else {
            $("#settings-button").html("Click me to edit settings!");
            $("#settings").hide();
        }
    });

    $("#play").click(function() {
        var not = document.getElementsByName("numberOfTargets")[0].value;
        var td = document.getElementsByName("targetDuration")[0].value;
        var ts = document.getElementsByName("targetSize")[0].value;
        var ti = document.getElementsByName("targetInterval")[0].value;
        $("#instruction-view").fadeOut("fast", function() {
            $("#game-view").fadeIn("fast", function() {
                playLoops = 0;
                score = 0;
                playGame(not, td, ts, ti);
            });
        });
    });

    $(window).resize(resizeWindow);
});

function resizeWindow() {
    view.width = $(window).width();
    view.height = $(window).height();
    $("#game-view").height(view.height).width(view.width);
}

function playGame(numberOfTargets, targetDuration, targetSize, targetInterval) {
    var div = $("<div>");
    div.css("background-color", "black");
    div.css("width", targetSize + "px");
    div.css("height", targetSize + "px");

    var randomY = Math.random() * view.height - targetSize;
    var randomX = Math.random() * view.width - targetSize;
    
    if (randomY - targetSize < 0) randomY = targetSize;
    if (randomY + targetSize > view.height) randomY = view.height - targetSize;
    if (randomX - targetSize < 0) randomX = targetSize;
    if (randomX + targetSize > view.width) randomX = view.width - targetSize; 

    div.css("top", randomY + "px");
    div.css("left", randomX + "px");

    div.css("position", "absolute");

    $("#game-view").append(div);

    setTimeout(function() {
        div.remove();
    }, targetDuration);

    playLoops++;
    div.click(function() {
        score++;
        $("#score").html(score);
        div.remove();
    });

    $("#total-targets").html(playLoops);

    // Check if game is over
    if (playLoops < numberOfTargets) {
        setTimeout(function() {
            playGame(numberOfTargets, targetDuration, targetSize, targetInterval)
        }, targetInterval);
    }
}