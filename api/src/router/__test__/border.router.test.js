const app = require( '../../app').app;

const supertest = require('supertest')

const seed = require('../../test/seed')

const seedData = require('../../test/seed');

describe('Border', () => {

    let request = undefined

    beforeAll(async ()=>{

        await seed.starting();

        request = supertest(app);

    });

    afterAll(async ()=>{

        await seed.stoping();

    });

    beforeEach( async () => {

        await seed.doing();

    });

    test ('raw', async () => {

        const response = await request.get('/border/')

        expect(response.status).toBe(200)

        console.log(response.body)

        //expect(response.body).toEqual(seedData.border);

    });

    test ('gmap', async () => {

        const response = await request.get('/border/gmap/')

        expect(response.status).toBe(200)

        console.log(response.body)

        //expect(response.body).toEqual(seedData.border);

    });

})
