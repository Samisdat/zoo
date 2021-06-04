import React from 'react';
import {Avatar, Chip, Typography} from "@material-ui/core";
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

export const AnimalsClassnameFilter = (props) => {

    const filterKey = 'className';

    const classes = useStyles();

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
            <div className={classes.root}>
                {
                    props.taxonomyCounted.map((filter:any)=>{

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

