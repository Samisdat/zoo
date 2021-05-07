import React, {useEffect, useState} from 'react';
import createPersistedState from 'use-persisted-state';

import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "components/Navigation/Interfaces";
import {Teaser, TeaserPropsInterface} from "components/Map/Teaser";

import SearchDialog from "components/Search/Search";
import {Warehouse, WarehouseSpore} from "../strapi-api/warehouse/warehouse";
import {
    getMapElements,
    MapElementInterface
} from "../strapi-api/query/map-elements";
import {getAnimalById} from "../strapi-api/query/animals";
import {Facility} from "../strapi-api/entity/facility/facility";
import {MapElement} from "../strapi-api/entity/map-element/map-element";

const useMapState = createPersistedState('map');
const useMapDimensionState = createPersistedState('map-dimension');

export interface IndexProps{
    warehouse: WarehouseSpore;
    navigation?: NavigationInterface;
    setFocus?: Function;
    toggleSearch?: Function;
    toggleTeaser?: Function;
}

export interface MapState {
    focus: MapElement;
}

export type MapFocus = 'none';

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

    Warehouse.get().hydrate(props.warehouse);

    const boundingBox = Warehouse.get().getMapElement(55/*80*/);

    const defaultMapState:MapState = {
        focus:boundingBox
    }

    const mapElements = Warehouse.get().getMapElements();

    const [mapDimensionState, setMapDimensionState] = useMapDimensionState<MapDimension>(MapDimensionDefault);

    const [mapState, setMapState] = useMapState<MapState>(defaultMapState);

    const [teaser, setTeaser] = useState<TeaserPropsInterface>();

    const [hasResizeListener, setHasResizeListener] = useState<boolean>(false);

    const storeFocus = (focus: MapElement) => {

        setMapState({
            ...mapState,
            focus: focus,
        });

    }

    const setFocus = (focus:MapElement) => {

        /*
            If bounding box => no focus
         */

        if(focus.id !== mapState.focus.id){

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
                mapDimension={mapDimensionState}
                fullsize={true}
                mapElements={mapElements}
                navigation={props.navigation}
                toggleTeaser={props.toggleTeaser}
            />
            <SearchDialog
                mapElements={mapElements}
                setFocus={setFocus}
            />
            <Teaser
                {...teaser}
            />
        </React.Fragment>
  );

}

export async function getStaticProps(context) {

    await getMapElements();

    const indexProps:any = {
        warehouse: Warehouse.get().dehydrate()
    };

    return {
        props: indexProps
    }
}
