import React, {useEffect, useState} from 'react';
import createPersistedState from 'use-persisted-state';

import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "components/Navigation/Interfaces";
import {Teaser, TeaserPropsInterface} from "components/Map/Teaser";

import SearchDialog from "components/Search/Search";
import {PhotoSpore} from "../strapi-api/photo/photo-spore";
import {FacilitySpore} from "../strapi-api/facility/facility-spore";
import {Photo} from "../strapi-api/photo/photo";
import {Facility} from "../strapi-api/facility/facility";
import {getMapElementEntityById, getMapElements, MapElementInterface} from "../strapi-api/map-elements";
import {getPhotoEntityByFacility} from "../strapi-api/photos";
import {getFacilityEntityBySlug} from "../strapi-api/facilities";
import {MapElementSpore} from "../strapi-api/map-element/map-element-spore";
import {MapElement} from "../strapi-api/map-element/map-element";
const useMapState = createPersistedState('map');

export interface IndexProps{
    photoValueObject:PhotoSpore;
    facility: FacilitySpore;
    mapElement: MapElementSpore
    mapElements: MapElementInterface[];
    navigation?: NavigationInterface;
    setFocus?: Function;
    toggleSearch?: Function;
    toggleTeaser?: Function;
}

export interface MapState {
    openSearch: boolean;
    focus: MapFocus | MapElementInterface;
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

    console.log(Photo.hydrate(props.photoValueObject));
    console.log(Facility.hydrate(props.facility));
    console.log(MapElement.hydrate(props.mapElement));

    const [mapDimensionState, setMapDimensionState] = useMapState<MapDimension>(MapDimensionDefault);
    const [mapState, setMapState] = useMapState<MapState>(defaultMapState);

    const [teaser, setTeaser] = useState<TeaserPropsInterface>();

    const [hasResizeListener, setHasResizeListener] = useState<boolean>(false);

    const storeFocus = (focus:MapFocus | MapElementInterface) => {

        setMapState({
            ...mapState,
            focus: focus,
        });

        if('none' !== focus){
            //toggleTeaser();
        }

    }

    const setFocus = (focus:MapFocus | MapElementInterface) => {

        if('none' === focus || undefined === focus){

            storeFocus('none');
            return;
        }

        focus = focus as MapElementInterface;


        if('none' === mapState.focus){

            storeFocus(focus)

            return;
        }

        if(focus.properties.facility.slug !== mapState.focus?.properties.facility.slug){

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
                setFocus={setFocus}
                setTeaser={setTeaser}
                mapDimension={mapDimensionState}
                fullsize={true}
                mapElements={props.mapElements}
                navigation={props.navigation}
                toggleTeaser={props.toggleTeaser}
            />
            <SearchDialog
                mapElements={props.mapElements}
                setFocus={setFocus}
            />
            <Teaser
                {...teaser}
            />
        </React.Fragment>
  );
}

export async function getStaticProps(context) {

    const photoEntity = await getPhotoEntityByFacility(11)

    const facilityEntity = await getFacilityEntityBySlug('affenhaus');

    const mapElementEntity = await getMapElementEntityById(35)

    const mapElements = await getMapElements();

    const indexProps:IndexProps = {
        mapElements,
        mapElement: mapElementEntity.dehydrate(),
        facility: facilityEntity.dehydrate(),
        photoValueObject:photoEntity.dehydrate()
    };

    return {
        props: indexProps
    }
}
