import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {default as MuiPaper} from '@mui/material/Paper';
import {styled} from "@mui/material/styles";

import {Icon} from "../../Icon/Icon";
import {IconName} from "../../Icon/IconNames";

export const Paper = styled(MuiPaper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

export interface FeatureProps {
    icon:IconName;
    label:string;
    value:string;
}

export const Feature = ({
    icon,
    label,
    value
}:FeatureProps) => {

    return (

        <Grid
            item
            xs={12}
            md={6}
        >
            <Paper
                elevation={0}
                square
            >
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                        <Icon icon={icon}/>
                    </Grid>
                    <Grid item xs>
                        <Typography>{label}</Typography>
                        <Typography>{value}</Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Grid>

    );
}
