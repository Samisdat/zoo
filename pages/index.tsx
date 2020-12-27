import React, {useEffect, useState} from 'react';

import {getGeoJson, getOneGeoJson} from './api/geojson/geojson';
import {Feature, FeatureCollection, LineString, Polygon} from 'geojson';
import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import {MapSearch} from "../components/Map/Search";

export interface IndexProps{
    border: Feature<Polygon>;
    simpleWays: FeatureCollection<LineString>[];
    boundingBox: FeatureCollection<LineString>;
    zoomBoxes: FeatureCollection<Polygon>;
    navigation: NavigationInterface;
}

type MapFocus = 'center';

export interface IndexState {
    focus: MapFocus | Feature<Polygon>;
    openSearch: boolean;
}

export default function Index(props:IndexProps) {

    const [state, setState] = useState<IndexState>({
        focus: {
            type:"Feature",
            properties:{
                name:"Affenhaus",
                slug:"affenhaus"
            },
            geometry:{
                type: "Polygon",
                coordinates:[
                    [
                        [7.109109601908572,51.23986872599718],
                        [7.109109601908572,51.23936830194398],
                        [7.110279732730108,51.23936830194398],
                        [7.110279732730108,51.23986872599718],
                        [7.109109601908572,51.23986872599718]
                    ]
                ]
            }
        },
        openSearch: false,
    });

    const toggleSearch = () => {

        const open = (true === state.openSearch) ? false : true;

        setState({
            ...state,
            openSearch:open
        });

    };

    const setFocus = (focus:Feature<Polygon>) => {

        let nextFocus = state.focus;

        if('center' === state.focus && undefined !== focus){
            nextFocus = focus
        }
        else if('center' !== state.focus){
            nextFocus = focus
        }

        if('center' !== nextFocus && 'center' !== state.focus && nextFocus && nextFocus.properties.slug === state.focus.properties.slug){
            console.log('ist gleich', nextFocus, state.focus);
            return;
        }

        setState({
            ...state,
            focus: nextFocus
        });

    };

    const getOpenSearchFromStorage = ():boolean => {

        const openSearchFromStorage = window.localStorage.getItem('map-search');
        const defaultMarker = false;

        if(null === openSearchFromStorage){
            return defaultMarker;
        }

        if('false' === openSearchFromStorage){
            return false;
        }

        if('true' === openSearchFromStorage){
            return true;
        }

        return defaultMarker;

    }

    useEffect(() => {

        const openSearch = getOpenSearchFromStorage();

        if(openSearch !== state.openSearch){
            setState({
                ...state,
                openSearch:openSearch
            })
        }

    }, [state]);

    return (
        <React.Fragment>
            <MapRoot setFocus={setFocus} focus={state.focus} {...props}></MapRoot>
            <MapSearch setFocus={setFocus} toggleSearch={toggleSearch} {...state}></MapSearch>
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

    let zoomBoxes = await getOneGeoJson('zoomboxes') as FeatureCollection<Polygon>;

    const navigation:NavigationInterface = {
        activeMainItem: 'map',
        openSideMenu: false,
        openTeaser: false
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
