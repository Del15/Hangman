// random word list for the hangman game
var Possible_Words = ["javascript", "glass", "amazing", "pancake", "programming", "google", "developer", "apple", "python", "computer", "vault", "wizard",
    "galaxy", "notebook", "keyboard", "route", "monitor", "laptop", "headphones", "charger", "internet"];

var word = ""; // word being guessed
var guesses = ""; // this is where the guessed letters are stored
var gameOver = false; //this is able to track if the game has ended

// this fcuntion starts a new game

function newGame() {
    // grabs a random word from the list 
    var randomIndex = parseInt(Math.random() * Possible_Words.length);
    word = Possible_Words[randomIndex];
    guesses = ""; // reset guesses
    gameOver = false; // reset game over
    updatePage(); // update the display
    document.getElementById("hangmanImage").src = "images/hangman6.gif"; // reset hangman image
    docucument.getElementById("clue").innerHTML = "_".repeat(word.length); // clear clue display
    document.getElementById("guesses").innerHTML = "Guesses: "; // clear guesses display
}
function guessLetter() {
    // only process the guess if the game is not over
    if (gameOver || word === "") {
        return;
    }
    var letterInput = document.getElementById("letter");
    var letter = letterInput.value.toLowerCase();
    letterInput.value = ""; // clear the input box

    // to validate input: only one letter at a time
    if (letter.length !== 1 || letter < 'a' || letter > 'z') {

        return;
    }

    // doesnt allow for duplicate guesses
    if (guesses.indexOf(letter) >= 0) {
        return;

    }
    if (guesses.includes(letter)) {
        return;
    }

    // add the letter to the list of guesses and update the page
    guesses += letter;
    updatePage();

    // checking if the player has won  
    checkGameStatus();

}
function updatePage() {
    // shows press new game if no word is selected
    if (word === "") {
        document.getElementById("clue").innerHTML = "Press 'New Game' to start!";
        document.getElementById("guesses").innerHTML = "Guesses: ";
        //this shows the starting hangman image
        document.getElementById("hangmanImage").src = "images/hangman6.gif";
        return;
    }


    var clueString = "";
    var correctGuesses = 0;
    // builds the clue string with guessed letters and underscores

    for (var i = 0; i < word.length; i++) {
        var currentLetter = word.charAt(i);
        if (guesses.indexOf(currentLetter) >= 0) {
            clueString += currentLetter + " "; //this shows the correctly guessed letters
            correctGuesses++;
        }
        else
            clueString += " _ "; //this shows the underscores for unguessed letters
    }
    //updates the display

    document.getElementById("clue").innerHTML = clueString;
    document.getElementById("guesses").innerHTML = "Guesses: " + guesses;
    //updates the hangman image based
    updateHangmanImage();
}


function updateHangmanImage() {
    // counts incorrect guesses
    var wrongGuesses = 0;
    for (var i = 0; i < guesses.length; i++) {
        if (word.indexOf(guesses.charAt(i)) < 0) {
            wrongGuesses++;
        }
    }
    // updates the hangman image based on wrong guesses
    var imageNumber = 6 - wrongGuesses;
    if (imageNumber < 0) {
        imageNumber = 0;
    }
    // sets the hangman image source
    document.getElementById("hangmanImage").src = "images/hangman" + imageNumber + ".gif";
}
function checkGameStatus() {
    // checks for a win
    if (word == "") {
        return;
    }

    //counts incorrect guesses for loss 
    var wrongGuesses = 0;
    for (var i = 0; i < guesses.length; i++) {
        if (word.indexOf(guesses.charAt(i)) < 0) {
            wrongGuesses++;
        }
    }

    //checks if all letters have been guessed
    var won = true;
    for (var i = 0; i < word.length; i++) {
        if (guesses.indexOf(word.charAt(i)) < 0) {
            won = false; // this finds a letter not yet guessed
            break;
        }
    }

    if (won) {
        gameOver = true;
        document.getElementById("clue").innerHTML = "You won! The word was: " + word;
        document.getElementById("guesses").innerHTML = "Guesses: " + guesses;
    }
    // handles loss condition (6 incoress guesses = hangman0.gif)   
    if (wrongGuesses >= 6) {
        gameOver = true;
        document.getElementById("clue").innerHTML = "You lost! The word was: " + word;
        document.getElementById("guesses").innerHTML = "Guesses: " + guesses;
        document.getElementById("hangmanImage").src = "images/hangman0.gif";
        return;

    }
}        
