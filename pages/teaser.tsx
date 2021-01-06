import React, {useState} from 'react';
import {Teaser, TeaserPropsInterface} from "../components/Map/Teaser";
import Button from "@material-ui/core/Button";

export default function Index(props) {

    const [teaser, setTeaser] = useState<TeaserPropsInterface>(undefined);

    const closeTeaser = ()=>{
        setTeaser(undefined);
    };

    const clickButton = () => {
        setTeaser({
            apiUrl: 'foo/bar',
            close: closeTeaser
        })

    };

    return (
        <div
            style={{
                position:'absolute',
                top:0,
                bottom:0,
                left:0,
                right:0,
                background:'blue'
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
            <Teaser
                {...teaser}
            />
        </div>
  );
}