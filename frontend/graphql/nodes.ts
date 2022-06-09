import {apolloClient} from "./apolloClient";

import {PostJson} from "./post/post-json";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {addToWarehouse} from "./add-to-warehouse";
import {getNodes} from "./node/grahpql";
import {nodeMapData} from "./node/node-map-data";

export const fetchNodes = async ():Promise<PostJson[]> => {

    const graphResult = await apolloClient.query({
        query: getNodes
    });

    const graphPostsNodes = graphResult.data.graphNodes.data;


    let nodes = graphPostsNodes.map((datum:any)=>{

        const node = nodeMapData(datum);

        addToWarehouse(node);

        return Warehouse.get().getNode(
            parseInt(datum.id,10)
        );

    });

    return nodes;

}