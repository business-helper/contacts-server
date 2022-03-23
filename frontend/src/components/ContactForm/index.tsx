import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IContact } from 'types';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { addContact } from 'store/contact/slice';

interface IContactFormProps {
  contact?: IContact;
}


export const ContactForm: React.FC<IContactFormProps> = ({ contact }) => {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, setValue } = useForm()
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (contact) {
      const keys: Array<keyof IContact> = ['name', 'lastName', 'email', 'phoneNumber', 'age', 'linkToWebsite'];
      keys.forEach((key) => setValue(key, contact[key]));
    }

    return () => { }
  }, [contact]);

  const handleOnSubmit = handleSubmit((data) => {
    console.log('[data]', data);
    const result = dispatch(addContact(data as IContact))
    navigate('/contacts');
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
          <label>Email</label>
          <input {...register("email", { required: true, maxLength: 20 })} />
          {errors.email?.type == 'required' && <p className="form-error">Email is required!</p>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input {...register("phoneNumber", { required: true, maxLength: 20 })} />
          {errors.phoneNumber?.type == 'required' && <p className="form-error">PhoneNumber is required!</p>}
        </div>
        <div className="form-group">
          <label>Age</label>
          <input type="number" {...register("age", { required: true })} />
          {errors.age?.type == 'required' && <p className="form-error">Age is required!</p>}
        </div>
        <div className="form-group">
          <label>Avatar</label>
          <input {...register("avatar", { required: true, maxLength: 20 })} />
          {errors.avatar?.type == 'required' && <p className="form-error">Avatar is required!</p>}
        </div>
        <div className="form-group">
          <label>Link To Website</label>
          <input {...register("linkToWebsite", { required: true, maxLength: 20 })} />
          {errors.linkToWebsite?.type == 'required' && <p className="form-error">Website link is required!</p>}
        </div>
        {/* <div className="form-group">
          <label>Tags</label>
          <input {...register("tags")} />
        </div> */}

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