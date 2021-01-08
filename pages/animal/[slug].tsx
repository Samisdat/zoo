    import React from 'react';
import { useRouter } from 'next/router'
import {getAnimals, getAnimal, Animal} from "pages/api/animals";
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'
    import Typography from "@material-ui/core/Typography";
    import CardContent from "@material-ui/core/CardContent";

export default function Tiere(props) {

    const router = useRouter()
    const { slug } = router.query

    const animal: Animal = props.animal as Animal;

    const image = props.animal.images[0];

    return (
        <React.Fragment>
            <Typography component="h1">
                {animal.title}
            </Typography>

            <img
                src={image}
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

    const animal = await getAnimal(context.params.slug);

    return {
        props: {
            animal:animal,
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

    console.log(animals)

    return {

        paths: animalPaths,

        fallback: false,
    }
}