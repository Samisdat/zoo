export class Entity<Dehydrated>{

    protected json: Dehydrated;

    protected constructor(json:Dehydrated) {

        this.json = json;

    }

    public dehydrate():Dehydrated {
        return this.json;
    }

}