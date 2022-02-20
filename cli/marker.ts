import {readSvg} from "./routing/readSvg";
import {getMarkers, MarkerAttributes} from "./marker/getMarkers";
import {getUrl} from "./routing";

const axios = require('axios').default;

console.log('marker');

const svg = readSvg();

const markers = getMarkers(svg);

const checkMarker = async (slug:string): Promise<number | undefined> =>{

    const response = await axios.get(
        getUrl(`/markers/?slug=${slug}`)
    );

    const data = response.data;

    if(0 === data.length){
        return undefined;
    }

    return (response.data[0].id as number)

};

const getFacilityIdBySlug = async (slug:string): Promise<number | undefined> =>{

    const response = await axios.get(
        getUrl(`/facilities/?slug=${slug}`)
    );

    const data = response.data;

    if(0 === data.length){
        return undefined;
    }

    return (response.data[0].id as number)

};


const saveMarker = async (marker:MarkerAttributes) =>{

    const slug = marker.slug;

    if(undefined === slug){
        throw Error('slug should not be empty')
    }

    const strapiId = await checkMarker(slug);

    const facilityId = await getFacilityIdBySlug(slug);

    marker.id = strapiId;

    if(undefined === marker.id){

        const data:any = {
            slug,
            x: marker.x,
            y: marker.y,
            facility:facilityId
        };

        const strapiNode = await axios.post(
            getUrl(`/markers/`),
            data
        );

        marker.id = strapiNode.data.id;

    }
    else{

        const data:any = {
            x: marker.x,
            y: marker.y,
            facility:facilityId
        };

        await axios.put(
            getUrl(`/markers/${marker.id}`),
            data
        );

    }

    return marker;

};

const saveMarkers = async (markers:MarkerAttributes[]) =>{

    for(const marker of markers){
        await saveMarker(marker);
    }

};

const save = async (markers:MarkerAttributes[]) => {

    await saveMarkers(markers);

    console.log('done');
    process.exit(0);

}

save(markers);






