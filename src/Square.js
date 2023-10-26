import React from 'react';

function Square({
    isWinner,
    value,
    onSquareClick
}) {

    return (
        <button
            onClick={onSquareClick}
            className={isWinner ? 'square square-winner' : 'square'}
        >
            {value}
        </button>
    );
}

export default Square;