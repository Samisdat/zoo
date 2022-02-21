import React, {useEffect, useRef, useState} from 'react';
import {useMap} from "../../Context/MapContext";
import {GeoPath} from "d3";
import {ClusteredMarkers} from "./ClusteredMarkers";
import {Marker} from "../../../../strapi-api/entity/marker/marker";

export interface MarkersProps {
    markers:Marker[];
};

export interface ClusterInterface{
    ids: number[],
    contains: Marker[];
    remove: boolean;
}

interface DistanceInterface{
    a:number;
    b:number;
    distance:number;
}

const getDistance = (path:GeoPath, markerA:Marker, markerB:Marker) => {

    const catheti = [
        markerB.x - markerA.x,
        markerB.y - markerA.y
    ];

    const hypotenuse = Math.sqrt(
        Math.pow(catheti[0], 2) +
        Math.pow(catheti[1], 2)
    );

    return hypotenuse;

}

export const Markers = (props:MarkersProps) => {

    const {
        state: {path, transform},
    } = useMap();

    const maxRadius = 25;

    const markersGroup = useRef(null);

    const initialClusters:ClusterInterface[] = [];

    for(const point of props.markers){

        const initialCluster = {
            ids:[point.id],
            contains:[point],
            remove:false
        };

        initialClusters.push(initialCluster);

    }

    const [clusters, setClusters] = useState<ClusterInterface[]>(initialClusters);
    const [radius, setRadius] = useState<number>(maxRadius);

    useEffect(() => {

        if(! path){
            return;
        }

        //let radius = maxRadius  / transform.k;
        let radius = maxRadius  / 1

        if(maxRadius < radius){
            radius = maxRadius;
        }

        if(2 > radius){
            radius = 2;
        }

        setRadius(radius);

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

                    if((radius * 3) > hypotenuse){
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

    },[]);
    
    return (
        <g ref={markersGroup}>
            <ClusteredMarkers
                clusters={clusters}
                radius={radius}
            />
        </g>
    );

}
