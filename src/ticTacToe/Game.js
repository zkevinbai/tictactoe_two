import React, { useState, useEffect } from 'react';
import Board from './Board';
import MoveHistory from './MoveHistory';
import './Game.css'

function Game() {
    const [gameState, setGameState] = useState({
        winningLine: null,
        latestFirst: false,
        history: [Array(9).fill(null)],
        currentMove: 0,
        moveHistory: {},
    });

    const [AiActive, setAiActive] = useState(false);

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

    function makeAIMove() {
        if (gameState.winningLine || gameState.currentMove === 9) {
            return; // The game is over, or the board is full
        }

        const winningLine = findWinningMove(currentSquares, xIsNext ? 'X' : 'O');
        const blockingLine = findWinningMove(currentSquares, xIsNext ? 'O' : 'X');

        if (winningLine) {
            // Take the winning move
            handlePlay({
                nextSquares: currentSquares.map((value, index) => {
                    return index === winningLine ? (xIsNext ? 'X' : 'O') : value;
                }),
                moveData: {
                    index: winningLine,
                    player: xIsNext ? 'X' : 'O',
                    row: Math.floor(winningLine / 3),
                    column: winningLine % 3,
                },
            });
        } else if (blockingLine) {
            // Block the opponent from winning
            handlePlay({
                nextSquares: currentSquares.map((value, index) => {
                    return index === blockingLine ? (xIsNext ? 'X' : 'O') : value;
                }),
                moveData: {
                    index: blockingLine,
                    player: xIsNext ? 'X' : 'O',
                    row: Math.floor(blockingLine / 3),
                    column: blockingLine % 3,
                },
            });
        } else {
            // If no immediate winning or blocking move, make a random move
            const availablePositions = [];
            for (let i = 0; i < currentSquares.length; i++) {
                if (!currentSquares[i]) {
                    availablePositions.push(i);
                }
            }

            if (availablePositions.length === 0) {
                return; // No available moves left
            }

            const randomIndex = Math.floor(Math.random() * availablePositions.length);
            const aiMove = availablePositions[randomIndex];

            handlePlay({
                nextSquares: currentSquares.map((value, index) => {
                    return index === aiMove ? (xIsNext ? 'X' : 'O') : value;
                }),
                moveData: {
                    index: aiMove,
                    player: xIsNext ? 'X' : 'O',
                    row: Math.floor(aiMove / 3),
                    column: aiMove % 3,
                },
            });
        }
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

    // Add an effect to make the AI move when it's the AI player's turn
    useEffect(() => {
        // add logic for a boolean play withAI
        // add logic to choose player
        if (!xIsNext && AiActive) {
            setTimeout(() => makeAIMove(), 50);
        }
    }, [xIsNext]);

    return (
        <>
            <div className='title'>
                <h1>Kevin's Time Travel Tic Tac Toe</h1>
                <a href='https://github.com/zkevinbai/tictactoe_two/tree/master' target='_blank' rel='noopener noreferrer'>
                    Github Repo
                </a>
                <div className='ai-container'>
                    <button className='ai-button' onClick={() => setAiActive(!AiActive)}>
                        {AiActive ? 'Play Two Player Game' : 'Play Against the AI'}
                    </button>
                    <p>{`You are playing ${AiActive ? 'the AI' : 'a two player game'}`}</p>
                </div>
            </div>

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
                <div className='move-history'>
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
        </>
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

function findWinningMove(squares, symbol) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            const tempSquares = squares.slice(); // Create a copy of the current squares
            tempSquares[i] = symbol; // Temporarily place the AI's symbol

            if (calculateWinner(tempSquares)) {
                return i; // If placing the symbol here results in a win, return the position
            }
        }
    }

    return null; // If no winning move is found, return null
}

export default Game;
