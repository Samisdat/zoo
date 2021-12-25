import React, {useEffect, useState} from 'react';
import Typography from "@material-ui/core/Typography";
import {Grid, Paper, Tooltip} from "@material-ui/core";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useViewport} from "../../viewport/useViewport";
import { useInView } from 'react-intersection-observer';

import {
    CRITICALLY_ENDANGERED,
    ENDANGERED, IucnStatus, LEAST_CONCERN,
    NEAR_THREATENED,
    VULNERABLE
} from "../../../strapi-api/entity/animal/iucnStatus";
import {IucnRedListIndicator} from "./Indicator";

const possibleStati = [
    LEAST_CONCERN,
    NEAR_THREATENED,
    VULNERABLE,
    ENDANGERED,
    CRITICALLY_ENDANGERED,
];

export const catText = {
    'LC': 'Nicht gefährdet',
    'NT': 'Potenziell gefährdet',
    'VU': 'Gefährdet',
    'EN': 'Stark gefährdet',
    'CR': 'Vom Aussterben bedroht',
};

const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        paper: {
            padding: theme.spacing(2),
            color: theme.palette.text.secondary,
        },
        iucn:{
            position:'relative',
            height: '66px',
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
            fontWeight: 'bold',
            "&:last-child": {
                borderRight:'0px solid #fff',
            }
        },
    });

});

export interface IucnRedListProps{
    iucnStatus:IucnStatus
}

export const IucnRedList = ({iucnStatus}:IucnRedListProps) => {

    const [width, setWidth] = useState(0);
    const [firstTimeInView, setFirstTimeInView] = useState(false);

    const [ref, inView] = useInView({
        threshold: 0,
    });

    const rangeRef = React.createRef<HTMLDivElement>();

    useViewport();

    useEffect(() => {

        setWidth(
            rangeRef.current.offsetWidth
        );

    });

    useEffect(() => {

        if(false === firstTimeInView && true === inView){
            setFirstTimeInView(true);
        }

    },[inView]);

    const classes = useStyles();

    return (
        <Grid
            component={'section'}
            id={'endanger'}
            item
            xs={12}

        >
            <Paper
                className={classes.paper}
                square={true}
                elevation={0}
            >
                <Typography component="h2">
                    Bedrohung
                </Typography>

                <div
                    className={classes.iucn}
                    ref={ref}
                >
                    <div
                        className={classes.iucnRange}
                        ref={rangeRef}
                    >
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
                    <IucnRedListIndicator
                        firstTimeInView={firstTimeInView}
                        width={width}
                        pos={possibleStati.indexOf(iucnStatus)}
                        iucnStatus={iucnStatus}
                    />
                </div>
            </Paper>
        </Grid>

    );
}
