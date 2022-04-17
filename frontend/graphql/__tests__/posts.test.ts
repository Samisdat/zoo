import {fetchPostBySlug, fetchPosts} from "../posts";

describe('fetchPostBySlug', () => {

    test('valid response', async () => {

        const post = await fetchPostBySlug('an-existing-slug');

        expect(post.id).toBe(5);

    });

});

describe('fetchPosts', () => {

    test('valid response', async () => {

        const posts = await fetchPosts();

        expect(posts[0].id).toBe(5);

    });

});