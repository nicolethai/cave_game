var game;
var WIDTH = 480;
var HEIGHT = 320;

var backgroundWidth = WIDTH;
var backgroundHeight = HEIGHT;
var backgroundImage;
var backgroundSprite;
var BACKGROUND_SPEED = 2;

// var groundWidth = WIDTH;
// var groundHeight = HEIGHT / 10;
// var groundImage;
// var groundSprite;

var playerWidth = WIDTH / 10;
var playerHeight = HEIGHT / 8;
var playerImage;
var playerSprite;
var PLAYER_SPEED = 2;
var PLAYER_JUMP = 2;

var crateWidth = 25;
var crateHeight = 25;
var crateImage;
var crateSprite;
var CRATE_SPEED = 2;


// var KEY = event.keyCode;

var preload = function () {
    // game.stage.setBounds(0, 0, 480, 320);
    game.stage.backgroundColor = '#666699';
    
    backgroundImage = game.add.bitmapData(backgroundWidth, backgroundHeight);
    backgroundImage.ctx.beginPath();
    backgroundImage.ctx.rect(0, 0, backgroundWidth, backgroundHeight);
    backgroundImage.ctx.fillStyle = '#000000'; // see http://html-color-codes.info/ for color options
    backgroundImage.ctx.fill();
    
    // groundImage = game.add.bitmapData(groundWidth, groundHeight);
    // groundImage.ctx.beginPath();
    // groundImage.ctx.rect(0, 0, groundWidth, groundHeight);
    // groundImage.ctx.fillStyle = '#663300';
    // groundImage.ctx.fill();
    
    // game.load.image('playerImage', 'images/Stick_Figure.jpg')
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
    
}

var create = function () {
    debugger
    // for (var i = 0; i < 2; i += WIDTH) {
    //     backgroundSprite = game.add.sprite(i, 0, backgroundImage);
    // }
    backgroundSprite = game.add.sprite(0, 0, backgroundImage);
    
    playerSprite = game.add.sprite(5, 300, playerImage);
    
    crateSprite = game.add.sprite(300, 300, crateImage);
    
    // groundSprite = game.add.sprite(0, 300, groundImage);
    // groundSprite.body.immovable = true;
    
    // Physics:
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 100;
    game.physics.enable([playerSprite, crateSprite], Phaser.Physics.ARCADE);
    
    crateSprite.body.immovable = true;

    // groundSprite.body.immovable = true;
    // groundSprite.body.velocity.setTo(0, 0);

    // Sets bounds for sprites. 
    playerSprite.body.collideWorldBounds = true;
    crateSprite.body.collideWorldBounds = true;
    
}

var update = function () {
    debugger    
    
    game.physics.arcade.collide(playerSprite, crateSprite, collisionHandler, null, this);




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
    }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            playerSprite.x -= PLAYER_SPEED;
        }
    
    crateSprite.x -= CRATE_SPEED;
    
}

function collisionHandler (obj1, obj2) {

        alert("Done");
        
}

var render = function () {
    // game.debug.text(game.time.fps || '--', 2, 14, '#00ff00');
    // game.debug.text("background.x = " + backgroundSprite.x, 500, 10, '#00ff00');

}

var mainState = { preload: preload, create: create, render: render, update: update };
game = new Phaser.Game(WIDTH, HEIGHT, Phaser.AUTO, 'game');
game.state.add('main', mainState);
game.state.start('main');