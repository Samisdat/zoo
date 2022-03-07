import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import {AnimalFilter} from "../FilteredNavigationList";
import {styled} from "@mui/material/styles";

export const Chips = styled('div')(({ theme }) => ({
    display:'flex',
    flexWrap: 'wrap',
}));

const iucnStatusDe = {
    'NE': 'nicht beurteilt',
    'DD': 'ungenügende Datengrundlage',
    'LC': 'nicht gefährdet',
    'NT': 'potenziell gefährdet',
    'VU': 'gefährdet',
    'EN': 'stark gefährdet',
    'CR': 'vom Aussterben bedroht',
    'EW': 'in der Natur ausgestorben',
    'EX': 'ausgestorben',
};

export const AnimalsIucnFilter = (props) => {

    const filterKey = 'iucnStatus';

    const active = props.filters.find((filter)=>{
        return (filterKey === filter.key);
    });

    const changeActive = (key:string)=>{

        if(active?.value === key){

            props.setFilters([]);

            return;

        }

        const filter:AnimalFilter = {
            key:filterKey,
            value: key,
        };

        props.setFilters([
            filter
        ]);

    };

    const orderBy = Object.keys(iucnStatusDe);

    props.iucnCounted.sort((valueA, valueB)=>{

        const firstIndex = orderBy.indexOf(valueA.key);
        const secondIndex = orderBy.indexOf(valueB.key);

        return (firstIndex - secondIndex);

    });

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Rote Liste der gefährdeten Arten
            </Typography>
            <Chips>
                {
                    props.iucnCounted.map((filter:any)=>{

                        const color = (filter.key === active?.value)?'primary':'default';
                        const iucnText = iucnStatusDe[filter.key];
                        return (
                            <Chip
                                key={`${filter.key}`}
                                sx={{
                                    mr:1,
                                    mb:1
                                }}
                                avatar={<Avatar>{filter.count}</Avatar>}
                                label={`${iucnText} ${filter.key}`}
                                onClick={() => { changeActive(filter.key);}}
                                color={color}
                            />
                        );
                    })
                }
            </Chips>
        </React.Fragment>

    );
}

