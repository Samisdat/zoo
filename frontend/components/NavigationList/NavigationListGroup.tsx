import React from "react";
import ListSubheader from "@material-ui/core/ListSubheader";
import {NavigationListItem} from "./NavigationListItem";
import {useNavigationListStyles} from "./useNavigationListStyles";
import {NavigationListGroupInterface} from "./NavigationListInterfaces";

export interface NavigationListGroupProps {
    group: NavigationListGroupInterface,
    handleClickItem?: Function
}

export const NavigationListGroup = (props: NavigationListGroupProps) => {

    const group = props.group;
    const handleClickItem = props.handleClickItem;

    const classes = useNavigationListStyles();

    return (
        <React.Fragment>
            <ListSubheader className={classes.subheader}>{group.text}</ListSubheader>
            {
                Object.entries(group.items).map(([key, item], i) => {
                    return (
                        <NavigationListItem
                            key={item.key}
                            handleClickItem={handleClickItem}
                            item={item}
                        />
                    )
                })
            }

        </React.Fragment>
    );

};