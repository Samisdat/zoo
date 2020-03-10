var express = require('express');
var router = express.Router();

const Building = require('../model/building')

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', async (req, res) => {

    try {
       const subscribers = await Building.find();

        res.status(200);
        res.json(subscribers);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const subscribers = await Building.findById(id);

        res.status(200);
        res.json(subscribers);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.post('/', async (req, res) => {

    const building = new Building(req.body);

    try {
        await building.save()

        res.status(200);
        res.json(building);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Building.findByIdAndDelete(id);
        res.status(200);
        res.json({"message": "building with [_id=" + id + '] has been deleted'});

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.put('/:id', function(req, res) {
    const id = req.params.id;

    res.status(200);
    res.json({message: 'update building with id ' + id});
});

module.exports = router;
