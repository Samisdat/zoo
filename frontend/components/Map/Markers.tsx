import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";
import {getImagePath} from "../../helper/getImagePath";

export interface PointOfInterestProperties{
    mapElements:MapElement[];
    zoom:number;
};

interface PointInterface{
    id:number;
    x:number;
    y:number;
    overlap:number[];
}

interface ClusterInterface{
    ids:number[],
    contains:MapElement[];
}

const getImage = (mapElement:MapElement) => {

    const  facilitiy = mapElement.facility;

    if(!facilitiy){
        return undefined;
    }

    let image:string = undefined;

    if(0 !== facilitiy.photos.length && undefined !== facilitiy.photos[0] && facilitiy.photos[0].thumbnail){
        image = getImagePath(facilitiy.photos[0].thumbnail.src);
    }

    if(undefined === image){

        const animalWithImage = facilitiy.animals.find((animal)=>{
            return (0 < animal.photos.length);
        });

        if(undefined !== animalWithImage){

            if(0 !== animalWithImage.photos.length && undefined !== animalWithImage.photos[0] && animalWithImage.photos[0].thumbnail){
                image = getImagePath(animalWithImage.photos[0].thumbnail.src);
            }

        }

    }

    return image;

}

export const Markers = (props:PointOfInterestProperties) => {

    const {
        state: {path, transform},
    } = useMap();

    const markersGroup = useRef(null);

    let pois = props.mapElements.filter((mapElement:MapElement) => {

        if('point' === mapElement.properties.type){
            return true;
        }

        return false;

    });

    const initialCluster = ()

    const [cluster, setCluster] = useState<number>(transform.k);



    useEffect(() => {
        console.log('zoom changed', transform.k)
    },[transform.k]);

    useEffect(() => {

        if(! path){
            return;
        }

        var groupSelection = d3.select(markersGroup.current);

        let radius = 20  / props.zoom;

        if(20 < radius){
            radius = 20
        }

        const clicked = (event:any, d:any) => {
            console.log(d.properties);
        }

        const overlappingMarkers = ():any[] => {

            let markers:PointInterface[] = pois.map((poi)=>{

                const center = path.centroid( ( poi as Feature));

                const id = poi.id;
                const x = center[0];
                const y = center[1];

                return{
                    id,
                    x,
                    y,
                    overlap:[],
                };

            });

            markers = markers.map((markerA)=> {

                const overlap = markers.filter((markerB)=>{

                    if(markerA.id === markerB.id){
                        return false;
                    }

                    const catheti = [
                        markerB.x - markerA.x,
                        markerB.y - markerA.y
                    ];

                    const hypotenuse = Math.sqrt(
                        Math.pow(catheti[0], 2) +
                        Math.pow(catheti[1], 2)
                    );

                    if((radius * 2) > hypotenuse){
                        return true;
                    }

                    return false;

                });

                markerA.overlap = overlap.map((marker)=>{
                    return marker.id;
                });

                return markerA;

            });

            const clustered = markers.reduce((accumulator, currentValue) => {

                const ids = [currentValue.id].concat(currentValue.overlap);

                const findAlreadyInAnCluster = accumulator.filter((previous)=>{

                    var intersect = ids.filter(function(n) {
                        return (true === previous.ids.includes(n));
                    });

                    return (0 !== intersect.length);
                });

                const alreadyInAnCluster = (0 !== findAlreadyInAnCluster.length);

                // is not overlapping with any other marker: A "cluster" on it's own
                if(!alreadyInAnCluster){

                    const mapElements = pois.filter((poi)=>{
                        return (ids.includes(poi.id));
                    });

                    const cluster:ClusterInterface = {
                        ids,
                        contains:mapElements
                    }

                    accumulator.push(cluster);

                }
                // add to an existing cluster
                else{

                    var missing = ids.filter(function(n) {
                        return (false === findAlreadyInAnCluster[0].ids.includes(n));
                    });

                    if(0 !== missing.length){

                        for(const missingId of missing){


                            const mapElement = pois.find((poi)=>{
                                return (ids.includes(poi.id));
                            })

                            findAlreadyInAnCluster[0].ids.push(missingId);
                            findAlreadyInAnCluster[0].contains.push(mapElement);

                        }

                    }


                }
                // create on new cluster

                return accumulator

            }, []);

            return clustered;

        }

        const markersThatOverlay = overlappingMarkers();

        /*
        groupSelection.selectAll('defs')
            .data(pois)
            .join("defs")
            .append('pattern')
            .attr('id', function(d) { return (d.id + '-icon');}) // just create a unique id (id comes from the json)
            .attr('width', 1)
            .attr('height', 1)
            .attr('patternContentUnits', 'objectBoundingBox')
            .append("image")
            .attr("xlink:href", (d:MapElement)=>{
                return getImage(d);
            })
            .attr("x", 0)
            .attr("y", 0)
            .attr("height", 1)
            .attr("width", 1)
            .attr("preserveAspectRatio", "xMinYMin slice");
        */

        groupSelection.selectAll('circle')
            .data(markersThatOverlay)
            .join('circle')
            .attr('cx', function(d) {
                return path.centroid( (d.contains[0] as Feature))[0];
            })
            .attr('cy', function(d) {
                return path.centroid( (d.contains[0] as Feature))[1];
            })
            .attr('fill', (d, i)=>{

                //return ("url(#"+d.contains[0].id + "-icon)");

                if(markersThatOverlay.includes(d.id)){
                    return 'red';
                }

                return 'blue';
            })
            .attr('r', radius)
        //.attr('opacity',0.5)

    });

    return (
        <g ref={markersGroup}></g>
    );

}
