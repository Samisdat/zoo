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