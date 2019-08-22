// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDjeS0NIP8lyi7LCudzvRZUikrydWuEeXs",
    authDomain: "train-app-fc628.firebaseapp.com",
    databaseURL: "https://train-app-fc628.firebaseio.com",
    projectId: "train-app-fc628",
    storageBucket: "",
    messagingSenderId: "640289533967",
    appId: "1:640289533967:web:2553bb5315e575f3"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//1. create the variables that I need to capture
var trainName= "";
var destination= "";
var trainTime;
var frequency;

// firebase variable read or write
var database = firebase.database();

//2. capture the user inputs from the form
$("#submit-btn").on("click", function (event)
{
    event.preventDefault();
    function userInput()
    {
        trainName = $("#trainName").val().trim()
        destination = $("#destination").val().trim()
        trainTime = $("#trainTime").val().trim()
        frequency = $("#frequency").val().trim()
        
        //Calculate the time of the train
        function nextTrain (trainTime, frequency)
        {
            var tTime = moment(trainTime, "HH:mm")
            var currentTime= moment()
            var differenceInMinutes =currentTime.diff(tTime,"minutes");
    
            var reminder=differenceInMinutes%frequency;
            
            var minutesToCompleteFrequency=frequency-reminder;

            var nextTrain=currentTime.add(minutesToCompleteFrequency,"minutes").format("HH:mm");
            return nextTrain
        }
        
        //Calculates the minute difference
        function minutes (trainTime, frequency)
        {
            var tTime = moment(trainTime, "HH:mm")
            var currentTime= moment()
            var differenceInMinutes =currentTime.diff(tTime,"minutes");
            var minutes=differenceInMinutes%frequency;
            return minutes
        }
        
        //store the calculation in variables
        var nextArrival = nextTrain(trainTime,frequency)
        var minutesAway = minutes(trainTime,frequency)

        //set the values for the firebase database
        var trains = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency,
            nextArrival: nextArrival,
            minutesAway: minutesAway,
        }
        database.ref().push(trains)

        // Clears all of the text-boxes
          $("#trainName").val("");
          $("#destination").val("");
          $("#trainTime").val("");
          $("#frequency").val("");

        alert("Train successfully added");

        console.log(trainTime)// WORKS to grab user input
    }
    userInput()
})

//2. push content to the table
database.ref().on("child_added", function(snapshot){
    console.log(snapshot.val());
    var tName = snapshot.val().trainName;
    var tDestination = snapshot.val().destination;
    var tFrequency = snapshot.val().frequency;
    var nextArrival= snapshot.val().nextArrival;
    var minutesAway= snapshot.val().minutesAway;

tableInput(tName, tDestination, tFrequency, nextArrival, minutesAway)
})

function tableInput(trainName, destination, frequency, nextArrival, minutesAway)
{
    $(".tBody").append('<tr><td>'+trainName+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>')
}
