'use strict';
// (function() {

    // New game button
    var newGameButton = document.getElementById('newGameButton');

    // Current result
    var playerResultDiv = document.getElementById('playerResult');
    var computerResultDiv = document.getElementById('computerResult');
    var roundsInfoDiv = document.getElementById('roundsInfo');

    //  Round X
    var roundNumberDiv = document.getElementById('roundNumber');
    var playerItemDiv = document.getElementById('playerItem');
    var computerItemDiv = document.getElementById('computerItem');
    var gameLogDiv = document.getElementById('gameLog');

    // Your move buttons
    var buttonPaper = document.getElementById('playPaper');
    var buttonScissors = document.getElementById('playScissors');
    var buttonRock = document.getElementById('playRock');

    // Variables
    var rock = 'ROCK';
    var scissors = 'SCISSORS';
    var paper = 'PAPER';

    var win = 'You won!';
    var lost = 'You lost!';
    var draw = 'There is a draw.';

    var playerResult;
    var computerResult;
    var round; 
    var roundsToWin;

    // Start new game
    var newGame = function() {
        roundsToWin = askForInput();
        enableButtons();
        roundsInfo.innerHTML = 'You need to beat the computer ' + roundsToWin + ' times to win the whole game.';
        addGameLog('New game. You play up to ' + roundsToWin + ' wins. Let\'s get started!');

        //Initialize or reset game variables
        playerResult = 0;
        displayPlayerResult(playerResult);
        computerResult = 0;
        displayComputerResult(computerResult);
        round = 0;
        displayRoundNumber(round);

        // Reset layout
        displayItem(undefined, computerItemDiv);
        displayItem(undefined, playerItemDiv);
        gameLogDiv.innerHTML = 'New game. You play up to ' + roundsToWin + ' wins. Let\'s get started!';
    };

    // Ask user for number of rounds
    var askForInput = function() {
        var userInput;
        do {    
            userInput = window.prompt('How many rounds do you want to play? Please type an integer.');
        } while (isNaN(parseInt(userInput,10)) || parseInt((userInput,10) < 1));
        return userInput;
    };

    var enableButtons = function() {
        buttonPaper.disabled = false;
        buttonScissors.disabled = false;
        buttonRock.disabled = false;
    };

    var disableButtons = function() {
        buttonPaper.disabled = true;
        buttonScissors.disabled = true;
        buttonRock.disabled = true;
    };

    var playerMove = function(item) {
        // Increase and display Round Number
        round++;
        displayRoundNumber(round);
        
        //  Take player move and generate computer move. Display both
        var playerItem = item;
        var computerItem = randomMove();
        displayItem(playerItem, playerItemDiv);
        displayItem(computerItem, computerItemDiv);

        var roundResult = compareItems(playerItem, computerItem);
        addGameLog('You played ' + playerItem + '. Computer played ' + computerItem + '. ' + roundResult);

        if (roundResult == win) {
            playerResult++;
            displayPlayerResult(playerResult);
            if (isGameEnded(playerResult)) {
                addGameLog('Game is over. You won!');
                roundsInfoDiv.innerHTML = 'YOU WON THE ENTIRE GAME!!!!1111<br>Click \'New game\' to start another.';
                disableButtons();
            }
        } else if (roundResult == lost) {
            computerResult++;
            displayComputerResult(computerResult);
            if (isGameEnded(computerResult)) {
                addGameLog('Game is over. You lost!');
                roundsInfoDiv.innerHTML = 'You lost the game.<br>Click \'New game\' to start another.';
                disableButtons();
            }  
        }

    }

    var displayRoundNumber = function(round) {
        roundNumberDiv.innerHTML = round;
    };

    var displayPlayerResult = function(playerResult) {
        playerResultDiv.innerHTML = playerResult;
    }

    var displayComputerResult = function(computerResult) {
        computerResultDiv.innerHTML = computerResult;
    }

    var displayItem = function(item, place) {
        var toDisplay;
        if (item == rock) {
            toDisplay = '<i class="fas fa-hand-rock"></i>';
        } else if (item == paper) {
            toDisplay = '<i class="fas fa-hand-paper"></i>';
        } else if (item == scissors) {
            toDisplay = '<i class="fas fa-hand-scissors"></i>';
        }   else {
            toDisplay = '?';
        }
        place.innerHTML = toDisplay;
    };

    var addGameLog = function(log) {
        gameLogDiv.insertAdjacentHTML("afterbegin", log + '&#13;&#10;');
    }

    var randomMove = function(){
        var i = Math.round((Math.random()*2)+1);
        switch (i) {
            case 1:
                return rock;
            case 2:
                return paper;
            case 3: 
                return scissors;
        }
    };

    var compareItems = function(item1, item2) {
        var toCompare = item1 + item2;
        switch (toCompare) {
            case 'SCISSORSSCISSORS':
                return draw;
            case 'ROCKROCK':
                return draw;
            case 'PAPERPAPER':
                return draw;
            case 'ROCKPAPER':
                return lost;
            case 'ROCKSCISSORS':
                return win;
            case 'PAPERROCK':
                return win;
            case 'PAPERSCISSORS':
                return lost;
            case 'SCISSORSPAPER':
                return win;
            case 'SCISSORSROCK':
                return lost;
        }
    }

    var isGameEnded = function(result) {
        if (result >= roundsToWin) {
            return true;
        } else {
            return false;
        }
    };

    // Events listeners
    newGameButton.addEventListener('click', newGame);
    buttonPaper.addEventListener('click', function() { playerMove(paper) });
    buttonRock.addEventListener('click', function() { playerMove(rock) });
    buttonScissors.addEventListener('click', function() { playerMove(scissors) });
// })(); 