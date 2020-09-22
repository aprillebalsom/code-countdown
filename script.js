//create app object to hold everything
const countdownApp = {};

//empty array for storing quote objects returned by API allowing randomizer function to select a quote at random and append it to the page
countdownApp.randomQuotesArray = [];


// three - when a user clicks on one of the break buttons, change to main screen 
countdownApp.changeScreen = function() {

    //when a break button is clicked
    $('.breakStart').on('click', function() {

        $('header').hide();
        $('main').show();
        const userBreakChoice = $(this).attr('id');

        countdownApp.startTimer(userBreakChoice);
        countdownApp.changeBreak();
        countdownApp.getSelectValue(countdownApp.mood);
    })
}

// four - set the time for the interval countdown based on user's selected break time
countdownApp.startTimer = function(selectedBreakTime){

    let minutesTime = 0;

    if (selectedBreakTime === 'break15'){

        minutesTime = 15;
        $('#minutes').text(minutesTime);
        $('#seconds').text('59');

    } else if (selectedBreakTime === 'break30'){

        minutesTime = 30;
        $('#minutes').text(minutesTime);
        $('#seconds').text('59');
        
    } else {

        minutesTime = 45;
        $('#minutes').text(minutesTime);
        $('#seconds').text('59');
    }

    countdownApp.countingDown(minutesTime);
}

// five - begin set interval timer and start counting the selected breaktime down 
countdownApp.countingDown = function(minutes){

    if (minutes > 0) {
        minutes = minutes - 1;
        $('#minutes').text(minutes);
    }

    let seconds = 60;
    const timer = setInterval(function() {

        if (seconds <= 10) {

            $('#additionalInteger').text(0);

        } else if (seconds >= 10) {

            $('#additionalInteger').empty();
            
        }

        seconds = seconds - 1;
        $('#seconds').text(seconds);

        if (seconds <= 0 && minutes > 0) {

            //when the seconds get to 0, run the counting down function again
            clearInterval(timer);
            countdownApp.countingDown(minutes);

        } else if (minutes <= 0 && seconds <= 0) {

            $('#seconds').text('0');

            //once time is up, alert the user that break is over
            //reload to original page
            $('.modal').addClass('unhide');
           
            //event listener waiting for the user to click the okay button to reload the page
            $('.closeModal').on('click', function(){
                location.reload();
            });
        }

    }, 1000);
};

// six - on click, reload page to allow the user to select new break time
countdownApp.changeBreak = function(){

    $('#changeBreak').on('click', function(){

        location.reload();
    });
};

// seven - listen for the user to "select" an option from the drop down menu
//once it is selected, take the option's value and store it in a variable
//then pass the variable in as an argument to the get quotes function 
countdownApp.getSelectValue = function() {

    $('select').on('change', function() {

        const mood = $('option:selected').val();

        countdownApp.randomQuotesArray = [];

        $('.appendedQuotes').empty();
        countdownApp.getQuotes(mood);

        // get random quote every 10 seconds from the same genre the user has selected
        clearInterval(countdownApp.switchQuotes);
        countdownApp.switchQuotes = setInterval(function() {
            countdownApp.randomizer(countdownApp.randomQuotesArray)
        }, 10000);
    });

};

// eight - make the ajax call to the API and pass the results into the randomQuotes function
countdownApp.getQuotes = function(query) {
    $.ajax({
        url: `https://quote-garden.herokuapp.com/api/v2/genre/${query}?page=1&limit=270`,
    method: 'GET',
    dataType: 'JSON',
    }).then(function(result){

        countdownApp.randomQuotes(result);

    });
};

//nine - match the user's selection to the API call results
//then push the matching results into the random quotes array, so a quote can be selected at random
countdownApp.randomQuotes = function (quoteResults) {

    const returnedQuotes = quoteResults.message;
    const mood = $('option:selected').val();

    for (let i = 0; i < quoteResults.quotes.length; i++) {

        if (`Quotes in ${mood} genre` === returnedQuotes) {

            const selectedQuote = quoteResults.quotes[i];

            countdownApp.randomQuotesArray.push(selectedQuote);
        } 
    }
    
    countdownApp.randomizer(countdownApp.randomQuotesArray);

};


//ten - pick a random quote from the random quotes array
//call the display function to display it on the page
countdownApp.randomizer = function(array) {

    const selectedRandomQuote = Math.floor(Math.random() * array.length);
    $('.appendedQuotes').empty();

    countdownApp.displayQuotes(array[selectedRandomQuote]);
}

//eleven - display the random quote on the page accompanied by its author
countdownApp.displayQuotes = function(selectedQuote){

    const quoteP = $('<p>').text(`"${selectedQuote.quoteText}"`);
    const authorP = $('<p>').text(`-${selectedQuote.quoteAuthor}`).addClass('author');
    $('.appendedQuotes').append(quoteP, authorP);

};

//two - init function that kicks off the app
countdownApp.init = function () { 

    $('main').hide();
    countdownApp.changeScreen();

};

//one - document ready function
$(function () { 

    countdownApp.init();

});
