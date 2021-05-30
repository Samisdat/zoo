import {NavigationListIconType} from "./NavigationListIcon";

export interface NavigationListItemInterface {
    key: string;
    href?: string;
    text: string;
    secondary?: string;
    icon?: NavigationListIconType;
    image?: string;
}

export interface NavigationListGroupInterface {
    key: string;
    text: string;
    items: NavigationListItemInterface[];
}
