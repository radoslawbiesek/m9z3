'use strict';
(function() {

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
    var playerNameDiv = document.getElementById('playerNameDiv');

    // Your move buttons
    var playerMoveButtons = document.getElementsByClassName('player-move');

    // Modals
    var modals = document.querySelectorAll('.modal');

    var closeButtons = document.querySelectorAll('.modal .close');
    var endGameInfoDiv = document.getElementById('endGameInfo');
    var playAgainButton = document.getElementById('playAgain');
    var modalGameEnded = document.getElementById('modal-game-ended');
    var tableBodyDiv = document.getElementById('table-body');

    var modalInput = document.getElementById('modal-input');
    var submitButton = document.getElementById('submitButton');
    var playerNameInput = document.getElementById('playerNameInput');
    var roundsToWinInput = document.getElementById('roundsToWinInput');

    // Variables
    var rock = 'rock';
    var scissors = 'scissors';
    var paper = 'paper';

    var win = 'win';
    var lost = 'lost';
    var draw = 'draw';

    // Create new object for parameters of the game
    var parameters = {
        playerName: 'Player',
        roundsToWin: undefined,
        progress: [],
        // Temporary state of the game
        gameState: { // add in newGame
            // round
            // playerItem
            // computerItem
            // playerResult
            // computerResult
            // roundResult
        }
    };

    // Start new game
    var newGame = function() {
        // Initialize or reset game variables
        parameters.gameState.round = 0;  
        parameters.gameState.playerItem = undefined;  
        parameters.gameState.computerItem = undefined;
        parameters.gameState.playerResult = 0;
        parameters.gameState.computerResult = 0;
        parameters.gameState.roundResult = undefined;
        parameters.progress = [];

        // Reset layout
        displayResult(playerResultDiv, parameters.gameState.playerResult);
        displayResult(computerResultDiv, parameters.gameState.computerResult);
        displayRoundNumber(parameters.gameState.round);
        displayItem(computerItemDiv);
        displayItem(playerItemDiv);
        
        debugger;
    };

    // Submit
    var submitUserInput = function() {
        parameters.playerName = playerNameInput.value;
        parameters.roundsToWin = parseInt(roundsToWinInput.value);
        gameLogDiv.innerHTML = 'New game. You play up to ' + parameters.roundsToWin + ' wins. Let\'s get started!';
        roundsInfoDiv.innerText = 'You need to beat the computer ' + parameters.roundsToWin + ' times to win the whole game.';
        playerNameDiv.innerText = parameters.playerName;
        debugger;
    };

    // var isPositiveInteger = function(userInput){
    //     var x = parseInt(userInput);
    //     return ((!isNaN(x) && String(x) === userInput && x > 0));
    // };

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

    var playerMove = function(item) {
        // Increase and display parameters.Round Number
        displayRoundNumber(++parameters.gameState.round);
        //  Take player move and generate computer move. Display both
        parameters.gameState.playerItem = item;
        parameters.gameState.computerItem = randomMove();
        displayItem(playerItemDiv, parameters.gameState.playerItem);
        displayItem(computerItemDiv, parameters.gameState.computerItem);

        parameters.gameState.roundResult = compareItems(parameters.gameState.playerItem, parameters.gameState.computerItem);
        addGameLog(parameters.playerName + ' played ' + parameters.gameState.playerItem.toUpperCase() + '. Computer played ' + parameters.gameState.computerItem.toUpperCase() + '. ' + commentRoundResult(parameters.gameState.roundResult));

        if (parameters.gameState.roundResult == win) {
            parameters.gameState.playerResult++;
            displayResult(playerResultDiv, parameters.gameState.playerResult);
            if (isGameEnded(parameters.gameState.playerResult)) {
                addGameLog('Game is over. You won!');
                endGameInfoDiv.innerHTML = 'YOU WON THE ENTIRE GAME!!!!1111<br>Click \'Play again\' to start another.';
                showModal(modalGameEnded);
                disableButtons();
            }
        } else if (parameters.gameState.roundResult == lost) {
            parameters.gameState.computerResult++;
            displayResult(computerResultDiv, parameters.gameState.computerResult);
            if (isGameEnded(parameters.gameState.computerResult)) {
                addGameLog('Game is over. You lost!');
                endGameInfoDiv.innerHTML = 'You lost the game.<br>Click \'Play again\' to start another.';
                showModal(modalGameEnded);
                disableButtons();
            }
        }
        // Append current state of the game to the progress array
        appendParamsToProgress();
    }

    function appendParamsToProgress() {
        var temp = Object.assign({}, parameters.gameState);
        parameters.progress.push(temp);
    };

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

    var commentRoundResult = function(result) {
        switch (result) {
            case win:
                return 'You won!';
            case lost:
                return 'You lost.';
            case draw:
                return 'There is a draw.';
            default:
                return '';
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
        createTable(parameters.progress);
    };    
    
    var createTable = function(data) {
        tableBodyDiv.innerHTML = ''; // reset table
        for (var i = 0; i < data.length; i++) {
            tableBodyDiv.innerHTML +=
                '<tr>' +
                    '<td>' + data[i].round + '</td>' +
                    '<td><i class="fas fa-hand-' + data[i].playerItem.toLowerCase() + '"></i></td>' +
                    '<td><i class="fas fa-hand-' + data[i].computerItem.toLowerCase() + '"></i></td>' +
                    '<td>' + data[i].roundResult.slice(0,1).toUpperCase() + '</td>' +
                    '<td>' + data[i].playerResult + ' - ' + data[i].computerResult + '</td>' +
                '</tr>';
        }
    };

    // EVENT LISTENERS
    // Event listener for new game
    newGameButton.addEventListener('click', function() {
        showModal(modalInput);
    });
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
    // Event listener for submit user input
    submitButton.addEventListener('click', function(){
        newGame();
        submitUserInput();
        debugger;
        hideAll();
        debugger;
        enableButtons();
        debugger;   
    });

})(); 
