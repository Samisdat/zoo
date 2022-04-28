export type EntityType =
    'Animal' |
    'Facility' |
    'Photo' |
    'Post' |
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