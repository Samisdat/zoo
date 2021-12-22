import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        iucnIndicator:{
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

        },
        iucnIndicatorAnimated:{
            transitionProperty: 'left'
        }
    });

});

export const IucnRedListIndicator = ({firstTimeInView, pos, left, iucnStatus, width}) => {

    const ref = React.createRef<HTMLDivElement>();

    const [hasBeenAnimated, setHasBeenAnimated] = useState(false);

    const classes = useStyles();

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

    const getClassName = () => {

        const animated = (hasBeenAnimated)?'':classes.iucnIndicatorAnimated;

        const className = `${classes.iucnIndicator} ${animated}`;

        return className;

    };

    return (
        <div
            ref={ref}
            className={getClassName()}
            style={getStyle()}
        >
            {iucnStatus}
        </div>
    );
}
