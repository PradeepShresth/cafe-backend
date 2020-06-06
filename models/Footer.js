const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const footerSchema = new Schema({
    about: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: Number
    },
    email: {
        type: String
    },
    facebook: {
        type: String
    },
    twitter: {
        type: String
    },
    instagram: {
        type: String
    }
});

module.exports = mongoose.model('Footer', footerSchema);