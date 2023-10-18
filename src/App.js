import {
  useState
} from 'react'

function Square({
  value,
  onSquareClick
}) {

  return (
    <button
      onClick={onSquareClick}
      className="square"
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
}) {

  // const [xIsNext, setXIsNext] = useState(true)
  // const [squares, setSquares] = useState(Array(9).fill(null))

  function handleClick (idx) {
    debugger
    console.log(squares, calculateWinner(squares))

    if (calculateWinner(squares) || squares[idx]) { 
      return 
    }

    const nextSquares = squares.slice()

    if (xIsNext) {
      nextSquares[idx] = 'X'
    } else {
      nextSquares[idx] = 'O'
    }

    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  let status
  if (winner) {
    status = "Winner: " + winner
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O")
  }

  return (
    <>
      <div className='status'>{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>

      <div className='reset'>
        <button onClick={onReset}>reset</button>
      </div>
    </>
  )
}

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true)
  const [history, setHistory] = useState([Array(9).fill(null)])

  const currentSquares = history[history.length - 1]

  function handlePlay(nextSquares) {
    setHistory([...history, nextSquares])
    setXIsNext(!xIsNext)
  }

  function handleReset() {
    debugger
    setHistory([Array(9).fill(null)])
  }

  console.log({history, currentSquares})

  return (
    <div className='game'>
      <div className='game-board'>
        <Board
          xIsNext = {xIsNext}
          squares = {currentSquares}
          onPlay = {handlePlay}
          onReset = {handleReset}
        />
      </div>
      <div>
        <ol>{/* todo */}</ol>
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
      return squares[a]
    }
  }

  return null
}
