import {gql} from '@apollo/client';
import {headerImageFragment} from '../photo/grahpql';
import {animalSimpelFragment} from '../animal/graphql-animal-simpel-fragment';

export const individualAnimalFragment = `
data {
    id
    attributes {
        name
        slug
        body
        animal{
            ${animalSimpelFragment}
        }
        ${headerImageFragment}
    }
}
`;

export const individualAnimalSimpleFragment = `
data {
    id
    attributes {
        name
        slug
        body
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
