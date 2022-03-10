import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';

import {IndividualAnimal} from 'strapi-api/entity/individual-animal/individual-animal';
import {Warehouse} from 'strapi-api/warehouse/warehouse';
import {
    getIndividualAnimalBySlug,
    getIndividualAnimals
} from 'strapi-api/query/individual-animals';

export default function Individuum(props) {

    const router = useRouter()
    const { slug, name } = router.query

    Warehouse.get().hydrate(props.warehouse);

    const individualAnimal: IndividualAnimal = Warehouse.get().getIndividualAnimals().find((individualAnimal:IndividualAnimal)=>{
        return (name === individualAnimal.slug);
    });

    return (
        <React.Fragment>
            <Typography component="h1">
                {individualAnimal.name}
            </Typography>
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    const name = context.params.name;

    await getIndividualAnimalBySlug(name);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}

export async function getStaticPaths() {

    const individualAnimals = await getIndividualAnimals()

    const animalPaths = individualAnimals.map((individualAnimals:IndividualAnimal)=>{

        return {
            params:{
                slug: individualAnimals.animal.slug,
                name: individualAnimals.slug
            }
        }
    });

    return {

        paths: animalPaths,

        fallback: false,
    }
}