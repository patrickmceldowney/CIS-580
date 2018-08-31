//GLOBAL variables
var win //= false;
var winner //= "";
var currentPlayer //= "Player 1";

var Pit = function(value) {
  this.value = value;
}

// intializing board

var mancala1;
var mancala2;
var pit0, pit1, pit2, pit3, pit4, pit5, pit6, pit7, pit8, pit9, pit10, pit11;

var board;

var startGame = function() {
  win = false;
  winner = "";
  currentPlayer = "Player 1";

  mancala1 = new Pit(0);
  mancala2 = new Pit(0);


  pit0 = new Pit(4);
  pit1 = new Pit(4);
  pit2 = new Pit(4);
  pit3 = new Pit(4);
  pit4 = new Pit(4);
  pit5 = new Pit(4);
  pit6 = new Pit(4);
  pit7 = new Pit(4);
  pit8 = new Pit(4);
  pit9 = new Pit(4);
  pit10 = new Pit(4);
  pit11 = new Pit(4);

  board = [pit0, pit1, pit2, pit3, pit4, pit5,
           pit6, pit7, pit8, pit9, pit10, pit11];

  updateMoveCSS();
  render();
  $('#winner').remove();
}

// start click event
clickOn();


// initializing game
var countMove = 0;
var iterator = 0;
var pebbles = 0;


var move = function (index) {
  // utilize value from clicked pit
  pebbles = board[index].value;
  countMove = board[index].value;
  board[index].value = 0;

  // loop through value of clicked pit
  for (var i = countMove; i >= 0; i--) {

    // loop for player 1
    if (currentPlayer === "Player 1" && pebbles === 1 && index === 11) {
      mancala1.value++;
      fadeInRight();
      pebbles = -1;
    } else if (currentPlayer === "Player 1" && pebbles > 1 && index === 11) {
        mancala1.value++;
        fadeInRight();
        index = 0;
        board[index].value++;
        pebbles -= 2;
    } else if (currentPlayer === "Player 1" && pebbles > 0) {
        index++;
        board[index].value++;
        pebbles--;
    } else if (currentPlayer === "Player 1" && pebbles === 0
              && board[index].value === 1 && ((6 <= index) && (index <= 11))
              && board[11-index].value > 0) {
      eatOpp(index);
    }

    // loop for player 2
    if (currentPlayer === "Player 2" && pebbles === 1 && index === 5) {
      mancala2.value++;
      fadeInLeft();
      pebbles = -1;
    } else if (currentPlayer === "Player 2" && pebbles > 1 && index === 5) {
        mancala2.value++;
        fadeInLeft();
        index++;
        board[index].value++;
        pebbles -=2;
    } else if (currentPlayer === "Player 2" && pebbles > 0) {
        if (index === 11) {
          index = 0;
          board[index].value++;
          pebbles--;
        }
        index++;
        board[index].value++;
        pebbles--;
    } else if (currentPlayer === "Player 2" && pebbles === 0
              && board[index].value === 1 && ((0 <= index) && (index <= 5))
              && board[11-index].value > 0) {
        eatOpp(index);
    }
  }
  gameEnd();
  gameWinner();
  changePlayer(index);
  render();
}

function invalid (index) {
  if ((currentPlayer === "Player 1" && index >= 6) && board[index].value != 0) {
    move(index);
  } else if ((currentPlayer === "Player 2" && index <= 5) && board[index].value != 0) {
    move(index);
  } else if ((currentPlayer === "Player 1" && (index < 6))
    || (currentPlayer === "Player 2" && (index > 5))
    || board[index].value === 0) {
  };
}

function changePlayer(index) {
  if (currentPlayer === "Player 1") {
    if (pebbles === -1 && index === 11) {
      console.log("player goes again");
      currentPlayer = "Player 1";
    } else {
      currentPlayer = "Player 2";
      console.log("I am supposed to change players");
    }
  } else if (currentPlayer === "Player 2") {
    if (pebbles === -1 && index === 5) {
      console.log("player goes again");
      currentPlayer = "Player 2";
    } else {
      currentPlayer = "Player 1";
      console.log("I am supposed to change players");
    }
  }
  updateMoveCSS();
}

function fadeInLeft() {
  $(".left").text("+1").fadeIn("slow").fadeOut("slow");
}

function fadeInRight() {
  $(".right").text("+1").fadeIn("slow").fadeOut("slow");

}

function updateMoveCSS() {
  if (currentPlayer === "Player 1") {
    $(".player1").removeClass("lock");
    $(".player2").addClass("lock");
    $("#playerOne").addClass("currentPlayer");
    $("#playerTwo").removeClass("currentPlayer");
  } else {
    $(".player2").removeClass("lock");
    $(".player1").addClass("lock");
    $("#playerTwo").addClass("currentPlayer");
    $("#playerOne").removeClass("currentPlayer");

  }
}

var eatOpp = function (index) {
  if (currentPlayer === "Player 1") {
    mancala1.value += board[index].value + board[11-index].value;
    $(".right").text("+" + (board[index].value + board[11-index].value)).fadeIn("slow").fadeOut("slow");
  } else {
    mancala2.value += board[index].value + board[11-index].value;
    $(".left").text("+" + (board[index].value + board[11-index].value)).fadeIn("slow").fadeOut("slow");
  }
  board[11-index].value = 0;
  board[index].value = 0;
}


function gameEnd() {
  if ((board[0].value === 0 &&
       board[1].value === 0 &&
       board[2].value === 0 &&
       board[3].value === 0 &&
       board[4].value === 0 &&
       board[5].value === 0)
    ||
      (board[6].value === 0 &&
       board[7].value === 0 &&
       board[8].value === 0 &&
       board[9].value === 0 &&
       board[10].value === 0 &&
       board[11].value === 0)) {
    win = true;

    for (var i = 0; i <= 5; i++) {
      mancala2.value += board[i].value;
      board[i].value = 0;
    }

    for (var i = 6; i <=11; i++) {
      mancala1.value += board[i].value;
      board[i].value = 0;
    }
  }
}


function gameWinner() {
  if (win === true) {
    if (mancala1.value > mancala2.value) {
      winner = "Player 1";
    } else if (mancala2.value > mancala1.value) {
      winner = "Player 2";
    } else { winner = "It's a TIE!!"
    } $('body').append($('<div id="winner">').text("The winner is " + winner + "!!").fadeIn("slow"));
  }
}


function render() {
  $('#currentPlayer').text("Current Player: "+ currentPlayer);
  for (var i = 0; i < board.length; i += 1) {
      $('#pit' + i).text(board[i].value)
    }
  $('#mancala1').text(mancala1.value);
  $('#mancala2').text(mancala2.value);
}

// event listeners
function clickOn() {
  $('.pit').on('click', function(event) {
    event.preventDefault();
    var index = parseInt(event.target.id.slice(3));
    invalid(index);
  });
}



startGame();

$("#restart").on("click", startGame);
