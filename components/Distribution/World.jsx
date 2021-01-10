import React, {useEffect, useState} from 'react';

import * as d3 from 'd3';

import * as topojson from "topojson-client";

const mapTransformDefault = {
    k:1,
    x:0,
    y:0
}
/*
export interface GeographicRangeMapStateInterface {
    width: number;
    height: number;
    dimensionUnit: string;
    color: string;
    pathGenerator: GeoPath,
    projection: GeoProjection;
    transform: MapTransformInterface;
}
*/
const MapStateDefault = {
    width: 100,
    height: 100,
    dimensionUnit: '%',
    color: 'blue',
    pathGenerator: undefined,
    projection: undefined,
    transform: {
        ...mapTransformDefault
    },
}

export const centerToFeatureCollection = (featureset) => {

    const latitudes = [];
    const longitudes = [];

    for(const feature of featureset.features){

        if('Polygon' === feature.geometry.type){

            for(const coordinates of feature.geometry.coordinates){

                for(const coordinate of coordinates){


                    latitudes.push(coordinate[1]);
                    longitudes.push(coordinate[0]);
                }

            }

        }
        else if('MultiPolygon' === feature.geometry.type){

            for(const coordinates of feature.geometry.coordinates){

                for(const coordinate of coordinates){

                    for(const coord of coordinate){
                        latitudes.push(coord[1]);
                        longitudes.push(coord[0]);
                    }

                }

            }

        }


    }

    let north = Math.max(...latitudes);

    let south = Math.min(...latitudes);

    let west = Math.max(...longitudes);
    let east = Math.min(...longitudes);

    return {
        "type": "Feature",
        "properties": {
            "name": "Afghanistan"
        },
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [east, north],
                    [west, north],
                    [west, south],
                    [east, south],
                    [east, north],
                ]
            ]
        }
    };

}


export const World = (props) => {

    const svgId = 'geographic-range';
    const worldId = 'geographic-range-world';
    const whereId = "geographic-range-where";
    const rectId = "geographic-range-react";

    const [mapState, setMapState] = useState(MapStateDefault);

    const createMapUsa = () => {

        const width = 975;
        const height = 610;

        const path = d3.geoPath()

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", zoomed);

        const svg = d3.select(`#${svgId}`)
            .attr("viewBox", [0, 0, width, height])
            .on("click", reset);

        const g = svg.append("g");

        const states = g.append("g")
            .attr("fill", "#444")
            .attr("cursor", "pointer")
            .selectAll("path")
            .data(topojson.feature(props.usa, props.usa.objects.states).features)
            .join("path")
            .on("click", clicked)
            .attr("d", path);

        states.append("title")
            .text(d => d.properties.name);

        g.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path(topojson.mesh(props.usa, props.usa.objects.states, (a, b) => a !== b)));

        svg.call(zoom);

        function reset() {
            states.transition().style("fill", null);
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity,
                d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
            );
        }

        function clicked(event, d) {
            console.log(JSON.stringify(d));
            const [[x0, y0], [x1, y1]] = path.bounds(d);
            event.stopPropagation();
            states.transition().style("fill", null);
            d3.select(this).transition().style("fill", "red");
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
                    .translate(width / 2, height / 2)
                    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
                d3.pointer(event, svg.node())
            );
        }

        const zoomToMe = {"type":"Feature","id":"19","properties":{"name":"Iowa"},"geometry":{"type":"Polygon","coordinates":[[[490.5931070602583,195.24092984588285],[502.2678912545246,195.26467380619232],[515.8004889336177,195.15782598479973],[534.1248241254879,194.86102648093143],[549.2817396055223,194.4336351953611],[567.8091145225102,193.69163643569038],[576.3266309911967,193.28205312035215],[576.123591266079,194.26742747319486],[576.7022544826643,195.19937791534127],[576.5296707163143,196.34502400027287],[578.3570282423734,197.44911815466293],[579.2402510466353,198.7312920113739],[577.4230455068321,201.6458631393605],[577.5651733144144,203.7650115969801],[578.123532558488,205.4627047591067],[578.214900434791,206.76862257612717],[578.9762994039824,207.2494377723938],[579.9204341257795,210.51423231494496],[581.9102234319328,211.65987839987656],[585.554786497795,212.4374931000115],[586.6207450546628,214.04021042090025],[587.0065205323864,215.3817441783849],[586.9963685461305,216.21871877929348],[588.2958227868836,216.83606174733953],[588.7019022371189,217.4652766955403],[590.0419644228956,218.18353149490156],[591.0267070897163,219.40040946076152],[590.8338193508546,220.4273357441458],[591.5647623612782,221.5907897993095],[594.5799022792756,222.98574746749046],[595.5240370010729,223.84053003863113],[595.595100904864,225.5441591908351],[596.0620922726347,226.40487775205315],[595.7473806987023,227.3843161148185],[595.9707243963318,228.62493804098796],[595.5443409735847,231.01714204216634],[594.0723029664815,231.9312845140807],[593.503791736152,232.72077119437031],[593.2499920797549,233.9910730709266],[593.2296881072431,236.0924135583141],[592.0926656465841,236.67414058589594],[591.3312666773928,237.67732290897075],[589.1587416186337,238.04535429376742],[588.1333910067895,239.2622322596274],[586.773024848501,239.61839166426935],[584.7527795835801,239.66587958488827],[583.5649971916417,240.44943027510055],[582.7934462361947,240.2001186918512],[581.5955118580004,240.79371769958777],[581.2604963115562,243.22153764123038],[580.6818330949708,244.72334313080393],[581.9914393219798,246.37948436238898],[582.8848141124976,246.56943604486466],[583.6868210267124,247.8812898519625],[583.8289488342948,249.20501563921508],[583.6157571229212,251.81685127325602],[583.0269419200799,252.2323705786716],[581.4736880229298,254.5236627485348],[581.5447519267209,255.5446530418417],[581.2097363802767,257.77064932085386],[580.1742337821765,258.57200798129827],[579.1082752253088,258.61355991183984],[577.4128935205762,259.35555867151055],[576.5093667438025,260.9345320320898],[577.2809176992497,261.878354454391],[577.1590938641791,264.41302221742615],[576.468758798779,264.7038857312171],[575.3520403106318,264.6326538502887],[574.631249286464,264.05092682270686],[574.5094254513934,262.9468326683168],[573.9104582622963,262.9349606881621],[572.9561715542433,261.97333029562884],[572.7734358016373,261.0948037641787],[571.7988451210725,260.9226600519351],[570.9257743030665,259.5692543142957],[564.672150769442,260.109429411336],[553.4034460254111,260.8336202007746],[544.8148656529335,261.28475544665446],[539.9013043050857,261.4272192085112],[530.6325408534638,261.81305856354],[521.3942333606095,262.0148822261704],[502.02424358438344,261.8546104940815],[502.2678912545246,261.30849940696385],[501.618164134148,260.1569173319549],[500.70448537111855,259.7473340166167],[499.91263044315957,258.5007761003699],[500.70448537111855,257.60444159868763],[500.6232694810714,255.43780522044912],[501.15117276637744,255.11726175627138],[500.7349413298861,253.74011205832252],[500.93798105500383,252.9981132986518],[500.2374940033479,252.15520270766586],[500.34916585216257,250.3447257340693],[499.9938463332066,248.82511227426366],[500.663877426095,248.23744925660446],[499.5471589379478,248.14840940544397],[499.2121433915036,245.84524525542605],[499.8821744843919,245.99958099743756],[500.0852142095096,245.22196629730263],[498.917735790083,244.72927912088127],[499.3339672265742,241.94529977459675],[497.94314510951807,241.56539640964533],[498.1461848346358,240.65718992780836],[497.55736963179453,239.9923590391434],[497.12083422279153,240.72842180873675],[496.4000431986238,239.85583126736398],[496.65384285502086,239.2325523092406],[496.0650276521796,238.15220211516],[496.379739226112,237.74261879982177],[496.0447236796678,236.49012489349758],[496.8568825801386,233.99700906100398],[496.2782193635532,233.68240158690358],[495.3036286829883,231.65822897052186],[495.8518359408061,230.15048749087094],[494.1767582085852,229.62812036406277],[494.24782211237647,228.69616992191632],[493.4762711569293,228.47060229897644],[493.5574870469763,226.98066878955763],[492.29864075124675,225.82908671454868],[492.07529705361736,224.5765928082245],[492.62350431143506,224.244177363892],[491.87225732849964,222.44557237045018],[491.0600984280289,221.46019801760747],[491.10070637305245,220.3442318830627],[491.6895215758937,219.29356163936896],[491.43572191949664,218.4328430781509],[490.61341103277,218.2785073361394],[489.8621640498347,217.59586847724233],[490.09565973371997,216.78263783664323],[489.1007650806434,214.50915363701213],[487.5678151560049,213.34569958184844],[487.5373591972372,211.92106196328066],[489.01954919059625,210.0393531087557],[489.0804611081316,208.36540390693855],[489.7606441872758,207.57591722664893],[489.6083643934375,205.51019267972563],[490.3900673351406,205.21339317585733],[490.8266027441436,203.89560337868215],[490.33930740386114,203.2248364999398],[490.0448998024405,201.53307932789056],[488.80635747922275,201.5271433378132],[488.49164590529034,199.8413221558413],[489.3850206958081,199.57420260235986],[489.46623658585514,197.8527654799238],[488.27845419391673,196.736799345379],[488.2073902901256,195.22312187565075],[490.5931070602583,195.24092984588285]]]}};
        const [[x0, y0], [x1, y1]] = path.bounds(zoomToMe);

        svg.call(
            zoom.transform,
            d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2)
        );




            function zoomed(event) {
            const {transform} = event;
            g.attr("transform", transform);
            g.attr("stroke-width", 1 / transform.k);
        }



    }

    const createMap = () => {

        const width = window.innerWidth - 40;
        //const height = (width/3*2);

        const ratio = 0.5;

        //const width = 800;
        const height = width * ratio;

        const projection = d3.geoNaturalEarth1()
            .translate([width / 2, height / 2 + 10])
            .scale(150)
            //.center(center)

        const pathGenerator = d3.geoPath().projection(projection)

        d3.select(`#${worldId}`)
            .selectAll("path")
            .data(props.world_countries.features)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "red";
            })
            .attr("stroke", (d) => {
                return "black";
            })
            .attr("opacity", (d) => {
                return 1;
            })
            .attr("d", pathGenerator)

        d3.select(`#${whereId}`)
            .selectAll("path")
            .data(props.geojson.features)
            .enter()
            .append("path")
            .attr("fill", (d) => {
                return "green";
            })
            .attr("stroke", (d) => {
                return "green";
            })
            .attr("opacity", (d) => {
                return 1;
            })
            .attr("d", pathGenerator)


        const center = centerToFeatureCollection(props.geojson);

        console.log(center)


        d3.select(`#${rectId}`)
            .selectAll("path")
            .exit()
            .data([center])
            .enter()
            .append("path")
            .attr("fill", (d)=>{
                return '#0f0';
            })
            .attr("stroke", (d)=>{
                return '#0f0';
            })
            .attr("opacity", 0.7)
            .attr("d", pathGenerator)

        const nextMapState = {
            ...mapState,
            width,
            height,
            dimensionUnit:'px',
            color: 'blue',
            pathGenerator,
            projection: projection,
        };

        setMapState(nextMapState)

    }

    // @TODO add reducer to prevent render twice
    useEffect(() => {

        if (undefined === mapState.pathGenerator) {
            createMapUsa();
        }

    });

    return (
        <svg id={svgId} style={{
            width: `${mapState.width}${mapState.dimensionUnit}` ,
            height: `${mapState.height}${mapState.dimensionUnit}`,
            backgroundColor: mapState.color,
            display: 'block',
        }}
        >
            <g id={worldId}></g>
            <g id={whereId}></g>
            <g id={rectId}></g>

        </svg>
    );

}
