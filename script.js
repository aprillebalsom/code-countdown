//create app object to hold all methods
const countdownApp = {};


// set the time for the interval countdown based on user's selected break time
countdownApp.startTimer = function(selectedBreakTime){

    let minutesTime = 0;

    if (selectedBreakTime === 'break15'){

        minutesTime = 15;
        $('#minutes').text(minutesTime);
        // console.log(minutesTime);

    } else if (selectedBreakTime === 'break30'){

        minutesTime = 30;
        $('#minutes').text(minutesTime);
        
    } else {

        minutesTime = 45;
        $('#minutes').text(minutesTime);
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

    let seconds = 60;
    const timer = setInterval(function () {

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
        //TODO - fix the seconds when less than 10, theres a 0 in front

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
        console.log(result);

        countdownApp.randomQuotes(result)
    })
}

countdownApp.randomQuotesArray = [];

countdownApp.randomQuotes = function (quoteResults) {

    const returnedQuotes = quoteResults.message
    const mood = $('option:selected').val();

    for (let i = 0; i < quoteResults.quotes.length; i++) {

        if (`Quotes in ${mood} genre` === returnedQuotes) {

            const selectedQuote = quoteResults.quotes[i].quoteText;
            
            countdownApp.randomQuotesArray.push(selectedQuote);

        } else {
            console.log('error');
        }
    }
    console.log(countdownApp.randomQuotesArray);
    countdownApp.randomizer(countdownApp.randomQuotesArray);
}


//pick a random quote from the random quotes array
//if user clicks on another quote button, run the randomizer function again and select a new quote of the same genre
//call the display function
countdownApp.randomizer = function (array) {

    const selectedRandomQuote = Math.floor(Math.random() * array.length);
    $('.appendedQuotes').empty();

    countdownApp.displayQuotes(array[selectedRandomQuote]);

    console.log(array[selectedRandomQuote]);

    // $('#anotherQuote').on('click', function (event) {

    //     countdownApp.randomizer(countdownApp.randomQuotesArray);

    //     $('.appendedQuotes').empty();
    //     countdownApp.displayQuotes(array[selectedRandomQuote]);
    // });

}

// get random quote every 15 seconds from the same genre the user has selected
countdownApp.switchQuotes = function() {
    setInterval(function () {
        countdownApp.randomizer(countdownApp.randomQuotesArray);
    }, 5000) 
}


//display the quote on the page
countdownApp.displayQuotes = function(selectedQuote){

    const p = $('<p>').text(`"${selectedQuote}"`);
    $('.appendedQuotes').append(p);
}

//listen for the user to "select" an option from the drop down menu
//one it is selected, take the option's value and store it in a variable
//then pass the variable in as an argument to the get quotes function 
countdownApp.getSelectValue = function(){

    $('select').on('change', function (){

        const mood = $('option:selected').val();
        countdownApp.randomQuotesArray = [];

        countdownApp.switchQuotes();

        $('.appendedQuotes').empty();
        countdownApp.getQuotes(mood);
        // console.log(mood);

    });

}

// on click of the break button, change to main screen 
countdownApp.changeScreen = function(){

    //when a break button is clicked
    $('.breakStart').on('click', function (event) {
        // console.log('works');
        $('header').hide();
        $('main').show();
        const userBreakChoice = $(this).attr('id');
        // console.log(this);
        countdownApp.startTimer(userBreakChoice);
        countdownApp.changeBreak();
        countdownApp.getSelectValue(countdownApp.mood);
    })
}

//init function that kicks off the app
countdownApp.init = function () { 
    $('main').hide();
    // console.log('yay');
    countdownApp.changeScreen();
    // console.log(countdownApp.mood);

};

//document ready function
$(function () { 
    // console.log('hello');
    countdownApp.init();
});