var game;
var WIDTH = 960;
var HEIGHT = 640;

var xPos;
var yPos;

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


var generateRandomNumberWithMax = function(maxNumber) {
    debugger
    var randomNumber = Math.floor(Math.random() * (maxNumber + 1));
    return randomNumber;
};

var genRandomNumberForCrateWithMax = function(maxNumber) {
    debugger
    var randomNumber = 500 + Math.floor(Math.random() * (maxNumber + 1));
    return randomNumber;
};



var createSpriteImage = function(width, height, color) {
    
    var spriteImage = game.add.bitmapData(width, height);
        spriteImage.ctx.beginPath();
        spriteImage.ctx.rect(0, 0, width, height);
        spriteImage.ctx.fillStyle = color;
        spriteImage.ctx.fill();
   
    return spriteImage;
    
};


var preload = function () {
    debugger

    game.stage.backgroundColor = '#666699';
    
    backgroundImage = createSpriteImage(backgroundWidth, backgroundHeight, '#000000');
    groundImage = createSpriteImage(groundWidth, groundHeight, '#663300');
    playerImage = createSpriteImage(playerWidth, playerHeight, '#ffffff');
    crateImage = createSpriteImage(crateWidth, crateHeight, '#ff0000');
    
}



var createSprite = function (xPos, yPos, spriteImage) {
    
    var sprite = game.add.sprite(xPos, yPos, spriteImage);
   
    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    return sprite;
}

var createCrates = function(numCrates) {
    for (var num = 0; num < numCrates; num++) {
        createSprite(generateRandomNumberWithMax(WIDTH - crateWidth), HEIGHT - (crateHeight + groundHeight), crateImage);
    }
}

var create = function () {
    debugger
    
    backgroundSprite = game.add.sprite(0, 0, backgroundImage);
    
    playerSprite = createSprite(1, HEIGHT - (playerHeight + groundHeight), playerImage);
    
    crateSprite = createSprite(900, HEIGHT - (crateHeight + groundHeight), crateImage);
    crateSprite.body.velocity.x = CRATE_SPEED; // CONSTANT VELOCITY
    if (crateSprite.x < -crateWidth) {
        debugger
        crateSprite.x = WIDTH + crateWidth;
        crateSprite.y = genRandomNumberForCrateWithMax(595); // Math.floor(Math.random() * 595);
    }


    // crateSprite = createCrates(5);
    // 
    groundSprite = createSprite(0, HEIGHT - groundHeight, groundImage);
    
    // Physics:
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;

    groundSprite.body.immovable = true;
    groundSprite.body.velocity.setTo(0, 0);

    // Sets bounds for sprites. 
    playerSprite.body.collideWorldBounds = true;
    groundSprite.body.collideWorldBounds = true;
  
}

var update = function () {
    debugger    
    
    game.physics.arcade.collide(playerSprite, crateSprite, collisionHandler, null, this);
    game.physics.arcade.collide(crateSprite, groundSprite);
    game.physics.arcade.collide(playerSprite, groundSprite);
    
  
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
    
    // if (playerSprite.x > crateSprite.x && playerSprite.x < crateSprite.x + 5) {
    //     score = score + 1;
    //     // playerSprite.y = generateRandomNumberWithMax();
    // }
    
    
    crateSprite.body.velocity.x = CRATE_SPEED; // CONSTANT VELOCITY
    if (crateSprite.x < -crateWidth) {
        debugger
        crateSprite.x = WIDTH + crateWidth;
        crateSprite.y = generateRandomNumberWithMax(595); // Math.floor(Math.random() * 595);
    }

    
    groundSprite.body.velocity.x = GROUND_SPEED;

    
}

function collisionHandler (obj1, obj2) {
    debugger
        alert("Done");
        game.state.restart();
        score = 0;
}


var render = function () {
    // game.debug.text(game.time.fps || '--', 2, 14, '#00ff00');
    // game.debug.text("background.x = " + backgroundSprite.x, 500, 10, '#00ff00');
    game.debug.text("Score = " + score, WIDTH / 2, 25, '#00ff00');
    game.debug.text("playerSprite.y = " + playerSprite.y, WIDTH/2, 45, '#00ff00');
    // game.debug.text("crateSprite.y = " + crateSprite.y, WIDTH/2, 65, '#00ff00');
    // game.debug.text("crateSprite.x = " + crateSprite.x, WIDTH/2, 85, '#00ff00');
    // game.debug.text("crateSprite.velocity.x = " + crateSprite.body.velocity.x, WIDTH/2, 105, '#00ff00');


}

var mainState = { preload: preload, create: create, render: render, update: update };
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');