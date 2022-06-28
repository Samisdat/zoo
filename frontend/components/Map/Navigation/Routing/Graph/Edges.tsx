import React from 'react';

import {edgeIdPrefix} from '../../../../../constants';
import styled from '@mui/system/styled';
import {Edge} from "../../../../../data/graphql/edge/edge";

interface EdgesProperties {
    edges: Edge[];
}

const EdgePath = styled('path')({
    fill: 'none',
    opacity: 0,
    stroke: 'blue',
    strokeWidth: '1px',
});

export const Edges = ({edges}:EdgesProperties) => {

    return (
        <g>
            {edges.map((edge, i) =>{
                return (
                    <EdgePath
                        key={i}
                        id={`${edgeIdPrefix}${edge.id}`}
                        className={'edge'}
                        d={edge.d}
                    />
                );
            })}
        </g>
    );

}
