import { NextApiRequest, NextApiResponse } from 'next'

import path from 'path';
import fs from 'fs';

const { geoFromSVGXML } = require('svg2geojson');

export const addMetaInfo = (svg:string):string => {

    const regExMetaInfo = /<MetaInfo/m;

    if(true === regExMetaInfo.test(svg)){
        return svg;
    }

    const metaInfo = '<MetaInfo xmlns="http://www.prognoz.ru"><Geo><GeoItem X="0" Y="0" Latitude="51.24177020918754" Longitude="7.105611562728882"/><GeoItem X="2550" Y="1994" Latitude="51.236776961813064" Longitude="7.115809321403503"/></Geo></MetaInfo>';

    const regEx = /<svg(.*?)>/;

    const updatedSvg = svg.replace(regEx, "<svg$1>" + metaInfo);

    return updatedSvg;

}

export const getPathIds = (svg:string):string[] => {

    const pathIds:string[] = [];

    let pathRegEx = /<path id="(.*?)"(?: serif:id="(.*?)")*/gm;

    let index = 0;

    let matches;

    while ((matches = pathRegEx.exec(svg)) !== null) {

        if (matches.index === pathRegEx.lastIndex) {
            pathRegEx.lastIndex++;
        }

        matches.forEach((match, groupIndex) => {
            if(1 === groupIndex){
                pathIds[index] = match;
                console.log(`Found match, group ${groupIndex}: ${match}`);
            }
            if(2 === groupIndex && undefined !== match){
                pathIds[index] = match;
                console.log(`Found match, group ${groupIndex}: ${match}`);
            }
        });

        index += 1;

    }

    return pathIds;

};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const {
        query: { slug },
    } = req;

    if(undefined === slug){
        res.status(400).json({msg:'slug not defined'});
        return;
    }

    const dataDir = path.resolve(process.env.PWD + '/data');
    const dataFile = path.resolve(dataDir, slug + '/data.json');
    const svgFile = path.resolve(dataDir, slug + '/data.svg');

    if(false === fs.existsSync(dataFile)){
        res.status(400).json({msg:'slug can not be resolved'});
        return;
    }

    const dataJson = fs.readFileSync(dataFile , {encoding: 'utf8'});

    const json = JSON.parse(dataJson);
    json.slug = slug;

    let svg = fs.readFileSync(svgFile, {encoding: 'utf8'});

    svg = addMetaInfo(svg);

    const pathIds = getPathIds(svg);


    fs.writeFileSync(svgFile, svg, {encoding: 'utf8'});

    geoFromSVGXML( svg, (geoJson:any) => {

        for(let i = 0, x = geoJson.features.length; i < x; i += 1){
            geoJson.features[i].properties = {
                ...json
            };

            geoJson.features[i].properties.name = pathIds[i];

            console.log(geoJson.features[i].properties.name);

        }

        fs.writeFileSync(dataDir + '/' + slug + '/geo.json', JSON.stringify(geoJson, null, 4), {encoding: 'utf8'});

    });

    fs.writeFileSync(dataDir + '/' + slug + '/data.json', JSON.stringify(json, null, 4), {encoding: 'utf8'});

    res.status(200).json(json);

}