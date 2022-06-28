import {headerImageFragment} from '../photo/grahpql';

export const animalSimpelFragment = `
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
