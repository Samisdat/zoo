import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import {Link, ListItem, ListItemText} from "@material-ui/core";
import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";
import {Icon} from "../Icon/Icon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            flexDirection: 'inherit',
        },
        toolbarPadding:{
            ...theme.mixins.toolbar,
        },
        menuButton: {
            marginRight: theme.spacing(1),
        },
        title: {
            flexGrow: 1,
        },
        navDisplayFlex: {
            display: `flex`,
            justifyContent: `space-between`,
            marginLeft: theme.spacing(2),
        },
        linkText: {
            textDecoration: `none`,
            color: `white`
        },
    }),
);

interface Props {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

export const NavigationMedium = (props) => {

    const navigationCategories = props.categories as NavigationListGroupInterface[];

    const mainItems = navigationCategories.find((navigationCategory)=>{
        return ('main' === navigationCategory.key);
    });

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.toolbarPadding}></div>
            <HideOnScroll {...props}>
            <AppBar className={classes.root}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <Icon
                            icon={'menu'}
                            size={'lg'}
                        />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Der grüne Zoo
                    </Typography>
                    <List
                        component="nav"
                        className={classes.navDisplayFlex}
                    >
                        {mainItems.items.map((item) => (
                            <a href={item.href} key={item.key} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}
