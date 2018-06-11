var startBtn = document.getElementById("startBtn");
var content = document.getElementById("content");
var header = document.getElementById("header");

var initialize = function () {
    startBtn.style.display = "none";
    header.style.display = "none";
    content.style.display = "block";
    game.play();
    document.getElementById("remainingGuesses").textContent = game.guessesLeft;
    document.getElementById("totalWins").textContent = game.wins;
}

document.getElementById("startBtn").onclick = initialize;

var game = {

    word: "",
    words: ['ruby', 'rails', 'javascript', 'array', 'hash', 'sinatra', 'model', 'view', 'devise', 'capybara', 'jasmine', 'cache', 'sublime', 'terminal', 'function', 'google', 'amazon', 'data', 'design', 'gist', 'github', 'agile', 'route', 'gem'],
    lettersInWord: [],
    lettersGuess: [],
    displayWord: [],
    guessesLeft: 10,
    wins: 0,
    guess: "",
    correctGuess: 0,
    wordLength: 0,

    // Selects a random word from the word list sets the secret word
    randomWord: function () {
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        console.log(this.word);
        this.wordLength = this.word.length;
        console.log(this.wordLength);
    },

    // Seperates the letters of the random word selected
    setLettersInWord: function () {
        this.lettersInWord = this.word.split("");
    },

    // Displays the random word with __
    displayCurrentWord: function () {
        var cword = [];
        // for loop that adds the _ for the letters of the word
        for (var i = 0; i < this.lettersInWord.length; i++) {
            cword.push("___");
            this.displayWord = cword;
        }
        console.log(this.displayWord);
        document.getElementById("currentWord").textContent = this.displayWord;
    },

    //when the user guess
    //determine if the letter is in the word
    //or determine if it is not
    //acts accordingly
    handleGuess: function () {
        document.onkeyup = function (event) {
            game.guess = window.event.key;
            game.lettersGuess.push(game.guess);
            document.getElementById("guessedLetters").textContent = game.lettersGuess;
            if (game.lettersInWord.includes(game.guess)) {
                for (var i = 0; i < game.word.length; i++) {
                    if (game.word[i] === game.guess) {
                        game.displayWord[i] = game.guess;
                        game.correctGuess = game.correctGuess + 1;
                    }
                }
                game.winner();
            } else {
                game.guessesLeft--;
                document.getElementById("remainingGuesses").textContent = game.guessesLeft;
                game.loser();
            }
            game.updateDisplayWord(game.displayWord);
        }
    },

    // Displays the number of times the user has won
    winner: function () {
        if (game.correctGuess === game.wordLength) {
            document.getElementById("winner").style.display = "block";
            game.wins++;
            document.getElementById("totalWins").textContent = game.wins;
        }
    },
    loser: function () {
        if (game.guessesLeft == 0) {
            document.getElementById("loser").style.display = "block";
        }
    },

    //adds the letter
    updateDisplayWord: function (word) {
        document.getElementById("currentWord").textContent = word.join(" ");
    },

    //reset display
    resetDisplay: function () {
        document.getElementById("winner").style.display = "none";
        document.getElementById("loser").style.display = "none";
    },

    //resets the letters the user has guess array
    resetLetters: function () {
            game.lettersGuess = [];
            document.getElementById("guessedLetters").textContent = game.lettersGuess;
    },

    //reset guesses left function
    resetGuessLeft: function () {
            game.guessesLeft = 10;
            document.getElementById("remainingGuesses").textContent = game.guessesLeft;
    },

    //resets game when loser hits the play again button
    reset: function () {
        game.updateDisplayWord(game.displayWord);
        game.resetGuessLeft();
        game.resetLetters();
        game.resetDisplay();
        game.guess= "";
        game.correctGuess= 0;
        game.wordLength= 0;
        game.word = "";
        game.displayWord= [],
        game.play();
    },

    // Game execution occurs
    play: function () {
        game.randomWord();
        game.setLettersInWord();
        game.displayCurrentWord();
        game.handleGuess();
    }
};

document.getElementById("plyAgainBtn").onclick = game.reset;
document.getElementById("plyBtn").onclick = game.reset;
