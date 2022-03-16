import React from 'react';
import {styled} from '@mui/system';
import {grey} from '@mui/material/colors';
import Container from '@mui/material/Container';
import {Icon} from '../Icon/Icon';
import List from '@mui/material/List';
import {Link, ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material';

const FooterStyled = styled(Container)(({ theme }) => ({
    backgroundColor: grey[300]
}));

const BlockFab = styled('div')(({ theme }) => ({
    height: 56 + parseInt(theme.spacing(2)),
    background:'red'
}));

export const Footer = () => {


    return (
        <FooterStyled
            maxWidth='md'
        >
            <List>
                <ListItem
                    disableGutters
                    component={Link}
                    href="/impressum"
                >
                    <ListItemIcon />

                    <ListItemText primary="Impressum" />
                </ListItem>
                <ListItem
                    disableGutters
                    component={Link}
                    href="https://twitter.com/zoo_wuppertal"
                >
                    <ListItemIcon>
                        <Icon
                            icon={'twitter'}
                            size={'2x'}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Twitter" />
                </ListItem>
                <ListItem
                    disableGutters
                    component={Link}
                    href="https://www.instagram.com/dergruenezoowuppertal/"
                >
                    <ListItemIcon>
                        <Icon
                            icon={'instagram'}
                            size={'2x'}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Instagram" />
                </ListItem>
                <ListItem
                    disableGutters
                    component={Link}
                    href="https://www.facebook.com/gruener.zoo.wuppertal/"
                >
                    <ListItemIcon>
                        <Icon
                            icon={'facebook'}
                            size={'2x'}
                        />
                    </ListItemIcon>
                    <ListItemText primary="Facebook" />
                </ListItem>

            </List>
            <BlockFab />
        </FooterStyled>
    );

}
