import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

test('list projects from API', async () => {
  render(<App />);
  const project = await waitFor(() => screen.getByText(/user1\/project1/i));
  expect(project).toBeInTheDocument();
});
