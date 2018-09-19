/*
 * The enemy class holds the information needed for each individual enemyCount
 * that appears on screen.
 */
var _global = this;
var updateLogic = false;
var direction = 1;
var enemyMoveSpeed = 10;
var deltaY = 0;

(function () {

  //assigns an id to each enemy
  var idCounter = 0;

  //Enemy constructor
  function Enemy (_x, _y, _imgSrc, _imgSrcA)
  {

    this.id = idCounter++;
    this.x  = _x;
    this.y  = _y;
    this._time  = 0;

    //Values to simulant moving enemies
    this.imgSrc = _imgSrc;
    this.imgSrcA = _imgSrcA;
    this.frame = 1;
    this.delay = 720;

    this._width = 20;
    this._height = 16;
    this._moveSpeed = 10;
    this._fire = false;
  }

  //Makes the Enemy class available to other files
  _global.Enemy = Enemy;



  Enemy.prototype.update = function (tDelta)
  {
	this._time += tDelta;

	if (this._time >= this.delay){

		// Randomly shoot based on delay so the the faster they get, the more they fire.
		var fireTest = Math.floor(Math.random() * (this.delay + 1));

		if (fireTest < (this.delay / 100)){
			this._fire = true;
		}

		if (this.x + (this._width + 6) >= fallCanvas.width && direction == 1){
			updateLogic = true;
		}
		else if(this.x - 6 <= 0 && direction != 1){
			updateLogic = true;
		}

		this.frame = -this.frame;
		this.x += enemyMoveSpeed;
		this._time = 0;
	}

	this.y += deltaY;
  };

})();
