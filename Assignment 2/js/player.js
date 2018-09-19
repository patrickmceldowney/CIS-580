/*
 * The Player class holds all of the values needed to create our ship on screen
 */
var _global = this;

(function () {

  /*keeps track of the amount of players. There will be only one but
   *I implented it the same way I did the other classes to be safe.
   */
  var idCounter = 0;

  //Player object constructor
  function Player (_x, _y, _imgSrc)
  {
    //player id
    this.id = idCounter;
    //player's sprite location values
    this.x  = _x;
    this.y  = _y;
    //player's sprite image
		this.imgSrc = _imgSrc;

    //player values
		this._width = 30;
		this._height = 16;
		this._speed = 5;
		this._lives = 2;
		this._score = 0;
  }

  //Makes the Player object reachable by other files
  _global.Player = Player;


  //Updates player's location based on user input
  Player.prototype.update = function (tDelta)
  {
		this._time += tDelta;

		if (rightDown == true){
			if (this.x + (this._width + 6) <= fallCanvas.width){
				this.x += this._speed;
			}
		}

		if (leftDown == true){
			if (this.x - 6 >= 0){
				this.x -= this._speed;
			}
		}
  };

})();
