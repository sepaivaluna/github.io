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
    
    
const CARDS = [
    {
        img: 'https://i.pinimg.com/236x/ed/19/e9/ed19e9d50a85c69ab8dcef11ebefbe33.jpg',
        title: 'Robert Plant Rum',
        damage: 3,
    },

    {
        img: "https://lh3.googleusercontent.com/proxy/jnK0A12ezD4Ti6v4NKsvr3APUnpETu44QjxyAI67k5h-IjrAIy43-LhKJp5bLKpHx77HqudbL7_lwiz9wZrPN0ozCegAvp5N9W-ob4N7dawHsz8YiZHSENHXVcPtyQ",
        title: 'Jimmy Page Jug',
        damage: 4,
    },

    {
        img: 'https://i.pinimg.com/originals/b0/2b/b1/b02bb1a0bd854e89c55e15ef17a82163.jpg',
        title: 'John Bonham Jack',
        damage: 2,
    },
    
    {
        img: 'https://paulkingart.com/wp-content/uploads/2018/01/John-Paul-Jones_PWK.jpg',
        title: 'John Paul Jones',
        damage: 2,
    },

    {
        img: 'https://cdn.dribbble.com/users/179241/screenshots/2846846/chris-fernandez-motto-1.png?compress=1&resize=400x300',
        title: 'Finish the bottle!',
        damage: 5,
    },

    {
        img: 'https://arc-anglerfish-arc2-prod-pmn.s3.amazonaws.com/public/OCR3UJQMPBHOBO77L26P5G3CLM.jpg',
        title: 'Water',
        damage: 0,
    },

    {
        img: 'https://image.shutterstock.com/image-illustration/cartoon-england-elements-set-on-600w-333033137.jpg',
        title: 'London Drink',
        damage: 1,
    },

    {
        img: 'https://previews.123rf.com/images/miceking/miceking1604/miceking160400018/54822330-beer-mug-cartoon-with-foam.jpg',
        title: 'Beer',
        damage: 1,
    },

    {
        img: 'https://cdn2.vectorstock.com/i/thumb-large/27/56/bottle-vodka-icon-cartoon-style-vector-7722756.jpg',
        title: 'Vodka',
        damage: 2,
    },

    {
        img: 'https://image.shutterstock.com/image-vector/vector-cartoon-illustration-tequila-bottle-260nw-1414483793.jpg',
        title: 'Tequila',
        damage: 4,
    },
]


//   `<div class="flip-card" style="position:relative">
//     <div class="flip-card-inner">
//     <div class="flip-card-front">
//     <img src="${this.img}" alt="${this.title}" style="width:235px;height:250px;">
//     </div>
//     <div class="flip-card-back">
//     <h2 style="padding-top: 20px;"><u>${this.title}</u></strong>
//     </h2>
//     <p class=">${this.damage}</p>
//     </div>
//     </div>
//     </div>`

const $playGame = $('#play-game');
const $gameBoard = $('.board');
const $resetButton = $('#reset-button');
const $helpButton = $('#help-button');
const $howTo = $('#howTo');
const $exitButton = $('#exit-button');
const $playerInput = $('#player-input');
const $playButton = $('#play-card');
const $inputButton = $('#enter-button');



$(function () {
    
    
    // NOTE the start of the game
    const gameStart = function () {
        
        $howTo.hide();
        $playerInput.val('');
        $gameBoard.hide();
        $resetButton.hide();
        $playGame.show();
        
        
    }
    
    // NOTE the option to pick between one player or two player
    const startGame = function () {
        
        $gameBoard.show();
        $playGame.hide();
        $resetButton.show();
        $inputButton.on('click', enterInput);
    }
    
    const helpButton = function () {
        $howTo.show();
    }
    
    const exitInstruction = function () {
        $howTo.hide();
    }
    const newCard = function () {
        let card = Math.floor(Math.random() * CARDS.length);
        CARDS[card];
        $('#p1-cards').append(`<div class="flip-card" style="position:relative">
            <div class="flip-card-inner">
            <div class="flip-card-front">
            <img src="${CARDS[card].img}" alt="${CARDS[card].title}" style="width:235px;height:250px;">
            </div>
            <div class="flip-card-back">
            <h2 style="padding-top: 20px;"><u>${CARDS[card].title}</u></strong>
            </h2>
            <p id="player-damage-value" class="h4">Use this card to give ${CARDS[card].damage} alcohol to your rival!</p>
            </div>
            </div>
            </div>`);
    }
    
    const cpuCard = function () {
        let card = Math.floor(Math.random() * CARDS.length);
        return CARDS[card];
    }


   
    
    const enterInput = function() {
        let newMessage;
        if ($playerInput.val().length === 0) {
            $('#slideIn').remove();
            newMessage = $('#board-messages').append(`<p id="slideIn" class="h1" style="margin-top: 10px;">Don't be shy, give us your <em>name<em></p>`)
        } 
        else {
            $('#board-messages').empty();
            newMessage = $('#board-messages').append(`<p id="slideIn" class="h1" style="margin-top: 10px;">Rock on ${$playerInput.val()}! We have a special game just for newbies like you are you interested? <br><br>
            
            <button id="yes-button" class="btn btn-lg btn-success align-self-center" style="font-size: 32px;margin: 20px;">Yes!</button><button id="no-button" class="btn btn-lg btn-danger align-self-center" style="font-size: 32px;margin: 20px;">No</button></p>`)
            
            $('#no-button').on('click', noResponse)
            $('#yes-button').on('click', yesResponse)
        }
        return newMessage
    }

    
    
    const noResponse = function () {
        let newMessage;
        $('#board-messages').empty();
        newMessage = $('#board-messages').append(`<p id="slideIn" class="h1" style="margin-top: 10px;">What do you mean ${$playerInput.val()}! No no no, please stay, I'll serve you free drinks all night <br><br>
        
        <button id="yes-button" class="btn btn-lg btn-success align-self-center" style="font-size: 32px;margin: 20px;">Okay, I guess</button></p>`)
        
        $('#yes-button').on('click', yesResponse)
    }
    
    const yesResponse = function () {
        let newMessage;
        $('#board-messages').empty();
        newMessage = $('#board-messages').append(`<p id="slideIn" class="h1" style="margin-top: 10px;">Fantastic! <br>
        
        Let's see how lucky you are tonight, Good luck ${$playerInput.val()}!<br>
        
        <span class="lead" style="background-color: rgba(200,200,200,.9">click below to begin</span>
        
        <button class="btn btn-md btn-success deal-cards">Begin</button>
        </p>`)
        
        $('#healthBar-name').append(`${$playerInput.val()} Drunkness`);
        $resetButton.on('click', restartGame);

        $('.deal-cards').on('click', newCard);

        // $('.deal-cards').on('click', function() {
        //     let newMessage;

        //     $('#board-messages').empty();

        //     newMessage = $('#board-messages').append(`<p id="slideIn" class="h1" style="margin-top: 10px;">LOOKOUT! <br><br>

        //     ${$playerInput.val()} did ${newCard().damage} alcohol damage to his opponent!<br>

        //     The opponent replied with ${cpuCard().damage} alcohol damage!

        //     </p>`)
            
        //     $('#p1-cards').append(`<div class="flip-card" style="position:relative">
        //     <div class="flip-card-inner">
        //     <div class="flip-card-front">
        //     <img src="${newCard().img}" alt="${newCard().title}" style="width:235px;height:250px;">
        //     </div>
        //     <div class="flip-card-back">
        //     <h2 style="padding-top: 20px;"><u>${newCard().title}</u></strong>
        //     </h2>
        //     <p id="player-damage-value" class="h4">Use this card to give ${newCard().damage} alcohol to your rival!</p>
        //     </div>
        //     </div>
        //     </div>`);
        //     console.log(newCard())

        //     $('#p2-cards').append(`<div class="flip-card" style="position:relative">
        //     <div class="flip-card-inner">
        //     <div class="flip-card-front">
        //     <img src="${cpuCard().img}" alt="${cpuCard().title}" style="width:235px;height:250px;">
        //     </div>
        //     <div class="flip-card-back">
        //     <h2 style="padding-top: 20px;"><u>${cpuCard().title}</u></strong>
        //     </h2>
        //     <p class="h4">Use this card to give ${cpuCard().damage} alcohol to your rival!</p>
        //     </div>
        //     </div>
        //     </div>`);
        //     console.log(cpuCard())
            
        // })
    }
    
    

    
    
    const restartGame = function () {

        $playerInput.val('');
        $('#board-messages').empty().append(`<p id="slideIn" class="h1" style="margin-top: 10px;">Hey! I'm the bar owner, it seems like it's your first time here, welcome! We're known for our outstanding game experience. What's your name?</p>`)
        $('#healthBar-name').val('');
        $gameBoard.hide();
        $resetButton.hide();
        $playGame.show();
        $('#healthBar-name').empty();
    }

    $playGame.on('click', startGame)
    $helpButton.on('click', helpButton);
    $exitButton.on('click', exitInstruction);
    $resetButton.on('click', restartGame);

    
    gameStart(); 
});

/* <button id="play-button" class="btn btn-lg btn-success align-self-center" style="font-size: 32px;margin-top: 20px;">Play</button></p> */