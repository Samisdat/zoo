import {gql} from "@apollo/client";
import {headerImageFragment} from "../photo/grahpql";
import {animalFragment} from "../animal/grahpql";

export const facilityFragment = `
    data {
        id
        attributes {
            title
            slug
            body
            type
            ${headerImageFragment}
            animals {       
                ${animalFragment}
            }
        }
    }
`;

/**
 * I can not find the resolver, to that with a singular query ;(
 */
export const getFacilityBySlug = gql`      
query FacilitiesBySlug ($slug: String){
    facilities(filters: { slug: { eq: $slug }}) {
        ${facilityFragment}
    }
}
`;

export const getFacilitySlugs = gql`      
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

export const getFacilities = gql`      
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
                animals {
                
                    ${animalFragment}
                
                }
                
            }
        }
    }
}
`;
