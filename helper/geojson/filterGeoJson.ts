import {Feature, FeatureCollection} from "geojson";
import {MapElementInterface} from "../../data-api/map-elements";

type propertyType = 'bounding_box';

export const filterGeoJson = (type:propertyType, mapElements:MapElementInterface[]):MapElementInterface[] =>{

    const filtered = mapElements.filter((mapElement:MapElementInterface)=>{

        return (type === mapElement.properties?.type);

    });

    return filtered;

}
