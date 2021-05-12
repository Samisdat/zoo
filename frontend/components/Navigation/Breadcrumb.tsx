import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        link: {
            display: 'flex',
        },
        icon: {
            marginRight: theme.spacing(0.5),
            width: 20,
            height: 20,
        },
    }),
);

function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

export function Breadcrumb() {
    const classes = useStyles();

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" onClick={handleClick} className={classes.link}>
                <HomeIcon className={classes.icon} />
                Startseite
            </Link>
            <Link
                color="inherit"
                href="/getting-started/installation/"
                onClick={handleClick}
                className={classes.link}
            >
                <PetsIcon className={classes.icon} />
                Tiere
            </Link>
            <Link
                color="inherit"
                href="/getting-started/installation/"
                onClick={handleClick}
                className={classes.link}
            >
                Orange-Utan
            </Link>
        </Breadcrumbs>
    );
}
