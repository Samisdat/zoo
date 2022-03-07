import React, {useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {default as MuiList} from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import {default as MuiLink} from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Container from '@mui/material/Container';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';

import {NavigationListGroupInterface} from "../NavigationList/NavigationListInterfaces";
import {StaticLogo} from "./StaticLogo";
import {NavigationList} from "../NavigationList/NavigationList";
import {Icon} from "../Icon/Icon";
import {styled} from "@mui/material/styles";

export const Root = styled('div')(({ theme }) => ({
    position: 'relative',
    flexGrow: 1,
    display: 'flex',
}));

export const Link = styled(MuiLink)(({ theme }) => ({
    display:'flex',
    flexDirection: 'column',
    justifyContent: 'center',
}));

export const List = styled(MuiList)(({ theme }) => ({
    display: `flex`,
}));

export const Foo = styled('div')(({ theme }) => ({
    width: 400,
}));

export const ToolbarPadding = styled('div')(({ theme }) => ({
    /*...theme.mixins.toolbar.,*/
}));

export const LogoBar = styled('div')(({ theme }) => ({
    position: 'relative'
}));

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

export const NavigationLarge = (props) => {

    const navigationCategories = props.categories as NavigationListGroupInterface[];

    const mainItems = navigationCategories.find((navigationCategory)=>{
        return ('main' === navigationCategory.key);
    });

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
                <Foo>
                    <NavigationList
                        groups={navigationCategories}
                    />
                </Foo>
            </Drawer>
            <ToolbarPadding />

            <HideOnScroll {...props}>

            <AppBar
                position="sticky"
            >
                <Toolbar
                    disableGutters={true}
                >
                    <Container
                        maxWidth="md"
                    >
                        <Root>
                            <Link
                                    onClick={toggleDrawer(true)}
                                color="inherit">
                                <Icon
                                    icon={'menu'}
                                    size={'lg'}
                                />
                            </Link>
                            <List
                                disablePadding
                            >
                                {mainItems.items.map((item) => (
                                        <Link href={item.href}  color="inherit">
                                            <ListItem button>
                                                <ListItemText
                                                    primaryTypographyProps={{variant:'h6'}}
                                                    primary={item.text}
                                                />
                                            </ListItem>
                                        </Link>
                                ))}
                            </List>
                        </Root>
                    </Container>
                </Toolbar>
            </AppBar>
            </HideOnScroll>
            <AppBar
                color={'transparent'}
                elevation={0}
            >
                <Container
                    maxWidth="md"
                >
                    <LogoBar>
                        <StaticLogo/>
                    </LogoBar>

                </Container>
            </AppBar>
        </React.Fragment>
    );

}
