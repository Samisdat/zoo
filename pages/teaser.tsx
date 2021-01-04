import React, {useState} from 'react';
import {Teaser, TeaserPropsInterface} from "../components/Map/Teaser";
import Button from "@material-ui/core/Button";

export interface IndexState {
    openSearch: boolean;
}

export default function Index(props) {
    
    const clickButton = () => {
        console.log('clickButton')
    };

    const teaserProps: TeaserPropsInterface = {
        apiUrl: 'foo/bar',
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