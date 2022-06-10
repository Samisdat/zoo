import {apolloClient} from "./apolloClient";

import {addToWarehouse} from "./add-to-warehouse";
import {getMarkers} from "./marker/grahpql";
import {Marker} from "./marker/marker";
import {markerMapData} from "./marker/marker-map-data";
import {Warehouse} from "../warehouse/warehouse";

export const fetchMarkers = async ():Promise<Marker[]> => {

    const graphResult = await apolloClient.query({
        query: getMarkers
    });

    const data = graphResult.data.markers.data;

    let markers = data.map((datum:any)=>{

        const marker = markerMapData(datum);

        addToWarehouse(marker);

        return Warehouse.get().getMarker(
            parseInt(datum.id,10)
        );

    });

    return markers;

}