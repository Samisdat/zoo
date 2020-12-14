import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const useStyles = makeStyles({
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
});

export default function TemporaryDrawer(props) {

    return (
        <Drawer anchor='right' open={props.openSideMenu}>
            <List>
                <ListItem button key='Inbox1'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Inbox' />
                </ListItem>
                <ListItem button key='Starred1'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Starred' />
                </ListItem>
                <ListItem button key='Send email1'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Send email' />
                </ListItem>
                <ListItem button key='Drafts1'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Drafts' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key='Inbox2'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Inbox' />
                </ListItem>
                <ListItem button key='Starred2'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Starred' />
                </ListItem>
                <ListItem button key='Send email2'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Send email' />
                </ListItem>
                <ListItem button key='Drafts2'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Drafts' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key='Inbox2'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Inbox' />
                </ListItem>
                <ListItem button key='Starred2'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Starred' />
                </ListItem>
                <ListItem button key='Send email2'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Send email' />
                </ListItem>
                <ListItem button key='Drafts2'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Drafts' />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key='Inbox3'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Inbox' />
                </ListItem>
                <ListItem button key='Starred3'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Starred' />
                </ListItem>
                <ListItem button key='Send email3'>
                    <ListItemIcon><InboxIcon /></ListItemIcon>
                    <ListItemText primary='Send email' />
                </ListItem>
                <ListItem button key='Drafts3'>
                    <ListItemIcon><MailIcon /></ListItemIcon>
                    <ListItemText primary='Drafts' />
                </ListItem>
            </List>
        </Drawer>
    );
}
