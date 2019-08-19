// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyC9RdiLNOSjRHrJEhV_aM7xqt5rCCKS4pY",
    authDomain: "train-app-f3447.firebaseapp.com",
    databaseURL: "https://train-app-f3447.firebaseio.com",
    projectId: "train-app-f3447",
    storageBucket: "train-app-f3447.appspot.com",
    messagingSenderId: "564976029877",
    appId: "1:564976029877:web:e5bac2220811679f"
    };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//1. create the variables that I need to capture
var trainName= "";
var destination= "";
var trainTime;
var frequency;
// table row count variable
var row=1;
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
        function minutes (trainTime, frequency)
        {
            var tTime = moment(trainTime, "HH:mm")
            var currentTime= moment()
            var differenceInMinutes =currentTime.diff(tTime,"minutes");
            var minutes=differenceInMinutes%frequency;
            return minutes
        }
        console.log(nextTrain(trainTime,frequency));
        console.log(minutes(trainTime,frequency));
        var nextArrival = nextTrain(trainTime,frequency)
        var minutesAway = minutes(trainTime,frequency)
        tableInput(trainName, destination, frequency, nextArrival, minutesAway)

        var trains = {
            trainName: trainName,
            destination: destination,
            trainTime: trainTime,
            frequency: frequency
        }
        database.ref(/).set(trains)
        database.ref().on("value", function(snapshot){
            console.log(snapshot.val())
        })
        console.log(trainTime)// WORKS to grab user input
    }
    userInput()
})

//2. push content to the table
function tableInput(trainName, destination, frequency, nextArrival, minutesAway)
{
    $(".tBody").append('<tr><td>'+trainName+'</td><td>'+destination+'</td><td>'+frequency+'</td><td>'+nextArrival+'</td><td>'+minutesAway+'</td></tr>')
}


// function CreatTrain (name, destination, trainTime, frequency)
// {
//     this.name=name;
//     this.destination=destination;
//     this.trainTime=trainTime;
//     this.frequency=frequency;
// }

// var train1 = new CreatTrain ("bob", "orlando", 9, 120)
// var train2 = new CreatTrain("carmen", "tampa", 12, 60)