//import {getPostBySlug} from "../../queries";
//import {apolloClient} from "../../apolloClient";

import {apolloClient} from '../../apolloClient';
import {getPostBySlug} from '../../queries';

describe('Graph', () => {

    test('simple structure', async () => {
        //const foo: PostInterface

        expect(true).toBeTruthy()

        const posts = await apolloClient.query({
            query:getPostBySlug,
        });

        /*
        const posts = await apolloClient.query({
            query:getPostBySlug,
            variables:{slug: 'a-test'}
        });
         */

    });

});