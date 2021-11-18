import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ProfilePart} from "./ProfilePart";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        }
    })
});

export const Profile = () => {

    const classes = useStyles();

    return (

            <Grid container item spacing={2}>
                
                <ProfilePart
                    icon={'foo'}
                    label={'Herkunft'}
                    value={'Afrika'}
                />

                <ProfilePart
                    icon={'foo'}
                    label={'Lebensraum'}
                    value={'Afrika'}
                />

                <ProfilePart
                    icon={'foo'}
                    label={'Nahrung'}
                    value={'Afrika'}
                />

                <ProfilePart
                    icon={'foo'}
                    label={'Bestand'}
                    value={'Afrika'}
                />

                <ProfilePart
                    icon={'foo'}
                    label={'Größe'}
                    value={'Afrika'}
                />

                <ProfilePart
                    icon={'foo'}
                    label={'Gewicht'}
                    value={'Afrika'}
                />
                <ProfilePart
                    icon={'foo'}
                    label={'Tragzeit'}
                    value={'Afrika'}
                />
                <ProfilePart
                    icon={'foo'}
                    label={'Erreichbares Alter'}
                    value={'Afrika'}
                />


            </Grid>

    );
}
