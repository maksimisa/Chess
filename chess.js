var map;
var divSquare = '<div id="s$coord" class="square $color"></div>';
var divFigure = '<div id="f$coord" class="figure">$figure</div>';
var isDragging = false;
var isFlipped = false;

$(function (){
    start();
    $('.buttonNew').click(newFiguresPHP);
    $('.buttonFlip').click(flipBoard);
    setInterval('showFiguresPHP()', 3000);
});

function start(){
    map = new Array(64);
    addSquare();
    showFiguresPHP();
}

function flipBoard(){
    isFlipped = !isFlipped;
    start();
}

function setDraggable(){
    $('.figure').draggable({
        start: function (event, ui){
          isDragging = true;
        }
    });
}

function setDroppable(){
    $('.square').droppable({
        drop: function(event, ui){
                var frCoord = ui.draggable.attr('id').substring(1);
                var toCoord = this.id.substring(1);
                moveFigure(frCoord, toCoord);
                moveFigurePHP(frCoord, toCoord);
                isDragging = false;
        }
    });
}

function moveFigure(frCoord, toCoord){
    figure = map[frCoord];
    name = map[frCoord];
    showFigureAt(frCoord, '1');
    showFigureAt(toCoord, figure);
    alert(getNameFigure(name));
}

function addSquare() {
    console.log('addSquares');
    $('.board').html('');
    for (var coord = 0; coord <64; coord++)
        $('.board').append(divSquare
            .replace('$coord', isFlipped ? 63 - coord : coord)
            .replace('$color',
                isBlackSquareAt(coord) ? 'black' : 'white'));
    setDroppable();
}

function showFigures(figures){
    for (var coord = 0; coord <64; coord++)
        showFigureAt(coord, figures.charAt(coord));
}

function showFigureAt(coord, figure){
    if (map[coord] == figure) return;
    map[coord] = figure;
    $('#s' + coord).html(divFigure
        .replace('$coord', coord)
        .replace('$figure', getChessSimbole(figure)));
    setDraggable();
}

function getChessSimbole(figure){
    switch (figure) {
        case 'K' : return '&#9812;';
        case 'Q' : return '&#9813;';
        case 'R' : return '&#9814;';
        case 'B' : return '&#9815;';
        case 'N' : return '&#9816;';
        case 'P' : return '&#9817;';
        case 'k' : return '&#9818;';
        case 'q' : return '&#9819;';
        case 'r' : return '&#9820;';
        case 'b' : return '&#9821;';
        case 'n' : return '&#9822;';
        case 'p' : return '&#9823;';
        default : return'';
    }
}

function getNameFigure(name){
    switch (name) {
        case 'K' : return 'Белый король';
        case 'Q' : return 'Белая королева';
        case 'R' : return 'Белая ладья';
        case 'B' : return 'Белый слон';
        case 'N' : return 'Белый конь';
        case 'P' : return 'Белая пешка';
        case 'k' : return 'Черный король';
        case 'q' : return 'Черная королева';
        case 'r' : return 'Черная ладья';
        case 'b' : return 'Черный слон';
        case 'n' : return 'Черный конь';
        case 'p' : return 'Черная пешка';
        default : return'';
    }
}

function isBlackSquareAt(coord) {
    return (coord % 8 + Math.floor(coord / 8)) % 2;
}

function newFiguresPHP(){
    $.get('chess.php?newFigures', showFigures);
}

function moveFigurePHP(frCoord, toCoord){
    $.get('chess.php?moveFigure' +
            '&frCoord=' + frCoord +
            '&toCoord=' + toCoord, showFigures);
}

function showFiguresPHP(){
    if (isDragging) return;
    $.get('chess.php?getFigures', showFigures);
}
