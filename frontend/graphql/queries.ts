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
                            attributes{
                                name
                                x
                                y
                            }
                        }
                    }
                }
            }
        }
    }
}`;

export const getPhotoById = gql`
query Photo {
    photo(id: 76) {
        data {
            id
            attributes{
                x
                y
                image{
                    data{
                        id
                    }
                }
            }
        }
    }
}
`;

export const getPhotoByImageId = gql`
query Photo {
    photo(where: {title: {_eq: "Drill"}}) {
        data {
            id
            attributes{
                title
                x
                y
                image{
                    data{
                        id
                        
                    }
                }
            }
        }
    }
}
`