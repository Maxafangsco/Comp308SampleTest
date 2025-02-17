import React, { useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query GetContacts {
    getContacts {
      contactId
      name
      email
      phone
      address
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation DeleteContact($contactId: String!) {
    deleteContact(contactId: $contactId) {
      success
      message
    }
  }
`;

const ContactList = () => {
  const { loading, error, data, refetch } = useQuery(GET_CONTACTS);
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const handleDelete = async (contactId) => {
    try {
      const { data } = await deleteContact({ variables: { contactId } });
      if (data.deleteContact.success) {
        alert('Contact deleted successfully');
        refetch();
      } else {
        alert(data.deleteContact.message);
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-4">
      <h2>Contact List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Contact ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.getContacts.map((contact) => (
            <tr key={contact.contactId}>
              <td>{contact.contactId}</td>
              <td>{contact.name}</td>
              <td>{contact.email}</td>
              <td>{contact.phone}</td>
              <td>{contact.address}</td>
              <td>
                <button onClick={() => handleDelete(contact.contactId)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactList;
