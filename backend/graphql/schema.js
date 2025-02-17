const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Contact {
    contactId: String!
    name: String!
    email: String!
    phone: String!
    address: String!
  }

  input ContactInput {
    contactId: String!
    name: String!
    email: String!
    phone: String!
    address: String!
  }

  type ContactResponse {
    success: Boolean!
    message: String
    contact: Contact
  }

  type Query {
    getContacts: [Contact]
    getContact(contactId: String!): Contact
  }

  type Mutation {
    addContact(input: ContactInput!): ContactResponse
    deleteContact(contactId: String!): ContactResponse
  }
`;

module.exports = typeDefs;
