import {gql} from "@apollo/client";
import {headerImageFragment} from "../photo/grahpql";

export const animalFragment = `
data {
    id
    attributes {
        title
        slug
        body
        wikidata
        wikipediaLink
        scientificName
        iucnID
        iucnLink
        iucnStatus
        body
        className
        order
        species
        family                
        ${headerImageFragment}
    }
}
`;


/**
 * I can not find the resolver, to that with a singular query ;(
 */
export const getAnimalBySlug = gql`      
query AnimalsBySlug ($slug: String){
    animals(filters: { slug: { eq: $slug }}) {
        
        ${animalFragment}
        
    }
}
`;

export const getAnimalsSlugs = gql`      
query AnimalsSlugs {
    animals(pagination: { page: 1, pageSize: 2000 }) {
        data {
            attributes {
                slug
            }
        }
    }
}`;

export const getAnimals = gql`      
query Animals {
    animals(pagination: { page: 1, pageSize: 2000 }) {
        
        ${animalFragment}
        
    }
}
`;
