import React from 'react';

import {getGeoJson} from './api/geojson/geojson';
import {Feature, FeatureCollection, LineString, Polygon} from 'geojson';
import {Map} from 'components/D3/Map';
import {NavigationInterface} from "../components/Navigation/Interfaces";

interface IndexProps{
    border: Feature<Polygon>;
    simpleWays: FeatureCollection<LineString>[];
    boundingBox: FeatureCollection<LineString>;
    zoomBoxes?: FeatureCollection<Polygon>;
    navigation: NavigationInterface;
}

export default function Index(props:IndexProps) {

  return (
      <Map {...props}></Map>
  );
}

export async function getStaticProps(context) {

    let geoJson = await getGeoJson();

    const extractCollection = (slug) => {

        const extracted = geoJson.features.find((feature)=>{

            return (slug === feature.properties.slug)

        });

        return extracted;

    };

    const extractWays = () => {

        const extracted = geoJson.features.filter((feature)=>{

            return ('way-simple' === feature.properties.slug)

        });

        return extracted;


    };

    const border:Feature<Polygon> = extractCollection('aussengrenze');

    let simpleWay = extractWays();

    let boundingBox = extractCollection('bounding-box');

    let boundingBoxCollection:FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: [boundingBox]
    };

    let zoomBoxes = extractCollection('zoom');

    const navigation:NavigationInterface = {
        activeMainItem: 'map',
        openSearch: false,
        openSideMenu: false
    };

    const indexProps:IndexProps = {
        border: border,
        simpleWays: simpleWay,
        boundingBox:boundingBoxCollection,
        zoomBoxes:zoomBoxes,
        navigation:navigation
    };

    return {
        props: indexProps
    }
}
