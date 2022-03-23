import React from 'react';
import { ContactList } from 'components/Contact';
import contacts from 'data/contacts.json';

export const HomePage: React.FC = () => {
  const handleOnAddContact = () => {

  }

  return (
    <div className="">
      <div className="flex justify-end">
        <button
          className="bg-primary-light text-light px-6 py-3 rounded-lg
            hover:bg-primary-1 transition-all duration-300
          "
          onClick={handleOnAddContact}
        >
          Add Contact
        </button>
      </div>
      <ContactList contacts={contacts} />
    </div>
  )
}