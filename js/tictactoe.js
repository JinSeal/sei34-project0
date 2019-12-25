
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
  isBoardActive: false,

  initPlayer: function (id, name, symbol) {
    if (this.players.length < 2) {
      const winCounter = 0
      const player = { id, name, symbol, winCounter }
      this.players.push(player)
    }
    // validation and sort players order
    if (this.players.length === 2) {
      if (this.players[0].name === 'AI') {
        this.players[0].id = '3'
        this.singlePlayer = true
      } else if (this.players[1].name === 'AI') {
        this.players[1].id = '3'
        this.singlePlayer = true
      }

      if (this.players[0].id > this.players[1].id) {
        this.players = this.players.reverse()
      }
    }
    localStorage.setItem('ttt.players', JSON.stringify(this.players))
    return player
  },

  rmPlayer: function (name) {
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[i].name === name) {
        this.players.splice(i, 1)
      }
    }
    localStorage.setItem('ttt.players', JSON.stringify(this.players))
  },

  initBoard: function (size = 3) {
    this.size = size
    if (!this.board.length) {
      for (let i = 0; i < size; i++) {
        this.board.push([])
        for (let j = 0; j < size; j++) {
          this.board[i].push('')
        }
      }
    }
    localStorage.setItem('ttt.board', JSON.stringify(this.board))
    this.genEmptySpots()
    this.genWinCombo()
    this.isBoardActive = true
    return this.board
  },

  horizontal: function (symbol) {
    for (let r = 0; r < this.board.length; r++) {
      for (let c = 0; c < this.board.length; c++) {
        if (this.board[r][c] !== symbol) {
          break
        } else if (c === this.board.length - 1) {
          console.log('horizontal win')
          return true
        }
      }
    }
  },

  vertical: function (symbol) {
    for (let c = 0; c < this.board.length; c++) {
      for (let r = 0; r < this.board.length; r++) {
        if (this.board[r][c] !== symbol) {
          break
        } else if (r === this.board.length - 1) {
          console.log('vertical win')
          return true
        }
      }
    }
  },

  diagonalI: function (symbol) {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][i] !== symbol) {
        break
      } else if (i === this.board.length - 1) {
        console.log('diagonalI win')
        return true
      }
    }
  },

  diagonalII: function (symbol) {
    for (let i = 0; i < this.board.length; i++) {
      if (this.board[i][this.board.length - 1 - i] !== symbol) {
        break
      } else if (i === this.board.length - 1) {
        console.log('diagonalII win')
        return true
      }
    }
  },

  playOrder: function () {
    const firstHand = Math.floor(Math.random() * 2)
    return firstHand
  },

  makeMove: function (playerIndex, row, column) {
    if (!this.isBoardActive) return false
    console.log(this.players[playerIndex])
    const symbol = this.players[playerIndex].symbol

    if (!this.board[row][column]) {
      this.board[row][column] = symbol
      console.log(`${this.players[playerIndex].name} takes move`)
      this.updateEmptySpots(row, column)
      this.occupiedSpot.push([row, column])

      localStorage.setItem('ttt.board', JSON.stringify(this.board))
      localStorage.setItem('ttt.occupiedSpot', JSON.stringify(this.occupiedSpot))
      return true
    } else {
      console.log('Position has been taken.')
      return false
    }
  },

  winCheck: function (currentPlayerIndex, symbol) {
    if (this.horizontal(symbol) || this.vertical(symbol) || this.diagonalI(symbol) || this.diagonalII(symbol)) {
      this.players[currentPlayerIndex].winCounter += 1
      localStorage.setItem('ttt.players', JSON.stringify(this.players))
      this.isBoardActive = false
      return true
    }
  },

  reset: function () {
    this.occupiedSpot = []
    this.board = []
    this.emptySpots = []
    this.isBoardActive = false
    localStorage.setItem('ttt.board', JSON.stringify(this.board))
    localStorage.setItem('ttt.emptySpot', JSON.stringify(this.emptySpot))
    localStorage.setItem('ttt.occupiedSpot', JSON.stringify(this.occupiedSpot))
  },

  winCombo: [],
  genWinCombo: function () {
    this.winCombo = []
    const lid1 = []
    const lid2 = []
    for (let i = 0; i < this.size; i++) {
      const lih = []
      const liv = []

      lid1.push([i, i])
      lid2.push([this.size - 1 - i, i])
      for (let j = 0; j < this.size; j++) {
        lih.push([i, j])
        liv.push([j, i])
      }
      this.winCombo.push(lih)
      this.winCombo.push(liv)
    }
    this.winCombo.push(lid1)
    this.winCombo.push(lid2)

    localStorage.setItem('ttt.winCombo', JSON.stringify(this.winCombo))
    return this.winCombo
  },

  emptySpots: [],
  emptySpotsEasyLevel: [],
  emptySpotsHardLevel: [],

  genEmptySpots: function () {
    this.emptySpots = []
    for (let i = 0; i < this.size; i++) {
      for (let j = 0; j < this.size; j++) {
        this.emptySpots.push([i, j])
      }
    }
    localStorage.setItem('ttt.emptySpots', JSON.stringify(this.emptySpots))
  },

  updateEmptySpots: function (row, column) {
    let i = 0
    for (i; i < this.emptySpots.length; ++i) {
      if (this.emptySpots[i][0] == row && this.emptySpots[i][1] == column) {
        break
      }
    }
    this.emptySpots.splice(i, 1)
    localStorage.setItem('ttt.emptySpots', JSON.stringify(this.emptySpots))
  },

  aiRandomMove: function () {
    return this.emptySpots[Math.floor(Math.random() * this.emptySpots.length)]
  },

  aiEasy: function () {
    this.emptySpotsEasyLevel = []
    if (this.occupiedSpot.length < 2) {
      return this.aiRandomMove()
    } else {
      const lastMove = this.occupiedSpot[this.occupiedSpot.length - 1]
      console.log(lastMove)
      for (const i of this.emptySpots) {
        if (Math.abs(i[0] - Number(lastMove[0])) <= 1 && Math.abs(i[1] - Number(lastMove[1])) <= 1) {
          this.emptySpotsEasyLevel.push(i)
        }
      }
      localStorage.setItem('ttt.emptySpotsEasyLevel', JSON.stringify(this.emptySpotsEasyLevel))
    }

    const pos = this.emptySpotsEasyLevel[Math.floor(Math.random() * this.emptySpotsEasyLevel.length)]
    return pos || this.aiRandomMove()
  },

  aiHard: function () {
    const ai = this.players[1]
    const player = this.players[0]
    let winPoint

    for (const combo of this.winCombo) {
      let counter = 0

      for (const pos of combo) {
        if (this.board[pos[0]][pos[1]] === ai.symbol) {
          counter += 1
        } else if (!this.board[pos[0]][pos[1]]) {
          winPoint = [pos[0], pos[1]]
        } else { break }
      }
      if (counter === this.board.length - 1) {
        if (winPoint) {
          return winPoint
        }
      }
    }

    const filteredCombo = []
    for (const combo of this.winCombo) {
      for (const pos of combo) {
        if (this.board[pos[0]][pos[1]] === ai.symbol) {
          filteredCombo.push(combo)
          break
        }
      }
    }

    const defendCombo = []
    const filteredComboLength = filteredCombo.length
    for (const combo1 of this.winCombo) {
      for (const i in filteredCombo) {
        if (JSON.stringify(combo1) === JSON.stringify(filteredCombo[i])) {
          break
        } else if (i === filteredComboLength - 1) {
          defendCombo.push(combo1)
        }
      }
    }

    const toFindCommonSpot = []
    for (const combo of defendCombo) {
      const emptySpot = []
      for (let i = 0; i < combo.length; i++) {
        if (this.board[combo[i][0]][combo[i][1]] === player.symbol) {
        } else {
          emptySpot.push(combo[i])
        }
      }
      if (emptySpot.length === 1) {
        return emptySpot[0]
      } else if (emptySpot.length === 2) {
        toFindCommonSpot.push(emptySpot)
      }
    }

    for (let i = 0; i < toFindCommonSpot.length - 1; i++) {
      for (let j = i + 1; j < toFindCommonSpot.length; j++) {
        for (let id = 0; id < 2; id++) {
          for (let jd = 0; jd < 2; jd++) {
            if (JSON.stringify(toFindCommonSpot[i][id]) === JSON.stringify(toFindCommonSpot[j][jd])) {
              return toFindCommonSpot[i][id]
            }
          }
        }
      }
    }

    for (const i of this.emptySpots) {
      if (i[0] === i[1]) {
        return i
      }
    }
    return this.aiEasy()
  },

  aiEasyMove: function (playerIndex) {
    const pos = this.aiEasy()
    this.makeMove(playerIndex, String(pos[0]), String(pos[1]))
    return pos
  },

  aiHardMove: function (playerIndex) {
    const pos = this.aiHard()
    this.makeMove(playerIndex, String(pos[0]), String(pos[1]))
    return pos
  }

}

$(document).ready(ttt)
