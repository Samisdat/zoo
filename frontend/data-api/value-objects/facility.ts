import {PhotoDehydrated} from "./dehydrated-interfaces/photo";
import {FacilityStrapiJson} from "./starpi-json-interfaces/facility";
import {FacilityDehydrated, FacilityType} from "./dehydrated-interfaces/facility";

export const reduceFacilityApiData = (apiData: FacilityStrapiJson):FacilityDehydrated =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const title = apiData.title;
    const body = apiData.body;
    const type = apiData.type;

    return{
        _type:'dehydrated',
        id,
        slug,
        title,
        body,
        type,
    };
}

export class Facility{

    private json: FacilityDehydrated ;

    constructor(json: FacilityStrapiJson | FacilityDehydrated) {

        if(undefined === json._type || 'dehydrated' !== json._type){

            json = reduceFacilityApiData(json as FacilityStrapiJson);

        }

        this.json = json as FacilityDehydrated;
    }

    get id(): number {
        return this.json.id;
    }

    get slug(): string{
        return this.json.slug
    }

    get title(): string{
        return this.json.title
    }

    get body(): string{
        return this.json.body;
    }

    get type(): FacilityType{
        return this.json.type;
    }

    public dehydrate():FacilityDehydrated {
        return this.json;
    }

}

export const createFacility = (json:FacilityStrapiJson | FacilityDehydrated):Facility => {
    return new Facility(json);
}