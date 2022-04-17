import {gql} from "@apollo/client";

/**
 * I can not find the resolver, to that with a singular query ;(
 */
export const getPostsBySlug = gql`      
query PostsBySlug ($slug: String){
    posts(filters: { slug: { eq: $slug }}) {
        data {
            id
            attributes {
                title
                slug
                date
                body
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
}`;

export const getPostSlugs = gql`      
query PostSlugs {
    posts {
        data {
            attributes {
                slug
            }
        }
    }
}
`;

export const getPosts = gql`      
query PostSlugs {
    posts {
        data {
            id
            attributes {
                title
                slug
                date
                body
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
