import {Feature, FeatureCollection} from "geojson";

type propertyType = 'bounding-box';

export const filterGeoJson = (type:propertyType, geoJson:FeatureCollection):Feature[] =>{

    const filtered = geoJson.features.filter((feature)=>{

        return (type === feature.properties?.type);

    });

    return filtered;

}
