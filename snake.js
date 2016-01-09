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
    var score = 0;
    var highScore = 0;
    var start = null;
    var currentLevel = 1;
    var beginLevel = 1;
    var beginTime = 200;
    var clearMove = true;
    var snakeMove = 'notYet';
    var prevDir = 'noDirection';

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
                direction = start === null ? 'right' : prevDir === 'right' ? 'right' : 'left';
                if (snakeMove === 'notYet') {
                    setTime(currentLevel, beginLevel, beginTime);
                    snakeMove = setInterval(moveSnake, time);
                    start = true;
                }
                break;
            case 39:
                direction = prevDir === 'left' ? 'left' : 'right';
                if (snakeMove === 'notYet') {
                    setTime(currentLevel, beginLevel, beginTime);
                    snakeMove = setInterval(moveSnake, time);
                    start = true;
                }
                break;
            case 38:
                direction = start === null ? 'right' : prevDir === 'down' ? 'down' : 'up';
                if (snakeMove === 'notYet') {
                    setTime(currentLevel, beginLevel, beginTime);
                    snakeMove = setInterval(moveSnake, time);
                    start = true;
                }
                break;
            case 40:
                direction = start === null ? 'right' : prevDir === 'up' ? 'up' : 'down';
                if (snakeMove === 'notYet') {
                    setTime(currentLevel, beginLevel, beginTime);
                    snakeMove = setInterval(moveSnake, time);
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
        console.log(direction);
        resetCanvas();
        paintArray(snake);
        paintArray(myFood);
    }

    //this function makes the snake-like movement to create the slither motion
    function snakeSlither(dir) {
        var snakeLength = snake.length;
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
        console.log(snake);
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

    //actually moves the x and y coordinates of the myCatcher[0] object
    function changeDirection(dir) {
        myCatcher.forEach(function(obj) {
            if (dir === 'left') {
                if (obj.x === 0) {
                    return;
                }
                else {
                    obj.x--;
                }
            }
            else if (dir === 'right') {
                if (obj.x === maxWidth) {
                    return;
                }
                else {
                    obj.x++;
                }
            }
        })
    }

    //paints on the current score and the high score (is called each time the board is reset)
    function numberPaint() {
        var scoreText = "Score: " + score;
        ctx.fillStyle = 'Black';
        ctx.fillText(scoreText, 5, 15);

        var high = "High Score: " + highScore;
        ctx.fillStyle = 'Black';
        ctx.fillText(high, 5, 25);
    }

    //dynamically increases the time between levels
    function setTime(level, beginLevel, beginTime) {
        if (level === beginLevel) {
            time = beginTime;
            return;
        }
        else {
            setTime(level, beginLevel + 1, beginTime/1.2);
        }
    }


})
