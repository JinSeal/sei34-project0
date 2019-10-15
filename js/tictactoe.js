

// #__Planning log
// 1 player object;
// 2 initiate board;
// 3 winRules()
// 4 makeMove()
// 5 checkWin

const ttt = {

    players: [],
    board: [],

    initPlayer: function(name, symbol) {
        if (this.players.length < 2) {
            let winCounter = 0;
            let index = this.players.length;
            player = {name, symbol, winCounter, index};
            this.players.push(player)
        }
        return player;
    },

    initBoard: function(size=3) {
        if(!this.board.length) {
            for (let i = 0; i < size; i++) {
                this.board.push([]);
                for (let j = 0; j < size; j++) {
                    this.board[i].push("");
                }
            }
        }
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
            alert(`${player['name']} goes first.`);
        return firstHand;
    },

    makeMove: function(playerIndex, row, column) {
        const symbol = this.players[playerIndex].symbol;
        if (!this.board[row][column]) {
            this.board[row][column] = symbol;
            console.log(`${this.players[playerIndex].name} takes move`);
            console.log(this.board);
            return true
        }
        console.log(`Position has been taken.`)
        return false;

        ;
    },

    winCheck: function(symbol) {
        return this.horizontal(symbol)||this.vertical(symbol)||this.diagonalI(symbol)||this.diagonalII(symbol)
    },
}


$(document).ready(ttt);
