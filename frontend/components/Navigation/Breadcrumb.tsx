import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
import Icon from '@material-ui/core/Icon'
import exp from "constants";
import Container from "@material-ui/core/Container";
import BookIcon from '@material-ui/icons/Book';

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

export type BreadcumbCategoryIcon = 'pet' | 'building' | 'blog';

export interface BreadcrumbLink {
    href:string;
    title:string;
}

export interface BreadcrumbCategoryLink extends BreadcrumbLink{
    icon:BreadcumbCategoryIcon
}

export interface BreadcrumbProps{
    category:BreadcrumbCategoryLink,
    page:BreadcrumbLink,
}

export const Breadcrumb = (props:BreadcrumbProps)    => {

    const classes = useStyles();

    const getIcon = (categoryIcon:BreadcumbCategoryIcon) => {

        if('pet' === categoryIcon){
            return (<PetsIcon className={classes.icon} />);
        }

        if('blog' === categoryIcon){
            return (<BookIcon className={classes.icon} />);
        }

    };

    return (
        <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" href="/" className={classes.link}>
                <HomeIcon className={classes.icon} />
                Startseite
            </Link>
            <Link
                color="inherit"
                href={props.category.href}
                className={classes.link}
            >
                {getIcon(props.category.icon)}
                {props.category.title}
            </Link>
            <Link
                color="inherit"
                href={props.page.href}
                className={classes.link}
            >
                {props.page.title}
            </Link>
        </Breadcrumbs>
    );
}
