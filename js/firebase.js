var firebaseConfig = {
    apiKey: "AIzaSyDIgxhp9wXm7EeVtlFdb8yLxbu_1RbYvwg",
    authDomain: "savetheforest-2cbcf.firebaseapp.com",
    databaseURL: "https://savetheforest-2cbcf.firebaseio.com",
    projectId: "savetheforest-2cbcf",
    storageBucket: "savetheforest-2cbcf.appspot.com",
    messagingSenderId: "115454159169",
    appId: "1:115454159169:web:e326338b8258298d"
  };

firebase.initializeApp(firebaseConfig);
var database = firebase.database();

var ref = database.ref("scores/");

function loaded() {

  var table = document.getElementById("scoreTable");

  var highScoreMin;

  ref.orderByChild("metrics/count").limitToFirst(5).on(
    "value",
    function(snap) {

      // console.log("---Names sorted from highest score to lowest: ");
      // console.log(snap);

      snap.forEach(function(snap) {

        let currentScore = JSON.stringify(snap.val().metrics.count) * -1;

        let name = JSON.stringify(snap.val().name);

        table.innerHTML += "<li>NAME: " + name.substring(1, name.length - 1); + "</li>";
        table.innerHTML += "<li>SCORE: " + currentScore + "</li>";

        //Assigns final value in the table (ie the lowest high score value) to the highScoreMin variable.
        highScoreMin = currentScore;

      });

      

    });
    
  }
