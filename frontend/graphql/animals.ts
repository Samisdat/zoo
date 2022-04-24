import {apolloClient} from "./apolloClient";

import {PostJson} from "./post/post-json";
import {postMapData} from "./post/post-map-data";
import {getPosts, getPostsBySlug} from "./post/grahpql";
import {Post} from "./post/post";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {Photo} from "./photo/photo";
import {Animal} from "./animal/animal";
import {getAnimalBySlug} from "./animal/grahpql";

const addAnimalToWarehouse = (animal:Animal, graphAnimal:any) => {

    if(animal.id){

        Warehouse.get().addAnimal(animal);

        if(animal.headerImageRaw){

            const photo = Photo.fromApi(graphAnimal.attributes?.headerImg?.image?.data);

            if(false === Warehouse.get().hasPhoto(photo.id)){
                Warehouse.get().addPhoto(photo);
            }

        }

    }

}

export const fetchAnimalBySlug = async (slug: string):Promise<Animal> => {

    const graphResult = await apolloClient.query({
        query: getAnimalBySlug,
        variables:{slug}
    });

    const graphAnimal = graphResult.data.animals.data[0];

    const animal = Animal.fromApi(graphAnimal);

    addAnimalToWarehouse(animal, graphAnimal);

    return animal;

};

export const fetchPosts = async ():Promise<PostJson[]> => {

    const graphResult = await apolloClient.query({
        query: getPosts
    });

    const graphPosts = graphResult.data.posts.data;

    let posts = graphPosts.map((graphPost:any)=>{

        const post = Post.fromApi(graphPost);

        //addAnimalToWarehouse(post, graphPost);

        return post;

    });



    return posts;

}