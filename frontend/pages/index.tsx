import React, {useEffect, useState} from 'react';

import {Map} from 'components/Map/Map';
import {Teaser} from 'components/Map/Teaser/Teaser';

import SearchDialog from 'components/Search/Search';
import {MapProvider} from 'components/Map/Context/MapContext';
import {OpenTeaserByHash} from '../components/Map/Teaser/OpenTeaserByHash';
import styled from '@mui/system/styled';
import {Warehouse, WarehouseSpore} from "../data/warehouse/warehouse";
import {Facility} from "../data/graphql/facility/facility";
import {fetchFacilities} from "../data/graphql/facilities";
import {fetchEdges} from "../data/graphql/edges";
import {fetchMarkers} from "../data/graphql/markers";

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

    const eingang = nodes.find((node)=>{
        return '0001_end' === node.idFromEdges;
    });

    console.log(eingang);
    console.log('@TODO', 'boundingBox', 'as default focus');

    const markers = Warehouse.get().getMarkers();
    console.log(markers);
    const facilities = Warehouse.get().getFacilities();
    console.log(facilities);
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

    await fetchFacilities()
    await fetchEdges();
    await fetchMarkers();

    const indexProps:any = {
        warehouse: Warehouse.get().dehydrate()
    };

    return {
        props: indexProps
    }
}