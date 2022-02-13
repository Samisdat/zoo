import React, {useEffect, useRef} from 'react';
import {Edge} from "../../../strapi-api/entity/edge/edge";
import {makeStyles} from "@material-ui/core/styles";
import {edgeIdPrefix} from "../../../constants";
import * as d3 from "d3";
import {Route} from "./Dijkstra";

interface EdgesProperties {
    edges: Edge[];
}

const useStyles = makeStyles({
    path:{
        opacity: 0,
        strokeWidth: '1px',
    }
});

export const Edges = ({edges}:EdgesProperties) => {

    const classes = useStyles();

    return (
        <g>
            {edges.map((edge, i) =>{
                return (
                    <path
                        key={i}
                        id={`${edgeIdPrefix}${edge.id}`}
                        className={`edge ${classes.path}`}
                        d={edge.d}
                    />
                );
            })}
        </g>
    );

}
