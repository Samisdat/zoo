import React from 'react';
import { default as MuiPaper } from '@mui/material/Paper';
import { default as MuiFab} from '@mui/material/Fab';
import Dialog from '@mui/material/Dialog';
import { default as MuiAppBar} from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import {NavigationList} from '../NavigationList/NavigationList';
import {groupByFirstLetter} from '../NavigationList/groupByFirstLetter';
import {NavigationListItemInterface} from '../NavigationList/NavigationListInterfaces';
import {useMap} from '../Map/Context/MapContext';
import {Icon} from '../Icon/Icon';
import {Facility} from 'strapi-api/entity/facility/facility';
import {styled} from '@mui/material/styles';
import {getImagePath} from "../../helper/getImagePath";

const ExpandHandle = styled(MuiPaper)(({ theme }) => ({
    position: 'absolute',
    top:0,
    left:0,
    width:'100%',
    height:32,
    background: 'rgba(255,255,255,0.7)',
    textAlign:'center'
}));

const AppBar = styled(MuiAppBar)(({ theme }) => ({
    position: 'relative',
}));

const Fab = styled(MuiFab)(({ theme }) => ({
    position: 'fixed',
    bottom: theme.spacing(2),
    left: theme.spacing(2),
    color: '#fff'
}));

const Title = styled(Typography)(({ theme }) => ({
    marginLeft: theme.spacing(2),
    flex: 1,
}));

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="down" ref={ref} {...props} />;
});

export interface SearchDialogProperties{
    facilities:Facility[];
}

export default function SearchDialog({facilities}:SearchDialogProperties) {

    const { dispatch } = useMap()

    const listItems:NavigationListItemInterface[] = facilities.map((facility):NavigationListItemInterface=>{

        const listItem: NavigationListItemInterface = {
            key: facility.slug,
            text: facility.title,
        };

        let image:string = undefined;

        if(0 !== facility.photos.length && undefined !== facility.photos[0] && facility.photos[0].thumbnail){
            image = getImagePath(facility.photos[0].thumbnail.src);
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
            type: 'SET_FOCUS',
            focus: [itemKey]
        });


        dispatch({
            type: 'SET_TEASER',
            teaser: focus
        });

    };

    return (
        <React.Fragment>
            <ExpandHandle
                elevation={3}
                onClick={handleClickOpen}
                square={true}
            >
                <Icon
                    icon={'chevron_down'}
                    size={'lg'}
                />
            </ExpandHandle>
            <Dialog
                fullScreen
                /*open={true}*/
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >

                <AppBar>
                    <Toolbar
                        color="primary"
                    >
                        <Title variant="h6">
                            Auf der Karte zeigen
                        </Title>
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
