import React, { useState } from 'react';
import Board from './Board';
import MoveHistory from './MoveHistory';

function Game() {
    const [gameState, setGameState] = useState({
        winningLine: null,
        latestFirst: false,
        history: [Array(9).fill(null)],
        currentMove: 0,
        moveHistory: {},
    });

    const xIsNext = gameState.currentMove % 2 === 0;
    const currentSquares = gameState.history[gameState.currentMove];

    function handlePlay({ nextSquares, moveData }) {
        const nextHistory = [...gameState.history.slice(0, gameState.currentMove + 1), nextSquares];

        setGameState({
            ...gameState,
            history: nextHistory,
            currentMove: nextHistory.length - 1,
            moveHistory: {
                ...gameState.moveHistory,
                [gameState.currentMove]: moveData,
            },
            winningLine: calculateWinner(nextSquares),
        });
    }

    function handleReset() {
        setGameState({
            ...gameState,
            history: [Array(9).fill(null)],
            currentMove: 0,
            winningLine: null,
        });
    }

    function jumpTo(nextMove) {
        setGameState({
            ...gameState,
            currentMove: nextMove,
            winningLine: calculateWinner(gameState.history[nextMove]),
        });
    }

    return (
        <div className='game'>
            <div className='game-board'>
                <Board
                    xIsNext={xIsNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                    onReset={handleReset}
                    winningLine={gameState.winningLine}
                    isATie={!gameState.winningLine && gameState.currentMove === 9}
                />
            </div>
            <div>
                <MoveHistory
                    latestFirst={gameState.latestFirst}
                    setLatestFirst={(latestFirst) =>
                        setGameState({ ...gameState, latestFirst })
                    }
                    moves={gameState.history}
                    currentMove={gameState.currentMove}
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
