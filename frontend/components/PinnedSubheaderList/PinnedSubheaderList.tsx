import React from 'react';
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Avatar, ListItemAvatar} from "@material-ui/core";
import ListItemText from "@material-ui/core/ListItemText";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import PetsIcon from "@material-ui/icons/Pets";
import BookIcon from "@material-ui/icons/Book";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import CodeIcon from "@material-ui/icons/Code";
import StoreIcon from "@material-ui/icons/Store";
import MapIcon from "@material-ui/icons/Map";

export type PinnedListItemIcon = 'Map' | 'Pets' | 'Store' | 'Book' | 'Code' | 'MenuBook';

export interface PinnedSubheaderListItemProps{
    key: string;
    href?: string;
    text: string;
    secondary?: string;
    icon?: PinnedListItemIcon;
    image?: string;
}

export interface PinnedSubheaderListGroupProps{
    key: string;
    text: string;
    items: PinnedSubheaderListItemProps[];
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        list: {
            marginBottom: theme.spacing(2),
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
        },
    })
);

export const PinnedSubheaderIcon = (props) => {

    const icon: PinnedListItemIcon = props.icon as PinnedListItemIcon;

    if('Map' === icon){
        return (<MapIcon />);
    }

    if('Pets' === icon){
        return (<PetsIcon />);
    }

    if('Store' === icon){
        return (<StoreIcon />);
    }

    if('Book' === icon){
        return (<BookIcon />);
    }

    if('Code' === icon){
        return (<CodeIcon />);
    }

    if('MenuBook' === icon){
        return (<MenuBookIcon />);
    }

}

export const PinnedSubheaderImage = (props:PinnedSubheaderListItemProps) => {

    if(undefined === props.icon && undefined === props.image){
        return (<React.Fragment></React.Fragment>);
    }

    if(undefined !== props.icon){

        return (
            <ListItemIcon>
                <PinnedSubheaderIcon
                    icon={props.icon}
                />
            </ListItemIcon>
        );

    }

    if(undefined !== props.image) {

        return (<ListItemAvatar>
            <Avatar
                alt={props.text}
                src={props.image}
            />
        </ListItemAvatar>);

    }
}

export interface PinnedSubheaderItemProps{
    item:PinnedSubheaderListItemProps,
    handleClickItem?: Function
}

export const PinnedSubheaderItem = (props:PinnedSubheaderItemProps) => {

    const item = props.item;
    const handleClickItem = props.handleClickItem;

    const onListItemClick = (item:PinnedSubheaderListItemProps) => {

        if(undefined === handleClickItem){
            return;
        }

        handleClickItem(item.key);
    };


    return (
        <React.Fragment>
        <ListItem
            button={true}
            component="a"
            onClick={()=>{onListItemClick(item)}}
            {...item}
        >
            <PinnedSubheaderImage {...item} />
            <ListItemText
                primary={item.text}
                secondary={item.secondary}
            />
        </ListItem>
        </React.Fragment>
    );

}

export interface PinnedSubheaderGroup{
    group:PinnedSubheaderListGroupProps,
    handleClickItem?: Function
}

export const PinnedSubheaderGroup = (props:PinnedSubheaderGroup) => {

    const group = props.group;
    const handleClickItem = props.handleClickItem;

    const classes = useStyles();

    return (
        <React.Fragment>
            <ListSubheader className={classes.subheader}>{group.text}</ListSubheader>
            {
                Object.entries(group.items).map(([key, item], i)=>{
                    return (
                        <PinnedSubheaderItem
                            handleClickItem={handleClickItem}
                            item={item}
                        />
                    )
                })
            }

        </React.Fragment>
    );

};

export interface PinnedSubheaderListProps{
    groups:PinnedSubheaderListGroupProps[],
    handleClickItem?: Function
}

export const PinnedSubheaderList = (props:PinnedSubheaderListProps) => {

    const groups = props.groups;
    const handleClickItem = props.handleClickItem;

    const classes = useStyles();

    return (
        <List className={classes.list}>
            {
                Object.entries(groups).map(([key, group], i)=>{
                    return (
                        <PinnedSubheaderGroup
                            key={group.key}
                            group={group}
                            handleClickItem={handleClickItem}
                        />
                    )
                })
            }
        </List>
    );
}

