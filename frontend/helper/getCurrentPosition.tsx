import {usePersistedState} from "../hooks/persisted-state";

import * as d3 from 'd3';

const getCurrentPositionGeoJson = (title, lat, lng) => {

    return {
        "type": "Feature",
        "properties":{
            name: "Aktuelle Position" + title,
            slug: "current-position" + title,
            zIndex: 100,
            fill: "black"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                lng,
                lat
            ]
        }
    };

};

let data = [];

function randomLetters() {
    return d3.shuffle("abcdefghijklmnopqrstuvwxyz".split(""))
        .slice(0, Math.floor(6 + Math.random() * 20))
        .sort();
}
export const currentPosition = (title, marker, svg, geoPath)=>{

    const g = svg.select('g');

    /*
        const textUpdate = g.selectAll("text")
            .data(randomLetters(), d => d)
            .attr("fill", "gray");

        const textEnter = textUpdate.enter().append("text")
            .attr("fill", "green")
            .text(d => d)
            .attr('y', 20)

        const textExit = textUpdate.exit().remove();

        textEnter.merge(textUpdate)
            .attr("x", (d, i) => i * 16);

        g.node();




    return
    */

    const currentPositionGeoJson = getCurrentPositionGeoJson(title, marker.lat, marker.lng);

    /*
    if(0 < data.length){
        let foo = data.pop();

        console.log(foo);
    }
    */

    data.push(currentPositionGeoJson)

    /*
    if( 1 < data.length){
        data = [data[0]]
    }*/

    const gPos = svg.select('g');

    const update = gPos.selectAll(".pos").data(data);

    update.enter().append("path")
        .classed('pos', true)
        .attr("title", (d)=>{
            return d.properties.slug;
        })
        .attr("fill", (d, i)=>{
            console.log(i)
            return d.properties.fill;
        })
        .attr("stroke", (d)=>{
            return d.properties.stroke;
        })
        .attr("d", geoPath);

    update.exit().remove();

    gPos.node();

}