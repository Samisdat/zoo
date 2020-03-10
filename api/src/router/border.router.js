var express = require('express');
var router = express.Router();

const Border = require('../model/border')


router.get('/', async (req, res) => {

    try {

       const border = await Border.find();

        res.status(200);
        res.json(border[0]);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.get('/gmap', async (req, res) => {

    try {

        const border = await Border.find();

        const coordinates = border[0].location.coordinates[0].map( (coordinate) => {
            return{
                lng: (coordinate[0] * 1),
                lat: (coordinate[1] * 1)

            }
        })

        res.status(200);
        res.json(coordinates);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

module.exports = router;
