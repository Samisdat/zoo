import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

import {AnimalFilter} from "../FilteredNavigationList";
import {Chips} from "../Iucn/IucnFilter";

export const AnimalsClassnameFilter = (props) => {

    const filterKey = 'className';

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

    return (
        <React.Fragment>
            <Chips>
                {
                    props.taxonomyCounted.map((filter:any)=>{

                        const color = (filter.key === active?.value)?'primary':'default';
                        return (
                            <Chip
                                key={`${filter.key}`}
                                sx={{
                                    mr:1,
                                    mb:1
                                }}
                                avatar={<Avatar>{filter.count}</Avatar>}
                                label={filter.key}
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

