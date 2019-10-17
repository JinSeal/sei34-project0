
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
        $(`#player${num}-win-counter`).text(0);

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
        $(`#player${num}-win-counter`).text(0);
        $('#player'+num+'-name').val("")
        $(`#player${num}-symbol`).val("");

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
                $('#turn').text(`~~~Play again!~~~`).css('text-align', 'center');

                localStorage.setItem('move', '0');
                localStorage.setItem('ttt.board', '[]');
                localStorage.setItem("playing", playing);
            } else if (moves === $('td').length-1) {
                const message = `DRAW!`
                showMsg(message);
                playing = false;
                localStorage.setItem("playing", playing);
                (ttt.players[currentPlayerIndex]['winCounter']);
                $('#turn').text(`~~~Play again!~~~`).css('text-align', 'center');
            } else {
                currentPlayerIndex = 1 - currentPlayerIndex;
                localStorage.setItem('currentPlayerIndex', currentPlayerIndex)
                moves +=1;
                showCurrentPlayer();
                localStorage.setItem('moves', moves);
                return true;
            }
        }
    }

    const updateAIMoves = function() {
        const symbol = ttt.players[currentPlayerIndex]['symbol'];
        let pos;
        if ($('#ai-dropbtn').text() === "Easy") {
            pos = ttt.aiEasyMove(currentPlayerIndex);
        } else if ($('#ai-dropbtn').text() === "Hard") {
            console.log('ture');
            pos = ttt.aiHardMove(currentPlayerIndex);
            console.log(pos);
        }

        if (pos) {
            $(`#r${pos[0]}c${pos[1]}`).text(symbol);
            if (ttt.winCheck(currentPlayerIndex,symbol)) {
                const message = `Yeah! ${ttt.players[currentPlayerIndex]['name']} wins!`
                showMsg(message);
                playing = false;
                setTimeout(playButtonToggle(), 1500);
                $(`#player${currentPlayerIndex+1}-win-counter`).text (ttt.players[currentPlayerIndex]['winCounter']);
                $('#turn').text(`~~~Play again!~~~`).css('text-align', 'center');

                localStorage.setItem('move', '0');
                localStorage.setItem('ttt.board', '[]');
                localStorage.setItem("playing", playing);
            } else if (moves === $('td').length-1) {
                const message = `DRAW!`
                showMsg(message);
                playing = false;
                localStorage.setItem('singlePlayer',JSON.stringify( singlePlayer));
                localStorage.setItem("playing", playing);
                (ttt.players[currentPlayerIndex]['winCounter']);
                $('#turn').text(`~~~Play again!~~~`).css('text-align', 'center');
            } else {
                currentPlayerIndex = 1 - currentPlayerIndex;
                localStorage.setItem('currentPlayerIndex', currentPlayerIndex)
                moves +=1;
                showCurrentPlayer();
                localStorage.setItem('moves', moves);
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
        localStorage.setItem("playing", playing)
    }

    const showMsg = (message) => {
        $('.message-box').text(message);
        $('.alert').show();
    }


    const showCurrentPlayer = () => {
        const name = ttt.players[currentPlayerIndex]['name'];
        $('#turn').text(`**** ${name}'s turn ****`).css('text-align', 'center')
    }

    const chooseCanvas = (node) => {
        const text = $(node).text();
        size = text.slice(0,1);
        $('#canvas-dropbtn').text(text);
        return size;
    }

    const chooseAI = (node) => {
        const text = $(node).text();
        if (text !== "None" && ttt.players.length > 1) {
            if ((ttt.players[0]['name'] !== "AI" && ttt.players[1]['name'] !== "AI")) {
                const message = `One player only.`
                showMsg(message);
            } else {
                $('#ai-dropbtn').text(text);
            }
        } else if (text !== "None") {
            if ($('#player1-name').val()) {
                $('#player2-name').val("AI");
                $('#player2-symbol').val("AI");
                joinPlayer('2')
            }else {
                $('#player1-name').val("AI");
                $('#player1-symbol').val("AI")
                joinPlayer('1')
            }
            singlePlayer = true;
            localStorage.setItem('singlePlayer',JSON.stringify( singlePlayer));
            $('#ai-dropbtn').text(text);
        } else {
            if ($('#player1-name').val() === "AI") {
                $('#player1-name').val("");
                $('#player1-symbol').val("");
            } else {
                $('#player2-name').val("");
                $('#player2-symbol').val("");
            }
            ttt.rmPlayer('AI');
            ttt.singlePlayer = false;
            singlePlayer = false;
            localStorage.setItem('singlePlayer',JSON.stringify( singlePlayer));
            $('#ai-dropbtn').text(text);
        }
    }


const buildBoard = () => {
    $('table').text("");
    let cellSize = `${(100/size).toFixed(0)}%`;
    for (let i = 0; i < size; i++) {
        let $tr = $(`<tr class="row" id="r${i}"></tr>`);
        $('table').append($tr);
        for (let j = 0; j < size; j++) {
            let $td = $(`<td class="column" id="r${i}c${j}"></td>`);
            $td.css({'width':cellSize, 'height': cellSize})
            $tr.append($td);
        }
    }
    localStorage.setItem('size', size);
    ttt.initBoard(size);
}

const loadingLocalStorage = () => {
    const message = 'Restore last game.'
    $('.message-box').text(message);
    $('.alert').show();

    currentPlayerIndex =
    JSON.parse(localStorage['currentPlayerIndex'])
    moves = JSON.parse(localStorage['moves']);

    playing = JSON.parse(localStorage['playing']);
    ttt.players = JSON.parse(localStorage['ttt.players']);

    ttt.board = JSON.parse(localStorage['ttt.board']);
    size = JSON.parse(localStorage['size']);
    msgBox = localStorage['msgBox'];
    $('#canvas-dropbtn').text(`${size} X ${size}`);

    // singlePlayer = JSON.parse(localStorage['singlePlayer'])
    // ttt.occupiedSpot = JSON.parse(localStorage['ttt.occupiedSpot'])
    // ttt.emptySpots = JSON.parse(localStorage['ttt.emptySpots'])
    // ttt.winCombo = JSON.parse(localStorage['ttt.winCombo'])
    //
    // ttt.emptySpotsEasyLevel = JSON.parse(localStorage['ttt.emptySpotsEasyLevel'])
    // ttt.emptySpotsHardLevel = JSON.parse(localStorage['ttt.emptySpotsHardLevel'])


    if (ttt.players.length === 1) {
        const num = ttt.players[0]['index'];
        $(`#player${num}-name`).val(ttt.players[0]['name'])
        $(`#player${num}-symbol`).val(ttt.players[0]['symbol']);
        $(`#player${num}-win-counter`).text(ttt.players[0]['winCounter']);
    } else if (ttt.players.length === 2){
        $('#player1-name').val(ttt.players[0]['name'])
        $(`#player1-symbol`).val(ttt.players[0]['symbol']);
        $(`#player1-win-counter`).text(ttt.players[0]['winCounter']);
        $('#player2-name').val(ttt.players[1]['name'])
        $(`#player2-symbol`).val(ttt.players[1]['symbol']);
        $(`#player2-win-counter`).text(ttt.players[1]['winCounter']);
    }


    if (playing) {
        buildBoard(size);
        $('#turn').text(`**** ${ttt.players[currentPlayerIndex]['name']}'s turn ****`);
        for (let p = 0; p < ttt.players.length; p++) {
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (ttt.board[i][j]=== ttt.players[p]['symbol']) {
                        $(`#r${i}c${j}`).text($(`#player${p+1}-symbol`).val());
                    }
                }
            }
        }
    } else {
        $('#turn').text(`~~~Play again!~~~`);
    }
}


let currentPlayerIndex;
let moves =0;
let playing = false;
let size = 3;
let singlePlayer = false;



const setup = function() {
    if (localStorage.length) {
        loadingLocalStorage();
    }

    playButtonToggle();

    $('#play1join').click(() => joinPlayer('1'));
    $('#play2join').click(() => joinPlayer('2'));
    $('#play1leave').click(() => removePlayer('1'));
    $('#play2leave').click(() => removePlayer('2'));
    $('#playbutton').click(() => {
        resetBoard();
        buildBoard();
        currentPlayerIndex = ttt.playOrder()
        localStorage.setItem('currentPlayerIndex', currentPlayerIndex);
        playing = true;
        localStorage.setItem("playing", playing);
        playButtonToggle();
        const message = `Let's play!  ${ttt.players[currentPlayerIndex]['name']} goes first.`
        showMsg(message);
    });


    $('#alert-button').click(() => $('.alert').fadeOut(1000));

    $('#canvas-content a').click((event)=>
    chooseCanvas(event.target));

    $('#ai-content a').click((event)=>
    chooseAI(event.target));

    $('.memory').click(() =>{
        localStorage.clear();
        const message = `Local storage cleared.`;
        showMsg(message);
    });

    $(document).on('click', 'td', (event) => {
        if (singlePlayer) {
            if (ttt.players[currentPlayerIndex]['name'] === "AI" && ttt.emptySpots.length === $('td').length) {
                updateAIMoves();
            } else {
                if (updateMoves(event.target)) {
                    updateAIMoves();
                };

            }

        } else {
            updateMoves(event.target);
        }});



}


// to do list:
// token with picture
// online game
// readme.md


$(document).ready(setup);
