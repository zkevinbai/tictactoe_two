import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Game from './Game';

test('renders the Game component without errors', () => {
  render(<Game />);
  const gameTitle = screen.getByText('Tic-Tac-Toe');
  expect(gameTitle).toBeInTheDocument();
});

test('displays the initial game status', () => {
  render(<Game />);
  const status = screen.getByText('Next player: X');
  expect(status).toBeInTheDocument();
});

test('allows a user to make a move', () => {
  render(<Game />);
  const squareButtons = screen.getAllByRole('button', { name: '' }); // Get all square buttons

  // Click on the first square button
  fireEvent.click(squareButtons[0]);

  const status = screen.getByText('Next player: O');
  expect(status).toBeInTheDocument();
});

test('displays the winner when the game is won', () => {
  render(<Game />);
  const squareButtons = screen.getAllByRole('button', { name: '' }); // Get all square buttons

  // Play a winning move
  fireEvent.click(squareButtons[0]);
  fireEvent.click(squareButtons[3]);
  fireEvent.click(squareButtons[1]);
  fireEvent.click(squareButtons[4]);
  fireEvent.click(squareButtons[2]);

  const status = screen.getByText('Winner: X');
  expect(status).toBeInTheDocument();
});

test('allows the game to be reset', () => {
  render(<Game />);
  const resetButton = screen.getByRole('button', { name: 'reset' }); // Get the reset button

  // Play a move and then reset the game
  fireEvent.click(screen.getByText('Go to move # 1 by X'));
  fireEvent.click(resetButton);

  const status = screen.getByText('Next player: X');
  expect(status).toBeInTheDocument();
});
