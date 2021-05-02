import {Feature, FeatureCollection} from "geojson";
import {MapElement} from "../../strapi-api/entity/map-element/map-element";

type propertyType = 'bounding_box' | 'border';

export const filterGeoJson = (type:propertyType, mapElements:MapElement[]):MapElement[] =>{

    const filtered = mapElements.filter((mapElement:MapElement)=>{

        return (type === mapElement.properties?.type);

    });

    return filtered;

}
