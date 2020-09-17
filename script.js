//create app object to hold all methods
const countdownApp = {};
// //trigger time interval countdown 
countdownApp.startTimer = function(selectedBreakTime){

    let minutesTime = 0;

    if (selectedBreakTime === 'break15'){
        minutesTime = 3;
        $('#minutes').text(minutesTime);
        console.log(minutesTime);

    } else if (selectedBreakTime === 'break30'){
        minutesTime = 30;
        $('#minutes').text(minutesTime);
        
    } else {
        minutesTime = 45;
        $('#minutes').text(minutesTime);
    }

    countdownApp.countingDown(minutesTime);
    console.log(minutesTime);
}
countdownApp.countingDown = function(minutes){

    console.log(minutes);

    if (minutes > 0) {
        minutes = minutes - 1
        $('#minutes').text(minutes);
    }

    let seconds = 5;
    const timer = setInterval(function () {

        if (seconds === 0 && minutes === 0 && hours === 0){
            $('body').addClass('red');
            setInterval(function(){
                location.reload();
            }, 5000)
            return;
        }
        console.log(seconds);
        seconds = seconds - 1;
        $('#seconds').text(seconds);

        
        if (seconds <= 0 && minutes > 0) {
            clearInterval(timer);
            countdownApp.countingDown(minutes);
        } else if (minutes <= 0 && seconds <= 0) {
            location.reload();
        }

        // console.log(minutes);
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