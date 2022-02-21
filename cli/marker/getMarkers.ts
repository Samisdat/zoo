const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export interface MarkerAttributes{
    id?: number;
    slug: string;
    x: number;
    y: number;
}

export const getMarkers = (svg:string): MarkerAttributes[] => {

    const { document } = (new JSDOM(svg)).window;

    const group = document.getElementById('marker');

    const circles = group.getElementsByTagName('circle');

    const circleAttributes: MarkerAttributes[] = []

    for(const circle of circles){

        const slug = circle.getAttribute('id').replace('marker-', '');
        const x = parseFloat(circle.getAttribute('cx'));
        const y = parseFloat(circle.getAttribute('cy'));

        circleAttributes.push({
            slug,
            x,
            y
        });

    };

    return circleAttributes;
}