const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Contact {
    contactId: String!
    name: String!
    email: String!
    phone: String!
    address: String!
  }

  type Query {
    getContacts: [Contact]
    getContact(contactId: String!): Contact
  }

  type Mutation {
    addContact(contactId: String!, name: String!, email: String!, phone: String!, address: String!): Contact
    deleteContact(contactId: String!): Contact
  }
`;

module.exports = typeDefs;
