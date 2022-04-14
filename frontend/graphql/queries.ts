import {gql} from "@apollo/client";

export const getPostById = gql`      
query Post {
    post(id: 3) {
        data {
            id
            attributes {
                title
                slug
                
                date
                headerImg {
                    image {
                        data {
                            id
                        }
                    }
                }
            }
        }
    }
}`;