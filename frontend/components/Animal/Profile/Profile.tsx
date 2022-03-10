import React from 'react';
import Grid from '@mui/material/Grid';
import {AnimalProfileStrapi} from 'strapi-api/entity/animal/animal-strapi-interface';
import {Feature} from './Feature';

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
