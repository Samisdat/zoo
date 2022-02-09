import * as path from "path";
import * as fs from "fs";

export const readGpx = () => {

    console.log('read gpx');

    const gpxName =  'gpx-sample.gpx';

    const gpxPath = path.resolve(
        __dirname,
        '../',
        'gpx-data',
        gpxName
    );

    const gpx = fs.readFileSync(
        gpxPath,
        {encoding:'utf8'}
    );

    return gpx;

}