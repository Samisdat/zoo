import {gql} from "@apollo/client";
import {headerImageFragment} from "../photo/grahpql";
import {animalFragment} from "../animal/grahpql";

export const individualAnimalFragment = `
data {
    id
    attributes {
        name
        slug
        body
        animal{
            ${animalFragment}
        }
        ${headerImageFragment}
    }
}
`;

/**
 * I can not find the resolver, to that with a singular query ;(
 */
export const getIndividualAnimalBySlug = gql`      
query IndividualAnimalsBySlug ($slug: String){
    individualAnimals(filters: { slug: { eq: $slug }}) {
        
        ${individualAnimalFragment}
        
    }
}
`;

export const getIndividualAnimals = gql`      
query IndividualAnimals {
    individualAnimals(pagination: { page: 1, pageSize: 2000 }) {
        
        ${individualAnimalFragment}
        
    }
}
`;
