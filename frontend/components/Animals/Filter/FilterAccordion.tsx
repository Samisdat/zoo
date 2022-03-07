import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import {AnimalsIucnFilter} from "./Iucn/IucnFilter";
import {AnimalsTaxonomyFilter} from "./Taxonomy/TaxonomyFilter";
import {Icon} from "../../Icon/Icon";

export const FilterAccordion = (props) => {

    return (
        <Accordion
            elevation={0}
            square={true}
        >
            <AccordionSummary
                expandIcon={
                    <Icon
                        icon={'chevron_down'}
                        size={'sm'}
                    />}
            >
                <Typography>
                    Filter
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
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
            </AccordionDetails>
        </Accordion>

    );
}
