import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
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

test('allows winning the game and dsiplays the correct winner', () => {
  render(<Game />);
  const status = screen.getByText('Next player: X');
  expect(status).toBeInTheDocument();

  const squares = screen.getAllByRole('button');
  fireEvent.click(squares[0]); // X
  fireEvent.click(squares[3]); // O
  fireEvent.click(squares[1]); // X
  fireEvent.click(squares[4]); // O
  fireEvent.click(squares[2]); // X

  // Assert the status after X wins
  const winnerStatus = screen.getByText('Winner: X');
  expect(winnerStatus).toBeInTheDocument();
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
