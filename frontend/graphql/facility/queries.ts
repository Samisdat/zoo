import {gql} from "@apollo/client";

/**
 * I can not find the resolver, to that with a singular query ;(
 */
export const getFacilityBySlug = gql`      
query FacilitiesBySlug ($slug: String){
    facilities(filters: { slug: { eq: $slug }}) {
        data {
            id
            attributes {
                title
                slug
                body
                type
                headerImg {
                    image {
                        data {
                            id
                            attributes{
                                name
                                x
                                y
                                formats
                            }
                        }
                    }
                }
            }
        }
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
                headerImg {
                    image {
                        data {
                            id
                            attributes{
                                name
                                x
                                y
                                formats
                            }
                        }
                    }
                }
            }
        }
    }
}
`;
