import React from 'react';
import { useRouter } from 'next/router'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {default as MuiPaper} from '@mui/material/Paper';
import {styled} from '@mui/material/styles';

import {getFullGeoJson} from '../api/geojson/list';
import {getAnimalBySlug, getAnimals} from 'strapi-api/query/animals';
import {Animal} from 'strapi-api/entity/animal/animal';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {BreadcrumbLink} from 'components/Navigation/Breadcrumb';
import {DistributionGlobe} from 'components/Distribution/DistributionGlobe';
import {Profile} from 'components/Animal/Profile/Profile';
import {IucnRedList} from 'components/Animal/IucnRedList';
import Page from '../../components/Page/Page';

export const Root = styled('div')(({ theme }) => ({
    flexGrow: 1,
}));

export const Paper = styled(MuiPaper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

export default function Tiere(props) {

    const router = useRouter()
    const { slug } = router.query

    const { asPath } = router;

    Warehouse.get().hydrate(props.warehouse);

    const animal: Animal = Warehouse.get().getAnimals().find((animal:Animal)=>{
        return (slug === animal.slug);
    });

    const breadcrumbLinks:BreadcrumbLink[] = [
        {
            href: '/tiere',
            title: 'Tiere',
            icon: 'pet',
        },
        {
            href: asPath,
            title: animal.title,
        },
    ];

    let facility = undefined;

    /* same animals can be found in more then one enclosure. But the most common case is one */
    if(0 !== animal.facilities.length){
        facility = animal.facilities[0]
    }

    const image = animal.photos[0];

    /*
    if(animal.facility){

        focus = props.geoJson.features.find((feature:Feature)=>{

            if('facility-box' !== feature.properties?.type){
                return false;
            }

            if(animal.facility !== feature.properties?.slug){
                return false;
            }

            return true;
        });

    }
    */

    return (
        <Page
            headerImage={animal.headerImage}
            breadcrumb={breadcrumbLinks}
        >
            <Root>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h1" component="h1">
                            {animal.title}
                        </Typography>

                    </Grid>
                    <Profile
                        profile={animal.profile}
                    />
                    <IucnRedList
                        iucnStatus={animal.iucnStatus}
                    />
                    <Grid
                        item
                        xs={12}
                        md={5}>
                        <Paper
                            square={true}
                            elevation={0}
                        >
                            <Typography variant="h4" component="h4">
                                Verbereitung
                            </Typography>
                            <DistributionGlobe
                                slug={slug}
                            />
                        </Paper>
                    </Grid>

                </Grid>
            </Root>

            <Typography component="h2">
                Tiere oder Bilder
            </Typography>
            <Typography component="h2">
                Gehege
            </Typography>
            {JSON.stringify(facility)}
            <Typography component="h2">
                Tabelle
            </Typography>
            <Typography component="h2">
                Beschreibung
            </Typography>
            <Typography component="h2">
                Links
            </Typography>


            {/*animal.facility &&
                <MapRoot
                    focus={focus}
                    setTeaser={setTeaser}
                    mapDimension={mapDimension}
                    {...props}
                />
            */}
            <img

                style={{
                    height: 300
                }}
            />

            <div>
                <a href={animal.wikipediaLink}>
                    {animal.wikipediaLink}
                </a>
            </div>
            <div>
                <a href={animal.iucnLink}>
                    {animal.iucnLink}
                </a>
            </div>
        </Page>

    );
}

export async function getStaticProps(context) {

    const animal = await getAnimalBySlug(context.params.slug);

    const getJson = await getFullGeoJson();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
            geoJson:getJson
        }
    }
}

export async function getStaticPaths() {

    const animals = await getAnimals();

    const animalPaths = animals.map((animal:Animal)=>{
        return {
            params:{
                slug: animal.slug
            }
        }
    });

    return {

        paths: animalPaths,

        fallback: false,
    }
}