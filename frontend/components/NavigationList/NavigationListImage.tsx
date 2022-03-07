import React from "react";
import Avatar from '@mui/material/Avatar';
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemIcon from '@mui/material/ListItemIcon';

import {NavigationListItemInterface} from "./NavigationListInterfaces";
import {Icon} from "../Icon/Icon";
import {styled} from "@mui/material/styles";

export const LargeListItemAvatar = styled(ListItemAvatar)(({ theme }) => ({
    height: theme.spacing(7),
    minWidth: theme.spacing(9),
}));

export const LargeAvatar = styled(Avatar)(({ theme }) => ({
    width: theme.spacing(7),
    height: theme.spacing(7),
}));


export const NavigationListImage = (props: NavigationListItemInterface) => {

    if (undefined === props.icon && undefined === props.image) {
        return (<React.Fragment></React.Fragment>);
    }

    if (undefined !== props.icon) {

        return (
            <ListItemIcon>
                <Icon
                    icon={props.icon}
                    size="lg"
                />
            </ListItemIcon>
        );

    }

    if (undefined !== props.image) {

        return (
            <LargeListItemAvatar>
                <LargeAvatar
                    alt={props.text}
                    src={props.image}
                />
            </LargeListItemAvatar>
        );

    }
}