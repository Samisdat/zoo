export type NavigationMainItems = 'map' | 'species' | 'search' | 'menu';

export interface NavigationInterface{
    activeMainItem:NavigationMainItems;
    openSideMenu: boolean;
    openSearch: boolean;
    openTeaser: boolean;
}