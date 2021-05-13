import React from 'react';
import Typography from "@material-ui/core/Typography";

export const Endanger = ({iucnStatus}) => {
    
    return (
        <section id={'endanger'}>
            <Typography component="h2">
                Bedrohung
            </Typography>
            <img src={`/iucn/${iucnStatus}-scale.svg`}/>
        </section>
    );
}
