import React, { useState } from 'react';
import Square from './Square';
import Board from './Board';
import MoveHistory from './MoveHistory';

function Game() {
    const [winningLine, setWiningLine] = useState(null);
    const [latestFirst, setLatestFirst] = useState(false);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const [moveHistory, setMoveHistory] = useState({});
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay({ nextSquares, moveData }) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);

        setCurrentMove(nextHistory.length - 1);

        const nextMoveHistory = { ...moveHistory };
        nextMoveHistory[currentMove] = moveData;
        setMoveHistory(nextMoveHistory);

        setWiningLine(calculateWinner(nextSquares));
    }

    function handleReset() {
        setHistory([Array(9).fill(null)]);
        setCurrentMove(0);
        setWiningLine(null);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setWiningLine(calculateWinner(history[nextMove]));
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    onReset={handleReset}
                    winningLine={winningLine}
                    isATie={!winningLine && currentMove === 9}
                />
            </div>
            <div>
                <MoveHistory
                    latestFirst={latestFirst}
                    setLatestFirst={setLatestFirst}
                    moves={history}
                    currentMove={currentMove}
                    jumpTo={jumpTo}
                />
            </div>
        </div>
    );
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
    ];

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return lines[i];
        }
    }

    return null;
}

export default Game;
