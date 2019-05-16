// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < 505){
        this.x += this.speed * dt;
    }else{
        this.x =0;
    }
    this.chckCollision();
};

Enemy.prototype.chckCollision = function(){
    if (player.y + 131 >= this.y + 90 &&
        player.y + 73 <= this.y + 135 &&
        player.x + 25 <= this.x + 88 &&
        player.x + 76 >= this.x + 11) {
        console.log('collision');
        gameReset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var player = function(x, y, speed){
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

player.prototype.update = function(){};

player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

player.prototype.handleInput = function(key) {
    switch(key){
        case 'left' :
            this.x -= (this.speed +505) % 505;
            if (this.x < 2.5) {
                this.x = 2.5;
            }
            break;
        case 'right' :
            this.x += (this.speed) % 505;
            if (this.x > 419) {
                this.x = 419;
            }
            break;
        case 'up' :
            this.y -= (this.speed +606) % 606;
            if (this.y <= (83 - 48)) { 
                gameOver();
                return;
            }
            break;
        case 'down' :
            this.y += (this.speed) % 606;
            if (this.y > 400) {
                this.y = 400;
            }
            break;
    }
};

player.prototype.reset = function(){
    this.x = 202.5;
    this.y = 383;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var player = new player(0, 0, 50);
var scoreDiv = document.createElement('div');
gameReset();
var canvasDiv = document.getElementsByTagName('canvas')[0];
document.body.insertBefore(scoreDiv, canvasDiv);



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function gameReset() {
    player.reset();
    score = 0;
    //updateDisplay();
    allEnemies = [];
    allEnemies.push(
        new Enemy(0, Math.random() * 150 + 50, Math.random() * 100 + 40),
        new Enemy(0, Math.random() * 150 + 70, Math.random() * 100 + 60)
    );
}
function gameOver() {
    player.reset();
    score += 1;
    //updateDisplay();
    if (score % 2 == 0 && allEnemies.length < 4) {
        allEnemies.push(new Enemy(0, Math.random() * 160 + 50, Math.random() * 90 + 70));
    }
}

/*
 * updates the on screen score display
 */
/*function updateDisplay() {
    scoreDiv.innerHTML = 'Score ' + score;
}*/
