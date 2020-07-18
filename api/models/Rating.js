const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RatingSchema = new Schema({
    eatery: {
        type: Schema.Types.ObjectId,
        ref: "Eatery",
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    serviceScore: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5]
    },
    foodScore: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5]
    },
    interiorScore: {
        type: Number,
        required: true,
        enum: [0, 1, 2, 3, 4, 5]
    },
    description: {
        type: String
    }
});

const Rating = mongoose.model('Rating', RatingSchema);

module.exports = Rating;