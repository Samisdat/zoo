var slugify = require('slugify')
const axios = require('axios');
const fs = require("fs");
const path = require("path");
const {geoFromSVGXML} = require('svg2geojson');

const xmlTemplateWithMetaInfo = require('./extract-geojson-from-svg/xmlTemplateWithMetaInfo').xmlTemplateWithMetaInfo;

const slugifyOptions = {
    locale: 'de',
    lower: true
};

const getSlug = (toBeSlugged) => {

    return slugify(
        toBeSlugged,
        slugifyOptions
    );

}

const getGroupById = (svg, id) => {

    const groupRegEx = new RegExp(`<g id="${id}"(.*?)>([\\s|\\S]*?)<\\/g>`, 'gm');

    const match = groupRegEx.exec(svg);

    return match[2];

}

const getSvg = () => {

    const importSvgPath = path.resolve(
        process.env.PWD,
        'extract-geojson-from-svg/svg/combined.svg'
    );

    const importSvg = fs.readFileSync(importSvgPath, {encoding: 'utf-8'});

    return importSvg;

}

const getElementIds = (svg) => {

    const pathIds = [];

    let pathRegEx = /<(rect|path|circle) id="(.*?)"(?: serif:id="(.*?)")*/gm;

    let index = 0;

    let matches;

    while ((matches = pathRegEx.exec(svg)) !== null) {

        if (matches.index === pathRegEx.lastIndex) {
            pathRegEx.lastIndex++;
        }

        matches.forEach((match, groupIndex) => {
            if (2 === groupIndex) {
                pathIds[index] = match;
                //console.log(`Found match, group ${groupIndex}: ${match}`);
            }
            if (3 === groupIndex && undefined !== match) {
                pathIds[index] = match;
                //console.log(`Found match, group ${groupIndex}: ${match}`);
            }
        });

        index += 1;

    }

    return pathIds;

};

const types = [
    'facility-boxes',
    'facility-circles',
];

const generateGeoJsonByType = async (svg, type) => {

    const promise = new Promise((resolve, reject) => {

        const typeGroup = getGroupById(svg, type);

        const dataSvg = xmlTemplateWithMetaInfo(typeGroup);

        const pathIds = getElementIds(dataSvg);

        geoFromSVGXML(dataSvg, (geoJson) => {

            for (let i = 0, x = geoJson.features.length; i < x; i += 1) {

                const name = pathIds[i];

                geoJson.features[i].properties = {
                    name,
                    type
                };

            }

            if ('facility-circles' === type) {

                for (let i = 0, x = geoJson.features.length; i < x; i += 1) {

                    geoJson.features[i].properties.slug = getSlug(geoJson.features[i].properties.name);

                    const coordinates = geoJson.features[i].geometry.coordinates[0];

                    const latitudes = coordinates.map((coordinate) => {
                        return coordinate[1];
                    }).reduce((a, b) => {
                        return a + b
                    }, 0);

                    const longidues = coordinates.map((coordinate) => {
                        return coordinate[0];
                    }).reduce((a, b) => {
                        return a + b
                    }, 0);

                    geoJson.features[i].geometry = {
                        "type": "Point",
                        "coordinates": [
                            longidues / coordinates.length,
                            latitudes / coordinates.length
                        ]
                    }
                }

            }

            resolve(geoJson);

        });

    });

    return promise;

}

const generateGeoJsonFromSvg = async (svg) => {

    let featues = [];

    for (const type of types) {

        const typeFeatures = await generateGeoJsonByType(svg, type);

        featues = featues.concat(typeFeatures.features);

    }

    return featues;

}

const createMapElement = async (geojsonFeature) => {

    let type = geojsonFeature.properties.type;

    if('facility-circles' === type){
        type = 'point';
    }
    else if('facility-boxes' === type){
        type = 'box';
    }

    let facilitySlug = geojsonFeature.properties.name.replace(/(.+?)-/, '');
    facilitySlug = getSlug(facilitySlug);

    let facility = undefined;

    let facilityRequest = await axios.get('http://127.0.0.1:1337/facilities?slug=' + facilitySlug + '&_publicationState=preview');

    if(0 !== facilityRequest.data.length){
        facility = facilityRequest.data[0].id;
    }

    const json = {
        "title": geojsonFeature.properties.name,
        "geojson": geojsonFeature,
        "facility": facility,
        "type": type,
        "slug": getSlug(geojsonFeature.properties.name) + '-' + type,
        "published_at": new Date(),
        "created_by": "cli",
    };

    let id = undefined

    const mapElementRequest = await axios.get('http://127.0.0.1:1337/map-elements?slug=' + json.slug + '&_publicationState=preview');

    if(0 !== mapElementRequest.data.length){
        id = mapElementRequest.data[0].id;
    }

    if(undefined === id){

        axios.post('http://127.0.0.1:1337/map-elements', json)
            .then(function (response) {
                console.log('response');
            })
            .catch(function (error) {
                console.log(JSON.stringify(error.response.data, null, 4));
            });

    }
    else{

        axios.put('http://127.0.0.1:1337/map-elements/' + id, json)
            .then(function (response) {
                console.log('response');
            })
            .catch(function (error) {
                console.log(JSON.stringify(error.response.data, null, 4));
            });


    }




}


const foo = async () => {

    const svg = getSvg();

    const features = await generateGeoJsonFromSvg(svg);

    for(const feature of features){

        createMapElement(feature);
        //break;
        //console.log(JSON.stringify(feature, null, 4));

    }

}

foo();
