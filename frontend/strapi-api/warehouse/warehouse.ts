import {Facility} from "../entity/facility/facility";
import {Photo} from "../entity/photo/photo";
import {FacilitySpore} from "../entity/facility/facility-spore";
import {PhotoSpore} from "../entity/photo/photo-spore";
import {MapElement} from "../entity/map-element/map-element";
import {MapElementSpore} from "../entity/map-element/map-element-spore";
import {Animal} from "../entity/animal/animal";
import {AnimalSpore} from "../entity/animal/animal-spore";

export interface WarehouseSpore{
    facilities:FacilitySpore[];
    photos:PhotoSpore[];
    mapElements:MapElementSpore[];
    animals: AnimalSpore[]
}

export class Warehouse{

    static instance:Warehouse;

    private facilityIds: number[] = [];
    private facilities: Facility[] = [];

    private photoIds: number[] = [];
    private photos: Photo[] = [];

    private mapElementIds: number[] = [];
    private mapElements:MapElement[] = [];

    private animalsIds: number[] = [];
    private animals:Animal[] = [];

    private constructor() {
    }

    static get(){

        if(undefined === Warehouse.instance){
            Warehouse.instance = new Warehouse();
        }

        return Warehouse.instance;

    }

    public dehydrate():WarehouseSpore {

        const facilities = this.facilities.map((facility:Facility)=>{
            return facility.dehydrate();
        });

        const photos = this.photos.map((photo:Photo)=>{
            return photo.dehydrate();
        });

        const mapElements = this.mapElements.map((mapElement:MapElement)=>{
            return mapElement.dehydrate();
        });

        const animals = this.animals.map((animal:Animal)=>{
            return animal.dehydrate();
        });

        return {
            facilities,
            photos,
            mapElements,
            animals
        };
    }

    public hydrate(spore: WarehouseSpore):void{

        if(spore.facilities){

            this.facilities = spore.facilities.map((facility:FacilitySpore)=>{
                this.facilityIds.push(facility.id);
                return Facility.hydrate(facility);
            });

        }

        if(spore.photos){

            this.photos = spore.photos.map((photo:PhotoSpore)=>{
                this.photoIds.push(photo.id);
                return Photo.hydrate(photo);
            });

        }

        if(spore.animals){

            this.animals = spore.animals.map((animal:AnimalSpore)=>{
                this.animalsIds.push(animal.id);
                return Animal.hydrate(animal);
            });

        }

        if(spore.mapElements){

            this.mapElements = spore.mapElements.map((mapElementSpore:MapElementSpore)=>{
                this.mapElementIds.push(mapElementSpore.id);
                return MapElement.hydrate(mapElementSpore);
            });

        }

    }

    public addFacility(facility: Facility){

        if(false === this.facilityIds.includes(facility.id)){

            this.facilityIds.push(facility.id);
            this.facilities.push(facility);

        }
    }

    public hasFacility(facilityId: number):boolean{

        return this.facilityIds.includes(facilityId);

    }

    public getFacility(facilityId: number):Facility{

        if(false === this.hasFacility(facilityId)){
            return undefined;
        }

        return this.facilities.find((facility:Facility)=>{
            return (facilityId === facility.id);
        });

    }

    public getFacilities():Facility[]{

        return this.facilities;

    }

    public addPhoto(photo: Photo){

        if(false === this.photoIds.includes(photo.id)){
            this.photoIds.push(photo.id)
            this.photos.push(photo);
        }

    }

    public hasPhoto(photoId: number):boolean{

        return this.photoIds.includes(photoId);

    }

    public getPhoto(photoId: number):Photo | undefined{

        if(false === this.hasPhoto(photoId)){
            return undefined;
        }

        return this.photos.find((photo:Photo)=>{
            return (photoId === photo.id);
        });

    }

    public getPhotos():Photo[]{

        return this.photos;

    }

    public addMapElement(mapElement: MapElement){

        if(false === this.hasMapElement(mapElement.id)){
            this.mapElementIds.push(mapElement.id)
            this.mapElements.push(mapElement);
        }

    }

    public hasMapElement(mapElementId: number):boolean{

        return this.mapElementIds.includes(mapElementId);

    }

    public getMapElement(mapElementId: number):MapElement{

        if(false === this.hasMapElement(mapElementId)){
            return undefined;
        }

        return this.mapElements.find((mapElement:MapElement)=>{
            return (mapElementId === mapElement.id);
        });

    }

    public getMapElements():MapElement[]{

        return this.mapElements;

    }

    public addAnimal(animal: Animal){

        if(false === this.hasAnimal(animal.id)){

            this.animalsIds.push(animal.id);
            this.animals.push(animal);

        }
    }

    public hasAnimal(animalId: number):boolean{

        return this.animalsIds.includes(animalId);

    }

    public getAnimal(animalId: number):Animal{


        if(false === this.hasAnimal(animalId)){
            return undefined;
        }

        console.log('getAnimal', animalId)


        return this.animals.find((animal:Animal)=>{
            return (animalId === animal.id);
        });

    }

    public getAnimals():Animal[]{

        return this.animals;

    }

}