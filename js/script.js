
const joinPlayer = function(num) {
    const name = $('#player'+num+'-name').val();
    const symbol = $(`#player${num}-symbol`).val();
    ttt.initPlayer(name, symbol);
    console.log(`${name} joins with symbol ${symbol}`);
    console.log(ttt.players);
}

const updateMoves = function(currentPlayerIndex){
    let $clicked = $(this);
    // const row = $clicked.attr('data-row');
    //
    // const column = $clicked.attr('id');
    // console.log(row + "  " + column);
    // if (ttt.makeMove(currentPlayerIndex, row, column)) {
    // $clicked.text = ttt.players[currentPlayerIndex]['symbol'];
    return true;
// }

}





const setup = function() {

    let currentPlayerIndex;

    $('#play1join').click(() => joinPlayer('1'));
    $('#play2join').click(() => joinPlayer('2'));
    $('#playbutton').click(() => {ttt.initBoard(); currentPlayerIndex = ttt.playOrder()});


    joinPlayer('1');
    joinPlayer('2');
    ttt.initBoard();
    // currentPlayerIndex = ttt.playOrder();

    // while (!ttt.winCheck) {
        $('tr td').click(() => updateMoves( currentPlayerIndex));
    $('.board .row#1 .column#1').text('X')


}



// }

$(document).ready(setup);
