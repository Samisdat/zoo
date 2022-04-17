//import {getPostBySlug} from "../../queries";
//import {apolloClient} from "../../apolloClient";

import {apolloClient} from "../../apolloClient";
import {getPostBySlug} from "../../queries";

describe('Graph', () => {

    test('simple structure', async () => {
        //const foo: PostInterface

        console.log('foo');

        expect(true).toBeTruthy()

        const posts = await apolloClient.query({
            query:getPostBySlug,
        });

        console.log(posts)


        /*
        const posts = await apolloClient.query({
            query:getPostBySlug,
            variables:{slug: 'a-test'}
        });
         */

    });

});