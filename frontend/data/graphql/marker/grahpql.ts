import {gql} from "@apollo/client";
import {simpleFacilityFragment} from "../facility/graphql-simple-facility";

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
