$(document).ready(function() {
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $('#canvas').height();

    var cellWidth = 45;
    var colors = ["green", "yellow", "red"];
    var direction = 'noDirection'; //different (direction = '';)

    var lightsArray = [];

    create_lights();
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0,0, w, h);
    function create_lights() {
        lightsArray.push({x: 5, y: 4, color: colors[0]});
        lightsArray.push({x: 5, y: 5, color: colors[1]});
        lightsArray.push({x: 5, y: 6, color: colors[2]});
    }

    function isEven(num) {
        return num % 2 === 0;
    }
    function paint() {
        //the code below will reset the canvas each time this function is called
        // ctx.fillStyle = "white";
        // ctx.fillRect(0, 0, w, h);
        // ctx.strokeStyle = 'black';
        // ctx.strokeRect(0,0, w, h);
        //takes the first and last object in the array
        var lastLight = lightsArray.pop();
        var firstLight = lightsArray.shift();

        //switches the two objects in their array order and swaps the corresponding x and y coordinates
        var firstY = firstLight.y;
        var firstX = firstLight.x;
        firstLight.y = lastLight.y;
        firstLight.x = lastLight.x;
        lastLight.x = firstX;
        lastLight.y = firstY;
        lightsArray.unshift(lastLight);
        lightsArray.push(firstLight);

        var newX = 0;
        var newY = 0;
        direction === 'right' ? newX++ : direction === 'left' ? newX-- : direction === 'up' ? newY-- : newY++;

        if (direction !== 'noDirection') {
            for (var x = 0; x < lightsArray.length; x++) {
                var cell = lightsArray[x];
                cell.x += newX;
                cell.y += newY;
            }
            offEdge(lightsArray);
        }

        direction = 'noDirection';

        for (var i = 0; i < lightsArray.length; i++) {
            var cell = lightsArray[i];
            ctx.fillStyle = cell.color;
            ctx.fillRect(cell.x*cellWidth, cell.y*cellWidth, cellWidth, cellWidth);
            ctx.strokeStyle = 'white';
            ctx.strokeRect(cell.x*cellWidth, cell.y*cellWidth, cellWidth, cellWidth);
        }
        //resets the direction so that nothing moves
    }
    //game_loop = setInterval(paint, .5);

    $(document).keydown(function(e) {
        var key = e.which;
        switch (key) {
            case 37:
                direction = 'left';
                break;
            case 38:
                direction = 'up';
                break;
            case 39:
                direction = 'right';
                break;
            case 40:
                direction = 'down';
                break;
            default:
                direction = 'noDirection';
                break;
        }
        paint();
    });

    function offEdge(inputArray) {
        inputArray.forEach(function(indexObject) {
            if (indexObject.x < 0) {
                indexObject.x = 9;
            }
            else if (indexObject.y < 0) {
                indexObject.y = 9;
            }
            else if (indexObject.x > 9) {
                indexObject.x = 0;
            }
            else if (indexObject.y > 9) {
                indexObject.y = 0;
            }
        });
    }
    function randomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var x = 0; x < 6; x++) {
            color += letters[Math.round(Math.random() * 15)];
        }
        return color;
    }
    function randomNumber(limit) {
        var number = Math.round(Math.random() * limit);
        return number;
    }
    function createFood() {

        var square = {
            x: randomNumber(9),
            y: randomNumber(9),
            color: randomColor()
        };
        return square;
    }
    function paintSquare() {
        var obj = createFood();
        ctx.fillStyle = obj.color;
        var x = obj.x*cellWidth;
        var y = obj.y*cellWidth;
        var width = cellWidth;
        var height = cellWidth;
        ctx.fillRect(x,y,width,height);
    }
    setInterval(paintSquare, 1);


})
