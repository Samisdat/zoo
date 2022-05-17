import {gql} from "@apollo/client";
import {animalFragment} from "../animal/grahpql";
import {facilityFragment} from "../facility/grahpql";

export const getQrcodeBySlug = gql` 
query QrCodeById ($id: ID){
    qrCode(id: $id) {
        data {
            id
            attributes {
                title
                lat
                lng
                animal{
                    ${animalFragment}
                }
                facility{
                    ${facilityFragment}
                }
            }
        }
    }
}`;

export const getQrCodes = gql`      
query QrCodes {
    qrCodes(pagination: { page: 1, pageSize: 2000 }) {

        data {
            id
            attributes {
                title
                lat
                lng
                animal{
                    ${animalFragment}
                }
                facility{
                    ${facilityFragment}
                }
            }
        }

    }
}
`;
