import {Facility} from '../entity/facility/facility';
import {Photo} from '../entity/photo/photo';
import {FacilitySpore} from '../entity/facility/facility-spore';
import {PhotoSpore} from '../entity/photo/photo-spore';
import {Animal} from '../entity/animal/animal';
import {AnimalSpore} from '../entity/animal/animal-spore';
import {IndividualAnimal} from '../entity/individual-animal/individual-animal';
import {IndividualAnimalSpore} from '../entity/individual-animal/individual-animal-spore';
import {Post} from '../entity/post/post';
import {PostSpore} from '../entity/post/post-spore';
import {QrCodeSpore} from '../entity/qr-code/qr-code-spore';
import {QrCode} from '../entity/qr-code/qr-code';
import {Edge} from '../entity/edge/edge';
import {Node} from '../entity/node/node';
import {NodeSpore} from '../entity/node/node-spore';
import {EdgeSpore} from '../entity/edge/edge-spore';
import {Marker} from '../entity/marker/marker';
import {MarkerSpore} from '../entity/marker/marker-spore';

export interface WarehouseSpore{
    facilities:FacilitySpore[];
    photos:PhotoSpore[];
    markers:MarkerSpore[];
    animals: AnimalSpore[]
    individualAnimals: IndividualAnimalSpore[]
    posts: PostSpore[]
    qrCodes: QrCodeSpore[]
    nodes: NodeSpore[]
    edges: EdgeSpore[]
}

export class Warehouse{

    static instance:Warehouse;

    private facilityIds: number[] = [];
    private facilities: Facility[] = [];

    private photoIds: number[] = [];
    private photos: Photo[] = [];

    private markerIds: number[] = [];
    private markers:Marker[] = [];

    private animalsIds: number[] = [];
    private animals:Animal[] = [];

    private individualAnimalsIds: number[] = [];
    private individualAnimals:IndividualAnimal[] = [];

    private postsIds: number[] = [];
    private posts:Post[] = [];

    private qrCodesIds: number[] = [];
    private qrCodes:QrCode[] = [];

    private nodesIds: number[] = [];
    private nodes:Node[] = [];

    private edgesIds: number[] = [];
    private edges:Edge[] = [];

    // eslint-disable-next-line @typescript-eslint/no-empty-function
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

        const markers = this.markers.map((marker:Marker)=>{
            return marker.dehydrate();
        });

        const animals = this.animals.map((animal:Animal)=>{
            return animal.dehydrate();
        });

        const individualAnimals = this.individualAnimals.map((individualAnimal:IndividualAnimal)=>{
            return individualAnimal.dehydrate();
        });

        const posts = this.posts.map((post:Post)=>{
            return post.dehydrate();
        });

        const qrCodes = this.qrCodes.map((qrCode:QrCode)=>{
            return qrCode.dehydrate();
        });

        const nodes = this.nodes.map((node:Node)=>{
            return node.dehydrate();
        });

        const edges = this.edges.map((edge:Edge)=>{
            return edge.dehydrate();
        });

        return {
            facilities,
            photos,
            markers,
            animals,
            individualAnimals,
            posts,
            qrCodes,
            nodes,
            edges
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

        if(spore.individualAnimals){

            this.individualAnimals = spore.individualAnimals.map((individualAnimalsSpore:IndividualAnimalSpore)=>{
                this.individualAnimalsIds.push(individualAnimalsSpore.id);
                return IndividualAnimal.hydrate(individualAnimalsSpore);
            });

        }

        if(spore.markers){

            this.markers = spore.markers.map((markerSpore:MarkerSpore)=>{
                this.markerIds.push(markerSpore.id);
                return Marker.hydrate(markerSpore);
            });

        }

        if(spore.posts){

            this.posts = spore.posts.map((postSpore:PostSpore)=>{
                this.postsIds.push(postSpore.id);
                return Post.hydrate(postSpore);
            });

        }

        if(spore.qrCodes){

            this.qrCodes = spore.qrCodes.map((qrCodeSpore:QrCodeSpore)=>{
                this.qrCodesIds.push(qrCodeSpore.id);
                return QrCode.hydrate(qrCodeSpore);
            });

        }

        if(spore.nodes){

            this.nodes = spore.nodes.map((nodeSpore:NodeSpore)=>{
                this.nodesIds.push(nodeSpore.id);
                return Node.hydrate(nodeSpore);
            });

        }

        if(spore.edges){

            this.edges = spore.edges.map((edgesSpore:EdgeSpore)=>{
                this.edgesIds.push(edgesSpore.id);
                return Edge.hydrate(edgesSpore);
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

    public addMarker(marker: Marker){

        if(false === this.hasMarker(marker.id)){
            this.markerIds.push(marker.id)
            this.markers.push(marker);
        }

    }

    public hasMarker(markerId: number):boolean{

        return this.markerIds.includes(markerId);

    }

    public getMarker(markerId: number):Marker{

        if(false === this.hasMarker(markerId)){
            return undefined;
        }

        return this.markers.find((marker:Marker)=>{
            return (markerId === marker.id);
        });

    }

    public getMarkers():Marker[]{

        return this.markers;

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

        return this.animals.find((animal:Animal)=>{
            return (animalId === animal.id);
        });

    }

    public getAnimals():Animal[]{

        return this.animals;

    }

    public addIndividualAnimal(individualAnimal: IndividualAnimal){

        if(false === this.hasAnimal(individualAnimal.id)){

            this.individualAnimalsIds.push(individualAnimal.id);
            this.individualAnimals.push(individualAnimal);

        }
    }

    public hasIndividualAnimal(id: number):boolean{

        return this.individualAnimalsIds.includes(id);

    }

    public getIndividualAnimal(id: number):IndividualAnimal{


        if(false === this.hasIndividualAnimal(id)){
            return undefined;
        }

        return this.individualAnimals.find((individualAnimal:IndividualAnimal)=>{
            return (id === individualAnimal.id);
        });

    }

    public getIndividualAnimals():IndividualAnimal[]{

        return this.individualAnimals;

    }

    public addPost(post: Post){

        if(false === this.hasPost(post.id)){

            this.postsIds.push(post.id);
            this.posts.push(post);

        }
    }

    public hasPost(id: number):boolean{

        return this.postsIds.includes(id);

    }

    public getPost(id: number):Post{


        if(false === this.hasPost(id)){
            return undefined;
        }

        return this.posts.find((post:Post)=>{
            return (id === post.id);
        });

    }

    public getPosts():Post[]{

        return this.posts;

    }

    public addQrCode(qrCode: QrCode){

        if(false === this.hasQrCode(qrCode.id)){

            this.qrCodesIds.push(qrCode.id);
            this.qrCodes.push(qrCode);

        }
    }

    public hasQrCode(id: number):boolean{

        return this.qrCodesIds.includes(id);

    }

    public getQrCode(id: number):QrCode{


        if(false === this.hasQrCode(id)){
            return undefined;
        }

        return this.qrCodes.find((qrCode:QrCode)=>{
            return (id === qrCode.id);
        });

    }

    public getQrCodes():QrCode[]{

        return this.qrCodes;

    }

    public addNode(node: Node){

        if(false === this.hasNode(node.id)){

            this.nodesIds.push(node.id);
            this.nodes.push(node);

        }
    }

    public hasNode(id: number):boolean{

        return this.nodesIds.includes(id);

    }

    public getNode(id: number):Node{


        if(false === this.hasNode(id)){
            return undefined;
        }

        return this.nodes.find((node:Node)=>{
            return (id === node.id);
        });

    }

    public getNodes():Node[]{

        return this.nodes;

    }

    public hasEdge(id: number):boolean{

        return this.edgesIds.includes(id);

    }

    public addEdge(edge: Edge){

        if(false === this.hasEdge(edge.id)){

            this.edgesIds.push(edge.id);
            this.edges.push(edge);

        }
    }

    public getEdge(id: number):Edge{


        if(false === this.hasEdge(id)){
            return undefined;
        }

        return this.edges.find((edge:Edge)=>{
            return (id === edge.id);
        });

    }

    public getEdges():Edge[]{

        return this.edges;

    }

}