import {apolloClient} from './apolloClient';

import {addToWarehouse} from './add-to-warehouse';
import {getNodes} from './node/grahpql';
import {nodeMapData} from './node/node-map-data';
import {Node} from './node/node';
import {Warehouse} from '../warehouse/warehouse';

export const fetchNodes = async ():Promise<Node[]> => {

    const graphResult = await apolloClient.query({
        query: getNodes
    });

    const graphPostsNodes = graphResult.data.graphNodes.data;

    const nodes = graphPostsNodes.map((datum:any)=>{

        const node = nodeMapData(datum);

        addToWarehouse(node);

        return Warehouse.get().getNode(
            parseInt(datum.id,10)
        );

    });

    return nodes;

}