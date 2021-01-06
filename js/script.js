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
    
    
const cards2 = [
    {
        img: 'https://i.pinimg.com/236x/ed/19/e9/ed19e9d50a85c69ab8dcef11ebefbe33.jpg',
        title: 'Robert Plant Rum',
        description: 'Use this card to give 3 alcohol to your rival!',
    },

    {
        img: "https://lh3.googleusercontent.com/proxy/jnK0A12ezD4Ti6v4NKsvr3APUnpETu44QjxyAI67k5h-IjrAIy43-LhKJp5bLKpHx77HqudbL7_lwiz9wZrPN0ozCegAvp5N9W-ob4N7dawHsz8YiZHSENHXVcPtyQ",
        title: 'Jimmy Page Jug',
        description: 'Use this card to give 4 alcohol to your rival!',
    },

    {
        img: 'https://i.pinimg.com/originals/b0/2b/b1/b02bb1a0bd854e89c55e15ef17a82163.jpg',
        title: 'John Bonham Jack',
        description: 'Use this card to give 2 alcohol to your rival!',
    },
    
    {
        img: 'https://paulkingart.com/wp-content/uploads/2018/01/John-Paul-Jones_PWK.jpg',
        title: 'John Paul Jones',
        description: 'Use this card to give 2 alcohol to your rival!',
    },

    {
        img: 'https://cdn.dribbble.com/users/179241/screenshots/2846846/chris-fernandez-motto-1.png?compress=1&resize=400x300',
        title: 'Finish the bottle!',
        description: 'Use this card to give 5 alcohol to your rival!',
    },

    {
        img: 'https://arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/OCR3UJQMPBHOBO77L26P5G3CLM.jpg',
        title: 'Water',
        description: 'Use this card to give 0 alcohol to your rival!',
    },

    {
        img: 'https://image.shutterstock.com/image-illustration/cartoon-england-elements-set-on-600w-333033137.jpg',
        title: 'London Drink',
        description: 'Use this card to give 1 alcohol to your rival!',
    },

    {
        img: 'https://previews.123rf.com/images/miceking/miceking1604/miceking160400018/54822330-beer-mug-cartoon-with-foam.jpg',
        title: 'Beer',
        description: 'Use this card to give 1 alcohol to your rival!',
    },

    {
        img: 'https://cdn2.vectorstock.com/i/thumb-large/27/56/bottle-vodka-icon-cartoon-style-vector-7722756.jpg',
        title: 'Vodka',
        description: 'Use this card to give 2 alcohol to your rival!',
    },

    {
        img: 'https://image.shutterstock.com/image-vector/vector-cartoon-illustration-tequila-bottle-260nw-1414483793.jpg',
        title: 'Tequila',
        description: 'Use this card to give 4 alcohol to your rival!',
    },
]
   
//   `<div class="flip-card" style="position:relative">
//     <div class="flip-card-inner">
//     <div class="flip-card-front">
//     <img src="" alt="" style="width:235px;height:250px;">
//     </div>
//     <div class="flip-card-back">
//     <h2 style="padding-top: 20px;"><u>Tequila</u></strong>
//     </h2>
//     <p class="</p>
//     </div>
//     </div>
//     </div>`
    
    const $playGame = $('#play-game');
    const $gameBoard = $('.board');
    const $resetButton = $('#reset-button');
    const $helpButton = $('#help-button');
    const $howTo = $('#howTo');
    const $exitButton = $('#exit-button');
    const $playerOneInput = $('#player-one-input');
    const $playButton = $('#play-button');

    
    
$(function () {
    
    // NOTE the start of the game
    const gameStart = function () {
        
        $howTo.hide();
        $playerOneInput.val('');
        $gameBoard.hide();
        $resetButton.hide();
        $playGame.show();
    
        
    }
    
    // NOTE the option to pick between one player or two player
    const startGame = function () {
        
        $gameBoard.show();
        $playGame.hide();
        $resetButton.show();
        
    }
    
    const helpButton = function () {
        $howTo.show();
    }
    
    
    const exitInstruction = function () {
        $howTo.hide();
    }
    
    const newCard = function () {
        let card = Math.floor(Math.random() * cards2.length);
        return cards2[card];
    }
    console.log(newCard());

    const cpuCard = function () {
        let card = Math.floor(Math.random() * cards2.length);
        return cards2[card]
    }
    console.log(cpuCard())
    
    const restartGame = function () {

    }

    $playGame.on('click', startGame)
    $helpButton.on('click', helpButton);
    $exitButton.on('click', exitInstruction);
    $resetButton.on('click', restartGame);
    
    gameStart(); 
});

