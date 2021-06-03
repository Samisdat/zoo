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

    console.log('AnimalsIucnFilter');

    const filterKey = 'iucnStatus';

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

                        const color = (filter.key === active)?'primary':'default';
                        const iucnText = iucnStatusDe[filter.key];
                        return (
                            <Chip
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

