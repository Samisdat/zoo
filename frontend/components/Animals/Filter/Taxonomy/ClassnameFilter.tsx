import React from 'react';
import {Avatar, Chip, Typography} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {FilterCriteria} from "../FilteredNavigationList";

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

    const [active, setActive] = React.useState<string>(undefined);

    const changeActive = (key:string)=>{

        if(active === key){

            props.setFilterCriteria([]);
            setActive(undefined)

            return;

        }

        const filterCriteria:FilterCriteria = {
            key:filterKey,
            value: key,
        };

        props.setFilterCriteria([
            filterCriteria
        ]);

        setActive(key);
    };

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Taxonomy
            </Typography>

            <div className={classes.root}>
                {
                    props.taxonomyCounted.map((filter:any)=>{

                        const color = (filter.key === active)?'primary':'default';
                        return (
                            <Chip
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

