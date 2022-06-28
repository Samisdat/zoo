import React from 'react';
import {useViewport} from '../viewport/useViewport';
import {Header} from '../Header/Header';
import {Breadcrumb, BreadcrumbLink} from '../Navigation/Breadcrumb';
import {Footer} from '../Navigation/Footer';
import {styled} from '@mui/system';
import {grey} from '@mui/material/colors';
import Container from '@mui/material/Container';
import {Photo} from "../../data/graphql/photo/photo";


export interface PageProperties{
    headerImage:Photo;
    breadcrumb:BreadcrumbLink[],
    children: React.ReactNode,

}

const Bg = styled('div')(({ theme }) => ({
    backgroundColor: grey[200],
}));

export const Content = styled(Container)(({ theme }) => ({
    /*
    [theme.breakpoints.up('xs')]: {
        backgroundColor: 'Salmon',
        minWidth: 300
    },
    [theme.breakpoints.up('sm')]: {
        backgroundColor: 'FireBrick',
    },
    [theme.breakpoints.up('md')]: {
        backgroundColor: 'DeepPink',
    },
    [theme.breakpoints.up('lg')]: {
        backgroundColor: 'DarkOrange',
    },
    [theme.breakpoints.up('xl')]: {
        backgroundColor: 'DarkKhaki',
    },
    */
    minWidth: 300,
    backgroundColor: 'white',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
}));
export default function Page({headerImage, breadcrumb, children}:PageProperties) {

    const {width} = useViewport();

    return (
        <Bg>
            <Header
                photo={headerImage}
                largeWidth={1000}
                largeHeight={300}
                smallWidth={width}
                smallHeight={200}
            />

            <Breadcrumb
                links={breadcrumb}
            />

            <Content
                maxWidth="md"
            >
                {children}
            </Content>
            <Footer />
        </Bg>
    );
}
