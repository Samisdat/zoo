import * as React from 'react'
import {GeoPath} from "d3";
import {GeoProjection} from "d3-geo";
import {useEffect} from "react";

export interface PositionInterface {
    lat: number;
    lng: number;
    isWithin: boolean;
    isGPS: boolean
    text: string;
}

export interface MapTransformInterface {
    x: number;
    y: number;
    k: number;
}

const mapTransformDefault: MapTransformInterface = {
    k:1,
    x:0,
    y:0
}

type Action =
    {
        type: 'SET_PATH_AND_PROJECTION',
        path:GeoPath,
        projection:GeoProjection,
        width:number,
        height:number,
    } |
    {
        type: 'SET_TRANSFORM',
        transform:MapTransformInterface,
    } |
    {
        type: 'SET_POSITION',
        position: PositionInterface,
    }
;
type Dispatch = (action: Action) => void;
type State = {
    path:GeoPath,
    projection:GeoProjection,
    width:number,
    height:number,
    transform:MapTransformInterface,
    position?: PositionInterface
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

            const {path, projection, width, height} = action;

            return {
                ...state,
                path,
                projection,
                width,
                height,
            };

        }
        case 'SET_TRANSFORM': {

            const {transform} = action;

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
        default: {
            throw new Error(`Unhandled action type: ${(action as any).type}`)
        }
    }
}

function MapProvider({children}: MapProviderProps) {

    const [state, dispatch] = React.useReducer(mapReducer, {
        path: undefined,
        projection: undefined,
        width: undefined,
        height: undefined,
        transform:mapTransformDefault,
    });
    const value = {state, dispatch};

    useEffect(() => {
        console.log(state.transform)
        localStorage.setItem("transform", JSON.stringify(state.transform));
    }, [state.transform]);

    return <MapStateContext.Provider value={value}>{children}</MapStateContext.Provider>
}

const useMap = () => {
    const context = React.useContext(MapStateContext)
    if (context === undefined) {
        throw new Error('useCount must be used within a MapProvider')
    }
    return context
}

export {MapProvider, useMap}
