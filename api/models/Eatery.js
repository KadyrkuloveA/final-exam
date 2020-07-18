const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EaterySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        default: '0'
    },
    service: {
        type: String,
        default: '0'
    },
    food: {
        type: String,
        default: '0'
    },
});

const Eatery = mongoose.model('Eatery', EaterySchema);

module.exports = Eatery;