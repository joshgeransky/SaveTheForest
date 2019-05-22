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

// The lowest value stored on the high score table.
var highScoreMin = 0;
// The number of high score places currently being displayed.
var highScoreCount;
// The maximum number of places the high score table will display.
var highScorePlaces = 5;

function loaded() {

var table = document.getElementById("scoreTable");

  ref.orderByChild("metrics/count").limitToFirst(highScorePlaces).on(
    "value",
    function(snap) {

      $('#scoreTable').empty();

      highScoreCount = 0;

      let innerTable = "<tr><th colspan='2'>HIGHSCORES</th></tr>"

      snap.forEach(function(snap) {

        highScoreCount++;

        innerTable += "<tr>";

        let currentScore = JSON.stringify(snap.val().metrics.count) * -1;

        let name = JSON.stringify(snap.val().name);

        innerTable += "<td>" + name.substring(1, name.length - 1); + "</td>";
        innerTable += "<td>" + currentScore + "</td>";

        innerTable += "</tr>";

      // Assigns final value in the table (ie the lowest high score value) to the highScoreMin variable.
        highScoreMin = currentScore;

    });

    table.innerHTML += innerTable;

  });
  
}

