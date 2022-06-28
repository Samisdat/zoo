import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';
import {MapTransformInterface, PositionInterface, useMap} from '../../Context/MapContext';
import {edgeIdPrefix, svg} from '../../../../constants';
import {getPosition} from '../../DevArtifacts/CartesianPoint';
import {Warehouse} from "../../../../data/warehouse/warehouse";

export interface Coordinate{
    x:number;
    y:number;
}

interface EdgeSample{
    edgeId:number;
    sampleAtLength:number;
    samplePos:Coordinate;
    length:number;
}

const filterDistances = (distances:EdgeSample[]):EdgeSample[] => {

    const sum = distances.reduce((accumulator:any, currentValue, currentIndex, array) => {
        return accumulator + currentValue.length;
    }, 0);

    const average = sum/ distances.length;

    const variance1 = distances.reduce((accumulator, currentValue, currentIndex, array) => {
        accumulator += Math.pow(currentValue.length - average, 2);
        return accumulator;
    }, 0);

    const variance = Math.sqrt(variance1 / (distances.length - 1));

    const firstThree = distances.slice(0, 3);

    const sumFirstThree = firstThree.reduce((accumulator:any, currentValue, currentIndex, array) => {
        return accumulator + currentValue.length;
    }, 0);

    const averageFirstThree = sumFirstThree/ firstThree.length;

    distances = distances.filter((distance)=>{
        return (distance.length - averageFirstThree < variance);
    });

    return (distances);

}


export const rotateCords = (coordinate: Coordinate, degree:number):Coordinate => {

    if(180 !== degree){
        throw new Error('only 180 is implemented');
    }

    const center:Coordinate = {
        x: svg.width / 2,
        y: svg.height / 2
    }

    const rotated:Coordinate = {
        x: undefined,
        y: undefined
    };

    if(coordinate.x === center.x){
        rotated.x = center.x;
    }
    else if(coordinate.x > center.x){
        const x = coordinate.x - center.x;
        rotated.x = center.x - x;
    }
    else {
        const x = center.x - coordinate.x;
        rotated.x = center.x + x;
    }

    if(coordinate.y === center.y){
        rotated.y = center.y;
    }
    else if(coordinate.y > center.y){
        const y = coordinate.y - center.y;
        rotated.y = center.y - y;
    }
    else {
        const y = center.y - coordinate.y;
        rotated.y = center.y + y;
    }

    return rotated;

}

export const transposeCoords = (coordinate:Coordinate, transform:MapTransformInterface):Coordinate => {

    // console.log('transposeCoords')
    // console.log('')
    // console.log('coordinate', coordinate);
    // console.log('transform', transform);

    const x = (coordinate.x - transform.x) / transform.k;
    const y = (coordinate.y - transform.y) / transform.k;

    // console.log('x', x);
    // console.log('y', y);


    const rotated = rotateCords({x,y},180);

    // console.log('rotated', rotated);

    // console.log('/transposeCoords');

    return rotated;

}

const getDistance = (source:Coordinate, target:Coordinate):number => {

    // console.log('getDistance')
    // console.log('')
    // console.log('source', source);
    // console.log('target', target);

    const x = source.x - target.x;
    const y = source.y - target.y;

    return Math.sqrt(
        x * x + y * y
    );

};


const firstSample =  (pathNode, point:Coordinate, samplingRate= 20):EdgeSample[] => {

    const path = pathNode as SVGPathElement;

    const id = parseInt(path.getAttribute('id').replace(edgeIdPrefix, ''), 10);

    const length = path.getTotalLength();

    const pointsOnPath = [];

    const samples: EdgeSample[] = []

    for(let i = 0; i < length; i += samplingRate){

        const pointOnPath = path.getPointAtLength(i);

        const edgeSample: EdgeSample = {
            edgeId:id,
            sampleAtLength: i,
            samplePos:pointOnPath,
            length:getDistance(pointOnPath, point)
        };

        samples.push(edgeSample);

        pointsOnPath.push(pointOnPath);

    }

    return samples;

}

const sampleMatches = (samples:EdgeSample[], transposedCoord):EdgeSample[] => {

    const matches:EdgeSample[] = [];

    samples = samples.reduce((accumulator:any, currentValue)=>{

        const edgeAlreadyWithin = accumulator.find((elem)=>{
            return (currentValue.edgeId === elem?.edgeId);
        });

        if(!edgeAlreadyWithin){
            accumulator.push(currentValue);
        }

        return accumulator;

    }, [])

    for(let i = 0, x = samples.length; i < x; i += 1){

        let distances:EdgeSample[] = []

        const sample = samples[i];

        const edge = d3.select(`#${edgeIdPrefix}${sample.edgeId}`).node();

        distances = distances.concat(
            firstSample(
                edge,
                transposedCoord,
                5
            )
        );

        distances.sort((a:EdgeSample, b:EdgeSample) => {
            if (a.length < b.length){
                return -1;
            }
            if (a.length > b.length) {
                return 1;
            }

            return 0;

        });

        matches.push(distances[0]);

    }

    return matches;

}

const checkIsWithin = (path, coordinate:Coordinate):boolean => {

    const svg = document.getElementsByTagName('svg')[0];

    const point = svg.createSVGPoint();
    point.x = coordinate.x;
    point.y = coordinate.y;

    const isPointInFill = path.isPointInFill(point);

    if(true === isPointInFill){
        return true;
    }

    // if point is not within fill, I use the stroke as buffer
    const isPointInStroke = path.isPointInStroke(point);

    return isPointInStroke;

}

/**
 * For obvious reasons not all areas of the zoo can be entered.
 * combined.svg contains edges in the middle of all ways
 *
 * So if I get a new (potentially inaccurate) GeoPosition,
 * I can use it to determine where the visitor might be:
 *
 * 0) Check if the current position is within the zoo
 * 1) Transform an gps position into cartesian coordinates in the SVG reference system
 * 2) Sample all edges to find closest  points on every edge
 * 3) Take 40 closest points, calculate their variance
 *    and throw away any points that are farther away then variance from current position then the closest points
 * 4) I end up with some (in best case only one) edges and a position on theses edges
 * 5) If more then one edge is resolved, I assume that the very closest point is the right one, but I store the least closest point as fuzziness
 *
 */

interface ResolvePositionProps {
    cartesianTransform:MapTransformInterface
}

export const ResolvePosition = ({cartesianTransform}:ResolvePositionProps) => {

    const {
        state: {position_raw, projection, transform, ref},
        dispatch
    } = useMap();

    /*return (
        <React.Fragment/>
    );*/

    const refMatch = useRef(null);

    const entrance = Warehouse.get().getMarker(35);

    useEffect(() => {

        /**
         * projection is needed to resolve a coordinates on svg
         */
        if(!projection){
            return;
        }

        /**
         * cartesianTransform is needed to transform coordinates from svg into the scaled, panned and rotated cartesian g-element
         */
        if(!cartesianTransform){
            return;
        }

        if(!position_raw){
            return;
        }

        const currentPos = projection([position_raw.lng, position_raw.lat]);

        const transposedCoord = transposeCoords(
            {
                x:currentPos[0],
                y:currentPos[1]
            },
            cartesianTransform
        );

        const isWithin = checkIsWithin(

            d3.select('#Außengrenze').node(),
            transposedCoord
        );

        if(false === isWithin){

            const isGPS = false;
            const text = 'außerhalb';

            const cartesian = d3.select(ref.current).node() as SVGGraphicsElement;

            const localPos = getPosition(cartesian, entrance);


            const entranceGps = projection.invert(
                [
                    localPos.y,
                    localPos.x
                ]
            );

            const position:PositionInterface = {
                lat: entranceGps[1],
                lng: entranceGps[0],
                isWithin,
                isGPS,
                text,
                edgeId: 479,
                x: entrance.x,
                y: entrance.y,
                raw: position_raw
            };

            dispatch({
                type: 'SET_POSITION',
                position
            });

            return;

        }

        const edges = d3.selectAll('.edge').nodes();

        let distances:EdgeSample[] = []

        for(let i = 0, x = edges.length; i < x; i += 1){

            distances = distances.concat(
                firstSample(
                    edges[i],
                    transposedCoord
                )
            );

        }

        for(let i = 0, x = edges.length; i < x; i += 1){

            distances = distances.concat(
                firstSample(
                    edges[i],
                    transposedCoord
                )
            );

        }

        distances.sort((a:EdgeSample, b:EdgeSample) => {
            if (a.length < b.length){
                return -1;
            }
            if (a.length > b.length) {
                return 1;
            }

            return 0;

        });

        distances = distances.slice(0, 40);

        distances = filterDistances(distances);

        const matches = sampleMatches(distances, transposedCoord);

        const matchGroup = d3.select(refMatch.current);

        // @TODO if i could resolve matches positions without rendering, this whole component could live without an dependency to d3 or manipulating svg
        const circles = matchGroup.selectAll('circle')
            .data(matches)
            .join('circle')
            .attr('cx', function(d) {
                return d.samplePos.x;
            })
            .attr('cy', function(d) {
                return d.samplePos.y;
            })
            .attr('fill', (d, i)=>{

                return 'yellow';

            })
            .attr('r', 1)
            .attr('opacity', 0)
        ;

        const bbox = (circles.nodes()[0] as any).getBoundingClientRect();
        
        const clickX = bbox.x - bbox.width / 2;
        const clickY = bbox.y - bbox.height / 2;

        const x = (clickX - transform.x) / transform.k;
        const y = (clickY - transform.y) / transform.k

        const [lng, lat] = projection.invert([x, y]);

        const isGPS = true;
        const text = 'refactor interface';

        const position:PositionInterface = {
            lat: lat,
            lng: lng,
            isWithin,
            isGPS,
            text,
            edgeId: matches[0].edgeId,
            x: matches[0].samplePos.x,
            y: matches[0].samplePos.y,
            raw: position_raw
        };

        if(1 < matches.length){

            const farthest = matches.pop();

            position.fuzziness = getDistance(
                farthest.samplePos,
                matches[0].samplePos
            );

        }

        dispatch({
            type: 'SET_POSITION',
            position
        });


    },[position_raw, projection, cartesianTransform]);

    return (
        <g ref={refMatch} />
    );

}
