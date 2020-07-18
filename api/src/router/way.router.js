var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

const Edge = require('../model/edge');
const Node = require('../model/node');

router.get('/', async (req, res) => {
    
    try {

        let edges = await Edge.find({});
        let nodes = await Node.find({});

        edges = edges.map((edge)=>{

            return {
                name: edge.name,
                steps: edge.steps,
                nodes: edge.nodes,
                osmNodeIds: edge.osmNodeIds,
                coordinate: edge.location.coordinates[0].map( (coordinate, index) => {
                    return{
                        lng: (coordinate[0] * 1),
                        lat: (coordinate[1] * 1),
                        osmId: edge.osmNodeIds[index]
                    }
                })
            };

        });

        nodes = nodes.map((node)=>{

            return {
                name: node.name,
                osmNodeId: node.osmNodeId,

                coordinate: {
                    lng: (node.location.coordinates[0] * 1),
                    lat: (node.location.coordinates[1] * 1),
                    osmId: node.osmNodeId
                }

            };

        });

        res.status(200);
        res.json({
            edges,
            nodes,
        });

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

});

const distanceBetweenPoints = (lat1, lon1, lat2, lon2) => {
    var R = 6371; // Radius of the earth in km
    var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a =
        0.5 - Math.cos(dLat)/2 +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        (1 - Math.cos(dLon))/2;

    return R * 2 * Math.asin(Math.sqrt(a)) * 1000;
}

const getLengthOfEdge = (coordinates) => {

    let length = 0;

    for(var i = 0, x = coordinates.length - 1; i < x; i += 1){

        const pointOne = coordinates[i];
        const pointTwo = coordinates[i + 1];

        const between = distanceBetweenPoints(pointOne[1], pointOne[0], pointTwo[1], pointTwo[0]);

        length += between;

    }

    return length;

};

router.get('/edge/', async (req, res) => {

    let edges = await Edge.find({});

    /*
    for(const edge of edges){

        const length = getLengthOfEdge(edge.location.coordinates[0]);

        edge.length = length;

        await edge.save();

    }
     */

    res.status(200);
    res.json({
        edges
    });

});

router.get('/edge/:id', async (req, res) => {

    const id = req.params.id;

    let edge = await Edge.findById(id);

    const length = getLengthOfEdge(edge.location.coordinates[0]);

    res.status(200);
    res.json({
        edge,
        length:length
    });

});

const getNextNode = async (startNodeId) => {

    let edges = await Edge.find(
        { nodes: parseInt(startNodeId, 10)}
    );

    const nextNodes = [];

    for(let i = 0, x = edges.length; i < x; i += 1){

        if(startNodeId !== edges[i].nodes[0]){
            nextNodes.push(edges[i].nodes[0])
        }
        else if(startNodeId !== edges[i].nodes[1]){
            nextNodes.push(edges[i].nodes[1])
        }

    }

    return nextNodes;

}

const getWays = async (routes, endNode) => {

    const nextRoutes = [];

    for(const route of routes){

        if(parseInt(endNode.osmNodeId, 10) === route[(route.length - 1)]){

            console.log('yeah')
            continue;
        }

        const nextNodes = await getNextNode(route[(route.length - 1)]);

        for(const nextNode of nextNodes){

            // wenn schon drin, dann sackgasse
            if(false === route.includes(nextNode)){

                const nextRoute = route.map((nodeId)=>{
                    return nodeId;
                });

                nextRoute.push(nextNode)
                nextRoutes.push(nextRoute);
            }
            else{
                console.log('sackgasse', route, nextNode);
            }

        }

        return nextRoutes;

    }




};

router.get('/shortest/:start/:end', async (req, res) => {

    const start = req.params.start;
    const end = req.params.end;


    const startNode = await Node.findById(start);
    const endNode = await Node.findById(end);

    const initialRoutes = [
        [parseInt(startNode.osmNodeId, 10)]
    ];


    const nextRoutes = await getWays(initialRoutes, endNode);

    const nextNextRoutes = [];

    for(let i = 0, x = nextRoutes.length; i < x; i += 1){

        console.log('nextRoutes[i]', nextRoutes[i])

        const foo = await getWays([nextRoutes[i]], endNode);

        nextNextRoutes.push(foo);

    }

    const nextNextNextRoutes = [];

    for(let i = 0, x = nextNextRoutes.length; i < x; i += 1) {

        for(const nextNextRoute of nextNextRoutes[i]){

            const foo = await getWays([nextNextRoute], endNode);

            nextNextNextRoutes.push(foo);


        }

    }

    console.log(nextNextNextRoutes);

    /*
    const id = req.params.id;

    let edge = await Edge.findById(id);

    const length = getLengthOfEdge(edge.location.coordinates[0]);
    */

    res.status(200);
    res.json({
        startNode,
        endNode,
        nextRoutes
    });

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

const getNode = async (osmId, name)=>{

    // check if already with way id
    let node = await Node.findOne({
        osmNodeId: osmId
    });

    if(null === node){
        node = new Node();
        node.osmNodeId = osmId;

        const openStreetMapApiNode = `https://www.openstreetmap.org/api/0.6/node/${osmId}.json`;

        const response = await fetch(openStreetMapApiNode);

        const json = await response.json();

        node.location = {
            type: 'Point',
            coordinates: [
                json.elements[0].lon,
                json.elements[0].lat
            ]
        };
    }

    if(undefined !== name && '' !== name){

        if(undefined === node.name || node.osmNodeId === node.name){
            node.name = name;
        }
    }
    else{
        node.name = osmId;
    }

    return node;

};

const getEdge = async (points, steps) => {

    // is there already an edge that start/ends with the very same nodes

    let edge = await Edge.findOne({
        '$or':[
            {
                'nodes': [points[0], points[(points.length - 1)]]
            },
            {
                'nodes': [points[(points.length - 1)], points[0]],
            }
            ]
    });

    if(null === edge){
        edge = new Edge();

        edge.osmNodeIds = points;

        edge.nodes = [
            points[0],
            points[(points.length - 1)],
        ];

        const coordinates = [];

        for(let i = 0, x = points.length; i < x; i +=1){

            const openStreetMapApiNode = `https://www.openstreetmap.org/api/0.6/node/${points[i]}.json`;

            const response = await fetch(openStreetMapApiNode);

            const json = await response.json();

            coordinates.push(
                [
                    json.elements[0].lon,
                    json.elements[0].lat
                ]
            );

        }

        edge.location.type = 'LineString';
        edge.location.coordinates =  [coordinates]

    }

    edge.steps = steps;

    return edge;


}

router.get('/save', async (req, res)=>{

    req.body = {"nameStart":"Eingang","nameEnd":"","steps":false,"points":["507350957","76146790"],"lat":"51.24083029088075","lng":"7.1092499792575845","zoom":"19","submitted":true};

    const { nameStart, nameEnd, steps, points} = req.body;

    const startNode = await getNode(points[0], nameStart);
    await startNode.save()

    const endNode = await getNode(points[(points.length - 1)], nameEnd);
    await endNode.save()

    const edge = await getEdge(points, steps);
    await edge.save()

    res.status(200);

    res.json({
        startNode,
        endNode,
        edge
    });

});

router.post('/save', async (req, res) => {

    const { nameStart, nameEnd, steps, points} = req.body;

    const startNode = await getNode(points[0], nameStart);
    await startNode.save()

    const endNode = await getNode(points[(points.length - 1)], nameEnd);
    await endNode.save()

    const edge = await getEdge(points, steps);
    await edge.save()

    res.status(200);

    res.json({
        startNode,
        endNode,
        edge
    });

});


module.exports = router;
