import React, {useEffect, useState} from 'react';

import {getGeoJson, getOneGeoJson} from './api/geojson/geojson';
import {Feature, FeatureCollection, LineString, Polygon} from 'geojson';
import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import {MapSearch} from "../components/Map/Search";
import {createChainedFunction} from "@material-ui/core";
import {getZoomboxes} from "./api/search/autocomplete";

export interface IndexProps{
    border: Feature<Polygon>;
    simpleWays: FeatureCollection<LineString>[];
    boundingBox: FeatureCollection<LineString>;
    zoomBoxes: any;
    navigation?: NavigationInterface;
    toggleSearch?: Function;
    toggleTeaser?: Function;

}

type MapFocus = 'none';

export interface IndexState {
    focus: MapFocus | Feature<Polygon>;
    openSearch: boolean;
}

export default function Index(props:IndexProps) {

    const {toggleSearch} = props;

    const [state, setState] = useState<IndexState>({
        focus: 'none',
        openSearch: false,
    });

    const storeFocus = (focus:MapFocus | Feature<Polygon>) => {

        setState({
            ...state,
            focus: focus
        });

        if('none' !== focus){
            props.toggleTeaser()
        }

    }

    const setFocus = (focus:MapFocus | Feature<Polygon>) => {

        if('none' === focus || undefined === focus){

            storeFocus('none');
            return;
        }

        focus = focus as Feature<Polygon>;

        if('none' === state.focus){

            storeFocus(focus)

            return;
        }

        if(focus.properties.slug !== state.focus.properties.slug){

            storeFocus(focus)

            return;
        }

    };

    return (
        <React.Fragment>
            <MapRoot setFocus={setFocus} focus={state.focus} {...props}></MapRoot>
            <MapSearch
                setFocus={setFocus}
                toggleSearch={toggleSearch}
                zoomBoxes={props.zoomBoxes}
                {...props.navigation}
            />
        </React.Fragment>
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

    let zoomBoxes = await getZoomboxes();

    const indexProps:IndexProps = {
        border: border,
        simpleWays: simpleWay,
        boundingBox:boundingBoxCollection,
        zoomBoxes: zoomBoxes
    };

    return {
        props: indexProps
    }
}
