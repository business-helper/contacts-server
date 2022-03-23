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
  const { register, formState: { errors }, handleSubmit } = useForm()
  const [contact, setContact] = useState<IContact>(initialContact);

  useEffect(() => {
    if (_contact) {
      setContact(_contact);
    }

    return () => { }
  }, [_contact]);

  const handleOnSubmit = handleSubmit((data) => {
    console.log('[data]', data);
  })

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input {...register("name", { required: true, maxLength: 20 })} />
          {errors.name?.type == 'required' && <p className="form-error">Name is required!</p>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input {...register("lastName", { required: true, maxLength: 20 })} />
          {errors.lastName?.type == 'required' && <p className="form-error">Last name is required!</p>}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" {...register("age", { required: true })} />
          {errors.age?.type == 'required' && <p className="form-error">Age is required!</p>}
        </div>

        <div className="flex justify-center">
          <button
            className="button"
            type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}