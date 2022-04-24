import {gql} from "@apollo/client";
import {headerImageFragment} from "../photo/grahpql";

/**
 * I can not find the resolver, to that with a singular query ;(
 */
export const getAnimalBySlug = gql`      
query AnimalsBySlug ($slug: String){
    animals(filters: { slug: { eq: $slug }}) {
        data {
            id
            attributes {
                title
                slug
                body
                ${headerImageFragment}
            }
        }
    }
}
`;

export const getAnimalsSlugs = gql`      
query FacilitySlugs {
    facilities {
        data {
            attributes {
                slug
            }
        }
    }
}
`;

export const getAnimals = gql`      
query Facilities {
    facilities(pagination: { page: 1, pageSize: 2000 }) {
        data {
            id
            attributes {
                title
                slug
                body
                type
                ${headerImageFragment}
            }
        }
    }
}
`;
