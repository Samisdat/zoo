import React, {useEffect} from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid, Paper, Tooltip} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useViewport} from "../viewport/useViewport";
import { useInView } from 'react-intersection-observer';

import {
    CRITICALLY_ENDANGERED,
    ENDANGERED, EXTINCT_IN_THE_WILD, LEAST_CONCERN,
    NEAR_THREATENED,
    VULNERABLE
} from "../../strapi-api/entity/animal/iucnStatus";


const possibleStati = [
    LEAST_CONCERN,
    NEAR_THREATENED,
    VULNERABLE,
    ENDANGERED,
    CRITICALLY_ENDANGERED,
    EXTINCT_IN_THE_WILD,
];

const catText = {
    'LC': 'Nicht gefährdet',
    'NT': 'Potenziell gefährdet',
    'VU': 'Gefährdet',
    'EN': 'Stark gefährdet',
    'CR': 'Vom Aussterben bedroht',
    'EW': '#591B09',
};

const statusColors = {
    'LC': '#176E24',
    'NT': '#C59820',
    'VU': '#F0A017',
    'EN': '#E5751C',
    'CR': '#D2281C',
    'EW': '#591B09',
}

const useStyles = makeStyles((theme: Theme) => {

    const styles = {
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        img:{
            width:'100%',
        },
        iucn:{
            position:'relative',
            height: '66px',
            background: 'blue',
            overflow:'hidden'
        },
        iucnRange:{
            position:'relative',
            top:`${( (66 - 30) / 2)}px`,
            width: '100%',
            height: '30px',
            display: 'flex',
            background: 'linear-gradient(90deg, rgba(0,135,84,1) 0%, rgba(240,202,1,1) 50%, rgba(193,18,28,1) 100%)',
            borderRadius:'100px',
        },
        iucnCat:{
            width: (100/possibleStati.length ) + '%',
            height: '30px',
            lineHeight: '30px',
            textAlign:'center',
            color:'#fff',
            borderRight:'1px solid #fff',
            "&:last-child": {
                borderRight:'0px solid #fff',
            }
        },
        iucnIndicator:{
          position: 'absolute',
            /*top:`-${ ( (60 + 2 * 3 - 30)  / 2)}px`,*/
            top:'0px',
            left:'10px',
            width:'60px',
            height:'60px',
            background: 'red',
            border:'3px solid #fff',
            borderRadius: '100px',
            borderTopRightRadius: '0'

        },
    };

    for(const possibleStatus of possibleStati){
        /*
        styles[`iucnCat${possibleStatus}`] = {
            background: statusColors[possibleStatus]
        };

         */

    }

    return createStyles(styles);

});

export const Endanger = ({iucnStatus}) => {

    const [ref, inView] = useInView({
        threshold: 0,
    });

    useEffect(() => {
       console.log(inView)
    },[inView]);

    const { width} = useViewport();

    const classes = useStyles();
``
    const imgName = (width > 600 ) ? `${iucnStatus}-scale.svg`: `${iucnStatus}.svg`;
    const imgPath = `/iucn/${imgName}`;

    return (
        <Grid
            component={'section'}
            id={'endanger'}
            item
            xs={12}
            ref={ref}
        >
            <Paper
                className={classes.paper}
                square={true}
                elevation={0}
            >
                <Typography component="h2">
                    Bedrohung<br/>
                    {iucnStatus}
                    <br/>
                    {width}<br/>
                    {inView.toString()}
                </Typography>

                <div className={classes.iucn}>
                    <div className={classes.iucnRange}>

                        {
                            possibleStati.map((possibleStatus, i)=>{

                                const statusClass = classes[`iucnCat${possibleStatus}`];

                                const className = `${classes.iucnCat} ${statusClass}`;

                                return (
                                    <Tooltip title={catText[possibleStatus]}>
                                        <div
                                            key={i}
                                            className={className}
                                        >
                                            {possibleStatus}
                                        </div>
                                    </Tooltip>
                                )
                            })
                        }
                    </div>
                    <div
                        className={classes.iucnIndicator}
                    />
                </div>
            </Paper>
        </Grid>

    );
}
