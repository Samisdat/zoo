import React from "react";
import {Avatar, ListItemAvatar, ListItemIcon} from "@material-ui/core";
import {NavigationListIcon} from "./NavigationListIcon";
import {NavigationListItemInterface} from "./NavigationListInterfaces";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        large: {
            height: theme.spacing(7),
            minWidth: theme.spacing(9),
        },
        largeAvatar: {
            width: theme.spacing(7),
            height: theme.spacing(7),
        },
    })
);

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

    const classes = useStyles();

    if (undefined !== props.image) {

        return (<ListItemAvatar
            className={classes.large}
        >
            <Avatar
                className={classes.largeAvatar}
                alt={props.text}
                src={props.image}
            />
        </ListItemAvatar>);

    }
}