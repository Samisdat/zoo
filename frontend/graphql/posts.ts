import {apolloClient} from "./apolloClient";

import {PostJson} from "./posts/post-json";
import {postMapData} from "./posts/post-map-data";
import {getPosts, getPostsBySlug} from "./posts/queries";


export const fetchPostBySlug = async (slug: string):Promise<PostJson> => {

    const graphResult = await apolloClient.query({
        query: getPostsBySlug,
        variables:{slug}
    });

    const graphPost = graphResult.data.posts.data[0];

    const postJson = postMapData(graphPost);

    return postJson;

};

export const fetchPosts = async ():Promise<PostJson[]> => {

    const graphResult = await apolloClient.query({
        query: getPosts
    });

    const graphPosts = graphResult.data.posts.data;

    const posts = graphPosts.map((graphPost:any)=>{
        return postMapData(graphPost);
    });

    return posts;

}