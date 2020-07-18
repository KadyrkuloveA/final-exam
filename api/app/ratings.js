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

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try{
        const rate = await Rating.findById(req.params.id);
        console.log(rate.eatery);
        const delRes = await Rating.deleteOne({_id: req.params.id});

        const NewEateryRatings = await Rating.find({eatery: rate.eatery});
        const NewEateryServiceScores = NewEateryRatings.map(eatery => eatery.serviceScore);
        const NewEateryFoodScores = NewEateryRatings.map(eatery => eatery.foodScore);
        const NewEateryInteriorScores = NewEateryRatings.map(eatery => eatery.interiorScore);

        const reducer = ((accumulator, currentValue) => accumulator + currentValue);
        const service = NewEateryServiceScores.reduce(reducer) / NewEateryServiceScores.length;
        const food = NewEateryFoodScores.reduce(reducer) / NewEateryFoodScores.length;
        const interior = NewEateryInteriorScores.reduce(reducer) / NewEateryInteriorScores.length;

        const overall = (service + food + interior) / 3;

        const UpdatedEatery = await Eatery.findById(rate.eatery);
        UpdatedEatery.rating = overall;
        UpdatedEatery.service = service;
        UpdatedEatery.food = food;
        UpdatedEatery.interior = interior;
        await UpdatedEatery.save();

        if (delRes) {
            return res.send({message: 'Deleted successfully'});
        } else{
            return res.status(400).send({error: "Could't delete this rating"});
        }

    } catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;