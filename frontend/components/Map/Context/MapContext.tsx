import * as React from 'react'
import {GeoPath} from "d3";
import {GeoProjection} from "d3-geo";
import {MutableRefObject, useEffect, useRef} from "react";
import {MapElement} from "../../../strapi-api/entity/map-element/map-element";

import throttle from 'lodash.throttle';
import {Feature} from "geojson";

// @refresh reset

export interface Dimension {
    width: number;
    height: number;
}

export interface PositionInterface {
    lat: number;
    lng: number;
    isWithin: boolean;
    isGPS: boolean
    text: string
}

export interface MapTransformInterface {
    x: number;
    y: number;
    k: number;
}

export const mapTransformDefault: MapTransformInterface = {
    k:1,
    x:0,
    y:0
}

type Action =
    {
        type: 'SET_PATH_AND_PROJECTION',
        path:GeoPath,
        projection:GeoProjection,
    } |
    {
        type: 'SET_TRANSFORM',
        transform:MapTransformInterface,
    } |
    {
        type: 'SET_POSITION',
        position: PositionInterface,
    } |
    {
        type: 'SET_FOCUS',
        focus: MapElement,
    } |
    {
        type: 'SET_TEASER',
        teaser: MapElement,
    } |
    {
        type: 'SET_DIMENSION',
        dimension: Dimension,
    } |
    {
        type: 'SET_ZOOM_AND_PAN',
        center: MapElement[]
    }
;
type Dispatch = (action: Action) => void;
type State = {
    ref: MutableRefObject<SVGSVGElement>,
    dimension:Dimension,
    path:GeoPath,
    projection:GeoProjection,
    transform:MapTransformInterface,
    focus?:MapElement
    center?:MapElement[]
    teaser?:MapElement
    position?: PositionInterface,
}
type MapProviderProps = {
    children: React.ReactNode
}

const MapStateContext = React.createContext<
    {state: State; dispatch: Dispatch} | undefined
    >(undefined);


MapStateContext.displayName = "Context Display Name";
function mapReducer(state: State, action: Action):State {

    switch (action.type) {
        case 'SET_PATH_AND_PROJECTION': {

            const {path, projection} = action;

            return {
                ...state,
                path,
                projection,
            };

        }
        case 'SET_TRANSFORM': {

            const {transform} = action;

            if(!transform.x){
                transform.x = 0;
            }

            if(!transform.y){
                transform.y = 0;
            }

            if(!transform.k){
                transform.k = 1;
            }

            return {
                ...state,
                transform,
            };

        }
        case 'SET_POSITION': {

            const {position} = action;

            return {
                ...state,
                position,
            };

        }
        case 'SET_FOCUS': {

            const {focus} = action;

            return {
                ...state,
                focus,
            };

        }
        case 'SET_ZOOM_AND_PAN': {

            const {center} = action;

            return {
                ...state,
                center,
            };

        }

        case 'SET_TEASER': {

            const {teaser} = action;

            return {
                ...state,
                teaser,
            };

        }
        case 'SET_DIMENSION': {

            const {dimension} = action;

            return {
                ...state,
                dimension,
            };

        }
        default: {
            throw new Error(`Unhandled action type: ${(action as any).type}`)
        }
    }
}


const defaultDimension:Dimension = {
    width: 0,
    height: 0,
};


function MapProvider({children}: MapProviderProps) {

    const ref = useRef(null);

    const [state, dispatch] = React.useReducer(mapReducer, {
        ref: ref,
        dimension:defaultDimension,
        path: undefined,
        projection: undefined,
        transform:mapTransformDefault,
    });
    const value = {state, dispatch};

    useEffect(() => {
        localStorage.setItem("transform", JSON.stringify(state.transform));
    }, [state.transform]);

    const getDimension = ():Dimension => {

        if(null === ref.current){
            return defaultDimension;
        }

        const width = ref.current.clientWidth;
        const height = ref.current.clientHeight;

        return {
            width,
            height,
        };

    };

    const handleWindowResize = () => {

        return throttle(() => {

            dispatch({
                type: 'SET_DIMENSION',
                dimension:getDimension()
            });

            //setDimension(getDimension());

        }, 200);


    }

    useEffect(() => {

        dispatch({
            type: 'SET_DIMENSION',
            dimension:getDimension()
        });

    }, []);

    useEffect(() => {

        window.addEventListener("resize", handleWindowResize());

        return () => window.removeEventListener("resize", handleWindowResize());

    }, []);

    return <MapStateContext.Provider value={value}>{children}</MapStateContext.Provider>
}

const useMap = () => {

    const context = React.useContext(MapStateContext);

    if (context === undefined) {
        throw new Error('useMap must be used within a MapProvider')
    }

    return context
}

export {MapProvider, useMap}
