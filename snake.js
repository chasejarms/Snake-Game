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

    function startGame(whichSnake) {
        return function() {
            whichSnake === 'snake' ? checkNull("direction2", "left") : checkNull("direction", "right");
            snakeMove = setInterval(moveSnake, beginTime);
            start = true;
        }
    }

    startGameSnake = startGame("snake");
    startGameSnake2 = startGame("snake2");

    //changes the global direction variable
    $(document).keydown(function(e) {
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
                    startGameSnake();
                }
                break;
            case 39: //right arrow
                direction = prevDir === 'left' ? 'left' : 'right';
                if (prevDir === direction && snake.length > 3) {
                    shedSkin("snake");
                }
                if (snakeMove === 'notYet') {
                    startGameSnake();
                }
                break;
            case 38: //up arrow
                direction = start === null? 'right' : prevDir === 'down' ? 'down' : 'up';
                if (prevDir === direction && snake.length > 3) {
                    shedSkin("snake");
                }
                if (snakeMove === 'notYet') {
                    startGameSnake();
                }
                break;
            case 40: //down arrow
                direction = start === null? 'right' : prevDir === 'up' ? 'up' : 'down';
                if (prevDir === direction && snake.length > 3) {
                    shedSkin("snake");
                }
                if (snakeMove === 'notYet') {
                    startGameSnake();
                }
                break;
            case 65: //character a (left for player two)
                direction2 = prevDir2 === 'right' ? 'right' : 'left';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
                if (snakeMove === 'notYet') {
                    startGameSnake2();
                }
                break;
            case 87: //character w (up for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'down' ? 'down' : 'up';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
                if (snakeMove === 'notYet') {
                    startGameSnake2();
                }
                break;
            case 83: //character s (down for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'up' ? 'up' : 'down';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
                if (snakeMove === 'notYet') {
                    startGameSnake2();
                }
                break;
            case 68: //character d (right for player two)
                direction2 = start === null ? 'left' : prevDir2 === 'left' ? 'left' : 'right';
                if (prevDir2 === direction2 && snake2.length > 3) {
                    shedSkin("snake2");
                }
                if (snakeMove === 'notYet') {
                    startGameSnake2();
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
            snakeSlither('right');
        }
        else if (direction === 'left') {
            snakeSlither('left');
        }
        else if (direction === 'up') {
            snakeSlither('up');
        }
        else if (direction === 'down'){
            snakeSlither('down');
        }
        //makes snake2 slither
        if (direction2 === 'right') {
            snake2Slither('right');
        }
        else if (direction2 === 'left') {
            snake2Slither('left');
        }
        else if (direction2 === 'up') {
            snake2Slither('up');
        }
        else if (direction2 === 'down') {
            snake2Slither('down');
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
    var snakeSlither = slither("snake");
    var snake2Slither = slither("snake2");

    function slither(whichSnake) { //change some o this code to make it more dynamic for both snakes (end)
        return function (dir) {
            var firstPiece = window[whichSnake][0];
            if (dir === 'right') {
                window[whichSnake].unshift({x: firstPiece.x + 1, y: firstPiece.y, color: firstPiece["color"]});
                window[whichSnake].pop();
            }
            else if (dir === 'left') {
                window[whichSnake].unshift({x: firstPiece.x - 1, y: firstPiece.y, color: firstPiece["color"]});
                window[whichSnake].pop();
            }
            else if (dir === 'up') {
                window[whichSnake].unshift({x: firstPiece.x, y: firstPiece.y - 1, color: firstPiece["color"]});
                window[whichSnake].pop();
            }
            else {
                window[whichSnake].unshift({x: firstPiece.x, y: firstPiece.y + 1, color: firstPiece["color"]});
                window[whichSnake].pop();
            }

            //puts the right color after the base snake
            if (window[whichSnake].length > 3) {
                window[whichSnake][3]["color"] = whichSnake === 'snake' ? "#F6071E" : "#05C12F";
            }
            checkForOffBoard(whichSnake);
            eatFood(direction, whichSnake);
            whichSnake === 'snake' ? checkSnakeCrash() : checkSnake2Crash();
        }
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
        return function () {
            var snakeLength = whichSnake === 'snake' ? snake.length : snake2.length;
            var snakeHead = window[whichSnake][0];
            var currentSnake = window[whichSnake].filter(function(snakeBlock) {
                return snakeBlock.x === snakeHead.x && snakeBlock.y === snakeHead.y;
            })
            if (currentSnake.length === 1) {
                return;
            }
            else {
                if (whichSnake === 'snake') {
                    swal({
                        title: "Green snake wins!",
                        text: "Red snake crashed into itself.",
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

    var checkSnakeCrash = crashCheck("snake");
    var checkSnake2Crash = crashCheck("snake2");
    function shedSkin(whichSnake) {
        var shedded = window[whichSnake].pop();
        window[whichSnake + "Skin"].push(shedded);
        paintArray(window[whichSnake]);
    };
    function hitSkin(whichSnake) {
        var player = whichSnake === 'snake' ? 'Green snake' : 'Red Snake';
        var player2 = whichSnake === 'snake' ? 'Red Snake' : 'Green snake';
        var skin = whichSnake === "snake" ? window["snake2Skin"] : window["snakeSkin"];
        var thisSnake = window[whichSnake];
        var snakeLength = snake.length;
        var skinLength = skin.length;
        var hit = skin.filter(function(obj) {
            return obj.x === thisSnake[0].x && obj.y === thisSnake[0].y;
        })
        if (hit.length > 0) {
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



})

//everything below this lines is common higher order functions I couldn't find a good way to implement in my code but that I do understand

var family = [
    {name: "John", age: 49, relationship: "father", status: "married"},
    {name: "Jacque", age: 45, relationship: "mother", status: "married"},
    {name: "Courtnee", age: 23, relationship: "sister", status: "single"},
    {name: "Lyndsee", age: 21, relationship: "sister", status: "single"},
    {name: "Nick", age: 18, relationship: "brother", status: "single"},
    {name: "Mitch", age: 14, relationship: "brother", status: "single"}
];

//the map higher order function

    var familyName = family.map(function(person) {
        return person.name;
    })

    //familyName = [{"John", "Jacque", "Courtnee", "Lyndsee", "Nick", "Mitch"}]

    //or it can be done this way

    var justRel = function(person) {
        return person.relationship;
    }
    var Rels = family.map(justRel);

    //Rels = [{"father", "mother", "sister", "sister", "brother", "brother"}]

//the reduce higher order function

    var cumulativeAge = family.reduce(function(sum, person) {
        return sum + person.age;
    }, 0);

    //cumulativeAge = 170;

    var wed = function(person) {
        return person.status === "married";
    }

    var single = function(person) {
        return person.status === "single";
    }

    var marriedPeople = family.filter(wed).reduce(function(startingPhrase, person) {
        return startingPhrase + person.name + "\n";
    }, "Married people list: \n\n");

    //marriedPeople = ["Married people list: \n\nJohn\nJacque\n"]

    var singlePeople = family.filter(single).reduce(function(startingPhrase, person) {
        return startingPhrase + person.name + "\n";
    }, "Single people list: \n\n");

    //singlePeople = ["Single people list: \n\nCourtnee\nLyndsee\nNick\nMitch\n"]


//Below is a higher order function I created for a Risk Board type project. My buddies and I enjoy a good game of Risk every now and again but it becomes monotonous when you have a very large battle between two players.  I made the following higher order function to do a random dice roll three times for the offense and 2 times for the defense. The actual program makes large battles instantaneous (practically) but this small snippet demonstrates building higher order functions:

    var offStart = 20;
    var defStart = 15;
    var offDice = [];
    var defDice = [];

    function callTimes(times) {
        return function(action, para) {
            for (var x = 0; x < times; x++) {
                var on = typeof(para) === "function" ? para() : para;
                action(on);
            }
            return;
        }
    }

    var callThreeTimes = callTimes(3);
    var callTwoTimes = callTimes(2);
    var callOnce = callTimes(1);

    function pushTo(arr) {
        return function(whatToPush) {
            arr.push(whatToPush);
        }
    }
    var pushToOffDice = pushTo(offDice);
    var pushToDefDice = pushTo(defDice);

    function randomNumber() {
            return Math.ceil(Math.random() * 6);
    }

    function randomRolls(offNum, defNum) {
        //put three random numbers between one and zero in the offDice Array
        if (offNum > 3) {
            callThreeTimes(pushToOffDice, randomNumber);
        }
        else if (offNum > 2) {
            callTwoTimes(pushToOffDice, randomNumber);
        }
        else if (offNum > 1) {
            callOneTime(pushToOffDice, randomNumber);
        }
        //puts two random numbers between one and six in the defDice Array
        if (defNum > 1) {
            callTwoTimes(pushToDefDice, randomNumber);
        }
        else if (defNum > 0) {
            callOneTime(pushToDefDice, randomNumber);
        }
    }

    randomRolls(offStart, defStart);

    //will put three random numbers inside the offDice Array and two random numbers inside the defDice Array
