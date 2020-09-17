//create app object to hold all methods
const countdownApp = {};
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

    let seconds = 59;
    const timer = setInterval(function () {

        if (seconds === 0 && minutes === 0 && hours === 0){
            $('body').addClass('red');
            setInterval(function(){
                location.reload();
            }, 5000)
            return;
        }
        // console.log(seconds);
        seconds = seconds - 1;
        $('#seconds').text(seconds);

        
        if (seconds <= 0 && minutes > 0) {
            clearInterval(timer);
            countdownApp.countingDown(minutes);
        } else if (minutes <= 0 && seconds <= 0) {
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
    url: `https://quote-garden.herokuapp.com/api/v2/genre/${query}?page=1&limit=10`,
    method: 'GET',
    dataType: 'JSON',
    // data: {
        // genreName: query
        
    // } 
    }).then(function(result){
        console.log(result);
    })
}
countdownApp.getSelectValue = function(){

    $('select').on('change', function(){

        const mood = $('option:selected').val();
        countdownApp.getQuotes(mood);
        console.log(mood);

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
        countdownApp.getSelectValue();
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