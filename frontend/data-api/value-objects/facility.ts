import {FacilityStrapiJson} from "./starpi-json-interfaces/facility";
import {FacilityDehydrated, FacilityType} from "./dehydrated-interfaces/facility";
import {ValueObject} from "./value-object";

export const reduceFacilityApiData = (apiData: FacilityStrapiJson):FacilityDehydrated =>{

    const id = apiData.id;
    const slug = apiData.slug;
    const title = apiData.title;
    const body = apiData.body;
    const type = apiData.type;

    return{
        id,
        slug,
        title,
        body,
        type,
    };
}


export class Facility extends ValueObject<FacilityDehydrated>{

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

    static hydrate(dehydrated:FacilityDehydrated):Facility{

        const facility = new Facility(dehydrated);

        return facility;

    }

    static fromApi(json:FacilityStrapiJson):Facility{

        const dehydrated:FacilityDehydrated = reduceFacilityApiData(json);

        const facility = new Facility(dehydrated);

        return facility;

    }

}