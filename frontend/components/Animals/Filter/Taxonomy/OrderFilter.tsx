import React from 'react';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import {AnimalFilter} from "../FilteredNavigationList";
import {Chips} from "../Iucn/IucnFilter";

export const AnimalsOrderFilter = (props) => {

    if(undefined === props.orderCounted){
        return (<React.Fragment></React.Fragment>);
    }

    const filterKey = 'order';

    const active = props.filters.find((filter)=>{
        return (filterKey === filter.key);
    });

    const changeActive = (key:string)=>{

        const classNameCriteria = props.filters.find((filter)=>{
            return ('className' === filter.key);
        });

        if(active?.value === key){

            props.setFilters([classNameCriteria]);

            return;

        }

        const filter:AnimalFilter = {
            key:filterKey,
            value: key,
        };

        props.setFilters([
            classNameCriteria,
            filter
        ]);

    };

    return (
        <React.Fragment>
            <Divider />
            <Chips>
                {
                    props.orderCounted.members.map((filter:any)=>{

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

