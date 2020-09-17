import React from 'react';
import { render, screen, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('list projects from API', async () => {
  render(<App />);
  const project = await waitForElement(() => screen.getByText(/user1\/project1/i));
  expect(project).toBeInTheDocument();
});
