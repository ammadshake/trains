
var config = {
    apiKey: "AIzaSyDPjS5vXDaE2FRB2qWK68P8z9E1Zkiwm4s",
    authDomain: "trains-13e97.firebaseapp.com",
    databaseURL: "https://trains-13e97.firebaseio.com",
    projectId: "trains-13e97",
    storageBucket: "trains-13e97.appspot.com",
    messagingSenderId: "842448501137"
};

firebase.initializeApp(config);

var scheduleData = firebase.database();

$(document).ready(function(){

    $("#submit").on("click", function(){

        
        var trainName = $("#trainNameInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var firstTrain = moment($("#trainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequencyInput").val().trim();

        
        var trainInfo = {
            name:  trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency
        };

        
        scheduleData.ref().push(trainInfo);

        console.log(trainInfo.name);
        console.log(trainInfo.destination); 
        console.log(firstTrain);
        console.log(trainInfo.frequency)

        
        
        $("#trainNameInput").val("");
        $("#destinationInput").val("");
        $("#trainInput").val("");
        $("#frequencyInput").val("");

        

        return false;
    });


    
    scheduleData.ref().on("child_added", function(childSnapshot, prevChildKey){

        console.log(childSnapshot.val());

        
        var fireName = childSnapshot.val().name;
        var fireDestination = childSnapshot.val().destination;
        var fireFrequency = childSnapshot.val().frequency;
        var fireFirstTrain = childSnapshot.val().firstTrain;

        
        var differenceTimes = moment().diff(moment.unix(fireFirstTrain), "minutes");
        var remainder = moment().diff(moment.unix(fireFirstTrain), "minutes") % fireFrequency ;
        var minutes = fireFrequency - remainder;

        var arrival = moment().add(minutes, "m").format("hh:mm A"); 
        console.log(minutes);
        console.log(arrival);

        console.log(moment().format("hh:mm A"));
        console.log(arrival);
        console.log(moment().format("X"));

        
        $("#trainSchedule > tbody").append("<tr><td>" + fireName + "</td><td>" + fireDestination + "</td><td>" + fireFrequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

    });
});