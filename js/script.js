
const joinPlayer = function(num) {
    const name = $('#player'+num+'-name').val();
    const symbol = $(`#player${num}-symbol`).val();
    if (name && symbol) {
        ttt.initPlayer(num, name, symbol);
        console.log(`${name} joins with symbol ${symbol}`);
        console.log(ttt.players);
        let message = `${name} joined!  We have ${ttt.players.length} player in the game.`
        if (ttt.players.length >= 2) {
            message = `${name} joined!  We have ${ttt.players.length} players in the game.`
        }
        showMsg(message);
    } else {
    const message = `Please enter your name and choose a symbol!`
    showMsg(message);}
}

const removePlayer = function(num) {
    console.log('true');
    const name = $('#player'+num+'-name').val();
    ttt.rmPlayer(name);
    const message = `${name} left...`
    showMsg(message);
    $('#player'+num+'-name').val("")
    $(`#player${num}-symbol`).val("");
    $(`#player${num}-win-counter`).val(0);
}


const updateMoves = function(node){
    const row = $(node).attr('id')[1];
    const column = $(node).attr('id')[3];
    const symbol = ttt.players[currentPlayerIndex]['symbol'];
    if (ttt.makeMove(currentPlayerIndex, row, column)) {
        $(node).text(symbol);
        if (ttt.winCheck(currentPlayerIndex,symbol)) {
            const message = `Yeah! ${ttt.players[currentPlayerIndex]['name']} wins!`
            showMsg(message);
            playing = false;
            setTimeout(playButtonToggle(), 1500);
            $(`#player${currentPlayerIndex+1}-win-counter`).text (ttt.players[currentPlayerIndex]['winCounter']);
        } else if (moves === 8) {
            const message = `DRAW! How could it happen!!!`
            showMsg(message);
        } else {
        currentPlayerIndex = 1 - currentPlayerIndex;
        moves +=1;
        return true;
        }
    }
}

const resetBoard = function() {
    moves=0;
    ttt.reset();
    $('td').text("");
}

const playButtonToggle = ()=>{
    $('button.play').toggleClass('shake', playing===false);
}

const showMsg = (message) => {
    $('.message-box').text(message);
    $('.alert').show();
}


let currentPlayerIndex;
let moves =0;
let playing = false;




const setup = function() {

    $('#play1join').click(() => joinPlayer('1'));
    $('#play2join').click(() => joinPlayer('2'));
    $('#play1leave').click(() => removePlayer('1'));
    $('#play2leave').click(() => removePlayer('2'));
    $('#playbutton').click(() => {
        resetBoard();
        ttt.initBoard();
        currentPlayerIndex = ttt.playOrder()
        playing = true;
        playButtonToggle();
        console.log(playing);
        const message = `Let's play!\n ${ttt.players[currentPlayerIndex]['name']} goes first.`
        showMsg(message);
        });


    $('td').click((event)=>(updateMoves(event.target)));
    $('#alert-button').click(() => $('.alert').fadeOut(1000));




    // joinPlayer('1');
    // joinPlayer('2');
    // ttt.initBoard();
    // currentPlayerIndex = ttt.playOrder();

    }


    $(document).ready(setup);
