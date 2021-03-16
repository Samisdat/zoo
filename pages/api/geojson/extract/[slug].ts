import {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import path from "path";
import {xmlTemplate} from "../../../../data/xml-template";
import {getSlug} from "../../../../helper/getSlug";

const { geoFromSVGXML } = require('svg2geojson');

const allowedSlugs = [
    'bounding-box',
    'facility-boxes',
    'facility-circles',
    'ways',
    'border'
]

export const getRectIds = (svg:string):string[] => {

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

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {

    let {
        query: {slug},
    } = req;

    if('string' !== typeof slug){
        res.status(400).json({
            error: `slug is not a string and therefore not supported`
        });

    }

    slug = slug as string;

    res.status(200).json({slug});


}