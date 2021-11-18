import React from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid, Paper} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {ProfilePart} from "./ProfilePart";
import {AnimalProfileStrapi} from "../../strapi-api/entity/animal/animal-strapi-interface";
import {NavigationListGroup} from "../NavigationList/NavigationListGroup";

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        }
    })
});

export interface ProfileProps{
    profile:AnimalProfileStrapi[];
}

export const Profile = ({
    profile
}:ProfileProps
) => {

    const classes = useStyles();

    console.log(profile);


    return (

            <Grid container item spacing={2}>

                {
                    profile.map((feature, i)=>{
                        return (
                            <ProfilePart
                                {...feature}
                            />
                        )
                    })
                }

            </Grid>

    );
}
