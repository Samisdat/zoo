import {gql} from "@apollo/client";
import {facilityFragment} from "../facility/grahpql";

export const markerFragment = `
        data {
            id
            attributes {
                slug
                x
                y
                priority
                facility{
                    ${facilityFragment}
                }
            }
        }

`;

export const getMarkers = gql`
query Markers {
    markers(pagination: { page: 1, pageSize: 2000 }) {
        ${markerFragment}
    }
}
`;
