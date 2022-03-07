import React from 'react';

import Accordion from '@mui/material/Accordion';
import {default as MuiAccordionDetails} from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionActions from '@mui/material/AccordionActions';
import {default as MuiTypography} from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';

import {Icon} from "./Icon/Icon";
import {styled} from "@mui/material/styles";

export const Root = styled('div')(({ theme }) => ({
    width: '100%',
}));

export const Heading = styled(MuiTypography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
}));

export const SecondaryHeading = styled(MuiTypography)(({ theme }) => ({
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
}));

export const Column = styled('div')(({ theme }) => ({
    flexBasis: '33.33%',
}));

export const Helper = styled(Column)(({ theme }) => ({
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    alignItems: 'center',
}));

export const Link = styled('a')(({ theme }) => ({
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline',
    },

}));

export default function DetailedAccordion() {


    return (
        <Root>
            <Accordion
                elevation={0}
                square={true}
            >
                <AccordionSummary
                    expandIcon={<Icon icon={'chevron_down'} size={'sm'}/>}
                    aria-controls="panel1c-content"
                    id="panel1c-header"
                >
                    <Column>
                        <Heading>Location</Heading>
                    </Column>
                    <Column>
                        <SecondaryHeading>Select trip destination</SecondaryHeading>
                    </Column>
                </AccordionSummary>
                <AccordionDetails>
                    <Column />
                    <Column>
                        heading           <Chip label="Barbados" onDelete={() => {}} />
                    </Column>
                    <Helper>
                        <MuiTypography variant="caption">
                            Select your destination of choice
                            <br />
                            <Link href="#secondary-heading-and-columns" >
                                Learn more
                            </Link>
                        </MuiTypography>
                    </Helper>
                </AccordionDetails>
                <Divider />
                <AccordionActions>
                    <Button size="small">Cancel</Button>
                    <Button size="small" color="primary">
                        Save
                    </Button>
                </AccordionActions>
            </Accordion>
        </Root>
    );
}
