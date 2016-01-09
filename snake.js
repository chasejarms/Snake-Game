
$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $('#canvas').height();

    var cellWidth = 15;
    var maxWidth = w/cellWidth - 1;
    var maxHeight = w/cellWidth - 1;
    var direction = 'noDirection';
    var score = 0;

    var colorsArr = ["blue", "green", "red", "yellow", "orange"];

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "black";
    ctx.strokeRect(0,0,w,h);
    function randomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var x = 0; x < 6; x++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    function randomNumber(optionalLimit) {
        var limit = optionalLimit ? optionalLimit : maxWidth;
        var number = Math.round(Math.random() * limit);
        return number;
    }
    function createFoodOrCatcher(foodVar, x, y) {
        var square = {
            x: x !== false ? x : randomNumber(),
            y: y !== false ? y : randomNumber(),
            color: colorsArr[randomNumber(colorsArr.length - 1)]
        };
        foodVar[0] = square;
        return foodVar;
    }
    function paintSquare(arr) {
        arr.forEach(function(obj) {
            ctx.fillStyle = obj.color;
            ctx.fillRect(obj.x*cellWidth, obj.y*cellWidth, cellWidth, cellWidth);
        })
    }
    //setInterval(paintSquare, 1);
    var myCatcher = [];
    var myFood = [];

    //sets up those variables

    paintSquare(createFoodOrCatcher(myCatcher, 0, maxHeight));
    paintSquare(createFoodOrCatcher(myFood, false, 0));

    //food will change y position every 50 miliseconds
    setInterval(rainFood, 50);

    //changes y position and checks to see if food should become a part of catcher
    function rainFood() {
        //checks to see if the catcher catches the food
        var lastOne = myCatcher.length - 1;
        if ((myCatcher[lastOne].x === myFood[0].x) && (myCatcher[lastOne].y - 1 === myFood[0].y)) {
            myCatcher.push(myFood[0]);
            myFood = [];
            createFoodOrCatcher(myFood, false, 0);
            inARow(3, myCatcher);
            paintSquare(myFood);
            return;
        }
        resetCanvas();
        paintSquare(myCatcher);
        if(myFood[0].y > maxHeight - 1) {
            createFoodOrCatcher(myFood, false, 0);
            paintSquare(myFood);
            return;
        }
        //makes the food rain everytime
        myFood.forEach(function(obj) {
            obj.y++;
        });
        paintSquare(myFood);
    }
    //resets the canvas
    function resetCanvas() {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(0,0, w, h);

        numberPaint();
    }

    //changes the global direction variable
    $(document).keydown(function(e) {
        var key = e.which;
        switch (key) {
            case 37:
                direction = 'left';
                break;
            case 39:
                direction = 'right';
                break;
            case 32:
                if (myCatcher[0].x === maxWidth || direction === 'fastRight') {
                    direction = 'fastLeft';
                }
                else if (myCatcher[0].x === 0 || direction === 'fastLeft') {
                    direction = 'fastRight';
                }
                else if (myCatcher[0].x > maxWidth/2) {
                    direction = 'fastLeft';
                }
                else {
                    direction = 'fastRight';
                }
                break;
            case 38:
                direction = 'noDirection';
                break;
            default:
                direction = 'noDirection';
                break;
        }
        if (direction !== 'noDirection') {
            console.log(direction);
        }
        if (direction === 'left' || direction === 'right') {
            changeDirection(direction);
            direction = 'noDirection';
        }
        else if (direction === 'fastRight' || direction === 'fastLeft') {
            var dir = direction === 'fastRight' ? 'fastRight' : 'fastLeft';
            moveTheCatcher(dir);
        }
        resetCanvas();
        paintSquare(myFood);
        paintSquare(myCatcher);
    });

    //makes the catcher slide faster if the space bar is pressed
    function moveTheCatcher(startingDir) {
        //breaks out of multiple space bar hits
        if (startingDir !== direction) {
            return;
        }
        else {
            var myCatchX = myCatcher[0].x;
            if (direction === 'noDirection' || (direction === 'fastLeft' && myCatchX === 0) || direction === 'right' || direction === 'left' || (direction === 'fastRight' && myCatchX === maxWidth)) {
                return;
            }
            else if (direction === 'fastLeft'){
                myCatcher.forEach(function(obj) {
                    obj.x--;
                })
                resetCanvas();
                paintSquare(myFood);
                paintSquare(myCatcher);
                setTimeout(moveTheCatcher, 50, startingDir);
            }
            else {
                myCatcher.forEach(function(obj) {
                    obj.x++;
                })
                resetCanvas();
                paintSquare(myFood);
                paintSquare(myCatcher);
                setTimeout(moveTheCatcher, 50, startingDir);
            }
            return;
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
    function numberPaint() {
        var scoreText = "Score: " + score;
        ctx.fillStyle = 'Black';
        ctx.fillText(scoreText, 5, 15);
    }
    //checks to see if there are a number of colors in a row
    function inARow(num) {
        var firstCol = false,
            count =1,
            arr = myCatcher;
            last = myCatcher.length - 1;
        for (var x = last; x > 0; x--) {
            if (firstCol) {
                if (arr[x].color === firstCol) {
                    count++;
                }
                if (count === num) {
                    arr.splice(x, num);
                    paintSquare(myCatcher);
                    score++;
                    numberPaint();
                    return;
                }
            }
            else {
                firstCol = arr[x].color;
            }
        }
        return;
    }


})
