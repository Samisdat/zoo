export type EntityType =
    'Animal' |
    'IndividualAnimal' |
    'Facility' |
    'Photo' |
    'Post' |
    'QrCode' |
    'Node' |
    'Edge' |
    'unkown'
;

export abstract class Entity<Dehydrated>{

    protected json: Dehydrated;

    protected constructor(json:Dehydrated) {

        this.json = json;

    }

    abstract get id(): number;

    get entityType(): EntityType {
        return 'unkown';
    }

    public dehydrate():Dehydrated {
        return this.json;
    }

}