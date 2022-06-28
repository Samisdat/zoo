import {gql} from '@apollo/client';
import {nodeFragment} from '../node/grahpql';

const edgeFragment = `
        data {
            id
            attributes {
                    IdFromSvg
                    d
                    edgeLength
                    graph_node_start{
                        ${nodeFragment}
                    }
                    graph_node_end{
                        ${nodeFragment}
                    }
            }
        }

`;

export const getEdges = gql`
query Edges {
    graphEdges(pagination: { page: 1, pageSize: 2000 }) {
        ${edgeFragment}
    }
}
`;
