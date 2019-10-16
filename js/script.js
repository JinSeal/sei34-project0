
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
        $(`#player${num}-win-counter`).text(0);
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
            } else if (moves === $('td').length-1) {
                const message = `DRAW! How could it happen !!!`
                showMsg(message);
            } else {
                currentPlayerIndex = 1 - currentPlayerIndex;
                localStorage.setItem('currentPlayerIndex', currentPlayerIndex)
                moves +=1;
                showCurrentPlayer();
                localStorage.setItem('moves', moves)
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
        $('.dropbtn').text(text);
        localStorage.setItem('size', size);
        return size;
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
        ttt.initBoard(size);
    }

    let currentPlayerIndex;
    let moves =0;
    let playing = false;
    let size = 3;




    const setup = function() {

        playButtonToggle();

        $('#play1join').click(() => joinPlayer('1'));
        $('#play2join').click(() => joinPlayer('2'));
        $('#play1leave').click(() => removePlayer('1'));
        $('#play2leave').click(() => removePlayer('2'));
        $('#playbutton').click(() => {
            resetBoard();
            buildBoard();
            currentPlayerIndex = ttt.playOrder()
            playing = true;
            localStorage.setItem("playing", playing);
            playButtonToggle();
            const message = `Let's play!  ${ttt.players[currentPlayerIndex]['name']} goes first.`
            showMsg(message);
        });


        $('#alert-button').click(() => $('.alert').fadeOut(1000));

        $('a').click((event)=>
        chooseCanvas(event.target));

        $(document).on('click', 'td', (event) => updateMoves(event.target));


        joinPlayer('1');
        joinPlayer('2');

    }


    // to do list:
    // local LocalStorage
    // token with picture
    // online game
    // AI moves
    // readme.md


    $(document).ready(setup);
