import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Paper, Fab} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {Feature} from "geojson";
import PinnedSubheaderList from "./SearchList";
import ChipsArray from "./Chips";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        listRoot: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
        fab:{
            position: 'fixed',
            bottom: theme.spacing(2),
            left: theme.spacing(2),
            color: '#fff'
        },
        appBar: {
            position: 'relative',
        },
        title: {
            marginLeft: theme.spacing(2),
            flex: 1,
        },
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
        subheader: {
            backgroundColor: theme.palette.background.paper,
        },
        expandHandle:{
            position: 'absolute',
            top:0,
            left:0,
            width:'100%',
            height:32,
            background: 'rgba(255,255,255,0.7)',
            textAlign:'center'
        },
        strechedIcon:{
            transform: 'scale(3,1)'
        }
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export interface SearchDialogProperties{
    mapElements:MapElement[];
    setFocus:Function;
};

export default function SearchDialog(props:SearchDialogProperties) {
    const classes = useStyles();

    const options = props.mapElements.filter((mapElement:MapElement) => {


        if('box' !== mapElement.properties.type){
            return false;
        }

        if(!mapElement.properties.facility){
            return false;
        }

        if('playground' === mapElement.properties.facility.type){
            return true;
        }

        if('food' === mapElement.properties.facility.type){
            return true;
        }

        if('poi' === mapElement.properties.facility.type){
            return true;
        }

        if('enclosure' === mapElement.properties.facility.type){
            return true;
        }

        return false;

    });

    let group = options
        .reduce((r, e) => {

            let firstLetter = e.properties.facility.title[0].toLowerCase();

            firstLetter = firstLetter
                .replace('ä', 'a')
                .replace('ü', 'u')
                .replace('ö', 'o')
            ;

            if(undefined === r[firstLetter]) {
                r[firstLetter] = []
            }

            r[firstLetter].push(e);

            return r;

        }, {});


    const ordered = {};
    Object.keys(group).sort().forEach(function(key) {
        ordered[key] = group[key];
    });

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {

        console.log('handleClickOpen')

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickItem = (item:MapElement) => {

        setOpen(false);

        props.setFocus(item);
    };

    return (
        <React.Fragment>
            <Paper
                elevation={3}
                className={classes.expandHandle}
                onClick={handleClickOpen}
                square={true}
            >
                <ExpandMoreIcon
                    fontSize={"large"}
                />
            </Paper>
            <Dialog
                fullScreen
                open={true}/*open={open}*/
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <AppBar
                    className={classes.appBar}
                >
                    <Toolbar
                        color="primary"
                    >
                        <Typography variant="h6" className={classes.title}>
                            Auf der Karte zeigen
                        </Typography>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                {/*
                <Box
                    style={{
                        height:'150px',
                        background:'red',
                    }}
                >
                    <ChipsArray />
                </Box>
                */}
                <PinnedSubheaderList
                    ordered={ordered}
                    handleClickItem={handleClickItem}
                />
                <Fab
                    color="primary"
                    className={classes.fab}
                    onClick={handleClose}
                    style={{
                        zIndex:5
                    }}
                >
                    <CloseIcon/>
                </Fab>

            </Dialog>
        </React.Fragment>
    );
}
