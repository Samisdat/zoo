import {Feature, Polygon} from "geojson";

export type NavigationMainItems = 'map' | 'species' | 'search' | 'menu';

export type MapFocus = 'none';

export interface NavigationInterface{
    activeMainItem:NavigationMainItems;
    openSideMenu: boolean;
    openTeaser: boolean;
    openSearch: boolean;
    focus: MapFocus | Feature<Polygon>;
}