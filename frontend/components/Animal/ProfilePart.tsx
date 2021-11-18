import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        }
    })
});

export interface ProfilePartProps {
    icon:string;
    label:string;
    value:string;
}

export const ProfilePart = ({
    icon,
    label,
    value
}:ProfilePartProps) => {

    const classes = useStyles();

    return (

        <Grid item xs={12} md={6}>
            <Paper
                className={classes.paper}
                elevation={0}
                square
            >
                <p>{icon}</p>
                <p>{label}</p>
                <p>{value}</p>

            </Paper>
        </Grid>

    );
}
