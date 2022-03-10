import React, {useEffect, useState} from 'react';

import {Map} from 'components/Map/Map';
import {Teaser} from 'components/Map/Teaser/Teaser';

import SearchDialog from 'components/Search/Search';
import {Warehouse, WarehouseSpore} from 'strapi-api/warehouse/warehouse';
import {MapProvider} from 'components/Map/Context/MapContext';
import {getGraphElements} from 'strapi-api/query/graph-elements';
import {getFacilities} from 'strapi-api/query/facilities';
import {getMarkers} from 'strapi-api/query/marker';
import {Facility} from 'strapi-api/entity/facility/facility';
import {OpenTeaserByHash} from '../components/Map/Teaser/OpenTeaserByHash';
import styled from '@mui/system/styled';

export interface IndexProps{
    warehouse: WarehouseSpore;
}

const FullSize = styled('div')({
    position: 'fixed',
    width:'100%',
    height:'100%',
});

export default function Index(props:IndexProps) {

    Warehouse.get().hydrate(props.warehouse);

    const nodes = Warehouse.get().getNodes();
    const edges = Warehouse.get().getEdges();

    console.log('@TODO', 'boundingBox', 'as default focus');

    const markers = Warehouse.get().getMarkers();
    const facilities = Warehouse.get().getFacilities();

    const [teaser, setTeaser] = useState<Facility>(undefined);

    useEffect(() => {

        //console.log(teaser)

    },[teaser]);

    return (
        <MapProvider>
            <FullSize>
                <OpenTeaserByHash
                    facilities={facilities}
                />
                {/* */}
                <Map
                    fullsize={true}
                    markers={markers}
                    facilities={facilities}
                    nodes={nodes}
                    edges={edges}
                />

                {/* */}
                <SearchDialog
                    facilities={facilities}
                />
                <Teaser/>
                {/*
                */}
            </FullSize>
        </MapProvider>
    );

}

export async function getStaticProps(context) {

    await getFacilities();
    await getGraphElements();
    await getMarkers();

    const indexProps:any = {
        warehouse: Warehouse.get().dehydrate()
    };

    return {
        props: indexProps
    }
}
