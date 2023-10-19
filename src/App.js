import {
  useState
} from 'react'

function Square({
  isWinner,
  value,
  onSquareClick
}) {

  return (
    <button
      onClick={onSquareClick}
      className={ isWinner ? 'square square-winner' : 'square'}
    >
      {value}
    </button>
  )
}

export function Board({
  xIsNext,
  squares,
  onPlay,
  onReset,
  winningLine,
  isATie,
}) {
  function handleClick (idx) {
    if (winningLine || squares[idx]) { 
      return 
    }

    const nextSquares = squares.slice()

    function calculateRowAndColumn(squareIndex) {
      const row = Math.floor(squareIndex / 9);
      const column = squareIndex % 9;
      return { row, column };
    }
    const {row, column} = calculateRowAndColumn(idx)
    const nextMoveData = { 
      index: idx,
      player: null,
      row: row,
      column: column,
    }

    if (xIsNext) {
      nextSquares[idx] = 'X'
      nextMoveData.player = 'X'
    } else {
      nextSquares[idx] = 'O'
      nextMoveData.player = 'O'
    }

    onPlay({
      nextSquares: nextSquares,
      moveData: {...nextMoveData}
    })
  }

  const renderRow = (row) => {
    // console.log(winningLine)
    return (
      <div className='board-row' key={row}>
        {
          Array(3).fill(null).map((_ , col) => {
            const squareIndex = row * 3 + col
            return (
              <Square
                isWinner={winningLine && winningLine.includes(squareIndex)}
                key={squareIndex}
                value={squares[squareIndex]}
                onSquareClick={() => handleClick(squareIndex)}
              />
            )
          })
        }
      </div>
    )
  }

  let status
  if (winningLine) {
    const winner = squares[winningLine[0]]
    status = "Winner: " + winner
  } else if (isATie) {
    status = 'Its a tie, would you like to play again?'
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <>
      <div className='status'>{status}</div>

      <div className='board'>
        {
          Array(3).fill(null).map((_,row) => renderRow(row))
        }
      </div>

      <div className='reset'>
        <button onClick={onReset}>reset</button>
      </div>
    </>
  )
}

export default function Game() {
  const [winningLine, setWiningLine] = useState(null)
  const [latestFirst, setLatestFirst] = useState(false)
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const [moveHistory, setMoveHistory] = useState({})
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay({nextSquares, moveData}) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)

    setCurrentMove(nextHistory.length - 1)

    const nextMoveHistory = {...moveHistory}
    nextMoveHistory[currentMove] = moveData
    setMoveHistory(nextMoveHistory)
    
    setWiningLine(calculateWinner(nextSquares))
  }

  function handleReset() {
    setHistory([Array(9).fill(null)])
    setCurrentMove(0)
    setWiningLine(null)
  }

  // console.log({history, currentSquares})

  function jumpTo(nextMove) {
    setCurrentMove(nextMove)
    setWiningLine(calculateWinner(nextMove))
  }

  const moves = history.map((squares, move) => {
    let description

    if (move > 0) {
      const { index, player, row, column } = moveHistory[move - 1]
      // description = `Go to move # ${move} by ${player} at row ${row} and column ${column}`
      description = `Go to move # ${move} by ${move % 2 ? 'X' : 'O'}`
    } else {
      description = 'Go to game start'
    }

    if (move === currentMove) {
      return (
        <li key={move}>
          {move === 0 ? 'You are at the first move' : 
            `You are at move # ${move} by ${move % 2 ? 'X' : 'O'}`}
        </li>
      )
    } else {
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{description}</button>
        </li>
      )
    }
  })

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext = {xIsNext}
          squares = {currentSquares}
          onPlay = {handlePlay}
          onReset = {handleReset}
          winningLine = {winningLine}
          isATie = {!winningLine && currentMove === 9}
        />
      </div>
      <div>
        <button 
          className='sort-moves'
          onClick={() => setLatestFirst(!latestFirst)}
        >
          {latestFirst ? "Latest move first" : "Oldest move first"}
        </button>
        <ol className={latestFirst ? 'reversed-ol' : ''}>
          {moves}
        </ol>
      </div>
    </div>
  )
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return lines[i]
    }
  }

  return null
}
