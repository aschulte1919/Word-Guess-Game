var startBtn = document.getElementById("startBtn");
var content = document.getElementById("content");
var header = document.getElementById("header");

var initialize = function () {
    startBtn.style.display = "none";
    header.style.display = "none";
    content.style.display = "block";
    game.play();
    document.getElementById("remainingGuesses").textContent = game.guessesLeft;
    document.getElementById("totalWins").textContent = this.wins;
}

document.getElementById("startBtn").onclick = initialize;

var game = {

    word: "",
    words: ['ruby', 'rails', 'javascript', 'array', 'hash', 'sinatra', 'model', 'view', 'devise', 'capybara', 'jasmine', 'cache', 'sublime', 'terminal', 'system', 'twitter', 'facebook', 'function', 'google', 'amazon', 'data', 'design', 'prototype', 'gist', 'github', 'agile', 'fizzbuzz', 'route', 'gem', 'database'],
    lettersInWord: [],
    lettersGuess: [],
    displayWord: [],
    guessesLeft: 10,
    wins: 0,
    guess: "",

    // Selects a random word from the word list sets the secret word
    randomWord: function () {
        this.word = this.words[Math.floor(Math.random() * this.words.length)];
        console.log(this.word);
    },

    // Seperates the letters of the random word selected
    setLettersInWord: function () {
        this.lettersInWord = this.word.split("");
        console.log(this.lettersInWord);
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
            console.log(game.guess);
            game.lettersGuess.push(game.guess);
            document.getElementById("guessedLetters").textContent = game.lettersGuess;
            console.log(game.lettersInWord);
            console.log(game.guess);
            if (game.lettersInWord.includes(game.guess)) {
                for (var i = 0; i < game.word.length; i++) {
                    if (game.word[i] === game.guess) {
                        game.displayWord[i] = " " + game.guess + " ";
                    }
                }
            } else {
                document.getElementById("remainingGuesses").textContent = game.guessesLeft--;
            }
            game.updateDisplayWord(game.displayWord);
            console.log(game.lettersGuess);
        }
    },

    // Displays the number of times the user has won
    displayWins: function () {
        if (this.lettersGuess === this.displayWord) {
            document.getElementById("totalWins").textContent = game.wins++;
        }
    },

    //adds the letter 
    updateDisplayWord: function (word) {
        document.getElementById("currentWord").textContent = word.join(" ");
    },

    // Game execution occurs
    play: function () {
        game.randomWord();
        game.setLettersInWord();
        game.displayCurrentWord();
        game.displayWins();
        game.handleGuess();
    }
};
