import { render, screen } from '@testing-library/react';
import App from './App';

test('renders featured projects heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Our Featured Projects/i);
  expect(headingElement).toBeInTheDocument();
});
