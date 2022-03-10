import React from 'react';
import {AnimalsClassnameFilter} from './ClassnameFilter';
import {AnimalsOrderFilter} from './OrderFilter';
import Typography from '@mui/material/Typography';

export const AnimalsTaxonomyFilter = (props) => {

    const filteredClassName = props.filters.find((filter)=>{
        return ('className' === filter.key);
    });

    let activeClass = undefined;

    if(undefined !== filteredClassName){
        activeClass = props.taxonomyCounted.find((taxonomyCounted)=>{

            return (taxonomyCounted.key === filteredClassName.value)
        });
    }

    for(const taxonomyCounted of props.taxonomyCounted){
        //console.log(taxonomyCounted)
    }

    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                Systematik
            </Typography>
            <ul>
                {
                    props.filters.map((filter:any)=>{

                        return (
                            <li key={filter.key}>{filter.key} {filter.value}</li>
                        );
                    })
                }

            </ul>
            <AnimalsClassnameFilter
                taxonomyCounted={props.taxonomyCounted}
                filters={props.filters}
                setFilters={props.setFilters}
            />
            <AnimalsOrderFilter
                orderCounted={activeClass}
                filters={props.filters}
                setFilters={props.setFilters}
            />
        </React.Fragment>
    );
}

