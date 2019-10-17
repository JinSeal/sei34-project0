

// #__Planning log__
// 1 player object;
// 2 initiate board;
// 3 winRules()
// 4 makeMove()
// 5 checkWin()
// 6 AI moves()

const ttt = {

    players: [],
    board: [],
    size: 3,
    occupiedSpot: [],
    singlePlayer: false,

    initPlayer: function(id, name, symbol) {
        if (this.players.length < 2) {
            let winCounter = 0;
            player = {id, name, symbol, winCounter};
            this.players.push(player)
        }

        if (this.players.length === 2) {
            if (this.players[0]['name'] === 'AI') {
                this.players[0]['id'] = '3';
                this.singlePlayer = true;
            } else if (this.players[1]['name'] ==='AI') {
                this.players[1]['id'] = '3';
                this.singlePlayer = true;
            }

            if (this.players[0]['id'] > this.players[1]['id']) {
                this.players = this.players.reverse()
            }
        }
        localStorage.setItem('ttt.players', JSON.stringify(this.players));
        return player;
    },


    rmPlayer: function(name) {
        for (let i = 0; i < this.players.length; i++) {
            if (this.players[i]['name'] === name) {
                this.players.splice(i, 1);
            }
        }
        localStorage.setItem('ttt.players', JSON.stringify(this.players));
    },

    initBoard: function(size=3) {
        this.size = size;
        if(!this.board.length) {
            for (let i = 0; i < size; i++) {
                this.board.push([]);
                for (let j = 0; j < size; j++) {
                    this.board[i].push("");
                }
            }
        }
        localStorage.setItem('ttt.board', JSON.stringify(this.board));
        this.genEmptySpots();
        this.genWinCombo();
        return this.board;
    },

    horizontal: function(symbol) {
        for (let r = 0; r < this.board.length; r++ ) {
            for (let c = 0; c < this.board.length; c++){
                if (this.board[r][c] !== symbol) {
                    break;
                } else if (c == this.board.length-1) {
                    console.log('horizontal win');
                    return true;
                }
            }
        }
    },

    vertical: function(symbol) {
        for (let c = 0; c < this.board.length; c++ ) {
            for (let r = 0; r < this.board.length; r++){
                if (this.board[r][c] !== symbol) {
                    break;
                } else if (r == this.board.length-1) {
                    console.log('vertical win');
                    return true;
                }
            }
        }
    },

    diagonalI: function(symbol) {
        for (let i = 0; i < this.board.length; i++ ) {
            if (this.board[i][i] !== symbol) {
                break;
            } else if (i == this.board.length-1) {
                console.log('diagonalI win');
                return true;
            }
        }
    },

    diagonalII: function(symbol) {
        for (let i = 0; i < this.board.length; i++ ) {
            if (this.board[i][this.board.length-1-i] !== symbol) {
                break;
            } else if (i == this.board.length-1) {
                console.log('diagonalII win');
                return true;
            }
        }
    },

    playOrder: function(){
        let firstHand = Math.floor(Math.random()*2);
        let player = this.players[firstHand];
        return firstHand;
    },

    makeMove: function(playerIndex, row, column) {
        console.log(this.players[playerIndex]);
        const symbol = this.players[playerIndex].symbol;

        if (!this.board[row][column]) {

            this.board[row][column] = symbol;
            localStorage.setItem('ttt.board', JSON.stringify(this.board));
            console.log(`${this.players[playerIndex].name} takes move`);
            this.updateEmptySpots(row, column);
            this.occupiedSpot.push([row, column]);

            return true
        }
        console.log(`Position has been taken.`);
        return false;

    },

    winCheck: function(currentPlayerIndex,symbol) {
        if (this.horizontal(symbol)||this.vertical(symbol)||this.diagonalI(symbol)||this.diagonalII(symbol)) {
            this.players[currentPlayerIndex]['winCounter'] +=1;
            localStorage.setItem('ttt.players', JSON.stringify(this.players))
            ;            return true;
        }
    },

    reset: function() {
        this.occupiedSpot=[];
        this.board= [];
        this.emptySpots= [];
        localStorage.setItem('ttt.board', JSON.stringify(this.board));
        localStorage.setItem('ttt.emptySpot', JSON.stringify(this.emptySpot));
    },

    winCombo: [],
    genWinCombo: function (){
        this.winCombo =[];
        let lid1 = [];
        let lid2 = [];
        for (let i = 0; i < this.size; i++) {
            let lih = [];
            let liv = [];

            lid1.push([i,i])
            lid2.push([this.size-1-i, i])
            for (let j = 0; j < this.size; j++){
                lih.push([i, j])
                liv.push([j, i])
            }
            this.winCombo.push(lih);
            this.winCombo.push(liv);
        }
        this.winCombo.push(lid1);
        this.winCombo.push(lid2);
        return this.winCombo;
    },

    emptySpots:[],
    emptySpotsMediumLevel: [],
    emptySpotsHardLevel: [],

    genEmptySpots: function() {
        this.emptySpots =[];
        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                this.emptySpots.push([i, j]);
            }
        }
    },

    updateEmptySpots: function(row, column) {
        let i = 0;
        for (i; i<this.emptySpots.length; ++i) {
            if (this.emptySpots[i][0] == row && this.emptySpots[i][1]  == column) {
                break
            }
        }
        this.emptySpots.splice(i, 1)
    },

    aiRandomMove: function() {
        return this.emptySpots[Math.floor(Math.random()* this.emptySpots.length)]
    },

    aiEasy: function() {
        this.emptySpotsMediumLevel =[];
        if (this.occupiedSpot.length<2) {
            return this.aiRandomMove();
        } else {
            let lastMove = this.occupiedSpot[this.occupiedSpot.length-1];
            console.log(lastMove);
            for (let i of this.emptySpots) {
                if (Math.abs(i[0]-Number(lastMove[0]))<=1 && Math.abs(i[1]-Number(lastMove[1])) <=1) {
                    this.emptySpotsMediumLevel.push(i);
                }
            }
        }
        let pos = this.emptySpotsMediumLevel[Math.floor(Math.random()* this.emptySpotsMediumLevel.length)]
        return pos? pos: this.aiRandomMove();
    },

    aiHard: function() {

        const ai = this.players[1]
        const player = this.players[0];
        let filteredCombo = [];
        for (let combo of this.winCombo) {
            for (let pos of combo) {
                if (this.board[pos[0]][pos[1]] === ai['symbol']) {
                    filteredCombo.push(combo);
                    break;
                }
            }
        }

        let defendCombo =[];
        let filteredComboLength = filteredCombo.length;
        for (let combo1 of this.winCombo) {
            for (let i in filteredCombo){
                if (JSON.stringify(combo1) === JSON.stringify(filteredCombo[i])) {
                    break;
                } else if (i == filteredComboLength-1) {
                    defendCombo.push(combo1);
                }
            }
        }


        let toFindCommonSpot = [];
        for (let combo of defendCombo) {
            let emptySpot = [];
            for (let i = 0; i < combo.length; i++) {
                if (this.board[combo[i][0]][combo[i][1]] === player.symbol) {
                } else {
                    emptySpot.push(combo[i])
                }
            }
            if (emptySpot.length === 1) {
                return emptySpot[0];
            } else if (emptySpot.length === 2) {
                toFindCommonSpot.push(emptySpot);
            }
        }

        for (let i =0; i < toFindCommonSpot.length-1; i++) {
            for (let j = i+1; j < toFindCommonSpot.length; j++) {
                for (let id = 0; id < 2; id++){
                    for (let jd = 0; jd <2; jd++) {
                        if (JSON.stringify(toFindCommonSpot[i][id])===JSON.stringify(toFindCommonSpot[j][jd])) {
                            return toFindCommonSpot[i][id]
                        }
                    }
                }
            }
        }
        return  this.aiEasy();
    },

    aiEasyMove: function(playerIndex) {
        const pos = this.aiEasy();
        this.makeMove(playerIndex, String(pos[0]), String(pos[1]));
        return pos;
    },

    aiHardMove: function(playerIndex) {
        const pos = this.aiHard();
        this.makeMove(playerIndex, String(pos[0]), String(pos[1]));
        console.log(pos);
        return pos;
}
}



$(document).ready(ttt);
