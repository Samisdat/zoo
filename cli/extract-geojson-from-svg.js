var slugify = require('slugify')

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
                console.log(`Found match, group ${groupIndex}: ${match}`);
            }
            if (3 === groupIndex && undefined !== match) {
                pathIds[index] = match;
                console.log(`Found match, group ${groupIndex}: ${match}`);
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

const generateGeoJsonFromSvg = async (svg) => {

    const promise = new Promise((resolve, reject) => {


        for (const type of types) {

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

        }

    });

    return promise;
}

const foo = async () => {

    const svg = getSvg();

    const geojson = await generateGeoJsonFromSvg(svg);

    console.log(geojson);
}

foo();

