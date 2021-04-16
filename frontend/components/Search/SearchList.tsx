import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import {Feature} from "geojson";
import {Avatar, ListItemAvatar} from "@material-ui/core";
import {MapElementInterface} from "../../data-api/map-elements";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.background.paper,
            position: 'absolute',
            top:56,
            /*top: 150 + 56,*/
            bottom:0,
            left:0,
            right:0,
            overflow: 'auto',
        },
        listSection: {
            backgroundColor: 'inherit',
        },
        ul: {
            backgroundColor: 'inherit',
            padding: 0,
        },
        inline: {
            display: 'inline',
        },
    }),
);

interface OrderedMapElements{
    [index: string]: MapElementInterface[];
}

interface PinnedSubheaderListProperties {
    ordered:OrderedMapElements;
    handleClickItem:Function;
}

export default function PinnedSubheaderList(props:PinnedSubheaderListProperties) {

    console.log(props)

    const classes = useStyles();

    const onListItemClick = (item:MapElementInterface) => {

        props.handleClickItem(item);
    };

    return (
        <List
            className={classes.root}
            subheader={<li />}
        >
            {Object.entries(props.ordered).map((key, value)=>(
                    <li key={`section-${key[0]}`} className={classes.listSection}>
                        <ul className={classes.ul}>
                            <ListSubheader>{key[0].toUpperCase()}</ListSubheader>
                            {(key[1] as MapElementInterface[]).map((item:MapElementInterface, index) => {
                                const thumbnail = `http://127.0.0.1:1337${item.properties.photo?.image?.formats?.thumbnail?.url}`;
                                return(
                                    <ListItem
                                        alignItems="flex-start"
                                        onClick={()=>{onListItemClick(item)}}
                                    >
                                        <ListItemAvatar>
                                            <Avatar
                                                alt={item.properties.facility.title}
                                                src={thumbnail}
                                            />
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={item.properties.facility.title}
                                            secondary='Lorem Ipsum'
                                        />
                                    </ListItem>
                                )})}
                        </ul>
                    </li>


            ))}
            <ListItem
                style={{
                    height: 70
                }}
            >empty</ListItem>
        </List>
    );
}
