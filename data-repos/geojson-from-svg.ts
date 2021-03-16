import path from "path";
import fs from "fs";
import {getDataDir, getRootDataDir} from "./data-helper";
import {getSupportedTypes} from "./geojson";
import {xmlTemplate} from "./xml-template";

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

    return xmlTemplate(matchType[2]);

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


export const geojsonFromSvg = (type:string)=>{

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

    writeXmlContainingType(combinedSvg, type);
    
}
