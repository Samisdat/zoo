import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";
import {getImagePath} from "../../helper/getImagePath";
import {GeoPath} from "d3";

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
    ids: number[],
    contains: MapElement[];
    remove: boolean;
}

interface DistanceInterface{
    a:number;
    b:number;
    distance:number;
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

const getDistance = (path:GeoPath, markerA:MapElement, markerB:MapElement) => {

    const centerA = path.centroid( ( markerA as Feature));
    const xA = centerA[0];
    const yA = centerA[1];

    const centerB = path.centroid( ( markerB as Feature));

    const xB = centerB[0];
    const yB = centerB[1];

    const catheti = [
        xB - xA,
        yB - yA
    ];

    const hypotenuse = Math.sqrt(
        Math.pow(catheti[0], 2) +
        Math.pow(catheti[1], 2)
    );

    return hypotenuse;

}

export const Markers = (props:PointOfInterestProperties) => {

    const {
        state: {path, transform},
    } = useMap();

    const maxRadius = 30;

    const markersGroup = useRef(null);

    let pois = props.mapElements.filter((mapElement:MapElement) => {

        if('point' === mapElement.properties.type){
            return true;
        }

        return false;

    });

    //pois = pois.slice(0, 10);

    const initialClusters:ClusterInterface[] = [];

    for(const poi of pois){

        const initialCluster = {
            ids:[poi.id],
            contains:[poi],
            remove:false
        };

        initialClusters.push(initialCluster);

    }

    const [clusters, setClusters] = useState<ClusterInterface[]>(initialClusters);

    useEffect(() => {

        if(! path){
            return;
        }

        //let radius = maxRadius  / transform.k;
        let radius = maxRadius  / props.zoom

        if(maxRadius < radius){
            radius = maxRadius
        }

        for(const cluster of clusters) {

            for(const markerA of cluster.contains) {

                for(const markerB of cluster.contains) {

                    if(markerA.id === markerB.id){
                        continue
                    }

                    const hypotenuse = getDistance(
                        path,
                        markerA,
                        markerB
                    );

                    if((radius * 2) > hypotenuse){
                        continue;
                    }

                    cluster.contains = cluster.contains.filter((marker)=>{

                        if(markerB.id === marker.id){
                            return false;
                        }

                        return true;

                    });

                    cluster.ids = cluster.ids.filter((id)=>{

                        if(markerB.id === id){
                            return false;
                        }

                        return true;

                    });

                    const newCluster: ClusterInterface = {
                        ids: [markerB.id],
                        contains:[markerB],
                        remove:false
                    }

                    clusters.push(newCluster);

                }

            }

        }

        // getDistances
        let distances:DistanceInterface[] = [];

        const fromTo = {};
        for(const clusterA of clusters) {

            if(0 === clusterA.contains.length){
                continue
            }


            for(const clusterB of clusters) {

                if(0 === clusterB.contains.length){
                    continue
                }

                if(clusterA.contains[0].id === clusterB.contains[0].id){
                    continue
                }

                const lowerId = (clusterA.contains[0].id > clusterB.contains[0].id)?clusterB.contains[0].id:clusterA.contains[0].id;
                const higherId = (clusterA.contains[0].id <= clusterB.contains[0].id)?clusterB.contains[0].id:clusterA.contains[0].id;

                if(true === fromTo[`${lowerId}-${higherId}`]){
                    continue;
                }

                fromTo[`${lowerId}-${higherId}`] = true;

                const hypotenuse = getDistance(
                    path,
                    clusterA.contains[0],
                    clusterB.contains[0]
                );

                if((radius * 2) < hypotenuse){
                    continue;
                }

                const distance = {
                    a: clusterA.contains[0].id,
                    b: clusterB.contains[0].id,
                    distance:hypotenuse
                };

                distances.push(distance);

            };

        };

        distances = distances.sort((a, b)=>{

            if (a.distance > b.distance) {
                return 1;
            }
            if (a.distance < b.distance) {
                return -1;
            }
            return 0;
        });

        for(const distance of distances){

            const a = clusters.find((cluster)=>{
                if(0 === cluster.contains.length){
                    return false;
                }

                if(distance.a === cluster.contains[0].id){
                    return true;
                }
                return false;
            });

            if(undefined === a){
                continue
            }

            const b = clusters.find((cluster)=>{

                if(0 === cluster.contains.length){
                    return false;
                }

                if(distance.b === cluster.contains[0].id){
                    return true;
                }
                return false;
            });

            if(undefined === b){
                continue
            }

            a.ids = a.ids.concat(b.ids);
            a.contains = a.contains.concat(b.contains);

            b.ids = [];
            b.contains = [];

        }

        const nextClusters = clusters.filter((cluster)=>{

            if(0 === cluster.contains.length){
                return false;
            }

            return true;

        });

        for(const cluster of nextClusters){

            cluster.contains = cluster.contains.sort((a, b)=>{

                if (a.priority > b.priority) {
                    return 1;
                }
                if (a.priority < b.priority) {
                    return -1;
                }

                // if prio is the same, sort by id to keep consistent cluster
                if(a.priority === b.priority){

                    if (a.id > b.id) {
                        return 1;
                    }
                    if (a.id < b.id) {
                        return -1;
                    }

                }

                return 0;

            });

        }


        setClusters(nextClusters);


    },[props.zoom]);

    useEffect(() => {


        if(! path){
            return;
        }

        let radius = maxRadius  / props.zoom;

        if(maxRadius < radius){
            radius = maxRadius;
        }

        const groupSelection = d3.select(markersGroup.current);

        const paintClusters = clusters.filter((cluster)=>{

            console.log(cluster.contains.length)
            if(0 === cluster.contains.length){
                return false;
            }

            return true;

        });


        groupSelection.selectAll('circle')
            .data(paintClusters)
            .join('circle')
            .attr('cx', function(d) {
                return path.centroid( (d.contains[0] as Feature))[0];
            })
            .attr('cy', function(d) {
                return path.centroid( (d.contains[0] as Feature))[1];
            })
            .attr('fill', (d, i)=>{

                //return ("url(#"+d.contains[0].id + "-icon)");

                return 'blue';
            })
            .attr('r', radius);

        groupSelection.selectAll('text')
            .data(paintClusters)
            .join('text')
            .attr('x', function(d) {
                return path.centroid( (d.contains[0] as Feature))[0];
            })
            .attr('y', function(d) {
                return path.centroid( (d.contains[0] as Feature))[1];
            })
            .text(function(d){return d.contains.length})
            .attr('fill', (d, i)=>{

                //return ("url(#"+d.contains[0].id + "-icon)");

                return 'yellow';
            })
            .attr('width', '10')
            .attr('height', '10');

    },[clusters, props.zoom]);


    useEffect(() => {

        return;

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
                        contains:mapElements,
                        remove:true
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
