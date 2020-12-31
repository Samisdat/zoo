import React from 'react';
import { useRouter } from 'next/router'
import {getAnimals, getAnimal, Animal} from "pages/api/animals";

export default function Tiere(props) {

    const router = useRouter()
    const { slug } = router.query

    return (
        <React.Fragment>{slug} {props.animal.name}</React.Fragment>
    );
}

export async function getStaticProps(context) {

    const animal = await getAnimal(context.params.slug);

    return {
        props: {
            animal:animal
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