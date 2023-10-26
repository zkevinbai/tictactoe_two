import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Game from './Game';

test('renders the game board', () => {
  render(<Game />);

  // Ensure that the game board is rendered
  expect(screen.getByText('Next player: X')).toBeInTheDocument();
});

test('allows making a move by clicking a square', () => {
  render(<Game />);

  // Find an empty square and click on it
  const square = screen.getByText('X', { exact: false });
  fireEvent.click(square);

  // Ensure that the square has changed its content to 'X'
  expect(square).toHaveTextContent('X');
});

test('displays the correct winner', () => {
  render(<Game />);

  // Make moves to create a winning line
  const squares = [
    screen.getByText('X', { exact: false }),
    screen.getByText('O', { exact: false }),
    screen.getByText('X', { exact: false }),
    screen.getByText('O', { exact: false }),
    screen.getByText('X', { exact: false }),
    screen.getByText('O', { exact: false }),
    screen.getByText('X', { exact: false }),
    screen.getByText('O', { exact: false }),
    screen.getByText('X', { exact: false }),
  ];

  // Click on squares to create a winning line
  squares.forEach((square) => {
    fireEvent.click(square);
  });

  // Ensure that the game displays the correct winner
  expect(screen.getByText('Winner: X')).toBeInTheDocument();
});

test('allows resetting the game', () => {
  render(<Game />);

  // Make a move to change the game state
  const square = screen.getByText('X', { exact: false });
  fireEvent.click(square);

  // Reset the game
  const resetButton = screen.getByTestId('reset-button');
  fireEvent.click(resetButton);

  // Ensure that the game has been reset to its initial state
  expect(screen.getByText('Next player: X')).toBeInTheDocument();
});
