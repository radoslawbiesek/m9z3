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
    var playerNameDiv = document.getElementById('playerName');

    // Your move buttons
    var playerMoveButtons = document.getElementsByClassName('player-move');

    // Modals
    var modals = document.querySelectorAll('.modal');
    var closeButtons = document.querySelectorAll('.modal .close');
    var endGameInfoDiv = document.getElementById('endGameInfo');
    var playAgainButton = document.getElementById('playAgain');

    var modalGameEnded = document.getElementById('modal-game-ended');

    // Variables
    var rock = 'rock';
    var scissors = 'scissors';
    var paper = 'paper';

    var win = 'You won!';
    var lost = 'You lost!';
    var draw = 'There is a draw.';

    // Create new object for parameters of the game
    var parameters = {
        playerName: 'Player',
        roundsToWin: undefined,
        round: 0,
        playerResult: 0,
        computerResult: 0,
    };
    var progress = []

    // Start new game
    var newGame = function() {
        parameters.roundsToWin = askForInput();
        enableButtons();
        roundsInfoDiv.innerHTML = 'You need to beat the computer ' + parameters.roundsToWin + ' times to win the whole game.';

        //Initialize or reset game variables
        parameters.playerResult = 0;
        displayResult(playerResultDiv, parameters.playerResult);
        parameters.computerResult = 0;
        displayResult(computerResultDiv, parameters.computerResult);
        parameters.round = 0;
        displayRoundNumber(parameters.round);

        // Reset layout
        displayItem(computerItemDiv);
        displayItem(playerItemDiv);
        gameLogDiv.innerHTML = 'New game. You play up to ' + parameters.roundsToWin + ' wins. Let\'s get started!';
    };

    // Ask user for number of parameters.rounds
    var askForInput = function() {
        var userInput;
        do {    
            userInput = window.prompt('How many won rounds are needed to win the entire game? Please type an positive integer.');
            // if (userInput === null) {
            //     gdy wcisniety zostanie cancel zatrzymaj petle do-while, zatrzymaj f-cje askForInput, zatrzymaj funkcje newGame
            // }
        } while (!isPositiveInteger(userInput));
        return parseInt(userInput);
    };

    // Helper that check if given input is a positive integer
    var isPositiveInteger = function(userInput){
        var x = parseInt(userInput);
        return ((!isNaN(x) && String(x) === userInput && x > 0));
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
        // Increase and display parameters.Round Number
        displayRoundNumber(++parameters.round);
        //  Take player move and generate computer move. Display both
        var computerItem = randomMove();
        displayItem(playerItemDiv, playerItem);
        displayItem(computerItemDiv, computerItem);

        var roundResult = compareItems(playerItem, computerItem);
        addGameLog('You played ' + playerItem.toUpperCase() + '. Computer played ' + computerItem.toUpperCase() + '. ' + roundResult);

        if (roundResult == win) {
            parameters.playerResult++;
            displayResult(playerResultDiv, parameters.playerResult);
            if (isGameEnded(parameters.playerResult)) {
                addGameLog('Game is over. You won!');
                endGameInfoDiv.innerHTML = 'YOU WON THE ENTIRE GAME!!!!1111<br>Click \'Play again\' to start another.';
                showModal(modalGameEnded);
                disableButtons();
            }
        } else if (roundResult == lost) {
            parameters.computerResult++;
            displayResult(computerResultDiv, parameters.computerResult);
            if (isGameEnded(parameters.computerResult)) {
                addGameLog('Game is over. You lost!');
                endGameInfoDiv.innerHTML = 'You lost the game.<br>Click \'Play again\' to start another.';
                showModal(modalGameEnded);
                disableButtons();
            }
        }
        var temp = parameters;
        progress.push(temp);
        console.log(progress);
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
        return result >= parameters.roundsToWin;
    };

     // Delete 'show' class from all modals
     var hideAll = function(){
        for(var i = 0; i < modals.length; i++){
            modals[i].classList.remove('show');
        }
        document.querySelector('#modal-overlay').classList.remove('show');
    }
    
    // Function that hides overlay after clicking the button or overlay
    var hideModal = function(event){
		event.preventDefault();
		document.querySelector('#modal-overlay').classList.remove('show');
	};
    
    // Show modal
    var showModal = function(modal){
        hideAll();
        modal.classList.add('show');
        document.querySelector('#modal-overlay').classList.add('show');
    };    
    

    // EVENT LISTENERS
    // Event listener for new game
    newGameButton.addEventListener('click', newGame);
    // Event listeners for player move buttons
    for (var n = 0; n < playerMoveButtons.length; n++){
        playerMoveButtons[n].addEventListener('click', function(){ 
            playerMove(this.getAttribute('data-move'));
        });
    };
    // Event listener for play again
    playAgainButton.addEventListener('click', function(){
        hideAll();
        newGame();
    });
    // Event listeners for hiding modals
    for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideModal);
    }
    document.querySelector('#modal-overlay').addEventListener('click', hideModal);

    for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
    }
// })(); 
