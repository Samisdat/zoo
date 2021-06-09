import React, {useEffect, useState} from 'react';

import {MapRoot} from 'components/Map/Root';
import {Teaser} from "components/Map/Teaser";

import SearchDialog from "components/Search/Search";
import {Warehouse, WarehouseSpore} from "../strapi-api/warehouse/warehouse";
import {
    getMapElements
} from "../strapi-api/query/map-elements";
import {MapElement} from "../strapi-api/entity/map-element/map-element";
import {MapProvider} from "../components/Map/Context/MapContext";
import {makeStyles} from "@material-ui/core/styles";

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

    const boundingBox = Warehouse.get().getMapElement(55/*80*/);
    console.log('@TODO', boundingBox, 'as default focus');

    const mapElements = Warehouse.get().getMapElements();

    const [teaser, setTeaser] = useState<MapElement>(undefined);

    useEffect(() => {

        //console.log(teaser)

    },[teaser]);

    return (
        <MapProvider>
            <div className={classes.root}>
            <MapRoot
                fullsize={true}
                mapElements={mapElements}
            />
            <SearchDialog
                mapElements={mapElements}
            />
                <Teaser/>
            </div>
        </MapProvider>
    );

}

export async function getStaticProps(context) {

    await getMapElements();

    const indexProps:any = {
        warehouse: Warehouse.get().dehydrate()
    };

    return {
        props: indexProps
    }
}
