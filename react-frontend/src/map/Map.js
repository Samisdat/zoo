import React, { Component, createRef } from 'react';

import { Map, TileLayer, Marker, Popup,Polyline } from 'react-leaflet'
import ListItem from "@material-ui/core/ListItem";
import Link from "../Link";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

export default class SimpleExample extends Component {
    state = {
        lat: 51.23925648995369,
        lng: 7.11062378150634421,
        zoom: 17,
    }


    render() {
        const position = [this.state.lat, this.state.lng]

        console.log('Map', this.props)

        const polyline = [this.props.coordinate];

        return (
            <Map center={position} zoom={this.state.zoom} style={{
                height:"700px"
            }}>>
                <TileLayer
                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {this.props.enclosures.map((enclosure) => (
                    <Polyline color="lime" positions={enclosure.coordinate} />
                ))}


            </Map>
        )
    }
}