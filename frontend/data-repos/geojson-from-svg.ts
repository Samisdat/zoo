import path from "path";
import fs from "fs";
const { geoFromSVGXML } = require('svg2geojson');

import {getDataDir, getRootDataDir} from "./data-helper";
import {getSupportedTypes} from "./geojson";
import {xmlTemplate} from "./xml-template";
import {getSlug} from "../helper/getSlug";
import {TeaserStateInterface} from "../components/Map/Teaser";

export const getSvgPath = () => {

    return path.resolve(
        getRootDataDir(),
        'svg',
        'combined.svg'
    );

}

export const getSvg = () => {

    const combinedSvg = fs.readFileSync(
        getSvgPath(),
        {encoding:'utf8'}
    );
    return combinedSvg;

}

export const ensureGroupPresent = (svg:string, type:string) => {

    const groupRegEx = new RegExp(`<g id="${type}"(.*?)>(.*?)<\/g>`, 'm');

    return groupRegEx.test(svg);

}

export const matchGroup = (svg:string, type:string) => {

    const groupRegEx = new RegExp(`<g id="${type}"(.*?)>(.*?)<\/g>`, 'm');

    return groupRegEx.exec(svg);

}

export const generateXmlContainingType = (svg:string, type:string) => {

    const matchType = matchGroup(svg, type);

    return xmlTemplate(matchType[2] || '');

}

export const writeXmlContainingType = (svg:string, type:string) => {

    const xml = generateXmlContainingType(svg, type);

    fs.writeFileSync(
        path.resolve(
            getDataDir('geojson', type),
            'data.svg'
        ),
        xml,
        {encoding: 'utf8'}
    );

    return xml;

}


export const geojsonFromSvg = (type:string):string=>{

    if(false === getSupportedTypes().includes(type)){
        throw new Error(`For now only types [${getSupportedTypes().join(', ')}] are supported`);
    }

    const combinedSvgPath = getSvgPath();
    const combinedSvg = getSvg();

    if(false === ensureGroupPresent(combinedSvg, type)){
        throw new Error( `No group id="${type} could be found in ${combinedSvgPath}`);
    }

    // create directory if not exits
    const dirForType = getDataDir('geojson', type);

    if (false === fs.existsSync(dirForType)){
        fs.mkdirSync(dirForType);
    }

    return writeXmlContainingType(combinedSvg, type);

}

export const getElementIds = (svg:string):string[] => {

    const pathIds:string[] = [];

    let pathRegEx = /<(rect|path|circle) id="(.*?)"(?: serif:id="(.*?)")*/gm;

    let index = 0;

    let matches;

    while ((matches = pathRegEx.exec(svg)) !== null) {

        if (matches.index === pathRegEx.lastIndex) {
            pathRegEx.lastIndex++;
        }

        matches.forEach((match, groupIndex) => {
            if(2 === groupIndex){
                pathIds[index] = match;
                console.log(`Found match, group ${groupIndex}: ${match}`);
            }
            if(3 === groupIndex && undefined !== match){
                pathIds[index] = match;
                console.log(`Found match, group ${groupIndex}: ${match}`);
            }
        });

        index += 1;

    }

    return pathIds;

};

export const getGeojsonFromSvg = (dataSvg:string, type:string):Promise<any> => {

    const promise = new Promise<any>((resolve, reject) => {

        const pathIds = getElementIds(dataSvg);

        geoFromSVGXML( dataSvg, (geoJson:any) => {

            for(let i = 0, x = geoJson.features.length; i < x; i += 1){

                const name = pathIds[i];

                geoJson.features[i].properties = {
                    name,
                    type
                };

            }

            if('facility-circles' === type){

                for(let i = 0, x = geoJson.features.length; i < x; i += 1) {

                    geoJson.features[i].properties.slug = getSlug(geoJson.features[i].properties.name);

                    const coordinates = geoJson.features[i].geometry.coordinates[0];

                    const latitudes = coordinates.map((coordinate)=>{
                        return coordinate[1];
                    }).reduce((a, b) => {return a + b }, 0);

                    const longidues = coordinates.map((coordinate)=>{
                        return coordinate[0];
                    }).reduce((a, b) => {return a + b }, 0);

                    geoJson.features[i].geometry = {
                        "type": "Point",
                        "coordinates": [
                            longidues/coordinates.length,
                            latitudes/coordinates.length
                        ]
                    }
                }

            }

            resolve(geoJson)

        });

    });

    return promise

}

export const writeGeojsonContainingType = (geojson:any,type:string):void => {

    fs.writeFileSync(
        path.resolve(
            getDataDir('geojson', type),
            'geo.json'
        ),
        JSON.stringify(geojson, null, 4),
        {encoding: 'utf8'}
    );

}
