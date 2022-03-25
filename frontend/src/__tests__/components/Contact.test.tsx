import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import { ContactItem } from 'components/Contact';
import contacts from 'data/contacts.json';

describe('Contact Item', () => {
  const contact = contacts[0]
  const handleOnClickUpdate = jest.fn();
  const handleOnClickDelete = jest.fn();

  beforeEach(() => {
    render(<ContactItem
      contact={contact}
      onUpdate={handleOnClickUpdate}
      onDelete={handleOnClickDelete}
    />)
  })

  afterEach(cleanup);

  test('should render avatar image', () => {
    const avatar = screen.getByTestId('contact-avatar');
    expect(avatar).toBeInTheDocument();
  })

  test('should render contact name', () => {
    const nameElement = screen.getByText(`${contact.name} ${contact.lastName}`);
    expect(nameElement).toBeInTheDocument();
  })

  test('should render email address', () => {
    const emailElement = screen.getByText(contact.email);
    expect(emailElement).toBeInTheDocument();
  })

  test('should render age', () => {
    const ageElement = screen.getByText(contact.age);
    expect(ageElement).toBeInTheDocument();
  })

  test('should render phone number', () => {
    const phoneElement = screen.getByText(contact.phoneNumber);
    expect(phoneElement).toBeInTheDocument();
  })

  test('should render website link', () => {
    const siteLink = screen.getByText(/Website/i);
    expect(siteLink).toBeInTheDocument();
    expect(siteLink).toHaveAttribute('href', contact.linkToWebsite);
    expect(siteLink).toHaveAttribute('target', '_blank');
  })

  test('should trigger events on clicking action icons', () => {
    const editIcon = screen.getByTestId('edit-icon');
    const trashIcon = screen.getByTestId('delete-icon');

    fireEvent.click(editIcon);
    fireEvent.click(trashIcon);
    expect(handleOnClickUpdate).toHaveBeenCalledTimes(1);
    expect(handleOnClickDelete).toHaveBeenCalledTimes(1);
  })
})

describe('Contact Item/Website Link', () => {
  test('should not have anchor when website link is empty', () => {
    const contact = contacts[0]
    contact.linkToWebsite = "";
    const handleOnClickUpdate = jest.fn();
    const handleOnClickDelete = jest.fn();

    render(<ContactItem
      contact={contact}
      onUpdate={() => { }}
      onDelete={() => { }}
    />)

    const linkTd = screen.getByText(/no website link/i);
    expect(linkTd).toBeInTheDocument();
  })
})