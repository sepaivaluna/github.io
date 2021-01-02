/* first the player has to select how many people are going to play
    create a function that will display the boardgame and at the same time hide the selectplayer options

the screen will then change to display the board
    adjust css/jquery so we can see the player on the left side and the computer on the right side, and we can see their health and liquor meters below their names
    in the middle left should be the five cards the player has and in the middle right the 5 cards the cpu has, in the dead center should be the deck of cards where each player will be pulling from

the board will show how much life and liquor the player and cpu have
    create unlickable buttons that will have blue for liquor and red for health, a function will tell them to move once a play has been made

the first move will be made by the player
    create a function that when the player clicks on a specific card it will do what the card says (take life or add liquor)
    create an if function that if the player has less than five cards, add a card per click per round, the cpu should automatically do this

the player will click on the deck of cards
    a function will move the card from the masterdeck to his personal deck

if the card he pulled is an attack card then the opponent has to take damage between 1-4
    create a function that will do a mathfloor(mathrandom() + 4) on either health or liquor
    create an if function to say if the inner text says damage then subtract health and elseif inner text says liquor add liquor

once the player's turn is over, it's the computer's turn or other player's turn
    create a while loop that will iterate as long as the player's/cpu's life isn't meeting the liquor meter then the game goes on

it will go on until the life and liquor meter of either one touch
    stop the while loop once one of the players two meters meet

once that happens it's game over and the player whose life doesn't touch the liquor meter wins
    

reset the game
  to reset the game we will call back the function reset game again
     */
    
const $onePlayerSelection = $('#one-player');
const $twoPlayerSelection = $('#two-player');
const $gameBoard = $('.board');
const $resetButton = $('#reset-button');
const $helpButton = $('#help-button');
const $howTo = $('#howTo');
const $playerTwoInput = $('#player-two-input');
const $exitButton = $('#exit-button');

$(function () {

    // NOTE the (re)start of the game
    const gameRestart = function () {
        
        // $howTo.hide();
        $playerTwoInput.empty();
        $gameBoard.hide();
        $resetButton.hide();
        $onePlayerSelection.show();
        $twoPlayerSelection.show();
    }
    
    // NOTE the option to pick between one player or two player
    const onePlayerSelection = function () {
        $gameBoard.show();
        $onePlayerSelection.hide();
        $twoPlayerSelection.hide();
        $resetButton.show();
        $playerTwoInput.append('CPU')
    }

    const twoPlayerSelection = function () {
        $gameBoard.show();
        $onePlayerSelection.hide();
        $twoPlayerSelection.hide();
        $resetButton.show();

        $playerTwoInput.append(`<input type="text" placeholder="Player Two..." class="text-center ">`)
    }

    const helpButton = function () {
        $howTo.show();
    }
    

    const exitInstruction = function () {
        $howTo.hide();
    }

    $onePlayerSelection.on('click', onePlayerSelection);
    $twoPlayerSelection.on('click', twoPlayerSelection);
    $resetButton.on('click', gameRestart);
    $helpButton.on('click', helpButton);
    $exitButton.on('click', exitInstruction);
    
    gameRestart();

});

