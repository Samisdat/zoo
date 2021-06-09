import React, {useEffect, useState} from 'react';
import createPersistedState from 'use-persisted-state';

import {MapRoot} from 'components/Map/Root';
import {Teaser, TeaserPropsInterface} from "components/Map/Teaser";

import SearchDialog from "components/Search/Search";
import {Warehouse, WarehouseSpore} from "../strapi-api/warehouse/warehouse";
import {
    getMapElements
} from "../strapi-api/query/map-elements";
import {MapElement} from "../strapi-api/entity/map-element/map-element";
import {MapProvider} from "../components/Map/Context/MapContext";

const useFocusState = createPersistedState('focus');

export interface IndexProps{
    warehouse: WarehouseSpore;
}

export interface MapState {
    focus: MapElement;
}

export default function Index(props:IndexProps) {

    Warehouse.get().hydrate(props.warehouse);

    const boundingBox = Warehouse.get().getMapElement(55/*80*/);

    const defaultMapState:MapState = {
        focus:boundingBox
    }

    const mapElements = Warehouse.get().getMapElements();

    const [mapState, setMapState] = useFocusState<MapState>(defaultMapState);

    const [teaser, setTeaser] = useState<MapElement>(undefined);

    const storeFocus = (focus: MapElement) => {

        setMapState({
            ...mapState,
            focus: focus,
        });

        setTeaser(focus);

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

    useEffect(() => {

        //console.log(teaser)

    },[teaser]);


    const closeTeaser = () => {
        setTeaser(undefined);
    };

    return (
        <React.Fragment>
            <MapProvider>
                <MapRoot
                    focus={mapState.focus}
                    setFocus={setFocus}
                    fullsize={true}
                    mapElements={mapElements}
                />
            </MapProvider>
            <SearchDialog
                mapElements={mapElements}
                setFocus={setFocus}
            />
            <Teaser
                close={closeTeaser}
                mapElement={teaser}
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
