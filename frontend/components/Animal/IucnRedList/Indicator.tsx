import React, {useEffect, useState} from 'react';
import Tooltip from '@mui/material/Tooltip';
import {catText} from "./index";
import styled from "@mui/system/styled";

const IucnIndicator = styled('div')({
    position: 'absolute',
    top:'0px',
    left:'-66px',
    width:'60px',
    height:'60px',
    background: 'red',
    border:'3px solid #fff',
    borderRadius: '100px',
    borderTopRightRadius: '0',
    lineHeight: '60px',
    textAlign: 'center',
    fontWeight: 'bold',
    color:'#fff',
    fontSize:'16px',
});

export const IucnRedListIndicator = ({firstTimeInView, pos, iucnStatus, width}) => {

    const ref = React.createRef<HTMLDivElement>();

    const [hasBeenAnimated, setHasBeenAnimated] = useState(false);

    useEffect(()=>{

        ref.current.ontransitionend = () => {

            setHasBeenAnimated(true);

        };

    });

    const getStyle = () => {

        const catWidth = width / 5;

        let left = -66

        if(false !== firstTimeInView){
            left = catWidth * pos + ( catWidth / 2 - (66 / 2));
        }

        const style = {
            left
        };

        if(false === hasBeenAnimated){
            (style as any).transitionDuration = `${( 300 * (pos + 1) )}ms`;
        }

        return style;
    };

    return (
        <Tooltip title={catText[iucnStatus]}>
        <IucnIndicator
            ref={ref}
            style={getStyle()}
        >
            {iucnStatus}
        </IucnIndicator>
        </Tooltip>
    );
}
