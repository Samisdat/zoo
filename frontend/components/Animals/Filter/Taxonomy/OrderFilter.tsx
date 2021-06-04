import React from 'react';
import {Avatar, Chip, Divider, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {AnimalFilter} from "../FilteredNavigationList";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display:'flex',
            flexWrap: 'wrap',
        },
        avatar: {
            marginRight: theme.spacing(1),
            marginBottom: theme.spacing(1),
        },
    })
);

export const AnimalsOrderFilter = (props) => {

    if(undefined === props.orderCounted){
        return (<React.Fragment></React.Fragment>);
    }

    const filterKey = 'order';

    const classes = useStyles();

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
            <div className={classes.root}>
                {
                    props.orderCounted.members.map((filter:any)=>{

                        const color = (filter.key === active?.value)?'primary':'default';
                        return (
                            <Chip
                                key={`${filter.key}`}
                                className={classes.avatar}
                                avatar={<Avatar>{filter.count}</Avatar>}
                                label={filter.key}
                                onClick={() => { changeActive(filter.key);}}
                                color={color}
                            />
                        );
                    })
                }
            </div>
        </React.Fragment>
    );
}

