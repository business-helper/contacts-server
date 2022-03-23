import React from 'react';
import { ContactForm } from 'components/ContactForm';


export const AddContactPage: React.FC = () => {
  return (
    <div>
      <h3>Add New Contact</h3>
      <ContactForm />
    </div>
  );
}