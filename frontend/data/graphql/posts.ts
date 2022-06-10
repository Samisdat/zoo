import {apolloClient} from "./apolloClient";

import {PostJson} from "./post/post-json";
import {getPosts, getPostsBySlug} from "./post/grahpql";
import {Post} from "./post/post";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {Photo} from "./photo/photo";
import {postMapData} from "./post/post-map-data";
import {addToWarehouse} from "./add-to-warehouse";
import {animalMapData} from "./animal/animal-map-data";

const addPostToWarehouse = (post:Post, graphPost:any) => {

    if(post.id){

        Warehouse.get().addPost(post);

        if(post.headerImageRaw){

            const photo = Photo.fromApi(graphPost.attributes?.headerImg?.image?.data);

            if(false === Warehouse.get().hasPhoto(photo.id)){
                Warehouse.get().addPhoto(photo);
            }

        }

    }

}

export const fetchPostBySlug = async (slug: string):Promise<Post> => {

    const graphResult = await apolloClient.query({
        query: getPostsBySlug,
        variables:{slug}
    });

    const graphPost = graphResult.data.posts.data[0];

    const post = postMapData(graphPost);

    addToWarehouse(post);

    return Warehouse.get().getPost(
        parseInt(graphPost.id,10)
    );

};

export const fetchPosts = async ():Promise<PostJson[]> => {

    const graphResult = await apolloClient.query({
        query: getPosts
    });

    const graphPosts = graphResult.data.posts.data;

    let posts = graphPosts.map((datum:any)=>{

        const post = postMapData(datum);

        addToWarehouse(post);

        return Warehouse.get().getPost(
            parseInt(datum.id,10)
        );

    });


    return posts;

}