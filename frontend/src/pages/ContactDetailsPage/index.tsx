import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from 'store/hooks';
import { ContactForm } from 'components/ContactForm';

export const ContactDetailsPage: React.FC = () => {
  let { id } = useParams();
  const contactIndex = Number(id);
  const contacts = useAppSelector(state => state.contacts.list);

  return (
    <div>
      <h3 className="text-center">Contact Details</h3>
      <ContactForm contact={contacts[contactIndex]} />
    </div>
  )
}