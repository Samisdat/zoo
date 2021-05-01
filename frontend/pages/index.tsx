import React, {useEffect, useState} from 'react';
import createPersistedState from 'use-persisted-state';

import {MapRoot} from 'components/Map/Root';
import {NavigationInterface} from "components/Navigation/Interfaces";
import {Teaser, TeaserPropsInterface} from "components/Map/Teaser";

import SearchDialog from "components/Search/Search";
import {Warehouse, WarehouseSpore} from "../strapi-api/warehouse/warehouse";
import {PhotoSpore} from "../strapi-api/entity/photo/photo-spore";
import {FacilitySpore} from "../strapi-api/entity/facility/facility-spore";
import {MapElementSpore} from "../strapi-api/entity/map-element/map-element-spore";
import {
    getMapElementById,
    getMapElements,
    MapElementInterface
} from "../strapi-api/query/map-elements";
import {MapElement} from "../strapi-api/entity/map-element/map-element";
import {getPhotoById} from "../strapi-api/query/photos";
import {getFacilityById, getFacilityBySlug} from "../strapi-api/query/facilities";
import {getAnimalById} from "../strapi-api/query/animals";

const useMapState = createPersistedState('map');

export interface IndexProps{
    warehouse: WarehouseSpore;
    photoValueObject:PhotoSpore;
    facility: FacilitySpore;
    mapElement: MapElementSpore;
    //mapElements: MapElementInterface[];
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

    Warehouse.get().hydrate(props.warehouse);

    //console.log(Warehouse.get().hasPhoto(11));
    //console.log(Warehouse.get().getPhoto(11));

    //console.log(Warehouse.get().hasFacility(13));
    //console.log(Warehouse.get().getFacility(13).photos);
    //console.log(Warehouse.get().getFacility(13).animalsRaw);
    //console.log(Warehouse.get().getFacility(13).animals);

    console.log(Warehouse.get().getMapElement(35).properties.name, Warehouse.get().getMapElement(35).photos)
    console.log(Warehouse.get().getMapElement(48).properties.name, Warehouse.get().getMapElement(48).photos)

    //console.log(Warehouse.get().getAnimal(47))

    const mapElements = Warehouse.get().getMapElements();

    //console.log(Photo.hydrate(props.photoValueObject));
    //console.log(Facility.hydrate(props.facility));
    //console.log(MapElement.hydrate(props.mapElement));

    /*
    const mapElements = props.mapElements.map((mapElement)=>{

        if(35 === mapElement.id){
            return MapElement.hydrate(props.mapElement);
        }

        return mapElement;

    });

    console.log(mapElements)

    const mapElementInterfaced = props.mapElements.find((mapElement)=>{

        if(35 === mapElement.id){
            return true;
        }

        return false;

    });
    console.log(mapElementInterfaced)

    */


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

    /*
    return (
        <React.Fragment>
            nothing
        </React.Fragment>
    );

     */

    return (
        <React.Fragment>
            {/*
            <MapRoot
                focus={mapState.focus}
                setFocus={setFocus}
                setTeaser={setTeaser}
                mapDimension={mapDimensionState}
                fullsize={true}
                mapElements={mapElements}
                navigation={props.navigation}
                toggleTeaser={props.toggleTeaser}
            />
            */}
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

    //await getPhotoById(11);

    //const foo = await getFacilityBySlug('eingang');
    //const bar = await getFacilityBySlug('elefanten');


    //console.log('photosRaw', foo.photosRaw)
    //console.log('photos', foo.photos)

    //console.log(Warehouse.get().hasFacility(11));
    //console.log(Warehouse.get().getFacility(11));


    await getMapElements();
    //await getMapElementById(35);
    //await getMapElementById(35);

    await getAnimalById(47);

    const indexProps:any = {
        warehouse: Warehouse.get().dehydrate()
    };

    return {
        props: indexProps
    }
}
