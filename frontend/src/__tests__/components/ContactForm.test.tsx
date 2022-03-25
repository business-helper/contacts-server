import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { ContactForm } from 'components/ContactForm';
import { store } from 'store';

describe('ContactForm', () => {

  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ContactForm />
        </BrowserRouter>
      </Provider>
    )
  })

  afterEach(cleanup)

  test('should have input fields with valid type', () => {
    ['name', 'lastName', 'email', 'phoneNumber', 'age', 'linkToWebsite', 'tags'].forEach(key => {
      const element = screen.getByTestId(`input-${key}`);
      expect(element).toBeInTheDocument();
      if (!['age', 'tags'].includes(key)) {
        expect(element).toHaveAttribute('type', 'text');
      }
      if (key == 'age') {
        expect(element).toHaveAttribute('type', 'number');
      }
    })
  })

  test('should have file input for avatar', () => {
    const fileInput = screen.getByTestId('input-avatarFile');
    expect(fileInput).toBeInTheDocument();
  })

  test('should have submit button', () => {
    const submitButton = screen.getByText(/submit/i);
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveClass('button');
    expect(submitButton).toHaveAttribute('type', 'submit');
  })
})
