import * as React from 'react'
import {GeoPath} from "d3";
import {GeoProjection} from "d3-geo";
import {MutableRefObject, useEffect, useRef} from "react";

import throttle from 'lodash.throttle';
import {Route} from "../Navigation/Routing/Graph/Dijkstra";
import {Facility} from "strapi-api/entity/facility/facility";
import {getTransformFromStorage} from "../getTransformFromStorage";
import {getPositionFromStorage} from "../getPositionFromStorage";

// @refresh reset

export interface Dimension {
    width: number;
    height: number;
}

export type PositionType = 'gps' | 'gpx' | 'qr' | 'dev';

export interface PositionRawInterface {
    lat: number;
    lng: number;
    type:PositionType;
    data?:any;
}

export interface Position{
    x:number;
    y:number;
}

export interface PositionInterface {
    lat: number;
    lng: number;
    isWithin: boolean;
    isGPS: boolean
    text: string;
    fuzziness?: number;
    edgeId?: number;
    x?: number;
    y?: number;
    raw?: PositionRawInterface;
}

export type RoutingType = 'request' | 'response';

export interface RoutingInterface {
    type: RoutingType;
    destination: number[];
    start?: PositionInterface;
    route?:Route;
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

export interface PointExchangeInterface {
    position?: Position;
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
        type: 'SET_POSITION_RAW',
        position_raw: PositionRawInterface,
    } |
    {
        type: 'SET_POSITION',
        position: PositionInterface,
    } |
    {
        type: 'REQUEST_ROUTING',
        routing: RoutingInterface,
    } |
    {
        type: 'SET_FOCUS',
        focus: Facility,
    } |
    {
        type: 'SET_TEASER',
        teaser: Facility,
    } |
    {
        type: 'SET_DIMENSION',
        dimension: Dimension,
    } |
    {
        type: 'SET_ZOOM_AND_PAN',
        center: any[]
    } |
    {
        type: 'SET_POINT_EXCHANGE',
        exchange: PointExchangeInterface
    }
;
type Dispatch = (action: Action) => void;
type State = {
    ref: MutableRefObject<SVGSVGElement>,
    dimension:Dimension,
    path:GeoPath,
    projection:GeoProjection,
    transform:MapTransformInterface,
    focus?:Facility
    center?:any[]
    teaser?:Facility
    position_raw?: PositionRawInterface,
    position?: PositionInterface,
    routing?: RoutingInterface,
    exchange?: PointExchangeInterface,
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
        case 'SET_POSITION_RAW': {

            const {position_raw} = action;

            return {
                ...state,
                position_raw,
            };

        }
        case 'SET_POSITION': {

            const {position} = action;

            return {
                ...state,
                position,
            };

        }
        case 'REQUEST_ROUTING': {

            const {routing} = action;

            return {
                ...state,
                routing,
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
        case 'SET_POINT_EXCHANGE': {

            const {exchange} = action;

            return {
                ...state,
                exchange,
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
        transform: mapTransformDefault,
    });
    const value = {state, dispatch};

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

    useEffect(()=>{

        const transform = getTransformFromStorage();
        
        if(!transform.k){
            transform.k = 1;
        }

        if(!transform.x){
            transform.x = 0;
        }

        if(!transform.y){
            transform.y = 0;
        }

        dispatch({
            type: 'SET_TRANSFORM',
            transform
        });

    },[]);

    useEffect(() => {

        localStorage.setItem("transform", JSON.stringify(state.transform));

    }, [state.transform]);

    useEffect(() => {

        const position = getPositionFromStorage();

        dispatch({
            type: 'SET_POSITION',
            position
        });

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
