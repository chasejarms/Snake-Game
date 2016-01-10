//direction for both snakes
var direction = 'noDirection';
var direction2 = 'noDirection';

var maxWidthGlobal = document.getElementById('canvas').width;
var cellWidth = 15;
var farCorner = maxWidthGlobal/cellWidth;
var snake = [
    {x: 2, y: 0, color: "#0000ff"},
    {x: 1, y: 0, color: "#0000ff"},
    {x: 0, y: 0, color: "#0000ff"}
];

var snake2 = [
    {x: 27, y: 29, color: "#ff0000"},
    {x: 28, y: 29, color: "#ff0000"},
    {x: 29, y: 29, color: "#ff0000"}
];


$(document).ready(function() {
    //use these variables to adjust the canvas (particularly ctx)
    //adjusting the cell width will change the page accordingly. Everything else is dynamic so only touch cellWidth
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $('#canvas').height();
    var maxWidth = w/cellWidth - 1;
    var maxHeight = w/cellWidth - 1;

    var start = null;
    //speed of the game in miliseconds
    var beginTime = 200;
    //interval name (not active at first)
    var snakeMove = 'notYet';
    //previous direction for both snakes
    var prevDir = 'noDirection';
    var prevDir2 = 'noDirection';

    //arrays containing the food item array and each snake's poop
    var myFood = [];
    var snakePoop = [];
    var snakePoop2 = [];

    function resetGame() {
        clearInterval(snakeMove);
        resetCanvas();
        prevDir = 'noDirection';
        prevDir2 = 'noDirection';
        snakeMove = 'notYet';
        start = null;
        direction = 'noDirection';
        direction2 = 'noDirection';
        snakePoop = [];
        snakePoop2 = [];
        snake = [
            {x: 2, y: 0, color: "#0000ff"},
            {x: 1, y: 0, color: "#0000ff"},
            {x: 0, y: 0, color: "#0000ff"}
        ];
        snake2 = [
            {x: 27, y: 29, color: "#ff0000"},
            {x: 28, y: 29, color: "#ff0000"},
            {x: 29, y: 29, color: "#ff0000"}
        ];
        createBlock(myFood, false, false);
        paintArray(myFood);
        paintArray(snake);
        paintArray(snake2);
        console.log("Game was reset");
    }

    function init() {
        clearInterval(snakeMove);
        resetCanvas();
        snakeMove = 'notYet';
        start = null;
        createBlock(myFood, false, false);
        paintArray(snakePoop);
        paintArray(snakePoop2);
        paintArray(myFood);
        paintArray(snake);
        paintArray(snake2);
        console.log("It worked");
    }

    //sets up the canvas for the first time
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);

    //creates random number (put in a parameter if the limit doesn't apply to the board width/height)
    function randomNumber(optionalLimit) {
        var limit = optionalLimit ? optionalLimit : maxWidth;
        var number = Math.round(Math.random() * limit);
        return number;
    }

    //creates the initial snake and associated food
    function createBlock(foodVar, x, y) {
        var square = {
            x: x !== false ? x : randomNumber(),
            y: y !== false ? y : randomNumber(),
            color: "green"
        };
        foodVar[0] = square;
        return foodVar;
    }

    //uses an array of objects and paints each object in the array on to the canvas
    function paintArray(arr) {
        if (arr === []) {
            return;
        }
        else {
            arr.forEach(function(obj) {
                ctx.fillStyle = obj["color"];
                ctx.fillRect(obj.x*cellWidth, obj.y*cellWidth, cellWidth, cellWidth);
            })
        }
    }


    paintArray(snake);
    paintArray(snake2);
    paintArray(createBlock(myFood, false, false));

    //resets the canvas each time to so that things can appear to move
    function resetCanvas() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0,0, w, h);
    }

    //changes the global direction variable
    $(document).keydown(function(e) {
        prevDir = direction; //important for the snake slither motion
        prevDir2 = direction2;
        var key = e.which;
        switch (key) {
            case 37: //left arrow
                direction = start === null? 'right' : prevDir === 'right' ? 'right' : 'left';
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 39: //right arrow
                direction = prevDir === 'left' ? 'left' : 'right';
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 38: //up arrow
                direction = start === null? 'right' : prevDir === 'down' ? 'down' : 'up';
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 40: //down arrow
                direction = start === null? 'right' : prevDir === 'up' ? 'up' : 'down';
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 65: //character a (left for player two)
                direction2 = prevDir2 === 'right' ? 'right' : 'left';
                if (snakeMove === 'notYet') {
                    checkNull("direction", "right");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 87: //character w (up for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'down' ? 'down' : 'up';
                if (snakeMove === 'notYet') {
                    checkNull("direction", "right");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 83: //character s (down for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'up' ? 'up' : 'down';
                if (snakeMove === 'notYet') {
                    checkNull("direction", "right");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 68: //character d (right for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'left' ? 'left' : 'right';
                if (snakeMove === 'notYet') {
                    checkNull("direction", "right");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
            default:
                break;
        }
    });

    function checkNull(globalVar, dir) {
        if (start === null) {
            window[globalVar] = dir;
        }
    }

    function moveSnake() {
        //makes snake slither
        if (direction === 'right') {
            snakeSlither("snake", 'right');
        }
        else if (direction === 'left') {
            snakeSlither("snake", 'left');
        }
        else if (direction === 'up') {
            snakeSlither("snake", 'up');
        }
        else if (direction === 'down'){
            snakeSlither("snake", 'down');
        }
        //makes snake2 slither
        if (direction2 === 'right') {
            snakeSlither("snake2", 'right');
        }
        else if (direction2 === 'left') {
            snakeSlither("snake2", 'left');
        }
        else if (direction2 === 'up') {
            snakeSlither("snake2", 'up');
        }
        else if (direction2 === 'down') {
            snakeSlither("snake2", 'down');
        }
        resetCanvas();
        paintArray(snakePoop);
        paintArray(snakePoop2);
        paintArray(snake2);
        paintArray(snake);
        paintArray(myFood);
    }

    //this function makes the snake-like movement to create the slither motion
    function snakeSlither(whichSnake, dir) { //change some o this code to make it more dynamic for both snakes (end)
        if (whichSnake === "snake") {
            var firstPiece = snake[0];
            var snakeLength = snake.length;
            if (dir === 'right') {
                snake.unshift({x: firstPiece.x + 1, y: firstPiece.y, color: firstPiece["color"]});
                snake.pop();
            }
            else if (dir === 'left') {
                snake.unshift({x: firstPiece.x - 1, y: firstPiece.y, color: firstPiece["color"]});
                snake.pop();
            }
            else if (dir === 'up') {
                snake.unshift({x: firstPiece.x, y: firstPiece.y - 1, color: firstPiece["color"]});
                snake.pop();
            }
            else {
                snake.unshift({x: firstPiece.x, y: firstPiece.y + 1, color: firstPiece["color"]});
                snake.pop();
            }

            //puts the right color after the base snake
            if (snake.length > 3) {
                snake[3]["color"] = "#7f7fff";
            }
            checkForOffBoard("snake");
            eatFood(direction, "snake");
            crashCheck("snake");
        }
        else if (whichSnake === 'snake2') {
            var firstPiece = snake2[0];
            if (dir === 'right') {
                snake2.unshift({x: firstPiece.x + 1, y: firstPiece.y, color: firstPiece["color"]});
                snake2.pop();
            }
            else if (dir === 'left') {
                snake2.unshift({x: firstPiece.x - 1, y: firstPiece.y, color: firstPiece["color"]});
                snake2.pop();
            }
            else if (dir === 'up') {
                snake2.unshift({x: firstPiece.x, y: firstPiece.y - 1, color: firstPiece["color"]});
                snake2.pop();
            }
            else {
                snake2.unshift({x: firstPiece.x, y: firstPiece.y + 1, color: firstPiece["color"]});
                snake2.pop();
            }

            //puts the right color after the base snake
            if (snake2.length > 3) {
                snake2[3]["color"] = "#ff7f7f";
            }
            checkForOffBoard("snake2");
            eatFood(direction, "snake2");
            crashCheck("snake2");
        }
        resetCanvas();
        paintArray(snakePoop);
        paintArray(snakePoop2);
        paintArray(snake2);
        paintArray(snake);
        paintArray(myFood);
    }

    function eatFood(dir, whichSnake) {
        var foodLoc = myFood[0];
        var lastSnakeBlock = whichSnake === 'snake' ? snake[snake.length - 1] : snake2[snake2.length - 1];
        var poopColor = whichSnake === 'snake' ? '#7f7fff' : '#ff7f7f';
        window[whichSnake].forEach(function(obj) {
            if (foodLoc.x === obj.x && foodLoc.y === obj.y) {
                if (dir === 'up') {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: poopColor});
                }
                else if (dir === 'down') {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: poopColor});
                }
                else if (dir === 'right') {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: poopColor});
                }
                else {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: poopColor});
                }
                createBlock(myFood, false, false);
                paintArray(myFood);
            }
        })
    }
    function checkForOffBoard(arr) {
        var snakeVar = window[arr];
        var snakeLength = snakeVar.length;
        var dir = arr === "snake" ? direction : direction2;
        for (var i=0 ; i < snakeLength; i++) {
            var obj = snakeVar[i];
            if (dir === 'right' || dir === 'left') {
                if (obj.x < 0) {
                    window[arr][i]["x"] = maxWidth;
                }
                else if (obj.x > maxWidth) {
                    window[arr][i]["x"] = 0;
                }
            }
            else {
                if (obj.y < 0) {
                    window[arr][i]["y"] = maxWidth;
                }
                else if (obj.y > maxWidth) {
                    window[arr][i]["y"] = 0;
                }
            }
        }
    }

    //can't crash into itself with this function
    function crashCheck(whichSnake) {
        var snakeLength = whichSnake === 'snake' ? snake.length : snake2.length;
        for (var x = 0; x < snakeLength; x++) {
            var same = 0;
            var obj1 = window[whichSnake][x];
            for (var i = 0; i < snakeLength; i++) {
                if (obj1.x === window[whichSnake][i].x && obj1.y === window[whichSnake][i].y) {
                    same++;
                }
                if (same > 1 && i !== snakeLength - 1) {
                    if (whichSnake === 'snake') {
                        alert("Congrats player 2, you won the game!");
                    }
                    else {
                        alert("Congrats player 1, you won the game!");
                    }
                    return resetGame();
                }
            }
        }
    }



})
