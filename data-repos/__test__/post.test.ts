import {get, list, getDataDir} from "../post";

describe('posts', () => {

    test('getDataDir', ()=>{

        expect(getDataDir()).toBe('/Users/samisdat/repos/zoo/data-repos/markdown/posts');

    });

    test('get one', async () => {

        const post = await get('01');

        expect(post.title).toBe(1)

    });

    test('list all', async () => {

        const posts = await list();

        expect(posts.length).toBe(29);

    });

});



