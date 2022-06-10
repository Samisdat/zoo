import {getStrapi3Url} from '../get-strapi-url';

describe('get-strapi-url', ()=>{

    test('get starpi url without path', ()=>{

        const strapiUrl = getStrapi3Url();

        expect(strapiUrl).toBe('http://localhost:1337');

    });

    test('get starpi url without path but with env', ()=>{

        process.env.STRAPI_DOMAIN = 'https://strapi.zoo-wuppertal.app';

        const strapiUrl = getStrapi3Url();

        expect(strapiUrl).toBe('https://strapi.zoo-wuppertal.app');

        delete process.env.STRAPI_DOMAIN;

    });

    test('get starpi url with path', ()=>{

        const strapiUrl = getStrapi3Url('/facilities');

        expect(strapiUrl).toBe('http://localhost:1337/facilities');

    });


});