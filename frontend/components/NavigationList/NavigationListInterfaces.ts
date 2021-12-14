import {NavigationListIconType} from "./NavigationListIcon";
import {IconName} from "../Icon/IconNames";

export interface NavigationListItemInterface {
    key: string;
    href?: string;
    text: string;
    secondary?: string;
    icon?: IconName;
    image?: string;
}

export interface NavigationListGroupInterface {
    key: string;
    text: string;
    items: NavigationListItemInterface[];
}
