import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {Icon} from "../../Icon/Icon";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        }
    })
});

export interface FeatureProps {
    icon:string;
    label:string;
    value:string;
}

export const Feature = ({
    icon,
    label,
    value
}:FeatureProps) => {

    const classes = useStyles();

    return (

        <Grid
            item
            xs={12}
            md={6}
        >
            <Paper
                className={classes.paper}
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
