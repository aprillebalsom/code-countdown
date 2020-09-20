//create app object to hold all methods
const countdownApp = {};

//empty array for storing quote objects returned by API allowing radomizer function to select a quote at random to append to the page
countdownApp.randomQuotesArray = [];

// set the time for the interval countdown based on user's selected break time
countdownApp.startTimer = function(selectedBreakTime){

    let minutesTime = 0;

    if (selectedBreakTime === 'break15'){

        minutesTime = 15;
        $('#minutes').text(minutesTime);
        $('#seconds').text('00');
        // console.log(minutesTime);

    } else if (selectedBreakTime === 'break30'){

        minutesTime = 30;
        $('#minutes').text(minutesTime);
        $('#seconds').text('00');
        
    } else {

        minutesTime = 45;
        $('#minutes').text(minutesTime);
        $('#seconds').text('00');
    }

    countdownApp.countingDown(minutesTime);
    // console.log(minutesTime);
}

//begin set interval timer and start counting break down 
countdownApp.countingDown = function(minutes){

    // console.log(minutes);

    if (minutes > 0) {
        minutes = minutes - 1
        $('#minutes').text(minutes);
    }

    let seconds = 14;
    const timer = setInterval(function () {

        if (seconds <= 10) {
            $('#additionalInteger').text(0);

        } else if (seconds >= 10) {
            $('#additionalInteger').empty();
            
        }

        seconds = seconds - 1;
        $('#seconds').text(seconds);

        if (seconds <= 0 && minutes > 0) {

            //when the seconds get to 0, run the function again
            clearInterval(timer);
            countdownApp.countingDown(minutes);

        } else if (minutes <= 0 && seconds <= 0) {

            //once time is up, alert the user that break is over
            //reload to original page
            alert(`time's up, back to coding`);
            location.reload();

        }

        //TODO - make error handling for 0 minutes and 0 seconds, skip it

    }, 1000)
}

//on click, reload page to allow user to select new break time
countdownApp.changeBreak = function(){

    $('#changeBreak').on('click', function(){

        location.reload();
    });
}

countdownApp.getQuotes = function(query) {
    $.ajax({
        url: `https://quote-garden.herokuapp.com/api/v2/genre/${query}?page=1&limit=270`,
    method: 'GET',
    dataType: 'JSON',
    }).then(function(result){
        // console.log(result); 
        countdownApp.randomQuotes(result)
    })
}

countdownApp.randomQuotes = function (quoteResults) {

    const returnedQuotes = quoteResults.message
    const mood = $('option:selected').val();

    for (let i = 0; i < quoteResults.quotes.length; i++) {

        if (`Quotes in ${mood} genre` === returnedQuotes) {

            const selectedQuote = quoteResults.quotes[i];

            countdownApp.randomQuotesArray.push(selectedQuote);

        } 
    }
    // console.log(countdownApp.randomQuotesArray);
    // countdownApp.randomizer(countdownApp.randomQuotesArray);

}


//pick a random quote from the random quotes array
//if user clicks on another quote button, run the randomizer function again and select a new quote of the same genre
//call the display function
countdownApp.randomizer = function (array) {

    const selectedRandomQuote = Math.floor(Math.random() * array.length);
    $('.appendedQuotes').empty();

    countdownApp.displayQuotes(array[selectedRandomQuote]);

    console.log(array[selectedRandomQuote].quoteGenre);
    // $('#anotherQuote').on('click', function (event) {

        // countdownApp.randomizer(countdownApp.randomQuotesArray);

    //     $('.appendedQuotes').empty();
    //     countdownApp.displayQuotes(array[selectedRandomQuote]);
    // });

}

// get random quote every 15 seconds from the same genre the user has selected
// countdownApp.switchQuotes = function() {

//     setInterval(function () {
//         countdownApp.randomizer(countdownApp.randomQuotesArray);
//     }, 5000) 

// }



//display the quote on the page
countdownApp.displayQuotes = function(selectedQuote){

    const quoteP = $('<p>').text(`"${selectedQuote.quoteText}"`);
    const authorP = $('<p>').text(`-${selectedQuote.quoteAuthor}`).addClass('author');
    $('.appendedQuotes').append(quoteP, authorP);


}

//listen for the user to "select" an option from the drop down menu
//one it is selected, take the option's value and store it in a variable
//then pass the variable in as an argument to the get quotes function 
countdownApp.getSelectValue = function(){

    $('select').on('change', function (){

        const mood = $('option:selected').val();
        countdownApp.randomQuotesArray = [];
        
        // countdownApp.switchQuotes();
        clearInterval(countdownApp.switchQuotes);
        countdownApp.switchQuotes = setInterval(function () {
            countdownApp.randomizer(countdownApp.randomQuotesArray)
        }, 10000);

        $('.appendedQuotes').empty();
        countdownApp.getQuotes(mood);

    });

}

// three - when a user clicks on one of the break buttons, change to main screen 
countdownApp.changeScreen = function(){

    //when a break button is clicked
    $('.breakStart').on('click', function (event) {

        $('header').hide();
        $('main').show();
        const userBreakChoice = $(this).attr('id');

        countdownApp.startTimer(userBreakChoice);
        countdownApp.changeBreak();
        countdownApp.getSelectValue(countdownApp.mood);
    })
}

//two - init function that kicks off the app
countdownApp.init = function () { 
    $('main').hide();
    countdownApp.changeScreen();

};

//one - document ready function
$(function () { 
    countdownApp.init();
});