import {apolloClient} from "./apolloClient";

import {PostJson} from "./post/post-json";
import {postMapData} from "./post/post-map-data";
import {getPosts, getPostsBySlug} from "./post/queries";
import {Post} from "./post/post";
import {Warehouse} from "../strapi-api/warehouse/warehouse";
import {Photo} from "./photo/photo";

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

    const post = Post.fromApi(graphPost);

    addPostToWarehouse(post, graphPost);

    return post;

};

export const fetchPosts = async ():Promise<PostJson[]> => {

    const graphResult = await apolloClient.query({
        query: getPosts
    });

    const graphPosts = graphResult.data.posts.data;

    let posts = graphPosts.map((graphPost:any)=>{

        const post = Post.fromApi(graphPost);

        addPostToWarehouse(post, graphPost);

        return post;

    });



    return posts;

}