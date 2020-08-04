const app = require( '../../app').app;

const supertest = require('supertest')

describe('Way', () => {

    let request = undefined

    beforeAll(async ()=>{

        request = supertest(app);

    });

    afterAll(async ()=>{


    });

    beforeEach( async () => {

    });

    test ('raw', async () => {

        const response = await request.get('/way/shortest/5f119eb259c98e1230b957e0/5f11aa6ac3cfb2123dc16680/')

        expect(response.status).toBe(200)

        console.log(response.body)

        //expect(response.body).toEqual(seedData.border);

    });

    /*
    test ('gmap', async () => {

        const response = await request.get('/border/gmap/')

        expect(response.status).toBe(200)

        console.log(response.body)

        //expect(response.body).toEqual(seedData.border);

    });
     */

})