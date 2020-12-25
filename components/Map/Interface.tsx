import {GeoPath} from "d3";
import {Feature, Polygon} from "geojson";

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
    focus: Feature<Polygon>;
    marker: MarkerInterface;
    pathGenerator: GeoPath,
    transform: MapTransformInterface;
    openSearch: boolean;
}