import React, {useEffect, useRef} from 'react';
import * as d3 from 'd3';

import {getCurrentPositionGeoJson} from 'helper/getCurrentPosition';
import {useMap} from "./Context/MapContext";
import {Feature} from "geojson";
import {Warehouse} from "../../strapi-api/warehouse/warehouse";

export const GeoBorder = (props) => {

    const {
        state: {path, position, projection},
    } = useMap();

    const border = Warehouse.get().getMapElement(79);

    const ref = useRef(null);

    useEffect(() => {
        
        if(!path){
            return;
        }

        var borderGroup = d3.select(ref.current);
        borderGroup.selectAll('path')
            .data([border])
            .join('path')
            .attr('fill', (d, i)=>{
                return 'yellow';
            })
            .attr('stroke', (d, i)=>{
                return 'blue';
            })
            .attr('stroke-width', (d, i)=>{
                return '10';
            })
            .attr('opacity', (d, i)=>{
                return 1;
            })
            .attr('d', path as any);

        ;


    },[path]);

    return (
        <g ref={ref}></g>
    );

}
