import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";
import List from "@material-ui/core/List";
import {ListItem, ListItemText} from "@material-ui/core";
import Container from "@material-ui/core/Container";

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

const navLinks = [
    { title: `Der grüne Zoo`, path: `/about-us` },
    { title: `product`, path: `/product` },
    { title: `blog`, path: `/blog` },
    { title: `contact`, path: `/contact` },
    { title: `faq`, path: `/faq` }
];

export const NavigationMedium = (props) => {

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.toolbarPadding}></div>
            <HideOnScroll {...props}>
            <AppBar>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Der grüne Zoo
                    </Typography>
                    <List
                        component="nav"
                        className={classes.navDisplayFlex}
                    >
                        {navLinks.map(({ title, path }) => (
                            <a href={path} key={title} className={classes.linkText}>
                                <ListItem button>
                                    <ListItemText primary={title} />
                                </ListItem>
                            </a>
                        ))}
                    </List>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
        </div>
    );
}
