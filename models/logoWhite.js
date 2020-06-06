const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logoWhiteSchema = new Schema({
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('WhiteLogo', logoWhiteSchema);