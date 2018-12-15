'use strict';
// (function() {

    // New game button
    var newGameButton = document.getElementById('new-game-button');

    // Current result
    var playerResultDiv = document.getElementById('player-result');
    var computerResultDiv = document.getElementById('computer-result');
    var roundsInfoDiv = document.getElementById('rounds-info');

    //  Round X
    var roundNumberDiv = document.getElementById('round-number');
    var playerItemDiv = document.getElementById('player-item');
    var computerItemDiv = document.getElementById('computer-item');
    var gameLogDiv = document.getElementById('game-log');
    var playerNameDiv = document.getElementById('player-name');

    // Your move buttons
    var playerMoveButtons = document.getElementsByClassName('player-move');

    // Modals
    var modals = document.querySelectorAll('.modal');
    var modalOverlay = document.getElementById('modal-overlay');

    var closeButtons = document.querySelectorAll('.modal .close');
    var endGameInfoDiv = document.getElementById('end-game-info');
    var playAgainButton = document.getElementById('play-again-button');
    var modalGameEnded = document.getElementById('modal-game-ended');
    var tableBodyDiv = document.getElementById('table-body');

    var modalInput = document.getElementById('modal-input');
    var submitButton = document.getElementById('submit-button');
    var playerNameInput = document.getElementById('player-name-input');
    var roundsToWinInput = document.getElementById('rounds-to-win-input');

    // Variables
    var moves = {
        rock: 'rock',
        scissors: 'scissors',
        paper: 'paper',
    };

    var win = 'win';
    var lost = 'lost';
    var draw = 'draw';

    // Create new object for parameters of the game
    var parameters = {
        playerName: 'Player',
        roundsToWin: null,
        progress: [],
        gameState: {}, // add in resetParameters
    };

    // Start new game
    function newGame() {
        resetParameters();
        resetLayout();
    };

    // Initialize or reset game variables
    function resetParameters() {
        parameters.gameState.round = 0;  
        parameters.gameState.playerItem = null;  
        parameters.gameState.computerItem = null;
        parameters.gameState.playerResult = 0;
        parameters.gameState.computerResult = 0;
        parameters.gameState.roundResult = null;
        parameters.progress = [];
    }

    // Reset layout
    function resetLayout() {
        displayResult(playerResultDiv, parameters.gameState.playerResult);
        displayResult(computerResultDiv, parameters.gameState.computerResult);
        displayRoundNumber(parameters.gameState.round);
        displayItem(computerItemDiv);
        displayItem(playerItemDiv); 
    }

    // Submit
    function submitUserInput() {
        parameters.playerName = playerNameInput.value;
        parameters.roundsToWin = parseInt(roundsToWinInput.value);
        gameLogDiv.innerHTML = 'New game. You play up to ' + parameters.roundsToWin + ' wins. Let\'s get started!';
        roundsInfoDiv.innerText = 'You need to beat the computer ' + parameters.roundsToWin + ' times to win the whole game.';
        playerNameDiv.innerText = parameters.playerName;
    };

    function enableButtons() {
        var playerMoveButtonsLength = playerMoveButtons.length;
        for (var i = 0; i < playerMoveButtonsLength; i++) {
            playerMoveButtons[i].disabled = false;
        }
    };

    function disableButtons() {
        var playerMoveButtonsLength = playerMoveButtons.length;
        for (var i = 0; i < playerMoveButtonsLength; i++) {
            playerMoveButtons[i].disabled = true;
        }
    };

    function playerMove(item) {
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
            appendParamsToProgress();
            displayResult(playerResultDiv, parameters.gameState.playerResult);
            if (isGameEnded(parameters.gameState.playerResult)) {
                endGame(parameters.playerName);              
            }
        } else if (parameters.gameState.roundResult == lost) {
            parameters.gameState.computerResult++;
            appendParamsToProgress();
            displayResult(computerResultDiv, parameters.gameState.computerResult);
            if (isGameEnded(parameters.gameState.computerResult)) {
                endGame('Computer');
            }
        }       
    };

    function endGame(winner) {
        if (winner == parameters.playerName) {
            addGameLog('Game is over. You won!');
            endGameInfoDiv.innerHTML = 'YOU WON THE ENTIRE GAME!!!!1111<br>Click \'Play again\' to start another.';
        } else {
            addGameLog('Game is over. You lost!');
            endGameInfoDiv.innerHTML = 'You lost the game.<br>Click \'Play again\' to start another.';
        }
        createTable(parameters.progress);
        showModal(modalGameEnded);
        disableButtons();
    };

    function appendParamsToProgress() {
        var temp = Object.assign({}, parameters.gameState);
        parameters.progress.push(temp);
    };

    function displayRoundNumber(round) {
        roundNumberDiv.innerHTML = round;
    };

    function displayResult(place, result) {
        place.innerHTML = result;
    }

    function displayItem(place, item){
        if (item != null){
            place.innerHTML = drawIcon(item);
        } else {
            place.innerHTML = '?';
        }
    };

    // Use string of the item to create font awesome icon
    function drawIcon(item) {
        return '<i class="fas fa-hand-' + item.toLowerCase() + '"></i>';
    }

    function addGameLog(log) {
        gameLogDiv.insertAdjacentHTML("afterbegin", log + '&#13;&#10;');
    }

    function randomMove(){
        var movesAvalaible = Object.keys(moves);
        var movesNumber = movesAvalaible.length;
        var i = Math.round(Math.random()* (movesNumber - 1));
        return movesAvalaible[i];
    };

    function compareItems(item1, item2) {
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
            default:
                return null;
        }
    }

    function commentRoundResult(result) {
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

    function isGameEnded(result) {
        return result >= parameters.roundsToWin;
    };
    
    // Show modal
    function showModal(modal) {
        hideAllModals();
        modal.classList.add('show');
        modalOverlay.classList.add('show');    
    };   
    
    // Delete 'show' class from all modals
    function hideAllModals() {
        var modalsLength = modals.length;
        for(var i = 0; i < modalsLength; i++){
            modals[i].classList.remove('show');
        }
    }   
    
    // Delete 'show' class from overlay
    function hideOverlay() {
        modalOverlay.classList.remove('show');
    };
    
    function createTable(data) {
        tableBodyDiv.innerHTML = ''; // reset table
        // Creating row for each round
        for (var i = 0; i < data.length; i++) {
            var newRow = tableBodyDiv.insertRow(i);

            // Create cells for params of each round
            var cells = [
                data[i].round, 
                drawIcon(data[i].playerItem),
                drawIcon(data[i].computerItem),
                data[i].roundResult.slice(0,1).toUpperCase(),
                data[i].playerResult + ' - ' + data[i].computerResult            
            ];
            var cellsLength = cells.length;
            for(var j = 0; j < cellsLength; j++) {
                var newCell = newRow.insertCell(-1);
                var newCellContent = cells[j];
                newCell.innerHTML = newCellContent;
            }
        }
    };

    // EVENT LISTENERS

    // Event listener for new game
    newGameButton.addEventListener('click', function() {
        showModal(modalInput);
    });

    // Event listener for submit user input
    submitButton.addEventListener('click', function(){
        event.preventDefault();
        submitUserInput();
        hideOverlay();
        newGame();
        enableButtons();
    });    

    // Event listeners for player move buttons
    for (var n = 0; n < playerMoveButtons.length; n++){
        playerMoveButtons[n].addEventListener('click', function(){ 
            playerMove(this.getAttribute('data-move'));
        });
    };
    // Event listener for play again
    playAgainButton.addEventListener('click', function(){
        hideOverlay();
        newGame();
    });

    // Event listeners for hiding modals
    for(var i = 0; i < closeButtons.length; i++){
		closeButtons[i].addEventListener('click', hideOverlay);
    }
    modalOverlay.addEventListener('click', hideOverlay);

    for(var i = 0; i < modals.length; i++){
		modals[i].addEventListener('click', function(event){
			event.stopPropagation();
		});
    }

// })(); 
