import {gql} from "@apollo/client";
import {facilityFragment} from "../facility/grahpql";

const nodeFragment = `
        data {
            id
            attributes {
                IdFromEdges
                x
                y
                facility{
                    ${facilityFragment}
                }
            }
        }

`;

export const getNodes = gql`
query Nodes {
    graphNodes(pagination: { page: 1, pageSize: 2000 }) {
        ${nodeFragment}
    }
}
`;
