import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "../hooks/persisted-state";
import {
    getCurrentPositionGeoJson,
    updateCurrentPosition
} from "../helper/getCurrentPosition";
import {width} from "@material-ui/system";

export default function ZooMap(props) {

    const svgId = 'main-svg';
    const mapId = 'main-map';
    const mapElementId = 'main-elements';
    const positionId = 'main-position';

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757
    });

    const [data, setData] = useState([1, 1, 1]);

    const [matrix, setMatrix] = useState([
        [11975,  5871, 8916, 2868, 2868],
        [ 1951, 10048, 2060, 6171, 2868],
        [ 8010, 16145, 8090, 8045, 2868],
        [ 1013,   990,  940, 6907, 2868]
    ]);

    const updateTable = () =>{

        setMatrix([
            [1],
            [2],
            [3],
            [4],
        ])

    }

    const updateTable2 = () =>{

        setMatrix([
            [5],
            [6],
            [7],
            [8],
        ])

    }

    const updateTable3 = () =>{

        setMatrix([
            [1, 2, 3, 4],
            [2, 3, 4, 5],
            [3, 4, 5, 6],
            [4, 5, 6, 7],
        ])

    }

    const updateTable4 = () =>{

        setMatrix([
            [6,6,6],
            [6,6,6],
            [6,6,6],
        ])

    }


    const circleRadius = 60;
    const circleDiameter = circleRadius * 2;

    const renderSvg = () => {

        console.log('render')


        const table = d3.select("table")
            .selectAll("tr")
            .data(matrix)
            .join("tr")
            .selectAll("td")
            .data(d => d)
            .join("td")
            .text(d => d);

        table.on("click", () => {
            console.log('click');
            updateTable4()
        });

        const svg = d3.select('svg#my-3');

        const circle = svg
            .selectAll('circle')
            .data(data);

        circle
            .enter()
            .append('circle')
            .attr('cy', circleRadius)
            .attr('cx', (d, i) => circleRadius + (i * circleDiameter))
            .attr('r', 0)
            .transition()
            .attr('r', circleRadius);

        circle
            .exit()
            .transition()
            .attr('r', 0)
            .remove();


        // map

        const border = props.features.find((feature)=>{

            return ('aussengrenze' === feature.properties.slug)

        })

        const width = 400;
        const height = 300;

        const projection = d3.geoMercator()
            .translate([width / 2, height / 2]);

        const geoPath = d3.geoPath()
            .projection(projection);

        var center = d3.geoCentroid(border);

        projection
            .scale(2000000)
            .center(center)

        var mapSvg = d3.select(`#${svgId}`)
            .attr("width", width + 'px')
            .attr("height", height + 'px')
            .attr("style", 'background:blue')
        ;

        const mapGroup = mapSvg.select(`#${mapId}`);

        var elementsGroup = mapSvg.select(`#${mapElementId}`);
        elementsGroup.selectAll("path")
            .data(props.features)
            .enter()
            .append("path")
            .attr("fill", (d)=>{
                return d.properties.fill;
            })
            .attr("stroke", (d)=>{
                return d.properties.stroke;
            })
            .attr("d", geoPath)
            .attr('title', (d) => {
                if(undefined === d.properties || undefined === d.properties.name){
                    return;
                }

                return  d.properties.name;
            })


        var positionGroup = mapSvg.select(`#${positionId}`);
        const currentPosition = getCurrentPositionGeoJson('initial', marker.lat, marker.lng);

        let update = positionGroup.selectAll("circle")
            .data(currentPosition)
            .join("circle")

            .attr("transform", function(d) { return "translate(" + geoPath.centroid(d) + ")"; })
            .attr("title", (d)=>{
                return d.properties.slug;
            })
            .attr("fill", (d, i)=>{
                return d.properties.fill;
            })
            .attr("stroke", (d)=>{
                return d.properties.stroke;
            })
            .attr("d", geoPath)
            .attr("r", 5)

        ;

        function onClick() {

            const position = projection.invert(d3.mouse(this))

            setMarker({
                lng: position[0],
                lat: position[1]
            })
            console.log(marker)


        };

        mapSvg.on("click", onClick);

        var zoom = d3.zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', function() {
                mapGroup
                    .attr('transform', d3.event.transform);

            });

        mapSvg.call(zoom);


    };

    useEffect(() => {
       renderSvg();
    });

    const addCircle = () => {

        const update = [
            ...data
        ];

        if (update.length < 5) {
            update.push(1);
        }

        setData(update);

    };

    const removeCircle = () => {

        const update = [
            ...data
        ];

        update.pop();
        setData(update);
    };

    return (
        <div>
            <table></table>
            <div className="container my-3 my-md-5">
                <svg id="my-3"style={{
                    width: '800px'
                }}></svg>

                <button onClick={addCircle}>Add circle</button>
                <button onClick={removeCircle}>Remove circle</button>

                <button onClick={updateTable}>Update Table</button>
                <button onClick={updateTable2}>Update Table</button>
                <button onClick={updateTable3}>Update Table</button>
                <button onClick={updateTable4}>Update Table</button>
            </div>
            <svg id={svgId} style={{
                width: '400px',
                height: '300px',
                background: 'red'
            }}
            >
                <g id={mapId}>
                    <g id={mapElementId}></g>
                    <g id={positionId}></g>
                </g>
            </svg>

        </div>
    );

}