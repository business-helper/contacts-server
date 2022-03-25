import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
import { Header } from 'components/Header';

describe('Header Component', () => {
  test('Should render header title', () => {
    render(<Header />, { wrapper: MemoryRouter })
    const linkElement = screen.getByText(/contact management/i);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/')
  })

  test('Should have anchor to /', () => {
    render(<Header />, { wrapper: MemoryRouter })
    const linkElement = screen.getByText(/contact management/i);
    expect(linkElement).toHaveAttribute('href', '/')
  })

  test('Should have the valid classes.', () => {
    render(<Header />, { wrapper: MemoryRouter })
    const linkElement = screen.getByText(/contact management/i);
    expect(linkElement).toHaveClass('text-xl text-center font-bold uppercase');
  })
})
