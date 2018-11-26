'use strict';
(function() {
    // Initialize variables
    var resultPlayer = 0;
    var resultComputer = 0;
    var round = 0; 

    var roundsToWin = 1;

    var newGameButton = document.getElementById('newGameButton');
    var roundsInfo = document.getElementById('roundsInfo');
    var commentRound = document.getElementById('commentRound');

    var buttonPaper = document.getElementById('playPaper');
    var buttonScissors = document.getElementById('playScissors');
    var buttonRock = document.getElementById('playRock');



    // Start new game
    var newGame = function() {
        console.log('new game clicked');
        roundsToWin = askForInput();
        console.log('number of rounds ' + roundsToWin);
        enableButtons();
        console.log('buttons enabled');
        roundsInfo.innerHTML = 'You need to beat the computer ' + roundsToWin + ' times to win the whole game.';
        commentRound.innerHTML = 'Let\'s start the game!';
        console.log('comments changed');
    };

    // Ask user for number of rounds
    var askForInput = function() {
        console.log('asking for input');
        var userInput;
        do {    
            userInput = window.prompt('How many rounds do you want to play? Please type an integer.');
        } while (isNaN(parseInt(userInput,10)) || parseInt((userInput,10) < 1));
        console.log('user input is ' + userInput);
        return userInput;
    };

    var enableButtons = function() {
        buttonPaper.disabled = false;
        buttonScissors.disabled = false;
        buttonRock.disabled = false;
    };





    // Events listeners
    newGameButton.addEventListener('click', newGame);





 







})(); 