import React from 'react';
import {Grid, Paper} from "@material-ui/core";
import {AnimalProfileStrapi} from "../../../strapi-api/entity/animal/animal-strapi-interface";
import {Feature} from "./Feature";

export interface ProfileProps{
    profile:AnimalProfileStrapi[];
}

export const Profile = ({
    profile
}:ProfileProps
) => {

    return (

            <Grid container item spacing={2}>

                {
                    profile.map((feature, i)=>{
                        return (
                            <Feature
                                {...feature}
                            />
                        )
                    })
                }

            </Grid>

    );
}
