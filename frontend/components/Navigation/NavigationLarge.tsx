import React, {useState} from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import List from "@material-ui/core/List";
import {Divider, Drawer, Link, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Container from "@material-ui/core/Container";
import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";
import {StaticLogo} from "./StaticLogo";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {NavigationList} from "../NavigationList/NavigationList";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root:{
            position: 'relative',

            flexGrow: 1,
            display: 'flex',
            ...theme.mixins.toolbar,
        },
        menu:{
            ...theme.mixins.toolbar,
            display:'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        navDisplayFlex: {
            display: `flex`,

        },
        linkText: {
            textDecoration: `none`,
            color: `white`
        },
        list: {
            width: 400,
        },
        toolbarPadding:{
            ...theme.mixins.toolbar,
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
        <Slide appear={false} direction="down" in={true}>
            {children}
        </Slide>
    );
}

export const NavigationLarge = (props) => {

    const navigationCategories = props.categories as NavigationListGroupInterface[];

    const mainItems = navigationCategories.find((navigationCategory)=>{
        return ('main' === navigationCategory.key);
    });

    const classes = useStyles();

    const [open, setOpen] = useState<boolean>(false);

    const toggleDrawer = (nextOpen: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        setOpen(nextOpen);
        console.log(open)
    };

    return(
        <React.Fragment>
            <Drawer open={open} onClose={toggleDrawer(false)}>
                <div className={classes.list}>
                    <NavigationList
                        groups={navigationCategories}
                    />
                </div>
            </Drawer>
            <div className={classes.toolbarPadding}></div>
            <HideOnScroll {...props}>

            <AppBar>
                <Toolbar>
                    <Container maxWidth="md">
                        <div className={classes.root}>
                            <Link
                                className={classes.menu}
                                onClick={toggleDrawer(true)}
                                color="inherit">
                                <MenuIcon/>
                            </Link>
                            <List
                                component="nav"
                                className={classes.navDisplayFlex}
                                disablePadding
                            >
                                {mainItems.items.map((item) => (
                                        <Link className={classes.menu} href={item.href}  color="inherit">
                                            <ListItem button>
                                                <ListItemText
                                                    primaryTypographyProps={{variant:'h6'}}
                                                    primary={item.text}
                                                />
                                            </ListItem>
                                        </Link>
                                ))}
                            </List>
                            <StaticLogo/>
                        </div>
                    </Container>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
        </React.Fragment>
    );

}
