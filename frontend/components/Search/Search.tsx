import React, {useEffect} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Paper, Fab, Link} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import {NavigationList} from "../NavigationList/NavigationList";
import {groupByFirstLetter} from "../NavigationList/groupByFirstLetter";
import {NavigationListItemInterface} from "../NavigationList/NavigationListInterfaces";
import {useMap} from "../Map/Context/MapContext";
import {Icon} from "../Icon/Icon";
import {Facility} from "strapi-api/entity/facility/facility";


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
    facilities:Facility[];
};

export default function SearchDialog({facilities}:SearchDialogProperties) {

    const { dispatch } = useMap()

    const classes = useStyles();

    const listItems:NavigationListItemInterface[] = facilities.map((facility):NavigationListItemInterface=>{

        const listItem: NavigationListItemInterface = {
            key: facility.slug,
            text: facility.title,
        };

        let image:string = undefined;

        if(0 !== facility.photos.length && undefined !== facility.photos[0] && facility.photos[0].thumbnail){
            image = `http://127.0.0.1:1337${facility.photos[0].thumbnail.src}`
        }

        if(undefined !== image){
            listItem.image = image;
        }

        return listItem;
    });

    const listGroups = groupByFirstLetter('facilities', listItems);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickItem = (itemKey:string) => {

        setOpen(false);

        const focus = facilities.find((facility)=>{
            return (itemKey === facility.slug);
        });

        dispatch({
            type: 'SET_ZOOM_AND_PAN',
            center: [itemKey]
        });


        dispatch({
            type: 'SET_TEASER',
            teaser: focus
        });

    };

    return (
        <React.Fragment>
            <Paper
                elevation={3}
                className={classes.expandHandle}
                onClick={handleClickOpen}
                square={true}
            >
                <Icon
                    icon={'chevron_down'}
                    size={'lg'}
                />
            </Paper>
            <Dialog
                fullScreen
                /*open={true}*/
                open={open}
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
                            <Icon
                                icon={'close'}
                                size={'sm'}
                            />
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
                <NavigationList
                    handleClickItem={handleClickItem}
                    groups={listGroups}
                />
                <Fab
                    color="primary"
                    className={classes.fab}
                    onClick={handleClose}
                    style={{
                        zIndex:5
                    }}
                >
                    <Icon
                        icon={'close'}
                        size={'lg'}
                    />
                </Fab>

            </Dialog>
        </React.Fragment>
    );
}
