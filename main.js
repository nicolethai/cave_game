var game;
var WIDTH = 960;
var HEIGHT = 640;

var backgroundWidth = WIDTH;
var backgroundHeight = HEIGHT;
var backgroundImage;
var backgroundSprite;

var groundWidth = WIDTH;
var groundHeight = 20;
var groundImage;
var groundSprite;
var GROUND_SPEED = 0;

var playerWidth = 20;
var playerHeight = 20
var playerImage;
var playerSprite;
var PLAYER_SPEED = 2;
var PLAYER_JUMP = 5;

var crateWidth = 25;
var crateHeight = 25;
var crateImage;
var crateSprite = [];
var CRATE_SPEED = -150;
var crateNum = 100;

var score = 0;


var generateRandomNumBetween = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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


var create = function () {
    backgroundSprite = game.add.sprite(0, 0, backgroundImage);
    
    playerSprite = createSprite(1, HEIGHT - (playerHeight + groundHeight), playerImage);
     
    for (var count = 0; count < crateNum; count++) {
        crateSprite[count] = createSprite(generateRandomNumBetween(500, 900), generateRandomNumBetween(1, 595), crateImage);
        crateSprite[count].body.velocity.x = CRATE_SPEED; // CONSTANT VELOCITY

    };

    groundSprite = createSprite(0, HEIGHT - groundHeight, groundImage); // physics not enabled, yay!
    
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

    game.physics.arcade.collide(playerSprite, crateSprite[0], collisionHandler, null, this);
    game.physics.arcade.collide(playerSprite, crateSprite[1], collisionHandler, null, this);
    game.physics.arcade.collide(playerSprite, crateSprite[2], collisionHandler, null, this);
    game.physics.arcade.collide(playerSprite, crateSprite[3], collisionHandler, null, this);
    game.physics.arcade.collide(playerSprite, crateSprite[4], collisionHandler, null, this);

    game.physics.arcade.collide(crateSprite[0], groundSprite);
    game.physics.arcade.collide(crateSprite[1], groundSprite);
    game.physics.arcade.collide(crateSprite[2], groundSprite);
    game.physics.arcade.collide(crateSprite[3], groundSprite);
    game.physics.arcade.collide(crateSprite[4], groundSprite);
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
    
    for (var count = 0; count < crateNum; count++) {
        if (crateSprite[count].x < -crateWidth) {
=            crateSprite[count].x = WIDTH + crateWidth;
            crateSprite[count].y = generateRandomNumBetween(1, 595);
        }
        if (playerSprite.x > crateSprite[count].x && playerSprite.x < crateSprite[count].x + 5) {
            score = score + 1;
        }
    }

}

var collisionHandler = function(obj1, obj2) {
    debugger
        alert("Game Over");
        game.state.restart();
        score = 0;
}


var render = function () {
    game.debug.text("Score = " + score, WIDTH / 2.5, 30, '#00ff00');
}


var mainState = { preload: preload, create: create, render: render, update: update };
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');