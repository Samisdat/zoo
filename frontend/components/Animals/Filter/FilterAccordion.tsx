import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionActions from '@material-ui/core/AccordionActions';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import {AnimalsIucnFilter} from "./Iucn/IucnFilter";
import {AnimalsTaxonomyFilter} from "./Taxonomy/TaxonomyFilter";
import {Icon} from "../../Icon/Icon";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        icon: {
            verticalAlign: 'bottom',
            height: 20,
            width: 20,
        },
        details: {
            alignItems: 'center',
        },
        column: {
            flexBasis: '33.33%',
        },
        helper: {
            borderLeft: `2px solid ${theme.palette.divider}`,
            padding: theme.spacing(1, 2),
        },
        link: {
            color: theme.palette.primary.main,
            textDecoration: 'none',
            '&:hover': {
                textDecoration: 'underline',
            },
        },
    }),
);

export const FilterAccordion = (props) => {

    const classes = useStyles();

    return (
        <div>
            <Accordion
                elevation={0}
                square={true}
            >
                <AccordionSummary
                    expandIcon={<Icon icon={'chevron_down'} size={'sm'}/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <div className={classes.column}>
                        <Typography className={classes.heading}>Filter</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails className={classes.details}>
                    <div>
                        <AnimalsIucnFilter
                            iucnCounted={props.iucnCounted}
                            filters={props.filters}
                            setFilters={props.setFilters}
                        />
                        <AnimalsTaxonomyFilter
                            taxonomyCounted={props.taxonomyCounted}
                            filters={props.filters}
                            setFilters={props.setFilters}
                        />
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
