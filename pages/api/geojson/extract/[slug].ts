import {NextApiRequest, NextApiResponse} from "next";
import fs from "fs";
import path from "path";
import {xmlTemplate} from "../../data/xml-template";

import {getSlug} from "../../../../helper/getSlug";

const { geoFromSVGXML } = require('svg2geojson');

export const getRectIds = (svg:string):string[] => {

    const pathIds:string[] = [];

    let pathRegEx = /<rect id="(.*?)"(?: serif:id="(.*?)")*/gm;

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
        query: {slug},
    } = req;



    const dataDir = path.resolve(process.env.PWD, 'pages/api/data');
    const combinedSvgPath = path.resolve(dataDir, 'combined.svg');
    const combinedSvg = fs.readFileSync(combinedSvgPath, {encoding:'utf8'});

    const groupRegEx = new RegExp(`<g id="${slug}"(.*?)>(.*?)<\/g>`, 'm')

    // @TODO debug
    // if slug !==
    if('zoomboxes' !== slug){
        res.status(400).json({
            error: `For now only slug zoomboxes is supported`
        });
    }


    // look into combined.svg
    // if no group with id=slug -> error
    if(false === groupRegEx.test(combinedSvg)){
        res.status(400).json({
            error: `No group id="${slug} could be found in ${combinedSvgPath}"`
        });
    }

    // create directory if not exits
    const dirForRequestSlug = path.resolve(dataDir, (slug as string));

    if (false === fs.existsSync(dirForRequestSlug)){
        fs.mkdirSync(dirForRequestSlug);
    }

    // create new svg only with group with id=slug
    const find =  groupRegEx.exec(combinedSvg);

    // add metainfo
    const dataSvg = xmlTemplate(find[2]);

    // write svg

    fs.writeFileSync(
        path.resolve(dirForRequestSlug, 'data.svg'),
        dataSvg,
        {encoding: 'utf8'}
    );

    const pathIds = getRectIds(dataSvg);

    geoFromSVGXML( dataSvg, (geoJson:any) => {


        for(let i = 0, x = geoJson.features.length; i < x; i += 1){

            const name =  pathIds[i];

            const slug = getSlug(name);

            geoJson.features[i].properties = {
                name,
                slug
            };

            console.log(geoJson.features[i].properties);

        }

        fs.writeFileSync(
            path.resolve(dirForRequestSlug, 'geo.json'),
            JSON.stringify(geoJson, null, 4),
            {encoding: 'utf8'}
        );

        res.status(200).json(geoJson);


    });


}