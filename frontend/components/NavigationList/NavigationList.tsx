import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import {NavigationListGroup} from './NavigationListGroup';
import {NavigationListGroupInterface} from './NavigationListInterfaces';
import {styled} from '@mui/material/styles';

export interface NavigationListProps {
    groups:NavigationListGroupInterface[];
    handleClickItem?: (key:string) => void;
}

export const StyledNavigationList = styled(List)(({ theme }) => ({
    marginBottom: theme.spacing(2),
}));

export const NavigationList = (props:NavigationListProps) => {

    const groups = props.groups;
    const handleClickItem = props.handleClickItem;

    return (
        <StyledNavigationList>
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
        </StyledNavigationList>
    );
}

