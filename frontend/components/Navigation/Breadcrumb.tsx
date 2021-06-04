import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';
import PetsIcon from '@material-ui/icons/Pets';
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

export type BreadcumbCategoryIcon = 'home' | 'pet' | 'building' | 'blog';

export interface BreadcrumbLink {
    href:string;
    title:string;
    icon?:BreadcumbCategoryIcon
}

export interface BreadcrumbProps{
    links:BreadcrumbLink[];
}

export const Breadcrumb = (props:BreadcrumbProps)    => {

    const links:BreadcrumbLink[] = [{
        href: '/',
        title: 'Startseite',
        icon: 'home',
    }];

    for(const link of props.links){
        links.push(link);
    }

    const classes = useStyles();

    const getIcon = (categoryIcon:BreadcumbCategoryIcon) => {

        if('home' === categoryIcon){
            return (<HomeIcon className={classes.icon} />);
        }

        if('pet' === categoryIcon){
            return (<PetsIcon className={classes.icon} />);
        }

        if('blog' === categoryIcon){
            return (<BookIcon className={classes.icon} />);
        }

    };

    return (
        <Breadcrumbs aria-label="breadcrumb">
            {
                links.map((link:BreadcrumbLink)=> {
                    return (
                        <Link
                            key={link.href}
                            color="inherit"
                            href={link.href}
                            className={classes.link}
                        >
                            {getIcon(link.icon)}
                            {link.title}
                        </Link>

                    );
                })
            }
        </Breadcrumbs>
    );

    /*
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

                {props.category.title}
            </Link>
            <Link
                color="inherit"
                href={props.href}
                className={classes.link}
            >
                {props.title}
            </Link>)

        </Breadcrumbs>

    );
     */
}
