import * as React from 'react'
import {useViewport} from "../../viewport/useViewport";
import {useEffect} from "react";
type Action = {type: 'increment'} | {type: 'decrement'} | {type: 'SET_PATH', width:number}
type Dispatch = (action: Action) => void;
type State = {
    count: number,
    path: string,
}
type MapProviderProps = {
    children: React.ReactNode
    width: number,
    height:number,
}

const MapStateContext = React.createContext<
    {state: State; dispatch: Dispatch} | undefined
    >(undefined);


MapStateContext.displayName = "Context Display Name";
function mapReducer(state: State, action: Action):State {

    switch (action.type) {
        case 'increment': {

            const count =  state.count + 1;
            console.log(count);
            return {
                ...state,
                count,
            };
        }
        case 'decrement': {
            const count =  state.count - 1;

            return {
                ...state,
                count,
            };
        }
        case 'SET_PATH': {

            const path =  `path ${action.width}`;

            return {
                ...state,
                path,
            };

        }
        default: {
            throw new Error(`Unhandled action type: ${(action as any).type}`)
        }
    }
}

function MapProvider({children}: MapProviderProps) {


    const [state, dispatch] = React.useReducer(mapReducer, {
        count: 0,
        path:'no'
    });
    const value = {state, dispatch}
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
