import React from 'react';
import { useRouter } from 'next/router'
import Typography from "@material-ui/core/Typography";
import {getFullGeoJson} from "../api/geojson/list";
import {getAnimalBySlug, getAnimals} from "../../strapi-api/query/animals";
import {Animal} from "../../strapi-api/entity/animal/animal";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";
import {Breadcrumb, BreadcrumbLink, BreadcrumbProps} from "../../components/Navigation/Breadcrumb";
import {Distribution} from "../../components/Distribution/Distribution";
import {getMapElementById} from "../../strapi-api/query/map-elements";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";
import {Endanger} from "../../components/Animal/Endanger";
import {DistributionGlobe} from "../../components/Distribution/DistributionGlobe";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Grid, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
        toolbarPadding:{
            ...theme.mixins.toolbar,
        }
    })
});

export default function Tiere(props) {

    const router = useRouter()
    const { slug } = router.query

    const { asPath } = router;
    const classes = useStyles();

    Warehouse.get().hydrate(props.warehouse);

    const animal: Animal = Warehouse.get().getAnimals().find((animal:Animal)=>{
        return (slug === animal.slug);
    });

    const breadcrumbProps:BreadcrumbLink[] = [
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

    let focus: MapElement = facility.mapElements.find((mapElement:MapElement)=>{
        return ('box' === mapElement.properties.type);
    });

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
    const setTeaser = () => {

    };

    const mapElements = Warehouse.get().getMapElements();

    return (
        <React.Fragment>
            <Breadcrumb
                links={breadcrumbProps}
            />
            <Typography component="h1">
                {animal.title}
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Paper className={classes.paper}>xs=6
                        <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Typography component="h2">
                        Verbereitung
                    </Typography>
                    <DistributionGlobe
                        slug={slug}
                    />
                </Grid>
            </Grid>

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
            <Endanger
                iucnStatus={animal.iucnStatus}
            />
            <Typography component="h2">
                Links
            </Typography>

            {/*<Distribution/>*/}
            {/*animal.facility &&
                <MapRoot
                    focus={focus}
                    setTeaser={setTeaser}
                    mapDimension={mapDimension}
                    {...props}
                />
            */}
            <img
                src={image.medium.src}
                style={{
                    width: 300
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
        </React.Fragment>

    );
}

export async function getStaticProps(context) {

    await getAnimalBySlug(context.params.slug);

    await getMapElementById(80);
    await getMapElementById(79);

    let getJson = await getFullGeoJson();

    return {
        props: {
            warehouse: Warehouse.get().dehydrate(),
            geoJson:getJson
        }
    }
}

export async function getStaticPaths() {

    let animals = await getAnimals();

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