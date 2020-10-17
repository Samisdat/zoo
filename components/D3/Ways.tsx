import React, {useEffect} from 'react';

import * as d3 from 'd3';

export const Ways = (props) => {

    const svgId = 'main-svg';

    const simplePathId = 'main-ways';

    const scaleToBound = () => {

        if(undefined === props.d3PropertiesState){
            return;
        }

        var mapSvg = d3.select(`#${svgId}`)

        var simplePathGroup = mapSvg.select(`#${simplePathId}`);

        simplePathGroup.selectAll("path")
            .data(props.simpleWays)
            .enter()
            .append("path")
            .attr("fill", (d)=>{
                return 'none';
            })
            .attr("stroke", (d)=>{
                return '#000';
            })
            .attr("d", props.d3PropertiesState.geoPath)
            .attr("r", 5);

        /*
         commented out is findining nearest point on path
        const path = simplePathGroup.select("path");

        var line = simplePathGroup.append("line");

        var circle = simplePathGroup.append("circle")
            .attr("cx", -10)
            .attr("cy", -10)
            .attr("r", 3.5)
            .attr("fill", (d)=>{
                return 'red';
            })
        ;

        function closestPoint(pathNode, point) {
            var pathLength = pathNode.getTotalLength(),
                precision = 8,
                best,
                bestLength,
                bestDistance = Infinity;

            // linear scan for coarse approximation
            for (var scan, scanLength = 0, scanDistance; scanLength <= pathLength; scanLength += precision) {
                if ((scanDistance = distance2(scan = pathNode.getPointAtLength(scanLength))) < bestDistance) {
                    best = scan, bestLength = scanLength, bestDistance = scanDistance;
                }
            }

            // binary search for precise estimate
            precision /= 2;
            while (precision > 0.5) {
                var before,
                    after,
                    beforeLength,
                    afterLength,
                    beforeDistance,
                    afterDistance;
                if ((beforeLength = bestLength - precision) >= 0 && (beforeDistance = distance2(before = pathNode.getPointAtLength(beforeLength))) < bestDistance) {
                    best = before, bestLength = beforeLength, bestDistance = beforeDistance;
                } else if ((afterLength = bestLength + precision) <= pathLength && (afterDistance = distance2(after = pathNode.getPointAtLength(afterLength))) < bestDistance) {
                    best = after, bestLength = afterLength, bestDistance = afterDistance;
                } else {
                    precision /= 2;
                }
            }

            best = [best.x, best.y];
            best.distance = Math.sqrt(bestDistance);
            return best;

            function distance2(p) {
                var dx = p.x - point[0],
                    dy = p.y - point[1];
                return dx * dx + dy * dy;
            }
        }
        function mousemoved() {

            var m = d3.mouse(this),
                p = closestPoint(path.node(), m);
            line.attr("x1", p[0]).attr("y1", p[1]).attr("x2", m[0]).attr("y2", m[1]);
            circle.attr("cx", p[0]).attr("cy", p[1]);
        }

        mapSvg.append("rect")
            .attr("width", props.d3PropertiesState.width)
            .attr("height", props.d3PropertiesState.height)
            .attr('style', 'fill: none; cursor: crosshair; pointer-events: all')
            .on("mousemove", mousemoved);

        */

    };

    useEffect(() => {

        scaleToBound();

    });

    return (
            <g id={simplePathId}></g>
    );

}
