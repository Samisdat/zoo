import {gql} from '@apollo/client';
import {headerImageFragment} from '../photo/grahpql';

const queryPostsBySlug = `query PostsBySlug ($slug: String){
    posts(filters: { slug: { eq: $slug }}) {
        data {
            id
            attributes {
                title
                slug
                date
                content {
                    __typename
                    ... on ComponentContentImage {
                        align
                        images {
                            data {
                                id
                                attributes {
                                    name
                                    caption
                                    alternativeText
                                    copyright
                                    x
                                    y
                                    formats
                                }
                            }
                        }
                    }
                    ... on ComponentContentText {
                        text
                    }
                    ... on ComponentContentHeadline {
                        headline
                        level
                    }                    
                }
                headerImage {
                    data {
                        id
                        attributes{
                            name
                            x
                            y
                            copyright
                            formats 
                        }
                    }          
                }  
            }
        }
    }
}`;

/*
... on ComponentCopyTextImage {
        align
        images{
          data{
            id
            attributes{
              alternativeText
              Copyright
              formats
            }
          }
        }
      }
... on ComponentCopyTextText {
    text
}
*/

/**
 * I can not find the resolver, to that with a singular query ;(
 */
export const getPostsBySlug = gql`${queryPostsBySlug}`;

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
                ${headerImageFragment}
            }
        }
    }
}
`;
