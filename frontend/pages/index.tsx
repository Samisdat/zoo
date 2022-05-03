import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {Warehouse} from '../strapi-api/warehouse/warehouse';
import {useViewport} from '../components/viewport/useViewport';
import Page from '../components/Page/Page';
import {BreadcrumbLink} from '../components/Navigation/Breadcrumb';

export default function Index(props) {

    const {width} = useViewport();

    Warehouse.get().hydrate(props.warehouse);

    const headerImage = Warehouse.get().getPhoto(32);

    const breadcrumbLinks:BreadcrumbLink[] = [
        {
            href: '/tiere',
            title: 'Tiere',
            icon: 'pet',
        },
        {
            href: '/foo',
            title: 'Bar',
        },
    ];

    return (
        <Page
            headerImage={headerImage}
            breadcrumb={breadcrumbLinks}
        >
            <Box sx={{ width: '100%'}}>
                <Typography variant="h1" component="h1" gutterBottom>
                    h1. Heading
                </Typography>
                <Typography variant="h2" gutterBottom component="div">
                    h2. Heading
                </Typography>
                <Typography variant="h3" gutterBottom component="div">
                    h3. Heading
                </Typography>
                <Typography variant="h4" gutterBottom component="div">
                    h4. Heading
                </Typography>
                <Typography variant="h5" gutterBottom component="div">
                    h5. Heading
                </Typography>
                <Typography variant="h6" gutterBottom component="div">
                    h6. Heading
                </Typography>
                <Typography variant="subtitle1" gutterBottom component="div">
                    subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur
                </Typography>
                <Typography variant="subtitle2" gutterBottom component="div">
                    subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur
                </Typography>
                <Typography variant="body1" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
                <Typography variant="body1" gutterBottom>
                    body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                    blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur,
                    neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum
                    quasi quidem quibusdam.
                </Typography>
                <Typography variant="button" display="block" gutterBottom>
                    button text
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                    caption text
                </Typography>
                <Typography variant="overline" display="block" gutterBottom>
                    overline text
                </Typography>
            </Box>

        </Page>

    );

}

export async function getStaticProps(context) {

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}
