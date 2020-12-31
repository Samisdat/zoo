import {GeoPath} from "d3";
import {GeoProjection} from "d3-geo";

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
    marker: MarkerInterface;
    pathGenerator: GeoPath,
    projection: GeoProjection;
    transform: MapTransformInterface;
}