import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import {Logo} from "./Logo";
import {Fab, Icon} from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
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
import CodeIcon from "@material-ui/icons/Code";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import BookIcon from '@material-ui/icons/Book';
import StoreIcon from '@material-ui/icons/Store';
import {NavigationCategory, NavigationIconType, NavigationItem} from "./NavigationCategory";

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
            /*backgroundColor: '#00a800',*/
            color: '#fff',
            zIndex:10,
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

const NavigationIcon = (props) => {

    const icon = props.icon as NavigationIconType;

    if(icon === 'Map'){
        return (<MapIcon />);
    }

    if(icon === 'Pets'){
        return (<PetsIcon />);
    }

    if(icon === 'Store'){
        return (<StoreIcon />);
    }

    if(icon === 'Book'){
        return (<BookIcon />);
    }

    if(icon === 'Code'){
        return (<CodeIcon />);
    }

    if(icon === 'MenuBook'){
        return (<MenuBookIcon />);
    }


};


const NavigationCategoryItem = (props:NavigationItem) => {

    return (
        <ListItemLink href={props.href}>
            <ListItemIcon><NavigationIcon icon={props.icon} /></ListItemIcon>
            <ListItemText primary={props.text} />
        </ListItemLink>
    );
};

const NavigationCategoryList = (props) => {

    const category = props.category as NavigationCategory;

    const classes = useStyles();

    return (
        <List
            subheader={<ListSubheader  className={classes.subheader}>{category.text}</ListSubheader>}
            style={{ width:'300px'}}
        >
            {
                category.items.map((item) => {
                    return (
                        <NavigationCategoryItem {...item} />
                    );
                })
            }

        </List>
    );

};

export default function NavigationMobile(props) {

    const navigationCategories = props.categories as NavigationCategory[];

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <React.Fragment>

                <Fab
                    color="primary"
                    className={classes.fab}
                    onClick={handleClickOpen}
                >
                    <MenuIcon/>
                </Fab>
        <Dialog
            fullScreen
            open={/*true*/open}
            onClose={handleClose}
            TransitionComponent={Transition}
        >
                <AppBar className={classes.appBar}>
                    <Toolbar
                        color="primary"
                    >
                        <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Der grüne Zoo
                        </Typography>
                    </Toolbar>
                </AppBar>

            {
                navigationCategories.map((navigationCategory) => {
                    return (
                        <NavigationCategoryList category={navigationCategory}></NavigationCategoryList>
                    );
                })
            }
            <ListItem>Empty</ListItem>;
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
        <Logo />
        </React.Fragment>
    );
}
