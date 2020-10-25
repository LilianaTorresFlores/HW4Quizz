$(document).ready(function(){
    var questions = [
        {
            text: "When was Taylor Swift born?",
            options: ["1989", "1994", "1990", "1987"],
            correct: "1989"
        },
        {
            text: "What's the name of Taylor Swifts' eighth studio album?",
            options: ["Lover", "Reputation", "Folklore", "Fearless"],
            correct: "Folklore"
        }
    ];

    var whichQuestion = 0;
    var score = 0;
    var timer = 40;
    var interval;

    function gameOver(){
        $("#questions").empty();
        clearInterval(interval);
        $("#end").show()
        $("#score").text(score);
    }

    function showQuestion(){
        if(whichQuestion >= questions.length){
            gameOver();
            return;
        }
        $("#questions").empty();
        var p = $("<p>");
        var textQuestion = questions[whichQuestion].text;
        p.text(textQuestion);
        p.appendTo("#questions");
        for(var option of questions[whichQuestion].options){
            var button = $("<button>");
            button.text(option);
            button.appendTo("#questions");
            if(option == questions[whichQuestion].correct){
                button.on("click", function(){
                    score = score + 1;
                    whichQuestion = whichQuestion + 1;
                    showQuestion();
                })
            }else{
                button.on("click", function(){
                    score = score - 1;
                    timer = timer - 10;
                    whichQuestion = whichQuestion + 1;
                    showQuestion();
                })
            }
        }
    }

    $("#start-button").on("click", function(){
        $("#start-button").hide();
        showQuestion();
        interval = setInterval(function(){
            timer = timer - 1;
            $("#timer").text(timer);
            if(timer == 0){
                gameOver();
            }
        }, 1000);
    })

    $("#button-save").on("click", function(){
        var name = $("#yourname").val();
        console.log(name,score);
        localStorage.setItem("score", score);
        localStorage.setItem("name", name);
        window.location = "high_scores.html";
    })
})