import * as path from "path";
import * as fs from "fs";

export const readSvg = () => {

    console.log('read svg');

    const svgName =  'combined.svg';

    const svgPath = path.resolve(
        __dirname,
        '../',
        'extract-geojson-from-svg/svg',
        svgName
    );

    const svg = fs.readFileSync(
        svgPath,
        {encoding:'utf8'}
    );

    return svg;

}