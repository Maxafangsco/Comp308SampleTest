import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { GET_CONTACTS } from './ContactList';

const ADD_CONTACT = gql`
  mutation AddContact($input: ContactInput!) {
    addContact(input: $input) {
      success
      message
      contact {
        contactId
        name
        email
        phone
        address
      }
    }
  }
`;

const CreateContact = () => {
  const [contact, setContact] = useState({
    contactId: '',
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const [addContact] = useMutation(ADD_CONTACT, {
    refetchQueries: [{ query: GET_CONTACTS }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addContact({ variables: { input: contact } });
      if (data.addContact.success) {
        alert('Contact added successfully');
        setContact({ contactId: '', name: '', email: '', phone: '', address: '' });
      } else {
        alert(data.addContact.message);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div className="mb-3">
        <input type="text" name="contactId" value={contact.contactId} onChange={handleChange} className="form-control" placeholder="Contact ID" required />
      </div>
      <div className="mb-3">
        <input type="text" name="name" value={contact.name} onChange={handleChange} className="form-control" placeholder="Name" required />
      </div>
      <div className="mb-3">
        <input type="email" name="email" value={contact.email} onChange={handleChange} className="form-control" placeholder="Email" required />
      </div>
      <div className="mb-3">
        <input type="text" name="phone" value={contact.phone} onChange={handleChange} className="form-control" placeholder="Phone" required />
      </div>
      <div className="mb-3">
        <input type="text" name="address" value={contact.address} onChange={handleChange} className="form-control" placeholder="Address" required />
      </div>
      <button type="submit" className="btn btn-primary">Add Contact</button>
    </form>
  );
};

export default CreateContact;
