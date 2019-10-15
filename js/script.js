
const joinPlayer = function(num) {
    const name = $('#player'+num+'-name').val();
    const symbol = $(`#player${num}-symbol`).val();
    ttt.initPlayer(name, symbol);
    console.log(`${name} joins with symbol ${symbol}`);
    console.log(ttt.players);
}

const updateMoves = function(node){
    const row = $(node).attr('id')[1];
    const column = $(node).attr('id')[3];
    const symbol = ttt.players[currentPlayerIndex]['symbol'];
    if (ttt.makeMove(currentPlayerIndex, row, column)) {
        $(node).text(symbol);
        if (ttt.winCheck(currentPlayerIndex,symbol)) {
            console.log('message');// message game over w
            $(`#player${currentPlayerIndex+1}-win-counter`).text (ttt.players[currentPlayerIndex]['winCounter']);
        } else if (moves === 8) {
            console.log('draw');
        } else {
        currentPlayerIndex = 1 - currentPlayerIndex;
        moves +=1;
        return true;
        }
    } else {
        // a new div for message
    }
}

const resetBoard = function() {
    moves=0;
    ttt.reset();
    $('td').text("");
}

const playButtonToggle = ()=>{
    $('button.play').toggleClass('shake')
}
let currentPlayerIndex;
let moves =0;


const setup = function() {



    $('#play1join').click(() => joinPlayer('1'));
    $('#play2join').click(() => joinPlayer('2'));
    $('#playbutton').click(() => {resetBoard(); ttt.initBoard(); currentPlayerIndex = ttt.playOrder()});
    $('td').click((event)=>(updateMoves(event.target)));

    joinPlayer('1');
    joinPlayer('2');
    ttt.initBoard();
    currentPlayerIndex = ttt.playOrder();

    }


    $(document).ready(setup);
