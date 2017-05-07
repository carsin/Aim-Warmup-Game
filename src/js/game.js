var view = {
    height: undefined,
    width: undefined,
};

var playLoops;

$(document).ready(function() {
    $("#instruction-view").fadeIn("fast");
    
    $("#settings").hide();

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
    $("#game-view").empty();

    // Check if game is over
    playLoops++;
    if (playLoops <= numberOfTargets) {
        setTimeout(playGame(numberOfTargets, targetDuration, targetSize, targetInterval), targetInterval);
    }
}