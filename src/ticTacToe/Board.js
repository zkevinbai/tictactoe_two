import React from 'react';
import Square from './Square';

function Board({
    xIsNext,
    squares,
    onPlay,
    onReset,
    winningLine,
    isATie,
}) {
    function handleClick(idx) {
        if (winningLine || squares[idx]) {
            return
        }

        const nextSquares = squares.slice()

        function calculateRowAndColumn(squareIndex) {
            const row = Math.floor(squareIndex / 9);
            const column = squareIndex % 9;
            return { row, column };
        }
        const { row, column } = calculateRowAndColumn(idx)
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
            moveData: { ...nextMoveData }
        })
    }

    const renderRow = (row) => {
        // console.log(winningLine)
        return (
            <div className='board-row' key={row}>
                {
                    Array(3).fill(null).map((_, col) => {
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
            <div className='game-status'>
                {status}
            </div>

            <div className='board'>
                {
                    Array(3).fill(null).map((_, row) => renderRow(row))
                }
            </div>

            <button
                className='reset-button'
                data-testid="reset-button"
                onClick={onReset}
            >
                Reset game
            </button>
        </>
    )
};

export default Board;