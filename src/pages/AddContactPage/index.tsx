import React from 'react';
import { ContactForm } from 'components/ContactForm';


export const AddContactPage: React.FC = () => {
  return (
    <div>
      <h3 className="text-center font-bold mb-8">Add New Contact</h3>
      <ContactForm />
    </div>
  );
}