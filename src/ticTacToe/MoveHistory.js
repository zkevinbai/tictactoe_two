import React from 'react';

function MoveHistory({ 
    latestFirst,
    setLatestFirst,
    moves,
    currentMove,
    jumpTo 
}) {
    return (
        <>
            <h3>Move History</h3>
            <button
                className='sort-moves-button'
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
                                <button 
                                    className='history-button'
                                    onClick={() => jumpTo(move)}
                                >
                                    {description}
                                </button>
                            )}
                        </li>
                    );
                })}
            </ol>
        </>
    );
}

export default MoveHistory;
