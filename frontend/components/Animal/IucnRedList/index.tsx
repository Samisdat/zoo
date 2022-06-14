import React, {useEffect, useState} from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import {default as MuiPaper} from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import {useViewport} from '../../viewport/useViewport';
import { useInView } from 'react-intersection-observer';


import {IucnRedListIndicator} from './Indicator';
import {styled} from '@mui/material/styles';
import {
    CRITICALLY_ENDANGERED,
    ENDANGERED, IucnStatus,
    LEAST_CONCERN,
    NEAR_THREATENED,
    VULNERABLE
} from "../../../data/graphql/animal/iucnStatus";

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

export const Paper = styled(MuiPaper)(({ theme }) => ({
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
}));

export const Iucn = styled('div')(({ theme }) => ({
    position:'relative',
    height: '66px',
    overflow:'hidden'
}));

export const IucnRange = styled('div')(({ theme }) => ({
    position:'relative',
    top:`${( (66 - 30) / 2)}px`,
    width: '100%',
    height: '30px',
    display: 'flex',
    background: 'linear-gradient(90deg, rgba(0,135,84,1) 0%, rgba(240,202,1,1) 50%, rgba(193,18,28,1) 100%)',
    borderRadius:'100px',
}));

export const IucnCat = styled('div')(({ theme }) => ({
    width: (100/possibleStati.length ) + '%',
    height: '30px',
    lineHeight: '30px',
    textAlign:'center',
    color:'#fff',
    borderRight:'1px solid #fff',
    fontWeight: 'bold',
    '&:last-child': {
        borderRight:'0px solid #fff',
    }
}));

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

    return (
        <Grid
            component={'section'}
            id={'endanger'}
            item
            xs={12}
        >
            <Paper
                square={true}
                elevation={0}
            >
                <Typography component="h2">
                    Bedrohung
                </Typography>

                <Iucn
                    ref={ref}
                >
                    <IucnRange
                        ref={rangeRef}
                    >
                        {
                            possibleStati.map((possibleStatus, i)=>{

                                //const statusClass = classes[`iucnCat${possibleStatus}`];

                                //const className = `${classes.iucnCat} ${statusClass}`;

                                return (
                                    <Tooltip
                                        key={i}
                                        title={catText[possibleStatus]}
                                    >
                                        <IucnCat>
                                            {possibleStatus}
                                        </IucnCat>
                                    </Tooltip>
                                )
                            })
                        }
                    </IucnRange>
                    <IucnRedListIndicator
                        firstTimeInView={firstTimeInView}
                        width={width}
                        pos={possibleStati.indexOf(iucnStatus)}
                        iucnStatus={iucnStatus}
                    />
                </Iucn>
            </Paper>
        </Grid>

    );
}
