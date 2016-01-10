var snake = [
    {x: 2, y: 0, color: "blue"},
    {x: 1, y: 0, color: "blue"},
    {x: 0, y: 0, color: "blue"}
];

$(document).ready(function() {
    //use these variables to adjust the canvas (particularly ctx)
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $('#canvas').height();

    //adjusting the cell width will change the page accordingly. Everything else is dynamic so only touch cellWidth
    var cellWidth = 15;
    var maxWidth = w/cellWidth - 1;
    var maxHeight = w/cellWidth - 1;
    var direction = 'noDirection';
    var score = 3;
    var highScore = 3;
    var start = null;
    var currentLevel = 1;
    var beginTime = 200;
    var clearMove = true;
    var snakeMove = 'notYet';
    var prevDir = 'noDirection';
    var level = []; //go up a level and speed every 3 pieces of food

    //reset the game
    function resetGame() {
        score = 3;
        clearInterval(snakeMove);
        resetCanvas();
        prevDir = 'noDirection';
        snakeMove = 'notYet';
        start = null;
        createBlock(myFood, false, false);
        snake = [
            {x: 2, y: 0, color: "blue"},
            {x: 1, y: 0, color: "blue"},
            {x: 0, y: 0, color: "blue"}
        ];
        paintArray(myFood);
        paintArray(snake);
        console.log("Game was reset");
    }

    function init() {
        clearInterval(snakeMove);
        resetCanvas();
        snakeMove = 'notYet';
        start = null;
        createBlock(myFood, false, false);
        paintArray(myFood);
        paintArray(snake);
        console.log("It worked");
    }

    function createLevels() {
        var updatedTime = beginTime;
        for (var x = 1; x < 20; x++) {
            level.push({level: x, speed: updatedTime, lengthMax: (x*5 - 1)});
            updatedTime *= .8;
        }
    }
    createLevels();
    console.log(level);

    function levelUp() {
        if (snake.length > level[currentLevel - 1].lengthMax) {
            currentLevel++;
            init();
        }
    }

    //sets up the canvas for the first time
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);

    //the food will be a random color each time
    function randomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var x = 0; x < 6; x++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }

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
            color: randomColor()
        };
        foodVar[0] = square;
        return foodVar;
    }

    //uses an array of objects and paints each object in the array on to the canvas
    function paintArray(arr) {
        arr.forEach(function(obj) {
            ctx.fillStyle = obj.color;
            ctx.fillRect(obj.x*cellWidth, obj.y*cellWidth, cellWidth, cellWidth);
        })
    }

    //arrays containing the food item array and the snake array
    var myFood = [];

    paintArray(snake);
    paintArray(createBlock(myFood, false, false));
    numberPaint();

    //resets the canvas each time to so that things can appear to move
    function resetCanvas() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0,0, w, h);
        numberPaint();
    }

    //changes the global direction variable
    $(document).keydown(function(e) {
        prevDir = direction; //important for the snake slither motion
        var key = e.which;
        switch (key) {
            case 37:
                direction = start === null && currentLevel === 1 ? 'right' : prevDir === 'right' ? 'right' : 'left';
                if (snakeMove === 'notYet') {
                    snakeMove = setInterval(moveSnake, level[currentLevel - 1].speed);
                    start = true;
                }
                break;
            case 39:
                direction = prevDir === 'left' ? 'left' : 'right';
                if (snakeMove === 'notYet') {
                    snakeMove = setInterval(moveSnake, level[currentLevel - 1].speed);
                    start = true;
                }
                break;
            case 38:
                direction = start === null && currentLevel === 1 ? 'right' : prevDir === 'down' ? 'down' : 'up';
                if (snakeMove === 'notYet') {
                    snakeMove = setInterval(moveSnake, level[currentLevel - 1].speed);
                    start = true;
                }
                break;
            case 40:
                direction = start === null && currentLevel === 1 ? 'right' : prevDir === 'up' ? 'up' : 'down';
                if (snakeMove === 'notYet') {
                    snakeMove = setInterval(moveSnake, level[currentLevel - 1].speed);
                    start = true;
                }
                break;
            default:
                break;
        }
    });

    function moveSnake() {
        if (direction === 'right') {
            snakeSlither('right');
        }
        else if (direction === 'left') {
            snakeSlither('left');
        }
        else if (direction === 'up') {
            snakeSlither('up');
        }
        else {
            snakeSlither('down');
        }
        resetCanvas();
        paintArray(snake);
        paintArray(myFood);
    }

    //this function makes the snake-like movement to create the slither motion
    function snakeSlither(dir) {
        var firstPiece = snake[0];
        if (dir === 'right') {
            snake.unshift({x: firstPiece.x + 1, y: firstPiece.y, color: firstPiece.color});
            snake.pop();
        }
        else if (dir === 'left') {
            snake.unshift({x: firstPiece.x - 1, y: firstPiece.y, color: firstPiece.color});
            snake.pop();
        }
        else if (dir === 'up') {
            snake.unshift({x: firstPiece.x, y: firstPiece.y - 1, color: firstPiece.color});
            snake.pop();
        }
        else {
            snake.unshift({x: firstPiece.x, y: firstPiece.y + 1, color: firstPiece.color});
            snake.pop();
        }
        checkForOffBoard("snake");
        eatFood(direction);
        crashCheck();
        resetCanvas();
        paintArray(snake);
        paintArray(myFood);
    }
    function eatFood(dir) {
        var foodLoc = myFood[0];
        var lastSnakeBlock = snake[snake.length - 1];
        snake.forEach(function(obj) {
            if (foodLoc.x === obj.x && foodLoc.y === obj.y) {
                if (dir === 'up') {
                    snake.push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: lastSnakeBlock.color});
                    score++;
                    if (score > highScore) {
                        highScore = score;
                    }
                }
                else if (dir === 'down') {
                    snake.push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: lastSnakeBlock.color});
                    score++;
                    if (score > highScore) {
                        highScore = score;
                    }
                }
                else if (dir === 'right') {
                    snake.push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: lastSnakeBlock.color});
                    score++;
                    if (score > highScore) {
                        highScore = score;
                    }
                }
                else {
                    snake.push({x: lastSnakeBlock.x, y: lastSnakeBlock.y, color: lastSnakeBlock.color});
                    score++;
                    if (score > highScore) {
                        highScore = score;
                    }
                }
                createBlock(myFood, false, false);
                paintArray(myFood);
            }
        })
        levelUp();
    }
    function checkForOffBoard(arr) {
        var snakeVar = window[arr];
        var snakeLength = snakeVar.length;
        for (var i=0 ; i < snakeLength; i++) {
            var obj = snakeVar[i];
            if (direction === 'right' || direction === 'left') {
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

    //paints on the current score and the high score (is called each time the board is reset)
    function numberPaint() {
        var scoreText = "Score: " + score;
        ctx.fillStyle = 'Black';
        ctx.fillText(scoreText, 5, h - 5);

        var high = "High Score: " + highScore;
        ctx.fillStyle = 'Black';
        ctx.fillText(high, 5, h - 15);

        var lev = "Level: " + currentLevel;
        ctx.fillStyle = 'Black';
        ctx.fillText(lev, 5, h - 25);
    }

    //can't crash into itself with this function
    function crashCheck() {
        var snakeLength = snake.length;
        for (var x = 0; x < snakeLength; x++) {
            var same = 0;
            var obj1 = snake[x];
            for (var i = 0; i < snakeLength; i++) {
                if (obj1.x === snake[i].x && obj1.y === snake[i].y) {
                    same++;
                }
                if (same > 1 && i !== snakeLength - 1) {
                    alert("You crashed");
                    return resetGame();
                }
            }
        }
    }



})
