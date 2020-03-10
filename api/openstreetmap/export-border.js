const fs = require('fs');

const mapData = require('./map');

// id of way a.k.a fence around the zoo
const borderId = '27489924'

const wayAroundZoo = mapData.way.find((way) => {

    return (way['@_id'] === borderId);

});

const nodes = wayAroundZoo.nd.map((nodeRef) =>{

    const refId = nodeRef['@_ref'];

    const node = mapData.node.find((node) => {

        return (node['@_id'] === refId);

    });

    return [
        node['@_lon'],
        node['@_lat']
    ];
});

fs.writeFileSync(
    './export/border.json',
    JSON.stringify(
        {
            border:{
                location:{
                    type: 'Polygon',
                    coordinates:[nodes]
                }
            }
        },
        null,
        4
    )
);


