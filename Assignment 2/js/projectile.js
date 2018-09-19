/*
 * The Projectile class holds all of the information needed to render _projectiles
 * from the player and enemies
 */
var _global = this;

(function () {

  //assigns an id to each projectile added to the screen
  var idCounter = 0;

  //Projectile object constructor
  function Projectile (_x, _y, _imgSrc, _speed, _type)
  {
    this.id = idCounter++;
    this.x  = _x;
    this.y  = _y;
  	this.imgSrc = _imgSrc;

  	this._width = 30;
  	this._speed = _speed;
  	this.delay = 500;
  	this.frame = 1;
  	this._time = 0;

  	//determines if it is a player projectile or an enemy projectile
  	this._type = _type;
  }

    //Makes the projectile class available to all files
  _global.Projectile = Projectile;


  Projectile.prototype.update = function (tDelta)
  {
		this._time += tDelta;
		this.y -= this._speed;
		if (this._time >= this.delay){
			this._time = 0;
			this.frame = -this.frame;
		}
  };

})();
