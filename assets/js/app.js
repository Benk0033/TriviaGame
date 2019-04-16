$(document).ready(function () {

    var numCorrect = 0;
    var numWrong = 0;
    var numUnanswered = 0;
    var intervalId;
    var timeRemaining = 30;
    var questionIndex = 0;
    var images = [
        "assets/images/broly.gif",
        "assets/images/SS3.gif",
        "assets/images/cooler.gif",
        "assets/images/gohan.gif"];
    var questions = [
        {
            question: "What is the name of the Legendary Super Saiyan?",
            choices: ["Goku", "Saibaman", "Broly", "Hercule"],
            answer: "Broly"
        },
        {
            question: "What color does a Saiyan's hair turn when they transform to a Super Saiyan?",
            choices: ["Black", "Pink", "Blonde", "Bald"],
            answer: "Blonde"
        },
        {
            question: "Which of these is Freiza's older brother?",
            choices: ["Fridgia", "King Cold", "Cooler", "Frost"],
            answer: "Cooler"
        },
        {
            question: "Who is Goku's Eldest son?",
            choices: ["Goten", "Gotenks", "Gohan", "Vegeta"],
            answer: "Gohan"
        }
    ];

    function renderQuestion() {
        run();
        $("#time-remaining").text("Time Remaining: 30");

        if (questionIndex <= questions.length - 1) {

            $("#question").html(questions[questionIndex].question)

            for (var i = 0; i < questions.length; i++) {
                var choices = questions[questionIndex].choices[i];
                var choiceBtn = $("<button>" + choices + "</button>");
                choiceBtn.attr({
                    "class": "choice",
                    "value": choices
                });
                $(".choices").append(choiceBtn);
            };
        }
        else {
            stop();
            $("#question").text("Game Over!");
            $(".choices").text("Correct Answers: " + numCorrect);
            $("#wrong-answer").text("Incorrect Answers: " + numWrong);
            $("#unanswered").text("Unanswered: " + numUnanswered);
            $("#restart").html("<button>Start Over</button>");
            questionIndex = 0;
            $("#restart").on("click", function () {
                $("#question, .choices, #wrong-answer, #unanswered, #restart").empty();
                renderQuestion();
                numCorrect = 0;
                numWrong = 0;
                numUnanswered = 0;
            });
        }

        $("#response").empty();
        $("#correct-answer").empty();

    };

    $("#start").on("click", function () {
        $("#start").remove("#start");
        renderQuestion();
    });

    $(document).on("click", ".choice", function () {
        var choiceval = $(this).attr("value");

        if (choiceval === questions[questionIndex].answer) {
            stop();
            displayCorrect();
            $("#response").text("Correct! You win a Dragon Ball!");
            numCorrect++
        }
        else {
            stop();
            displayCorrect();
            $("#response").text("Wrong!");
            $("#correct-answer").html("Correct answer is: " + questions[questionIndex - 1].answer);
            numWrong++
        }

        $(".choices").empty();

    });

    function displayCorrect() {
        $("#question").html("<img src=" + images[questionIndex] + " width='250px' height='250px'>");
        setTimeout(renderQuestion, 3000);
        $(".choices").empty();
        questionIndex++;
    };

    function run() {
        clearInterval(intervalId);
        intervalId = setInterval(decrement, 1000);
    };

    function decrement() {
        timeRemaining--;

        $("#time-remaining").html("Time Remaining: " + timeRemaining);

        if (timeRemaining === 0) {
            stop();
            displayCorrect();
            $("#response").text("Out of Time!");
            $("#correct-answer").html("Correct answer is: " + questions[questionIndex - 1].answer);
            $("#time-remaining").text("Time Remaining: 30");
            numUnanswered++
        };

    };

    function stop() {
        clearInterval(intervalId);
        timeRemaining = 30;
    };

});


