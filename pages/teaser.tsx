import React, {useState} from 'react';

import {FeatureCollection} from 'geojson';
import {NavigationInterface} from "../components/Navigation/Interfaces";
import {Teaser, TeaserPropsInterface} from "../components/Map/Teaser";
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

export interface IndexState {
    openSearch: boolean;
}

export default function Index(props) {

    const {toggleSearch} = props;

    const [state, setState] = useState<IndexState>({
        openSearch: false,
    });

    const clickButton = () => {
        console.log('clickButton')
    };

    const teaserProps: TeaserPropsInterface = {
        image: "/images/elefant.jpg",
        title: "Live From Space",
        subLine: 'Mac Miller',
        href: '/foo/bar',
        close: ()=>{
            console.log('log')
        }
    }

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
                {...teaserProps}
            />
        </div>
  );
}