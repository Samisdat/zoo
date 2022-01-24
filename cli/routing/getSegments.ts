const jsdom = require("jsdom");
const { JSDOM } = jsdom;

export interface SegmentAttributes{
    id: string;
    d: string
}

export const getSegments = (svg:string): SegmentAttributes[] => {

    const { document } = (new JSDOM(svg)).window;

    const segments = document.getElementById('segments');

    const paths = segments.getElementsByTagName('path');

    const segmentAttributes: SegmentAttributes[] = []

    for(const path of paths){

        const id = path.getAttribute('id').replace('_', '');
        const d = path.getAttribute('d');

        segmentAttributes.push({
            id,
            d
        });

    };

    return segmentAttributes;
}