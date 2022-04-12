import React from 'react';
import Link from 'next/link'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import {default as MuiLink} from '@mui/material/Link';
import {Icon} from '../Icon/Icon';
import {styled} from '@mui/material/styles';
import Container from '@mui/material/Container';
import {grey} from '@mui/material/colors';

// @TODO try sx or styled with Icon instead div
const IconWithSpacing = styled('div')(({ theme }) => ({
    marginRight: theme.spacing(0.5),
}));

export type BreadcumbCategoryIcon = 'home' | 'pet' | 'building' | 'blog';

export interface BreadcrumbLink {
    href:string;
    title:string;
    icon?:BreadcumbCategoryIcon
}

export interface BreadcrumbProps{
    links:BreadcrumbLink[];
}

const ZooBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    backgroundColor: grey[100],
    marginLeft: -24,
    marginRight: -24,
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 24,
}));


export const Breadcrumb = (props:BreadcrumbProps)    => {

    const links:BreadcrumbLink[] = [{
        href: '/',
        title: 'Startseite',
        icon: 'home',
    }];

    for(const link of props.links){
        links.push(link);
    }

    const getIcon = (categoryIcon:BreadcumbCategoryIcon) => {

        if('home' === categoryIcon){
            return (
                <IconWithSpacing>
                    <Icon
                        icon={'home'}
                        size={'1x'}
                    />
                </IconWithSpacing>
            );
        }

        if('pet' === categoryIcon){
            return (
                <IconWithSpacing>
                    <Icon
                        icon={'paw'}
                        size={'1x'}
                    />
                </IconWithSpacing>
            );
        }

        if('blog' === categoryIcon){
            return (
                <IconWithSpacing>
                    <Icon
                        icon={'book'}
                        size={'1x'}
                    />
                </IconWithSpacing>
            );
        }

    };

    return (
        <Container
            maxWidth='md'
        >
            <ZooBreadcrumbs aria-label="breadcrumb">
                {
                    links.map((link:BreadcrumbLink)=> {
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                passHref
                            >
                                <MuiLink
                                    underline="hover"
                                    sx={{ display: 'flex', alignItems: 'center' }}
                                    color="inherit"
                                >
                                    {getIcon(link.icon)}
                                    {link.title}
                                </MuiLink>
                            </Link>

                        );
                    })
                }
            </ZooBreadcrumbs>
        </Container>
    );

}
