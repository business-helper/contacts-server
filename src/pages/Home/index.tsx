import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { ContactList } from 'components/Contact';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const contacts = useAppSelector(state => state.contacts);

  const handleOnAddContact = () => {
    navigate('/contacts/add');
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