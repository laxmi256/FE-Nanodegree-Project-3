// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x >= 505) {
        this.x = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
//Player constructor function which initializes all the player variables
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

//Once the player reaches the other side, reintialize the player position
//and increase the enemy count to a a maximum of 7
//check for the boundary
Player.prototype.update = function() {
    if (this.y <= FINAL_POINT) {
        this.x = INITIAL_X;
        this.y = INITIAL_Y;
           
        //Allow a maximum of only 7 enemy bugs
        if (enemyCount < 7 )
        {
            this.callEnemy();
            enemyCount++;
        }
        else
        {
            success = 1;
            this.speed = 0;
            this.x = INITIAL_X;
            this.y = INITIAL_Y;
            stepX = 0;
            stepY = 0;
            for (var i = 0; i < enemyCount; i++)
            {
                allEnemies[i].x = 0;
                allEnemies[i].y = 0;
                allEnemies[i].speed = 0;
            }
            ctx.font = "20px Verdana";
            ctx.strokeStyle='green';
            ctx.strokeText(" YOU WON !!! Reload to Continue The Game !!!", 20, 30);
        }
    }

    //check for the boundary and adjust the player position accordingly
    if (this.x <= -2) {
        this.x = -2;
    }
    if(this.x >= 402) {
        this.x = 402;
    }
    if(this.y >= 383) {
        this.y = 383;
    }

    //Check for collision
    //Reset the player position if collided
    for (var i = 0; i < enemyCount; i++)
    {
        if (this.x <= (allEnemies[i].x + 40) &&
            allEnemies[i].x <= (this.x + 40) &&
            this.y <= (allEnemies[i].y + 40) &&
            allEnemies[i].y <= (this.y + 40)) {
            
            this.x = INITIAL_X;
            this.y = INITIAL_Y;            

            if (failCount == 3)
            {
                this.speed = 0;
                stepX = 0;
                stepY = 0;
                for (var i = 0; i < enemyCount; i++)
                {
                    allEnemies[i].speed = 0;
                }
                ctx.font = "20px Verdana";
                ctx.strokeStyle='red';
                ctx.strokeText(" YOU LOST !!! Reload to Continue The Game !!!", 20, 30);
            }
            else
            {
                failCount++;
            }
        }
    }
};

// Draw the player on the screen, required method for game
//Update the level on the screen and displays the star earned ny the player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (enemyCount < 8)
    {
        ctx.clearRect(170, 590, 200, 30);
        ctx.font="20px Verdana";
        ctx.strokeStyle='blue';
        ctx.strokeText("LEVEL : " + enemyCount, 205, 610);

        for (var i = 1;  i < enemyCount; i++)
        {
            ctx.drawImage(Resources.get('images/Star.png'), -10 + (i-1)*70, 435);
        }

        if (enemyCount == 7 && success == 1)
        {
            ctx.drawImage(Resources.get('images/Star.png'), -10 + 6*70, 435);
        }
    }
};

//Checks if the user has pressed the up, down, left, and right arrow keys.
//If so, the player is moved in the corresponding direction.
//Also checks if the user has pressed Enter key.
//If so, the player is changed accordingly.
//Step size is made as 101 * 83
Player.prototype.handleInput = function(keyPress) {
    if (keyPress == 'left') {
        this.x -= this.speed + stepX;
    }
    if (keyPress == 'right') {
        this.x += this.speed + stepX;
    }
    if (keyPress == 'up') {
        this.y -= this.speed + stepY;
    }
    if (keyPress == 'down') {
        this.y += this.speed + stepY;
    }
    if (keyPress == 'enter') {
        playerCount++;
        if (playerCount == 1){
            this.sprite = 'images/char-cat-girl.png';
        }
        else if (playerCount == 2){
            this.sprite = 'images/char-horn-girl.png';
        }
        else if (playerCount == 3){
            this.sprite = 'images/char-pink-girl.png';
        }
        else if (playerCount == 4){
            this.sprite = 'images/char-princess-girl.png';
        }
        else {
            playerCount = 0;
            this.sprite = 'images/char-boy.png';
        }
    }
};

//This function calls the enemy bug in each level
Player.prototype.callEnemy = function() {
   var enemy = new Enemy(Math.random(), Math.random() * 200, Math.random() * 250);
   allEnemies.push(enemy);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var PLAYER_SPEED = 60;
var INITIAL_X = 200;
var INITIAL_Y = 300;
var FINAL_POINT = -32;
var stepX = 41;
var stepY = 23;
var enemyCount = 0;
var playerCount = 0;
var failCount = 0;
var success = 0;

var allEnemies = [];
var player = new Player(INITIAL_X, INITIAL_Y, PLAYER_SPEED);

//To start the game, initially call an enemy bug
player.callEnemy();
enemyCount++;

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});