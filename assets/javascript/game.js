var startBtn = document.getElementById("startBtn");
var content = document.getElementById("content");
var header = document.getElementById("header");

var initialize = function (initialize) {
    startBtn.style.display = "none";
    header.style.display = "none";
    content.style.display = "block";
    game.play();
}

document.getElementById("startBtn").onclick = initialize;

var game = {

    word: "",
    words: ['ruby', 'rails', 'javascript', 'array', 'hash', 'sinatra', 'model', 'view', 'devise', 'capybara', 'jasmine', 'cache', 'sublime', 'terminal', 'system', 'twitter', 'facebook', 'function', 'google', 'amazon', 'data', 'design', 'prototype', 'gist', 'github', 'agile', 'fizzbuzz', 'route', 'gem', 'database'],
    lettersInWord: [],
    lettersGuess: [],
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
        console.log("setLetter function", this.lettersInWord);
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

    // Displays the number of times the user has won
    displayWins: function () {

        if (this.lettersGuess === this.lettersInWord)
            document.getElementById("totalWins").textContent = this.wins++;
    },

    //when the user guess
    //determine if the letter is in the word
    //or determine if it is not
    //acts accordingly
    handleGuess: function (event) {
            console.log(event);
            event = event || window.event.key; //capture the event, and ensure we have an event
            this.guess = window.event.key;
            console.log(event);
            document.getElementById("letterGuess").textContent = this.lettersGuess.push(this.guess);
            if (this.word.includes(this.guess)) {
                for (var i = 0; i < this.word.length; i++) {
                    if (this.word[i] === this.guess) {
                        this.displayWord[i] = " " + this.guess + " ";
                    }
                }
            } else {
                this.guessesLeft--;
            }
            this.updateDisplayWord(this.displayWord);
            console.log(this.lettersGuess);
    },

    //adds the 
    updateDisplayWord: function (word) {
        document.getElementById("currentWord").textContent = word.join(" ");
    },

    // Displays how many guess the user has left
    displayRemaining: function () {
        document.getElementById("remainingGuesses").textContent = this.guessesLeft;
    },

    // Game execution occurs
    play: function () {
        game.randomWord();
        game.setLettersInWord();
        game.displayCurrentWord();
        game.displayWins();
        game.displayRemaining();
        game.handleGuess();
    }
};
