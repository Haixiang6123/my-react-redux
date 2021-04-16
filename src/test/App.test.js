import React from 'react'
import { render, screen } from '@testing-library/react';
import GrandFather from '../GrandFather';

test('renders learn react link', () => {
  render(<GrandFather />);
  const linkElement = screen.getByText('Hello');
  expect(linkElement).toBeInTheDocument();
});
