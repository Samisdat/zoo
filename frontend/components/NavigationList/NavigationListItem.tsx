import React from "react";
import ListItem from "@material-ui/core/ListItem";
import {NavigationListImage} from "./NavigationListImage";
import ListItemText from "@material-ui/core/ListItemText";
import {NavigationListItemInterface} from "./NavigationListInterfaces";


export interface NavigationListItemProps {
    item: NavigationListItemInterface,
    handleClickItem?: Function
}

export const NavigationListItem = (props: NavigationListItemProps) => {

    const item = props.item;
    const handleClickItem = props.handleClickItem;

    const onListItemClick = (item: NavigationListItemInterface) => {

        if (undefined === handleClickItem) {
            return;
        }

        handleClickItem(item.key);
    };

    const inset = (undefined === item.icon && item.icon === item.image) ? true : false;

    return (
        <React.Fragment>
            <ListItem
                button={true}
                component="a"
                onClick={() => {
                    onListItemClick(item)
                }}
                {...item}
            >
                <NavigationListImage {...item} />
                <ListItemText
                    inset={inset}
                    primary={item.text}
                    secondary={item.secondary}
                />
            </ListItem>
        </React.Fragment>
    );

}