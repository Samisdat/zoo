import {readGpx} from "./gpx/readGpx";
import {TrackPoint} from "./gpx/TrackPoint";
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

console.log('gpx convert');

const gpx = readGpx();

const { document } = (new JSDOM(gpx)).window;

const trk = document.getElementsByTagName('trk');

if(0 === trk.length){
    throw new Error('no trk found')
}
if(1 > trk.length){
    throw new Error('more then one trk found')
}

const trkseg = trk[0].getElementsByTagName('trkseg');

if(0 === trkseg.length){
    throw new Error('no trkseg found')
}
if(1 > trkseg.length){
    throw new Error('more then one trkseg found')
}

const trackPoints = [];

const trackPointElements = trkseg[0].getElementsByTagName('trkpt');

const findAndExtractTagContent = (node:any, tagName:string):string => {

    const tag = node.getElementsByTagName(tagName);

    if(0 === tag.length){
        return '';
    }

    return tag[0].innerHTML;

}

for(let i = 0, x = trackPointElements.length; i < x; i += 1){

    const trackPointElement = trackPointElements[i];

    const lat = parseFloat(trackPointElement.getAttribute('lat'));
    const lng = parseFloat(trackPointElement.getAttribute('lon'));

    const ele = parseFloat(findAndExtractTagContent(trackPointElement, 'ele'));
    const time = findAndExtractTagContent(trackPointElement, 'time');

    const speed = findAndExtractTagContent(trackPointElement, 'mytracks:speed');
    const length = findAndExtractTagContent(trackPointElement, 'mytracks:length');

    const trackPoint:TrackPoint = {
        lat,
        lng,
        ele,
        time
    };

    if(speed){
        trackPoint.speed = parseFloat(speed);
    }

    if(length){
        trackPoint.speed = parseFloat(length);
    }

    trackPoints.push(trackPoint);

}

console.log(JSON.stringify(trackPoints, null, 4));