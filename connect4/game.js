var SLOT_RADIUS = 35;
var PLAYER1 = 1;
var PLAYER2 = 2;

var gameState = {
    gameGrid: [],
    currentPlayer: PLAYER1,
}

function drawCircle(ctx, centerX, centerY, color) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, SLOT_RADIUS, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

$(document).ready(function() {
    var canvas = $('#game-canvas').get(0);
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = '#003399';
    ctx.fillRect(0,0,700,600);

    // Draw empty spaces, and initialize gameGrid.
    for (var x=0; x < 7; x++) {
        gameState.gameGrid[x] = [];
        for (var y=0; y < 6; y++) {
            drawCircle(ctx, 50 + 100 * x, 50 + 100 * y, '#ffffff');
        }
    }

    canvas.addEventListener('mousedown', function(evt) {
        var mousePos = getMousePos(canvas, evt);
        var col = Math.floor(mousePos.x / 100);
        var row = gameState.gameGrid[col].length
        if (row == 6) {
            $('#game-canvas').effect('shake');
            return;
        }
        gameState.gameGrid[col].push(gameState.currentPlayer);

        // Draw new token.
        var color;
        if (gameState.currentPlayer == PLAYER1) {
            color = '#CC0000';
        } else {
            color = '#F7F307';
        }
        drawCircle(ctx, 50 + col * 100, 550 - row * 100, color);

        // Alternate current player.
        if (gameState.currentPlayer == PLAYER1) {
            gameState.currentPlayer = PLAYER2;
        } else {
            gameState.currentPlayer = PLAYER1;
        }

    })
});
