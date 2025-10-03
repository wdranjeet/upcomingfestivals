import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders upcoming festivals heading', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const headingElement = screen.getByText(/Upcoming Indian Festivals/i);
  expect(headingElement).toBeInTheDocument();
});
