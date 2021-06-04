import React from 'react';
import {AnimalsClassnameFilter} from "./ClassnameFilter";
import {AnimalsOrderFilter} from "./OrderFilter";
import {Typography} from "@material-ui/core";

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
            <Typography variant="h4" gutterBottom>
                Systematik
            </Typography>
            <ul>
                {
                    props.filters.map((filter:any)=>{

                        return (
                            <li>{filter.key} {filter.value}</li>
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

