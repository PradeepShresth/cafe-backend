const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logoBlackSchema = new Schema({
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('BlackLogo', logoBlackSchema);