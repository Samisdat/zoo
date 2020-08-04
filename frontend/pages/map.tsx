import React from 'react';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import styles from '../styles/Home.module.css'

export default function Map() {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

  return (
    <div className={styles.container}>
        <IconButton color="secondary" onClick={handleClick}>
            <DeleteIcon />
        </IconButton>
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
        <Button variant="contained" color="secondary">
            Secondary
        </Button>
    </div>
  )
}
