//THE CODE

// //event listener for when the user chooses a mood from a dropdown menu
// //store the information in a variable and pass it as a agurment into the api call
// app.userSelection = function () { };

// //make ajax request and return the inspirational quote based on user's selection
// app.ajaxCall = function (mood) { };

// //display quote to the page
// //display a "pick another mood" button allowing the user to select another mood and try again 
// app.displayQuote = function () { };

// //set time interval to countdown and ".html()" the number based on user selection
// app.clock = function () { };

// //display a "times up" alert for when the countdown timer is up
// app.timesUp = function () { };


//create app object to hold all methods
const countdownApp = {};


// //trigger time interval countdown 
countdownApp.startTimer = function(selectedBreakTime){


    if (selectedBreakTime === 'break15'){

        let minutes = 14;
       
        $('#minutes').text(minutes);
        
        

    } else if (selectedBreakTime === 'break30'){

        let minutes = 30;
    
        $('#minutes').text(minutes);

    } else {

        let minutes = 45;
    
        $('#minutes').text(minutes);
       

    }
    countdownApp.countingDown(minutes);
}

countdownApp.countingDown = function(){

    let seconds = 59;

   
   const timer = setInterval(function (minutes) {
       seconds = seconds - 1;
       $('#seconds').text(seconds);
       console.log(seconds);

       if (seconds <= 0 && minutes > 0) {
           clearInterval(timer);
           countingDown();
        }

    }, 1000)
   


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
    })
}

//init function that kicks off the app
countdownApp.init = function () { 
    $('main').hide();
    // console.log('yay');
    countdownApp.changeScreen();

};

//document ready function
$(function () { 
    
    // console.log('hello');
    countdownApp.init();

});
