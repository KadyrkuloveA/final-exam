const auth = require('../middleware/auth');
const express = require('express');

const User = require('../models/User');
const permit = require('../middleware/permit');
const Eatery = require('../models/Eatery');
const Rating = require('../models/Rating');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    try {
        const sender = req.user;
        const eatery = req.body.eatery;

        const eateryOwner = await Eatery.findById(eatery);
        if(String(sender._id) === String(eateryOwner.user)) return res.send({error: 'You cannot rate your eatery'})

        const ratingData = {
            eatery: eatery,
            serviceScore: req.body.serviceScore,
            interiorScore: req.body.interiorScore,
            foodScore: req.body.foodScore,
            description: req.body.description,
            sender: sender._id
        };

        const rating = new Rating(ratingData);
        await rating.save();

        const eateryRatings = await Rating.find({eatery: eatery});
        const eateryServiceScores = eateryRatings.map(eatery => eatery.serviceScore);
        const eateryFoodScores = eateryRatings.map(eatery => eatery.foodScore);
        const eateryInteriorScores = eateryRatings.map(eatery => eatery.interiorScore);

        const reducer = ((accumulator, currentValue) => accumulator + currentValue);
        const service = eateryServiceScores.reduce(reducer) / eateryServiceScores.length;
        const food = eateryFoodScores.reduce(reducer) / eateryFoodScores.length;
        const interior = eateryInteriorScores.reduce(reducer) / eateryInteriorScores.length;

        const overall = (service + food + interior) / 3;

        const UpdatedEatery = await Eatery.findById(eatery);
        UpdatedEatery.rating = overall;
        UpdatedEatery.service = service;
        UpdatedEatery.food = food;
        UpdatedEatery.interior = interior;
        await UpdatedEatery.save();

        res.send(rating);
    } catch (e) {
        return res.status(500).send(e);
    }
});




module.exports = router;