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

    const orderBy = Object.keys(iucnStatusDe);

    props.iucnCounted.sort((valueA, valueB)=>{

        const firstIndex = orderBy.indexOf(valueA.key);
        const secondIndex = orderBy.indexOf(valueB.key);

        return (firstIndex - secondIndex);

    });

    return (
        <React.Fragment>
            <Typography variant="h4" gutterBottom>
                Rote Liste der gefährdeten Arten
            </Typography>
            <div className={classes.root}>
                {
                    props.iucnCounted.map((filter:any)=>{

                        const color = (filter.key === active?.value)?'primary':'default';
                        const iucnText = iucnStatusDe[filter.key];
                        return (
                            <Chip
                                key={`${filter.key}`}
                                className={classes.avatar}
                                avatar={<Avatar>{filter.count}</Avatar>}
                                label={`${iucnText} ${filter.key}`}
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

