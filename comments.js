var game;
var WIDTH = 960;
var HEIGHT = 640;

var backgroundWidth = WIDTH;
var backgroundHeight = HEIGHT;
var backgroundImage;
var backgroundSprite;
var BACKGROUND_SPEED = 2;

var groundWidth = WIDTH;
var groundHeight = 20;
var groundImage;
var groundSprite;
var GROUND_SPEED = 0;

var playerWidth = WIDTH / 10;
var playerHeight = HEIGHT / 8;
var playerImage;
var playerSprite;
var PLAYER_SPEED = 2;
var PLAYER_JUMP = 5;

var crateWidth = 25;
var crateHeight = 25;
var crateImage;
var crateSprite;
var CRATE_SPEED = -150;

var crateImage2;
var crateSprite2;

var score = 0;
var scoreTxt;

// var KEY = event.keyCode;
debugger
var generateRandomNumberWithMax = function(maxNumber) {
    debugger
    var randomNumber = Math.floor(Math.random() * (maxNumber + 1));
    return randomNumber;
};

// var x = generateRandomNumberWithMax(100);





var preload = function () {
    debugger
    // game.stage.setBounds(0, 0, 480, 320);
    game.stage.backgroundColor = '#666699';
    
    backgroundImage = game.add.bitmapData(backgroundWidth, backgroundHeight);
    backgroundImage.ctx.beginPath();
    backgroundImage.ctx.rect(0, 0, backgroundWidth, backgroundHeight);
    backgroundImage.ctx.fillStyle = '#000000'; // see http://html-color-codes.info/ for color options
    backgroundImage.ctx.fill();
    
    groundImage = game.add.bitmapData(groundWidth, groundHeight);
    groundImage.ctx.beginPath();
    groundImage.ctx.rect(0, 0, groundWidth, groundHeight);
    groundImage.ctx.fillStyle = '#663300';
    groundImage.ctx.fill();
    
    // game.load.image('playerImage', 'cave_games/Stick_Figure.jpg');
    playerImage = game.add.bitmapData(playerWidth, playerHeight);
    playerImage.ctx.beginPath();
    playerImage.ctx.rect(0, 0, playerWidth, playerHeight);
    // playerImage.ctx.ellipse(10, 300, playerWidth, playerHeight, 0, 0, 0, 0);
    playerImage.ctx.fillStyle = '#ffffff';
    playerImage.ctx.fill();
    
    crateImage = game.add.bitmapData(crateWidth, crateHeight);
    crateImage.ctx.beginPath();
    crateImage.ctx.rect(0, 0, crateWidth, crateHeight);
    crateImage.ctx.fillStyle = '#ff0000';
    crateImage.ctx.fill();
    
    // crateImage2 = game.add.bitmapData(crateWidth, crateHeight);
    // crateImage2.ctx.beginPath();
    // crateImage2.ctx.rect(0, 0, crateWidth, crateHeight);
    // crateImage2.ctx.fillStyle = '#ff9900';
    // crateImage2.ctx.fill();
    
}

var createSprite = function(spriteImage) {
    
    var spriteName = game.add.sprite(0, 0, spriteImage);
    game.physics.enable(spriteName, Phaser.Physics.ARCADE);
    
};

var create = function () {
    debugger
    
    // crateSprite = game.add.group();
    // for (var i = 0; i < 16; i++) {
    //     crateSprite.game.add.sprite(360 + Math.random() * 200, 120 + Math.random() * 200, 'crateImage');
    // }
    
    
    // for (var i = 0; i < 2; i += WIDTH) {
    //     backgroundSprite = game.add.sprite(i, 0, backgroundImage);
    // }
    backgroundSprite = game.add.sprite(0, 0, backgroundImage);
    
    
    playerSprite = game.add.sprite(1, HEIGHT - (playerHeight + groundHeight), playerImage);
    // playerSprite.x = generateRandomNumberWithMax(100);
    
    crateSprite = game.add.sprite(900, HEIGHT - (crateHeight + groundHeight), crateImage);
    // crateSprite.x = generateRandomNumberWithMax(100);
    // 900
    
    crateSprite2 = game.add.sprite(generateRandomNumberWithMax(900), HEIGHT - (crateHeight + groundHeight), crateImage);
    
    // crateSprite = game.add.group();
    // crateSprite.enableBody = true;
    // crateSprite.createMultiple(2, crateImage);
    //     for (var i = 0; i < 50; i++)
    //     {
    //     var s = crateSprite.create(300, WIDTH - crateHeight, crateImage);
    //     s.name = crateImage + s;
    //     s.body.collideWorldBounds = true;
    //     s.body.velocity.setTo(-100, 10);
    //     // s.body.bounce.setTo(0.8, 0.8);
    //     // s.body.velocity.setTo(10 + Math.random() * 40, 10 + Math.random() * 40);
    //     }

    // crateSprite.gravity = 0;
    // crateSprite.body.allowGravity = false;
    
    groundSprite = game.add.sprite(0, HEIGHT - groundHeight, groundImage);
    // groundSprite.body.immovable = true;
    
    // Physics:
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;
    game.physics.enable([playerSprite, crateSprite, crateSprite2, groundSprite], Phaser.Physics.ARCADE);
    // crateSprite2
    // playerSprite.body.immovable = true;

    groundSprite.body.immovable = true;
    groundSprite.body.velocity.setTo(0, 0);

    // Sets bounds for sprites. 
    playerSprite.body.collideWorldBounds = true;
    groundSprite.body.collideWorldBounds = true;
    // groundSprite.body.checkCollision.top = true;
    // crateSprite.checkWorldBounds = true;
    
    // crateSprite.outOfBoundsKill = true;

    // crateSprite.anchor.setTo(0.5, 0.5);
}

var update = function () {
    debugger    
    
    game.physics.arcade.collide(playerSprite, crateSprite, collisionHandler, null, this);
    game.physics.arcade.collide(crateSprite, groundSprite);
    game.physics.arcade.collide(playerSprite, groundSprite);
    game.physics.arcade.collide(playerSprite, crateSprite2, collisionHandler, null, this);
    game.physics.arcade.collide(crateSprite2, groundSprite);
    
    // game.physics.arcade.collide(playerSprite, groundSprite, collisionHandler2, null, this);


    // backgroundSprite.x -= BACKGROUND_SPEED;
    // if (backgroundSprite.x < -WIDTH * 2) {
    //     backgroundSprite.x = 480;
    // }
    
    // Physics:
    // game.physics.enable([playerSprite, groundSprite], Phaser.Physics.ARCADE);
    // groundSprite.gravity = static;
    
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
        playerSprite.y -= PLAYER_JUMP;
        // playerSprite.gravity.y = 100; //LEAVE OUT. INTERFERES WITH PLAYER_JUMP
    }
    
    if (game.input.mousePointer.isDown || game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
        playerSprite.x += PLAYER_SPEED;
        playerSprite.body.acceleration.x = 0;
        // playerSprite.body.angularVelocity = 0; //no change
    }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            playerSprite.x -= PLAYER_SPEED;
            playerSprite.body.acceleration.x = 0;
            // playerSprite.body.angularVelocity = 0;
        }
    
    if (playerSprite.x > crateSprite.x && playerSprite.x < crateSprite.x + 5) {
        score = score + 1;
        // playerSprite.y = generateRandomNumberWithMax();
    }
    
    // if (playerSprite.x > crateSprite2.x && playerSprite.x < crateSprite2.x + 5) {
    //     score = score + 1;
    // }
    
    
    
    
    
    crateSprite.body.velocity.x = CRATE_SPEED; // CONSTANT VELOCITY
    if (crateSprite.x < -crateWidth) {
        debugger
        crateSprite.x = WIDTH + crateWidth;
        crateSprite.y = generateRandomNumberWithMax(595); // Math.floor(Math.random() * 595);
    }
    
    crateSprite2.body.velocity.x = CRATE_SPEED;
    if (crateSprite2.x < -crateWidth) {
        crateSprite2.x = WIDTH + crateWidth;
        crateSprite2.y = generateRandomNumberWithMax(595); // Math.floor(Math.random() * 595);
    }  
    
    groundSprite.body.velocity.x = GROUND_SPEED;

    
}

function collisionHandler (obj1, obj2) {
    debugger
    // if (obj1 == playerSprite && obj2 == crateSprite) {
        alert("Done");
        // score = score - 1;
        game.state.restart();
        score = 0;
        
    // }
    // else if (obj1 == playerSprite && obj2 == groundSprite) {
        
    // }
}



// function addCrate (x, y) {  
//     // Get the first dead pipe of our group
//     var crate = this.crateSprite.getFirstDead();

//     // Set the new position of the pipe
//     crate.reset(x, y);

//     // Add velocity to the pipe to make it move left
//     crate.body.velocity.x = -200; 

//     // Kill the pipe when it's no longer visible 
//     crate.checkWorldBounds = true;
//     crate.outOfBoundsKill = true;
// }


// function collisionHandler2 (obj1, obj2) {
//     alert("player v ground");
// }

var render = function () {
    // game.debug.text(game.time.fps || '--', 2, 14, '#00ff00');
    // game.debug.text("background.x = " + backgroundSprite.x, 500, 10, '#00ff00');
    game.debug.text("Score = " + score, WIDTH / 2, 25, '#00ff00');
    game.debug.text("playerSprite.y = " + playerSprite.y, WIDTH/2, 45, '#00ff00');
    game.debug.text("crateSprite.y = " + crateSprite.y, WIDTH/2, 65, '#00ff00');
    game.debug.text("crateSprite.x = " + crateSprite.x, WIDTH/2, 85, '#00ff00');
    game.debug.text("crateSprite.velocity.x = " + crateSprite.body.velocity.x, WIDTH/2, 105, '#00ff00');
    // game.debug.text("crateSprite2.x = " + crateSprite2.x, WIDTH/2, 125, '#00ff00');
    // game.debug.text("crateSprite2.y = " + crateSprite2.y, WIDTH/2, 145, '#00ff00');


}

var mainState = { preload: preload, create: create, render: render, update: update };
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');