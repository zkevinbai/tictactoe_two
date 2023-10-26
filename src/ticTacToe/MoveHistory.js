import React from 'react';

function MoveHistory({ 
    latestFirst,
    setLatestFirst,
    moves,
    currentMove,
    jumpTo 
}) {
    return (
        <div>
            <button
                className='sort-moves'
                onClick={() => setLatestFirst(!latestFirst)}
            >
                {latestFirst ? "Latest move first" : "Oldest move first"}
            </button>
            <ol className={latestFirst ? 'reversed-ol' : ''}>
                {moves.map((squares, move) => {
                    const description = move ? `Go to move # ${move} by ${move % 2 ? 'X' : 'O'}` : 'Go to game start';
                    const isSelected = move === currentMove;

                    return (
                        <li key={move}>
                            {isSelected ? (
                                move === 0 ? 'You are at the first move' : `You are at move # ${move} by ${move % 2 ? 'X' : 'O'}`
                            ) : (
                                <button onClick={() => jumpTo(move)}>{description}</button>
                            )}
                        </li>
                    );
                })}
            </ol>
        </div>
    );
}

export default MoveHistory;
