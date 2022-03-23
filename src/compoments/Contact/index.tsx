import React from 'react';
import { IContact } from 'types';
import styles from './index.module.scss';

interface IContactItemProps {
  contact: IContact;
}

interface IContactListProps {
  contacts: Array<IContact>;
}


export const ContactList: React.FC<IContactListProps> = ({ contacts }) => {
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
          {contacts.map((contact, i) => <ContactItem key={i} contact={contact} />)}
        </tbody>
      </table>
    </div>
  )
}

export const ContactItem: React.FC<IContactItemProps> = ({ contact }) => {

  return (
    <tr>
      <td>
        <img className={styles.avatar} src={contact.avatar} width="50" height="50" />
      </td>
      <td>{contact.name} {contact.lastName}</td>
      <td>{contact.email}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.age}</td>
      <td><a href={contact.linkToWebsite}>Website</a></td>
      <td>Tags</td>
      <td>Actions</td>
    </tr>
  )
}