import {gql} from "@apollo/client";

export const getPostBySlug = gql`      
query Posts ($slug: String){
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
