var express = require('express');
var router = express.Router();

const Polygon = require('../model/polygon');

router.get('/', async (req, res) => {

    try {

       const border = await Polygon.find({type:'border'});

        res.status(200);
        res.json(border);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

router.get('/gmap', async (req, res) => {

    try {

        const borders = await Polygon.find({type:'border'});

        const bordersJson =  borders.map((border)=>{

            return {
                name: border.name,
                coordinate: border.location.coordinates[0].map( (coordinate) => {
                    return{
                        lng: (coordinate[0] * 1),
                        lat: (coordinate[1] * 1)

                    }
                })
            };

        })


        res.status(200);
        res.json(bordersJson);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

module.exports = router;
