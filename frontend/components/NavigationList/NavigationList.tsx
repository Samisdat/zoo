import React from 'react';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {NavigationListGroup} from "./NavigationListGroup";
import {useNavigationListStyles} from "./useNavigationListStyles";
import {NavigationListGroupInterface} from "./NavigationListInterfaces";

export interface NavigationListProps {
    groups:NavigationListGroupInterface[],
    handleClickItem?: Function
}

export const NavigationList = (props:NavigationListProps) => {

    const groups = props.groups;
    const handleClickItem = props.handleClickItem;

    const classes = useNavigationListStyles();

    return (
        <List className={classes.list}>
            {
                Object.entries(groups).map(([key, group], i)=>{
                    return (
                        <NavigationListGroup
                            key={group.key}
                            group={group}
                            handleClickItem={handleClickItem}
                        />
                    )
                })
            }
            <ListItem style={{height:56}}></ListItem>
        </List>
    );
}

