import React, {useEffect, useRef} from 'react';

import * as d3 from 'd3';

//interpolator from http://bl.ocks.org/jasondavies/4183701
const d3_geo_greatArcInterpolator = function() {
    const d3_radians = Math.PI / 180;
    let x0, y0, cy0, sy0, kx0, ky0,
        x1, y1, cy1, sy1, kx1, ky1,
        d,
        k;

    function interpolate(t) {
        const B = Math.sin(t *= d) * k,
            A = Math.sin(d - t) * k,
            x = A * kx0 + B * kx1,
            y = A * ky0 + B * ky1,
            z = A * sy0 + B * sy1;
        return [
            Math.atan2(y, x) / d3_radians,
            Math.atan2(z, Math.sqrt(x * x + y * y)) / d3_radians
        ];
    }

    interpolate.distance = function() {
        if (d == null) k = 1 / Math.sin(d = Math.acos(Math.max(-1, Math.min(1, sy0 * sy1 + cy0 * cy1 * Math.cos(x1 - x0)))));
        return d;
    };

    interpolate.source = function(_) {
        const cx0 = Math.cos(x0 = _[0] * d3_radians),
            sx0 = Math.sin(x0);
        cy0 = Math.cos(y0 = _[1] * d3_radians);
        sy0 = Math.sin(y0);
        kx0 = cy0 * cx0;
        ky0 = cy0 * sx0;
        d = null;
        return interpolate;
    };

    interpolate.target = function(_) {
        const cx1 = Math.cos(x1 = _[0] * d3_radians),
            sx1 = Math.sin(x1);
        cy1 = Math.cos(y1 = _[1] * d3_radians);
        sy1 = Math.sin(y1);
        kx1 = cy1 * cx1;
        ky1 = cy1 * sx1;
        d = null;
        return interpolate;
    };

    return interpolate;
}

//make the plane always align with the direction of travel
const calcAngle = (originalRotate, newRotate) => {
    const deltaX = newRotate[0] - originalRotate[0],
        deltaY = newRotate[1] - originalRotate[1]

    return Math.atan2(deltaY, deltaX);
}

//add the plane to the canvas and rotate it
const drawPlane = (context, image, xPos, yPos, angleInRad, imageWidth, imageHeight) => {
    context.save();
    context.translate(xPos, yPos);
    // rotate around that point, converting our
    // angle from degrees to radians
    context.rotate(angleInRad);
    // draw it up and to the left by half the width
    // and height of the image, plus add some shadow
    context.drawImage(image, -(imageWidth/2), -(imageHeight/2), imageWidth, imageHeight);

    // and restore the co-ords to how they were when we began
    context.restore();
}

const checkVisibilityTester = (projection) => {
    let visible;
    const stream = projection.stream({point() { visible = true; }});
    return (x, y) => (visible = false, stream.point(x, y), visible);
}

interface DrawGlobeParameter {
    ctx:CanvasRenderingContext2D,
    size:number;
    globe:any;
    land:any;
    path:any;
    distributionShape:any;
    projection:any;
}
interface DrawFlightParameter {
    flightPath:any;
    angle:number;
    planeSize:number;
    plane:any;
}

const wuppertal = [7.150829, 51.256176];

const colors = {
    see:{
        fill: '#8AB4F8'
    },
    land:{
        fill: '#FBF8F3',
        stroke: '#A4A3A1'
    },
    flight:{
        stroke: '#007ea3'
    },
    distribution:{
        fill: '#00a800',
        stroke: '#A4A3A1'
    },
};


const unifiedDraw = (drawGlobeParameter:DrawGlobeParameter, drawFlightParameter?:DrawFlightParameter) =>{

    const {
        ctx,
        size,
        globe,
        land,
        path,
        distributionShape,
        projection,
    } = drawGlobeParameter;

    ctx.clearRect(0, 0, size, size);
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    ctx.fillStyle = colors.see.fill;
    ctx.beginPath();
    path(globe);
    ctx.fill();

    ctx.fillStyle = colors.land.fill;
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.land.stroke;
    ctx.beginPath();
    path(land);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = colors.distribution.fill;
    ctx.setLineDash([]);
    ctx.lineWidth = 1;
    ctx.strokeStyle = colors.distribution.stroke;
    ctx.beginPath();
    path(distributionShape);
    ctx.fill();
    ctx.stroke();

    const checkVisibility = checkVisibilityTester(projection);
    const visible = checkVisibility(wuppertal[0], wuppertal[1]);

    if(true === visible){

        const wuppertalCartesianCoord = projection([wuppertal[0], wuppertal[1], 0]);

        const x = wuppertalCartesianCoord[0];
        const y = wuppertalCartesianCoord[1];
        const radius = 5;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = '#00a800';
        ctx.fill();

        ctx.font = '14px sans-serif';
        ctx.fillStyle = '#000000';
        ctx.fillText('Wuppertal', x + 2 * radius, y);

    }

    if(undefined !== drawFlightParameter){

        const {flightPath, angle, planeSize, plane} = drawFlightParameter;

        ctx.strokeStyle = colors.flight.stroke;
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        path(flightPath);
        ctx.stroke();

        const rotate = projection.rotate();
        const planeCartesianCoord = projection([-rotate[0], -rotate[1], 0]);

        drawPlane(ctx, plane.current, planeCartesianCoord[0], planeCartesianCoord[1], angle, planeSize,planeSize);

    }

}

/**
 * Borrowing heavily from
 * https://bl.ocks.org/wwymak/dcdd12937bd4643cd9b3
 */
export const Globe = (props) => {

    const d3Canvas = useRef(null);
    const canvasContext = useRef(null);
    const plane = useRef(null);

    const globe = {type: 'Sphere'};
    const distributionCenter = d3.geoCentroid(props.distributionShape);


    //the scale corresponds to the radius more or less so 1/2 width
    const projection = d3.geoOrthographic()
        .scale(props.size * 2)
        .clipAngle(90)
        .translate([props.size/2,props.size/2]);

    const createGlobe = ()=> {

        d3.select(d3Canvas.current).style('cursor', 'default');

        const ctx = canvasContext.current;
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        const path = d3.geoPath()
            .projection(projection)
            .context(ctx);

        const journey = [];
        journey[0] = wuppertal;
        journey[1] = distributionCenter;

        const dragBehaviour = d3.drag()
            .on('drag', function(event){
                const dx = event.dx;
                const dy = event.dy;

                const rotation = projection.rotate();
                const radius = projection.scale();
                const scale = d3.scaleLinear()
                    .domain([-1 * radius, radius])
                    .range([-90, 90]);
                const degX = scale(dx);
                const degY = scale(dy);
                rotation[0] += degX;
                rotation[1] -= degY;
                if (rotation[1] > 90)   rotation[1] = 90;
                if (rotation[1] < -90)  rotation[1] = -90;

                if (rotation[0] >= 180) rotation[0] -= 360;
                projection.rotate(rotation);
                drawGlobe();
            })

        const drawGlobe = () => {

            unifiedDraw({
                ctx,
                size:props.size,
                globe,
                land:props.world,
                path,
                distributionShape: props.distributionShape,
                projection
            });

        }

        const drawGlobeWithPlane = (flightPath, angle, planeSize) => {

            unifiedDraw({
                ctx,
                size: props.size,
                globe,
                land: props.world,
                path,
                distributionShape: props.distributionShape,
                projection,
            }, {
                flightPath,
                angle,
                planeSize,
                plane,
            });

        };

        const flightPath:any = {}
        flightPath.type = 'LineString';
        flightPath.coordinates = [wuppertal, distributionCenter];

        projection.rotate([-wuppertal[0], -wuppertal[1], 0]);
        drawGlobe();

        const zoomOut = (callback:() => void) => {

            d3.transition()
                .delay(0)
                .duration(1000)
                .tween('rotate', () => {

                    return (t) => {

                        const scale = props.size - props.size/2 * t;

                        projection.scale(scale);

                        drawGlobe();
                    }

                }).on('end', ()=>{
                    callback();
                })
        };

        const move = () => {

            const rotateFunc = d3_geo_greatArcInterpolator();

            d3.transition()
                .delay(0)
                .duration(4000)
                .tween('rotate', function() {

                    rotateFunc.source(projection.rotate()).target([-distributionCenter[0], -distributionCenter[1]]).distance();

                    const currentRotation = projection.rotate();

                    const pathInterpolate = d3.geoInterpolate(
                        [currentRotation[0], currentRotation[1]],
                        [-distributionCenter[0], -distributionCenter[1]]
                    );

                    const oldPath = wuppertal;

                    return function (t) {

                        const rotate:number[] = rotateFunc(t);
                        projection.rotate([
                            rotate[0],
                            rotate[1]
                        ]);

                        const newPath = [-pathInterpolate(t)[0], -pathInterpolate(t)[1]];
                        const planeAngle = calcAngle(
                            projection([oldPath[0], oldPath[1]]),
                            projection([newPath[0], newPath[1]])
                        );
                        const flightPathDynamic = {
                            type: 'LineString',
                            coordinates: [
                                wuppertal,
                                [
                                    -pathInterpolate(t)[0],
                                    -pathInterpolate(t)[1]
                                ]
                            ]
                        };

                        const maxPlaneSize =  0.1 * projection.scale();
                        let planeSize = maxPlaneSize

                        //this makes the plane grows and shrinks at the takeoff, landing
                        if (t < 0.1){
                            planeSize = Math.pow(t/0.1, 0.5) * maxPlaneSize;
                        }
                        else if(t > 0.9){
                            planeSize = Math.pow((1-t)/0.1, 0.5) * maxPlaneSize;
                        }

                        drawGlobeWithPlane(flightPathDynamic, planeAngle, planeSize);

                    };
                })

            .on('end', ()=>{
                drawGlobe();

                // start dragging
                d3.select(d3Canvas.current)
                    .style('cursor', 'move')
                    .call(dragBehaviour);
            })

        };

        zoomOut(move);

    };

    useEffect(() => {

        const canvas = d3.select(d3Canvas.current)
        canvasContext.current = (canvas.node() as HTMLCanvasElement).getContext('2d');

        createGlobe();

    });

    return (
        <React.Fragment>
            <canvas
                ref={d3Canvas}
                width={props.size}
                height={props.size}
            />
            <div style={{display:'none'}}>
                <img
                    ref={plane}
                    src="https://bl.ocks.org/wwymak/raw/dcdd12937bd4643cd9b3/ac65045feb4cba0dd692f6a2c100175cab901915/plane-2_03-black.png"
                    alt={'a plane'}
                />
            </div>
        </React.Fragment>
    );

}
