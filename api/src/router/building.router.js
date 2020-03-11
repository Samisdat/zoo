var express = require('express');
var router = express.Router();

const Building = require('../model/building')

const Polygon = require('../model/polygon');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', async (req, res) => {

    try {
       const buildings = await Polygon.find({type:'building'});;

        res.status(200);
        res.json(buildings);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.get('/gmap', async (req, res) => {

    try {

        const buildings = await Polygon.find({type:'building'});

        const buildingsJson =  buildings.map((building)=>{

            return {
                name: building.name,
                coordinate: building.location.coordinates[0].map( (coordinate) => {
                    return{
                        lng: (coordinate[0] * 1),
                        lat: (coordinate[1] * 1)

                    }
                })
            };

        })



        res.status(200);
        res.json(buildingsJson);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});


router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const building = await Building.findById(id);

        res.status(200);
        res.json(building);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
});

router.get('/near/:lng,:lat', async (req, res) => {

    const lng = req.params.lng;
    const lat = req.params.lat;

    try {

        const buildings = await Building.find({
            location: {
                $near: {
                    $maxDistance: 160 * 10 * 1000,
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat]
                    }
                }
            }
        });l

        res.status(200);
        res.json(buildings);

    } catch (err) {
        console.log(err)
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
