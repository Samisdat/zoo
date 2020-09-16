import React from 'react';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import dynamic from 'next/dynamic';
import {getGeoJson} from "./api/geojson/remove-later/geojson";
import {Feature, FeatureCollection, LineString, Polygon} from "geojson";

const MainMap = dynamic(() => import('components/Map/MainMap'), {
  ssr: false
});


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      text: {
        padding: theme.spacing(2, 2, 0),
      },
      paper: {
        paddingBottom: 50,
      },
      list: {
        marginBottom: theme.spacing(2),
      },
      subheader: {
        backgroundColor: theme.palette.background.paper,
      },
      appBar: {
        top: 'auto',
        bottom: 0,
      },
      grow: {
        flexGrow: 1,
      },
      fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        margin: '0 auto',
      },
    }),
);


interface IndexProps{
    border: Feature<Polygon>;
    ways: FeatureCollection<LineString>;
    boundingBox: FeatureCollection<LineString>;
}

export default function Index(props) {

  console.log(props)

  const classes = useStyles();

  return (
      <div>
        <MainMap {...props}></MainMap>
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
