import React from 'react';
import {AnimalsClassnameFilter} from "./ClassnameFilter";
import {AnimalsOrderFilter} from "./OrderFilter";

export const AnimalsTaxonomyFilter = (props) => {

    const filteredClassName = props.filterCriteria.find((afilterCriteria)=>{
        return ('className' === afilterCriteria.key);
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
            <ul>
                {
                    props.filterCriteria.map((filter:any)=>{

                        return (
                            <li>{filter.key} {filter.value}</li>
                        );
                    })
                }

            </ul>
            <AnimalsClassnameFilter
                taxonomyCounted={props.taxonomyCounted}
                filterCriteria={props.filterCriteria}
                setFilterCriteria={props.setFilterCriteria}
            />
            <AnimalsOrderFilter
                orderCounted={activeClass}
                filterCriteria={props.filterCriteria}
                setFilterCriteria={props.setFilterCriteria}
            />
        </React.Fragment>
    );
}

