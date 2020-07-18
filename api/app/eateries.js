const express = require('express');
const ValidationError = require('mongoose').Error.ValidationError;

const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const upload = require('../multer').uploads;

const Eatery = require('../models/Eatery');
const Rating = require('../models/Rating');

const router = express.Router();

router.get('/', async (req, res) => {
    let dbQuery = {};

    if (req.query.user) {
        dbQuery.user = req.query.user;
    }

    const items = await Eatery.find(dbQuery).populate('user', `username`);
    res.send(items);
});

router.get('/:id', async (req, res) => {
    try {
        const item = await Eatery.findById(req.params.id).populate('user', `username`, `firstName`);

        if (!item) {
            return res.status(404).send({message: 'Not found'});
        }

        res.send(item);
    } catch (e) {
        res.status(404).send({message: 'Not found'});
    }
});

router.post('/', [auth, upload.single('image')], async (req, res) => {
    try {
        const eateryData = {
            user: req.user,
            title: req.body.title,
            description: req.body.description
        };

        if (req.file) {
            eateryData.image = req.file.filename;
        }

        const eatery = new Eatery(eateryData);

        await eatery.save();

        return res.send({id: eatery._id});
    } catch (e) {
        if (e instanceof ValidationError) {
            return res.status(400).send(e);
        } else {
            return res.sendStatus(500);
        }
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try{
        const delRes = await Eatery.deleteOne({_id: req.params.id});

        const delRatings = await Rating.deleteMany({eatery: req.params.id});

        if (delRes && delRatings) {
            return res.send({message: 'Deleted successfully'});
        } else{
            return res.status(400).send({error: "Could't delete this eatery/ratings"});
        }


    } catch(e){
        res.status(400).send(e);
    }
});

module.exports = router;

