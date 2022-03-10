import {getStrapiUrl} from 'strapi-api/utils/get-strapi-url';

import fetch from 'node-fetch';

describe('dump current database', () => {

    test('dump animals', async () => {

        const requestUrl = getStrapiUrl('/animals?_publicationState=preview&_limit=-1');

        await fetch(requestUrl)
        .then(
            (res:any) => {
                return res.json();
            })
        .then(async (json:any) => {

            expect(json.length).toBe(252);
            expect(JSON.stringify(json, null, 4)).toMatchSnapshot();

        });

    });

    test('dump facilities', async () => {

        const requestUrl = getStrapiUrl('/facilities?_publicationState=preview&_limit=-1');

        await fetch(requestUrl)
            .then(
                (res:any) => {
                    return res.json();
                })
            .then(async (json:any) => {

                expect(json.length).toBe(47);
                expect(JSON.stringify(json, null, 4)).toMatchSnapshot();

            });

    });

    test('dump individual-animals', async () => {

        const requestUrl = getStrapiUrl('/individual-animals?_publicationState=preview&_limit=-1');

        await fetch(requestUrl)
            .then(
                (res:any) => {
                    return res.json();
                })
            .then(async (json:any) => {

                expect(json.length).toBe(1);
                expect(JSON.stringify(json, null, 4)).toMatchSnapshot();

            });

    });

    test('dump map-elements', async () => {

        const requestUrl = getStrapiUrl('/map-elements?_publicationState=preview&_limit=-1');

        await fetch(requestUrl)
            .then(
                (res:any) => {
                    return res.json();
                })
            .then(async (json:any) => {

                expect(json.length).toBe(43);
                expect(JSON.stringify(json, null, 4)).toMatchSnapshot();

            });

    });

});



