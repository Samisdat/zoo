import React, {useState} from 'react';

import {FeatureCollection} from 'geojson';
import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import {MapSearch} from "../components/Map/Search";
import {getFullGeoJson} from "./api/geojson/list";
import MediaControlCard from "../components/Navigation/MediaCard";

export interface IndexProps{
    geoJson: FeatureCollection;
    navigation?: NavigationInterface;
    setFocus?: Function;
    toggleSearch?: Function;
    toggleTeaser?: Function;

}

export interface IndexState {
    openSearch: boolean;
}

export default function Index(props:IndexProps) {

    const {toggleSearch} = props;

    const [state, setState] = useState<IndexState>({
        openSearch: false,
    });

    return (
        <React.Fragment>
            <MapRoot setFocus={props.setFocus} {...props}></MapRoot>
            {/*
            <MediaControlCard></MediaControlCard>
            <MapSearch
                setFocus={props.setFocus}
                toggleSearch={toggleSearch}
                geoJson={props.geoJson}
                {...props.navigation}
            />
            */}
        </React.Fragment>
  );
}

export async function getStaticProps(context) {

    let getJson = await getFullGeoJson();

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
