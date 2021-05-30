import React from "react";

import MapIcon from "@material-ui/icons/Map";
import PetsIcon from "@material-ui/icons/Pets";
import StoreIcon from "@material-ui/icons/Store";
import BookIcon from "@material-ui/icons/Book";
import CodeIcon from "@material-ui/icons/Code";
import MenuBookIcon from "@material-ui/icons/MenuBook";

export type NavigationListIconType = 'Map' | 'Pets' | 'Store' | 'Book' | 'Code' | 'MenuBook';

export interface NavigationListIconProps {
    icon: NavigationListIconType;
}

export const NavigationListIcon = ({icon}: NavigationListIconProps) => {

    if ('Map' === icon) {
        return (<MapIcon/>);
    }

    if ('Pets' === icon) {
        return (<PetsIcon/>);
    }

    if ('Store' === icon) {
        return (<StoreIcon/>);
    }

    if ('Book' === icon) {
        return (<BookIcon/>);
    }

    if ('Code' === icon) {
        return (<CodeIcon/>);
    }

    if ('MenuBook' === icon) {
        return (<MenuBookIcon/>);
    }

    return (<React.Fragment/>);

}