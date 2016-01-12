//direction for both snakes
var direction = 'noDirection';
var direction2 = 'noDirection';
//shedded skin for both snakes
var snakeSkin = [];
var snake2Skin = [];

var maxWidthGlobal = document.getElementById('canvas').width;
var cellWidth = 15;
var farCorner = maxWidthGlobal/cellWidth;
var snake = [
    {x: 2, y: 0, color: "#F6071E"},
    {x: 1, y: 0, color: "#F6071E"},
    {x: 0, y: 0, color: "#F6071E"}
];

var snake2 = [
    {x: 27, y: 29, color: "#05C12F"},
    {x: 28, y: 29, color: "#05C12F"},
    {x: 29, y: 29, color: "#05C12F"}
];
var paused = false;


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
    var beginTime = 100;
    //interval name (not active at first)
    var snakeMove = 'notYet';
    //previous direction for both snakes
    var prevDir = 'noDirection';
    var prevDir2 = 'noDirection';

    //arrays containing the food item array and each snake's Skin
    var myFood = [];

    function resetGame() {
        clearInterval(snakeMove);
        resetCanvas();
        prevDir = 'noDirection';
        prevDir2 = 'noDirection';
        snakeMove = 'notYet';
        start = null;
        direction = 'noDirection';
        direction2 = 'noDirection';
        snakeSkin = [];
        snake2Skin = [];
        snake = [
            {x: 2, y: 0, color: "#F6071E"},
            {x: 1, y: 0, color: "#F6071E"},
            {x: 0, y: 0, color: "#F6071E"}
        ];
        snake2 = [
            {x: 27, y: 29, color: "#05C12F"},
            {x: 28, y: 29, color: "#05C12F"},
            {x: 29, y: 29, color: "#05C12F"}
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
        paintArray(snakeSkin);
        paintArray(snake2Skin);
        paintArray(myFood);
        paintArray(snake);
        paintArray(snake2);
        console.log("It worked");
    }

    //sets up the canvas for the first time
    ctx.fillStyle = '#FFC107';
    ctx.fillRect(0, 0, w, h);

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
            color: "white"
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
        ctx.fillStyle = '#FFC107';
        ctx.fillRect(0, 0, w, h);
    }

    //changes the global direction variable
    $(document).keydown(function(e) {
        if (paused) {
            return;
        }
        prevDir = direction; //important for the snake slither motion
        prevDir2 = direction2;
        var key = e.which;
        switch (key) {
            case 37: //left arrow
                direction = start === null? 'right' : prevDir === 'right' ? 'right' : 'left';
                if (prevDir === direction && snake.length > 3) {
                    shedSkin("snake");
                }
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 39: //right arrow
                direction = prevDir === 'left' ? 'left' : 'right';
                if (prevDir === direction && snake.length > 3) {
                    shedSkin("snake");
                }
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 38: //up arrow
                direction = start === null? 'right' : prevDir === 'down' ? 'down' : 'up';
                if (prevDir === direction && snake.length > 3) {
                    shedSkin("snake");
                }
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 40: //down arrow
                direction = start === null? 'right' : prevDir === 'up' ? 'up' : 'down';
                if (prevDir === direction && snake.length > 3) {
                    shedSkin("snake");
                }
                if (snakeMove === 'notYet') {
                    checkNull("direction2", "left");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 65: //character a (left for player two)
                direction2 = prevDir2 === 'right' ? 'right' : 'left';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
                if (snakeMove === 'notYet') {
                    checkNull("direction", "right");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 87: //character w (up for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'down' ? 'down' : 'up';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
                if (snakeMove === 'notYet') {
                    checkNull("direction", "right");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 83: //character s (down for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'up' ? 'up' : 'down';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
                if (snakeMove === 'notYet') {
                    checkNull("direction", "right");
                    snakeMove = setInterval(moveSnake, beginTime);
                    start = true;
                }
                break;
            case 68: //character d (right for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'left' ? 'left' : 'right';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
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
        paintArray(snakeSkin);
        paintArray(snake2Skin);
        paintArray(snake2);
        paintArray(snake);
        paintArray(myFood);
        hitSkin("snake2");
        hitSkin("snake");
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
                snake[3]["color"] = "#F6071E";
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
                snake2[3]["color"] = "#05C12F";
            }
            checkForOffBoard("snake2");
            eatFood(direction, "snake2");
            crashCheck("snake2");
        }
        resetCanvas();
        paintArray(snakeSkin);
        paintArray(snake2Skin);
        paintArray(snake2);
        paintArray(snake);
        paintArray(myFood);
    }

    function eatFood(dir, whichSnake) {
        var foodLoc = myFood[0];
        var lastSnakeBlock = whichSnake === 'snake' ? snake[snake.length - 1] : snake2[snake2.length - 1];
        var SkinColor = whichSnake === 'snake' ? '#F6071E' : '#05C12F';
        window[whichSnake].forEach(function(obj) {
            if (foodLoc.x === obj.x && foodLoc.y === obj.y) {
                if (dir === 'up') {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: SkinColor});
                }
                else if (dir === 'down') {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: SkinColor});
                }
                else if (dir === 'right') {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: SkinColor});
                }
                else {
                    window[whichSnake].push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: SkinColor});
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
        var head = window[whichSnake][0];
        var same = 0;
        for (var i = 0; i < snakeLength; i++) {
            if (head.x === window[whichSnake][i].x && head.y === window[whichSnake][i].y) {
                same++;
            }
            if (same > 1 && i !== snakeLength - 1) {
                if (whichSnake === 'snake') {
                    swal({
                        title: "Green snake wins!",
                        text: "Green snake crashed into itself.",
                        type: "success",
                        showConfirmButton: true,
                        showCancelButton: false,
                        closeOnConfirm: true,
                        confirmButtonText: "Play Again"},
                        function(isConfirm) {
                            if (isConfirm) {
                                resetGame();
                            }
                        }
                     )
                }
                else {
                    swal({
                        title: "Red Snake wins!",
                        text: "Green snake crashed into itself.",
                        type: "success",
                        showConfirmButton: true,
                        showCancelButton: false,
                        closeOnConfirm: true,
                        confirmButtonText: "Play Again"},
                        function(isConfirm) {
                            if (isConfirm) {
                                resetGame();
                            }
                        }
                     )
                }
            }
        }
    }

    function shedSkin(whichSnake) {
        var shedded = window[whichSnake].pop();
        window[whichSnake + "Skin"].push(shedded);
        paintArray(window[whichSnake]);
    }
    function hitSkin(whichSnake) {
        var player = whichSnake === 'snake' ? 'Green snake' : 'Red Snake';
        var player2 = whichSnake === 'snake' ? 'Red Snake' : 'Green snake';
        var skin = whichSnake === "snake" ? window["snake2Skin"] : window["snakeSkin"];
        var snake = window[whichSnake];
        var snakeLength = snake.length;
        var skinLength = skin.length;
        for (var i = 0; i < skinLength; i++) {
            if (snake[0].x === skin[i].x && snake[0].y === skin[i].y) {
                swal({
                    title: player + " wins!",
                    text: player2 + " crashed into your skin.",
                    type: "success",
                    showConfirmButton: true,
                    showCancelButton: false,
                    closeOnConfirm: true,
                    confirmButtonText: "Play Again"},
                    function(isConfirm) {
                        if (isConfirm) {
                            resetGame();
                        }
                    }
                 )
            }
        }
    }



})
