import React from "react";
import {Avatar, ListItemAvatar, ListItemIcon} from "@material-ui/core";
import {NavigationListIcon} from "./NavigationListIcon";
import {NavigationListItemInterface} from "./NavigationListInterfaces";

export const NavigationListImage = (props: NavigationListItemInterface) => {

    if (undefined === props.icon && undefined === props.image) {
        return (<React.Fragment></React.Fragment>);
    }

    if (undefined !== props.icon) {

        return (
            <ListItemIcon>
                <NavigationListIcon
                    icon={props.icon}
                />
            </ListItemIcon>
        );

    }

    if (undefined !== props.image) {

        return (<ListItemAvatar>
            <Avatar
                alt={props.text}
                src={props.image}
            />
        </ListItemAvatar>);

    }
}