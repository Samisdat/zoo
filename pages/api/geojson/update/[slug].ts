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

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {

    const {
        query: { slug },
    } = req;

    if(undefined === slug){
        res.status(400).json({msg:'slug not defined'});
        return;
    }
    const dataDir = path.resolve(process.env.PWD + '/pages/api/data');

    const json = JSON.parse(fs.readFileSync(dataDir + '/' + slug + '/data.json', {encoding: 'utf8'}));
    json.slug = slug;

    let svg = fs.readFileSync(dataDir + '/' + slug + '/data.svg', {encoding: 'utf8'});

    svg = addMetaInfo(svg);

    fs.writeFileSync(dataDir + '/' + slug + '/data.svg', svg, {encoding: 'utf8'});

    geoFromSVGXML( svg, (geoJson:any) => {

        geoJson.features[0].properties = json;

        console.log(geoJson.features[0].properties, geoJson.features[0].type);

        fs.writeFileSync(dataDir + '/' + slug + '/geo.json', JSON.stringify(geoJson, null, 4), {encoding: 'utf8'});

    });

    fs.writeFileSync(dataDir + '/' + slug + '/data.json', JSON.stringify(json, null, 4), {encoding: 'utf8'});

    res.status(200).json(json);

}