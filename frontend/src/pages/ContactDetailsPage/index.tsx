import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { ContactForm } from 'components/ContactForm';

export const ContactDetailsPage: React.FC = () => {
  let { id } = useParams();
  const contacts = useAppSelector(state => state.contacts.list);
  const contact = contacts.find(contact => contact.id === Number(id));

  return (
    <div>
      <h3 className="text-center">Contact Details</h3>
      <ContactForm contact={contact} />
    </div>
  )
}