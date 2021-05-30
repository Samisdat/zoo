import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ListItem, ListItemText} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import {Home} from "@material-ui/icons";
import List from "@material-ui/core/List";
import CloseIcon from "@material-ui/icons/Close";
import MenuIcon from "@material-ui/icons/Menu";

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

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        root: {
            flexGrow: 1,
        },
        toolbarPadding:{
            ...theme.mixins.toolbar,
        },
        navbarDisplayFlex: {
            display: `flex`,
            justifyContent: `space-between`
        },
        navDisplayFlex: {
            display: `flex`,
            justifyContent: `space-between`
        },
        linkText: {
            textDecoration: `none`,
            textTransform: `uppercase`,
            color: `white`
        },
        title: {
            display: `flex`,
            justifyContent: `space-between`,
            marginLeft: theme.spacing(2),
            flex: 1,
            flexGrow: 1,
            verticalAlign: 'middle',
        },
    })
});

const navLinks = [
    { title: `about us`, path: `/about-us` },
    { title: `product`, path: `/product` },
    { title: `blog`, path: `/blog` },
    { title: `contact`, path: `/contact` },
    { title: `faq`, path: `/faq` }
];

export default function NavigationMedium(props: Props) {

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.toolbarPadding}></div>
            <HideOnScroll {...props}>
                <AppBar>
                    <Toolbar>
                        <Container className={classes.navbarDisplayFlex}>
                            <IconButton edge="start" color="inherit">
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
                        </Container>

                    </Toolbar>
                </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );
}
