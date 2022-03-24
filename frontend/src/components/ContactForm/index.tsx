import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { IContactMutation, IContact } from 'types';
import { useAppSelector, useAppDispatch } from 'store/hooks';
import { addContact, updateContact } from 'store/contact/slice';
import { fileToDataUrl } from 'utils';

interface IContactFormProps {
  contact?: IContact;
}


export const ContactForm: React.FC<IContactFormProps> = ({ contact }) => {
  const navigate = useNavigate();
  const { register, formState: { errors }, handleSubmit, getValues, setValue } = useForm()
  const dispatch = useAppDispatch();
  const [avatarFile, setAvatarFile] = useState<File>()
  const [avatarUrl, setAvatarUrl] = useState(contact?.avatar);

  useEffect(() => {
    // if 'contact' exists(when editing a contact), fill the form with the given value.
    if (contact) {
      const keys: Array<keyof IContact> = ['name', 'lastName', 'email', 'phoneNumber', 'age', 'linkToWebsite', 'tags'];
      keys.forEach((key) => setValue(key, contact[key]));
    }

    return () => { }
  }, [contact]);

  const handleOnSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setAvatarFile(e.target.files[0]);
      fileToDataUrl(e.target.files[0]).then(dataUrl => setAvatarUrl(dataUrl))
    }
  }

  const handleOnSubmit = handleSubmit((data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    })
    formData.append('avatar', contact?.avatar || "");
    if (avatarFile) {
      formData.append('avatarFile', avatarFile)
    }
    if (contact) {
      dispatch(updateContact({
        id: contact.id,
        data: formData
      }))
    } else {
      dispatch(addContact(formData))
    }
    navigate('/contacts');
  })

  return (
    <div className="max-w-xl mx-auto">
      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input {...register("name", { required: true, maxLength: 50 })} />
          {errors.name?.type == 'required' && <p className="form-error">Name is required!</p>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input {...register("lastName", { required: true, maxLength: 50 })} />
          {errors.lastName?.type == 'required' && <p className="form-error">Last name is required!</p>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input {...register("email", { required: true, maxLength: 50 })} />
          {errors.email?.type == 'required' && <p className="form-error">Email is required!</p>}
        </div>

        <div className="form-group">
          <label>Phone Number</label>
          <input {...register("phoneNumber", { required: true, maxLength: 15 })} />
          {errors.phoneNumber?.type == 'required' && <p className="form-error">PhoneNumber is required!</p>}
        </div>

        <div className="form-group">
          <label>Age</label>
          <input type="number" {...register("age", { required: true })} />
          {errors.age?.type == 'required' && <p className="form-error">Age is required!</p>}
        </div>

        <div className="form-group">
          <label>Avatar</label>
          {
            avatarUrl && <img className="" src={avatarUrl} width="100" height="100" />
          }
          <input className="text-light px-0" type="file" name="avatarFile" onChange={handleOnSelectFile} />
        </div>

        <div className="form-group">
          <label>Link To Website</label>
          <input {...register("linkToWebsite", { required: true, maxLength: 100 })} />
          {errors.linkToWebsite?.type == 'required' && <p className="form-error">Website link is required!</p>}
        </div>

        <div className="form-group">
          <label>Tags</label>
          <textarea {...register("tags")} ></textarea>
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