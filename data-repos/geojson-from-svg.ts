import path from "path";
import fs from "fs";
import {getRootDataDir} from "./data-helper";

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

export const geojsonFromSvg = (slug:string)=>{
    console.log('geojson-from-svg');
}
