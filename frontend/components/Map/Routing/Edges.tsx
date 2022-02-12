import React from 'react';
import {Edge} from "../../../strapi-api/entity/edge/edge";
import {makeStyles} from "@material-ui/core/styles";
import {edgeIdPrefix} from "../../../constants";

interface EdgesProperties {
    edges: Edge[];
}

const useStyles = makeStyles({
    path:{
        fill: 'none',
        opacity: 0,
        stroke: 'red',
        strokeWidth: '2px',
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
