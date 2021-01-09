const CARDS = [
    {
        img: 'https://i.pinimg.com/236x/ed/19/e9/ed19e9d50a85c69ab8dcef11ebefbe33.jpg',
        title: 'Robert Plant',
        damage: 5,
    },

    {
        img: "https://i.pinimg.com/originals/b3/86/0b/b3860b7fcd969ca8c008c20d97d3c4ec.jpg",
        title: 'Jimmy Page',
        damage: 5,
    },

    {
        img: 'https://i.pinimg.com/originals/b0/2b/b1/b02bb1a0bd854e89c55e15ef17a82163.jpg',
        title: 'John Bonham',
        damage: 5,
    },
    
    {
        img: 'https://paulkingart.com/wp-content/uploads/2018/01/John-Paul-Jones_PWK.jpg',
        title: 'John Paul Jones',
        damage: 5,
    },

    {
        img: 'https://static.turbosquid.com/Preview/2019/06/28__14_12_53/A.jpgA2C30F7B-33CA-47FB-AE1E-1BE59BDEAC2DLarge.jpg',
        title: 'Whiskey',
        damage: 3,
    },

    {
        img: 'https://i0.wp.com/ae01.alicdn.com/kf/HTB1J3tZdBDH8KJjy1zeq6xjepXar/-Two-pieces-lot-Aquafina-Water-Bottle-Diversion-Safe-Can-Stash-Bottle-Hidden-Security-container.jpg?crop=6,3,950,600&quality=3886',
        title: 'Water',
        damage: 0,
    },

    {
        img: 'https://cdna.artstation.com/p/assets/images/images/013/933/906/large/igor-borisenko-red-packshot.jpg?1541716476',
        title: 'Wine',
        damage: 1,
    },

    {
        img: 'https://www.3dfluff.com/wp-content/uploads/beer2.jpg',
        title: 'Beer',
        damage: 1,
    },

    {
        img: 'https://images.pond5.com/absolut-vodka-3d-090609734_iconl.jpeg',
        title: 'Vodka',
        damage: 2,
    },

    {
        img: 'https://www.absinthes.com/media/image/f6/4d/2e/tequila-villa-lobos-blanco-tequila-40-0-7l-18954-1117619dIP4Edq1vePC_1280x1280.jpg',
        title: 'Tequila',
        damage: 4,
    },
]
const $letsPlay = $('#lets-play');
const $gameBoard = $('.board');
const $resetButton = $('.reset-button');
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
let playerDamage = 0;
let cpuDamage = 0;
let newMessage;
let playerCurrentCard;
let cpuCurrentCard;
// let resetGame = false;

$(function () {
    
    // NOTE the first thing to popup when window loads
    gameStart();

    $('.fa-pause-circle').hide();

    $('.fa-play-circle').on('click', function(){
        $(this).hide();
        $('.fa-pause-circle').fadeIn();
        $('#myMysic')[0].play();
    })
    
    $('.fa-pause-circle').on('click', function(){
        $(this).hide();
        $('.fa-play-circle').fadeIn();
        $('#myMysic')[0].pause();
    })

    
    
    function gameStart () {
    
        $helpButton.hide();
        $introToGame.hide();
        $howTo.hide();
        $playerInput.val('');
        $gameBoard.hide();
        $resetButton.hide();
        $letsPlay.show();
        $('#lose-overlay').hide();
        $('#win-overlay').hide();
        $('.deal-cards').hide();
        $('#some-input').empty();
    }
    
    // NOTE when the player clicks on reset
    const restart = function () {

        $('#yes-answer').empty();
        $('#no-answer').empty();
        $('#no-input').empty();
        $('#some-input').empty();
        $('#intro-text').show();
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
        $('.bg-music').show();
        $('.credits-button').show();
        $('#win-overlay').hide();
        $('#lose-overlay').hide();
        $('#player-input-div').show();
        $('#enter-button').show();
        $($playerInput).show();

        // checkRestart();
    }

    $("#win-reset-container").delegate($resetButton, "click", restart)
    $("#lose-reset-container").delegate($resetButton, "click", restart)
    $("#reset-2").delegate($resetButton, "click", restart)
    $($resetButton).on('click', restart);
    
    // NOTE when the player clicks on "let's play"
    const letsPlay = function () {
        
        $('.bg-music').hide();
        $('.credits-button').hide();
        $('#how-to-2').hide();
        $('#reset-2').hide();
        $('#answer-buttons').hide();
        $introToGame.show();
        $letsPlay.hide();
    }
    
    $('.credits-button').on('click',function(){
        $('#credits').toggle();
    })
    
    const helpButton = function () {
        $howTo.show();
        $introToGame.hide();
    }
    
    const exitInstruction = function () {
        $howTo.hide();
        $gameBoard.show();
        $('.deal-cards').show();
        $resetButton.show();
        $('#board-messages').append(`<p class="slideIn h1" style="margin-top: 10px;">Click on the 'Drink' button below to display your first cards!</p>`)
    }
    
    $('.deal-cards').on('click', function() {
        
        $('#board-messages').empty();
        $('#p1-cards').empty();
        $('#p2-cards').empty();
        
        newCard();
        cpuCard();
        
        newMessage = $('#board-messages').append(`
        <p class="slideIn h1 fw-bold" style="margin-top: 10px;">WATCHOUT!</p>
        
        <p class="slideIn h1" style="margin-top: 10px;">${$playerInput.val()}'s drink was worth ${playerDamage} alcohol!</p>
        
        <p class="slideIn h1" style="margin-top: 10px;">The opponent's was worth ${cpuDamage}!</p>
       `)
        addMessage();
        checkDamage();
        winCondition();
    })

    const newCard = function () {
        let card = Math.floor(Math.random() * CARDS.length);
        playerDamage = CARDS[card].damage;
        playerCurrentCard = CARDS[card];
        $('#p1-cards').append(`<div class="flip-card" style="position:relative">
            <div class="flip-card-inner">
            <div class="flip-card-front" style="box-shadow: 0 14px 28px 0 rgb(116, 134, 233); border-radius: 5rem;">
            <img src="${CARDS[card].img}" alt="${CARDS[card].title}" style="width:300px;height:400px; border-radius: 5rem;">
            </div>
            <div class="flip-card-back" style="box-shadow: 0 14px 28px 0 rgb(116, 134, 233); border-radius: 5rem;">
            <h2 style="padding-top: 20px; color: black;"><u>${CARDS[card].title}</u></strong>
            </h2>
            <p id="player-damage-value" class="h2" style="color: black; padding-top: 20px;">This card has a value of ${CARDS[card].damage}!</p><i class="fas fa-guitar little-guitar font-effect-anaglyph"></i>
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
            <div class="flip-card-front" style="box-shadow: 0 14px 28px 0 rgb(255, 44, 37); border-radius: 5rem;">
            <img src="${CARDS[card].img}" alt="${CARDS[card].title}" style="width:300px;height:400px; border-radius: 5rem;">
            </div>
            <div class="flip-card-back" style="box-shadow: 0 14px 28px 0 rgb(255, 44, 37); border-radius: 5rem;">
            <h2 style="padding-top: 20px; color: black;"><u>${CARDS[card].title}</u></strong>
            </h2>
            <p id="player-damage-value" class="h2" style="color: black; padding-top: 20px;">This card has a value of ${CARDS[card].damage}!</p><i class="fas fa-drum font-effect-anaglyph"></i>
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

    const addMessage = function () {
        if (playerCurrentCard.damage < cpuCurrentCard.damage) {
            $('#board-messages').append(`<p class="h1 slideIn"><strong>The opponent beats ${$playerInput.val()} this round</p>`)
        } else if (playerCurrentCard.damage > cpuCurrentCard.damage) {
            $('#board-messages').append(`<br><p class="h1 slideIn">${$playerInput.val()} wins this round!</p>`)

        }
    }
    
    const winCondition = function () {

        if (playerCurrentHealth === 0) {
            $('#board-messages').empty();
            $('#lose-overlay').show();
            $('#board-messages').append(`<p class="slideIn display-4" style="margin-top: 10px;">GAME OVER</p>`)
            $('#lose-reset-container').empty();
            $('<button class="reset-button btn btn-lg btn-danger">RESET</button>').appendTo('#lose-reset-container');
            $('.deal-cards').disabled()
            
        } else if (opponentCurrentHealth === 0) {
            $('#board-messages').empty();
            $('#win-overlay').show();
            $('#win-reset-container').empty();
            $('#board-messages').append(`<p class="slideIn display-4" style="margin-top: 10px;">GAME OVER</p>`)
            $('<button class="reset-button btn btn-lg btn-danger">RESET</button>').appendTo('#win-reset-container')
            $('.deal-cards').disabled()

        }
    }
    
    $enterButton.on('click', function (){

        if ($playerInput.val().length === 0) {
            $('#intro-text').hide();
            $('#no-input').empty();
            $(`<p class="slideIn display-5" style="margin-top: 10px;">Don't be shy, we won't bite</p><br>`).appendTo('#no-input');
        } 

        else {
            $('#intro-text').hide();
            $('#no-input').empty();
            $('#player-name').append(`${$playerInput.val()}`)
            $('#healthBar-name').append(`${$playerInput.val()}'s Sobriety`)
            $($playerInput).hide();
            $($enterButton).hide();
            $('#answer-buttons').show();
            
            $('#some-input').append(`<p class="slideIn display-5" style="margin-top: 10px;">Welcome ${$playerInput.val()}! We have a special game just for newbies like you, are you interested? <br><br></p>`)
        }
    })
    
    $('#yes-button').on('click', function () {
        $('#intro-text').hide();
        $('#yes-answer').append(`<p class="slideIn display-5" style="margin-top: 10px;">Great! Let's begin by going over the instructions</p><br>`);
        $('#answer-buttons').hide();
        $('#how-to-2').show();
        $('#some-input').empty()
    })
    
    $('#no-button').on('click', function () {
        $('#intro-text').hide();
        $('#no-answer').append(`<p class="slideIn display-5" style="margin-top: 10px;">Come see us anytime</p><br>`);
        $('#answer-buttons').hide();
        $('#reset-2').empty();
        $('#reset-2').show();
        $('<button class="reset-button btn btn-lg btn-danger">RESET</button>').appendTo('#reset-2');
        $('#some-input').empty()
    })

    
    $letsPlay.on('click', letsPlay)
    $helpButton.on('click', helpButton);
    $exitButton.on('click', exitInstruction);
    $('#how-to-2').on('click', helpButton);
});
