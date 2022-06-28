import {EdgeJson} from './edge-json';
import {Edge} from './edge';
import {nodeMapData} from '../node/node-map-data';
import {Entity} from '../../entity/entity';

export const edgeMapData = (apiData: any):Entity<any>[] => {

    const entities:Entity<any>[] = [];

    const id = parseInt(
        apiData.id,
        10
    );

    const IdFromSvg = apiData.attributes?.IdFromSvg;
    const d = apiData.attributes.d;
    const edgeLength = apiData.attributes?.edgeLength;

    let startNode = null;

    if (apiData.attributes.graph_node_start?.data) {

        const nodeEntities = nodeMapData(apiData.attributes.graph_node_start.data);

        const nodeEntity = nodeEntities.find((entity)=>{
            return ('Node' === entity.entityType);
        });

        for(const entity of nodeEntities){
            entities.push(entity);
        }

        startNode = nodeEntity.id;


    }

    let endNode = null;

    if (apiData.attributes.graph_node_end?.data) {

        const nodeEntities = nodeMapData(apiData.attributes.graph_node_end.data);

        const nodeEntity = nodeEntities.find((entity)=>{
            return ('Node' === entity.entityType);
        });

        for(const entity of nodeEntities){
            entities.push(entity);
        }

        endNode = nodeEntity.id;

    }

    const json:EdgeJson = {
        id,
        IdFromSvg,
        d,
        edgeLength,
        startNode,
        endNode,
    };

    const edge = Edge.hydrate(json);

    entities.push(edge);

    return entities;

}
