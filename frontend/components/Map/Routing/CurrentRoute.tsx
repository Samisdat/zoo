import React, {useEffect, useRef} from 'react';
import {Edge} from "../../../strapi-api/entity/edge/edge";
import {makeStyles} from "@material-ui/core/styles";
import {edgeIdPrefix} from "../../../constants";
import * as d3 from "d3";
import {Route} from "./Dijkstra";
import {position} from "polished";
import {useMap} from "../Context/MapContext";

interface CurrentRouteProps {
    edges: Edge[];
}

const useStyles = makeStyles({
    outer:{
        fill: 'none',
        stroke: '#0A6001',
        strokeWidth: '4px',
    },
    inner:{
        fill: 'none',
        stroke: '#00a800',
        strokeWidth: '2px',
    }
});

export const CurrentRoute = ({edges}:CurrentRouteProps) => {

    const classes = useStyles();

    const {
        state: {position, routing},
    } = useMap();

    const outerRef = useRef(null);
    const innerRef = useRef(null);

    useEffect(() => {

        if(!routing){
            return;
        }

        if('response' !== routing.type){
            return;
        }

        const route = routing.route;

        const current = edges.filter((edge)=>{

            if(edge.id === position.edgeId){
                return true;
            }

            return(
                route.nodes.includes(edge.startNode.id + '') &&
                route.nodes.includes(edge.endNode.id + '')
            )

        });

        const outerGroup = d3.select(outerRef.current);

        outerGroup.selectAll('path')
            .data(current)
            .join('path')
            .attr('d', (d)=>{
                return d.d;
            })
            .attr('class', (d)=>{
                return `${classes.outer}`;
            })

        const innerGroup = d3.select(innerRef.current);

        innerGroup.selectAll('path')
            .data(current)
            .join('path')
            .attr('d', (d)=>{
                return d.d;
            })
            .attr('class', (d)=>{
                return `${classes.inner}`;
            })

    },[routing]);


    return (
        <React.Fragment>
            <g
                ref={outerRef}
            ></g>
            <g
                ref={innerRef}
            ></g>
        </React.Fragment>
    );

}
