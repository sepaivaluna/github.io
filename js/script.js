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
const $playerTwoDiv = $('#player-two-div');
const $exitButton = $('#exit-button');
const $playerOneInput = $('#player-one-input')
const $playerTwoInput = $('#player-two-input')
let isTwoPlayer = false;
let choseName = false;


// const cards = [card1, card2, card3, card4, card5, card6, card7, card8];

const card1 = `<div class="card" style="width: 25%;height: auto;">
                    <img src="https://i.pinimg.com/236x/ed/19/e9/ed19e9d50a85c69ab8dcef11ebefbe33.jpg" class="card-img-top" alt="example" style="border-radius: 1.25rem;">
                    <div class="card-body" style="line-height: 50%; margin: 0 auto">
                        <p class="card-text"><strong class="h4"><u>Robert Plant Rum</u></strong><br><span class="h5">Use this card to give 3 alcohol to your rival!</span></p>
                    </div>
                </div>`;




$(function () {

    // NOTE the (re)start of the game
    const gameRestart = function () {
        
        // $howTo.hide();
        $playerOneInput.val('');
        $playerTwoDiv.empty();
        $gameBoard.hide();
        $resetButton.hide();
        $onePlayerSelection.show();
        $twoPlayerSelection.show();
        isTwoPlayer = false;
        $('#board-messages').empty();
    }

    const dealCard = function () {
        // let card = Math.floor(Math.random() * cards.length);
        return $('#p1-cards').append(card1);
    }
    
    // NOTE the option to pick between one player or two player
    const onePlayerSelection = function () {
        
        // choseName = false;
        $gameBoard.show();
        $onePlayerSelection.hide();
        $twoPlayerSelection.hide();
        $resetButton.show();
        $playerTwoDiv.append(`<p style="margin-top: 4px;font-size: 2rem;background-color: rgba(200,200,200,0.582); color:white; font-weight:lighter;">CPU</p>`)
        $playerTwoDiv.append(`<div id="health" class="container" style="background-color:rgba(225,200,200,.5); width:300px; position:absolute; bottom: 0; left: 100px;">
        <p class="h3">Health</p>
        <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
            <span class="p-2 heart">&hearts;</span>
        </div>`)
        pickAName();
        doAsISay();

    }

    const twoPlayerSelection = function () {
        
        // choseName = true; 
        isTwoPlayer = true;
        $gameBoard.show();
        $onePlayerSelection.hide();
        $twoPlayerSelection.hide();
        $resetButton.show();
        $playerTwoDiv.append(`<input id="player-two-input" type="text" placeholder="Choose your name P2" class="text-center" style="margin-top: 4px;"><div id="health" class="container" style="background-color: rgba(225,200,200,.5); width:300px; position:absolute; bottom: 0; left: 100px;">
        <p class="h3">Health</p>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
        <span class="p-2 heart">&hearts;</span>
    </div>`)
        pickAName();
        doAsISay();

    }

    const helpButton = function () {
        $howTo.show();
    }
    

    const exitInstruction = function () {
        $howTo.hide();
    }

    const pickAName = function () {
        if (!isTwoPlayer) {
            return $('#board-messages').append(`<p id="typewriter" class="h1" style="margin-top: 10px;">Quick player! Pick a Rock and Roll name!<br><br>
            
            Only once you're <u><em>done</em></u> doing so click the button below to deal your cards!
            <br><br>

            <button id="deal-button" class="btn btn-lg btn-success" style="font-size: 32px;">DEAL CARDS</button>

            </p>
            `);
        } else {
            return $('#board-messages').append(`<p id="typewriter" class="h1" style="margin-top: 10px;">Quick players! Pick a cool name! <br><br>
            
            Only once you're <u><em>done</em></u> doing so click the button below to deal your cards!
            <br><br>

            <button id="deal-button" class="btn btn-lg btn-success" style="font-size: 32px;">DEAL CARDS</button>

            </p>
            `);
        }
    }

    const doAsISay = function () {
        if (!choseName) {
            return $('#board-messages').append(`<p>PLEASE CHOOSE A NAME</p>`)
        } else {
            return dealCard();
        }
    }


    $onePlayerSelection.on('click', onePlayerSelection);
    $twoPlayerSelection.on('click', twoPlayerSelection);
    $resetButton.on('click', gameRestart);
    $helpButton.on('click', helpButton);
    $exitButton.on('click', exitInstruction);
    $('#deal-button').on('click', doAsISay());
    
    gameRestart();

});

// sergio, for tomorrow please revise the deal button and also look over the doasisay() function, it should only return if false, connect the input.val() to the function. Goodnight;