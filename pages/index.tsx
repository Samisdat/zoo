import React, {useEffect, useState} from 'react';

import {Feature, FeatureCollection, LineString, Polygon} from 'geojson';
import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import {getFullGeoJson} from "./api/geojson/list";
import {Teaser, TeaserPropsInterface} from "../components/Map/Teaser";

import createPersistedState from 'use-persisted-state';
import SearchDialog from "../components/Search/Search";
const useMapState = createPersistedState('map');

export interface IndexProps{
    geoJson: FeatureCollection;
    navigation?: NavigationInterface;
    setFocus?: Function;
    toggleSearch?: Function;
    toggleTeaser?: Function;

}

export interface MapState {
    openSearch: boolean;
    focus: MapFocus | Feature<Polygon>;
}

export type MapFocus = 'none';

const defaultMapState:MapState = {
    openSearch: false,
    focus: 'none',
}

export interface MapDimension{
    width: number;
    height: number;
}

// on serve side there is no window width and height
const MapDimensionDefault:MapDimension = {
    width: 300,
    height: 300,
}

export default function Index(props:IndexProps) {

    const [mapDimensionState, setMapDimensionState] = useMapState<MapDimension>(MapDimensionDefault);
    const [mapState, setMapState] = useMapState<MapState>(defaultMapState);

    const [teaser, setTeaser] = useState<TeaserPropsInterface>();

    const [hasResizeListener, setHasResizeListener] = useState<boolean>(false);

    const storeFocus = (focus:MapFocus | Feature<Polygon>) => {

        setMapState({
            ...mapState,
            focus: focus,
        });

        if('none' !== focus){
            //toggleTeaser();
        }

    }

    const setFocus = (focus:MapFocus | Feature<Polygon>) => {

        if('none' === focus || undefined === focus){

            storeFocus('none');
            return;
        }

        focus = focus as Feature<Polygon>;


        if('none' === mapState.focus){

            storeFocus(focus)

            return;
        }

        if(focus.properties.slug !== mapState.focus?.properties?.slug){

            storeFocus(focus)

            return;
        }

    };

    const setDimension = () => {

        const mapDimension: MapDimension = {
            width: window.innerWidth,
            height: window.innerHeight,
        };

        setMapDimensionState(mapDimension);

    };

    useEffect(() => {

        console.log('hasResizeListener', hasResizeListener);

        // register event listener only once
        if(false === hasResizeListener){

            window.addEventListener('resize', ()=>{
                console.log('window@resize')
                setDimension();
            });

            setHasResizeListener(true);

        }

        if(
            window.innerWidth === mapDimensionState?.width &&
            window.innerHeight === mapDimensionState?.height)
        {
            return;
        }

        setDimension();

    },[mapDimensionState]);


    return (
        <React.Fragment>
            <MapRoot
                focus={mapState.focus}
                setTeaser={setTeaser}
                mapDimension={mapDimensionState}
                fullsize={true}
                {...props}
            />
            <SearchDialog
                geoJson={props.geoJson}
                setFocus={setFocus}
            />
            <Teaser
                {...teaser}
            />
        </React.Fragment>
  );
}

export async function getStaticProps(context) {

    let getJson = await getFullGeoJson();

    const indexProps:IndexProps = {
        geoJson: getJson
    };

    return {
        props: indexProps
    }
}
