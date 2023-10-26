import React, { useState } from 'react';

function MoveHistory({ moves, jumpTo }) {
    const [latestFirst, setLatestFirst] = useState(false)

    return (
        <div>
            <button
                className='sort-moves'
                onClick={() => setLatestFirst(!latestFirst)}
            >
                {latestFirst ? "Latest move first" : "Oldest move first"}
            </button>
            <ol className={latestFirst ? 'reversed-ol' : ''}>
                {moves.map((description, move) => (
                    <li key={move}>
                        {move === 0 ? 'You are at the first move' : (
                            <button onClick={() => jumpTo(move)}>{description}</button>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

export default MoveHistory;
