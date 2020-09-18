import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import dynamic from 'next/dynamic';
import {getGeoJson} from "./api/geojson/remove-later/geojson";
import {Feature, FeatureCollection, LineString, Polygon} from "geojson";
import Parent from "../components/Parent";

interface IndexProps{
    border: Feature<Polygon>;
    ways: FeatureCollection<LineString>;
    boundingBox: FeatureCollection<LineString>;
}

export default function Index(props) {

  console.log(props)

  return (
      <div>
        <Parent {...props}></Parent>
      </div>

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

    const border:Feature<Polygon> = extractCollection('aussengrenze');

    let simpleWay = extractCollection('way-simple');

    let simpleWayCollection:FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: simpleWay.geometry.coordinates.map((coordinate)=>{

            return     {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": coordinate
                }
            }
        })
    };

    let boundingBox = extractCollection('bounding-box');

    let boundingBoxCollection:FeatureCollection<LineString> = {
        type: "FeatureCollection",
        features: [boundingBox]
    };

    const indexProps:IndexProps = {
        border: border,
        ways: simpleWayCollection,
        boundingBox:boundingBoxCollection
    };

    return {
        props: indexProps
    }
}
