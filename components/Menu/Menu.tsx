import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Logo} from "./Logo";
import {Fab} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MapIcon from "@material-ui/icons/Map";
import PetsIcon from "@material-ui/icons/Pets";
import SearchIcon from "@material-ui/icons/Search";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import MailIcon from "@material-ui/icons/Mail";
import WcIcon from "@material-ui/icons/Wc";
import ChildFriendlyIcon from "@material-ui/icons/ChildFriendly";
import ExploreIcon from "@material-ui/icons/Explore";
import InfoIcon from "@material-ui/icons/Info";
import CodeIcon from "@material-ui/icons/Code";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import Settings from "../Navigation/Settings";

const logoDimension = 120;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginLeft: theme.spacing(2),
        },
        fab:{
            position: 'fixed',
            bottom: theme.spacing(2),
            left: theme.spacing(2),
            backgroundColor: '#00a800',
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
    }),
);

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ListItemLink = (props) => {
    return <ListItem button component="a" {...props} />;
};

export default function ButtonAppBar() {
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onClick = () => {
        console.log('onClick');
    }

    return (
        <React.Fragment>
        <Fab
            className={classes.fab}
            onClick={handleClickOpen}
        >
            <MenuIcon/>
        </Fab>
        <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Der grüne Zoo
                        </Typography>
                        <Button autoFocus color="inherit" onClick={handleClose}>
                            save
                        </Button>
                    </Toolbar>
                </AppBar>
                <List>
                    <ListItem button>
                        <ListItemText primary="Phone ringtone" secondary="Titania" />
                    </ListItem>
                    <Divider />
                    <ListItem button>
                        <ListItemText primary="Default notification ringtone" secondary="Tethys" />
                    </ListItem>
                </List>
            <List subheader={<ListSubheader  className={classes.subheader}>Hauptmenü</ListSubheader>} style={{ width:'300px'}}>
                <ListItemLink key='map' href="/" onClick={onClick}>
                    <ListItemIcon><MapIcon /></ListItemIcon>
                    <ListItemText primary='Karte' />
                </ListItemLink>
                <ListItemLink key='map' href="/facilities" onClick={onClick}>
                    <ListItemIcon><MapIcon /></ListItemIcon>
                    <ListItemText primary='Anlagen' />
                </ListItemLink>
                <ListItemLink key='leaflet' href="/leaflet" onClick={onClick}>
                    <ListItemIcon><MapIcon /></ListItemIcon>
                    <ListItemText primary='Leaflet' />
                </ListItemLink>
                <ListItemLink button key='animal' href="animals"onClick={onClick}>
                    <ListItemIcon><PetsIcon /></ListItemIcon>
                    <ListItemText primary='Tiere' />
                </ListItemLink>
                <ListItem button key='search'onClick={onClick}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary='Suche' />
                </ListItem>
            </List>
            <List subheader={<ListSubheader className={classes.subheader}>Wichtige Orte</ListSubheader>}>
                <ListItem button key='food'>
                    <ListItemIcon><FastfoodIcon /></ListItemIcon>
                    <ListItemText primary='Essen' />
                </ListItem>
                <ListItem button key='spielplätze'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Spielplätze' />
                </ListItem>
                <ListItem button key='wc'>
                    <ListItemIcon><WcIcon /></ListItemIcon>
                    <ListItemText primary='Toiletten' />
                </ListItem>
                <ListItem button key='diaper-changing'>
                    <ListItemIcon><ChildFriendlyIcon /></ListItemIcon>
                    <ListItemText primary='Wickelraum' />
                </ListItem>
            </List>
            <List subheader={<ListSubheader className={classes.subheader}>Routen</ListSubheader>}>
                <ListItem button key='route-1'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Highlights - 2h' />
                </ListItem>
                <ListItem button key='route-2'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Ein Tag im Zoo - 5h' />
                </ListItem>
                <ListItem button key='route-3'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Mit Kindern - 3h' />
                </ListItem>
                <ListItem button key='route-4'>
                    <ListItemIcon><ExploreIcon /></ListItemIcon>
                    <ListItemText primary='Senioren - 2h' />
                </ListItem>
            </List>
            <List subheader={<ListSubheader className={classes.subheader}>Diese Seite</ListSubheader>}>
                <ListItem button key='imprint'>
                    <ListItemIcon><InfoIcon /></ListItemIcon>
                    <ListItemText primary='Impressum' />
                </ListItem>
                <ListItem button key='About'>
                    <ListItemIcon><CodeIcon /></ListItemIcon>
                    <ListItemText primary='Über' />
                </ListItem>
                <ListItem button key='Documentation'>
                    <ListItemIcon><MenuBookIcon /></ListItemIcon>
                    <ListItemText primary='Dokumentation' />
                </ListItem>
            </List>
            <Settings></Settings>

            </Dialog>
        <Logo />
        </React.Fragment>
    );
}
