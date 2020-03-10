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

module.exports = router;
