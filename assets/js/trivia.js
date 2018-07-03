$(document).ready(function () {
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
})


//   Array of Objects with questions, question options, and answers.
var trivia = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 30,
    timerOn: false,
    timerId: '',

    questions: {
        q1: 'Carmen Sandiego starts her trek in a capital of a country its citizens refer to as Nippon. Others may refer to this country as "The land of the Rising Sun". Where does she begin her run from the law?',
        q2: "Carmen Sandiego heads west from her first destination and is thought to be hiding in South Korea. She was spotted in Seoul and bolted southeast towards the country's second most populated city. Where did Carmen flee?",
        q3: 'From here, Carmen heads southwest to a nation which recently hosted a war during the mid 1950s to mid 1970s. Their flag consists of a yellow star in the center with a red background. Do you know where Carmen went?',
        q4: 'Carmen is heading further south to go island hopping in a nation with over 17,000 of them. She figures that she would be safe in the 4th most populated country. Unfortunately, she cannot stay long because she is out of Rupiahs. Do you know where Carmen is currently residing?',
        q5: 'Carmen is now headed west to a country without a formal or working government. Perhaps Carmen is planning on joining the pirates, or she plans on visiting the markets of Mogadishu where the movie Black Hawk Down was located. Where did Carmen head now?',
        q6: "After realizing that Carmen was halfway through her journey around the world, she decided to celebrate by watching the heralded soccer (or football) match between the USA and England in the 2010 World Cup. After leaving Rustenburg after the 1-1 draw, she headed for the nation's largest city (by metropolitan area). Where is she now?",
        q7: 'After having enough of soccer/football, Carmen developed a taste for global competition amongst more events. She decided to head to where the modern Olympics began, and later resumed in 2004. In what city is Carmen located?',
        q8: 'Carmen made a daring escape from the Olympics, and would have gotten off free had she not left a mysterious flag behind. This flag has a green rectangle on the left of a larger red one, with a yellow circle with a coat of arms just left of the center. The nation is part of the Iberian peninsula and has never won the World Cup to date. Where is she now?',
        q9: "Carmen is in the mood for a long walk on the beach, and decides to head to a country that was colonized by the nation she left, and that is well known for its beaches and owns one of the world's largest coastlines. She picked up her swimsuit and is relaxing on Copacabana beach. She is also in the largest lusophone country in the world. Where is Carmen visiting?",
    },
    options: {
        q1: ['Bangkok', 'Beijing', 'Tokyo', 'Seoul'],
        q2: ['Daegu', 'Gwangju', 'Incheon', 'Busan'],
        q3: ['China', 'Vietnam', 'North Korea', 'Myanmar'],
        q4: ['Indonesia', 'The Phillipines', 'Malaysia', 'Singapore'],
        q5: ['Ethiopia', 'Eritrea', 'Kenya', 'Somalia'],
        q6: ['Pretoria', 'Cape Town', 'Bloemfontein', 'Johannesburg'],
        q7: ['Athens', 'Thessaloniki', 'Corfu', 'Lamia'],
        q8: ['Spain', 'The Netherlands', 'Andorra', 'Portugal'],
        q9: ['Venezuela', 'Colombia', 'Argentina', 'Brazil'],
    },
    answers: {
        q1: 'Tokyo',
        q2: 'Busan',
        q3: 'Vietnam',
        q4: 'Indonesia',
        q5: 'Somalia',
        q6: 'Johannesburg',
        q7: 'Athens',
        q8: 'Portugal',
        q9: 'Brazil',
    },
    // code to start the game and track user choices
    startGame: function () {
        trivia.currentSet = 0;
        trivia.correct = 0;
        trivia.incorrect = 0;
        trivia.unanswered = 0;
        clearInterval(trivia.timerId);

        $('#game').show();

        $('#results').html('');

        $('#timer').text(trivia.timer);

        $('#start').hide();

        $('#remaining-time').show();

        trivia.nextQuestion();

    },
    //  find a way to cycle through questions
    nextQuestion: function () {

        trivia.timer = 30;
        $('#timer').removeClass('last-seconds');
        $('#timer').text(trivia.timer);

        if (!trivia.timerOn) {
            trivia.timerId = setInterval(trivia.timerRunning, 1000);
        }

        var questionContent = Object.values(trivia.questions)[trivia.currentSet];
        $('#question').text(questionContent);

        var questionOptions = Object.values(trivia.options)[trivia.currentSet];

        $.each(questionOptions, function (index, key) {
            $('#options').append($('<button class="option btn btn-info btn-lg">' + key + '</button>'));
        })

    },
    //   find a way show user time is running out
    timerRunning: function () {
        if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
            $('#timer').text(trivia.timer);
            trivia.timer--;
            if (trivia.timer === 9) {
                $('#timer').addClass('last-seconds');
            }
        }
        else if (trivia.timer === -1) {
            trivia.unanswered++;
            trivia.result = false;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 3000);
            $('#results').html('<h3>Times up! ' + Object.values(trivia.answers)[trivia.currentSet] + '</h3>');
        }
        else if (trivia.currentSet === Object.keys(trivia.questions).length) {

            $('#results')
                .html('<h3>Thanks for playing!</h3>' +
                    '<p>Correct: ' + trivia.correct + '</p>' +
                    '<p>Incorrect: ' + trivia.incorrect + '</p>' +
                    '<p>Unaswered: ' + trivia.unanswered + '</p>' +
                    '<p>Play again!</p>');

            $('#game').hide();

            $('#start').show();
        }

    },

    //   check users answers with correct answers.
    guessChecker: function () {

        var resultId;

        var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

        if ($(this).text() === currentAnswer) {
            $(this).addClass('btn-success').removeClass('btn-info');

            trivia.correct++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 3000);
            $('#results').html('<h3>Correct Answer!</h3>');
        }
        else {
            $(this).addClass('btn-danger').removeClass('btn-info');

            trivia.incorrect++;
            clearInterval(trivia.timerId);
            resultId = setTimeout(trivia.guessResult, 3000);
            $('#results').html('<h3>Better luck next time Gumshoe. ' + currentAnswer + '</h3>');
        }

    },
    guessResult: function () {

        trivia.currentSet++;

        $('.option').remove();
        $('#results h3').remove();

        trivia.nextQuestion();

    }

}