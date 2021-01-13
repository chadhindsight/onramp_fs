import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import Login from './components/User/Login';
import Signup from './components/User/Signup';

test('renders The app component and related info', () => {
  render(<App />);
  const headerEl = screen.getByText(/Ublog/i);
  expect(headerEl).toBeInTheDocument();
});

test('should have a form submit button', () => {
  render(<Login />);
  const btn = screen.getByRole('button');
  // expect(btn).toBeInTheDocument();
  expect(btn).toHaveAttribute('type');
});

test('should have a submit button', () => {
  render(<Signup />);
  const btn = screen.getByRole('button');
  expect(btn).toHaveAttribute('type');
});  
