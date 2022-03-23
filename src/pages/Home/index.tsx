import React from 'react';
import { ContactList } from 'compoments/Contact';
import contacts from 'data/contacts.json';

export const HomePage: React.FC = () => {
  return (
    <div className="">
      <ContactList contacts={contacts} />
    </div>
  )
}