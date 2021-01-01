import React from 'react';
import { useRouter } from 'next/router'
import {getAnimals, getAnimal, Animal} from "pages/api/animals";
import renderToString from 'next-mdx-remote/render-to-string'
import hydrate from 'next-mdx-remote/hydrate'

export default function Tiere(props) {

    const router = useRouter()
    const { slug } = router.query

    const content = hydrate(props.source, {  })

    return (
        <React.Fragment>
            {slug} {props.animal.name}
            <div>{content}</div>
        </React.Fragment>
    );
}

export async function getStaticProps(context) {

    const animal = await getAnimal(context.params.slug);

    // MDX text - can be from a local file, database, anywhere
    const source = 'Some **mdx** text, with a component'
    const mdxSource = await renderToString(source, {})
    return {
        props: {
            animal:animal,
            source: mdxSource
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