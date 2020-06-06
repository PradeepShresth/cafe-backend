const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReviewImageSchema = new Schema({
    image: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ReviewImage', ReviewImageSchema);