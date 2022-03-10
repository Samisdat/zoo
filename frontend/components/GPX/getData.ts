// eslint-disable-next-line @typescript-eslint/no-var-requires
const gpxTrackPoints = require('./gpx.json');
import moment from 'moment';

export interface TrackPoint {
    lat:number;
    lng: number;
    time:number;
}

const startTime = moment(gpxTrackPoints[0].time).valueOf();

export const getData = ():TrackPoint[] => {

    const trackPoints:TrackPoint[] = []

    for(let i = 0, x = gpxTrackPoints.length; i < x; i += 1){

        const lat = gpxTrackPoints[i].lat;
        const lng = gpxTrackPoints[i].lng;
        const ele = gpxTrackPoints[i].ele;
        const timeStamp = gpxTrackPoints[i].time;
        const speed = gpxTrackPoints[i].speed;
        const length = gpxTrackPoints[i].length;

        const time = moment(timeStamp).valueOf() - startTime;

        const trackPoint:TrackPoint = {
            lat,
            lng,
            time
        };

        trackPoints.push(trackPoint);

    }

    return trackPoints;

}