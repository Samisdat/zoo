import {Node} from './node';
import {NodeJson} from './node-json';
import {facilityMapData} from '../facility/facility-map-data';
import {Entity} from '../../entity/entity';

export const nodeMapData = (apiData: any):Entity<any>[] => {

    const entities:Entity<any>[] = [];

    const id = parseInt(
        apiData.id,
        10
    );

    const IdFromEdges = apiData.attributes.IdFromEdges;
    const x = apiData.attributes.x;
    const y = apiData.attributes.y;

    const edgeStart:number[] = [];

    /*
    if (undefined !== apiData.attributes.graph_edges_starts) {

        edgeStart = apiData.attributes.graph_edges_starts.data.map((edge) => {
            return edge.id;
        });

    }
     */

    const edgeEnd:number[] = [];

    /*
    if (undefined !== apiData.attributes.graph_edges_ends) {

        edgeEnd = apiData.attributes.graph_edges_ends.data.map((edge) => {
            return edge.id;
        });

    }
     */

    let facility: number|null = null;

    if (apiData.attributes.facility?.data) {

        const facilityEntities = facilityMapData(apiData.attributes.facility.data);

        const facilityEntity = facilityEntities.find((entity)=>{
            return ('Facility' === entity.entityType);
        });

        for(const entity of facilityEntities){
            entities.push(entity);
        }

        facility = facilityEntity.id;

    }

    if(!facility){
        facility = null;
    }

    const json:NodeJson = {
        id,
        IdFromEdges,
        x,
        y,
        edgeStart,
        edgeEnd,
        facility,
    };

    const node = Node.hydrate(json);

    entities.push(node)

    return entities;
}
