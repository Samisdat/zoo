import {FacilityJson} from '../graphql/facility/facility-json';
import {PhotoJson} from '../graphql/photo/photo-json';
import {MarkerJson} from '../graphql/marker/marker-json';
import {AnimalJson} from '../graphql/animal/animal-json';
import {IndividualAnimalJson} from '../graphql/individual-animal/individual-animal-json';
import {PostJson} from '../graphql/post/post-json';
import {QrCodeJson} from '../graphql/qr-code/qr-code-json';
import {NodeJson} from '../graphql/node/node-json';
import {EdgeJson} from '../graphql/edge/edge-json';
import {Facility} from '../graphql/facility/facility';
import {Photo} from '../graphql/photo/photo';
import {Marker} from '../graphql/marker/marker';
import {Animal} from '../graphql/animal/animal';
import {IndividualAnimal} from '../graphql/individual-animal/individual-animal';
import {Post} from '../graphql/post/post';
import {QrCode} from '../graphql/qr-code/qr-code';
import {Node} from '../graphql/node/node';
import {Edge} from '../graphql/edge/edge';


export interface WarehouseSpore{
    facilities:FacilityJson[];
    photos:PhotoJson[];
    markers:MarkerJson[];
    animals: AnimalJson[]
    individualAnimals: IndividualAnimalJson[]
    posts: PostJson[]
    qrCodes: QrCodeJson[]
    nodes: NodeJson[]
    edges: EdgeJson[]
}

export class Warehouse{

    static instance:Warehouse;

    private facilityIds: number[] = [];
    private facilities: Facility[] = [];

    private photoIds: number[] = [];
    private photos: Photo[] = [];

    private markerIds: number[] = [];
    private markers: Marker[] = [];

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

    private reset():void{

        this.facilityIds = [];
        this.facilities = [];

        this.photoIds = [];
        this.photos = [];

        this.markerIds = [];
        this.markers = [];

        this.animalsIds = [];
        this.animals = [];

        this.individualAnimalsIds  = [];
        this.individualAnimals = [];

        this.postsIds = [];
        this.posts = [];

        this.qrCodesIds = [];
        this.qrCodes = [];

        this.nodesIds = [];
        this.nodes = [];

        this.edgesIds = [];
        this.edges = [];

    }

    public hydrate(spore: WarehouseSpore):void{

        this.reset();

        if(spore.facilities){

            this.facilities = spore.facilities.map((facility:FacilityJson)=>{
                this.facilityIds.push(facility.id);
                return Facility.hydrate(facility);
            });

        }

        if(spore.photos){

            this.photos = spore.photos.map((photo:PhotoJson)=>{
                this.photoIds.push(photo.id);
                return Photo.hydrate(photo);
            });

        }

        if(spore.animals){

            this.animals = spore.animals.map((animal:AnimalJson)=>{
                this.animalsIds.push(animal.id);
                return Animal.hydrate(animal);
            });

        }

        if(spore.individualAnimals){

            this.individualAnimals = spore.individualAnimals.map((individualAnimalJson:IndividualAnimalJson)=>{
                this.individualAnimalsIds.push(individualAnimalJson.id);
                return IndividualAnimal.hydrate(individualAnimalJson);
            });

        }

        if(spore.markers){

            this.markers = spore.markers.map((markerSpore:MarkerJson)=>{
                this.markerIds.push(markerSpore.id);
                return Marker.hydrate(markerSpore);
            });

        }

        if(spore.posts){

            this.posts = spore.posts.map((postSpore:PostJson)=>{
                this.postsIds.push(postSpore.id);
                return Post.hydrate(postSpore);
            });

        }

        if(spore.qrCodes){

            this.qrCodes = spore.qrCodes.map((qrCodeSpore:QrCodeJson)=>{
                this.qrCodesIds.push(qrCodeSpore.id);
                return QrCode.hydrate(qrCodeSpore);
            });

        }

        if(spore.nodes){

            this.nodes = spore.nodes.map((nodeSpore:NodeJson)=>{
                this.nodesIds.push(nodeSpore.id);
                return Node.hydrate(nodeSpore);
            });

        }

        if(spore.edges){

            this.edges = spore.edges.map((edgesSpore:EdgeJson)=>{
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

    public getFacility(facilityId: number):Facility | undefined{

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

    public getPhoto(photoId: number | null):Photo | null{

        if(!photoId){
            return null;
        }

        if(false === this.hasPhoto(photoId)){
            return null;
        }

        const photo = this.photos.find((photo:Photo)=>{
            return (photoId === photo.id);
        });

        return photo || null;

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

    public getMarker(markerId: number):Marker|undefined{

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

    public getAnimal(animalId: number):Animal|undefined{


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

        if(false === this.hasIndividualAnimal(individualAnimal.id)){

            this.individualAnimalsIds.push(individualAnimal.id);
            this.individualAnimals.push(individualAnimal);

        }
    }

    public hasIndividualAnimal(id: number):boolean{

        return this.individualAnimalsIds.includes(id);

    }

    public getIndividualAnimal(id: number):IndividualAnimal|undefined{


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

    public getPost(id: number):Post|undefined{


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

    public getQrCode(id: number):QrCode|undefined{


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

    public getNode(id: number):Node|undefined{


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

    public getEdge(id: number):Edge|undefined{


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