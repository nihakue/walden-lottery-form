import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders begin link (smoke test)', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Begin/i);
  expect(linkElement).toBeInTheDocument();
});
