import {FacilitySpore, FacilityType} from "./facility-spore";
import {Entity} from "../entity";
import {facilityReduceApiData} from "./facility-reduce-api-data";
import {FacilityStrapi} from "./facility-strapi";

export class Facility extends Entity<FacilitySpore>{

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

    static hydrate(dehydrated:FacilitySpore):Facility{

        const facility = new Facility(dehydrated);

        return facility;

    }

    static fromApi(json:FacilityStrapi):Facility{

        const dehydrated:FacilitySpore = facilityReduceApiData(json);

        const facility = new Facility(dehydrated);

        return facility;

    }

}