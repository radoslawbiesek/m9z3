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
    var playerMoveButtons = document.getElementsByClassName('player-move');

    var buttonPaper = document.getElementById('playPaper');
    var buttonScissors = document.getElementById('playScissors');
    var buttonRock = document.getElementById('playRock');

    // Variables
    var rock = 'rock';
    var scissors = 'scissors';
    var paper = 'paper';

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

        //Initialize or reset game variables
        playerResult = 0;
        displayResult(playerResultDiv, playerResult);
        computerResult = 0;
        displayResult(computerResultDiv, computerResult);
        round = 0;
        displayRoundNumber(round);

        // Reset layout
        displayItem(computerItemDiv);
        displayItem(playerItemDiv);
        gameLogDiv.innerHTML = 'New game. You play up to ' + roundsToWin + ' wins. Let\'s get started!';
    };

    // Ask user for number of rounds
    var askForInput = function() {
        var userInput;
        do {    
            userInput = window.prompt('How many won rounds are needed to win the entire game? Please type an positive integer.');
        } while (!isPositiveInteger(userInput));
        return userInput;
    };

    // Helper that check if given input is a positive integer
    var isPositiveInteger = function(userInput){
        var x = parseInt(userInput);
        return ((!isNaN(x) && String(x) === userInput && x > 1));
    };


    var enableButtons = function() {
        for (var i = 0; i < playerMoveButtons.length; i++) {
            playerMoveButtons[i].disabled = false;
        }
    };

    var disableButtons = function() {
        for (var i = 0; i < playerMoveButtons.length; i++) {
            playerMoveButtons[i].disabled = true;
        }
    };

    var playerMove = function(playerItem) {
        // Increase and display Round Number
        displayRoundNumber(++round);
        //  Take player move and generate computer move. Display both
        var computerItem = randomMove();
        displayItem(playerItemDiv, playerItem);
        displayItem(computerItemDiv, computerItem);

        var roundResult = compareItems(playerItem, computerItem);
        addGameLog('You played ' + playerItem.toUpperCase() + '. Computer played ' + computerItem.toUpperCase() + '. ' + roundResult);

        if (roundResult == win) {
            playerResult++;
            displayResult(playerResultDiv, playerResult);
            if (isGameEnded(playerResult)) {
                addGameLog('Game is over. You won!');
                roundsInfoDiv.innerHTML = 'YOU WON THE ENTIRE GAME!!!!1111<br>Click \'New game\' to start another.';
                disableButtons();
            }
        } else if (roundResult == lost) {
            computerResult++;
            displayResult(computerResultDiv, computerResult);
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

    var displayResult = function(place, result){
        place.innerHTML = result;
    }

    var displayItem = function(place, item){
        if (item != undefined){
            place.innerHTML = '<i class="fas fa-hand-' + item.toLowerCase() + '"></i>';
        } else {
            place.innerHTML = '?';
        }
    };

    var addGameLog = function(log) {
        gameLogDiv.insertAdjacentHTML("afterbegin", log + '&#13;&#10;');
    }

    var randomMove = function(){
        var moves = [rock, paper, scissors];
        var i = Math.round(Math.random()*2);
        return moves[i];
    };

    var compareItems = function(item1, item2) {
        switch (item1 + '-' + item2) {
            case 'scissors-scissors':
            case 'paper-paper':
            case 'rock-rock':
                return draw;
            case 'rock-paper':
            case 'paper-scissors':
            case 'scissors-rock':
                return lost;
            case 'rock-scissors':
            case 'paper-rock':
            case 'scissors-paper':
                return win;
        }
    }

    var isGameEnded = function(result) {
        return result >= roundsToWin;
    };

    // Event listener for new game
    newGameButton.addEventListener('click', newGame);
    // Event listeners for player move buttons
    for (var n = 0; n < playerMoveButtons.length; n++){
        playerMoveButtons[n].addEventListener('click', function(){ 
            playerMove(this.getAttribute('data-move'));
        });
    };

// })(); 
