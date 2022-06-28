import {gql} from '@apollo/client';
import {simpleFacilityFragment} from '../facility/graphql-simple-facility';

export const markerWithFacilityFragment = `
        data {
            id
            attributes {
                slug
                x
                y
                priority
                facility{
                    ${simpleFacilityFragment}
                }
            }
        }

`;

export const markerFragment = `
        data {
            id
            attributes {
                slug
                x
                y
                priority
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
