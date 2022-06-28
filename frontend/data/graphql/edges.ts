import {apolloClient} from './apolloClient';

import {addToWarehouse} from './add-to-warehouse';
import {Edge} from './edge/edge';
import {getEdges} from './edge/grahpql';
import {edgeMapData} from './edge/edge-map-data';
import {Warehouse} from '../warehouse/warehouse';

export const fetchEdges = async ():Promise<Edge[]> => {

    const graphResult = await apolloClient.query({
        query: getEdges
    });

    const graphEdges = graphResult.data.graphEdges.data;


    const edges = graphEdges.map((datum:any)=>{

        const edge = edgeMapData(datum);

        addToWarehouse(edge);

        return Warehouse.get().getEdge(
            parseInt(datum.id,10)
        );

    });

    return edges;

}