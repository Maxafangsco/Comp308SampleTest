const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  contactId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
