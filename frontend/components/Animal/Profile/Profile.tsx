import React from 'react';
import Grid from '@mui/material/Grid';
import {Feature} from './Feature';
import {AnimalProfileStrapi} from "../../../data/graphql/animal/animal-json";

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
                                key={i}
                                {...feature}
                            />
                        )
                    })
                }

            </Grid>

    );
}
