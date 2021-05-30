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
import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";
import {StaticLogo} from "./StaticLogo";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            flexDirection: 'inherit',
        },
        toolbarPadding:{
            ...theme.mixins.toolbar,
            paddingTop:20
        },
        menuButton: {
            marginLeft: theme.spacing(0),
        },
        title: {
            flexGrow: 1,
        },
        navDisplayFlex: {
            display: `flex`,

        },
        linkText: {
            textDecoration: `none`,
            color: `white`
        },
    }),
);

export const NavigationLarge = (props) => {

    const navigationCategories = props.categories as NavigationListGroupInterface[];

    const mainItems = navigationCategories.find((navigationCategory)=>{
        return ('main' === navigationCategory.key);
    });

    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.toolbarPadding}></div>

            <AppBar>
                <Toolbar>
                    <Container maxWidth="md" style={{display:'flex', position:'relative'}}>

                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>
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
                        <StaticLogo/>
                    </Container>
                </Toolbar>
            </AppBar>

        </React.Fragment>
    );
}
