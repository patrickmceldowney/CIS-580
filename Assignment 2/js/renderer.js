/*
 * The renderer class creates an object that can be called to
 * render sprites on the screen. This class makes all the
 * visuals displayed on the canvas.
 */
var _global = this;

(function () {

	function Renderer(canvas){
		this._enemies = {};
		this._player = {};
		this._projectiles = {};
		this.init(canvas);
	}

	//makes the Renderer object available to all files
	_global.Renderer = Renderer;

	//intializes the game canvas
	Renderer.prototype.init = function (canvas)
	{
		this._canvas = canvas;
		this._context = this._canvas.getContext("2d");
		this._width = this._canvas.width;
		this._height = this._canvas.height;
	};

	//updates the movements of sprites on screen
	Renderer.prototype.redraw = function ()
	{
		draw.call(this);
	};

	//add enemies at the beginning of the game or at the beginning of the next wave
	Renderer.prototype.addEnemy = function (enemy)
  {
      this._enemies[enemy.id] = enemy;
  };

	//delete enemy if it collides with player projectile
	Renderer.prototype.removeEnemy = function (enemy)
  {
      delete this._enemies[enemy.id];
  };

	//adds a player at the beginning of the game
	Renderer.prototype.addPlayer = function (player)
  {
      this._player[player.id] = player;
  };

	//adds a projectile every time the space bar is pressed
	Renderer.prototype.addProjectile = function (projectile)
  {
      this._projectiles[projectile.id] = projectile;
  };

	//removes a projectile if it collides with an enemy or goes beyond the game bounds
	Renderer.prototype.removeProjectile = function (projectile)
  {
      delete this._projectiles[projectile.id];
  };


	//fills the game canvas with sprites and animations
  function draw ()
  {
    // foreground
  	this._context.clearRect(0, 0,this._width, this._height);
		this._context.fillStyle = 'black';
		for (var id in this._enemies) {
			var enemy = this._enemies[id];
			this._context.save();
			if (enemy.frame == 1){
				this._context.drawImage(enemy.imgSrc, enemy.x, enemy.y);
			}else{
				this._context.drawImage(enemy.imgSrcA, enemy.x, enemy.y);
			}

			this._context.restore();
		}

		for (var id in this._player) {
			var player = this._player[id];
			this._context.save();
			this._context.drawImage(player.imgSrc, player.x, player.y);

			for (i=0; i<= player._lives; i++){
				this._context.drawImage(player.imgSrc, (this._width / 2) + 180 + (i * 38), 4);
			}

			this._context.restore();
		}

		for (var id in this._projectiles) {
			var projectile = this._projectiles[id];
			this._context.save();

			if (projectile.frame == 1){
				this._context.drawImage(projectile.imgSrc, projectile.x, projectile.y);
			}else{
				this._context.drawImage(projectile.imgSrc, projectile.x, projectile.y);
			}

			this._context.restore();
		}

  }

})();
