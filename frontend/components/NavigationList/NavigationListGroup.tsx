import React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import {NavigationListItem} from './NavigationListItem';
import {NavigationListGroupInterface} from './NavigationListInterfaces';

export interface NavigationListGroupProps {
    group: NavigationListGroupInterface;
    handleClickItem?: (key:string) => void;
}

export const NavigationListGroup = (props: NavigationListGroupProps) => {

    const group = props.group;
    const handleClickItem = props.handleClickItem;

    return (
        <React.Fragment>
            <ListSubheader>{group.text}</ListSubheader>
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