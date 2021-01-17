import React, {useState} from 'react';

import {Feature, FeatureCollection, Polygon} from 'geojson';
import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import {MapSearch} from "../components/Map/Search";
import {getFullGeoJson} from "./api/geojson/list";
import {Teaser, TeaserPropsInterface} from "../components/Map/Teaser";

import createPersistedState from 'use-persisted-state';
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

export default function Index(props:IndexProps) {

    const {toggleSearch} = props;

    const [mapState, setMapState] = useMapState<MapState>(defaultMapState);

    const [teaser, setTeaser] = useState<TeaserPropsInterface>(/*{
        apiUrl: '/api/teaser/animals/afrikanischer-elefant',
        close: ()=>{
            setTeaser(undefined);
        }
    }*/);

    const closeTeaser = ()=>{
        setTeaser(undefined);
    };

    const clickButton = () => {
        setTeaser({
            apiUrl: '/api/teaser/animals/afrikanischer-elefant',
            close: closeTeaser
        });

    };

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

        if(focus.properties.slug !== mapState.focus.properties.slug){

            storeFocus(focus)

            return;
        }

    };

    return (
        <React.Fragment>
            <MapRoot
                focus={mapState.focus}
                setTeaser={setTeaser}
                {...props}
            />
            <MapSearch
                toggleSearch={toggleSearch}
                geoJson={props.geoJson}
                setFocus={setFocus}
                {...props.navigation}
            />
            <Teaser
                {...teaser}
            />
        </React.Fragment>
  );
}

export async function getStaticProps(context) {

    let getJson = await getFullGeoJson();

    console.log(getJson);

    for(let i = 0, x = getJson.features.length; i < x; i += 1){

        const feature = getJson.features[i];

        /*
        if('facility-circle' === feature.properties.type){
            getJson.features[i].geometry.coordinates = [
                (feature.geometry.coordinates[0] - 0.000021),
                (feature.geometry.coordinates[1] + 0.000010)

            ]
        }


        if('way' === feature.properties.type && 1 !== feature.geometry.coordinates.length){
            console.log(feature.geometry.coordinates.length)
            const correctedWay = feature.geometry.coordinates.map((coordinates)=>{

                console.log('coordinates', coordinates)
                return [
                    (coordinates[0] - 0.000021),
                    (coordinates[1] + 0.000010)
                ];
            });

            feature.geometry.coordinates = correctedWay;

        }

         */

    }

    const indexProps:IndexProps = {
        geoJson: getJson
    };

    return {
        props: indexProps
    }
}
