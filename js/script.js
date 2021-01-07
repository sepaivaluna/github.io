const CARDS = [
    {
        img: 'https://i.pinimg.com/236x/ed/19/e9/ed19e9d50a85c69ab8dcef11ebefbe33.jpg',
        title: 'Robert Plant Rum',
        damage: 3,
    },

    {
        img: "https://i.pinimg.com/originals/b3/86/0b/b3860b7fcd969ca8c008c20d97d3c4ec.jpg",
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
const $letsPlay = $('#lets-play');
const $gameBoard = $('.board');
const $resetButton = $('#reset-button');
const $helpButton = $('#help-button');
const $howTo = $('#howTo');
const $introToGame = $('#introduction-to-game')
const $exitButton = $('#exit-button');
const $playerInput = $('#player-input');
const $playerHealth = $('#player-health-remaining');
const $opponentHealth = $('#opponent-health-remaining');
const $enterButton = $('#enter-button');
let playerCurrentHealth = 20;
let opponentCurrentHealth = 20;
let playersDead = false;
let playerDamage = 0;
let cpuDamage = 0;
let newMessage;
let playerCurrentCard;
let cpuCurrentCard;

$(function () {
    
    gameStart();
    
    // NOTE the first thing to popup when window loads
    function gameStart () {
        
        $helpButton.hide();
        $introToGame.hide();
        $howTo.hide();
        $playerInput.val('');
        $gameBoard.hide();
        $resetButton.hide();
        $letsPlay.show();
        $('lose-overlay').hide();
        $('win-overlay').hide();
        $('.deal-cards').hide();
        
    }
    
    // NOTE when the player clicks on "let's play"
    const letsPlay = function () {
        
        $('#how-to-2').hide();
        $('#reset-2').hide();
        $('#answer-buttons').hide();
        $('.deal-cards').show();
        $introToGame.show();
        $letsPlay.hide();
        $resetButton.show();
        $enterButton.on('click', firstQuestion);
        secondQuestion();
    }

    const restartGame = function () {

        $introToGame.hide();
        $('#player-name').empty();
        $('#healthBar-name').empty();
        playerDamage = 0;
        cpuDamage = 0;
        playerCurrentHealth = 20;
        opponentCurrentHealth = 20;
        $playerHealth.attr('value', 20)
        $opponentHealth.attr('value', 20)
        $('#p1-cards').empty();
        $('#p2-cards').empty();
        $playerInput.val('');
        $('#board-messages').empty();
        $gameBoard.hide();
        $resetButton.hide();
        $letsPlay.show();
        $('.deal-cards').hide();
    }

    
    const helpButton = function () {
        $howTo.show();
        $introToGame.hide();
    }
    
    const exitInstruction = function () {
        $howTo.hide();
        $resetButton.hide();
        $gameBoard.show();
    }
    
    
    $('.deal-cards').on('click', function() {
        
        $('#board-messages').empty();
        $('#p1-cards').empty();
        $('#p2-cards').empty();
        
        newCard();
        cpuCard();
        
        newMessage = $('#board-messages').append(`<p class="slideIn h1" style="margin-top: 10px;">LOOKOUT! <br><br>
        
        ${$playerInput.val()} got ${playerDamage}!<br>
        
        The opponent got ${cpuDamage}!<br>
        
        </p>`)
        
        checkDamage();
        winCondition();
    })

    const newCard = function () {
        let card = Math.floor(Math.random() * CARDS.length);
        playerDamage = CARDS[card].damage;
        playerCurrentCard = CARDS[card];
        $('#p1-cards').append(`<div class="flip-card" style="position:relative">
            <div class="flip-card-inner">
            <div class="flip-card-front">
            <img src="${CARDS[card].img}" alt="${CARDS[card].title}" style="width:300px;height:400px;">
            </div>
            <div class="flip-card-back">
            <h2 style="padding-top: 20px;"><u>${CARDS[card].title}</u></strong>
            </h2>
            <p id="player-damage-value" class="h4">This card has a value of ${CARDS[card].damage}!</p>
            </div>
            </div>
            </div>`);
    }
    
    const cpuCard = function () {
        let card = Math.floor(Math.random() * CARDS.length);
        cpuCurrentCard = CARDS[card];
        cpuDamage = CARDS[card].damage;
        $('#p2-cards').append(`<div class="flip-card" style="position:relative">
            <div class="flip-card-inner">
            <div class="flip-card-front">
            <img src="${CARDS[card].img}" alt="${CARDS[card].title}" style="width:300px;height:400px;">
            </div>
            <div class="flip-card-back">
            <h2 style="padding-top: 20px;"><u>${CARDS[card].title}</u></strong>
            </h2>
            <p id="player-damage-value" class="h4">This card has a value of ${CARDS[card].damage}!</p>
            </div>
            </div>
            </div>`);
    }

    const checkDamage = function() {
        if (playerCurrentCard.damage < cpuCurrentCard.damage) {
            playerCurrentHealth -= 2;
            $playerHealth.attr('value', playerCurrentHealth)
        } else if (cpuCurrentCard.damage < playerCurrentCard.damage) {
            opponentCurrentHealth -= 2;
            $opponentHealth.attr('value', opponentCurrentHealth)
        } else if (cpuCurrentCard.damage === playerCurrentCard.damage) {
            $('#board-messages').empty();
            $('#board-messages').append(`<p class="h1 slideIn" style="margin-top: 10px;">It's a tie!<br><br>${$playerInput.val()} and opponent got ${playerDamage}</p>`)
        }
    }
    
    const winCondition = function () {

        if (playerCurrentHealth === 0) {
            $('#board-messages').empty();
            $('#lose-overlay').show();
            $('#board-messages').append(`<p class="slideIn display-4" style="margin-top: 10px;">GAME OVER</p>`)
            console.log($resetButton)
        } else if (opponentCurrentHealth === 0) {
            $('#board-messages').empty();
            $('#win-overlay').show();
            $('#board-messages').append(`<p class="slideIn display-4" style="margin-top: 10px;">GAME OVER</p>`)
            console.log($resetButton)
        }
    }
    
    
    
    
    
    const firstQuestion = function() {
        if ($playerInput.val().length === 0) {
            $('#intro-text').empty();
            newMessage = $('#intro-text').append(`<p class="slideIn display-5" style="margin-top: 10px;">Don't be shy, we won't bite</p>`)
            
        } 
        else {
            $('#intro-text').empty();
            $('#player-name').append(`${$playerInput.val()}`)
            $('#healthBar-name').append(`${$playerInput.val()}'s Drunkness`)
            $($playerInput).hide();
            $($enterButton).hide();
            $('#answer-buttons').show();
            $('#reset-button-2').hide();
            
            
            newMessage = $('#intro-text').append(`<p class="slideIn display-5" style="margin-top: 10px;">Rock on ${$playerInput.val()}! We have a special game just for newbies like you, are you interested? <br><br></p>`)
        }
    }
    
    const secondQuestion = function() {
        $('#sure-button').on('click', function () {
            $('#intro-text').empty();
            newMessage = $('#intro-text').append(`<p class="slideIn display-5" style="margin-top: 10px;">Great! Let's begin by going over the instructions</p>`);
            $('#answer-buttons').hide();
            $('#how-to-2').show();
        })
        
        $('#nahh-button').on('click', function () {
            $('#intro-text').empty();
            newMessage = $('#intro-text').append(`<p class="slideIn display-5" style="margin-top: 10px;">Come see us anytime<br><br></p>`);
            $('#answer-buttons').hide();
            $('#reset-2').show();
            $('#reset-button-2').show();
        })
    }
    
    
    $letsPlay.on('click', letsPlay)
    $helpButton.on('click', helpButton);
    $exitButton.on('click', exitInstruction);
    $('#reset-button-2').on('click', restartGame);
    $('#how-to-2').on('click', helpButton);
    $resetButton.on('click', restartGame);

});



