var express = require('express');
var router = express.Router();

const Building = require('../model/building')

const Polygon = require('../model/polygon');

const POLYGON_TYPES = require('../constants').POLYGON_TYPES;

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {

    console.log(req.params)

    console.log('Time: ', Date.now());
    next();
});

router.get('/:type', (req, res, next) => {

    const type = req.params.type;

    if(false === POLYGON_TYPES.includes(type)){
        res.status(501);
        res.json({
            error: '[type='+ type + '] is invalid'
        });
        return;
    }

    next();

});

router.get('/:type', async (req, res) => {

    const type = req.params.type;


    try {

        const polygons = await Polygon.find({type:type});

        const responseJson =  polygons.map((polygon)=>{

            return {
                id: polygon._id,
                name: polygon.name,
                coordinate: polygon.location.coordinates[0].map( (coordinate) => {
                    return{
                        lng: (coordinate[0] * 1),
                        lat: (coordinate[1] * 1)

                    }
                })
            };

        })



        res.status(200);
        res.json(responseJson);

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
        await Polygon.findByIdAndDelete(id);
        res.status(200);
        res.json({"message": "polygon with [_id=" + id + '] has been deleted'});

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
