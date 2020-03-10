var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});
router.get('/', function(req, res) {

    res.status(200);
    res.json({message: 'show all buildings'});
});

router.get('/:id', function(req, res) {
    const id = req.params.id;

    res.status(200);
    res.json({message: 'show building with id ' + id});
});

router.post('/', function(req, res) {
    res.status(200);
    res.json({message: 'create a building'});
});

router.delete('/:id', function(req, res) {
    const id = req.params.id;

    res.status(200);
    res.json({message: 'delete building with id ' + id});
});

router.put('/:id', function(req, res) {
    const id = req.params.id;

    res.status(200);
    res.json({message: 'update building with id ' + id});
});

module.exports = router;
