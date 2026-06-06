import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { installMenuApiMock } from './test/mockMenuApi';

beforeEach(() => {
  installMenuApiMock();
});

test('renders restaurant headline', async () => {
  render(<App />);
  expect(screen.getByText(/Grand Bites/i)).toBeInTheDocument();
  await waitFor(() => {
    expect(screen.getByText(/Bruschetta al Pomodoro/i)).toBeInTheDocument();
  });
});
