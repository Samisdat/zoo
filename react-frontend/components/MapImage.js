import React, { Component, createRef } from 'react';

import { Map, TileLayer, ImageOverlay, Rectangle,Polyline } from 'react-leaflet'

export default class SimpleExample extends Component {
    state = {
        lat: 51.23925648995369,
        lng: 7.11062378150634421,
        zoom: 18,
    }
    constructor(props) {

        super(props);

        this.handleClick = this.handleClick.bind(this);
    }


    handleClick= (event) => {

        const {lat, lng} = event.latlng;

        console.log(lat, lng)

    }

    render() {
        const position = [this.state.lat, this.state.lng]

        /*
        const coordinates = [[
                        '7.1078728',
                        '51.2409631'
                    ],
                    [
                        '7.1078441',
                        '51.2406187'
                    ],
                    [
                        '7.1078071',
                        '51.2402079'
                    ],
                    [
                        '7.1076339',
                        '51.2399760'
                    ],
                    [
                        '7.1074717',
                        '51.2399659'
                    ],
                    [
                        '7.1074462',
                        '51.2399424'
                    ],
                    [
                        '7.1072471',
                        '51.2400118'
                    ],
                    [
                        '7.1072153',
                        '51.2400564'
                    ],
                    [
                        '7.1072100',
                        '51.2402423'
                    ],
                    [
                        '7.1069446',
                        '51.2399004'
                    ],
                    [
                        '7.1069119',
                        '51.2397249'
                    ],
                    [
                        '7.1064958',
                        '51.2395727'
                    ],
                    [
                        '7.1068797',
                        '51.2386674'
                    ],
                    [
                        '7.1071635',
                        '51.2386783'
                    ],
                    [
                        '7.1074634',
                        '51.2386567'
                    ],
                    [
                        '7.1074262',
                        '51.2385525'
                    ],
                    [
                        '7.1077665',
                        '51.2384377'
                    ],
                    [
                        '7.1080121',
                        '51.2384631'
                    ],
                    [
                        '7.1088968',
                        '51.2383665'
                    ],
                    [
                        '7.1092229',
                        '51.2383343'
                    ],
                    [
                        '7.1098811',
                        '51.2383133'
                    ],
                    [
                        '7.1109568',
                        '51.2382275'
                    ],
                    [
                        '7.1115919',
                        '51.2377583'
                    ],
                    [
                        '7.1118658',
                        '51.2374161'
                    ],
                    [
                        '7.1106353',
                        '51.2373866'
                    ],
                    [
                        '7.1106610',
                        '51.2371462'
                    ],
                    [
                        '7.1148006',
                        '51.2368794'
                    ],
                    [
                        '7.1151575',
                        '51.2382294'
                    ],
                    [
                        '7.1152940',
                        '51.2392646'
                    ],
                    [
                        '7.1141207',
                        '51.2390924'
                    ],
                    [
                        '7.1141550',
                        '51.2394900'
                    ],
                    [
                        '7.1142580',
                        '51.2398930'
                    ],
                    [
                        '7.1144039',
                        '51.2402692'
                    ],
                    [
                        '7.1144039',
                        '51.2406507'
                    ],
                    [
                        '7.1143524',
                        '51.2409731'
                    ],
                    [
                        '7.1141807',
                        '51.2413546'
                    ],
                    [
                        '7.1140189',
                        '51.2415666'
                    ],
                    [
                        '7.1139475',
                        '51.2416647'
                    ],
                    [
                        '7.1118964',
                        '51.2416469'
                    ],
                    [
                        '7.1108029',
                        '51.2416502'
                    ],
                    [
                        '7.1104412',
                        '51.2416736'
                    ],
                    [
                        '7.1101155',
                        '51.2416759'
                    ],
                    [
                        '7.1100282',
                        '51.2415866'
                    ],
                    [
                        '7.1090371',
                        '51.2412114'
                    ],
                    [
                        '7.1092307',
                        '51.2410425'
                    ],
                    [
                        '7.1090588',
                        '51.2409705'
                    ],
                    [
                        '7.1090312',
                        '51.2409590'
                    ],
                    [
                        '7.1089170',
                        '51.2410521'
                    ],
                    [
                        '7.1088362',
                        '51.2410184'
                    ],
                    [
                        '7.1087485',
                        '51.2410855'
                    ],
                    [
                        '7.1085642',
                        '51.2410137'
                    ],
                    [
                        '7.1078728',
                        '51.2409631'
                    ]
                ];

        let smallestLat = 100;
        let largesLat = 0;
        let smallestLng = 100;
        let largesLng = 0;

        for(let coordinate of coordinates){

            if(smallestLat > coordinate[1]){
                smallestLat = coordinate[1];
            }

            if(largesLat < coordinate[1]){
                largesLat = coordinate[1];
            }

            if(smallestLng > coordinate[0]){
                smallestLng = coordinate[0];
            }

            if(largesLng < coordinate[0]){
                largesLng = coordinate[0];
            }

        }



        const imageBounds = [[smallestLat,smallestLng],[largesLat,largesLng,]];
        console.log(JSON.stringify(imageBounds))
        */
        let imageBounds = [
            ["51.2368794","7.1064958"],
            ["51.2416759","7.1152940"]
        ];

        imageBounds = [
            ["oben","links"],
            ["unten","rechts"]
        ];

        imageBounds = [[51.236776961813064, 7.105611562728882], [51.24177020918754, 7.115809321403503]];

        return (
            <Map
                center={position}
                zoom={this.state.zoom}
                onClick={this.handleClick}
                style={{height:"700px"}}
                maxZoom="20"
            >
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <ImageOverlay
                    url="/map-images/combined.png"
                    bounds={imageBounds}
                    opacity="0.5"
                />
                <Rectangle
                    bounds={imageBounds}
                />
            </Map>
        )
    }
}