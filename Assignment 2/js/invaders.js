/*
 * This the mother JS file. Everything that happens in this game is controlled
 * within this file. All other JS files are called from here.
 */
$(document).ready(function(){main();});

//variables neccessary for game intialization
var FPS = 30;
var isLoaded = false;
var fallCanvas;
var ticks;
var i=0;
var renderer;
var emitter;
var intervalId;
var gameOver = false;
var wave = 1;

// Set up enemy variables
var enemyCount = 0;
var enemies = {};

//player variable
var players = {};
//projectile variables
var projectileCount = 0;
var projectiles = {};

// Set up the images
var invader = new Image();
invader.src = "assets/invader1.png";
var invaderA = new Image();
invaderA.src = "assets/invader2.png";
var ship = new Image();
ship.src = "assets/ship.png";
var projImage = new Image();
projImage.src = "assets/projectile.png";
var eProjImage = new Image();
eProjImage.src = "assets/eprojectile.png";

/*Main function*/
function main ()
{
  isLoaded = true;
  fallCanvas = document.getElementById("invaders_canvas");
  bgCanvas = document.getElementById("background_canvas");
  resizeCanvas();
  renderer = new Renderer(fallCanvas);
  ticks = Math.ceil(1000 / FPS);
  initGame();
  intervalId = window.setInterval(updateGame, ticks);
}


function resizeCanvas ()
{
	if (isLoaded) {
		fallCanvas.width = 600;
		fallCanvas.height = 700;
		bgCanvas.width = 600;
		bgCanvas.height = 700;

		if (renderer != null) {
			renderer.init(fallCanvas);
		}
	}
}

//adds an enemy to the screen
function addEnemy(enemy){
	enemies[enemy.id] = enemy;
	renderer.addEnemy(enemy);
	++enemyCount;
}

//removes an enemy from the screen if it gets hit with the player projectile
function removeEnemy(enemy)
{
  delete enemies[enemy.id];
  renderer.removeEnemy(enemy);
  --enemyCount;

  //if all enemies are destroyed then reset
	if(enemyCount == 0){
		nextWave();
	}
}

//adds the player to the bottom of the screen
function addPlayer(player){
	players[player.id] = player;
	renderer.addPlayer(player);
}

//adds a projectile to the screen if the user hits space bar or when an enemy randomly shoots
function addProjectile(projectile){
	projectiles[projectile.id] = projectile;
	renderer.addProjectile(projectile);
	++projectileCount;
}

//removes a projectile if it hits its target or it goes out of the screen bounds
function removeProjectile (projectile)
{
    delete projectiles[projectile.id];
    renderer.removeProjectile(projectile);
    --projectileCount;
}

// Set up the initial game
function initGame() {
	var player = new Player(10,bgCanvas.height - 30, ship);
	addPlayer(player);

	for(i = 0; i<= 11; i++){
		for(j = 0; j <=7; j++){
				var enemy = new Enemy(10 + (i*34), 40 + (j*25), invader, invaderA);
			addEnemy(enemy);
		}
	}
}

// Reset the enemies for the next wave
function nextWave() {
	wave++;
	for(i = 0; i<= 11; i++){
		for(j = 0; j <=6; j++){
			var enemy = new Enemy(10 + (i*34), 40 + (j*25), invader, invaderA);
			addEnemy(enemy);
		}
	}
}

// Set up the key events
rightDown = false;
leftDown = false;
space = false;

// Key event handelers
function onKeyDown(evt) {
  if (evt.keyCode == 39) rightDown = true;
  else if (evt.keyCode == 37) leftDown = true;
  if (evt.keyCode == 32){
	   space = true;
	   var projectile = new Projectile(players[0].x + (players[0]._width/2), players[0].y - 10, projImage, 5, 1);
	   addProjectile(projectile);
  };
}

function onKeyUp(evt) {
  if (evt.keyCode == 39) rightDown = false;
  else if (evt.keyCode == 37) leftDown = false;
  else if (evt.keyCode == 32) space = false;
}

$(document).keydown(onKeyDown);
$(document).keyup(onKeyUp);

//updates the game as the user plays
function updateGame(){

  renderer.redraw();

  if (gameOver != true){
  	for (var id in players){
  		var player = players[id];

  		if (player._lives < 0){
  			$('#game_over').fadeIn(2000);
  			gameOver = true;
  		}

  		player.update(100);
  		$('#player_score').html(player._score);
  	}

  	for (var id in projectiles) {
  		var projectile = projectiles[id];
  		projectile.update(100);
  	}

  	// Change the direction of the invaders movement
  	if (updateLogic == true){
  		updateLogic = false;
  		direction = -direction;
  		enemyMoveSpeed = -enemyMoveSpeed;
  		deltaY = 30;
  	}

  	// Loop through the enemies update their speed baased on enemies left, check if they have fired.
  	for (var id in enemies) {
  		var enemy = enemies[id];
  		enemy.delay = (enemyCount * 20) - (wave * 10);

  		if (enemy.delay <=50 ){
  			enemy.delay = 50;
  		}

  		enemy.update(100);

  		if (enemy._fire == true){
  			enemy._fire = false;
  			var projectile = new Projectile(enemy.x + (enemy._width/2), enemy.y + 10, eProjImage, -5, 2);
  			addProjectile(projectile);
  		}
  	}

  	//reset the y value to make the enemies move down.
  	deltaY = 0;

  	//check collisions between player, enemies, and projectiles
  	checkCollisions();
  }
}

//loops through the projectiles and checks who they came from and if they've collided with a target
function checkCollisions(){
	for (var id in projectiles) {
		var projectile = projectiles[id];

		if(projectile._type == 1){
			for (var eid in enemies) {
				var enemy = enemies[eid];

				if (projectile.x >= enemy.x && projectile.x <= (enemy.x + enemy._width)){
					if (projectile.y <= (enemy.y + enemy._height) && projectile.y >= (enemy.y)){
						removeEnemy(enemy);
						removeProjectile(projectile);
						players[0]._score += 100;
					}
				}
			}
		}else{
			for (var pid in players) {
				var player = players[pid];
				if (projectile.x >= player.x && projectile.x <= (player.x + player._width)){
					if (projectile.y <= (player.y + player._height) && projectile.y >= (player.y)){
						removeProjectile(projectile);
						player._lives --;
					}
				}
			}
		}

		if (projectile.y <=0 || projectile.y > fallCanvas.height){
			removeProjectile(projectile);
		}
	}

}
