import React, {useEffect} from 'react';
import * as d3 from 'd3';

import {ZoomAndPan} from './ZoomAndPan';
import {ZoomLevel} from './ZoomLevel';
import {useMap} from './Context/MapContext';
import {Feature} from 'geojson';
import {MarkerImages} from './Cartesian/Markers/MarkerImages';
import {Edge} from 'strapi-api/entity/edge/edge';
import {Node} from 'strapi-api/entity/node/node';
import {angle, borderGeoJson} from '../../constants';
import {Facility} from 'strapi-api/entity/facility/facility';
import {Marker} from 'strapi-api/entity/marker/marker';
import {GeoBorder} from './DevArtifacts/GeoBorder';
import {Cartesian} from './Cartesian/Cartesian';
import {GeoPoint} from './DevArtifacts/GeoPoint';
import {GPXViewer} from '../GPX/Viewer';
import styled from '@mui/system/styled';

const SvgWrap = styled('div')({
    position: 'absolute',
    top: '0px',
    bottom: '0px',
    left: '0px',
    right: '0px',
});

const FullScreenMap = styled('svg')((props) => ({
    display: 'block',
    width:'100%',
    height:'100%',
    background:'green'
}));

interface MapProps{
    fullsize: boolean;
    markers:Marker[];
    facilities: Facility[];
    nodes: Node[],
    edges: Edge[]
}

// @refresh reset
export const Map = ({fullsize, markers, facilities, nodes, edges}:MapProps) => {

    const {
        state: {dimension, ref},
        dispatch
    } = useMap();

    const border = borderGeoJson;

    const createProjectionAndPath = (width, height) => {

        const margin = 20;

        const projection = d3.geoMercator()
            .angle(angle)
            .scale(1)
            .fitExtent(
                [[margin, margin],
                [width - margin, height - margin]],
                border as Feature
            )
        ;

        const pathGenerator = d3.geoPath().projection(projection)

        dispatch({
            type: 'SET_PATH_AND_PROJECTION',
            path: pathGenerator,
            projection: projection,
        });

    }

    useEffect(() => {

        // @todo one to create and one to resize

        if(!dimension){
            return;
        }

        if(!dimension.width || !dimension.height){
            return;
        }

        createProjectionAndPath(dimension.width,dimension.height);

    }, [
        dimension.width,
        dimension.height
    ]);

    return (
        <SvgWrap>
            {/* @TODO How to handle not fullsize */}
            <FullScreenMap
                ref={ref}
                width={dimension.width}
                height={dimension.height}
            >
                <MarkerImages
                    facilities={facilities}
                />
                <ZoomAndPan>
                    <GeoBorder />

                    <Cartesian
                        nodes={nodes}
                        edges={edges}
                        markers={markers}
                    />
                    {/*
                    <GeoPoint />
                    */}
                    <GPXViewer/>

                </ZoomAndPan>
                <ZoomLevel />
            </FullScreenMap>
        </SvgWrap>
    );

}
