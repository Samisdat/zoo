import React from "react";
import Link from 'next/link'
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import {NavigationListImage} from "./NavigationListImage";
import {NavigationListItemInterface} from "./NavigationListInterfaces";

export interface NavigationListItemProps {
    item: NavigationListItemInterface,
    handleClickItem?: Function
}

const LinkIfPossible = (props) => {

    if(!props.href){

        console.log(props.href)

        return (props.children);
    }

    return (
        <Link
            href={props.href}
        >
            {props.children}
        </Link>
    )
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
        <LinkIfPossible
            href={item.href}
        >
            <ListItem
                button={true}
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
        </LinkIfPossible>
    );

}