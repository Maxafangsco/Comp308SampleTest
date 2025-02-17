const Contact = require('../models/Contact');

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
    addContact: async (_, { input }) => {
      const { contactId, name, email, phone, address } = input;
      const contact = new Contact({ contactId, name, email, phone, address });
      try {
        await contact.save();
        return {
          success: true,
          message: 'Contact added successfully',
          contact
        };
      } catch (error) {
        console.error('Error adding contact:', error);
        return {
          success: false,
          message: error.message,
          contact: null
        };
      }
    },
    deleteContact: async (_, { contactId }) => {
      try {
        const contact = await Contact.findOneAndDelete({ contactId });
        if (!contact) {
          return {
            success: false,
            message: 'Contact not found',
            contact: null
          };
        }
        return {
          success: true,
          message: 'Contact deleted successfully',
          contact
        };
      } catch (error) {
        return {
          success: false,
          message: error.message,
          contact: null
        };
      }
    }
  }
};

module.exports = resolvers;
