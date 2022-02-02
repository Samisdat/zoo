import React, {useEffect, useState} from 'react';

import {MapSvg} from "../components/Map/MapSvg";
import {Teaser} from "components/Map/Teaser";

import SearchDialog from "components/Search/Search";
import {Warehouse, WarehouseSpore} from "../strapi-api/warehouse/warehouse";
import {
    getMapElements
} from "../strapi-api/query/map-elements";
import {MapElement} from "../strapi-api/entity/map-element/map-element";
import {MapProvider} from "../components/Map/Context/MapContext";
import {makeStyles} from "@material-ui/core/styles";
import {HashNavigation} from "../components/Map/HashNavication";
import {getGraphElements} from "../strapi-api/query/graph-elements";

export interface IndexProps{
    warehouse: WarehouseSpore;
}

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        width:'100%',
        height:'100%',
    }
});

export default function Index(props:IndexProps) {

    const classes = useStyles();
    Warehouse.get().hydrate(props.warehouse);

    const nodes = Warehouse.get().getNodes();
    const edges = Warehouse.get().getEdges();

    const boundingBox = Warehouse.get().getMapElement(80);
    console.log('@TODO', boundingBox, 'as default focus');

    const mapElements = Warehouse.get().getMapElements();

    const [teaser, setTeaser] = useState<MapElement>(undefined);

    useEffect(() => {

        //console.log(teaser)

    },[teaser]);

    return (
        <MapProvider>
            <div className={classes.root}>
                <HashNavigation
                    mapElements={mapElements}
                />
                <MapSvg
                    fullsize={true}
                    mapElements={mapElements}
                    boundingBox={boundingBox}
                    nodes={nodes}
                    edges={edges}
                />
                {/*
                <SearchDialog
                    mapElements={mapElements}
                />
                <Teaser/>
                */}
            </div>
        </MapProvider>
    );

}

export async function getStaticProps(context) {

    await getMapElements();
    await getGraphElements();

    const indexProps:any = {
        warehouse: Warehouse.get().dehydrate()
    };

    return {
        props: indexProps
    }
}
