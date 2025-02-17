const Contact = require('./models/Contact');

const resolvers = {
  Query: {
    getContacts: async () => {
      return await Contact.find();
    },
    getContact: async (_, { contactId }) => {
      return await Contact.findOne({ contactId });
    }
  },
  Mutation: {
    addContact: async (_, { contactId, name, email, phone, address }) => {
      const contact = new Contact({ contactId, name, email, phone, address });
      await contact.save();
      return contact;
    },
    deleteContact: async (_, { contactId }) => {
      return await Contact.findOneAndDelete({ contactId });
    }
  }
};

module.exports = resolvers;
