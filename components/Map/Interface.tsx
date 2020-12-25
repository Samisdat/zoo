import {GeoPath} from "d3";

export interface MarkerInterface {
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

export interface MapStateInterface {
    width: number;
    height: number;
    dimensionUnit: string;
    color: string;
    focus: string;
    marker: MarkerInterface;
    pathGenerator: GeoPath,
    transform: MapTransformInterface;
    openSearch: boolean;
}