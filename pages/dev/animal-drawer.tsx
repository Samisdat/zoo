import React, {useState} from 'react';
import {Animals, AnimalsPropsInterface} from "components/Map/Animals";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function Index(props) {

    const [teaser, setTeaser] = useState<AnimalsPropsInterface>(undefined);

    const closeTeaser = ()=>{
        setTeaser(undefined);
    };

    const clickButton = () => {
        setTeaser({
            apiUrl: '/api/teaser/facility/affenhaus',
            close: closeTeaser,
            open:true
        });

    };

    return (
        <div
            style={{
                position:'absolute',
                top:0,
                bottom:0,
                left:0,
                right:0,
                background:'yellow'
            }}
        >
            <Button
                variant="contained"
                color="primary"
                style={{
                    position:'absolute',
                    top: '50%',
                    left:'50%',
                    marginTop:-12,
                    marginLeft:-30,
                }}
                onClick={clickButton}
            >
                Primary
            </Button>
            <Animals
                {...teaser}
            />
            <Drawer
                anchor='top'
                //open={props.openSearch}
                open={true}
                variant='persistent'
            >

                Suche
            </Drawer>

        </div>
  );
}