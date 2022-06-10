import React from 'react';
import { useRouter } from 'next/router';
import Typography from '@mui/material/Typography';
import {Warehouse} from "../../../data/warehouse/warehouse";
import {IndividualAnimal} from "../../../data/graphql/individual-animal/individual-animal";
import {fetchIndividualAnimalBySlug, fetchIndividualAnimals} from "../../../data/graphql/individual-animals";


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

    await fetchIndividualAnimalBySlug(name);

    return {
        props: {
            warehouse: Warehouse.get().dehydrate()
        }
    }
}

export async function getStaticPaths() {

    const individualAnimals = await fetchIndividualAnimals()

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