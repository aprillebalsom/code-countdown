//create app object to hold all methods
const countdownApp = {};

// //GLOBAL VARIABLE
// countdownApp.mood = $('option:selected').val();

// //trigger time interval countdown 
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


countdownApp.countingDown = function(minutes){

    // console.log(minutes);

    if (minutes > 0) {
        minutes = minutes - 1
        $('#minutes').text(minutes);
    }

    let seconds = 60;
    const timer = setInterval(function () {

        // if (seconds === 0 && minutes === 0 && hours === 0){
        //     setInterval(function(){
        //         location.reload();
        //     }, 5000)
        //     return;
        // }
        // console.log(seconds);
        seconds = seconds - 1;
        $('#seconds').text(seconds);

        if (seconds <= 0 && minutes > 0) {
            clearInterval(timer);
            countdownApp.countingDown(minutes);
        } else if (minutes <= 0 && seconds <= 0) {
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
        url: `https://quote-garden.herokuapp.com/api/v2/genre/${query}?page=1&limit=5`,
    method: 'GET',
    dataType: 'JSON',
    }).then(function(result){
        console.log(result);
        // countdownApp.displayQuotes(result)
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
            // console.log(countdownApp.randomQuotesArray);
            
            // const theQuote = randomizer(countdownApp.randomQuotesArray);
            // console.log(theQuote);
    
        } else {
            console.log('error');
        }


    }

    randomizer(countdownApp.randomQuotesArray);
   
}

function randomizer (array) {
    // Generate random number withihn the range of indexes in my array
    const selectedRandomQuote = Math.floor(Math.random() * array.length);
    console.log(array[selectedRandomQuote]);
   
    // countdownApp.displayQuotes(array[selectRandomQuote])
}


countdownApp.displayQuotes = function(quoteResults){

    const p = $('<p>').text(`"${selectedQuote}"`);

    $('.appendedQuotes').append(p);
}

//listen for the user to "select" an option from the drop down menu
//one it is selected, take the option's value and store it in a variable
//then pass the variable in as an argument to the get quotes function 
countdownApp.getSelectValue = function(){

    $('select').on('change', function (){

        const mood = $('option:selected').val();
        $('.appendedQuotes').empty();
        countdownApp.getQuotes(mood);
        // console.log(mood);

    });

}
    
// on click of the break button, change to computer screen 
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
        countdownApp.getSelectValue(countdownApp.mood );
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