const fs = require('fs');

const mapData = require('./map');

// id of way a.k.a fence around the zoo
const buildings = [
    {
        'name': 'Elefantenhaus',
        'id': '48064164',
        'type':'building'
    },
    {
        'name': 'Affenhaus',
        'id': '48064165',
        'type':'building'
    },
    {
        'name': 'Menschenaffenhaus',
        'id': '48064166',
        'type':'building'
    },
    {
        'name': 'Vogel-Freiflughaus',
        'id': '48064167',
        'type':'building'
    },
    {
        'name': 'Südamerika-Haus',
        'id': '38345850',
        'type':'building'
    },
    {
        'name': 'Königspinguine',
        'id': '38345855',
        'type':'building'
    },
    {
        'name': 'Aquarium',
        'id': '38345863',
        'type':'building'
    },
    {
        'name': 'Vogelhaus',
        'id': '48064157',
        'type':'building'
    },
    {
        'name': 'Großkatzenhaus',
        'id': '48064161',
        'type':'building'
    },
    {
        'name': 'Löwenhaus',
        'id': '48064162',
        'type':'building'
    },
    {
        'name': 'Katzenhaus',
        'id': '54512267',
        'type':'building'
    },
    {
        'name': 'Aralandia',
        'id': '518591392',
        'type':'building'
    },
    {
        'name': 'Brillenpinguine',
        'id': '27490779',
        'type':'enclosure'
    },
    {
        'name': 'Löwen',
        'id': '27490817',
        'type':'enclosure'
    },
    {
        'name': 'Tiger',
        'id': '37664756',
        'type':'enclosure'
    },
    {
        'name': 'Okapis',
        'id': '38345849',
        'type':'enclosure'
    },
    {
        'name': 'Seelöwen',
        'id': '38345854',
        'type':'enclosure'
    },
    {
        'name': 'Seelöwen',
        'id': '38348327',
        'type':'enclosure'
    },
    {
        'name': 'Streichelzoo',
        'id': '38348328',
        'type':'enclosure'
    },
    {
        'name': 'Harpyien',
        'id': '54512253',
        'type':'enclosure'
    },
    {
        'name': 'Mönchsgeier',
        'id': '54512255',
        'type':'enclosure'
    },
    {
        'name': 'Kirk-Dikdik',
        'id': '54512256',
        'type':'enclosure'
    },
    {
        'name': 'Zwergotterö',
        'id': '54512257',
        'type':'enclosure'
    },
    {
        'name': 'Biber',
        'id': '54512259',
        'type':'enclosure'
    },
    {
        'name': 'Pinselohrschweine',
        'id': '54512262',
        'type':'enclosure'
    },
    {
        'name': 'Bongos',
        'id': '54512263',
        'type':'enclosure'
    },
    {
        'name': 'Zwergpinguine',
        'id': '54512265',
        'type':'enclosure'
    },
    {
        'name': 'Roter Panda',
        'id': '54512268',
        'type':'enclosure'
    },
    {
        'name': 'Schneeeulen',
        'id': '54512270',
        'type':'enclosure'
    },
    {
        'name': 'Tierwelt Patagoniens',
        'id': '54512275',
        'type':'enclosure'
    },
    {
        'name': 'Esel, Ziegen, Zebras',
        'id': '54512281',
        'type':'enclosure'
    },
    {
        'name': 'Erdmännchen',
        'id': '54512284',
        'type':'enclosure'
    },
    {
        'name': 'Rentiere',
        'id': '54512291',
        'type':'enclosure'
    },
    {
        'name': 'Kiang',
        'id': '54512292',
        'type':'enclosure'
    },
    {
        'name': 'Hirscheber',
        'id': '54513035',
        'type':'enclosure'
    },
    {
        'name': 'Gelbrückenducker',
        'id': '54513036',
        'type':'enclosure'
    },
    {
        'name': 'Alte Zoodirektion',
        'id': '76141905',
        'type':'building'
    },
    {
        'name': 'Rothunde',
        'id': '76145569',
        'type':'enclosure'
    },
    {
        'name': 'Schneeeulen',
        'id': '76145571',
        'type':'enclosure'
    },
    {
        'name': 'Gibbonhaus',
        'id': '76146782',
        'type':'building'
    },
    {
        'name': 'Braunbären',
        'id': '76146837',
        'type':'enclosure'
    },
    {
        'name': 'Orang-Utans',
        'id': '76147273',
        'type':'enclosure'
    },
    {
        'name': 'Pekari',
        'id': '76156941',
        'type':'enclosure'
    },
    {
        'name': 'Emu',
        'id': '76156947',
        'type':'enclosure'
    },
    {
        'name': 'Zoo-Haupteingang',
        'id': '326198712',
        'type':'building'
    },
    {
        'name': 'Elefanten-Freigelände',
        'id': '426405330',
        'type':'enclosure'
    },
    {
        'name': 'Wasserspielplatz',
        'id': '512588085',
        'type':'playground'
    },
    {
        'name': 'Milus',
        'id': '518591391',
        'type':'enclosure'
    },
    {
        'name': 'Hausmeerschweinchen',
        'id': '624275966',
        'type':'enclosure'
    },
    {
        'name': 'Schneeleoparden',
        'id': '624275967',
        'type':'enclosure'
    },
    {
        'name': 'Mittelamerikanischer Tapir',
        'id': '693962770',
        'type':'enclosure'
    },
    {
        'name': '',
        'id': '',
        'type':''
    },
    {
        'name': '',
        'id': '',
        'type':''
    },
    {
        'name': '',
        'id': '',
        'type':''
    },
    {
        'name': '',
        'id': '',
        'type':''
    },
    {
        'name': '',
        'id': '',
        'type':''
    },
    {
        'name': '',
        'id': '',
        'type':''
    },
    {
        'name': '',
        'id': '',
        'type':''
    },
];

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


