import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IContact } from 'types';
import { useAppDispatch } from 'store/hooks';
import { deleteContact } from 'store/contact/slice';
import { ReactComponent as EditIcon } from 'assets/edit.svg';
import { ReactComponent as TrashIcon } from 'assets/trash.svg';
import styles from './index.module.scss';

interface IContactItemProps {
  contact: IContact;
  onDelete: () => void;
  onUpdate: () => void;
}

interface IContactListProps {
  contacts: Array<IContact>;
}


export const ContactList: React.FC<IContactListProps> = ({ contacts }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleOnUpdate = (idx: number) => {
    navigate(`/contacts/${idx}`)
  }

  const handleOnDelete = (idx: number) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(idx));
    }
  }

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Website</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            contacts.map((contact) =>
              <ContactItem
                key={contact.id}
                contact={contact}
                onUpdate={() => handleOnUpdate(contact.id)}
                onDelete={() => handleOnDelete(contact.id)} />)
          }
        </tbody>
      </table>
      {
        contacts.length === 0 && (
          <div className="text-center">
            No contacts found. Create a first one!
          </div>
        )
      }
    </div>
  )
}

export const ContactItem: React.FC<IContactItemProps> = ({ contact, onDelete, onUpdate }) => {

  return (
    <tr>
      <td>
        <img data-testid="contact-avatar" className={styles.avatar} src={contact.avatar} width="50" height="50" alt={`${contact.name} ${contact.lastName}`} />
      </td>
      <td>{contact.name} {contact.lastName}</td>
      <td>{contact.email}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.age}</td>
      <td>
        {contact.linkToWebsite &&
          <a
            className="hover:underline hover:text-light-1"
            target="_blank"
            href={contact.linkToWebsite}
            rel="noreferrer"
          >
            Website
          </a>
        }
        {!contact.linkToWebsite && <span className="text-orange-700 text-sm">No Website Link</span>}
      </td>
      <td>{contact.tags}</td>
      <td>
        <div className="flex items-center px-2">
          <EditIcon data-testid="edit-icon" className={styles.editIcon} onClick={onUpdate} />
          <TrashIcon data-testid="delete-icon" className={styles.trashIcon} onClick={onDelete} />
        </div>
      </td>
    </tr>
  )
}