var Possbible_Words = ["javascript", "glass", "amazing", "pancake"];

var word = "";
var guesses = "";

function newGame() {

    var randomIndex = parseInt(Math.random() * Possbible_Words.length);
    word = Possbible_Words[randomIndex];
    guesses = "";
    updatePage();
}
function guessLetter() {
    var input = document.getElementById("guess");
    var letter = input.value;
    guesses += letter;
    updatePage();
}
function updatePage() {

    var clueString = "";
    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);
        if (guesses.indexOf(currentLetter) >= 0) {
            clueString += currentLetter + " ";
        }
        else
            clueString += "_";
    }

    var clue = document.getElementById("clue");
    clue.innerHTML = clueString;

    var guessArea = document.getElementById("guesses");
    guessArea.innerHTML = "Guesses: " + guesses;


}

