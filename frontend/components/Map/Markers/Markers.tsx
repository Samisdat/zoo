import React, {useEffect, useRef, useState} from 'react';
import * as d3 from 'd3';
import {MapElement} from "../../../strapi-api/entity/map-element/map-element";
import {useMap} from "../Context/MapContext";
import {Feature} from "geojson";
import {getImagePath} from "../../../helper/getImagePath";
import {GeoPath} from "d3";
import {MarkerImages} from "./MarkerImages";
import {ClusteredMarkers} from "./ClusteredMarkers";

export interface PointOfInterestProperties{
    mapElements:MapElement[];
    zoom:number;
};

export interface ClusterInterface{
    ids: number[],
    contains: MapElement[];
    remove: boolean;
}

interface DistanceInterface{
    a:number;
    b:number;
    distance:number;
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

    pois = pois.filter((poi)=>{

        if(428 === poi.id){
            return true;
        }

        if(429 === poi.id){
            return true;
        }

        if(434 === poi.id){
            return true;
        }

        if(438 === poi.id){
            return true;
        }

        if(433 === poi.id){
            return true;
        }

        if(435 === poi.id){
            return true;
        }

        if(439 === poi.id){
            return true;
        }

        if(466 === poi.id){
            return true;
        }
        if(445 === poi.id){
            return true;
        }
        if(441 === poi.id){
            return true;
        }
        if(443 === poi.id){
            return true;
        }
        if(440 === poi.id){
            return true;
        }
        if(436 === poi.id){
            return true;
        }
        if(430   === poi.id){
            return true;
        }
        if(429   === poi.id){
            return true;
        }

        return false;

    });

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
    
    return (
        <g ref={markersGroup}>
            <MarkerImages
                zoom={props.zoom}
                mapElements={pois}
            />
            <ClusteredMarkers
                clusters={clusters}
                zoom={props.zoom}
            />
        </g>
    );

}
