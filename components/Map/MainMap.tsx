import {useEffect} from 'react';

import * as d3 from 'd3';

import {usePersistedState} from "hooks/persisted-state";

import DrawedElementes from 'components/Map/DrawedElementes';

import CurrentPosition from 'components/Map/CurrentPosition';
import Ways from 'components/Map/Ways';


import {MapContext} from 'components/Map/Context';

export default function MainMap(props) {

    const svgId = 'main-svg';
    const mapId = 'main-map';

    let geoPath = undefined;

    const [marker, setMarker] = usePersistedState('marker', {
        lat: 51.238741,
        lng: 7.107757,
        isWithin: true,
        text: 'Map Marker Text'
    });

    const changeMarker = (text:string) => {
        console.log('Call from child', text);

        setMarker(
            {
                ...marker,
                text:text
            }
        )
    }


    const [transform, setTransform] = usePersistedState('zoom', {
        k:1,
        x:0,
        y:0
    });

    const [mainText, setMainText] = usePersistedState('main-text', 'Map Main State');

    const renderSvg = () => {

        let viewportWidth = window.innerWidth;
        let viewportHeight = window.innerHeight;

        //viewportWidth = 329;
        //viewportHeight = 568;

        const projection = d3.geoMercator()
            .translate([viewportWidth / 2, viewportHeight / 2]);

        geoPath = d3.geoPath()
            .projection(projection);

        MapContext.Consumer.geoPath = geoPath;

        var center = d3.geoCentroid(props.border);

        projection
            .scale(3000000)
            .center(center)

        var mapSvg = d3.select(`#${svgId}`)
            .attr("width", viewportWidth + 'px')
            .attr("height", viewportHeight + 'px')
            .attr("style", 'background:blue')
        ;

        const mapGroup = mapSvg.select(`#${mapId}`);

        function onClick() {

            const position = projection.invert(d3.mouse(this))

            setMarker({
                lng: position[0],
                lat: position[1],
                isWithin: d3.geoContains(props.border, position),
                text: 'Map Marker Text Update'
            })

        };

        mapSvg.on("click", onClick);

        var zooming = d3.zoom()
            .scaleExtent([0.5, 8])
            .on('zoom', () => {

                mapGroup
                    .attr('transform', d3.event.transform);

            })
            .on('end', () => {

                setTransform(d3.event.transform);

            });

        mapSvg.call(zooming);

    };

    useEffect(() => {
        renderSvg();
    });

    return (
        <div>
            <svg id={svgId} style={{
                width: '100%',
                height: '100%',
                background: 'red'
            }}
            >
                <g id={mapId}>
                    <DrawedElementes {...props}></DrawedElementes>
                    <Ways {...props.ways}></Ways>
                    <text id="eins" x="10" y="120" style={{
                        color: '#fff',
                        fontWeight: 'bold'
                    }}>{mainText}</text>
                    <CurrentPosition callback={changeMarker} {...marker} />
                </g>
            </svg>

        </div>
    );

}