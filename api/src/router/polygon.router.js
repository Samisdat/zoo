var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

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

        let polygons = await Polygon.find({type:type});

        polygons = polygons.sort((a, b) => {

            var nameA = a.name.toUpperCase();
            var nameB = b.name.toUpperCase();

            return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
            
        });

        const responseJson =  polygons.map((polygon)=>{

            return {
                id: polygon._id,
                name: polygon.name,
                slug: polygon.slug,
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

router.put('/:id', async(req, res) =>{
    const id = req.params.id;

    try {
        const polygon = await Polygon.findById(id);
        const update = req.body;
        polygon.name = update.name;
        await polygon.save();
        res.status(200);
        res.json(update);
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.post('/:type/import-osm', async (req, res) => {

    const { osmId, zooId, type } = req.body;
    let { name } = req.body;

    // check if already with way id
    let polygon = await Polygon.findOne({
        osmId: osmId
    });

    if(null === polygon){
        polygon = new Polygon();
    }

    // update from osm

    const openStreetMapApiWay = `https://www.openstreetmap.org/api/0.6/way/${osmId}.json`;

    const response = await fetch(openStreetMapApiWay);

    const json = await response.json();

    // es scheint möglich, dass ein way wiederum mehrerer ways in sich hat. fürs erste ignoriere ich das weg
    const way = json.elements[0];

    if(!name && undefined !== way.tags && undefined !== way.tags.name){
        name = way.tags.name;
    }

    const osmNodeIds = way.nodes;
    const coordinates = [];

    for(let i = 0, x = osmNodeIds.length; i < x; i +=1){

        const openStreetMapApiNode = `https://www.openstreetmap.org/api/0.6/node/${osmNodeIds[i]}.json`;

        const response = await fetch(openStreetMapApiNode);

        const json = await response.json();

        coordinates.push(
            [
                json.elements[0].lon,
                json.elements[0].lat
            ]
        );

    }

    polygon.location.coordinates =  [coordinates]

    polygon.name = name;
    polygon.type = type;
    polygon.zooId = zooId;

    res.status(200);

    await polygon.save()
    res.json(polygon);

});


module.exports = router;
