import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IContact } from 'types';

interface IContactFormProps {
  contact?: IContact;
}

const initialContact: IContact = {
  name: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  age: 0,
  avatar: '',
  linkToWebsite: '',
  tags: [],
}

export const ContactForm: React.FC<IContactFormProps> = ({ contact: _contact }) => {
  const [contact, setContact] = useState<IContact>(initialContact);

  useEffect(() => {
    useState(_contact);
  }, []);

  return (
    <div>
      <h3>Contact Form</h3>
      <form></form>
    </div>
  )
}