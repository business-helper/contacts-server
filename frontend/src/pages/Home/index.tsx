import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { getContacts } from 'store/contact/slice';
import { ContactList } from 'components/Contact';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const contacts = useAppSelector(state => state.contacts.list);

  useEffect(() => {
    dispatch(getContacts({ page: 1 }));
  }, [dispatch]);

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
          data-testid="add-contact"
          onClick={handleOnAddContact}
        >
          Add Contact
        </button>
      </div>
      <ContactList contacts={contacts} />
    </div>
  )
}